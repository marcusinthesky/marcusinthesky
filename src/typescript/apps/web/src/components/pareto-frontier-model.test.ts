import { describe, expect, test } from "bun:test";

import {
  createParetoCandidates,
  dominates,
  frontierStaircase,
  kneePoint,
  nonDominated,
  PARETO_CANDIDATE_COUNT,
} from "./pareto-frontier-model";

const candidates = createParetoCandidates();
const frontier = candidates.filter((point) => !point.dominated);

describe("Pareto frontier model", () => {
  test("no frontier point is dominated by any candidate", () => {
    expect(candidates).toHaveLength(PARETO_CANDIDATE_COUNT);
    expect(frontier.length).toBeGreaterThanOrEqual(6);
    for (const point of frontier) {
      expect(candidates.some((other) => dominates(other, point))).toBe(false);
    }
  });

  test("every other candidate is dominated by some frontier point", () => {
    for (const point of candidates.filter((candidate) => candidate.dominated)) {
      expect(frontier.some((member) => dominates(member, point))).toBe(true);
    }
  });

  test("agrees with a brute-force filter, including ties", () => {
    const points = [
      { return: 0.5, risk: 0.2 },
      { return: 0.5, risk: 0.2 },
      { return: 0.4, risk: 0.2 },
      { return: 0.9, risk: 0.6 },
      { return: 0.9, risk: 0.7 },
      { return: 0.1, risk: 0.05 },
    ];
    const bruteForce = points
      .map((point, index) => ({ index, point }))
      .filter(({ point }) => !points.some((other) => dominates(other, point)))
      .map(({ index }) => index);

    // Exact duplicates do not dominate each other; the sweep keeps one representative.
    expect(nonDominated(points)).toEqual([5, 0, 3]);
    expect(bruteForce).toEqual([0, 1, 3, 5]);
  });

  test("draws a monotone staircase and picks a deterministic knee on it", () => {
    const sorted = frontier.toSorted((a, b) => a.risk - b.risk);
    const path = frontierStaircase(sorted);

    expect(path.match(/H /g)).toHaveLength(sorted.length - 1);
    expect(sorted.every((point, index) => index === 0 || point.y < sorted[index - 1]!.y)).toBe(
      true,
    );
    expect(frontier).toContain(kneePoint(frontier)!);
    expect(createParetoCandidates()).toEqual(candidates);
  });
});
