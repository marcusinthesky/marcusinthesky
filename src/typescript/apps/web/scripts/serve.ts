import { extname, join, normalize } from "node:path";

const root = join(import.meta.dir, "..", "out");
// Not 3000: `next dev` owns that port, and checks must never run against the dev server.
const port = Number(process.env.PORT ?? 4173);
const mimeTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.(\/|\\|$))+/, "");
    let path = join(root, requested);
    if (requested.endsWith("/")) path = join(path, "index.html");
    let file = Bun.file(path);
    if (!(await file.exists()) && !extname(path)) file = Bun.file(join(path, "index.html"));
    // Mirror GitHub Pages: unknown paths receive the exported 404 page with a 404 status.
    const found = await file.exists();
    if (!found) file = Bun.file(join(root, "404.html"));
    return new Response(file, {
      status: found ? 200 : 404,
      headers: {
        "content-type": mimeTypes[extname(file.name ?? path)] ?? "application/octet-stream",
      },
    });
  },
});

console.log(`Serving ${root} at http://localhost:${port}`);
