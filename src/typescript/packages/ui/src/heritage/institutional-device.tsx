import { Motif, type MotifMotion, type MotifTone } from "./motif";
import { OpenBook } from "./parts/heritage";
import { Anchor, AntiqueLamp } from "./parts/institutions";

type InstitutionalDeviceProps = {
  tone?: MotifTone;
  motion?: MotifMotion;
  title?: string;
  className?: string;
};

/**
 * The South African College charges shared by SACS and UCT, without the shield:
 * the open book and the lamp of learning either side of the anchor of Good Hope.
 */
export function InstitutionalDevice({
  className,
  motion = "none",
  title,
  tone = "sacs",
}: InstitutionalDeviceProps) {
  return (
    <Motif className={className} motion={motion} title={title} tone={tone} viewBox="0 10 736 240">
      <OpenBook step={1} transform="translate(0 30) scale(.86)" />
      <Anchor step={0} transform="translate(248 0)" />
      <AntiqueLamp step={2} transform="translate(476 16) scale(.9)" />
    </Motif>
  );
}
