import { stepStyle, type PartProps } from "../motif";

// Rook standing in three-quarter profile, facing right. The body is one ink silhouette
// with engraving cut into it in paper, so it reads as a silhouette at 16px and as an
// engraving at display sizes.
const ROOK_BODY =
  "M228 66C214 58 198 50 182 46C178 36 168 30 158 30C146 30 136 36 132 48C128 62 122 76 114 92C104 112 90 136 70 166L22 202C26 212 34 222 44 226L82 188C90 184 96 182 102 182L108 190L114 184L120 192L126 184L132 190L138 182L144 184C164 170 176 148 180 122C184 102 184 88 184 76C198 74 214 70 228 66Z";
/** The folded wing, lifted a tone above the body. */
const ROOK_WING =
  "M150 72C148 100 134 128 112 150C98 164 84 176 62 188L70 166C90 136 104 112 114 92C122 78 134 68 150 72Z";
/** The bare, pale skin at the base of a rook's bill. */
const ROOK_FACE = "M180 46C186 50 192 56 196 62C192 66 188 70 184 74C180 66 178 56 180 46Z";
const ROOK_FEATHERS = [
  // Primaries converging on the wing tip.
  "M100 134C92 148 82 162 70 176",
  "M110 136C100 152 88 166 74 180",
  "M120 138C110 154 96 168 80 180",
  "M130 136C120 154 104 170 88 180",
  // Coverts: scalloped rows across the shoulder.
  "M134 82C130 88 126 90 120 90M144 80C142 88 138 92 132 94",
  "M142 100C138 106 132 110 126 110M148 94C148 102 144 108 138 112",
  "M136 118C132 124 126 128 120 128",
  // Breast and throat hackles.
  "M174 86C176 92 176 98 174 104M178 104C180 112 178 120 176 126M168 118C170 128 168 136 164 142M160 146C160 154 156 162 150 168",
  // Tail rectrices.
  "M58 186L30 208M66 192L38 216M74 198L50 220",
];
const ROOK_LEGS =
  "M116 188L110 226M110 226L94 230M110 226L128 228M110 226L120 236M134 186L140 224M140 224L126 228M140 224L160 224M140 224L154 234";
const ROOK_GROUND =
  "M72 240C104 236 160 236 196 240M86 240L94 232M104 240L100 233M170 240L176 232M182 240L190 234M154 240L150 234";

/** Rook in profile: the Gawroński surname association, not a crest. Draws, then fills. */
export function Rook({ className, step, transform }: PartProps) {
  const base = step ?? 0;
  return (
    <g className={className} data-part="rook" style={stepStyle(step)} transform={transform}>
      <g className="fill-motif-ink stroke-motif-ink" strokeLinejoin="round">
        <path d={ROOK_BODY} data-verb="draw" pathLength={1} strokeWidth={2} />
      </g>
      <path className="fill-motif-paper" d={ROOK_WING} fillOpacity={0.16} />
      <path className="fill-motif-paper" d={ROOK_FACE} fillOpacity={0.4} />
      <g
        className="fill-none stroke-motif-paper"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.6}
        strokeWidth={1.5}
      >
        {ROOK_FEATHERS.map((d, index) => (
          <path
            d={d}
            data-verb="draw"
            key={d}
            pathLength={1}
            style={stepStyle(base + 2 + index / 2)}
          />
        ))}
        <path d="M194 64C204 64 216 64 226 66" data-verb="draw" pathLength={1} />
      </g>
      <circle className="fill-motif-paper" cx={162} cy={50} r={5} />
      <circle className="fill-motif-ink" cx={163} cy={50} r={2.5} />
      <g
        className="fill-none stroke-motif-ink"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        style={stepStyle(base + 6)}
      >
        <path d={ROOK_LEGS} data-verb="draw" pathLength={1} />
      </g>
      <g className="fill-none stroke-motif-ink" strokeLinecap="round" strokeWidth={1.5}>
        <path
          d={ROOK_GROUND}
          data-verb="draw"
          opacity={0.55}
          pathLength={1}
          style={stepStyle(base + 7)}
        />
      </g>
    </g>
  );
}

/** Lines of text on each leaf, following the page's curl; short lines end paragraphs. */
const PAGE_LINES = [1, 1, 1, 0.6, 1, 1, 1, 1, 0.5].map((length, index) => {
  const y = 86 + index * 11;
  const end = 116 - (1 - length) * 64;
  return {
    left: `M42 ${y - 3}C66 ${y - 9} 94 ${y - 6} ${end} ${y + 4 - (1 - length) * 8}`,
    right: `M214 ${y - 3}C190 ${y - 9} 162 ${y - 6} ${256 - end} ${y + 4 - (1 - length) * 8}`,
  };
});
const LEFT_LEAF = "M128 78C106 60 68 54 28 64V190C68 180 106 186 128 204Z";
const RIGHT_LEAF = "M128 78C150 60 188 54 228 64V190C188 180 150 186 128 204Z";

