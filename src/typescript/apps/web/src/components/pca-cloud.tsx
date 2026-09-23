import type { CSSProperties } from "react";
import { useId } from "react";

import { timelineStep } from "@/components/figure-timeline";
import {
  PCA_POINT_COUNT,
  PCA_ROTATION_DEGREES,
  pcaPoints,
  pcaSummary,
} from "@/components/pca-cloud-model";

const { eigenvalues, eigenvectors, explained, mean } = pcaSummary;
const fadeInterval = 8;
const axisDelay = 1400;
const labelDelay = 2300;
const rotateDelay = 3100;
const projectDelay = 4800;
const projectInterval = 5;
const fadeDuration = 420;
const drawDuration = 900;
const rotateDuration = 1400;
const projectDuration = 1000;

const percent = (ratio: number) => `${Math.round(ratio * 100)}%`;
const origin = `${mean.x.toFixed(2)}px ${mean.y.toFixed(2)}px`;

const axes = eigenvectors.map((vector, index) => {
  const length = 2 * Math.sqrt(eigenvalues[index] ?? 0);
  // PC1 is labelled past its end and nudged up, PC2 just beyond its tip; centred text keeps the
  // counter-rotation exact.
  const [along, across] = index === 0 ? [length + 36, 12] : [length + 12, 0];
  const other = eigenvectors[1 - index] ?? vector;
  const end = (sign: number) =>
    `${(mean.x + sign * vector.x * length).toFixed(2)} ${(mean.y + sign * vector.y * length).toFixed(2)}`;
  return {
    label: {
      x: mean.x + vector.x * along + other.x * across,
      y: mean.y + vector.y * along + other.y * across,
    },
    name: `PC${index + 1}`,
    paths: [`M ${end(0)} L ${end(1)}`, `M ${end(0)} L ${end(-1)}`],
    ratio: explained[index] ?? 0,
  };
});

export function PcaCloud() {
  const id = useId();

  return (
    <svg
      aria-labelledby={`${id}-title ${id}-description`}
      className="pca-cloud h-auto w-full text-foreground"
      role="img"
      viewBox="0 0 400 290"
    >
      <title id={`${id}-title`}>Principal component analysis of a point cloud</title>
      <desc id={`${id}-description`}>
        {PCA_POINT_COUNT} two-dimensional points form an elongated cloud tilted about{" "}
        {Math.round(PCA_ROTATION_DEGREES)} degrees. The first principal component runs along the
        cloud and explains {percent(explained[0])} of the variance; the second, perpendicular to it,
        explains {percent(explained[1])}. The cloud then rotates so the first component is
        horizontal and each point drops onto it, reducing two dimensions to one.
      </desc>

      <g className="fill-muted-foreground font-sans text-[12px] tracking-[0.1em] uppercase">
        <text x="20" y="20">
          {PCA_POINT_COUNT} embeddings
        </text>
        <text textAnchor="end" x="380" y="20">
          Explained variance
        </text>
      </g>

      <g
        className="figure-step pca-cloud-frame animate-pca-cloud-rotate"
        style={
          {
            "--pca-cloud-angle": `${PCA_ROTATION_DEGREES.toFixed(2)}deg`,
            ...timelineStep(rotateDelay, rotateDuration),
            transformOrigin: origin,
          } as CSSProperties
        }
      >
        <g aria-hidden="true" className="fill-muted-foreground">
          {pcaPoints.map(({ id: key, x, y }, index) => (
            <circle
              className="figure-step pca-cloud-ghost animate-pca-cloud-ghost"
              cx={x.toFixed(2)}
              cy={y.toFixed(2)}
              key={`ghost-${key}`}
              r="2"
              style={timelineStep(projectDelay + index * projectInterval, projectDuration)}
            />
          ))}
        </g>

        <g className="fill-none stroke-foreground" strokeWidth="1.25">
          {axes.flatMap(({ name, paths }, index) =>
            paths.map((d) => (
              <path
                className={
                  index === 0
                    ? "figure-step animate-pca-cloud-draw stroke-data-estimate"
                    : "figure-step animate-pca-cloud-draw"
                }
                d={d}
                key={`${name}-${d}`}
                pathLength={1}
                strokeDasharray="1"
                style={timelineStep(axisDelay + index * 350, drawDuration)}
              />
            )),
          )}
        </g>

        <g aria-hidden="true" className="fill-primary">
          {pcaPoints.map(({ id: key, offset, x, y }, index) => (
            <g
              className="figure-step pca-cloud-project animate-pca-cloud-project"
              key={key}
              style={
                {
                  "--pca-cloud-dx": `${offset.x.toFixed(2)}px`,
                  "--pca-cloud-dy": `${offset.y.toFixed(2)}px`,
                  ...timelineStep(projectDelay + index * projectInterval, projectDuration),
                } as CSSProperties
              }
            >
              <circle
                className="figure-step animate-pca-cloud-fade"
                cx={x.toFixed(2)}
                cy={y.toFixed(2)}
                r="2.5"
                style={timelineStep(index * fadeInterval, fadeDuration)}
              />
            </g>
          ))}
        </g>

        <g
          className="fill-muted-foreground stroke-background font-sans text-[11px] tracking-[0.1em] uppercase"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeWidth="3"
        >
          {axes.map(({ label, name, ratio }, index) => (
            // The wrapper counter-rotates about its own centre so the label stays upright.
            <g
              className="figure-step pca-cloud-label animate-pca-cloud-counter-rotate"
              key={name}
              style={timelineStep(rotateDelay, rotateDuration)}
            >
              <text
                className="figure-step animate-pca-cloud-fade"
                dominantBaseline="middle"
                style={timelineStep(labelDelay + index * 200, fadeDuration)}
                textAnchor="middle"
                x={label.x.toFixed(2)}
                y={label.y.toFixed(2)}
              >
                {name} {percent(ratio)}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
