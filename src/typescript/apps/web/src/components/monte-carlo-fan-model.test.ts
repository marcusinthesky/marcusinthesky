import { describe, expect, test } from "bun:test";

import {
  createMonteCarloWalks,
  MONTE_CARLO_SIGMA,
  MONTE_CARLO_STEPS,
  monteCarloQuantiles,
  quantile,
} from "./monte-carlo-fan-model";

describe("Monte Carlo fan model", () => {
  test("interpolates empirical quantiles linearly", () => {
    const sample = [0, 10, 20, 30, 40];

    expect(quantile(sample, 0)).toBe(0);
    expect(quantile(sample, 0.5)).toBe(20);
    expect(quantile(sample, 0.625)).toBe(25);
    expect(quantile(sample, 1)).toBe(40);
  });

  test("starts every walk at the origin and replays the same sample", () => {
    const walks = createMonteCarloWalks();

    expect(walks.every((walk) => walk[0] === 0)).toBe(true);
    expect(walks.every((walk) => walk.length === MONTE_CARLO_STEPS + 1)).toBe(true);
    expect(createMonteCarloWalks()).toEqual(walks);
  });

  test("keeps quantile bands ordered at every time step", () => {
    const series = monteCarloQuantiles(createMonteCarloWalks());

    for (let step = 0; step <= MONTE_CARLO_STEPS; step += 1) {
      const column = series.map((values) => values[step] ?? 0);
      expect(column).toEqual([...column].sort((a, b) => a - b));
    }
  });

  test("spreads like sigma times root t", () => {
    const walks = createMonteCarloWalks(4000);
    const terminal = walks.map((walk) => walk[MONTE_CARLO_STEPS] ?? 0);
    const mean = terminal.reduce((sum, value) => sum + value, 0) / terminal.length;
    const variance =
      terminal.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (terminal.length - 1);

    expect(Math.abs(mean)).toBeLessThan(0.1 * MONTE_CARLO_SIGMA * Math.sqrt(MONTE_CARLO_STEPS));
    expect(Math.sqrt(variance) / (MONTE_CARLO_SIGMA * Math.sqrt(MONTE_CARLO_STEPS))).toBeCloseTo(
      1,
      1,
    );
  });
});
