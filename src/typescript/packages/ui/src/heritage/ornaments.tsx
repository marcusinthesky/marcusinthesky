import { useId, type ReactNode } from "react";

import { HeritageMark, type HeritageMotif } from "./heritage-mark";
import { Motif, stepStyle, type MotifMotion, type MotifTone } from "./motif";
import { TableMountain } from "./parts/heritage";
import { Lotus, PalmBranch, Rose, Shuttle } from "./parts/prain";

type OrnamentProps = {
  tone?: MotifTone;
  motion?: MotifMotion;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/** Two hairlines that grow outward from whatever sits between them. */
function Rule({
  children,
  className,
  motion,
}: {
  children: ReactNode;
  className?: string;
  motion: MotifMotion;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx("motif-rule flex items-center gap-4", className)}
      data-motion={motion}
    >
      <span className="motif-rule-line h-px flex-1 bg-border" data-side="start" />
      {children}
      <span className="motif-rule-line h-px flex-1 bg-border" data-side="end" />
    </div>
  );
}

type MotifRuleProps = OrnamentProps & {
  motif?: HeritageMotif;
  size?: "sm" | "md" | "lg" | "xl";
};

/**
 * A section rule centred on one motif: the compass star by default (the primary
 * ornamental separator), or a lineage motif such as the rose or the anchor.
 */
export function MotifRule({
  className,
  motif = "star",
  motion = "scroll",
  size = "lg",
  tone = "heritage",
}: MotifRuleProps) {
  return (
    <Rule className={className} motion={motion}>
      <HeritageMark motif={motif} motion={motion} size={size} tone={tone} />
    </Rule>
  );
}

/** An engineering rule: three shuttles, tip to tip, slide into place between hairlines. */
export function ShuttleDivider({ className, motion = "scroll", tone = "heritage" }: OrnamentProps) {
  return (
    <Rule className={className} motion={motion}>
      <Motif className="h-7 w-auto shrink-0" motion={motion} tone={tone} viewBox="16 86 696 84">
        {[0, 228, 456].map((x, index) => (
          <Shuttle key={x} step={index * 2} transform={`translate(${x} 0)`} />
        ))}
      </Motif>
    </Rule>
  );
}

type DotFieldProps = OrnamentProps & { rows?: number; columns?: number };

/** A grid of dots revealed in sequence, for probability and process passages. */
export function DotField({
  className,
  columns = 12,
  motion = "scroll",
  rows = 3,
  tone = "heritage",
}: DotFieldProps) {
  const dots = Array.from({ length: rows * columns }, (_, index) => ({
    column: index % columns,
    row: Math.floor(index / columns),
  }));
  return (
    <Motif
      className={cx("block h-auto w-full", className)}
      motion={motion}
      tone={tone}
      viewBox={`0 0 ${columns * 24} ${rows * 24}`}
    >
      <g data-part="dot-field">
        {dots.map(({ column, row }) => (
          <circle
            className="fill-motif-ink"
            cx={column * 24 + 12}
            cy={row * 24 + 12}
            data-verb="sequence"
            key={`${row}-${column}`}
            r={2}
            style={stepStyle((column + row) / 2)}
          />
        ))}
      </g>
    </Motif>
  );
}

/** A quiet lotus-and-rose heritage rule: the flowers bloom as the hairlines grow outward. */
export function FloraDivider({ className, motion = "scroll", tone = "heritage" }: OrnamentProps) {
  return (
    <Rule className={className} motion={motion}>
      <Motif className="h-8 w-auto shrink-0" motion={motion} tone={tone} viewBox="24 4 480 250">
        <Lotus step={0} />
        <Rose step={2} transform="translate(248 0)" />
      </Motif>
    </Rule>
  );
}

type PalmCornerProps = OrnamentProps & { side?: "left" | "right" };

/** A palm branch page-corner ornament with a low-amplitude scroll-linked sway. */
export function PalmCorner({
  className,
  motion = "scroll",
  side = "left",
  tone = "heritage",
}: PalmCornerProps) {
  const transform =
    side === "right"
      ? "translate(256 0) scale(-1 1) translate(-28 36) scale(.9)"
      : "translate(-28 36) scale(.9)";
  return (
    <Motif className={cx("block", className)} motion={motion} tone={tone} viewBox="0 0 256 256">
      <PalmBranch transform={transform} />
    </Motif>
  );
}

/** An etched Table Bay panorama that unfurls as it scrolls into view. */
export function TableMountainLine({ className, motion = "scroll", tone = "ink" }: OrnamentProps) {
  return (
    <Motif
      className={cx("block h-auto w-full", className)}
      motion={motion}
      tone={tone}
      viewBox="0 120 256 84"
    >
      <TableMountain nonScalingStroke />
    </Motif>
  );
}

type ArchivalSealProps = OrnamentProps & {
  /** Set around the upper arc. */
  top?: string;
  /** Set around the lower arc. */
  bottom?: string;
};

/**
 * An archival seal: a double ring with text set on its arcs around a line-drawn
 * lotus. A texture or watermark (Level 2); the ring draws, then the lotus blooms.
 */
export function ArchivalSeal({
  bottom = "MMXXV",
  className,
  motion = "scroll",
  tone = "ink",
  top = "PRECOR",
}: ArchivalSealProps) {
  const upper = useId();
  const lower = useId();
  // Fit each legend to its arc (about 280 units above, 300 below) at up to 18 units.
  const fit = (text: string, arc: number) => Math.min(18, arc / (text.length * 0.92));
  const topSize = fit(top, 280);
  const bottomSize = fit(bottom, 300);
  return (
    <Motif className={cx("block", className)} motion={motion} tone={tone} viewBox="0 0 256 256">
      <g data-part="seal">
        <g className="stroke-motif-ink" fill="none">
          <circle cx={128} cy={128} data-verb="draw" pathLength={1} r={124} strokeWidth={2} />
          <circle
            cx={128}
            cy={128}
            data-verb="draw"
            pathLength={1}
            r={118}
            strokeWidth={0.75}
            style={stepStyle(1)}
          />
          <circle
            cx={128}
            cy={128}
            data-verb="draw"
            pathLength={1}
            r={82}
            strokeWidth={1.25}
            style={stepStyle(2)}
          />
        </g>
        <path d="M38 128A90 90 0 0 1 218 128" fill="none" id={upper} />
        <path d="M24 128A104 104 0 0 0 232 128" fill="none" id={lower} />
        <g className="fill-motif-ink font-serif" data-verb="lift" style={stepStyle(3)}>
          <text fontSize={topSize} letterSpacing={topSize * 0.28}>
            <textPath href={`#${upper}`} startOffset="50%" textAnchor="middle">
              {top.toUpperCase()}
            </textPath>
          </text>
          <text fontSize={bottomSize} letterSpacing={bottomSize * 0.28}>
            <textPath href={`#${lower}`} startOffset="50%" textAnchor="middle">
              {bottom.toUpperCase()}
            </textPath>
          </text>
        </g>
        <g className="fill-motif-ink">
          <path d="M22 128L27 123L32 128L27 133Z" />
          <path d="M224 128L229 123L234 128L229 133Z" />
        </g>
        <Lotus step={4} transform="translate(64 60) scale(.5)" />
      </g>
    </Motif>
  );
}
