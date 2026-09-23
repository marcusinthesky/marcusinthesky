import { useId } from "react";

import { stepStyle, type PartProps } from "../motif";

type Point = readonly [number, number];

const round = (value: number) => Math.round(value * 10) / 10;
const pt = ([x, y]: Point) => `${round(x)} ${round(y)}`;

/** A pointed lens-shaped petal or leaf from `base`, `length` long, at `angle` degrees from up. */
function petal(base: Point, angle: number, length: number, width: number, bend = 0) {
  const a = (angle * Math.PI) / 180;
  const u: Point = [Math.sin(a), -Math.cos(a)];
  const n: Point = [-u[1], u[0]];
  const at = (along: number, across: number): Point => [
    base[0] + u[0] * along + n[0] * across + bend * along * along * 0.004 * n[0],
    base[1] + u[1] * along + n[1] * across + bend * along * along * 0.004 * n[1],
  ];
  const tip = at(length, 0);
  return {
    d: `M${pt(base)}C${pt(at(length * 0.3, width))} ${pt(at(length * 0.72, width * 0.72))} ${pt(tip)}C${pt(at(length * 0.72, -width * 0.72))} ${pt(at(length * 0.3, -width))} ${pt(base)}Z`,
    vein: `M${pt(at(length * 0.12, 0))}L${pt(at(length * 0.8, 0))}`,
  };
}

/**
 * An upright pointed petal or leaf with its base at the origin: the outline, the
 * lit half (a paper wash left of the midrib, as on the engraved identity sheet)
 * and the midrib. Parts rotate it into place around its base.
 */
function blade(length: number, width: number) {
  const l = round(length);
  const w = round(width);
  const edge = (side: 1 | -1) =>
    `C${round(side * w)} ${round(-l * 0.26)} ${round(side * w * 0.82)} ${round(-l * 0.7)} 0 ${-l}`;
  return {
    d: `M0 0${edge(1)}C${round(-w * 0.82)} ${round(-l * 0.7)} ${-w} ${round(-l * 0.26)} 0 0Z`,
    lit: `M0 0${edge(-1)}Z`,
    rib: `M0 ${round(-l * 0.1)}L0 ${round(-l * 0.86)}`,
  };
}

type Blade = ReturnType<typeof blade> & { angle: number };

/** One blade rotated about `origin`; `verb` animates it from its own base. */
function BladeGroup({
  blade: b,
  fill,
  origin,
  step,
  verb,
}: {
  blade: Blade;
  fill: string;
  origin: Point;
  step?: number;
  verb: string;
}) {
  return (
    <g transform={`translate(${pt(origin)}) rotate(${b.angle})`}>
      <g data-verb={verb} style={stepStyle(step)}>
        <path className={`${fill} stroke-motif-ink`} d={b.d} strokeWidth={2.5} />
        <path className="fill-motif-paper" d={b.lit} fillOpacity={0.28} />
        <path
          className="stroke-motif-ink"
          d={b.rib}
          fill="none"
          strokeOpacity={0.4}
          strokeWidth={1.25}
        />
      </g>
    </g>
  );
}

const LOTUS_BASE: Point = [128, 156];
const lotusRing = (spec: [number, number, number][]) =>
  spec.flatMap(([angle, length, width]) =>
    (angle === 0 || angle === 180 ? [angle] : [-angle, angle]).map((a) => ({
      ...blade(length, width),
      angle: a,
    })),
  );
/** Back to front: the spreading ring, the drooping sepals, the upright ring, the front pair. */
const LOTUS_LAYERS: { step: number; blades: Blade[] }[] = [
  {
    step: 0,
    blades: lotusRing([
      [96, 98, 19],
      [72, 104, 23],
      [48, 108, 24],
    ]),
  },
  {
    step: 0,
    blades: lotusRing([
      [136, 62, 19],
      [180, 56, 21],
    ]),
  },
  {
    step: 1,
    blades: lotusRing([
      [24, 112, 25],
      [0, 120, 27],
    ]),
  },
];
const LOTUS_FRONT = lotusRing([[40, 78, 27]]);
/** The gold crown of stamens: alternate long and short rays on an arc. */
const LOTUS_CROWN = `M98 152${Array.from({ length: 17 }, (_, i) => {
  const a = ((-80 + i * 10) * Math.PI) / 180;
  const r = i % 2 === 0 ? 34 : 27;
  return `L${round(128 + Math.sin(a) * r)} ${round(152 - Math.cos(a) * r)}`;
}).join("")}L158 152Z`;

