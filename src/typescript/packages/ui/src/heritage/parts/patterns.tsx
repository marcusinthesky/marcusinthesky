import { stepStyle, type PartProps } from "../motif";

/** One compass point along -y, split down its axis into an inked and a paper half. */
function point(length: number, shoulder: number) {
  return {
    dark: `M0 0L0 ${-length}L${-shoulder} ${-shoulder}Z`,
    light: `M0 0L0 ${-length}L${shoulder} ${-shoulder}Z`,
  };
}
const CARDINAL = point(118, 15);
const DIAGONAL = point(70, 10);
const QUARTERS = [0, 90, 180, 270];
const RAYS = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11.25)
  .map((angle) => {
    const a = (angle * Math.PI) / 180;
    const at = (r: number) =>
      `${Math.round(128 + Math.sin(a) * r)} ${Math.round(128 - Math.cos(a) * r)}`;
    return `M${at(26)}L${at(50)}`;
  })
  .join("");

function CompassPoint({ angle, part }: { angle: number; part: ReturnType<typeof point> }) {
  return (
    <g transform={`translate(128 128) rotate(${angle})`}>
      <path className="fill-motif-ink" d={part.dark} />
      <path className="fill-motif-paper" d={part.light} />
    </g>
  );
}

/**
 * Engraved compass star: orientation, direction, the primary ornamental separator.
 * Four long cardinal points over four short diagonals; each point is half inked.
 */
export function CompassStar({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="compass-star" style={stepStyle(step)} transform={transform}>
      <g className="stroke-motif-ink" data-verb="turn" strokeLinejoin="round" strokeWidth={2}>
        <path d={RAYS} fill="none" strokeLinecap="round" strokeOpacity={0.5} strokeWidth={1.5} />
        {QUARTERS.map((angle) => (
          <CompassPoint angle={angle + 45} key={`d${angle}`} part={DIAGONAL} />
        ))}
        <circle cx={128} cy={128} fill="none" r={30} strokeWidth={1.5} />
        {QUARTERS.map((angle) => (
          <CompassPoint angle={angle} key={`c${angle}`} part={CARDINAL} />
        ))}
        <circle className="fill-motif-paper" cx={128} cy={128} r={7} />
        <circle className="fill-motif-ink" cx={128} cy={128} r={2.5} stroke="none" />
      </g>
    </g>
  );
}
