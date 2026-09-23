import { Motif, type MotifMotion, type MotifTone } from "./motif";
import { OpenBook } from "./parts/heritage";
import { Anchor, AntiqueLamp, MuralCrown } from "./parts/institutions";

type InstitutionalDeviceProps = {
  tone?: MotifTone;
  motion?: MotifMotion;
  title?: string;
  className?: string;
};

/**
 * The South African College charges shared by SACS and UCT: anchor, mural crown,
 * open book and lamp, balanced around the anchor without the shield.
 */
export function InstitutionalDevice({
  className,
  motion = "none",
  title,
  tone = "sacs",
}: InstitutionalDeviceProps) {
  return (
    <Motif className={className} motion={motion} title={title} tone={tone} viewBox="-50 0 580 300">
      <MuralCrown step={0} transform="translate(169 -24) scale(.55)" />
      <Anchor step={1} transform="translate(126 64) scale(.9)" />
      <AntiqueLamp step={2} transform="translate(-80 96) scale(.78)" />
      <OpenBook step={3} transform="translate(352 110) scale(.7)" />
    </Motif>
  );
}
