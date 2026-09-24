import { readdir } from "node:fs/promises";
import { join } from "node:path";

// The portfolio has one publication path: the Quality workflow's `deploy` job pushes the
// checked export to marcusinthesky.github.io@gh-pages, which serves it at the root.
// This guard keeps a second Pages site or a project-site base path from returning.

const repository = join(import.meta.dir, "..", "..", "..", "..", "..");
const workflows = join(repository, ".github", "workflows");
const pagesRepository = "marcusinthesky/marcusinthesky.github.io";
const problems: string[] = [];

const nextConfig = await Bun.file(join(import.meta.dir, "..", "next.config.ts")).text();
for (const option of ["basePath", "assetPrefix"]) {
  if (new RegExp(`\\b${option}\\b`).test(nextConfig)) {
    problems.push(`next.config.ts sets ${option}; the portfolio is served from the site root`);
  }
}

type Job = { needs?: string | string[]; if?: string; steps?: { uses?: string; run?: string }[] };
type Workflow = { jobs?: Record<string, Job> };

const pagesActions = [
  "actions/configure-pages",
  "actions/upload-pages-artifact",
  "actions/deploy-pages",
];
const publishers: string[] = [];

for (const name of (await readdir(workflows)).filter((file) => /\.ya?ml$/.test(file))) {
  const source = await Bun.file(join(workflows, name)).text();
  const workflow = Bun.YAML.parse(source) as Workflow;

  for (const action of pagesActions) {
    if (source.includes(action)) {
      problems.push(`${name} uses ${action}; this repository must not publish its own Pages site`);
    }
  }

  for (const [id, job] of Object.entries(workflow.jobs ?? {})) {
    const pushesToPages = (job.steps ?? []).some(
      (step) => step.run?.includes("git push") && JSON.stringify(job).includes(pagesRepository),
    );
    if (!pushesToPages) continue;
    publishers.push(`${name}#${id}`);

    const needs = [job.needs ?? []].flat();
    if (!needs.includes("quality")) {
      problems.push(`${name}#${id} publishes without needing the quality job`);
    }
    for (const condition of [
      "github.event_name == 'push'",
      "github.ref == 'refs/heads/main'",
      "github.repository == 'marcusinthesky/marcusinthesky'",
    ]) {
      if (!job.if?.includes(condition)) {
        problems.push(`${name}#${id} publishes without the guard ${condition}`);
      }
    }
  }
}

if (publishers.length !== 1 || publishers[0] !== "ci.yml#deploy") {
  problems.push(
    `Expected exactly one publisher, ci.yml#deploy; found ${publishers.join(", ") || "none"}`,
  );
}

if (problems.length > 0) {
  console.error(`Publishing topology audit failed:\n${problems.join("\n")}`);
  process.exit(1);
}

console.log(`Publishing topology audit passed (ci.yml#deploy → ${pagesRepository}@gh-pages).`);
