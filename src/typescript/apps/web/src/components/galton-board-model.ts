export const GALTON_ROWS = 10;
export const GALTON_BALL_COUNT = 40;
export const GALTON_DX = 30;
export const GALTON_DY = 24;
export const GALTON_FLOOR = 460;
export const GALTON_STACK_STEP = 8;
export const GALTON_APEX = { x: 200, y: 64 } as const;

export type GaltonBall = {
  bin: number;
  id: number;
  path: string;
  stackIndex: number;
  steps: readonly (-1 | 1)[];
};

export const binomialCoefficient = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const edge = Math.min(k, n - k);
  let value = 1;
  for (let index = 1; index <= edge; index += 1) {
    value = (value * (n - edge + index)) / index;
  }
  return value;
};

export const GALTON_MAX_BAR =
  (binomialCoefficient(GALTON_ROWS, GALTON_ROWS / 2) / 2 ** GALTON_ROWS) *
  GALTON_BALL_COUNT *
  GALTON_STACK_STEP;

export const galtonBins = Array.from({ length: GALTON_ROWS + 1 }, (_, bin) => ({
  height:
    (binomialCoefficient(GALTON_ROWS, bin) / 2 ** GALTON_ROWS) *
    GALTON_BALL_COUNT *
    GALTON_STACK_STEP,
  x: GALTON_APEX.x + (bin - GALTON_ROWS / 2) * GALTON_DX,
}));

export const galtonPegs = Array.from({ length: GALTON_ROWS }, (_, row) =>
  Array.from({ length: row + 1 }, (_, position) => ({
    x: GALTON_APEX.x + (position - row / 2) * GALTON_DX,
    y: GALTON_APEX.y + row * GALTON_DY,
  })),
).flat();

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

function createPath(steps: readonly (-1 | 1)[], landingY: number): string {
  let x: number = GALTON_APEX.x;
  let path = `M ${x} 8 L ${x} ${GALTON_APEX.y - 5}`;

  steps.forEach((step, row) => {
    const pegY = GALTON_APEX.y + row * GALTON_DY;
    const nextX = x + step * (GALTON_DX / 2);
    // Approach each peg vertically, then make the binary choice legible as a short deflection.
    if (row > 0) path += ` L ${x} ${pegY - 5}`;
    path += ` Q ${x + step * 3} ${pegY + 2} ${nextX} ${pegY + 12}`;
    x = nextX;
  });

  return `${path} L ${x} ${landingY}`;
}

export function createGaltonBalls(count = GALTON_BALL_COUNT): GaltonBall[] {
  const stackHeights = Array.from({ length: GALTON_ROWS + 1 }, () => 0);

  return Array.from({ length: count }, (_, index) => {
    const next = random(index + 1);
    const steps = Array.from({ length: GALTON_ROWS }, () =>
      next() < 0.5 ? (-1 as const) : (1 as const),
    );
    const bin = steps.filter((step) => step === 1).length;
    const stackIndex = stackHeights[bin] ?? 0;
    stackHeights[bin] = stackIndex + 1;
    const landingY = GALTON_FLOOR - 4 - stackIndex * GALTON_STACK_STEP;

    return {
      bin,
      id: index,
      path: createPath(steps, landingY),
      stackIndex,
      steps,
    };
  });
}

export const galtonNormalCurve = Array.from({ length: 67 }, (_, index) => {
  const x = 35 + index * 5;
  const standardDeviation = (GALTON_DX / 2) * Math.sqrt(GALTON_ROWS);
  const y =
    GALTON_FLOOR -
    GALTON_MAX_BAR * Math.exp(-((x - GALTON_APEX.x) ** 2) / (2 * standardDeviation ** 2));
  return `${index === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`;
}).join(" ");
