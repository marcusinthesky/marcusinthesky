import { InstitutionalDevice } from "./institutional-device";
import { Motif } from "./motif";
import { MottoRibbon } from "./parts/institutions";

const MOTTOS = {
  sacs: {
    motto: "Spectemur Agendo",
    translation: "Let us be judged by our deeds",
    caption: "Motto of the South African College Schools",
  },
  uct: {
    motto: "Spes Bona",
    translation: "Good Hope",
    caption: "Motto of the University of Cape Town",
  },
} as const;

type MottoCalloutProps = {
  institution: keyof typeof MOTTOS;
  className?: string;
};

/** A quiet editorial motto: the shared college device, a small ribbon, the motto and its translation. */
export function MottoCallout({ className, institution }: MottoCalloutProps) {
  const { caption, motto, translation } = MOTTOS[institution];
  return (
    <figure
      className={`flex items-center gap-5 border-t border-border pt-5${className ? ` ${className}` : ""}`}
    >
      <InstitutionalDevice className="h-16 w-auto shrink-0" motion="scroll" tone={institution} />
      <div className="min-w-0">
        <Motif
          className="mb-2 h-10 w-auto"
          motion="scroll"
          tone={institution}
          viewBox="0 64 256 90"
        >
          <MottoRibbon text={motto} />
        </Motif>
        <blockquote>
          <p
            className="font-serif text-xl [font-variant-caps:all-small-caps] tracking-wide"
            lang="la"
          >
            {motto}
          </p>
          <p className="text-muted-foreground">{translation}</p>
        </blockquote>
        <figcaption className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