/** Blue lotus: inquiry, emergence, research. Blooms ring by ring from the base. */
export function Lotus({ className, step, transform }: PartProps) {
  const base = step ?? 0;
  return (
    <g className={className} data-part="lotus" style={stepStyle(step)} transform={transform}>
      <g strokeLinecap="round" strokeLinejoin="round">
        {LOTUS_LAYERS.map((layer) =>
          layer.blades.map((b) => (
            <BladeGroup
              blade={b}
              fill="fill-motif-lotus"
              key={`${layer.step}-${b.angle}`}
              origin={LOTUS_BASE}
              step={base + layer.step}
              verb="bloom"
            />
          )),
        )}
        <g data-verb="bloom" style={stepStyle(base + 2)}>
          <path className="fill-motif-gold stroke-motif-ink" d={LOTUS_CROWN} strokeWidth={2} />
          <path
            className="stroke-motif-ink"
            d="M116 150L110 132M128 150V122M140 150L146 132"
            fill="none"
            strokeOpacity={0.45}
            strokeWidth={1.25}
          />
        </g>
        {LOTUS_FRONT.map((b) => (
          <BladeGroup
            blade={b}
            fill="fill-motif-lotus"
            key={`front-${b.angle}`}
            origin={[128, 184]}
            step={base + 3}
            verb="bloom"
          />
        ))}
      </g>
    </g>
  );
}

const ROSE_ORIGIN: Point = [128, 128];
/** A rounded, notched rose petal from the centre outward, `r` long, with its highlight and curl. */
function rosePetal(r: number) {
  const s = r / 100;
  const p = (x: number, y: number) => `${round(x * s)} ${round(y * s)}`;
  return {
    d: `M${p(0, -6)}C${p(-24, -10)} ${p(-46, -38)} ${p(-44, -66)}C${p(-42, -92)} ${p(-18, -102)} ${p(0, -88)}C${p(18, -102)} ${p(42, -92)} ${p(44, -66)}C${p(46, -38)} ${p(24, -10)} ${p(0, -6)}Z`,
    lit: `M${p(-38, -60)}C${p(-38, -84)} ${p(-24, -94)} ${p(-10, -90)}C${p(-24, -84)} ${p(-32, -74)} ${p(-38, -60)}Z`,
    curl: `M${p(-28, -56)}C${p(-20, -40)} ${p(-8, -38)} ${p(0, -48)}C${p(8, -38)} ${p(20, -40)} ${p(28, -56)}`,
  };
}
const ROSE_OUTER = rosePetal(112);
const ROSE_INNER = rosePetal(60);
const ROSE_BARB = blade(124, 26);
const ROSE_ANGLES = [0, 72, 144, 216, 288];
const ROSE_SEEDS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  return { cx: round(128 + Math.sin(a) * 20), cy: round(128 - Math.cos(a) * 20) };
});

function RosePetal({
  angle,
  petal,
  step,
}: {
  angle: number;
  petal: ReturnType<typeof rosePetal>;
  step: number;
}) {
  return (
    <g transform={`translate(${pt(ROSE_ORIGIN)}) rotate(${angle})`}>
      <g data-verb="bloom" style={stepStyle(step)}>
        <path className="fill-motif-rose stroke-motif-ink" d={petal.d} strokeWidth={2.5} />
        <path className="fill-motif-paper" d={petal.lit} fillOpacity={0.45} />
        <path
          className="stroke-motif-ink"
          d={petal.curl}
          fill="none"
          strokeOpacity={0.45}
          strokeWidth={1.5}
        />
      </g>
    </g>
  );
}

