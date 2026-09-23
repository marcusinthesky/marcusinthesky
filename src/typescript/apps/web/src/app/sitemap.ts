import type { MetadataRoute } from "next";

import { projects } from "@marcusinthesky/content";

import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about/",
    "/research/",
    "/publications/",
    "/projects/",
    "/blog/",
    "/cv/",
    "/contact/",
  ];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route || "/"),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...projects.map(({ slug }) => ({
      url: absoluteUrl(`/projects/${slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
