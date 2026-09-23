import { useId } from "react";

import { timelineStep } from "@/components/figure-timeline";
import {
  KALMAN_BOTTOM,
  KALMAN_LEFT,
  KALMAN_Q,
  KALMAN_R,
  KALMAN_RIGHT,
  KALMAN_STEPS,
  kalmanBandPath,
  kalmanEstimatePath,
  kalmanLatentPath,
  kalmanObservations,
} from "@/components/kalman-filter-model";

const introDelay = 400;
const observationInterval = 70;
// The filter reveal sweeps linearly in x, so it reaches each observation as that dot lands.
const revealDuration = (KALMAN_STEPS - 1) * observationInterval;
const dotDuration = 320;

export function KalmanFilter() {
  const id = useId();

  return (
    <svg
      aria-labelledby={`${id}-title ${id}-description`}
      className="kalman-filter h-auto w-full text-foreground"
      role="img"
      viewBox="0 0 400 290"
    >
      <title id={`${id}-title`}>Kalman filter on a local-level model</title>
      <desc id={`${id}-description`}>
        A hidden random walk, drawn as a dashed line, is observed {KALMAN_STEPS} times with noise.
        The Kalman filter updates its estimate after each noisy observation; the solid line is the
        filtered estimate and the shaded band is its two-standard-deviation interval, which narrows
        to a steady width as the filter converges.
      </desc>

      <g className="fill-muted-foreground font-sans text-[11px] tracking-[0.1em] uppercase">
        <text x="20" y="20">
          Observed · filtered · latent
        </text>
        <text textAnchor="end" x="380" y="20">
          Q/R = {KALMAN_Q / KALMAN_R}
        </text>
      </g>

      <g
        className="figure-step animate-kalman-filter-reveal"
        style={timelineStep(introDelay, revealDuration)}
      >
        <path className="fill-foreground stroke-none" d={kalmanBandPath} fillOpacity="0.08" />
        <path
          className="fill-none stroke-data-estimate"
          d={kalmanEstimatePath}
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </g>

      <path
        className="figure-step animate-kalman-filter-fade fill-none stroke-muted-foreground"
        d={kalmanLatentPath}
        style={timelineStep(0, 600)}
        strokeDasharray="3 3"
        strokeWidth="1"
      />

      <g aria-hidden="true" className="fill-muted-foreground">
        {kalmanObservations.map(({ x, y }, index) => (
          <circle
            className="figure-step animate-kalman-filter-dot"
            cx={x}
            cy={y}
            key={x}
            r="1.75"
            style={timelineStep(introDelay + index * observationInterval, dotDuration)}
          />
        ))}
      </g>

      <line
        className="stroke-border"
        strokeWidth="1"
        x1={KALMAN_LEFT}
        x2={KALMAN_RIGHT}
        y1={KALMAN_BOTTOM + 10}
        y2={KALMAN_BOTTOM + 10}
      />
      <g className="fill-muted-foreground font-sans text-[11px] tracking-[0.1em]">
        <text x={KALMAN_LEFT} y={KALMAN_BOTTOM + 24}>
          t = 1
        </text>
        <text textAnchor="end" x={KALMAN_RIGHT} y={KALMAN_BOTTOM + 24}>
          t = {KALMAN_STEPS}
        </text>
      </g>
    </svg>
  );
}