/** Heraldic rose, barbed and seeded: continuity, human history, emphasis. Blooms outward in. */
export function Rose({ className, step, transform }: PartProps) {
  const base = step ?? 0;
  return (
    <g className={className} data-part="rose" style={stepStyle(step)} transform={transform}>
      <g strokeLinecap="round" strokeLinejoin="round">
        {ROSE_ANGLES.map((angle) => (
          <BladeGroup
            blade={{ ...ROSE_BARB, angle: angle + 36 }}
            fill="fill-motif-leaf"
            key={`barb-${angle}`}
            origin={ROSE_ORIGIN}
            step={base}
            verb="bloom"
          />
        ))}
        {ROSE_ANGLES.map((angle) => (
          <RosePetal angle={angle} key={`outer-${angle}`} petal={ROSE_OUTER} step={base + 1} />
        ))}
        {ROSE_ANGLES.map((angle) => (
          <RosePetal
            angle={angle + 36}
            key={`inner-${angle}`}
            petal={ROSE_INNER}
            step={base + 2}
          />
        ))}
        <g data-verb="bloom" style={stepStyle(base + 3)}>
          <circle
            className="fill-motif-gold stroke-motif-ink"
            cx={128}
            cy={128}
            r={29}
            strokeWidth={2.5}
          />
          <g className="fill-motif-ink">
            {ROSE_SEEDS.map((s) => (
              <circle cx={s.cx} cy={s.cy} key={`${s.cx},${s.cy}`} r={2.6} />
            ))}
          </g>
          <circle
            className="fill-motif-gold stroke-motif-ink"
            cx={128}
            cy={128}
            r={12}
            strokeWidth={1.5}
          />
        </g>
      </g>
    </g>
  );
}

/** Hull with a rounded lug at each end, where the thread eyes sit. */
const SHUTTLE_BODY =
  "M20 128C20 118 30 114 40 114C66 98 96 90 128 90S190 98 216 114C226 114 236 118 236 128S226 142 216 142C190 158 160 166 128 166S66 158 40 142C30 142 20 138 20 128Z";
/** The lower half of the hull, shaded so the silver reads as turned metal. */
const SHUTTLE_SHADE =
  "M20 128H236C236 138 226 142 216 142C190 158 160 166 128 166S66 158 40 142C30 142 20 138 20 128Z";
const SHUTTLE_THREADS = Array.from({ length: 23 }, (_, i) => 84 + i * 4)
  .map((x) => `M${x} 115V126M${x} 130V141`)
  .join("");

/** Weaver's shuttle: making, engineering, weaving systems together. Slides into place. */
export function Shuttle({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="shuttle" style={stepStyle(step)} transform={transform}>
      <g className="stroke-motif-ink" data-verb="slide" strokeLinejoin="round">
        <path className="fill-motif-silver" d={SHUTTLE_BODY} strokeWidth={3.5} />
        <path className="fill-motif-ink" d={SHUTTLE_SHADE} fillOpacity={0.12} stroke="none" />
        {/* Engraved rim following the hull. */}
        <path
          d="M52 116C76 104 100 98 128 98S180 104 204 116M52 140C76 152 100 158 128 158S180 152 204 140"
          fill="none"
          strokeOpacity={0.45}
          strokeWidth={1.5}
        />
        {/* Thread eyes in the end lugs. */}
        <ellipse className="fill-motif-paper" cx={36} cy={128} rx={8} ry={6} strokeWidth={2.5} />
        <ellipse className="fill-motif-paper" cx={220} cy={128} rx={8} ry={6} strokeWidth={2.5} />
        {/* The cavity and its wound pirn. */}
        <rect
          className="fill-motif-paper"
          height={44}
          rx={14}
          strokeWidth={3}
          width={124}
          x={66}
          y={106}
        />
        <rect
          className="fill-motif-silver"
          height={32}
          rx={10}
          strokeWidth={1.5}
          width={100}
          x={78}
          y={112}
        />
        <path d={SHUTTLE_THREADS} fill="none" strokeOpacity={0.7} strokeWidth={1.2} />
        <rect className="fill-motif-ink" height={32} rx={10} stroke="none" fillOpacity={0.14} width={100} x={78} y={112} />
        <path d="M80 128H176" fill="none" strokeWidth={1.5} />
        <path className="fill-motif-ink" d="M72 118H80V138H72Z" />
        <path className="fill-motif-ink" d="M176 118H184V138H176Z" />
      </g>
    </g>
  );
}

