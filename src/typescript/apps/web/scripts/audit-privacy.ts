import { readdir } from "node:fs/promises";
import { join } from "node:path";

const roots = [join(import.meta.dir, "..", "src"), join(import.meta.dir, "..", "public")];
const forbidden = [
  { name: "email address", pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { name: "South African international phone", pattern: /\+27[\s()-]*\d/ },
  { name: "references heading", pattern: /professional references/i },
];
const extensions = new Set([
  ".css",
  ".html",
  ".json",
  ".md",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);
const failures: string[] = [];

async function walk(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (![...extensions].some((extension) => path.endsWith(extension))) continue;
    const content = await Bun.file(path).text();
    for (const rule of forbidden) {
      if (rule.pattern.test(content)) failures.push(`${path}: ${rule.name}`);
    }
  }
}

for (const root of roots) await walk(root);
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Privacy audit passed.");
