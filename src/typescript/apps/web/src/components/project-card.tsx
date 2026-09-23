import type { Project } from "@marcusinthesky/content";
import { Card } from "@marcusinthesky/ui";

import { NudgeArrow } from "@/components/nudge-arrow";
import Link from "next/link";

export function ProjectCard({
  project,
  headingLevel = 2,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Card caption={project.technologies.slice(0, 4).join(" · ")} className="h-full">
      <Heading className="font-serif text-2xl font-medium tracking-[-0.02em]">
        {project.title}
      </Heading>
      {project.lede ? (
        <p className="mt-3 font-serif text-lg leading-snug text-foreground">{project.lede}</p>
      ) : null}
      <p className="mt-3 flex-1 text-muted-foreground">{project.summary}</p>
      <Link
        className="mt-7 inline-flex min-h-11 items-center gap-2 self-start label-md text-primary after:absolute after:inset-0"
        href={`/projects/${project.slug}/`}
      >
        <span className="underline-draw">Read the case study</span> <NudgeArrow size={15} />
      </Link>
    </Card>
  );
}
