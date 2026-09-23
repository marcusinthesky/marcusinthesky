import type { Metadata } from "next";

import { writing } from "@marcusinthesky/content";

import { KalmanFilter } from "@/components/kalman-filter";
import { PageHero } from "@/components/page-hero";
import { WritingCard } from "@/components/writing-card";

export const metadata: Metadata = {
  title: "Writing",
  description: "Selected technical and research writing by Marcus Gawronsky.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const orderedWriting = [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="page-shell" data-chapter="rose">
      <PageHero
        motif="rose"
        description="The machinery around the research: reproducibility, computational provenance, research infrastructure, modelling choices, and the consequences of treating analysis as software. Some essays are published elsewhere; this site keeps a durable index."
        eyebrow="Writing"
        title="Working notes on research, software, and evidence"
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
