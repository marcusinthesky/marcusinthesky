import { extname, join, normalize } from "node:path";

const root = join(import.meta.dir, "..", "out");
const port = Number(process.env.PORT ?? 3000);
const mimeTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
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
    if (!(await file.exists())) return new Response("Not found", { status: 404 });
    return new Response(file, {
      headers: {
        "content-type": mimeTypes[extname(file.name ?? path)] ?? "application/octet-stream",
      },
    });
  },
});

console.log(`Serving ${root} at http://localhost:${port}`);
