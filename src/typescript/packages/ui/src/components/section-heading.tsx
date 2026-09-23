import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  index?: number;
  motif?: ReactNode;
};

export function SectionHeading({ description, eyebrow, index, motif, title }: SectionHeadingProps) {
  const hasMeta = eyebrow || index !== undefined || motif;
  return (
    <header className="relative border-t border-foreground pt-4">
      {/* The chapter thread: a short emphasised rule in the nearest data-chapter colour. */}
      <span
        aria-hidden="true"
        className="motif-thread absolute -top-px left-0 h-0.5 w-12 bg-chapter"
        data-part="thread"
      />
      {/* The identity sheet's compartment label: "01 / Primary mark" in spaced capitals. */}
      {hasMeta ? (
        <div className="label-lg flex items-center gap-3 text-foreground">
          {index !== undefined ? (
            <span className="tabular-nums">{String(index).padStart(2, "0")} /</span>
          ) : null}
          {eyebrow ? <p>{eyebrow}</p> : null}
          {motif ? <span className="inline-flex shrink-0 items-center">{motif}</span> : null}
        </div>
      ) : null}
      <h2 className="mt-3 max-w-3xl text-balance font-serif text-headline-md text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
