import type { Metadata } from "next";

import { profile, publications } from "@marcusinthesky/content";

import { JsonLd } from "@/components/json-ld";
import { AskAi, researchPrompt } from "@/components/ask-ai";
import { MonteCarloFan } from "@/components/monte-carlo-fan";
import { PageHero } from "@/components/page-hero";
import { PublicationCard } from "@/components/publication-card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Publications",
  description: "Publications and research outputs by Marcus Gawronsky.",
  path: "/publications/",
});

export default function PublicationsPage() {
  const structuredData = publications.map((publication) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publication.title,
    author: publication.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: String(publication.year),
    description: publication.summary,
    keywords: publication.keywords,
    url: publication.links[0].url,
  }));

  return (
    <div className="page-shell" data-chapter="lotus" data-nav="research">
      <JsonLd data={structuredData} />
      <PageHero
        motif="book"
        description="Canonical paper links and current manuscript status, backed by the same structured records used for machine-readable metadata."
        eyebrow="Publications"
        title="Research outputs"
        figure={{
          name: "Monte Carlo paths",
          caption: "Simulated paths → quantile bands → a risk summary",
          content: <MonteCarloFan />,
        }}
      />
      <div className="-mt-6 mb-10">
        <AskAi label="Ask AI about this research" prompt={researchPrompt} />
      </div>
      <section className="space-y-5 border-t border-border py-14">
        {publications.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </section>
      <aside className="mb-16 border-l-2 border-primary pl-5 text-muted-foreground">
        Citation counts remain on Google Scholar rather than being scraped into this site. View the
        current profiles on{" "}
        <a
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          href={profile.links.find(({ label }) => label === "Google Scholar")?.url}
        >
          Google Scholar
        </a>{" "}
        and{" "}
        <a
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          href={profile.links.find(({ label }) => label === "ORCID")?.url}
        >
          ORCID
        </a>
        .
      </aside>
    </div>
  );
}
