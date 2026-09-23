// Temporary review harness (deleted after the review): renders every heritage part beside
// its identity-sheet reference crop into a static HTML contact sheet.
import { readFileSync, writeFileSync } from "node:fs";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import * as UI from "./src/index";
import { Motif } from "./src/heritage/motif";
import * as H from "./src/heritage/parts/heritage";
import * as I from "./src/heritage/parts/institutions";
import * as P from "./src/heritage/parts/prain";

const out = process.argv[2]!;
const refDir = process.argv[3]!;
const tone = (process.argv[4] ?? "heritage") as "heritage" | "ink" | "sacs" | "uct";
const extra: Record<string, unknown> = UI as Record<string, unknown>;

const roles = ["ink", "paper", "lotus", "rose", "leaf", "gold", "silver", "skin", "metal"];
const utilities = roles
  .map((r) => `.fill-motif-${r}{fill:var(--motif-${r})}.stroke-motif-${r}{stroke:var(--motif-${r})}`)
  .join("");
const css = [
  readFileSync("src/styles/theme.css", "utf8"),
  readFileSync("src/styles/heritage.css", "utf8"),
  utilities,
  `.fill-none{fill:none}.font-serif{font-family:var(--font-serif)} body{margin:0;background:var(--background);color:var(--foreground);font:14px/1.3 Inter,Arial,sans-serif;padding:24px}
   .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
   .cell{background:#fff;border:1px solid var(--border);padding:10px}
   .pair{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center}
   .pair>*{width:100%;height:220px;object-fit:contain}.pair>div>svg{width:100%;height:100%}.pair>div{border:1px dashed #eee}
   .cell h3{margin:6px 0 0;font:600 11px Inter;letter-spacing:.12em;text-transform:uppercase}
   .wide{grid-column:span 2}.wide .pair>*{height:160px}
   .icons{display:flex;gap:24px;align-items:center;flex-wrap:wrap;padding:12px;background:#fff;border:1px solid var(--border);margin-top:18px}
   .icons svg{width:32px;height:32px}.icons .s16 svg{width:16px;height:16px}`,
].join("\n");

function part(node: ReactNode, viewBox = "0 0 256 256") {
  return (
    <Motif tone={tone} viewBox={viewBox}>
      {node}
    </Motif>
  );
}

const cells: [string, ReactNode, string | null, string?][] = [
  ["rook", part(<H.Rook />), "rook"],
  ["lotus", part(<P.Lotus />), "lotus"],
  ["rose", part(<P.Rose />), "rose"],
  ["shuttle", part(<P.Shuttle />), "shuttle"],
  ["palm left", part(<P.PalmBranch />), "palm-left"],
  ["palm right", part(<P.PalmBranch side="right" />), "palm-right"],
  ["prayer hands", part(<P.PrayerHands />), "hands"],
  ["torse", part(<P.Torse />), "torse"],
  ["motto scroll", part(<P.MottoScroll />), "scroll"],
  ["open book", part(<H.OpenBook />), "book"],
  ["anchor", part(<I.Anchor />), "anchor"],
  ["lamp", part(<I.AntiqueLamp />), null],
  ["mural crown", part(<I.MuralCrown />), null],
  ["route", part(<H.RouteDots />), null],
  ["mountain", part(<H.TableMountain />), null],
  ["sacs ribbon", part(<I.MottoRibbon text="Spectemur Agendo" />, "0 64 256 90"), "sacs", "wide"],
];

const ornaments: [string, ReactNode, string | null][] = [
  ["shuttle divider", <UI.ShuttleDivider motion="none" />, "shuttle-divider"],
  ["dot field", <UI.DotField motion="none" rows={5} columns={7} />, "dots"],
  ["institutional device", <UI.InstitutionalDevice tone="uct" />, "uct"],
  ["mountain line", <UI.TableMountainLine motion="none" />, null],
];
for (const name of ["CompassStar", "ArchivalSeal", "KnotMark", "OrnamentalSeparator"]) {
  const C = extra[name] as ((p: object) => ReactNode) | undefined;
  if (C) ornaments.push([name, <C motion="none" />, null]);
}

const marks = UI.heritageMotifs.map((m) => (
  <span key={m} title={m}>
    <UI.HeritageMark motif={m} size="lg" tone={tone} />
  </span>
));
const small = UI.heritageMotifs.map((m) => (
  <span className="s16" key={m} title={m}>
    <UI.HeritageMark motif={m} size="sm" tone={tone} />
  </span>
));

const page = (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400..700&display=block"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </head>
    <body>
      <div className="grid">
        {[...cells, ...ornaments.map(([n, node, r]) => [n, node, r, "wide"] as const)].map(
          ([name, node, ref, cls]) => (
            <div className={`cell ${cls ?? ""}`} key={name}>
              <div className="pair">
                <div>{node}</div>
                {ref ? <img alt="" src={`file://${refDir}/ref-${ref}.png`} /> : <div />}
              </div>
              <h3>{name}</h3>
            </div>
          ),
        )}
      </div>
      <div className="icons">{marks}</div>
      <div className="icons">{small}</div>
    </body>
  </html>
);

writeFileSync(out, `<!doctype html>${renderToStaticMarkup(page)}`);
