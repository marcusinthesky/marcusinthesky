import type { Metadata } from "next";

import { writing } from "@marcusinthesky/content";

import { PageHero } from "@/components/page-hero";
import { WritingCard } from "@/components/writing-card";

export const metadata: Metadata = {
  title: "Writing",
  description: "Selected technical and research writing by Marcus Gawronsky.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const orderedWriting = [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="page-shell">
      <PageHero
        description="A curated index of writing published across research projects, product work, and open technical communities. Links resolve to the original canonical publisher."
        eyebrow="Writing"
        title="Notes from research and production"
      />
      <section className="grid gap-5 border-t border-border py-14 md:grid-cols-2">
        {orderedWriting.map((entry) => (
          <WritingCard entry={entry} key={entry.slug} />
        ))}
      </section>
    </div>
  );
}
