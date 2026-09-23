import type { ReactNode } from "react";

import { Motif, type MotifMotion, type MotifTone } from "./motif";
import { OpenBook, RouteDots, Rook, TableMountain } from "./parts/heritage";
import { Anchor, AntiqueLamp, MuralCrown } from "./parts/institutions";
import { CompassStar } from "./parts/patterns";
import { Lotus, PalmBranch, Rose, Shuttle } from "./parts/prain";

export type HeritageMotif =
  | "rook"
  | "lotus"
  | "rose"
  | "shuttle"
  | "palm"
  | "anchor"
  | "book"
  | "lamp"
  | "crown"
  | "route"
  | "mountain"
  | "star";

export const heritageMotifs: readonly HeritageMotif[] = [
  "rook",
  "lotus",
  "rose",
  "shuttle",
  "palm",
  "anchor",
  "book",
  "lamp",
  "crown",
  "route",
  "mountain",
  "star",
];

const PARTS: Record<HeritageMotif, () => ReactNode> = {
  rook: () => <Rook />,
  lotus: () => <Lotus />,
  rose: () => <Rose />,
  shuttle: () => <Shuttle />,
  palm: () => <PalmBranch />,
  anchor: () => <Anchor />,
  book: () => <OpenBook />,
  lamp: () => <AntiqueLamp />,
  crown: () => <MuralCrown />,
  route: () => <RouteDots />,
  mountain: () => <TableMountain />,
  star: () => <CompassStar />,
};

const SIZES = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
} as const;

/**
 * Wide motifs are framed to their artwork instead of the square, so a shuttle or
 * the mountain reads with the same weight as a square mark of the same size.
 */
const WIDE: Partial<Record<HeritageMotif, string>> = {
  shuttle: "12 84 232 88",
  mountain: "0 124 256 80",
};
const WIDE_SIZES: Record<keyof typeof SIZES, string> = {
  sm: "h-2.5 w-7",
  md: "h-3.5 w-9",
  lg: "h-4 w-11",
  xl: "h-6 w-16",
};

type HeritageMarkProps = {
  motif: HeritageMotif;
  tone?: MotifTone;
  size?: keyof typeof SIZES;
  motion?: MotifMotion;
  title?: string;
  className?: string;
};

/** One heritage motif at icon scale (16/24/32/48px). Decorative unless given a title. */
export function HeritageMark({
  className,
  motif,
  motion = "none",
  size = "md",
  title,
  tone = "heritage",
}: HeritageMarkProps) {
  const wide = WIDE[motif];
  const box = wide ? WIDE_SIZES[size] : SIZES[size];
  return (
    <Motif
      className={`inline-block shrink-0 ${box}${className ? ` ${className}` : ""}`}
      motion={motion}
      title={title}
      tone={tone}
      viewBox={wide ?? "0 0 256 256"}
    >
      {PARTS[motif]()}
    </Motif>
  );
}
