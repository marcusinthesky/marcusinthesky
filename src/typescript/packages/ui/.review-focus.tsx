// Temporary review harness (deleted after the review): one part large, beside its
// reference crop, plus the icon sizes the site uses.
import { readFileSync, writeFileSync } from "node:fs";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import * as UI from "./src/index";
import { Motif } from "./src/heritage/motif";
import * as H from "./src/heritage/parts/heritage";
import * as I from "./src/heritage/parts/institutions";
import * as P from "./src/heritage/parts/prain";

const [, , out, refDir, names = "rook"] = process.argv as string[];
const all = { ...H, ...I, ...P, ...UI } as Record<string, unknown>;
const refs: Record<string, string> = {
  Rook: "rook",
  Lotus: "lotus",
  Rose: "rose",
  Shuttle: "shuttle",
  PalmBranch: "palm-left",
  PrayerHands: "hands",
  Torse: "torse",
  MottoScroll: "scroll",
  OpenBook: "book",
  Anchor: "anchor",
  MottoRibbon: "sacs",
  CompassStar: "star",
  ArchivalSeal: "seal",
  KnotWork: "knot",
};

const roles = ["ink", "paper", "lotus", "rose", "leaf", "gold", "silver", "skin", "metal"];
const css = [
  readFileSync("src/styles/theme.css", "utf8"),
  readFileSync("src/styles/heritage.css", "utf8"),
  roles
    .map((r) => `.fill-motif-${r}{fill:var(--motif-${r})}.stroke-motif-${r}{stroke:var(--motif-${r})}`)
    .join(""),
  `.fill-none{fill:none}.font-serif{font-family:var(--font-serif)} body{margin:0;background:var(--background);font:12px Inter,sans-serif;padding:16px}
   .row{display:flex;gap:16px;align-items:center;margin-bottom:16px}
   .big{width:420px;height:420px;background:#fff;border:1px solid var(--border)}
   .big svg,.big img{width:100%;height:100%;object-fit:contain}
   .sizes{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
   .sizes div{display:flex;gap:14px;align-items:center}`,
].join("\n");

function view(name: string, tone: "heritage" | "ink" | "sacs" | "uct", px: number, node: ReactNode) {
  return (
    <span style={{ display: "inline-block", width: px, height: px }}>
      <Motif className="block size-full" tone={tone} viewBox="0 0 256 256">
        {node}
      </Motif>
    </span>
  );
}

const rows = names.split(",").map((name) => {
  const C = all[name] as ((p: object) => ReactNode) | undefined;
  if (!C) throw new Error(`no part ${name}`);
  const node = name === "MottoRibbon" ? <C text="Spectemur Agendo" /> : <C />;
  return (
    <div className="row" key={name}>
      <div className="big">
        <Motif className="block" tone="heritage" viewBox="0 0 256 256">
          {node}
        </Motif>
      </div>
      <div className="big">
        {refs[name] ? <img alt="" src={`file://${refDir}/ref-${refs[name]}.png`} /> : null}
      </div>
      <div className="sizes">
        {(["heritage", "ink", "sacs", "uct"] as const).map((tone) => (
          <div key={tone}>
            {view(name, tone, 96, node)}
            {view(name, tone, 32, node)}
            {view(name, tone, 24, node)}
            {view(name, tone, 16, node)}
          </div>
        ))}
      </div>
    </div>
  );
});

writeFileSync(
  out,
  `<!doctype html>${renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400..700&display=block"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{rows}</body>
    </html>,
  )}`,
);
