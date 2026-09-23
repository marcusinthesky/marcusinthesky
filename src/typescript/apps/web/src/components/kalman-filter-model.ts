export const KALMAN_STEPS = 60;
export const KALMAN_Q = 0.1;
export const KALMAN_R = 1;
const KALMAN_SEED = 7;
export const KALMAN_LEFT = 30;
export const KALMAN_RIGHT = 370;
const KALMAN_TOP = 44;
export const KALMAN_BOTTOM = 262;

export type KalmanStep = {
  estimate: number;
  latent: number;
  observation: number;
  variance: number;
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

function gaussian(next: () => number): number {
  // Box–Muller; 1 - u keeps the logarithm finite.
  return Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
}

/** Posterior variance of the local-level model once the Riccati recursion has converged. */
export function steadyStateVariance(q = KALMAN_Q, r = KALMAN_R): number {
  const predicted = (q + Math.sqrt(q * q + 4 * q * r)) / 2;
  return (predicted * r) / (predicted + r);
}

/** Random walk plus noise, filtered by the scalar Kalman predict/update recursion. */
export function createKalmanSeries(
  steps = KALMAN_STEPS,
  q = KALMAN_Q,
  r = KALMAN_R,
  seed = KALMAN_SEED,
): KalmanStep[] {
  const next = random(seed);
  let latent = 0;
  let estimate = 0;
  let variance = 4 * r;

  return Array.from({ length: steps }, () => {
    latent += Math.sqrt(q) * gaussian(next);
    const observation = latent + Math.sqrt(r) * gaussian(next);
    const predicted = variance + q;
    const gain = predicted / (predicted + r);
    estimate += gain * (observation - estimate);
    variance = (1 - gain) * predicted;
    return { estimate, latent, observation, variance };
  });
}

const kalmanSeries = createKalmanSeries();

const values = kalmanSeries.flatMap(({ estimate, observation, latent, variance }) => [
  observation,
  latent,
  estimate + 2 * Math.sqrt(variance),
  estimate - 2 * Math.sqrt(variance),
]);
const minimum = Math.min(...values);
const maximum = Math.max(...values);

const kalmanX = (index: number): number =>
  KALMAN_LEFT + (index / (KALMAN_STEPS - 1)) * (KALMAN_RIGHT - KALMAN_LEFT);
const kalmanY = (value: number): number =>
  KALMAN_BOTTOM - ((value - minimum) / (maximum - minimum)) * (KALMAN_BOTTOM - KALMAN_TOP);

const line = (points: readonly (readonly [number, number])[]): string =>
  points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

export const kalmanLatentPath = line(
  kalmanSeries.map(({ latent }, index) => [kalmanX(index), kalmanY(latent)]),
);
export const kalmanEstimatePath = line(
  kalmanSeries.map(({ estimate }, index) => [kalmanX(index), kalmanY(estimate)]),
);
export const kalmanBandPath = `${line([
  ...kalmanSeries.map(
    ({ estimate, variance }, index) =>
      [kalmanX(index), kalmanY(estimate + 2 * Math.sqrt(variance))] as const,
  ),
  ...kalmanSeries
    .map(
      ({ estimate, variance }, index) =>
        [kalmanX(index), kalmanY(estimate - 2 * Math.sqrt(variance))] as const,
    )
    .reverse(),
])} Z`;
export const kalmanObservations = kalmanSeries.map(({ observation }, index) => ({
  x: kalmanX(index),
  y: kalmanY(observation),
}));
