export const site = {
  name: "Marcus Gawronsky",
  title: "Marcus Gawronsky — Research made operational",
  description:
    "Quantitative research, applied AI, and research engineering by Marcus Gawronsky: reproducible evidence, working systems, and tools that can be inspected, tested, and trusted.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusinthesky.github.io").replace(/\/$/, ""),
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
