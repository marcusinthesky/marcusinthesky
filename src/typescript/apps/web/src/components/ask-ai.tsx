import type { Publication } from "@marcusinthesky/content";
import { publications } from "@marcusinthesky/content";

import { BrandIcon } from "@/components/brand-icon";
import { NudgeArrow } from "@/components/nudge-arrow";
import { site } from "@/lib/site";

const assistants = [
  { label: "Claude", href: "https://claude.ai/new?q=" },
  { label: "ChatGPT", href: "https://chatgpt.com/?prompt=" },
  { label: "Perplexity", href: "https://www.perplexity.ai/search?q=" },
] as const;

/** Prompt covering the whole research programme, citing every arXiv paper. */
export const researchPrompt = [
  `Summarise the research of ${site.name} (${site.url}) using these papers:`,
  ...publications.flatMap(({ links }) =>
    links.filter(({ label }) => label === "arXiv").map(({ url }) => url),
  ),
].join("\n");

/** Prompt for a single paper. */
export function paperPrompt({ authors, links, title }: Publication): string {
  return [
    `Summarise the paper "${title}" by ${authors.join(", ")}.`,
    "Explain its research question, method, and main findings.",
    ...links.map(({ url }) => url),
  ].join("\n");
}

type AskAiProps = {
  prompt: string;
  label?: string;
  /** Logos only: for dense contexts such as publication cards. */
  compact?: boolean;
};

/** Opens the prompt in an AI assistant. Plain links: no script, no tracking. */
export function AskAi({ compact = false, label = "Ask AI", prompt }: AskAiProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 font-sans text-xs uppercase tracking-[0.12em]">
      <p className="text-muted-foreground">{label}</p>
      <ul className={`flex list-none flex-wrap p-0 ${compact ? "gap-x-1" : "gap-x-5"}`}>
        {assistants.map(({ href, label: assistant }) => (
          <li key={assistant}>
            <a
              aria-label={compact ? `Ask ${assistant}` : undefined}
              className={`group/ai inline-flex min-h-11 items-center gap-2 transition-colors hover:text-foreground ${compact ? "min-w-11 justify-center text-muted-foreground" : ""}`}
              href={`${href}${encodeURIComponent(prompt)}`}
              rel="noreferrer"
              target="_blank"
              title={compact ? `Ask ${assistant}` : undefined}
            >
              <BrandIcon
                className="size-4 transition-transform duration-300 ease-out-expo group-hover/ai:-translate-y-0.5"
                label={assistant}
              />
              {compact ? null : (
                <>
                  <span className="underline-draw">{assistant}</span>
                  <NudgeArrow size={13} />
                </>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
