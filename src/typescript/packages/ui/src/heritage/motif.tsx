import { useId, type CSSProperties, type ReactNode } from "react";

export type MotifTone = "heritage" | "ink" | "sacs" | "uct";
export type MotifMotion = "none" | "reveal" | "scroll" | "hover";

type MotifProps = {
  viewBox: string;
  tone?: MotifTone;
  motion?: MotifMotion;
  /** Gives the artwork an accessible name; without it the motif is decorative. */
  title?: string;
  className?: string;
  preserveAspectRatio?: string;
  children: ReactNode;
};

/** The root of every heritage motif: sets the tone's paint roles and the motion trigger. */
export function Motif({
  children,
  className,
  motion = "none",
  preserveAspectRatio,
  title,
  tone = "heritage",
  viewBox,
}: MotifProps) {
  const titleId = useId();
  const labelled = title
    ? { role: "img", "aria-labelledby": titleId }
    : { "aria-hidden": true as const };
  return (
    <svg
      className={className ? `motif ${className}` : "motif"}
      data-motion={motion}
      data-tone={tone}
      focusable="false"
      preserveAspectRatio={preserveAspectRatio}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...labelled}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Props shared by every part: placement inside a composition and a stagger index. */
export type PartProps = {
  transform?: string;
  className?: string;
  /** Stagger index: delays reveal/hover motion and offsets the scroll range. */
  step?: number;
};

export function stepStyle(step: number | undefined): CSSProperties | undefined {
  return step === undefined ? undefined : ({ "--motif-step": step } as CSSProperties);
}
