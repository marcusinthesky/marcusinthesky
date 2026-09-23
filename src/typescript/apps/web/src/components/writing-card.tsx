import type { Writing } from "@marcusinthesky/content";
import { Card } from "@marcusinthesky/ui";
import { ArrowUpRight } from "lucide-react";

export function WritingCard({ entry, headingLevel = 2 }: { entry: Writing; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Card className="flex h-full flex-col">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
        {entry.source} · {entry.publishedAt}
      </p>
      <Heading className="mt-4 font-serif text-2xl font-medium leading-snug">{entry.title}</Heading>
      <p className="mt-3 flex-1 text-muted-foreground">{entry.summary}</p>
      <a
        className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.1em] text-accent"
        href={entry.canonicalUrl}
        rel="noreferrer"
      >
        Read at {entry.source} <ArrowUpRight aria-hidden="true" size={14} />
      </a>
    </Card>
  );
}
