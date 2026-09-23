export const site = {
  name: "Marcus Gawronsky",
  title: "Marcus Gawronsky — Applied AI, decision science, and quantitative research",
  description: "Research, engineering, writing, and reproducible software by Marcus Gawronsky.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcusinthesky.github.io").replace(/\/$/, ""),
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
