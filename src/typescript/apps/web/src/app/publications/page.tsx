import type { Metadata } from "next";

import { profile, publications } from "@marcusinthesky/content";

import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PublicationCard } from "@/components/publication-card";

export const metadata: Metadata = {
  title: "Publications",
  description: "Publications and research outputs by Marcus Gawronsky.",
  alternates: { canonical: "/publications/" },
};

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
    <div className="page-shell">
      <JsonLd data={structuredData} />
      <PageHero
        description="Canonical paper links and current manuscript status, backed by the same structured records used for machine-readable metadata."
        eyebrow="Publications"
        title="Research outputs"
      />
      <section className="space-y-5 border-t border-border py-14">
        {publications.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </section>
      <aside className="mb-16 border-l-2 border-accent pl-5 text-muted-foreground">
        Citation counts remain on Google Scholar rather than being scraped into this site. View the
        current profiles on{" "}
        <a
          className="text-accent"
          href={profile.links.find(({ label }) => label === "Google Scholar")?.url}
        >
          Google Scholar
        </a>{" "}
        and{" "}
        <a className="text-accent" href={profile.links.find(({ label }) => label === "ORCID")?.url}>
          ORCID
        </a>
        .
      </aside>
    </div>
  );
}
