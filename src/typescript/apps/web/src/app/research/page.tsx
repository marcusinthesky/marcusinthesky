import type { Metadata } from "next";

import { profile, projects, publications } from "@marcusinthesky/content";
import { Badge, ButtonLink, Card } from "@marcusinthesky/ui";

import { PageHero } from "@/components/page-hero";
import { PcaCloud } from "@/components/pca-cloud";
import { PublicationCard } from "@/components/publication-card";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research programme and methods spanning quantitative finance and information geometry.",
  alternates: { canonical: "/research/" },
};

export default function ResearchPage() {
  return (
    <div className="page-shell">
      <PageHero
        description="My current programme studies what probability-valued information can reveal about firms, dependence, spatial interaction, and portfolio risk."
        eyebrow="Research"
        title="Distributional information as financial structure"
        figure={{
          caption: "Many observed dimensions → few principal directions",
          content: <PcaCloud />,
        }}
      />
      <section className="grid gap-5 border-t border-border py-14 md:grid-cols-3">
        {[
          [
            "Representations",
            "Language-model representations become empirical objects rather than opaque features.",
          ],
          [
            "Geometry",
            "Optimal transport and information geometry describe relationships among probability distributions.",
          ],
          [
            "Evidence",
            "Econometrics, simulation, replication pipelines, and formalisation constrain the claims.",
          ],
        ].map(([title, description]) => (
          <Card key={title}>
            <h2 className="font-serif text-2xl">{title}</h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </Card>
        ))}
      </section>
      <section className="border-t border-border py-14">
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge key={interest}>{interest}</Badge>
          ))}
        </div>
        <div className="mt-10 space-y-5">
          {publications.slice(0, 3).map((publication) => (
            <PublicationCard headingLevel={3} key={publication.slug} publication={publication} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/publications/">All publications</ButtonLink>
          <ButtonLink href={projects[0].links[0].url} variant="secondary">
            Research website
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
