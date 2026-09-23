import { describe, expect, test } from "bun:test";

import { absoluteUrl, site } from "./site";

describe("site URLs", () => {
  test("uses the canonical GitHub Pages origin by default", () => {
    expect(site.url).toBe("https://marcusinthesky.github.io");
  });

  test("normalizes absolute paths", () => {
    expect(absoluteUrl("/cv/")).toBe("https://marcusinthesky.github.io/cv/");
    expect(absoluteUrl("feed.xml")).toBe("https://marcusinthesky.github.io/feed.xml");
  });
});
