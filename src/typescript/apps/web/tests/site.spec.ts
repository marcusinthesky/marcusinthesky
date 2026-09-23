import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/about/", "/research/", "/publications/", "/projects/", "/writing/", "/cv/"];

for (const route of routes) {
  test(`${route} is navigable and accessible`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("the public CV is downloadable", async ({ request }) => {
  const response = await request.get("/cv/Marcus-Gawronsky-CV.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("machine-readable projections are public", async ({ request }) => {
  for (const path of ["/data/profile.json", "/feed.xml", "/llms.txt", "/sitemap.xml"]) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});
