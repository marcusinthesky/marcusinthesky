import { access, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const out = join(import.meta.dir, "..", "out");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusinthesky.github.io").replace(
  /\/$/,
  "",
);
const origin = new URL(siteUrl).origin;

// Other repositories publish GitHub Pages project sites under the same origin.
// Only these prefixes may be linked without resolving inside this export.
const siblingProjectSites = ["/PricingPerspective/"];

const required = [
  "index.html",
  "about/index.html",
  "research/index.html",
  "publications/index.html",
  "projects/index.html",
  "blog/index.html",
  "cv/index.html",
  "contact/index.html",
  "404.html",
  "writing/index.html",
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
  "manifest.webmanifest",
  "og.png",
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

const contentPages = required.filter(
  (path) => path.endsWith("/index.html") || path === "index.html",
);
for (const page of contentPages.filter((path) => path !== "writing/index.html")) {
  const html = await Bun.file(join(out, page)).text();
  for (const requiredFragment of ["<title", 'rel="canonical"', "application/ld+json"]) {
    if (!html.includes(requiredFragment)) {
      console.error(`${page} is missing ${requiredFragment}`);
      process.exit(1);
    }
  }
}

// Everything below checks the export against the topology it is served from:
// the root of the user site, with no base path.

const problems: string[] = [];
const exported = new Set<string>();

async function walk(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else exported.add(`/${relative(out, path)}`);
  }
}
await walk(out);

/** The URL path a visitor requests to receive an exported file. */
function routeOf(file: string): string {
  return file.endsWith("/index.html") ? file.slice(0, -"index.html".length) : file;
}

