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

/** A hairline rule with three shuttles that slide into place as it scrolls into view. */
export function ShuttleDivider({ className, motion = "scroll", tone = "heritage" }: OrnamentProps) {
  return (
    <Motif
      className={cx("block h-auto w-full", className)}
      motion={motion}
      tone={tone}
      viewBox="0 0 720 80"
    >
      <path
        className="stroke-motif-ink"
        d="M0 40H228M492 40H720M308 40H328M392 40H412"
        strokeWidth={1.5}
      />
      {[276, 360, 444].map((x, index) => (
        <Shuttle key={x} step={index * 2} transform={`translate(${x - 43.5} -3.5) scale(.34)`} />
      ))}
    </Motif>
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
            r={2.5}
            style={stepStyle((column + row) / 2)}
          />
        ))}
      </g>
    </Motif>
  );
}

/** A quiet lotus-and-rose chapter rule. The flowers bloom independently as the rule enters view. */
export function FloraDivider({ className, motion = "scroll", tone = "heritage" }: OrnamentProps) {
  return (
    <Motif
      className={cx("block h-auto w-full", className)}
      motion={motion}
      tone={tone}
      viewBox="0 0 720 88"
    >
      <path
        className="stroke-motif-ink"
        d="M0 44H280M440 44H720"
        strokeOpacity={0.45}
        strokeWidth={1.25}
      />
      <Lotus step={0} transform="translate(294 3) scale(.28)" />
      <Rose step={2} transform="translate(357 11) scale(.26)" />
    </Motif>
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

/** A full-width Table Mountain line that draws as it scrolls into view. */
export function TableMountainLine({ className, motion = "scroll", tone = "ink" }: OrnamentProps) {
  return (
    <Motif
      className={cx("block h-auto w-full", className)}
      motion={motion}
      tone={tone}
      viewBox="0 132 256 66"
    >
      <TableMountain nonScalingStroke />
    </Motif>
  );
}
