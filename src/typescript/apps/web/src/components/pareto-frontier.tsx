import { useId } from "react";

import { timelineStep } from "@/components/figure-timeline";
import {
  createParetoCandidates,
  frontierStaircase,
  kneePoint,
  PARETO_PLOT,
} from "@/components/pareto-frontier-model";

const candidates = createParetoCandidates();
const frontier = candidates.filter((point) => !point.dominated).toSorted((a, b) => a.risk - b.risk);
const chosen = kneePoint(frontier);
const staircase = frontierStaircase(frontier);

const popInterval = 12;
const popDuration = 320;
const fadeStart = popDuration + (candidates.length - 1) * popInterval + 300;
const drawStart = fadeStart + 700;
const markStart = drawStart + 1400;
const { bottom, left, right, top } = PARETO_PLOT;

export function ParetoFrontier() {
  const id = useId();

  return (
    <svg
      aria-labelledby={`${id}-title ${id}-description`}
      className="pareto-frontier h-auto w-full text-foreground"
      role="img"
      viewBox="0 0 400 290"
    >
      <title id={`${id}-title`}>Pareto frontier of candidate decisions</title>
      <desc id={`${id}-description`}>
        {candidates.length} candidate decisions plotted by risk, to be minimised, against return, to
        be maximised. The {frontier.length} non-dominated candidates, for which no alternative
        offers both lower risk and higher return, stay dark while the dominated majority fades. A
        staircase traces the efficient frontier and a ring marks one chosen trade-off near its knee.
      </desc>

      <g className="fill-muted-foreground font-sans text-[12px] tracking-[0.1em] uppercase">
        <text x="20" y="20">
          {candidates.length} candidates
        </text>
        <text
          className="figure-step animate-pareto-frontier-reveal"
          style={timelineStep(fadeStart, 400)}
          textAnchor="end"
          x="380"
          y="20"
        >
          {frontier.length} non-dominated
        </text>
      </g>

      <path
        className="fill-none stroke-foreground"
        d={`M ${left} ${top - 8} V ${bottom} H ${right}`}
        strokeWidth="1"
      />
      <g className="fill-muted-foreground font-sans text-[11px] tracking-[0.1em] uppercase">
        <text textAnchor="end" x={right} y={bottom + 18}>
          Risk →
        </text>
        <text x={left + 8} y={top}>
          Return ↑
        </text>
      </g>

      <g aria-hidden="true">
        {candidates.map(({ dominated, id: key, x, y }, index) => (
          <g
            className="figure-step pareto-frontier-point animate-pareto-frontier-pop"
            key={key}
            style={timelineStep(index * popInterval, popDuration)}
          >
            <circle
              className={
                dominated
                  ? "figure-step animate-pareto-frontier-fade fill-muted-foreground opacity-35"
                  : "fill-foreground"
              }
              cx={x.toFixed(1)}
              cy={y.toFixed(1)}
              r={dominated ? 2.25 : 2.75}
              style={dominated ? timelineStep(fadeStart, 600) : undefined}
            />
          </g>
        ))}
      </g>

      <path
        className="figure-step animate-pareto-frontier-draw fill-none stroke-foreground"
        d={staircase}
        pathLength={1}
        strokeDasharray="1"
        strokeWidth="1.25"
        style={timelineStep(drawStart, 1200)}
      />

      {chosen ? (
        <circle
          className="figure-step pareto-frontier-point animate-pareto-frontier-pop fill-none stroke-data-decision"
          cx={chosen.x.toFixed(1)}
          cy={chosen.y.toFixed(1)}
          r="7"
          strokeWidth="1.25"
          style={timelineStep(markStart, popDuration)}
        />
      ) : null}
    </svg>
  );
}
