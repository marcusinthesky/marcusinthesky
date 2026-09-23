import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@marcusinthesky/content";
import { Badge, ButtonLink } from "@marcusinthesky/ui";

import { BrandIcon } from "@/components/brand-icon";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();

  return (
    <div className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.summary,
          author: { "@type": "Person", name: "Marcus Gawronsky" },
          codeRepository: project.links.find(({ label }) => label === "GitHub")?.url,
          keywords: project.technologies,
        }}
      />
      <PageHero description={project.summary} eyebrow="Project case study" title={project.title} />
      <article className="reading-shell typeset border-t border-border py-14">
        <p>
          <strong>Role:</strong> {project.role}
        </p>
        {project.narrative.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>Technology and method</h2>
        <div className="not-typeset flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge key={technology}>{technology}</Badge>
          ))}
        </div>
        <div className="not-typeset mt-8 flex flex-wrap gap-3">
          {project.links.map((link, index) => (
            <ButtonLink
              href={link.url}
              key={link.url}
              className="gap-2"
              variant={index === 0 ? "primary" : "secondary"}
            >
              <BrandIcon className="size-4" label={link.label} />
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </article>
    </div>
  );
}