/** Cubic point on the palm stem, and its tangent angle (degrees from up). */
const STEM: readonly Point[] = [
  [40, 244],
  [58, 176],
  [104, 96],
  [224, 28],
];
function stemAt(t: number) {
  const m = 1 - t;
  const w = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t];
  const dw = [-3 * m * m, 3 * m * m - 6 * m * t, 6 * m * t - 3 * t * t, 3 * t * t];
  const sum = (weights: number[], k: 0 | 1) =>
    weights.reduce((acc, weight, i) => acc + weight * (STEM[i]?.[k] ?? 0), 0);
  const p: Point = [sum(w, 0), sum(w, 1)];
  const angle = (Math.atan2(sum(dw, 0), -sum(dw, 1)) * 180) / Math.PI;
  return { p, angle };
}

/** A long, arched leaflet with its base at the origin; `bend` sweeps the tip sideways. */
function leaflet(length: number, width: number, bend: number) {
  const l = length;
  const b = bend * l;
  const c = (x: number, y: number) => `${round(x)} ${round(y)}`;
  const tip = c(b * 0.32, -l);
  return {
    d: `M0 0C${c(width, -l * 0.3)} ${c(width * 0.6 + b * 0.2, -l * 0.74)} ${tip}C${c(-width * 0.6 + b * 0.2, -l * 0.74)} ${c(-width, -l * 0.3)} 0 0Z`,
    lit: `M0 0C${c(-width, -l * 0.3)} ${c(-width * 0.6 + b * 0.2, -l * 0.74)} ${tip}Q${c(b * 0.06, -l * 0.5)} 0 0Z`,
    rib: `M0 0Q${c(b * 0.06, -l * 0.5)} ${c(b * 0.26, -l * 0.86)}`,
  };
}

const LEAFLET_LENGTHS = [58, 74, 84, 86, 84, 78, 71, 63, 55, 47, 39, 31, 24, 18];
const PALM_LEAFLETS = LEAFLET_LENGTHS.flatMap((length, i) => {
  const { p, angle } = stemAt(0.08 + i * 0.066);
  const spread = 44 - i * 1.6;
  const width = 10.5 - i * 0.45;
  return [
    { p, angle: angle - spread, i, side: "a", ...leaflet(length, width, 0.22) },
    { p, angle: angle + spread, i, side: "b", ...leaflet(length * 0.94, width, -0.22) },
  ];
});
const PALM_TIP = { ...stemAt(0.985), ...leaflet(24, 5, 0) };
const PALM_STEM = `M${STEM.map(pt)
  .join(" ")
  .replace(/^(\S+ \S+) /, "$1C")}`;

type PalmBranchProps = PartProps & { side?: "left" | "right" };

/**
 * Heraldic palm frond: lineage and organic movement. The stem draws, then the
 * leaflets unfold from base to tip. `left` leans right, as on the identity sheet.
 */
export function PalmBranch({ className, side = "left", step, transform }: PalmBranchProps) {
  const base = step ?? 0;
  const mirror = side === "right" ? "translate(256 0) scale(-1 1)" : undefined;
  return (
    <g
      className={className}
      data-part={`palm-${side}`}
      style={stepStyle(step)}
      transform={transform}
    >
      <g transform={mirror}>
        <g
          data-verb="sway"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transformOrigin: "10% 100%" }}
        >
          {PALM_LEAFLETS.map((leaf) => (
            <g
              key={`${leaf.i}${leaf.side}`}
              transform={`translate(${pt(leaf.p)}) rotate(${round(leaf.angle)})`}
            >
              <g data-verb="bloom" style={stepStyle(base + 1 + leaf.i * 0.3)}>
                <path className="fill-motif-leaf stroke-motif-ink" d={leaf.d} strokeWidth={1.5} />
                <path className="fill-motif-paper" d={leaf.lit} fillOpacity={0.22} />
                <path
                  className="stroke-motif-ink"
                  d={leaf.rib}
                  fill="none"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                />
              </g>
            </g>
          ))}
          <g transform={`translate(${pt(PALM_TIP.p)}) rotate(${round(PALM_TIP.angle)})`}>
            <path
              className="fill-motif-leaf stroke-motif-ink"
              d={PALM_TIP.d}
              data-verb="bloom"
              strokeWidth={1.5}
              style={stepStyle(base + 5)}
            />
          </g>
          <path
            className="stroke-motif-ink"
            d={PALM_STEM}
            data-verb="draw"
            fill="none"
            pathLength={1}
            strokeWidth={6}
          />
          <path
            className="stroke-motif-leaf"
            d={PALM_STEM}
            data-verb="draw"
            fill="none"
            pathLength={1}
            strokeWidth={2.5}
          />
        </g>
      </g>
    </g>
  );
}

