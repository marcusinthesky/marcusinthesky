import { useId } from "react";

import { stepStyle, type PartProps } from "../motif";

/** Stocked anchor: ring, ball-ended stock, tapered shank, curved arms and barbed flukes. */
export function Anchor({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="anchor" style={stepStyle(step)} transform={transform}>
      <g data-verb="settle">
        <g className="stroke-motif-metal" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx={128} cy={30} r={15} strokeWidth={8} />
          <path d="M48 150C58 196 92 220 128 222C164 220 198 196 208 150" strokeWidth={11} />
        </g>
        <g className="fill-motif-metal">
          {/* Shank, tapering from the stock to the crown. */}
          <path d="M121 44H135L138 214H118Z" />
          <rect height={12} rx={6} width={120} x={68} y={62} />
          <circle cx={66} cy={68} r={9} />
          <circle cx={190} cy={68} r={9} />
          {/* Flukes: barbed heads aligned with the ends of the arms. */}
          <path d="M38 124L62 146L52 150L60 170L46 162L28 168Z" />
          <path d="M218 124L194 146L204 150L196 170L210 162L228 168Z" />
          <path d="M128 208L144 226L128 242L112 226Z" />
        </g>
        <path
          className="stroke-motif-paper"
          d="M128 80V200"
          fill="none"
          strokeLinecap="round"
          strokeOpacity={0.45}
          strokeWidth={2}
        />
      </g>
    </g>
  );
}

/** Antique oil lamp with handle, domed lid, foot and a flame at the spout: learning. */
export function AntiqueLamp({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="lamp" style={stepStyle(step)} transform={transform}>
      <g data-verb="settle">
        <path
          className="stroke-motif-metal"
          d="M64 158C36 160 30 126 54 120C67 117 77 125 81 134"
          fill="none"
          strokeLinecap="round"
          strokeWidth={8}
        />
        <g className="fill-motif-metal">
          <path d="M58 160C58 138 88 124 124 124C150 124 170 132 190 136L224 118C231 114 238 120 233 126L206 152C196 167 170 177 136 179H84C68 179 58 173 58 160Z" />
          <path d="M104 177C104 187 97 193 92 200H164C159 193 152 187 152 177Z" />
          <path d="M100 127C102 108 152 108 154 127Z" />
          <path d="M122 110H132V100H122Z" />
          <circle cx={127} cy={96} r={7} />
        </g>
        {/* Engraved highlights: the lip of the lid, a band round the body, the foot ring. */}
        <g className="stroke-motif-paper" fill="none" strokeLinecap="round" strokeOpacity={0.6}>
          <path d="M104 126H150" strokeWidth={2.5} />
          <path d="M70 158C104 150 150 152 198 144" strokeWidth={3} />
          <path d="M80 140C96 134 112 132 128 132" strokeWidth={1.75} />
          <path d="M98 194H158" strokeWidth={1.75} />
        </g>
        <path
          className="fill-motif-gold stroke-motif-metal"
          d="M231 114C216 98 221 78 235 56C249 80 252 98 231 114Z"
          strokeWidth={1.5}
        />
        <path
          className="fill-motif-paper"
          d="M232 108C226 99 228 89 235 78C241 90 240 100 232 108Z"
        />
      </g>
    </g>
  );
}

/** Crenellated masonry mural crown with a gate. */
export function MuralCrown({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="mural-crown" style={stepStyle(step)} transform={transform}>
      <g data-verb="settle">
        <path
          className="fill-motif-metal"
          d="M50 188H206V160H196V104H184V84H168V96H152V84H136V96H120V84H104V96H88V84H72V104H60V160H50Z"
        />
        <g className="stroke-motif-paper" fill="none" strokeWidth={3}>
          <path d="M62 122H194M62 141H194M52 174H204" />
          <path d="M96 104V122M160 104V122M80 122V141M176 122V141M112 122V141M144 122V141" />
        </g>
        <path className="fill-motif-paper" d="M114 160V146A14 14 0 0 1 142 146V160Z" />
      </g>
    </g>
  );
}

const RIBBON_BAND = "M32 104Q128 64 224 104V142Q128 102 32 142Z";
const RIBBON_ROLL_LEFT = "M36 100C26 96 14 100 12 110V148C14 158 26 160 36 154Z";
const RIBBON_ROLL_RIGHT = "M220 100C230 96 242 100 244 110V148C242 158 230 160 220 154Z";

type MottoRibbonProps = PartProps & { text: string };

/** Institutional motto banner, arched with rolled ends. Its text is decorative; the accessible motto lives in HTML. */
export function MottoRibbon({ className, step, text, transform }: MottoRibbonProps) {
  const baseline = useId();
  const label = text.toUpperCase();
  return (
    <g className={className} data-part="motto-ribbon" style={stepStyle(step)} transform={transform}>
      <g data-verb="unfurl" strokeLinecap="round" strokeLinejoin="round">
        <g className="fill-motif-ink stroke-motif-gold" strokeWidth={2.5}>
          <path d={RIBBON_ROLL_LEFT} />
          <path d={RIBBON_ROLL_RIGHT} />
          <path d="M12 110C12 100 26 98 28 108C30 116 20 118 18 112" fill="none" />
          <path d="M244 110C244 100 230 98 228 108C226 116 236 118 238 112" fill="none" />
          <path d={RIBBON_BAND} />
        </g>
        <path
          className="stroke-motif-gold"
          d="M38 110Q128 72 218 110M38 136Q128 98 218 136"
          fill="none"
          strokeOpacity={0.7}
          strokeWidth={1.25}
        />
        <path d="M36 130Q128 91 220 130" fill="none" id={baseline} />
        <text
          className="fill-motif-gold font-serif"
          fontSize={19}
          fontWeight={700}
          lengthAdjust="spacingAndGlyphs"
        >
          <textPath
            href={`#${baseline}`}
            lengthAdjust="spacingAndGlyphs"
            startOffset="50%"
            textAnchor="middle"
            textLength={Math.min(172, label.length * 11.5)}
          >
            {label}
          </textPath>
        </text>
      </g>
    </g>
  );
}
