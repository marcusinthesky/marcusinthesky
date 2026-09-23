import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marcus Gawronsky — Portfolio",
    short_name: "Marcus Gawronsky",
    description: "Applied AI, decision science, quantitative research, and reliable software.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f1",
    theme_color: "#f6f6f1",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
