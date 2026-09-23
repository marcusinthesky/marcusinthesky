type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ description, eyebrow, title }: SectionHeadingProps) {
  return (
    <header className="reveal max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl font-medium tracking-[-0.025em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg text-muted-foreground">{description}</p> : null}
    </header>
  );
}
