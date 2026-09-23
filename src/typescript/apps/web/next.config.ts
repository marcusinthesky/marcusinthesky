import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@marcusinthesky/content", "@marcusinthesky/ui"],
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
