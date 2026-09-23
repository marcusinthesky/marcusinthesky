import type { CSSProperties } from "react";

/** Places one `.figure-step` animation on a figure's load-time timeline, in milliseconds. */
export function timelineStep(start: number, duration: number): CSSProperties {
  return { animationDelay: `${start}ms`, animationDuration: `${duration}ms` };
}
