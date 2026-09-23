import type { Writing } from "@marcusinthesky/content";
import { Card } from "@marcusinthesky/ui";

import { NudgeArrow } from "@/components/nudge-arrow";

export function WritingCard({ entry, headingLevel = 2 }: { entry: Writing; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Card className="flex h-full flex-col">
      <p className="font-sans text-xs uppercase tracking-[0.12em] text-primary">
        {entry.source} · {entry.publishedAt}
      </p>
      <Heading className="mt-4 font-serif text-2xl font-medium leading-snug">{entry.title}</Heading>
      <p className="mt-3 flex-1 text-muted-foreground">{entry.summary}</p>
      <a
        className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-sans text-xs uppercase tracking-[0.1em] text-primary after:absolute after:inset-0"
        href={entry.canonicalUrl}
        rel="noreferrer"
      >
        <span className="underline-draw">Read at {entry.source}</span> <NudgeArrow />
      </a>
    </Card>
  );
}