/**
 * A finger from its base `b` to its tip centre `t`, `h` half-wide, with a rounded tip.
 * The base is left open, so the finger merges into the palm drawn beneath it.
 */
function finger(b: Point, t: Point, h: number) {
  const len = Math.hypot(t[0] - b[0], t[1] - b[1]);
  const u: Point = [(t[0] - b[0]) / len, (t[1] - b[1]) / len];
  const n: Point = [-u[1], u[0]];
  const at = (p: Point, s: number): Point => [p[0] + n[0] * s, p[1] + n[1] * s];
  const mid: Point = [b[0] + u[0] * len * 0.56, b[1] + u[1] * len * 0.56];
  return {
    d: `M${pt(at(b, -h))}L${pt(at(t, -h))}A${h} ${h} 0 0 1 ${pt(at(t, h))}L${pt(at(b, h))}`,
    lit: `M${pt(at(b, -h * 0.7))}L${pt(at(t, -h * 0.7))}A${h * 0.7} ${h * 0.7} 0 0 1 ${pt(t)}L${pt(b)}Z`,
    crease: `M${pt(at(mid, -h * 0.7))}Q${pt([mid[0] - u[0] * 2.5, mid[1] - u[1] * 2.5])} ${pt(at(mid, h * 0.7))}`,
  };
}
/** The viewer's left hand, outermost finger first: tips step down and away from the centre. */
const HAND_FINGERS = [
  finger([79, 142], [87.5, 70], 5.5),
  finger([88.5, 138], [98, 48], 6),
  finger([99, 136], [109.5, 34], 6.5),
  finger([111, 134], [121.5, 26], 6.5),
];
/**
 * Palm and wrist: the heels meet at the centre line while the fingers above are cupped
 * apart. Filled across the knuckles and the cut-off wrist, but stroked only on its sides.
 */
const HAND_INNER = "M117.5 124C122 140 127 150 127.5 166V190C124 210 116 232 110 256";
const HAND_OUTER = "M62 256C66 234 71 210 70 190C68 170 72 150 73.5 132";
const HAND_THUMB = "M106 206C107 180 112 154 119 130A4.5 4.5 0 0 1 127.5 132C127 156 126 180 124 202";

function Hand() {
  return (
    <>
      {HAND_FINGERS.map((f) => (
        <g key={f.d}>
          <path d={f.d} />
          <path className="fill-motif-paper" d={f.lit} fillOpacity={0.22} stroke="none" />
          <path d={f.crease} fill="none" strokeOpacity={0.4} strokeWidth={1.25} />
        </g>
      ))}
      <path d={`${HAND_INNER}H62${HAND_OUTER.slice(7)}Z`} stroke="none" />
      <path d={HAND_INNER} fill="none" />
      <path d={HAND_OUTER} fill="none" />
      <path d={HAND_THUMB} />
      <path d="M119 131Q122 128 125 131M106 184Q112 181 117 184M76 228Q92 232 108 226" fill="none" strokeOpacity={0.4} strokeWidth={1.25} />
    </>
  );
}

/** Paired hands in prayer: family-history context. A single lift, never a repeated gesture. */
export function PrayerHands({ className, step, transform }: PartProps) {
  return (
    <g className={className} data-part="prayer-hands" style={stepStyle(step)} transform={transform}>
      <g
        className="fill-motif-skin stroke-motif-ink"
        data-verb="lift"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      >
        <Hand />
        <g transform="translate(256 0) scale(-1 1)">
          <Hand />
        </g>
      </g>
    </g>
  );
}

