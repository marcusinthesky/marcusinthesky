import { access } from "node:fs/promises";
import { join } from "node:path";

const out = join(import.meta.dir, "..", "out");
const required = [
  "index.html",
  "about/index.html",
  "research/index.html",
  "publications/index.html",
  "projects/index.html",
  "writing/index.html",
  "cv/index.html",
  "contact/index.html",
  "data/profile.json",
  "data/publications.json",
  "data/projects.json",
  "data/writing.json",
  "feed.xml",
  "feed.json",
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "sitemap.xml",
  "cv/Marcus-Gawronsky-CV.pdf",
];

const missing: string[] = [];
for (const path of required) {
  try {
    await access(join(out, path));
  } catch {
    missing.push(path);
  }
}

if (missing.length > 0) {
  console.error(`Static export is missing:\n${missing.join("\n")}`);
  process.exit(1);
}

for (const page of required.filter((path) => path.endsWith(".html"))) {
  const html = await Bun.file(join(out, page)).text();
  for (const requiredFragment of ["<title", 'rel="canonical"', "application/ld+json"]) {
    if (!html.includes(requiredFragment)) {
      console.error(`${page} is missing ${requiredFragment}`);
      process.exit(1);
    }
  }
}

console.log(`Static export audit passed (${required.length} required artifacts).`);
