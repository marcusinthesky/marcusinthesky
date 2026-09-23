import { faLinkedin, faOpenai } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
  siArxiv,
  siClaude,
  siGithub,
  siGooglescholar,
  siHuggingface,
  siKaggle,
  siOrcid,
  siPaperswithcode,
  siPerplexity,
  siSsrn,
} from "simple-icons";

type Mark = { path: string; viewBox: string };

// Simple Icons (CC0) is the primary source; Font Awesome Free (CC BY 4.0) covers
// the marks Simple Icons does not ship. Both render as static, server-side SVG.
const simple = ({ path }: { path: string }): Mark => ({ path, viewBox: "0 0 24 24" });
const awesome = ({ icon: [width, height, , , path] }: IconDefinition): Mark => ({
  path: typeof path === "string" ? path : path.join(" "),
  viewBox: `0 0 ${width} ${height}`,
});

const marks: Record<string, Mark> = {
  arXiv: simple(siArxiv),
  ChatGPT: awesome(faOpenai),
  Claude: simple(siClaude),
  GitHub: simple(siGithub),
  "Google Scholar": simple(siGooglescholar),
  "Hugging Face": simple(siHuggingface),
  Kaggle: simple(siKaggle),
  LinkedIn: awesome(faLinkedin),
  ORCID: simple(siOrcid),
  "Papers with Code": simple(siPaperswithcode),
  Perplexity: simple(siPerplexity),
  SSRN: simple(siSsrn),
};

export function BrandIcon({ className, label }: { className?: string; label: string }) {
  const mark = marks[label];
  if (!mark) return null;
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox={mark.viewBox}>
      <path d={mark.path} />
    </svg>
  );
}
