import type { ReactNode } from "react";

import { Motif, type MotifMotion, type MotifTone } from "./motif";
import { OpenBook, RouteDots, Rook, TableMountain } from "./parts/heritage";
import { Anchor, AntiqueLamp, MuralCrown } from "./parts/institutions";
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
  | "mountain";

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
};

const SIZES = { sm: "size-4", md: "size-6", lg: "size-8" } as const;

type HeritageMarkProps = {
  motif: HeritageMotif;
  tone?: MotifTone;
  size?: keyof typeof SIZES;
  motion?: MotifMotion;
  title?: string;
  className?: string;
};

/** One heritage motif at icon scale (16/24/32px). Decorative unless given a title. */
export function HeritageMark({
  className,
  motif,
  motion = "none",
  size = "md",
  title,
  tone = "heritage",
}: HeritageMarkProps) {
  return (
    <Motif
      className={`inline-block shrink-0 ${SIZES[size]}${className ? ` ${className}` : ""}`}
      motion={motion}
      title={title}
      tone={tone}
      viewBox="0 0 256 256"
    >
      {PARTS[motif]()}
    </Motif>
  );
}
