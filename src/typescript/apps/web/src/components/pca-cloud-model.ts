export const PCA_POINT_COUNT = 120;
const PCA_CENTER = { x: 200, y: 158 } as const;
// Screen coordinates: a negative angle tilts the cloud up and to the right.
export const PCA_TILT_DEGREES = -34;
const PCA_SPREAD = { major: 46, minor: 17 } as const;

type Vector = { x: number; y: number };

export type PcaPoint = Vector & { id: number; offset: Vector };

export type PcaSummary = {
  covariance: { xx: number; xy: number; yy: number };
  eigenvalues: readonly [number, number];
  eigenvectors: readonly [Vector, Vector];
  explained: readonly [number, number];
  mean: Vector;
};

// Mulberry32 keeps the sample stable across builds, replays, and screenshots.
function random(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function samplePcaCloud(count = PCA_POINT_COUNT, seed = 7): Vector[] {
  const next = random(seed);
  const angle = (PCA_TILT_DEGREES * Math.PI) / 180;
  return Array.from({ length: count }, () => {
    // Box–Muller: two uniforms become two independent standard normals.
    const radius = Math.sqrt(-2 * Math.log(1 - next()));
    const theta = 2 * Math.PI * next();
    const major = radius * Math.cos(theta) * PCA_SPREAD.major;
    const minor = radius * Math.sin(theta) * PCA_SPREAD.minor;
    return {
      x: PCA_CENTER.x + major * Math.cos(angle) - minor * Math.sin(angle),
      y: PCA_CENTER.y + major * Math.sin(angle) + minor * Math.cos(angle),
    };
  });
}

// Closed-form eigendecomposition of the symmetric 2×2 sample covariance.
export function principalComponents(points: readonly Vector[]): PcaSummary {
  const n = points.length;
  const mean = {
    x: points.reduce((sum, point) => sum + point.x, 0) / n,
    y: points.reduce((sum, point) => sum + point.y, 0) / n,
  };
  let xx = 0;
  let xy = 0;
  let yy = 0;
  for (const point of points) {
    const dx = point.x - mean.x;
    const dy = point.y - mean.y;
    xx += (dx * dx) / (n - 1);
    xy += (dx * dy) / (n - 1);
    yy += (dy * dy) / (n - 1);
  }

  const half = (xx + yy) / 2;
  const radius = Math.hypot((xx - yy) / 2, xy);
  const eigenvalues = [half + radius, half - radius] as const;
  const raw = Math.abs(xy) > 1e-12 ? { x: eigenvalues[0] - yy, y: xy } : { x: 1, y: 0 };
  const length = Math.hypot(raw.x, raw.y) * Math.sign(raw.x || 1);
  const first = { x: raw.x / length, y: raw.y / length };
  // PC2 is PC1 turned a quarter clockwise on screen, so after alignment it points up.
  const second = { x: first.y, y: -first.x };
  const total = eigenvalues[0] + eigenvalues[1];

  return {
    covariance: { xx, xy, yy },
    eigenvalues,
    eigenvectors: [first, second],
    explained: [eigenvalues[0] / total, eigenvalues[1] / total],
    mean,
  };
}

const pcaSample = samplePcaCloud();
export const pcaSummary = principalComponents(pcaSample);
export const PCA_ROTATION_DEGREES =
  (-Math.atan2(pcaSummary.eigenvectors[0].y, pcaSummary.eigenvectors[0].x) * 180) / Math.PI;

// Each point keeps its original position; `offset` removes its PC2 score, landing it on PC1.
export const pcaPoints: PcaPoint[] = pcaSample.map((point, id) => {
  const [, second] = pcaSummary.eigenvectors;
  const score = (point.x - pcaSummary.mean.x) * second.x + (point.y - pcaSummary.mean.y) * second.y;
  return { ...point, id, offset: { x: -score * second.x, y: -score * second.y } };
});