/** Open book: records, scholarship and archives. Each leaf opens from the spine. */
export function OpenBook({ className, step, transform }: PartProps) {
  const base = step ?? 0;
  return (
    <g className={className} data-part="book" style={stepStyle(step)} transform={transform}>
      <g className="stroke-motif-ink" strokeLinecap="round" strokeLinejoin="round">
        {/* Boards and the stacked page edges below the open leaves. */}
        <path
          className="fill-motif-ink"
          d="M14 80V206C56 198 100 202 128 222C156 202 200 198 242 206V80Z"
          strokeWidth={2.5}
        />
        <g className="fill-motif-paper" strokeWidth={1.5}>
          <path d="M20 74V200C60 192 102 196 128 214C154 196 196 192 236 200V74Z" />
          <path d="M24 70V196C64 187 104 191 128 209C152 191 192 187 232 196V70Z" />
        </g>
        <g data-verb="open" style={{ ...stepStyle(base), transformOrigin: "100% 50%" }}>
          <path className="fill-motif-paper" d={LEFT_LEAF} strokeWidth={2.5} />
          <path className="fill-motif-ink" d="M128 78C122 73 116 70 110 68V189C116 191 122 197 128 204Z" fillOpacity={0.06} stroke="none" />
          <g fill="none" strokeOpacity={0.55} strokeWidth={1.75}>
            {PAGE_LINES.map((line) => (
              <path d={line.left} key={line.left} />
            ))}
          </g>
        </g>
        <g data-verb="open" style={{ ...stepStyle(base + 1), transformOrigin: "0% 50%" }}>
          <path className="fill-motif-paper" d={RIGHT_LEAF} strokeWidth={2.5} />
          <path className="fill-motif-ink" d="M128 78C134 73 140 70 146 68V189C140 191 134 197 128 204Z" fillOpacity={0.06} stroke="none" />
          <g fill="none" strokeOpacity={0.55} strokeWidth={1.75}>
            {PAGE_LINES.map((line) => (
              <path d={line.right} key={line.right} />
            ))}
          </g>
        </g>
        <path d="M128 78V204" fill="none" strokeWidth={2} />
      </g>
    </g>
  );
}

/** Dotted route for movement, lineage and research journeys. The dotted line unfurls. */
export function RouteDots({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="route" style={stepStyle(step)} transform={transform}>
      <path
        className="stroke-motif-ink"
        d="M24 194C58 150 58 95 96 91C136 88 131 142 170 132C202 124 202 78 232 58"
        data-verb="unfurl"
        fill="none"
        strokeDasharray="0.1 11"
        strokeLinecap="round"
        strokeWidth={5}
      />
      <circle
        className="fill-motif-rose stroke-motif-ink"
        cx={24}
        cy={194}
        data-verb="sequence"
        r={8}
        strokeWidth={2}
      />
      <circle
        className="fill-motif-lotus stroke-motif-ink"
        cx={232}
        cy={58}
        data-verb="sequence"
        r={8}
        strokeWidth={2}
        style={stepStyle((step ?? 0) + 4)}
      />
    </g>
  );
}

type TableMountainProps = PartProps & {
  /** Keep lines at their CSS pixel width when the artwork is stretched. */
  nonScalingStroke?: boolean;
};

/** Devil's Peak, the flat table and Lion's Head as one ink line over the Atlantic. */
const TABLE_MOUNTAIN =
  "M2 196C20 191 34 184 44 175L56 162L62 151L66 147L72 155L80 150L88 141L94 137H176L182 143C188 155 194 166 202 172C208 176 212 176 216 170C220 161 226 155 232 157C238 159 240 167 242 175C246 185 250 191 254 196";

/**
 * Table Mountain line: Cape Town grounding, line-based and subordinate.
 *
 * Stretched with `nonScalingStroke`, Chromium resolves dashes in screen pixels
 * but `pathLength` in user units, so a dash-drawn line fragments. The stretched
 * form therefore unfurls (a clip reveal) instead of drawing with dashes.
 * As a footer rule it may sit at the very end of the page, where the shared
 * scroll range never completes, so it finishes once it has fully entered.
 */
export function TableMountain({
  className,
  nonScalingStroke = false,
  step,
  transform,
}: TableMountainProps) {
  return (
    <g
      className={className}
      data-part="cape-place"
      fill="none"
      style={stepStyle(step)}
      transform={transform}
    >
      <g className="stroke-motif-ink" strokeLinecap="round" strokeLinejoin="round">
        {nonScalingStroke ? (
          <path
            className="[animation-range:entry_0%_entry_100%]!"
            d={TABLE_MOUNTAIN}
            data-verb="unfurl"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <path d={TABLE_MOUNTAIN} data-verb="draw" pathLength={1} strokeWidth={5} />
        )}
      </g>
    </g>
  );
}