/** Returns the same-origin pathname a reference points at, or undefined for external references. */
function sameOriginPath(reference: string, base: string): string | undefined {
  const value = reference.trim().replaceAll("&amp;", "&");
  if (value === "" || /^(#|mailto:|tel:|data:|javascript:)/i.test(value)) return undefined;
  const url = new URL(value, `${origin}${base}`);
  if (url.origin !== origin) return undefined;
  return decodeURIComponent(url.pathname);
}

function exportedFile(pathname: string): string | undefined {
  const candidates = pathname.endsWith("/")
    ? [`${pathname}index.html`]
    : [pathname, `${pathname}/index.html`];
  return candidates.find((candidate) => exported.has(candidate));
}

function checkReference(reference: string, base: string, source: string): void {
  const pathname = sameOriginPath(reference, base);
  if (pathname === undefined) return;
  if (pathname.startsWith("/marcusinthesky/")) {
    problems.push(
      `${source}: ${reference} uses a project-site prefix; the portfolio is served at /`,
    );
    return;
  }
  if (siblingProjectSites.some((prefix) => pathname.startsWith(prefix))) return;
  if (!exportedFile(pathname))
    problems.push(`${source}: ${reference} does not resolve in the export`);
}

function checkAbsoluteUrls(text: string, source: string): void {
  for (const [url] of text.matchAll(/https?:\/\/[^\s"'<>)\]]+/g)) {
    if (url.startsWith(origin)) checkReference(url.replace(/[.,;:]+$/, ""), "/", source);
  }
}

function attributeValues(html: string, names: string): string[] {
  const pattern = new RegExp(`\\s(?:${names})=(?:"([^"]*)"|'([^']*)')`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1] ?? match[2] ?? "");
}

function tagAttribute(html: string, tagPattern: RegExp, attribute: string): string | undefined {
  const tag = html.match(tagPattern)?.[0];
  return tag ? attributeValues(tag, attribute)[0] : undefined;
}

const indexable = new Set<string>();

for (const file of [...exported].filter((path) => path.endsWith(".html")).toSorted()) {
  const html = await Bun.file(join(out, file)).text();
  const route = routeOf(file);
  const base = route.endsWith("/") ? route : route.slice(0, route.lastIndexOf("/") + 1);

  for (const reference of attributeValues(html, "href|src|xlink:href|poster")) {
    checkReference(reference, base, file);
  }
  for (const srcset of attributeValues(html, "srcset")) {
    for (const candidate of srcset.split(",")) {
      checkReference(candidate.trim().split(/\s+/)[0] ?? "", base, file);
    }
  }
  const refresh = tagAttribute(html, /<meta[^>]*http-equiv="refresh"[^>]*>/, "content");
  const refreshTarget = refresh?.match(/url=(.+)$/i)?.[1];
  if (refreshTarget) checkReference(refreshTarget, base, file);

  const canonical = tagAttribute(html, /<link[^>]*rel="canonical"[^>]*>/, "href");
  if (!canonical) {
    problems.push(`${file}: has no canonical link`);
    continue;
  }
  if (!canonical.startsWith(`${siteUrl}/`)) {
    problems.push(`${file}: canonical ${canonical} is not on ${siteUrl}`);
  }

  for (const script of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    checkAbsoluteUrls(JSON.stringify(JSON.parse(script[1] ?? "null")), `${file} JSON-LD`);
  }

  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  indexable.add(route);

  if (canonical !== `${siteUrl}${route}`) {
    problems.push(`${file}: canonical ${canonical} should be ${siteUrl}${route}`);
  }
  const ogUrl = tagAttribute(html, /<meta property="og:url"[^>]*>/, "content");
  if (ogUrl !== canonical) problems.push(`${file}: og:url ${ogUrl} should equal ${canonical}`);

  const ogImage = tagAttribute(html, /<meta property="og:image"[^>]*>/, "content");
  const ogImageType = tagAttribute(html, /<meta property="og:image:type"[^>]*>/, "content");
  if (!ogImage) {
    problems.push(`${file}: has no og:image`);
  } else if (ogImageType === "image/png" && extname(new URL(ogImage).pathname) !== ".png") {
    // GitHub Pages derives Content-Type from the extension.
    problems.push(`${file}: og:image ${ogImage} must end in .png to be served as image/png`);
  }
}

for (const file of [...exported].filter((path) => path.endsWith(".css"))) {
  const css = await Bun.file(join(out, file)).text();
  const base = file.slice(0, file.lastIndexOf("/") + 1);
  for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g)) {
    checkReference(match[1] ?? match[2] ?? match[3] ?? "", base, file);
  }
}

const sitemap = await Bun.file(join(out, "sitemap.xml")).text();
const sitemapRoutes = new Set<string>();
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!loc?.startsWith(`${siteUrl}/`)) {
    problems.push(`sitemap.xml: ${loc} is not on ${siteUrl}`);
    continue;
  }
  checkReference(loc, "/", "sitemap.xml");
  sitemapRoutes.add(loc.slice(siteUrl.length));
}
for (const route of indexable) {
  if (!sitemapRoutes.has(route)) problems.push(`sitemap.xml: indexable ${route} is not listed`);
}
for (const route of sitemapRoutes) {
  if (!indexable.has(route)) problems.push(`sitemap.xml: ${route} is not an indexable page`);
}

const manifest = (await Bun.file(join(out, "manifest.webmanifest")).json()) as {
  start_url?: string;
  icons?: { src: string }[];
};
for (const reference of [
  manifest.start_url ?? "",
  ...(manifest.icons ?? []).map(({ src }) => src),
]) {
  checkReference(reference, "/", "manifest.webmanifest");
}

const robots = await Bun.file(join(out, "robots.txt")).text();
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  problems.push(`robots.txt: does not declare ${siteUrl}/sitemap.xml`);
}

const textProjections = [...exported].filter(
  (path) => /\.(json|txt|xml)$/.test(path) || path.endsWith(".webmanifest"),
);
for (const file of textProjections) {
  checkAbsoluteUrls(await Bun.file(join(out, file)).text(), file);
}

if (problems.length > 0) {
  console.error(`Static export URL audit failed:\n${[...new Set(problems)].join("\n")}`);
  process.exit(1);
}

console.log(
  `Static export audit passed (${required.length} required artifacts, ${exported.size} files, ${indexable.size} indexable pages resolved against ${siteUrl}/).`,
);
