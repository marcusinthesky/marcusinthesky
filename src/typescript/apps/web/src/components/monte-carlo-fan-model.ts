export const MONTE_CARLO_PATH_COUNT = 80;
export const MONTE_CARLO_STEPS = 24;
export const MONTE_CARLO_SIGMA = 7;
export const MONTE_CARLO_ORIGIN = { x: 30, y: 150 } as const;
export const MONTE_CARLO_HORIZON = 340;
export const MONTE_CARLO_QUANTILES = [0.05, 0.25, 0.5, 0.75, 0.95] as const;

const stepWidth = (MONTE_CARLO_HORIZON - MONTE_CARLO_ORIGIN.x) / MONTE_CARLO_STEPS;

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

// Box–Muller turns two uniforms into one standard normal increment.
function gaussian(next: () => number): number {
  const u = 1 - next();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * next());
}

/** Seeded Gaussian random walks in pixel offsets; every walk starts at 0. */
export function createMonteCarloWalks(
  count = MONTE_CARLO_PATH_COUNT,
  steps = MONTE_CARLO_STEPS,
  sigma = MONTE_CARLO_SIGMA,
): number[][] {
  return Array.from({ length: count }, (_, index) => {
    const next = random(index + 1);
    const walk = [0];
    for (let step = 1; step <= steps; step += 1) {
      walk.push((walk[step - 1] ?? 0) + sigma * gaussian(next));
    }
    return walk;
  });
}

/** Linear-interpolated empirical quantile of an ascending sample. */
export function quantile(sorted: readonly number[], probability: number): number {
  const position = (sorted.length - 1) * probability;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const low = sorted[lower] ?? 0;
  return low + ((sorted[upper] ?? low) - low) * (position - lower);
}

export function monteCarloQuantiles(walks: readonly number[][]): number[][] {
  const steps = walks[0]?.length ?? 0;
  return MONTE_CARLO_QUANTILES.map((probability) =>
    Array.from({ length: steps }, (_, step) =>
      quantile(
        walks.map((walk) => walk[step] ?? 0).sort((a, b) => a - b),
        probability,
      ),
    ),
  );
}

const point = (step: number, offset: number) =>
  `${(MONTE_CARLO_ORIGIN.x + step * stepWidth).toFixed(1)} ${(MONTE_CARLO_ORIGIN.y - offset).toFixed(1)}`;

export const toLine = (values: readonly number[]): string =>
  values.map((value, step) => `${step === 0 ? "M" : "L"} ${point(step, value)}`).join(" ");

/** Closed band between a lower and an upper quantile series. */
export const toBand = (lower: readonly number[], upper: readonly number[]): string =>
  `${toLine(upper)} ${[...lower]
    .map((value, step) => ({ step, value }))
    .reverse()
    .map(({ step, value }) => `L ${point(step, value)}`)
    .join(" ")} Z`;

export const monteCarloWalks = createMonteCarloWalks();
export const monteCarloQuantileSeries = monteCarloQuantiles(monteCarloWalks);
export const monteCarloTerminalY = (offset: number): number =>
  Number((MONTE_CARLO_ORIGIN.y - offset).toFixed(1));
