type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ description, eyebrow, title }: PageHeroProps) {
  return (
    <header className="enter max-w-4xl py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h1 className="mt-5 text-balance font-serif text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
        {title}
      </h1>
      <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );
}
