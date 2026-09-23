import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const out = join(import.meta.dir, "..", "out");
const publicTextFiles = new Set(["humans.txt", "llms-full.txt", "llms.txt", "robots.txt"]);

async function htmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return Promise.resolve(entry.name.endsWith(".html") ? [path] : []);
    }),
  );
  return nested.flat();
}

const files = await htmlFiles(out);
for (const file of files) {
  const source = await Bun.file(file).text();
  const staticHtml = source
    .replace(/<link rel="preload" as="script"[^>]*\/>/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (script) =>
      script.includes('type="application/ld+json"') ? script : "",
    );
  await Bun.write(file, staticHtml);
}

async function removeFlightData(directory: string): Promise<number> {
  let removed = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      removed += await removeFlightData(path);
    } else if (entry.name.endsWith(".txt") && !publicTextFiles.has(entry.name)) {
      await rm(path);
      removed += 1;
    }
  }
  return removed;
}

const staticAssets = join(out, "_next", "static");
for (const entry of await readdir(staticAssets, { withFileTypes: true })) {
  if (entry.name !== "css") {
    await rm(join(staticAssets, entry.name), { force: true, recursive: true });
  }
}
const removedFlightFiles = await removeFlightData(out);

console.log(
  `Removed the hydration runtime from ${files.length} HTML files and pruned ${removedFlightFiles} unused flight-data files.`,
);
