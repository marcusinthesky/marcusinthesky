import type { Publication } from "@marcusinthesky/content";
import { Badge, Card } from "@marcusinthesky/ui";

import { AskAi, paperPrompt } from "@/components/ask-ai";
import { BrandIcon } from "@/components/brand-icon";
import { NudgeArrow } from "@/components/nudge-arrow";

export function PublicationCard({
  publication,
  headingLevel = 2,
}: {
  publication: Publication;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{publication.year}</Badge>
        <span className="font-sans text-xs uppercase tracking-[0.1em] text-muted-foreground">
          {publication.status}
        </span>
      </div>
      <Heading className="mt-5 max-w-4xl font-serif text-2xl font-medium leading-snug">
        {publication.title}
      </Heading>
      <p className="mt-3 text-sm text-muted-foreground">{publication.authors.join(" · ")}</p>
      <p className="mt-4 max-w-3xl text-muted-foreground">{publication.summary}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-border pt-4">
        <div className="flex flex-wrap gap-4">
          {publication.links.map((link) => (
            <a
              className="inline-flex min-h-11 items-center gap-2 font-sans text-xs uppercase tracking-[0.1em] text-primary"
              href={link.url}
              key={link.url}
              rel="noreferrer"
            >
              <BrandIcon className="size-4" label={link.label} />
              <span className="underline-draw">{link.label}</span> <NudgeArrow />
            </a>
          ))}
        </div>
        <AskAi compact prompt={paperPrompt(publication)} />
      </div>
    </Card>
  );
}
