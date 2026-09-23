import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/about/", "/research/", "/publications/", "/projects/", "/blog/", "/cv/"];

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

test("the Galton board provides a completed reduced-motion state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-galton-status]")).toHaveText("40-ball sample");
  await expect(page.locator(".galton-moving-ball").first()).toBeHidden();
  await expect(page.getByRole("img", { name: "Galton board simulation" })).toBeVisible();
});

test("the Galton board can pause and resume without JavaScript", async ({ page }) => {
  await page.goto("/");
  const pause = page.locator(".galton-pause");
  const movingBall = page.locator(".galton-moving-ball").first();

  await page.getByText("Pause", { exact: true }).click();
  await expect(pause).toBeChecked();
  await expect(movingBall).toHaveCSS("animation-play-state", "paused");

  await page.getByText("Resume", { exact: true }).click();
  await expect(movingBall).toHaveCSS("animation-play-state", "running");
});

test("machine-readable projections are public", async ({ request }) => {
  for (const path of ["/data/profile.json", "/feed.xml", "/llms.txt", "/sitemap.xml"]) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});
