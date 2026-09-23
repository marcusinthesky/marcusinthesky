export const PARETO_CANDIDATE_COUNT = 180;
export const PARETO_PLOT = { bottom: 256, left: 40, right: 380, top: 44 } as const;

export type ParetoCandidate = {
  dominated: boolean;
  id: number;
  // Objective space: risk is minimised, return is maximised; both in [0, 1].
  return: number;
  risk: number;
  x: number;
  y: number;
};

type Objectives = Pick<ParetoCandidate, "return" | "risk">;

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

export const dominates = (a: Objectives, b: Objectives): boolean =>
  a.risk <= b.risk && a.return >= b.return && (a.risk < b.risk || a.return > b.return);

/** Indices of non-dominated candidates, in order of increasing risk. */
export function nonDominated(points: readonly Objectives[]): number[] {
  const order = points
    .map((_, index) => index)
    .toSorted((a, b) => points[a]!.risk - points[b]!.risk || points[b]!.return - points[a]!.return);
  const frontier: number[] = [];
  let best = -Infinity;
  for (const index of order) {
    // A sweep by increasing risk keeps a point only if it beats every lower-risk return.
    if (points[index]!.return > best) {
      frontier.push(index);
      best = points[index]!.return;
    }
  }
  return frontier;
}

export function createParetoCandidates(count = PARETO_CANDIDATE_COUNT): ParetoCandidate[] {
  const next = random(17);
  const objectives = Array.from({ length: count }, () => {
    const risk = 0.04 + next() * 0.92;
    // A concave efficient envelope with most candidates falling well short of it.
    const envelope = 0.08 + 0.86 * Math.sqrt(risk);
    return { return: envelope * (1 - 0.7 * next() ** 0.9), risk };
  });
  const frontier = new Set(nonDominated(objectives));
  const { bottom, left, right, top } = PARETO_PLOT;

  return objectives.map((point, id) => ({
    ...point,
    dominated: !frontier.has(id),
    id,
    x: left + point.risk * (right - left),
    y: bottom - point.return * (bottom - top),
  }));
}

/** Staircase attainment boundary: across at each return level, then up to the next point. */
export function frontierStaircase(points: readonly Pick<ParetoCandidate, "x" | "y">[]): string {
  return points
    .map(({ x, y }, index) => {
      const previous = points[index - 1];
      if (!previous) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      return `H ${x.toFixed(1)} V ${y.toFixed(1)}`;
    })
    .join(" ");
}

/** The knee: the frontier point with the best return-per-risk trade after normalising. */
export function kneePoint<T extends Objectives>(frontier: readonly T[]): T | undefined {
  return frontier.reduce<T | undefined>(
    (best, point) =>
      !best || point.return - 0.75 * point.risk > best.return - 0.75 * best.risk ? point : best,
    undefined,
  );
}