const TORSE_OUTLINE = "M38 110H218A18 18 0 0 1 218 146H38A18 18 0 0 1 38 110Z";
/** Tilted strands laid left to right, each over the last, alternating red and white. */
const TORSE_STRANDS = Array.from({ length: 10 }, (_, i) => ({
  cx: 22 + i * 24,
  red: i % 2 === 0,
}));

/** Red and white heraldic wreath: a twisted rope, shaded as a cylinder. Unfurls from the centre. */
export function Torse({ className, step, transform }: PartProps) {
  const clip = useId();
  return (
    <g className={className} data-part="torse" style={stepStyle(step)} transform={transform}>
      <clipPath id={clip}>
        <path d={TORSE_OUTLINE} />
      </clipPath>
      <g className="stroke-motif-ink" data-verb="unfurl" strokeLinejoin="round">
        <g clipPath={`url(#${clip})`}>
          {TORSE_STRANDS.map(({ cx, red }) => (
            <g key={cx} transform={`translate(${cx} 128) rotate(-56)`}>
              <ellipse
                className={red ? "fill-motif-rose" : "fill-motif-paper"}
                rx={25}
                ry={13}
                strokeWidth={2}
              />
              <path d="M-16 -4Q0 -9 16 -4" fill="none" strokeOpacity={0.3} strokeWidth={1.25} />
            </g>
          ))}
          <rect className="fill-motif-ink" height={12} opacity={0.14} stroke="none" width={256} y={134} />
          <rect className="fill-motif-paper" height={6} opacity={0.35} stroke="none" width={256} y={114} />
        </g>
        <path d={TORSE_OUTLINE} fill="none" strokeWidth={3} />
      </g>
    </g>
  );
}

type MottoScrollProps = PartProps & { text?: string };

/** Parchment heraldic scroll with rolled ends (PRECOR by default). The text is decorative; give prose alongside. */
export function MottoScroll({ className, step, text = "PRECOR", transform }: MottoScrollProps) {
  const baseline = useId();
  return (
    <g className={className} data-part="motto" style={stepStyle(step)} transform={transform}>
      <g className="stroke-motif-ink" data-verb="unfurl" strokeLinecap="round" strokeLinejoin="round">
        {/* Rolled ends behind the band, each capped with a red roundel. */}
        <g className="fill-motif-gold" strokeWidth={2.5}>
          <path d="M48 92C36 88 24 92 22 102V144C24 154 36 156 48 150Z" />
          <path d="M208 92C220 88 232 92 234 102V144C232 154 220 156 208 150Z" />
        </g>
        <g className="fill-motif-paper" fillOpacity={0.45} stroke="none">
          <path d="M48 92C36 88 24 92 22 102V144C24 154 36 156 48 150Z" />
          <path d="M208 92C220 88 232 92 234 102V144C232 154 220 156 208 150Z" />
        </g>
        <g fill="none" strokeWidth={2}>
          <path d="M22 102C22 92 36 90 38 100C40 108 30 110 28 104" />
          <path d="M234 102C234 92 220 90 218 100C216 108 226 110 228 104" />
        </g>
        <g className="fill-motif-rose" strokeWidth={1.5}>
          <circle cx={31} cy={101} r={4} />
          <circle cx={225} cy={101} r={4} />
        </g>
        {/* The band, sagging in the middle, washed to parchment. */}
        <path
          className="fill-motif-gold"
          d="M44 96Q128 132 212 96V142Q128 178 44 142Z"
          strokeWidth={2.5}
        />
        <path
          className="fill-motif-paper"
          d="M44 96Q128 132 212 96V142Q128 178 44 142Z"
          fillOpacity={0.45}
          stroke="none"
        />
        <path
          d="M50 104Q128 138 206 104M50 135Q128 169 206 135"
          fill="none"
          strokeOpacity={0.3}
          strokeWidth={1.25}
        />
        <path d="M46 130Q128 164 210 130" fill="none" id={baseline} stroke="none" />
        <text
          className="fill-motif-ink font-serif"
          fontSize={28}
          fontWeight={700}
          letterSpacing={2}
          stroke="none"
        >
          <textPath href={`#${baseline}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </g>
    </g>
  );
}
