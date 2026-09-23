import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

export const posts = defineCollections({
  type: "doc",
  dir: "../../packages/content/src/posts",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.iso.date(),
    draft: z.boolean().default(false),
  }),
});

export default defineConfig();
