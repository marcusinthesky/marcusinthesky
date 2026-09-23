import { profile, projects, publications, writing } from "@marcusinthesky/content";
import { ButtonLink, DotField, HeritageMark, SectionHeading } from "@marcusinthesky/ui";

import { AppearingIn } from "@/components/appearing-in";
import { AskAi, researchPrompt } from "@/components/ask-ai";
import { GaltonBoard } from "@/components/galton-board";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { WritingCard } from "@/components/writing-card";

const pillars = [
  [
    "Quantitative research",
    "Models, estimators, geometric representations, uncertainty, portfolio risk, and empirical testing.",
  ],
  [
    "Research engineering",
    "Reproducible computational systems, provenance, validation, automation, and production-quality scientific software.",
  ],
  [
    "Applied AI",
    "Modern representation models as measurable objects inside statistical and decision systems—not merely as interfaces.",
  ],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="page-shell grid items-center gap-12 pt-16 pb-12 sm:pt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="animate-rise label-md">
              Quantitative research · Applied AI · Research engineering
            </p>
            <h1 className="mt-6 text-balance font-serif text-display-xl">
              Research made operational.
            </h1>
            <p className="mt-8 max-w-2xl animate-rise text-pretty text-xl leading-relaxed text-muted-foreground [animation-delay:150ms] sm:text-2xl">
              {profile.summary}
            </p>
            <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:300ms]">
              <ButtonLink href="/research/">Explore the research</ButtonLink>
              <ButtonLink href="/projects/" variant="secondary">
                See the systems
              </ButtonLink>
            </div>
            <div className="mt-8 animate-rise [animation-delay:450ms]">
              <AskAi label="Ask about this work" prompt={researchPrompt} />
            </div>
          </div>
          <figure className="mx-auto w-full max-w-md animate-rise [animation-delay:200ms]">
            <GaltonBoard />
            <figcaption className="mt-4 border-t border-border pt-3 label-sm text-muted-foreground">
              Independent choices → binomial paths → a normal law
            </figcaption>
          </figure>
        </div>
      </section>

      <AppearingIn />

      <section className="page-shell py-20">
        <SectionHeading
          description="My work sits between research and production: probability, representation learning, information geometry, econometrics, optimisation, and the practical problem of making analytical results reproducible."
          eyebrow="The work"
          index={1}
          motif={<HeritageMark motif="book" motion="scroll" size="lg" />}
          title="From mathematical structure to working machinery"
        />
        <blockquote className="mt-10 max-w-3xl border-l-2 border-foreground pl-6 font-serif text-headline-md">
          Can an interesting idea become rigorous enough to defend and robust enough to use?
        </blockquote>
        <dl className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
          {pillars.map(([term, detail]) => (
            <div key={term}>
              <dt className="label-md">{term}</dt>
              <dd className="mt-3 text-muted-foreground">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="page-shell py-20">
        <SectionHeading
          description="Each project pairs a research question with the computational machinery needed to test it, reproduce it, and carry it forward."
          eyebrow="Selected work"
          index={2}
          motif={<HeritageMark motif="shuttle" motion="scroll" size="lg" />}
          title="Research, systems, and tools"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects
            .filter(({ featured }) => featured)
            .map((project) => (
              <ProjectCard headingLevel={3} key={project.slug} project={project} />
            ))}
        </div>
      </section>

      <div aria-hidden="true" className="page-shell">
        <DotField className="mx-auto max-w-3xl" columns={36} rows={2} />
      </div>

      <section className="border-y border-border py-20" data-chapter="lotus">
        <div className="page-shell">
          <SectionHeading
            description="Whether information in language-model representations can be given mathematical structure—and what that structure says about dependence, interaction, and risk."
            eyebrow="Research"
            index={3}
            motif={<HeritageMark motif="lotus" motion="scroll" size="lg" />}
            title="Questions I am working on"
          />
          <div className="mt-10 space-y-5">
            {publications.slice(0, 3).map((publication) => (
              <PublicationCard headingLevel={3} key={publication.slug} publication={publication} />
            ))}
          </div>
          <ButtonLink className="mt-8" href="/publications/" variant="secondary">
            View all research
          </ButtonLink>
        </div>
      </section>

      <section className="page-shell py-20" data-chapter="rose">
        <SectionHeading
          description="The machinery around the research: reproducibility, provenance, modelling choices, and the consequences of treating analysis as software."
          eyebrow="Writing"
          index={4}
          motif={<HeritageMark motif="rose" motion="scroll" size="lg" />}
          title="Working notes on research, software, and evidence"
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
