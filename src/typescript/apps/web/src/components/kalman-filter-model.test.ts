import { describe, expect, test } from "bun:test";

import {
  createKalmanSeries,
  KALMAN_Q,
  KALMAN_R,
  KALMAN_STEPS,
  steadyStateVariance,
} from "./kalman-filter-model";

describe("Kalman filter model", () => {
  test("filter variance converges to the steady-state Riccati solution", () => {
    const series = createKalmanSeries();
    const steady = steadyStateVariance();
    const predicted = steady + KALMAN_Q;

    // The fixed point satisfies P = (P + Q) R / (P + Q + R).
    expect((predicted * KALMAN_R) / (predicted + KALMAN_R)).toBeCloseTo(steady, 12);
    expect(series.at(-1)?.variance).toBeCloseTo(steady, 8);
    expect(series[0]?.variance).toBeGreaterThan(steady);
  });

  test("estimate tracks the latent state more closely than raw observations", () => {
    for (const seed of [1, 7, 42, 2024]) {
      const series = createKalmanSeries(KALMAN_STEPS, KALMAN_Q, KALMAN_R, seed);
      const meanSquare = (pick: (step: (typeof series)[number]) => number) =>
        series.reduce((sum, step) => sum + (pick(step) - step.latent) ** 2, 0) / series.length;

      expect(meanSquare((step) => step.estimate)).toBeLessThan(
        meanSquare((step) => step.observation),
      );
    }
  });

  test("returns the same sample on replay", () => {
    expect(createKalmanSeries()).toEqual(createKalmanSeries());
  });
});
