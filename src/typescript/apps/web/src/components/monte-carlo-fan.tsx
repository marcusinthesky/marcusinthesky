import { useId } from "react";

import { timelineStep } from "@/components/figure-timeline";
import {
  MONTE_CARLO_HORIZON,
  MONTE_CARLO_ORIGIN,
  MONTE_CARLO_PATH_COUNT,
  MONTE_CARLO_QUANTILES,
  MONTE_CARLO_STEPS,
  monteCarloQuantileSeries,
  monteCarloTerminalY,
  monteCarloWalks,
  toBand,
  toLine,
} from "@/components/monte-carlo-fan-model";

const walkPaths = monteCarloWalks.map(toLine);
const [q05 = [], q25 = [], q50 = [], q75 = [], q95 = []] = monteCarloQuantileSeries;
const outerBand = toBand(q05, q95);
const innerBand = toBand(q25, q75);
const medianLine = toLine(q50);

const drawDuration = 1400;
const fadeDuration = 900;
const launchInterval = 12;
const pathsDrawn = drawDuration + (MONTE_CARLO_PATH_COUNT - 1) * launchInterval;
const summaryDelay = pathsDrawn + 200;

export function MonteCarloFan() {
  const id = useId();

  return (
    <div className="monte-carlo-fan">
      <svg
        aria-labelledby={`${id}-title ${id}-description`}
        className="h-auto w-full text-foreground"
        role="img"
        viewBox="0 0 400 290"
      >
        <title id={`${id}-title`}>Monte Carlo fan chart</title>
        <desc id={`${id}-description`}>
          {MONTE_CARLO_PATH_COUNT} seeded Gaussian random walks start from one point and spread over{" "}
          {MONTE_CARLO_STEPS} time steps. Their width grows with the square root of time. Shaded
          bands mark the 5 to 95 and 25 to 75 percent quantiles at each step, with the median as a
          solid line.
        </desc>

        <g className="fill-muted-foreground font-sans text-[12px] tracking-[0.1em] uppercase">
          <text x="20" y="20">
            {MONTE_CARLO_PATH_COUNT} paths
          </text>
          <text textAnchor="end" x="380" y="20">
            <tspan className="normal-case">σ√t</tspan> · quantiles
          </text>
        </g>

        <g
          aria-hidden="true"
          className="figure-step monte-carlo-fan-walks animate-monte-carlo-fan-fade fill-none stroke-border"
          strokeWidth="0.75"
          style={timelineStep(summaryDelay, fadeDuration)}
        >
          {walkPaths.map((d, index) => (
            <path
              className="figure-step animate-monte-carlo-fan-draw"
              d={d}
              key={d}
              pathLength={1}
              strokeDasharray="1"
              style={timelineStep(index * launchInterval, drawDuration)}
            />
          ))}
        </g>

        <g
          className="figure-step animate-monte-carlo-fan-reveal fill-foreground"
          style={timelineStep(summaryDelay, fadeDuration)}
        >
          <path d={outerBand} fillOpacity="0.07" />
          <path d={innerBand} fillOpacity="0.1" />
        </g>

        <path
          className="figure-step animate-monte-carlo-fan-draw fill-none stroke-data-estimate"
          d={medianLine}
          pathLength={1}
          strokeDasharray="1"
          strokeWidth="1.25"
          style={timelineStep(summaryDelay + 300, drawDuration)}
        />

        <line
          className="stroke-border"
          strokeDasharray="2 3"
          strokeWidth="1"
          x1={MONTE_CARLO_HORIZON}
          x2={MONTE_CARLO_HORIZON}
          y1="36"
          y2="262"
        />
        <circle
          className="fill-foreground"
          cx={MONTE_CARLO_ORIGIN.x}
          cy={MONTE_CARLO_ORIGIN.y}
          r="2.5"
        />

        <g
          aria-hidden="true"
          className="figure-step animate-monte-carlo-fan-reveal fill-muted-foreground font-sans text-[11px] tabular-nums"
          style={timelineStep(summaryDelay + 600, fadeDuration)}
        >
          {monteCarloQuantileSeries.map((values, index) => (
            <text
              dominantBaseline="middle"
              key={MONTE_CARLO_QUANTILES[index]}
              x={MONTE_CARLO_HORIZON + 8}
              y={monteCarloTerminalY(values[MONTE_CARLO_STEPS] ?? 0)}
            >
              {Math.round((MONTE_CARLO_QUANTILES[index] ?? 0) * 100)}
            </text>
          ))}
        </g>

        <line
          className="stroke-foreground"
          strokeWidth="1.25"
          x1={MONTE_CARLO_ORIGIN.x}
          x2={MONTE_CARLO_HORIZON}
          y1="270"
          y2="270"
        />
        <g className="fill-muted-foreground font-sans text-[11px]" textAnchor="middle">
          <text x={MONTE_CARLO_ORIGIN.x} y="284">
            0
          </text>
          <text x={MONTE_CARLO_HORIZON} y="284">
            T
          </text>
        </g>
      </svg>
    </div>
  );
}
