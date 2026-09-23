import { describe, expect, test } from "bun:test";

import {
  PCA_ROTATION_DEGREES,
  PCA_TILT_DEGREES,
  pcaPoints,
  pcaSummary,
  principalComponents,
  samplePcaCloud,
} from "./pca-cloud-model";

describe("PCA cloud model", () => {
  test("eigenvectors are orthonormal and diagonalise the covariance", () => {
    const { covariance: c, eigenvalues, eigenvectors } = pcaSummary;
    const [first, second] = eigenvectors;

    expect(Math.hypot(first.x, first.y)).toBeCloseTo(1, 12);
    expect(Math.hypot(second.x, second.y)).toBeCloseTo(1, 12);
    expect(first.x * second.x + first.y * second.y).toBeCloseTo(0, 12);
    eigenvectors.forEach((vector, index) => {
      const lambda = eigenvalues[index] ?? 0;
      expect(c.xx * vector.x + c.xy * vector.y).toBeCloseTo(lambda * vector.x, 9);
      expect(c.xy * vector.x + c.yy * vector.y).toBeCloseTo(lambda * vector.y, 9);
    });
  });

  test("eigenvalues match covariance trace and determinant", () => {
    const { covariance: c, eigenvalues, explained } = pcaSummary;

    expect(eigenvalues[0] + eigenvalues[1]).toBeCloseTo(c.xx + c.yy, 9);
    expect(eigenvalues[0] * eigenvalues[1]).toBeCloseTo(c.xx * c.yy - c.xy ** 2, 6);
    expect(explained[0] + explained[1]).toBeCloseTo(1, 12);
    expect(explained[0]).toBeGreaterThan(0.8);
    expect(explained[0]).toBeLessThan(0.95);
  });

  test("recovers the generating tilt and projects every point onto PC1", () => {
    const { eigenvectors, mean } = pcaSummary;
    const [first] = eigenvectors;

    expect(Math.abs(PCA_ROTATION_DEGREES + PCA_TILT_DEGREES)).toBeLessThan(5);
    for (const point of pcaPoints) {
      const dx = point.x + point.offset.x - mean.x;
      const dy = point.y + point.offset.y - mean.y;
      expect(dx * first.y - dy * first.x).toBeCloseTo(0, 9);
    }
  });

  test("returns the same sample on replay and handles axis-aligned data", () => {
    expect(samplePcaCloud()).toEqual(samplePcaCloud());
    const aligned = principalComponents([
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ]);
    expect(aligned.eigenvectors[0]).toEqual({ x: 1, y: 0 });
    expect(aligned.explained[0]).toBeCloseTo(0.8, 12);
  });
});
