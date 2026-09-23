import type { Metadata } from "next";

import { projects } from "@marcusinthesky/content";
import { HeritageMark, ShuttleDivider } from "@marcusinthesky/ui";

import { PageHero } from "@/components/page-hero";
import { ParetoFrontier } from "@/components/pareto-frontier";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected research and software projects by Marcus Gawronsky.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <PageHero
        motif="shuttle"
        description="Public work selected for the strength of its question, evidence, architecture, or explanatory surface—not for repository count."
        eyebrow="Projects"
        title="Research and software as durable systems"
        figure={{
          caption: "Candidate decisions → the non-dominated frontier → a choice",
          content: <ParetoFrontier />,
        }}
      />
      <ShuttleDivider />
      <section className="grid gap-5 py-14 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
      <div aria-hidden="true" className="flex items-center gap-4 py-6">
        <span className="h-px flex-1 bg-border" />
        <HeritageMark motif="anchor" motion="scroll" size="md" />
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
