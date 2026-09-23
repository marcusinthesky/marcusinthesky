import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/research/",
  "/publications/",
  "/projects/",
  "/blog/",
  "/cv/",
  "/contact/",
];

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

test("the footer mountain line is static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const paths = page.locator("footer svg path");
  await expect(paths.first()).toBeAttached();
  for (const path of await paths.all()) {
    await expect(path).toHaveCSS("animation-name", "none");
  }
});

const chapterThreads = [
  ["/research/", "rgb(36, 95, 199)"],
  ["/publications/", "rgb(36, 95, 199)"],
  ["/blog/", "rgb(181, 35, 38)"],
  ["/about/", "rgb(47, 107, 58)"],
  ["/projects/", "rgb(23, 23, 23)"],
  ["/cv/", "rgb(23, 23, 23)"],
] as const;

for (const [route, colour] of chapterThreads) {
  test(`${route} carries its chapter thread`, async ({ page }) => {
    await page.goto(route);
    const thread = page.locator('main [data-part="thread"]').first();
    await expect(thread).toHaveAttribute("aria-hidden", "true");
    await expect(thread).toHaveCSS("background-color", colour);
  });
}

test("home sections take the thread of their chapter", async ({ page }) => {
  await page.goto("/");
  const thread = (chapter: string) =>
    page.locator(`section[data-chapter="${chapter}"] [data-part="thread"]`);
  await expect(thread("lotus")).toHaveCSS("background-color", "rgb(36, 95, 199)");
  await expect(thread("rose")).toHaveCSS("background-color", "rgb(181, 35, 38)");
});

test("section threads are static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const threads = page.locator('main header [data-part="thread"]');
  await expect(threads.first()).toBeAttached();
  for (const thread of await threads.all()) {
    await expect(thread).toHaveCSS("animation-name", "none");
  }
});

test("the header rook is decorative", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('header a[href="/"] svg')).toHaveAttribute("aria-hidden", "true");
});

test("headings use the self-hosted Fraunces family", async ({ page }) => {
  await page.goto("/");
  const family = await page.locator("h1").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(family).toMatch(/Fraunces/);
});
