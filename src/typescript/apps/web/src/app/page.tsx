import { profile, projects, publications, writing } from "@marcusinthesky/content";
import { ButtonLink, SectionHeading } from "@marcusinthesky/ui";

import { AppearingIn } from "@/components/appearing-in";
import { AskAi, researchPrompt } from "@/components/ask-ai";
import { GaltonBoard } from "@/components/galton-board";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { WritingCard } from "@/components/writing-card";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="page-shell grid items-center gap-12 pt-16 pb-12 sm:pt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="animate-rise font-sans text-xs uppercase tracking-[0.18em]">
              Applied AI · Decision science · Quantitative research
            </p>
            <h1 className="mt-6 text-balance font-serif text-6xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-8xl">
              Ideas that survive contact with production.
            </h1>
            <p className="mt-8 max-w-2xl animate-rise text-pretty text-xl leading-relaxed text-muted-foreground [animation-delay:150ms] sm:text-2xl">
              {profile.summary}
            </p>
            <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:300ms]">
              <ButtonLink href="/research/">Explore research</ButtonLink>
              <ButtonLink href="/projects/" variant="secondary">
                See engineering work
              </ButtonLink>
            </div>
            <div className="mt-8 animate-rise [animation-delay:450ms]">
              <AskAi label="Ask AI about this research" prompt={researchPrompt} />
            </div>
          </div>
          <figure className="mx-auto w-full max-w-md animate-rise [animation-delay:200ms]">
            <GaltonBoard />
            <figcaption className="mt-4 border-t border-border pt-3 font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Independent choices → binomial paths → a normal law
            </figcaption>
          </figure>
        </div>
        <dl className="page-shell grid grid-cols-2 gap-y-5 border-t border-border py-6 font-sans text-xs uppercase tracking-[0.12em] sm:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Based in</dt>
            <dd className="mt-1">Cape Town</dd>
          </div>
          {profile.roles.map((role, index) => (
            <div key={role}>
              <dt className="text-muted-foreground">Role {String(index + 1).padStart(2, "0")}</dt>
              <dd className="mt-1">{role}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AppearingIn />

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

      <section className="border-y border-border py-20">
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
          eyebrow="Blog"
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
