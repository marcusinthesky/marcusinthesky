import { HeritageMark, Plate, type HeritageMotif } from "@marcusinthesky/ui";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** An optional heritage motif, drawn in beside the eyebrow. */
  motif?: HeritageMotif;
  /**
   * An optional specimen plate beside the title on wide screens: `name` is its
   * label beneath the frame, `caption` the line under that.
   */
  figure?: { name: string; caption: string; content: ReactNode };
};

export function PageHero({ description, eyebrow, figure, motif, title }: PageHeroProps) {
  const header = (
    <header className="animate-rise max-w-4xl">
      {/* The chapter thread, in the nearest data-chapter colour (ink by default). */}
      <span aria-hidden="true" className="mb-5 block h-0.5 w-12 bg-chapter" data-part="thread" />
      <p className="flex items-center gap-3 label-md text-primary">
        {motif ? <HeritageMark motif={motif} motion="reveal" size="md" /> : null}
        {eyebrow}
      </p>
      <h1 className="mt-5 text-balance font-serif text-display-lg">{title}</h1>
      <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );

  if (!figure) return <div className="py-16 sm:py-24">{header}</div>;

  return (
    <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      {header}
      <Plate
        caption={figure.name}
        className="mx-auto w-full max-w-md animate-rise [animation-delay:200ms]"
        note={figure.caption}
      >
        {figure.content}
      </Plate>
    </div>
  );
}
