import type { Metadata } from "next";

import { absoluteUrl, site } from "./site";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Marcus Gawronsky — research made operational",
} as const;

const feeds = {
  "application/rss+xml": absoluteUrl("/feed.xml"),
  "application/feed+json": absoluteUrl("/feed.json"),
};

type PageMetadata = {
  /** Omitted for the home page, which uses the site title. */
  title?: string;
  description: string;
  path: `/${string}`;
};

// Next replaces rather than merges nested metadata objects, so every route states its
// own canonical, social URL, and feed alternates instead of inheriting the home page's.
export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  const socialTitle = title ? `${title} · ${site.name}` : site.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: feeds },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: site.name,
      url: path,
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
