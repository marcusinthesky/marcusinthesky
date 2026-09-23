import { describe, expect, test } from "bun:test";

import { profile, projects, publications, writing } from "./index";

describe("public content", () => {
  test("contains no direct contact details", () => {
    const serialized = JSON.stringify({ profile, projects, publications, writing });
    expect(serialized).not.toMatch(/@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    expect(serialized).not.toMatch(/\+27|professional references/i);
  });

  test("uses unique slugs", () => {
    for (const records of [projects, publications, writing]) {
      const slugs = records.map(({ slug }) => slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
