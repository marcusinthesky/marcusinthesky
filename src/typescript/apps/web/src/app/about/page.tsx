import type { Metadata } from "next";

import { education, experience, profile } from "@marcusinthesky/content";
import {
  ArchivalSeal,
  Badge,
  Card,
  FloraDivider,
  HeritageMark,
  MottoCallout,
  Timeline,
} from "@marcusinthesky/ui";

import { Emblem } from "@/components/emblem-plate";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Professional background, interests, and education of Marcus Gawronsky.",
  alternates: { canonical: "/about/" },
};

function educationMotif(qualification: string) {
  if (qualification.startsWith("PhD")) return "lamp" as const;
  if (qualification.startsWith("MSc")) return "book" as const;
  return "anchor" as const;
}

const principles = [
  ["Mathematically explicit", "Assumptions stated, estimators defined, claims bounded."],
  ["Computationally reproducible", "Every result traceable to its data, code, and environment."],
  ["Empirically testable", "Claims exposed to data that could contradict them."],
  ["Operationally useful", "Robust enough to run, inspect, and act on."],
] as const;

export default function AboutPage() {
  return (
    <div className="page-shell" data-chapter="palm" data-nav="about">
      <PageHero
        description="I work where mathematical research, computation, and real-world systems meet."
        eyebrow="About"
        figure={{
          name: "Palm fronds",
          caption: "Phoenix dactylifera",
          content: <Emblem motif="palm" />,
        }}
        motif="rook"
        title="Quantitative researcher. Research engineer. Technology leader."
      />

      <section className="grid gap-10 border-t border-border py-14 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-serif text-3xl">How evidence is constructed</h2>
          <ArchivalSeal
            bottom="Cape Town"
            className="mt-10 hidden size-40 opacity-80 lg:block"
            top="Scientia · Spes · Praxis"
          />
        </div>
        <div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            My background spans quantitative research, financial technology, software engineering,
            applied machine learning, and technical leadership. The thread connecting them is how
            assumptions become models, models become software, software becomes results, and results
            become decisions.
          </p>
          <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            {principles.map(([term, detail]) => (
              <div key={term}>
                <dt className="label-md">{term}</dt>
                <dd className="mt-2 text-muted-foreground">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="grid gap-10 border-t border-border py-14 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-serif text-3xl">Areas of focus</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Badge key={interest}>{interest}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          {experience.map((entry) => (
            <Card key={`${entry.organization}-${entry.period}`}>
              <p className="label-md text-primary">{entry.period}</p>
              <h3 className="mt-3 font-serif text-2xl">{entry.role}</h3>
              <p className="mt-1 text-muted-foreground">
                {entry.organization} · {entry.location}
              </p>
              <ul className="mt-5 space-y-2 pl-5 text-muted-foreground">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <FloraDivider />

      <section className="grid gap-10 py-14 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-serif text-3xl">Education</h2>
          <div className="mt-8">
            <MottoCallout institution="uct" />
          </div>
        </div>
        <Timeline
          items={education.map((entry) => ({
            period: entry.period,
            title: entry.qualification,
            meta: entry.institution,
            body: entry.summary,
            motif: educationMotif(entry.qualification),
          }))}
        />
      </section>

      <aside className="flex items-start gap-4 border-t border-border py-10 text-muted-foreground">
        <HeritageMark motif="rook" size="sm" tone="ink" />
        <p className="max-w-2xl text-sm leading-relaxed">
          Gawroński is associated with <i lang="pl">gawron</i>, Polish for rook; the site&apos;s
          mark is a name association, not a crest.
        </p>
      </aside>
    </div>
  );
}
