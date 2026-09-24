import type { Metadata } from "next";

import { projects } from "@marcusinthesky/content";
import { MotifRule, ShuttleDivider } from "@marcusinthesky/ui";

import { PageHero } from "@/components/page-hero";
import { ParetoFrontier } from "@/components/pareto-frontier";
import { ProjectCard } from "@/components/project-card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Selected research and software projects by Marcus Gawronsky.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <div className="page-shell" data-nav="projects">
      <PageHero
        motif="shuttle"
        description="Public work selected for the strength of its question, evidence, architecture, or explanatory surface—not for repository count."
        eyebrow="Projects"
        title="Research and software as durable systems"
        figure={{
          name: "Pareto frontier",
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
      <MotifRule className="py-6" motif="anchor" />
    </div>
  );
}
