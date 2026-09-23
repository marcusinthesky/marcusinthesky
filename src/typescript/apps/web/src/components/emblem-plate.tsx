import { Lotus, Motif, PalmBranch, Plate, Rook, Rose, Shuttle } from "@marcusinthesky/ui";
import type { ReactNode } from "react";

/** Chapter emblems: one constituent motif each, never a shield composition. */
const EMBLEMS = {
  lotus: { part: <Lotus />, viewBox: "0 0 256 256" },
  rose: { part: <Rose />, viewBox: "0 0 256 256" },
  shuttle: { part: <Shuttle />, viewBox: "12 84 232 88" },
  palm: { part: <PalmBranch />, viewBox: "0 0 256 256" },
  rook: { part: <Rook />, viewBox: "0 0 256 256" },
} satisfies Record<string, { part: ReactNode; viewBox: string }>;

type Emblem = keyof typeof EMBLEMS;

/** One motif at plate scale, centred in a square field, or a half-height field when `wide`. */
export function Emblem({ motif, wide = false }: { motif: Emblem; wide?: boolean }) {
  const { part, viewBox } = EMBLEMS[motif];
  return (
    <div className={`grid place-items-center ${wide ? "aspect-[2/1]" : "aspect-square"}`}>
      <Motif className="specimen-motif block h-auto w-4/5" motion="scroll" viewBox={viewBox}>
        {part}
      </Motif>
    </div>
  );
}

type EmblemPlateProps = {
  motif: Emblem;
  caption: string;
  note?: string;
  wide?: boolean;
  className?: string;
};

/** A chapter's frontispiece: its motif at plate scale, framed and captioned like a specimen. */
export function EmblemPlate({ caption, className, motif, note, wide }: EmblemPlateProps) {
  return (
    <Plate caption={caption} className={className} note={note}>
      <Emblem motif={motif} wide={wide} />
    </Plate>
  );
}
