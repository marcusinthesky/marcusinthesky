import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** An optional section figure, shown beside the title on wide screens. */
  figure?: { caption: string; content: ReactNode };
};

export function PageHero({ description, eyebrow, figure, title }: PageHeroProps) {
  const header = (
    <header className="animate-rise max-w-4xl">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-5 text-balance font-serif text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
        {title}
      </h1>
      <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );

  if (!figure) return <div className="py-16 sm:py-24">{header}</div>;

  return (
    <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      {header}
      <figure className="mx-auto w-full max-w-md animate-rise [animation-delay:200ms]">
        {figure.content}
        <figcaption className="mt-4 border-t border-border pt-3 font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {figure.caption}
        </figcaption>
      </figure>
    </div>
  );
}
