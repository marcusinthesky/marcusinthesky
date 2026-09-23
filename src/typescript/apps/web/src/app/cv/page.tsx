import type { Metadata } from "next";

import { education, experience } from "@marcusinthesky/content";
import { Badge, ButtonLink, Card } from "@marcusinthesky/ui";
import { Download } from "lucide-react";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Curriculum vitae",
  description: "Public curriculum vitae of Marcus Gawronsky.",
  alternates: { canonical: "/cv/" },
};

export default function CvPage() {
  return (
    <div className="page-shell" data-nav="cv">
      <PageHero
        description="A public, privacy-safe account of experience, education, research, and technical practice. The HTML view is the accessible source; a typeset PDF is available for download."
        eyebrow="Curriculum vitae"
        motif="book"
        title="Work across research and production"
      />
      <div className="border-t border-border py-10">
        <ButtonLink href="/cv/Marcus-Gawronsky-CV.pdf">
          <Download aria-hidden="true" className="mr-2" size={15} /> Download PDF
        </ButtonLink>
      </div>
      <section className="grid gap-10 py-8 lg:grid-cols-[0.68fr_1.32fr]">
        <aside>
          <h2 className="font-serif text-3xl">Capabilities</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Python",
              "TypeScript",
              "SQL",
              "Econometrics",
              "Causal inference",
              "Representation learning",
              "Optimal transport",
              "Nix",
              "Kubernetes",
              "GCP",
            ].map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
          <h2 className="mt-12 font-serif text-3xl">Education</h2>
          <div className="mt-5 space-y-5">
            {education.map((entry) => (
              <div key={entry.qualification}>
                <p className="font-medium">{entry.qualification}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.institution} · {entry.period}
                </p>
              </div>
            ))}
          </div>
        </aside>
        <div className="space-y-5">
          {experience.map((entry) => (
            <Card key={`${entry.organization}-${entry.period}`}>
              <p className="label-md text-primary">{entry.period}</p>
              <h2 className="mt-3 font-serif text-2xl">{entry.role}</h2>
              <p className="mt-1 text-muted-foreground">{entry.organization}</p>
              <ul className="mt-5 space-y-2 pl-5 text-muted-foreground">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
