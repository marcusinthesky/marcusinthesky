import { projects, publications, writing } from "@marcusinthesky/content";
import {
  ButtonLink,
  HeritageMark,
  PalmCorner,
  Plate,
  SectionHeading,
  type HeritageMotif,
} from "@marcusinthesky/ui";

import { AppearingIn } from "@/components/appearing-in";
import { AskAi, researchPrompt } from "@/components/ask-ai";
import { EmblemPlate } from "@/components/emblem-plate";
import { GaltonBoard } from "@/components/galton-board";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { WritingCard } from "@/components/writing-card";

// Each pillar introduces the motif its chapter carries below: lotus for research,
// shuttle for engineering, the compass star for applied decisions.
const pillars: readonly (readonly [string, string, HeritageMotif])[] = [
  [
    "Quantitative research",
    "Models, estimators, geometric representations, uncertainty, portfolio risk, and empirical testing.",
    "lotus",
  ],
  [
    "Research engineering",
    "Reproducible computational systems, provenance, validation, automation, and production-quality scientific software.",
    "shuttle",
  ],
  [
    "Applied AI",
    "Modern representation models as measurable objects inside statistical and decision systems—not merely as interfaces.",
    "star",
  ],
];

// The page follows the identity sheet: a ruled title block, then chapters laid out
// as compartments of framed, captioned plates. Colour mass lives in the plates.
export default function HomePage() {
  const featured = projects.filter(({ featured }) => featured);
  const recentWriting = [...writing]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-border">
        <div className="page-shell grid animate-rise gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-0">
          <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_12rem] lg:pr-12">
            <div>
              <h1 className="text-balance font-serif text-display-lg">
                Research made operational.
              </h1>
              <p className="mt-5 max-w-md text-balance label-md text-muted-foreground">
                {"Quantitative\u00a0research · Applied\u00a0AI · Research\u00a0engineering"}
              </p>
            </div>
            <PalmCorner
              className="size-40 justify-self-start sm:size-48 sm:justify-self-end"
              motion="reveal"
              side="right"
            />
          </div>
          <div className="lg:border-l lg:border-border lg:pl-12">
            <p className="max-w-lg text-balance font-serif text-headline-md">
              Ideas that survive contact with production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/research/">Explore the research</ButtonLink>
              <ButtonLink arrow href="/projects/" variant="text">
                See the systems
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-12 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0">
        <Plate
          caption="Galton board"
          className="w-full max-w-md justify-self-center lg:max-w-none lg:pr-10"
          note="Independent choices → binomial paths → a normal law"
        >
          <GaltonBoard />
        </Plate>
        <div className="lg:border-l lg:border-border lg:pl-10">
          <SectionHeading
            description="My work sits between research and production: probability, representation learning, information geometry, econometrics, optimisation, and the practical problem of making analytical results reproducible."
            eyebrow="The work"
            index={1}
            title="From mathematical structure to working machinery"
          />
          <blockquote className="mt-8 max-w-2xl border-l-2 border-foreground pl-5 font-serif text-headline-sm">
            Can an interesting idea become rigorous enough to defend and robust enough to use?
          </blockquote>
          <dl className="mt-10">
            {pillars.map(([term, detail, motif]) => (
              <div
                className="grid gap-2 border-t border-border py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6"
                key={term}
              >
                <dt className="label-md flex items-center gap-3">
                  <HeritageMark motif={motif} motion="scroll" size="lg" />
                  {term}
                </dt>
                <dd className="text-muted-foreground">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AppearingIn />

      <section className="page-shell py-16">
        <SectionHeading
          description="Each project pairs a research question with the computational machinery needed to test it, reproduce it, and carry it forward."
          eyebrow="Selected work"
          index={2}
          title="Research, systems, and tools"
        />
        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <EmblemPlate
            caption="Shuttle"
            className="max-w-56 sm:max-w-none"
            motif="shuttle"
            note="A weaver's shuttle"
            wide
          />
          {featured.map((project) => (
            <ProjectCard headingLevel={3} key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <div className="page-shell">
        <section className="py-16" data-chapter="lotus">
          <SectionHeading
            description="Whether information in language-model representations can be given mathematical structure—and what that structure says about dependence, interaction, and risk."
            eyebrow="Research"
            index={3}
            title="Questions I am working on"
          />
          <div className="mt-10 grid items-start gap-6 xl:grid-cols-[10rem_minmax(0,1fr)]">
            <EmblemPlate
              caption="Lotus"
              className="max-w-40"
              motif="lotus"
              note="Nelumbo nucifera."
            />
            <div className="space-y-5">
              {publications.slice(0, 3).map((publication) => (
                <PublicationCard
                  headingLevel={3}
                  key={publication.slug}
                  publication={publication}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/publications/" variant="secondary">
              View all research
            </ButtonLink>
            <AskAi label="Ask about this work" prompt={researchPrompt} />
          </div>
        </section>

        <section className="border-t border-border py-16" data-chapter="rose">
          <SectionHeading
            description="The machinery around the research: reproducibility, provenance, modelling choices, and treating analysis as software."
            eyebrow="Writing"
            index={4}
            title="Working notes"
          />
          <div className="mt-10 grid items-start gap-8 xl:grid-cols-[10rem_minmax(0,1fr)]">
            <EmblemPlate
              caption="Rose"
              className="max-w-40"
              motif="rose"
              note="Hulthemia. Rosa persica."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {recentWriting.map((entry) => (
                <WritingCard entry={entry} headingLevel={3} key={entry.slug} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
