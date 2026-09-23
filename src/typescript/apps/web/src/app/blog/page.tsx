import type { Metadata } from "next";

import { writing } from "@marcusinthesky/content";

import { KalmanFilter } from "@/components/kalman-filter";
import { PageHero } from "@/components/page-hero";
import { WritingCard } from "@/components/writing-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Selected technical and research writing by Marcus Gawronsky.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const orderedWriting = [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="page-shell">
      <PageHero
        description="A curated index of writing published across research projects, product work, and open technical communities. Links resolve to the original canonical publisher."
        eyebrow="Blog"
        title="Notes from research and production"
        figure={{
          caption: "Noisy observations → a filtered estimate of the latent state",
          content: <KalmanFilter />,
        }}
      />
      <section className="grid gap-5 border-t border-border py-14 md:grid-cols-2">
        {orderedWriting.map((entry) => (
          <WritingCard entry={entry} key={entry.slug} />
        ))}
      </section>
    </div>
  );
}
