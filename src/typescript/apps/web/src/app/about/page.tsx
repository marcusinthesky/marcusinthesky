import type { Metadata } from "next";

import { education, experience, profile } from "@marcusinthesky/content";
import { Badge, Card } from "@marcusinthesky/ui";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Professional background, interests, and education of Marcus Gawronsky.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageHero
        description="A technology leader and quantitative researcher working across mathematical modelling, production machine learning, data systems, and reproducible evidence."
        eyebrow="About"
        title="Research depth, production discipline"
      />

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
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                {entry.period}
              </p>
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

      <section className="border-t border-border py-14">
        <h2 className="font-serif text-3xl">Education</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {education.map((entry) => (
            <Card key={entry.qualification}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                {entry.period}
              </p>
              <h3 className="mt-3 font-serif text-xl">{entry.qualification}</h3>
              <p className="mt-2 text-sm text-foreground">{entry.institution}</p>
              <p className="mt-4 text-muted-foreground">{entry.summary}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
