import { profile, projects, publications, writing } from "@marcusinthesky/content";
import { ButtonLink, SectionHeading } from "@marcusinthesky/ui";

import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { WritingCard } from "@/components/writing-card";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="rule-grid absolute inset-0" />
        <div className="page-shell relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Applied AI · Decision science · Quantitative research
            </p>
            <h1 className="mt-6 max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-8xl">
              Ideas that survive contact with production.
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              {profile.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/research/">Explore research</ButtonLink>
              <ButtonLink href="/projects/" variant="secondary">
                See engineering work
              </ButtonLink>
            </div>
          </div>
          <aside className="border-l border-border pl-6 font-mono text-xs uppercase tracking-[0.11em] text-muted-foreground">
            <p className="text-foreground">Cape Town, South Africa</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {profile.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          description="Research questions, production constraints, and reproducibility treated as one system."
          eyebrow="Selected work"
          title="Projects with evidence behind them"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects
            .filter(({ featured }) => featured)
            .map((project) => (
              <ProjectCard headingLevel={3} key={project.slug} project={project} />
            ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/35 py-20">
        <div className="page-shell">
          <SectionHeading
            description="Work at the intersection of information geometry, representation learning, spatial econometrics, and portfolio risk."
            eyebrow="Research"
            title="Current publications"
          />
          <div className="mt-10 space-y-5">
            {publications.slice(0, 3).map((publication) => (
              <PublicationCard headingLevel={3} key={publication.slug} publication={publication} />
            ))}
          </div>
          <ButtonLink className="mt-8" href="/publications/" variant="secondary">
            View all publications
          </ButtonLink>
        </div>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          description="Selected articles remain at their canonical publishers; this site provides a durable, curated index."
          eyebrow="Writing"
          title="Notes from research and production"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[...writing]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .slice(0, 3)
            .map((entry) => (
              <WritingCard entry={entry} headingLevel={3} key={entry.slug} />
            ))}
        </div>
      </section>
    </>
  );
}
