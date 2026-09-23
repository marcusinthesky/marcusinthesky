import type { Project } from "@marcusinthesky/content";
import { Badge, Card } from "@marcusinthesky/ui";
import { ArrowUpRight } from "lucide-react";
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
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((technology) => (
          <Badge key={technology}>{technology}</Badge>
        ))}
      </div>
      <Heading className="mt-6 font-serif text-3xl font-medium tracking-[-0.025em]">
        {project.title}
      </Heading>
      <p className="mt-3 flex-1 text-muted-foreground">{project.summary}</p>
      <Link
        className="mt-7 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.12em] text-accent"
        href={`/projects/${project.slug}/`}
      >
        Read case study <ArrowUpRight aria-hidden="true" size={15} />
      </Link>
    </Card>
  );
}
