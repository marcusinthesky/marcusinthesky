import { describe, expect, test } from "bun:test";

import {
  binomialCoefficient,
  createGaltonBalls,
  GALTON_APEX,
  GALTON_DX,
  GALTON_FLOOR,
  GALTON_ROWS,
  GALTON_STACK_STEP,
} from "./galton-board-model";

describe("Galton board model", () => {
  test("constructs the expected binomial row", () => {
    const row = Array.from({ length: GALTON_ROWS + 1 }, (_, bin) =>
      binomialCoefficient(GALTON_ROWS, bin),
    );

    expect(row).toEqual([1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]);
    expect(row.reduce((sum, value) => sum + value, 0)).toBe(2 ** GALTON_ROWS);
  });

  test("routes every deterministic path to its right-turn bin", () => {
    for (const ball of createGaltonBalls()) {
      const rightTurns = ball.steps.filter((step) => step === 1).length;
      const expectedX = GALTON_APEX.x + (rightTurns - GALTON_ROWS / 2) * GALTON_DX;

      expect(ball.bin).toBe(rightTurns);
      expect(ball.path).toEndWith(
        `L ${expectedX} ${GALTON_FLOOR - 4 - ball.stackIndex * GALTON_STACK_STEP}`,
      );
    }
  });

  test("returns the same sample and non-overlapping stack positions on replay", () => {
    const first = createGaltonBalls();
    const replay = createGaltonBalls();

    expect(replay).toEqual(first);
    for (let bin = 0; bin <= GALTON_ROWS; bin += 1) {
      expect(first.filter((ball) => ball.bin === bin).map((ball) => ball.stackIndex)).toEqual(
        Array.from(
          { length: first.filter((ball) => ball.bin === bin).length },
          (_, index) => index,
        ),
      );
    }
  });
});
