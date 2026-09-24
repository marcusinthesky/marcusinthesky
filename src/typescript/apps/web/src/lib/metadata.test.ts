import { describe, expect, test } from "bun:test";

import { ogImage, pageMetadata } from "./metadata";
import { site } from "./site";

describe("page metadata", () => {
  test("gives each route its own canonical and social URL", () => {
    const metadata = pageMetadata({ title: "About", description: "Background.", path: "/about/" });
    expect(metadata.title).toBe("About");
    expect(metadata.alternates?.canonical).toBe("/about/");
    expect(metadata.openGraph?.url).toBe("/about/");
    expect(metadata.openGraph?.title).toBe("About · Marcus Gawronsky");
    expect(metadata.alternates?.types).toHaveProperty("application/rss+xml");
  });

  test("leaves the home page on the site title", () => {
    const metadata = pageMetadata({ description: site.description, path: "/" });
    expect(metadata).not.toHaveProperty("title");
    expect(metadata.openGraph?.title).toBe(site.title);
  });

  test("publishes the share image with an extension that matches its type", () => {
    expect(ogImage.url.endsWith(".png")).toBe(true);
    expect(ogImage.type).toBe("image/png");
  });
});
