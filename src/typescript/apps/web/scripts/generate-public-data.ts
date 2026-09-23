import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import {
  education,
  experience,
  profile,
  projects,
  publications,
  writing,
} from "@marcusinthesky/content";

const publicDir = join(import.meta.dir, "..", "public");
const dataDir = join(publicDir, "data");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusinthesky.github.io").replace(
  /\/$/,
  "",
);

await mkdir(dataDir, { recursive: true });

const writeJson = (name: string, value: unknown) =>
  Bun.write(join(dataDir, name), `${JSON.stringify(value, null, 2)}\n`);

await Promise.all([
  writeJson("profile.json", profile),
  writeJson("publications.json", publications),
  writeJson("projects.json", projects),
  writeJson(
    "writing.json",
    [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  ),
  writeJson("cv.json", { profile, experience, education }),
]);

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const orderedWriting = [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const rssItems = orderedWriting
  .map(
    (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.canonicalUrl)}</link>
      <guid isPermaLink="true">${escapeXml(entry.canonicalUrl)}</guid>
      <pubDate>${new Date(`${entry.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(entry.summary)}</description>
      <source url="${siteUrl}/feed.xml">${escapeXml(entry.source)}</source>
    </item>`,
  )
  .join("\n");

await Bun.write(
  join(publicDir, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Marcus Gawronsky — Writing</title>
    <link>${siteUrl}/blog/</link>
    <description>Selected technical and research writing by Marcus Gawronsky.</description>
    <language>en-ZA</language>
${rssItems}
  </channel>
</rss>
`,
);

await Bun.write(
  join(publicDir, "feed.json"),
  `${JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: "Marcus Gawronsky — Writing",
      home_page_url: `${siteUrl}/blog/`,
      feed_url: `${siteUrl}/feed.json`,
      authors: [{ name: profile.name, url: siteUrl }],
      items: orderedWriting.map((entry) => ({
        id: entry.canonicalUrl,
        url: entry.canonicalUrl,
        title: entry.title,
        summary: entry.summary,
        date_published: `${entry.publishedAt}T12:00:00Z`,
        tags: [entry.source],
      })),
    },
    null,
    2,
  )}\n`,
);

const projectLines = projects.map(
  (project) => `- [${project.title}](${siteUrl}/projects/${project.slug}/): ${project.summary}`,
);
const publicationLines = publications.map(
  (publication) => `- [${publication.title}](${publication.links[0].url}) — ${publication.status}`,
);
const writingLines = orderedWriting.map(
  (entry) => `- [${entry.title}](${entry.canonicalUrl}): ${entry.summary}`,
);

await Bun.write(
  join(publicDir, "llms.txt"),
  `# ${profile.name}

> ${profile.summary}

## Primary pages

- [About](${siteUrl}/about/)
- [Research](${siteUrl}/research/)
- [Publications](${siteUrl}/publications/)
- [Projects](${siteUrl}/projects/)
- [Blog](${siteUrl}/blog/)
- [Public CV](${siteUrl}/cv/)

## Structured data

- [Profile JSON](${siteUrl}/data/profile.json)
- [Publications JSON](${siteUrl}/data/publications.json)
- [Projects JSON](${siteUrl}/data/projects.json)
- [Writing JSON](${siteUrl}/data/writing.json)
`,
);

await Bun.write(
  join(publicDir, "llms-full.txt"),
  `# ${profile.name}

${profile.summary}

## Interests

${profile.interests.map((interest) => `- ${interest}`).join("\n")}

## Projects

${projectLines.join("\n")}

## Publications

${publicationLines.join("\n")}

## Writing

${writingLines.join("\n")}
`,
);

await Bun.write(
  join(publicDir, "humans.txt"),
  `/* TEAM */
Creator: Marcus Gawronsky
Location: Cape Town, South Africa

/* SITE */
Language: English
Standards: HTML, CSS, JSON-LD, RSS, JSON Feed
Built with: Next.js, React, Tailwind CSS, Bun
Privacy: No analytics, cookies, tracking, or direct personal contact details
`,
);
