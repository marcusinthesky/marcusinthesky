---
version: alpha
name: "Marcus Gawronsky Portfolio — Provenance & Proof"
description: "A warm editorial-scientific design system combining research rigor, modern engineering, Cape academic heritage, and carefully bounded family-history motifs."
colors:
  primary: "#171717"
  secondary: "#F7F4EC"
  tertiary: "#B52326"
  surface: "#FFFFFF"
  surface-muted: "#F0EEE7"
  on-primary: "#F7F4EC"
  on-surface: "#171717"
  muted-foreground: "#5B5A55"
  border: "#C9C3B7"
  heritage-red: "#B52326"
  lotus-blue: "#245FC7"
  palm-green: "#2F6B3A"
  muted-gold: "#D4B56A"
  sacs-navy: "#00174D"
  sacs-gold: "#D9AD2B"
  uct-azure: "#196FA8"
  data-estimate: "#245FC7"
  data-decision: "#B52326"
  highlight: "#E7D8B2"
  error: "#9E2A2F"
typography:
  display-xl:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 80px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: -0.035em
  display-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 44px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.025em
  headline-md:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.015em
  prose-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: 0em
  body-lg:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.01em
  body-md:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
  body-sm:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  label-lg:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.12em
  label-md:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.14em
  label-sm:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.14em
  metric-lg:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.03em
    fontFeature: "\"tnum\" 1"
  code-md:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
spacing:
  micro: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  5xl: 128px
  gutter: 24px
  page: 32px
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    height: 44px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    height: 44px
  button-secondary-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    height: 44px
  chip:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
    height: 32px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  tooltip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
    height: 44px
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
    height: 44px
  metadata:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  divider:
    backgroundColor: "{colors.border}"
    rounded: "{rounded.none}"
    height: 1px
  link-accent:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 0px
  motto-ribbon:
    backgroundColor: "{colors.muted-gold}"
    textColor: "{colors.primary}"
    typography: "{typography.headline-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  sacs-badge:
    backgroundColor: "{colors.sacs-navy}"
    textColor: "{colors.sacs-gold}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  uct-badge:
    backgroundColor: "{colors.uct-azure}"
    textColor: "{colors.surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs}"
  motif-lotus:
    backgroundColor: "{colors.lotus-blue}"
    rounded: "{rounded.full}"
    size: 24px
  motif-rose:
    backgroundColor: "{colors.heritage-red}"
    rounded: "{rounded.full}"
    size: 24px
  motif-palm:
    backgroundColor: "{colors.palm-green}"
    rounded: "{rounded.none}"
    size: 24px
---

# Marcus Gawronsky Portfolio Design System

This file is the canonical visual-design contract for the portfolio, blog, research pages, project case studies, CV surfaces, generated social cards, and reusable UI components. The YAML tokens above are normative values. The prose below explains intent and application. When implementation and this document conflict, update the implementation or explicitly revise this document; do not allow unrecorded visual drift.

## Overview

### Design thesis

The visual language is **editorial scholarship meeting production engineering**: a warm, paper-like field; black ink; large, elegant serif display type; compact technical labels; fine rules; restrained charts; and a small vocabulary of heraldic, academic, geographic, and surname-derived motifs.

The experience should feel like a very good research monograph, an archival folio, and a modern engineering notebook occupying the same system. It must never feel like a generic SaaS landing page, a faux-medieval heraldry site, a luxury-brand pastiche, or an ornamental family-tree template.

Above all it reads as a **naturalist's field notebook**, in the manner of Darwin's field guides. The work is observed, drawn, labelled and dated like specimens:

- Fraunces for the written hand;
- ink and watercolour tints on paper;
- engraved plates with captions beneath them, giving Latin binomials where a motif has one;
- mottos and taglines as marginal inscriptions;
- place and coordinates as the locality of the entry.

Keep it distinct from the owner's sibling sites. solenya.ai is **neo-brutalist**, and Pricing Perspective is **Swiss typographic**: modern, minimal, slightly warm. Neither sets the tone here. In particular, do not reuse Pricing Perspective's landing anatomy: tracked eyebrow, display headline, a stack of pill buttons, an "Ask AI" row and a line-art figure on the right.

The core tension is deliberate:

- **heritage / future**
- **reflection / action**
- **scholarship / production**
- **human story / quantitative evidence**
- **archival material / interactive computation**
- **Cape Town / international work**
- **ornament / restraint**

The system should communicate intellectual seriousness without institutional stiffness. It should be personal without becoming autobiographical decoration, and technically sophisticated without looking like a developer dashboard.

### Audience and desired response

Primary audiences are researchers, engineers, quantitative practitioners, academics, collaborators, employers, conference peers, and technically curious readers.

The first impression should be:

1. this person thinks carefully;
2. the work is substantive and evidence-led;
3. the implementation quality is high;
4. there is a distinctive personal history behind the work;
5. the site is calm enough to read for a long time.

The interface should reward scrutiny rather than demand attention.

### Brand hierarchy

The **personal name and work are the primary brand**. Heritage enriches the identity; it does not replace it.

Use this hierarchy:

1. **Primary identity:** `Marcus Gawronsky` wordmark, paper/ink system, editorial typography, research/engineering content.
2. **Personal heritage layer:** Gawroński/Gawronsky rook association, Cape Town linework, archival routes, books, records and family-history references.
3. **Family-history layer:** documented Prain heraldic motifs—lotus, rose, shuttle, palms, prayer hands and `PRECOR`.
4. **Educational heritage layer:** SACS and UCT motifs and mottos, used only where education or institutional history is contextually relevant.
5. **Complete heraldic compositions:** rare, contextual, captioned, and never used as a universal personal logo.

The site must not imply that the Prain arms are a Gawronsky coat of arms or that the visitor is viewing an official SACS or UCT website.

### Narrative triad

Three Latin motto traditions can provide a subtle narrative architecture:

- **PRECOR** — the Prain family-history motto; use around ancestry, reflection, continuity and archival material. The Latin verb can carry the sense of asking, entreating or praying.
- **SPECTEMUR AGENDO** — SACS; “let us be judged by our deeds/actions.” Use around projects, engineering, implementation, open tools and work demonstrated in practice.
- **SPES BONA** — UCT; “Good Hope.” Use around learning, research, education, future work and Cape context.

Do not place all three mottos together as a decorative slogan stack on ordinary pages. Their value comes from contextual scarcity.

### Gawronsky / Gawroński heritage rule

The rook is a legitimate **etymological association**, not a claim to a Gawronsky coat of arms. Polish surname scholarship gives more than one plausible formation for `Gawroński`: it may derive from the personal name `Gawron`, associated with Polish `gawron` (“rook”), or from place names such as `Gawrony`. Therefore:

- use the rook as a narrative emblem or visual wordplay;
- describe it as an association with the name, not a definitive single-origin genealogy;
- do not invent a Gawronsky coat of arms;
- do not add crowns, supporters or pseudo-heraldic devices to make the rook look “official.”

### Beinart heritage rule

No literal etymological or heraldic meaning for the Beinart surname is made canonical by this design system. Until branch-specific research establishes a reliable origin, use the existing **book, archive, route, map and record** motifs as biographical/family-history devices only. Never present those motifs as the meaning or crest of the Beinart surname.

### Prain heraldry rule

The Prain assets are based on a documented armorial description associated with Lt-Col Sir David Prain. They are valuable family-history material, but their use on the site must remain historically precise.

**Current stage:** full Prain, SACS and UCT arms and shields are deferred. No shield composition appears on the site; motifs are scattered individually. The rules below govern any later introduction.

Use the full arms primarily in an About/Heritage context with explanatory copy. Elsewhere, prefer constituent motifs. The website must not use the full arms as evidence of the site owner's personal legal entitlement to bear them unless that entitlement is independently established.

The vector shield's repeated flower placement is an artistic rendering of a field described as *semé*; the exact count and placement are not to be treated as fixed heraldic data.

### Institutional heritage rule

SACS and UCT references are **alumni/education context**, not co-branding.

SACS and UCT share the historical South African College device (anchor, open book, mural crown, lamp) and differ only in motto and palette. Implement this as one `InstitutionalDevice` plus `MottoCallout institution="sacs" | "uct"`. Use at most one motto per page, always with its translation.

The asset library contains original vector interpretations of heraldic elements rather than traces of institutional logo artwork. Use them as quiet historical references:

- anchor;
- open book;
- antique lamp;
- mural crown;
- motto typography;
- SACS navy/gold;
- UCT azure;
- related shield geometry when explicitly discussing the institution.

Do not place SACS or UCT heraldic elements beside product CTAs in a way that implies sponsorship, endorsement, partnership, or official affiliation beyond factual alumni/education context.

### Design principles

#### 1. Content before ornament

Every ornamental element must reinforce meaning, hierarchy, navigation, provenance, or place. If removing an ornament improves comprehension without losing meaning, remove it.

#### 2. Heritage as a vocabulary, not wallpaper

Lotus, rose, shuttle, palm, rook, anchor, book, lamp, crown, route and Table Mountain are reusable visual words. Use one or two at a time. Multi-motif compositions belong in dedicated heritage moments.

#### 3. Evidence over spectacle

Charts, citations, publications, project outcomes and reproducible artifacts carry the visual authority. Animation is explanatory or atmospheric, never a substitute for substance.

#### 4. Restraint creates significance

Heritage red, lotus blue, palm green and gold are intentionally scarce. Their rarity gives them meaning. Most pages remain paper, ink, white and hairline grey.

#### 5. Modern implementation, archival sensibility

The site can contain Marimo/Pyodide computation, interactive TypeScript explainers, video, TTS and generated data, but those capabilities should appear within the same calm editorial frame as static prose.

#### 6. Performance is part of the design

No visual decision may require a permanently heavy client runtime merely for decoration. Static HTML and CSS are the default. Interactive islands earn their cost.

#### 7. Accessibility is part of the visual language

Visible focus, strong contrast, readable measure, keyboard operation, reduced-motion behavior and semantic structure are design requirements, not post-processing.

### Voice and content style

Copy should be precise, compact and concrete. Prefer active verbs and evidence-bearing nouns: `built`, `measured`, `derived`, `tested`, `published`, `deployed`, `reproduced`.

Use short display headlines with a clear proposition. Supporting prose can be literary but should not become self-mythologizing.

Metadata is factual and terse. Avoid marketing superlatives, inflated personal claims, vague “innovation” language, or unexplained prestige markers.

### Canonical implementation philosophy

The long-lived hierarchy is:

`content → application semantics → component semantics → design language`

The design language must remain swappable without rewriting the content model, structured metadata, accessibility semantics or core components.

Use the owned UI layer as the design-system boundary. shadcn/Base UI may provide behavior and accessibility primitives, but it is not the visual identity. Tailwind utilities implement semantic tokens; they do not define the brand by themselves.

Native CSS is the default motion system. A JavaScript animation library is introduced only for an isolated interaction that cannot be expressed reasonably with CSS.

## Colors

### Core palette

The base interface is deliberately neutral.

- **Ink — `primary` / `#171717`:** primary text, rules, icons, filled buttons, chart marks and the visual anchor of the system.
- **Paper — `secondary` / `#F7F4EC`:** default page background. It is warm enough to feel printed, but neutral enough for scientific content.
- **White — `surface` / `#FFFFFF`:** raised reading surfaces, code/results panels and occasional cards.
- **Silver paper — `surface-muted` / `#F0EEE7`:** quiet grouping, hover fill, code gutters and archival panels.
- **Muted ink — `muted-foreground` / `#5B5A55`:** secondary prose, captions and metadata.
- **Hairline — `border` / `#C9C3B7`:** rules, table dividers, card boundaries and grid construction.

At least roughly four-fifths of ordinary page area should read as neutral paper/white/ink. The site should remain recognizable even if all heritage accent colors are temporarily removed.

### Heritage palette

- **Heraldic red — `heritage-red` / `#B52326`:** roses, selected micro-accents, tiny state changes and rare emphasized links.
- **Lotus blue — `lotus-blue` / `#245FC7`:** lotus motifs, focus treatment, selected technical links and small interactive emphasis.
- **Palm green — `palm-green` / `#2F6B3A`:** botanical linework, provenance/heritage accents and success-like decorative cues.
- **Muted gold — `muted-gold` / `#D4B56A`:** motto scrolls, archival emphasis, warm metallic suggestion and thin ornamental details.

Do not turn these four colors into a generic four-color UI palette. In ordinary application UI, prefer one accent at a time.

### Institutional palette

- **SACS navy — `#00174D`**
- **SACS gold — `#D9AD2B`**
- **UCT azure — `#196FA8`**

Institutional colors are contextual. They should appear inside an education timeline, institutional heritage callout, alumni caption, or related motif—not as default global brand colors.

### Accent allocation

Use accents according to semantic lineage:

| Context | Preferred accent |
| --- | --- |
| General research / interaction | ink first; lotus blue second |
| Engineering / projects | ink; occasional heraldic red or shuttle silver |
| Heritage / Prain | red, blue, green, muted gold |
| Gawronsky surname story | ink rook; optional lotus blue data/route accent |
| Cape Town / geography | ink linework; UCT azure only when UCT is relevant |
| SACS | SACS navy and gold |
| UCT | UCT azure, black, white and muted gold |
| Errors | `error` only; never co-opt heraldic red semantically without an explicit error token |

### Chapter colour

The Prain shuttle is a weaving shuttle, and the site treats colour as woven in. Paper and ink are the cloth. Each chapter carries **one coloured thread**, taken from its own motif, which runs through the chapter's rules, underlines and edges. Colour marks lines and points where the reader is looking; it never fills a surface.

A page or section declares its chapter with `data-chapter`, which sets the `--chapter` token (ink by default):

| Chapter | `data-chapter` | Thread |
| --- | --- | --- |
| Research, publications, the home Research section | `lotus` | lotus blue |
| Writing, the home Writing section | `rose` | heritage red |
| About / heritage | `palm` | palm green; muted gold stays on mottos |
| Projects, CV, contact, home default | `ink` (default) | ink |

Chapter colour has exactly five consumers:

1. **the thread:** a 2px × 48px emphasised rule, drawn at the start of a `SectionHeading` rule and above a `PageHero` eyebrow;
2. **the navigation thread:** each item in the header and the mobile menu carries its section's chapter; its thread sits on the rule beneath it, persistent for the current section and drawn in on hover or keyboard focus;
3. **the card top edge:** on hover or focus-within, while the other edges darken to ink;
4. **prose link underlines:** the underline, never the link text;
5. **the button bottom edge:** primary and secondary buttons draw a 2px thread along their bottom edge on hover or keyboard focus.

It is never used for text fill (including navigation labels), surfaces (including button fills and chips) or charts. Keep at most one chapter colour in view at a time; on the home page, chapters are stacked far enough apart to satisfy this. SACS and UCT colours are never chapter colours.

Keep the `theme.css` values rather than the colours drawn on the identity sheet (`assets/identity_system.png`), which is a mood board. The sheet's Cape blue `#5BC0EB` is 1.9:1 on paper, and its blue and green only just pass AA.

### Reader's highlighter

Text selection and `<mark>` use `highlight`: muted gold mixed 45% into paper, with ink text (about 12.7:1). This gives gold a job that does not require text contrast on paper.

### Contrast and accessibility

Normal text must meet WCAG AA contrast of at least 4.5:1 against its actual background. Large text must still be comfortably legible; do not deliberately reduce contrast merely because the threshold is lower.

Known safe high-level pairings include:

- ink on paper;
- ink on white;
- paper on ink;
- heritage red on paper;
- lotus blue on paper;
- palm green on paper;
- SACS gold on SACS navy;
- white on UCT azure.

Muted gold is decorative on paper and is **not** a body-text color there. Use ink on gold, or gold on a sufficiently dark field.

Never communicate state by color alone. Pair color with labels, iconography, line style, position, or other semantic treatment.

### Dark mode

There is no default “invert everything” dark mode. The paper-based identity is intentional.

If a dark theme is introduced later, it must be designed as a separate, deliberate theme preserving hierarchy, contrast and heraldic meaning. Do not algorithmically invert SVGs or historical colors.

### Color in charts

Charts are monochrome-first.

Use:

1. ink for primary marks and axes;
2. hairline grey for grids;
3. muted ink for secondary labels;
4. a single heritage color for the variable or state currently under discussion.

That heritage color has a fixed meaning across every figure, independent of chapter colour:

- **`data-estimate` (lotus blue):** what the model believes, such as a filtered estimate, a median path, a principal axis or a limiting law;
- **`data-decision` (heritage red):** what is chosen, such as the selected point on a frontier;
- **ink:** the observed data.

For multi-series charts, add additional colors only when necessary for comprehension and test each combination for non-color differentiation. Use line patterns, markers and direct labels before expanding the palette.

## Typography

### Two-family system

The site uses two downloaded type families at most:

- **Fraunces** for display headlines, editorial quotations, motto moments, selected long-form prose and heritage captions.
- **Inter** for UI, navigation, body copy, metadata, tables, charts, controls and technical annotation.

Code uses the operating-system monospace stack and does not justify a third webfont.

The contrast between serif and sans-serif expresses the core identity: inherited/edited knowledge alongside contemporary technical systems.

### Display type

`display-xl` and `display-lg` are for page-opening statements, not generic headings.

Display headlines should:

- usually occupy 2–4 lines on desktop;
- use sentence case;
- avoid punctuation unless rhetorically necessary;
- wrap naturally rather than using manual `<br>` elements for one viewport;
- remain left aligned by default;
- use generous surrounding whitespace;
- never sit inside a rounded marketing card.

Responsive implementation should use `clamp()` between sensible mobile and desktop values while treating the frontmatter values as the desktop reference.

Typical range:

- mobile display: ~44–52px;
- tablet: ~56–64px;
- desktop: 64–80px.

### Headings

Use `headline-lg`, `headline-md` and `headline-sm` for sections and cards. Hierarchy should come from scale, whitespace and rule placement—not from excessive boldness.

Fraunces 400/500 should be sufficient. Avoid heavy 700–900 serif weights.

### Body text

Use Inter for ordinary site copy. `body-md` is the default UI/body size. `body-lg` is appropriate for hero support copy, introductions and high-value callouts.

Long-form essays may use `prose-lg` in Fraunces where an editorial reading mode is desirable. Do not mix serif and sans-serif paragraph styles randomly within one article.

Recommended long-form measure is 60–72 characters per line. Do not allow article prose to span the full content grid.

### Labels and metadata

`label-*` styles are:

- uppercase;
- tracked;
- compact;
- factual;
- used for eyebrow text, categories, dates, role labels, chart annotations and navigation metadata.

Do not write long prose in all caps.

Labels should feel like catalogue notation or a research figure caption, not like promotional “kicker” text.

### Metrics and numerals

`metric-lg` uses tabular numerals. Use it for meaningful counts, percentages and compact research statistics.

A metric must have a label and, where ambiguity is possible, a unit or explanation. Do not manufacture vanity metrics merely to fill a visual slot.

### Latin mottos

Mottos are typographic artifacts as much as text.

- Use serif or tracked small caps.
- Preserve correct spelling and diacritics.
- Provide a translation or explanation nearby when first introduced.
- Do not use Latin as decorative pseudo-scholarship.
- Never combine mottos into a new invented institutional/family motto.

### Code and mathematics

Code uses `code-md`. Syntax color should remain restrained and legible on a light surface. Avoid neon terminal themes.

Mathematics should visually align with body text and never be rendered as screenshots. Display equations receive vertical space rather than card chrome.

### Font loading

Self-host only required subsets/weights where practical. Avoid loading separate files for weights that are not actually used.

Fraunces and Inter are self-hosted variable fonts loaded through `next/font` and served from the static export; the site makes no third-party font requests.

The design target is two webfont families, bounded weights, no font-loading dependence for critical semantic content, and stable fallback metrics to minimize layout shift.

## Layout

### Page model

The layout is a **fixed-max-width editorial grid with fluid edges**.

Desktop reference:

- maximum content width: ~1280px;
- 12-column grid;
- 24–32px gutters;
- generous page margins;
- content aligned to shared vertical rules;
- sections separated by whitespace and thin rules rather than card stacks.

Tablet collapses to 6 columns; mobile to 4. Do not preserve desktop symmetry at the expense of readable mobile flow.

### Spacing rhythm

Use the spacing tokens as a 4px-rooted rhythm with an 8px practical cadence.

Default relationships:

- icon-to-label: `xs` (8px);
- label-to-value: `xs`–`sm`;
- control internal vertical padding: `sm`;
- card internal padding: `lg`;
- adjacent cards: `md`–`lg`;
- local component groups: `xl`;
- major section separation: `3xl`–`5xl`;
- hero top/bottom space: approximately `4xl`–`5xl` on desktop.

Do not use arbitrary 17px/27px/53px spacing values when a token serves the same purpose.

### Hairlines and rules

Horizontal and vertical rules are a first-class layout device.

Use 1px `border` lines to:

- establish columns;
- separate metadata bands;
- divide list items;
- frame charts;
- anchor section headers;
- create archival/table-like structure.

Rules are preferable to shadows and rounded containers.

### Homepage composition

The homepage reads as the opening spread of a field notebook, taken from the identity sheet (`assets/identity_system.png`): a ruled title block, then chapters of framed, captioned specimen plates. It must not share the landing-page anatomy of the sibling sites (see Design thesis).

Desktop composition:

- **title block:** three columns divided by vertical hairlines. The first holds the display statement with the practice line beneath it; the second the pull-quote "Ideas that survive contact with production."; the third a short serif statement with one primary action and one text link;
- **plate row:** the Galton board framed as a specimen plate beside chapter 01, which is divided from it by a vertical hairline;
- **evidence band:** where the work has been published and presented;
- **chapters:** each chapter opens with its emblem plate, captioned like a field-guide plate: the motif's name, then its Latin binomial where it has one (lotus, *Nelumbo nucifera*; rose, *Rosa persica*).

On narrow screens the columns stack in reading order and the vertical hairlines disappear.

"Ask AI" belongs with the research it asks about, not in the hero.

Do not put the full Prain arms, SACS arms and UCT arms simultaneously above the fold. One dominant visual idea is sufficient.

### Heritage placement

Recommended rhythm:

- **navigation / header:** no full heraldry; wordmark and perhaps one tiny rook/shuttle/lotus detail;
- **hero:** at most one restrained heritage reference;
- **section breaks:** shuttle divider, lotus/rose marker, dot field or line motif;
- **About / Heritage:** full narrative range is permitted;
- **Education:** SACS/UCT context with institution-specific motifs;
- **footer:** Table Mountain line, route trace, rook or a motto fragment can close the page quietly.

### Reading layouts

Articles and case studies use three conceptual zones:

1. narrow metadata rail;
2. readable prose column;
3. optional figure/interactive breakout.

Figures may exceed the prose width. Prose itself should not.

Wide tables and notebooks may use the full content width with horizontal overflow handled deliberately on small screens.

### Project and publication grids

Desktop cards can use 2–3 columns, but cards should not become equal-height marketing tiles by default. Let editorial content create controlled variation.

Publication lists often work better as structured rows than cards.

Use borders, numbering, years, venues and compact metadata to build information density.

### Education / heritage timeline

Use a vertical or stepped timeline with clear dates and locations. Each institution gets:

- institution name;
- factual dates/degree or school context;
- one small motif;
- motto where appropriate;
- short explanatory copy.

Institutional heraldic renderings should not visually outrank the personal name or the academic content.

### Charts and explainers

Charts are part of the grid, not floating widgets.

Use:

- direct labels where possible;
- restrained axes;
- 1px grid lines;
- ink dots/lines;
- generous plot margins;
- nearby explanatory text;
- a clear reset/replay control only when animation is meaningful.

Interactive explanations should preserve a meaningful static state before hydration.

### Responsive behavior

At approximately 900px and below:

- hero becomes one column;
- ornamental art moves after the core proposition;
- vertical rules that no longer clarify structure disappear;
- metrics wrap into 2-column or 1-column arrangements;
- card grids reduce;
- large mottos and heraldry scale down rather than crop.

At narrow mobile widths:

- page padding is at least 16px;
- tap targets remain at least 44px;
- navigation condenses semantically;
- no text is embedded in raster imagery;
- no essential interaction requires hover;
- decorative motifs may be omitted to protect clarity and performance.

### Print, PDF and social cards

The same system should project cleanly into CV/PDF, print articles, OpenGraph images and GitHub-facing assets.

Print/PDF:

- paper becomes white;
- essential text remains black;
- nonessential animations disappear;
- heritage motifs become line art or retain restrained spot color;
- URLs/citations remain readable.

Social cards may use a stronger heraldic accent than ordinary pages, but must remain legible at thumbnail size.

## Elevation & Depth

### Flat by default

Depth is primarily created through:

- typography;
- whitespace;
- borders;
- tonal surface changes;
- overlap of editorial layers;
- motion during transitions.

The design does not use generic card shadows to separate every object.

### Surface hierarchy

Use three surface levels:

1. **Paper:** default background.
2. **White:** focused reading or interactive surface.
3. **Silver paper:** quiet grouped/secondary surface.

Most components should sit directly on paper.

### Shadows

Persistent shadows are exceptional.

A subtle shadow is allowed for true overlays such as a command/search dialog, tooltip, popover or modal because those elements physically sit above the page. Keep it soft, neutral and low-opacity.

Do not use:

- glowing shadows;
- colored shadows;
- neumorphism;
- glassmorphism;
- large blurred “premium” shadows on cards.

### Overlap

Heraldic motifs can cross a rule or sit partly outside a section boundary when doing so feels like print ornament. Overlap must never obscure content or create ambiguous hit targets.

### Motion as depth

A palm branch separating slightly from the page during scroll, a shuttle sliding into a divider, or a flower blooming on hover can create depth more appropriately than a shadow.

Keep movement shallow. Elements should feel printed, drawn or assembled—not like floating 3D objects.

## Shapes

### Core geometry

The UI is predominantly rectilinear and sharp.

- default corner radius: `0px`;
- small functional softening: `2px`;
- `4px` only where a component benefits from a modest radius;
- full circles are reserved for actual circular marks, dots, avatar crops or small indicators.

Do not turn buttons, chips and cards into pill-heavy SaaS components.

### Line weights

UI line system:

- 1px: hairlines, rules, table dividers, chart grids;
- 2px: active/focus outlines, emphasized rules;
- 3–5px: illustrative SVG outlines at larger sizes.

Use `vector-effect="non-scaling-stroke"` where necessary to preserve SVG line quality during responsive scaling.

### Iconography

Use Lucide or equivalent simple line icons for generic interface actions. Do not redraw standard interface concepts as heraldic symbols.

Heritage SVGs are not a replacement for accessible UI icons.

Generic icons should:

- use consistent stroke weight;
- sit on the same optical grid;
- inherit `currentColor`;
- remain visually quieter than heraldic illustration.

### Heraldic asset vocabulary

Components live in `src/typescript/packages/ui/src/heritage/`: `parts/prain.tsx`, `parts/heritage.tsx`, `parts/institutions.tsx`, `parts/patterns.tsx` (the compass star), `heritage-mark.tsx`, `ornaments.tsx` (rules, dividers, dot field, archival seal) and `motto-callout.tsx`. Original artwork lives in `assets/heritage/`; the file names below refer to it. Hex values shown in `assets/identity_system.png` are illustrative; the YAML front matter is normative.

The canonical asset vocabulary includes:

#### Prain

- `prain/lotus.svg`
- `prain/rose.svg`
- `prain/shuttle.svg`
- `prain/palm-left.svg`
- `prain/palm-right.svg`
- `prain/prayer-hands.svg`
- `prain/torse.svg`
- `prain/motto-precor.svg`
- `prain/shield.svg`
- `prain/crest.svg`
- `composites/prain-arms.svg`

Preferred everyday use is at the **sub-component** level.

Meaning in this site:

- **lotus:** inquiry, emergence, research;
- **rose:** continuity, human history, emphasis;
- **shuttle:** making, engineering, weaving systems together;
- **palm:** lineage, organic movement, page-edge ornament;
- **prayer hands / PRECOR:** family-history context and reflection.

These are design interpretations for the site. Do not invent historical symbolism and present it as heraldic fact.

#### Gawronsky

- `heritage/rook.svg`
- `heritage/route-dots.svg`

The rook is a surname-association motif. The route is for migration, lineage, movement and research journeys. Neither is a coat of arms.

#### Beinart / family archive companion motifs

- `heritage/open-book.svg`
- `heritage/route-dots.svg`

Use these for records, scholarship, migration and archival narrative without claiming they are the etymological meaning of `Beinart`.

#### Cape Town

- `heritage/table-mountain-line.svg`

Use Table Mountain as geographic grounding, especially in footer, About, contact/location or education contexts. Keep it line-based and subordinate.

#### SACS / UCT

- `institutions/anchor.svg`
- `institutions/antique-lamp.svg`
- `institutions/mural-crown.svg`
- `institutions/sacs-motto-ribbon.svg`
- `institutions/sacs-heraldic.svg`
- `institutions/spes-bona-mark.svg`
- `institutions/uct-heraldic.svg`

The anchor/book/lamp/crown can be abstracted into small education motifs. The full heraldic renderings remain contextual and clearly separated from the site's personal identity.

### Motif hierarchy

Use four degrees of intensity:

**Level 0 — Invisible heritage:** color, fine rules, typographic rhythm only.

**Level 1 — Micro motif:** one lotus, shuttle, rook, anchor, book or compass star at 12–32px.

**Level 2 — Ornament or emblem plate:** divider, corner palm, dot field, archival seal, line illustration, or one constituent motif at plate scale (roughly 120–320px) in full colour, framed and captioned.

**Level 3 — Narrative composition:** multiple motifs in an About/Heritage or Education section.

**Level 4 — Full arms:** rare, captioned, historically contextual.

Most of the site operates at Levels 0–1. The exception is one emblem plate per chapter: the home page chapters, and the About hero. Emblem plates are where the heraldic colour gets its mass. They show a single constituent motif, never a shield composition, and their caption names the motif and its source.

### Patterns

Use repeating patterns sparingly.

- Rose/lotus scatter: low-density heritage panels, never behind dense text.
- Dot field: computational/probabilistic texture, reveal sequences and chart-adjacent fields.
- Compass star: a neutral orientation or chapter separator, never a claim of heraldic provenance.
- Shuttle divider: engineering/project section rule.
- Palm corner: page-edge ornament, not a frame around every card.

Patterns should usually sit at low opacity or occupy bounded areas.

### Image treatment

Photography and document scans should remain factual. Avoid decorative sepia filters that imply false age.

Archival material may use a light paper surround and caption. Contemporary photography may remain full color, but should be cropped editorially and aligned to the grid.

Avoid rounded image cards unless the content itself requires a circular crop.

## Components

### Component philosophy

Components should encode semantics and behavior; the theme encodes the visual language.

The owned UI package is the source of truth for reusable components. shadcn/Base UI is a behavior/accessibility foundation. Components must consume semantic tokens rather than hard-coded brand values wherever practical.

Site-specific narrative compositions can live in the application layer when they are not genuinely reusable.

### Buttons

#### Primary

- black/ink fill;
- paper text;
- square corners;
- minimum 44px height;
- uppercase tracked label;
- no gradient;
- optional right arrow;
- hover may shift the arrow 2–4px; hover and keyboard focus draw the chapter thread along the bottom edge (see Chapter colour), without layout movement.

#### Secondary

- paper or transparent background;
- ink text;
- 1px ink/border outline;
- same height and typography as primary;
- hover uses silver-paper fill.

#### Tertiary / text action

- text only;
- underline or rule-based state;
- no pill background;
- accent color only when it has meaning.

Disabled controls reduce contrast while remaining readable and must not rely on opacity so low that text fails accessibility.

### Links

Body links use ink text with an underline in the chapter colour, so a research page underlines in lotus blue and an ink chapter underlines in ink. Hover and focus thicken the underline to 2px; they never remove the affordance.

External links may use a small standard external-link icon. Do not use a rook, lotus or heraldic object merely to signify “external.”

### Navigation

Desktop navigation is a restrained horizontal list.

- personal wordmark left;
- primary sections right, separated by dots (silent to screen readers);
- the place line "Cape Town / 33.9° S 18.4° E" at the far right on wide screens, as on the identity sheet;
- 1px bottom rule;
- sticky behavior permitted if it does not obscure content;
- active state uses underline/rule, not a pill: the current section's chapter thread sits on the header's bottom rule, and in the mobile menu at the start of its row's rule;
- no mega-menu for a personal portfolio.

The header is static and cannot know the route. Each page declares its section with `data-nav` on its root, and `site-header.css` matches it with `:has()`. Publications count as Research, and case studies count as Projects.

Mobile navigation must be fully keyboard accessible and should use a simple disclosure/dialog pattern rather than animation-heavy navigation.

### Hero

The hero contains:

1. eyebrow;
2. display proposition;
3. supporting statement;
4. one or two actions;
5. optional AI/research/profile links;
6. one dominant visual on the right or below.

The visual may be a quantitative animation, a restrained heraldic composition, or a hybrid. Do not make the user parse five unrelated heritage symbols before understanding the work.

### Section headers

Section headers follow the identity sheet's compartment label:

- a 1px ink rule, beginning with the 2px chapter thread;
- the ordinal and chapter name in `label-lg` spaced capitals ("02 / Selected work");
- a short serif title at `headline-md`. Display sizes belong to the title block, so chapters do not compete with it;
- optional short description;
- optional single micro motif.

“Selected work,” “Research,” “Writing,” “Heritage,” etc. should feel like chapters in one volume.

### Cards

Cards are editorial containers, not floating tiles.

Default:

- white or paper surface;
- 1px hairline border where separation is needed;
- no persistent shadow;
- zero radius;
- 24px internal padding;
- compact metadata;
- serif or sans title depending on content;
- visible link affordance.

Hover should be subtle: border darkening, 1–2px translation, underline change, or a small motif activation. Avoid scaling the entire card. On hover and focus-within, the top edge takes the chapter colour.

Where a card has catalogue metadata (source and date, technology), it sits **beneath the frame** as a museum-label caption (`Card caption`), not as chips inside it.

### Plates

A plate (`Plate`) is a framed specimen on a white surface with its label **beneath** the frame: the name in `label-sm` spaced capitals, then one short serif italic line saying what it shows or where it comes from. Use plates for figures (the Galton board, section figures) and for emblem plates. Plates in a tile row stretch to the row's height and keep the specimen centred.

### Project cards

Project cards prioritize:

- problem / proposition;
- role;
- evidence or outcome;
- stack only when useful;
- status/date;
- case-study link.

Use `SPECTEMUR AGENDO` only as a contextual project/engineering thread, never as repeated decoration on every card.

### Publication cards / rows

Prefer row-based scholarly structure:

- title;
- authors;
- venue/year;
- DOI/arXiv/SSRN/links;
- concise abstract or contribution;
- optional citation metadata.

Avoid logo-heavy publication cards. Venue logos should not compete with the paper title.

### Metrics

A metric comprises:

- `metric-lg` value;
- tracked label;
- optional qualifier;
- optional tiny chart.

Metrics must be real and sourced from canonical site data. Static build-time values are preferable to third-party scripts in the initial render.

### Chips

Chips are square-ish, compact metadata devices, not decorative pills: silver paper with a hairline border, ink `label-sm` text, 2px radius. They are never filled with ink or a heritage colour; colour-coded tags would compete with chapter colour.

Use for:

- topic;
- method;
- status;
- content type;
- technology when genuinely relevant.

Do not make every noun a chip.

### Lists and timelines

Use rules and alignment. Timeline markers may use small rook, lotus, anchor, book or plain dots depending on narrative context.

Dates remain text, not embedded inside ornamental shields.

### Motto callout

A motto callout is a quiet editorial device:

- motto in small caps or serif;
- translation/explanation below;
- one thin rule or tiny related motif;
- no oversized banner unless on a dedicated heritage page.

### Heritage mark

`HeritageMark` is a compositional component that accepts one motif at a time by default.

Suggested API conceptually:

- `motif`: `rook | lotus | rose | shuttle | palm | anchor | book | lamp | crown | route | mountain | star`;
- `tone`: `ink | heritage | sacs | uct`;
- `size`: `sm | md | lg | xl`;
- `motion`: `none | reveal | hover | scroll`.

The component must not silently combine unrelated lineages.

### Full Prain arms

The full arms are a content figure, not a logo.

Requirements:

- meaningful alt text or adjacent explanation;
- provenance caption;
- adequate whitespace;
- no use as a tiny favicon;
- no watermark behind ordinary text;
- no implication that the arms are a Gawronsky emblem.

### Institutional marks

SACS/UCT-inspired heraldic renderings are content figures or education-timeline artifacts.

If official institutional logos are ever used, source them separately under the institutions' current brand rules. Do not substitute the custom heraldic renderings for official marks in contexts that require official branding.

### Dividers

Use:

- plain hairline by default;
- compass-star rule for a neutral chapter or orientation transition;
- shuttle divider for engineering/making transitions;
- micro lotus/rose separator for heritage;
- dot field for computational/probability context.

Ornamental dividers should not occur between every section.

### Data visualizations

Default visual grammar:

- white/paper background;
- ink dots and lines;
- hairline grids;
- Inter labels;
- no 3D;
- no gratuitous gradients;
- no legends when direct labels work;
- animation only when it explains process.

A replay control must state what it replays. The static final chart must remain understandable without animation.

### Code blocks

- light neutral surface;
- thin border;
- system monospace;
- compact header only when filename/language is useful;
- copy button appears on focus/hover but remains keyboard reachable;
- syntax colors are restrained;
- long lines scroll horizontally rather than shrink to illegibility.

### Marimo / Python interactive islands

Interactive Python content must look like the surrounding article, not an embedded foreign application.

Rules:

- render meaningful static build output before hydration;
- lazy-load Pyodide only on pages that contain Marimo;
- use the same typography, borders and control styles as native React components;
- show a clear loading state;
- expose keyboard-operable controls;
- provide textual explanation around the computation.

### TypeScript interactive widgets

Use React/TypeScript for interactions that do not require Python: visual explainers, calculators, DOM diagrams, filters, lightweight simulations.

Do not use Python merely because the site can.

### Audio / TTS

Article narration should use pre-generated audio where possible.

The player is secondary to the article:

- native controls or a lightweight custom wrapper;
- visible duration;
- transcript is the article itself;
- no autoplay;
- no waveform dependency unless editorially useful.

### Video

Use native video for simple content. Video frames align to the grid, use square corners, provide captions where appropriate, and load metadata rather than full media until requested.

### Search

If/when search is added, it should feel like an index:

- fast;
- keyboard-first;
- compact result rows;
- highlighted title/section terms;
- no visual takeover;
- no hosted-search branding in the primary interface.

### Forms and input fields

Inputs are square, quiet and accessible.

- labels always visible;
- 44px minimum control height;
- 1px border;
- 2px visible focus treatment;
- error copy in the dedicated error color plus text/icon semantics;
- placeholders are examples, not labels.

Checkboxes and radios use native semantics and Base UI/shadcn behavior where appropriate. Custom drawing must preserve clear checked/unchecked/indeterminate states.

### Tooltips

Tooltips are brief. They explain unfamiliar icons or terms; they are not a place for essential instructions.

Use ink background, paper text, 2px radius, compact label typography, and a short delay. All tooltip content that is necessary to complete an action must also be available without hover.

### Tables

Research tables use:

- hairline horizontal rules;
- minimal vertical borders;
- Inter labels;
- tabular numerals;
- sticky header only where useful;
- responsive overflow with an accessible description.

Do not turn tables into a grid of rounded mini-cards.

### Focus states

Every interactive element must have a visible keyboard focus state.

Preferred focus treatment:

- 2px lotus-blue outline;
- 2px offset from the element;
- never removed without an equal or better replacement.

Focus must remain visible on SACS navy, UCT azure, ink and paper surfaces; adjust local treatment if needed.

### Motion system

Motion is CSS-first and purposeful.

#### Timing

- micro state change: 120–160ms;
- hover/focus transition: 160–220ms;
- content reveal: 240–420ms;
- line drawing / motif assembly: 600–1200ms;
- slow ornamental parallax: tied to scroll, low amplitude.

Preferred easing for reveal/settle behavior: a strong ease-out such as `cubic-bezier(0.22, 1, 0.36, 1)`.

#### Motif motion

- **palm:** 1–2° separation/sway or small vertical parallax;
- **prayer hands:** opacity/translate reveal, never repeated “praying” motion;
- **motto scroll:** restrained unfurl on first reveal;
- **lotus / rose:** 1.00 → ~1.04 scale and color saturation on hover;
- **shuttle:** horizontal 8–16px slide into a rule;
- **rook:** one-time line draw or feather reveal;
- **dot field:** sequential reveal suitable for probability/process explanation;
- **anchor/book/lamp:** simple fade/draw in education context;
- **compass star:** one quarter-turn settle; the hairlines of its rule grow outward from it;
- **archival seal:** the rings draw, then the legend and the lotus appear;
- **full arms:** optional one-time assembly in a dedicated heritage section, not on every page load.

#### Scroll behavior

Scroll-linked motion should reinforce the reading direction. It must not pin the user into long “scrollytelling” sequences unless the content itself requires that format.

Avoid scroll hijacking.

#### Reduced motion

`prefers-reduced-motion: reduce` is mandatory.

In reduced-motion mode:

- render final states immediately;
- disable parallax;
- disable continuous loops;
- preserve hover/focus color/border feedback without spatial animation;
- keep all information and affordances intact.

### State model

All interactive components must specify:

- default;
- hover, when pointer hover exists;
- focus-visible;
- active/pressed;
- disabled, when applicable;
- loading, when applicable;
- error/success, when applicable;
- reduced-motion behavior.

No state may depend solely on subtle opacity.

### Accessibility contract

The component system must enforce:

- WCAG AA text contrast;
- semantic HTML first;
- keyboard access for every action;
- 44px touch targets for primary controls;
- visible labels;
- meaningful headings;
- alt text for meaningful images;
- empty alt text for purely decorative motifs;
- no text baked into non-accessible raster images when HTML text is possible;
- logical focus order;
- reduced-motion support;
- non-color state cues;
- captions/transcripts for media as appropriate.

Heraldic imagery that is explained by adjacent prose can use concise alt text to avoid repeating the entire description.

### Storybook contract

Storybook is the design-system laboratory.

Every exported reusable UI component should have stories covering, where relevant:

- default state;
- interactive states;
- long content;
- empty state;
- error/loading state;
- small and large viewports;
- keyboard focus;
- reduced motion;
- heritage accent variants;
- high-contrast/accessibility checks.

Stories should serve as visual development fixtures, interaction tests and accessibility fixtures rather than maintaining separate duplicate examples.

### Performance contract

Visual richness must not compromise the static-first architecture.

Design requirements:

- server-render/static HTML by default;
- `"use client"` only where interaction requires it;
- SVG motifs inline only when part-level styling/animation is required;
- external SVG/image use when static rendering is sufficient;
- no third-party widgets in the critical rendering path;
- no global animation runtime merely for decoration;
- lazy activation of Python/Marimo;
- explicit image dimensions;
- stable font loading;
- no layout shift introduced by animation.

The design target is compatible with a site budget of approximately:

- ordinary-page compressed JS: under 50 KB where practical;
- CSS: under 30 KB where practical;
- third-party JS on initial load: 0 KB;
- CLS: ≤ 0.01;
- LCP: ≤ 2.0s in the representative Lighthouse environment;
- TBT: effectively zero on static pages.

Performance budgets are not permission to ship useless bytes up to the limit.

### Asset implementation

When heritage SVGs are copied into the project, preserve stable `id` / `data-part` hooks where present, including motifs such as:

- `lotus`;
- `rose`;
- `shuttle`;
- `prayer-hands`;
- `palm-left`;
- `palm-right`;
- `anchor`;
- `lamp`;
- `mural-crown`.

Inline or convert SVGs to React components only when the page needs to address internal parts. Otherwise use static SVG files to avoid unnecessary component complexity.

Shared palette variables should map to semantic theme tokens rather than hard-coded values throughout components.

### Theme implementation

The expected Tailwind/CSS semantic layer should expose concepts equivalent to:

- background → paper;
- foreground → ink;
- card → white;
- card-foreground → ink;
- muted → silver paper;
- muted-foreground → muted ink;
- border → hairline;
- primary → ink;
- primary-foreground → paper;
- accent → heritage red or context-specific accent;
- ring → lotus blue.

Do not scatter raw `#B52326`, `#245FC7`, etc. across JSX. Raw values belong in the canonical theme/token layer and in source SVG artwork where required.

## Do's and Don'ts

### Do

- Do let content, evidence and typography dominate the page.
- Do use the warm paper/ink system as the recognizable base identity.
- Do treat Fraunces + Inter as an intentional editorial/technical pairing.
- Do keep body measures readable and section spacing generous.
- Do use fine rules as structural elements.
- Do reserve bright heraldic color for moments that deserve attention.
- Do use heraldic pieces separately more often than the complete arms.
- Do keep the rook explicitly framed as a Gawroński/Gawronsky name association rather than an invented crest.
- Do keep the Beinart archive/book/route language explicitly non-etymological until reliable research supports something more specific.
- Do caption the full Prain arms with provenance when used as family-history content.
- Do keep SACS and UCT references tied to factual education context.
- Do translate or explain Latin mottos when first introduced.
- Do use `Spectemur Agendo` as a thematic bridge to demonstrated work.
- Do use `Spes Bona` as a thematic bridge to education, research and forward-looking work.
- Do use `PRECOR` sparingly in family-history/reflection contexts.
- Do keep charts monochrome-first and directly labeled where possible.
- Do make interactive research legible before hydration.
- Do animate transforms, opacity and drawing/reveal properties rather than layout.
- Do support `prefers-reduced-motion`.
- Do provide visible focus and keyboard operation.
- Do design components in Storybook before proliferating one-off variants.
- Do keep the component layer semantic and the theme layer replaceable.
- Do preserve stable SVG sub-component hooks for controlled animation.
- Do self-host and subset fonts where practical.
- Do use build-time/static data projections for profile metrics where possible.
- Do test representative mobile, tablet and desktop widths.
- Do test ordinary articles with JavaScript disabled where feasible.
- Do run the DESIGN.md linter when the file changes.
- Do treat the design system as version-controlled source, not inspiration-only documentation.

### Don't

- Don't use the full coat of arms as the universal logo.
- Don't call the Prain arms a Gawronsky crest.
- Don't imply personal armorial entitlement that has not been established.
- Don't invent a Beinart or Gawronsky coat of arms.
- Don't present a rook motif as proof of a single genealogical origin.
- Don't trace or casually reproduce official SACS/UCT brand assets when an original heraldic reference or simple textual attribution is sufficient.
- Don't imply SACS or UCT endorsement.
- Don't combine Prain, SACS and UCT arms into a new pseudo-coat-of-arms.
- Don't create a composite shield representing institutions and family lines.
- Don't use Latin mottos as meaningless wallpaper.
- Don't turn every section divider into heraldry.
- Don't use every heritage color at once outside a deliberately heraldic composition.
- Don't use gold for small body text on paper.
- Don't create a generic dark-mode inversion.
- Don't use gradients, glassmorphism, glowing borders or neon code aesthetics as default styling.
- Don't use large rounded cards or pill buttons as the general shape language.
- Don't add shadows where a rule, whitespace or surface change is sufficient.
- Don't animate continuously merely to make the page feel “alive.”
- Don't scroll-jack.
- Don't animate content in a way that causes layout shift.
- Don't hide important information behind hover.
- Don't use color alone to signal state or chart series.
- Don't use tiny low-contrast metadata to simulate sophistication.
- Don't use raster text for headings, mottos or labels that can be real text.
- Don't ship Pyodide on pages that do not contain Python interactivity.
- Don't install a global motion library before a concrete interaction requires it.
- Don't let shadcn's defaults become the site's visual identity.
- Don't hard-code brand colors throughout components.
- Don't create new component variants without a semantic need and a Storybook story.
- Don't prioritize decorative fidelity over Lighthouse, accessibility or readable content.
- Don't introduce third-party widgets into the initial render for data that can be generated at build time.
- Don't turn the portfolio into a dense dashboard; it is an editorial research site.
- Don't turn the heritage layer into nostalgia; it should connect provenance to present work.

### Canonical review checklist

A design change is ready only when the answer to each applicable question is “yes”:

1. **Identity:** Does it still look recognizably like paper + ink + editorial serif + technical sans, even without ornament?
2. **Meaning:** Does every heritage motif have a contextual reason to be present?
3. **Provenance:** Are heraldic/institutional claims framed accurately and without implied entitlement or endorsement?
4. **Hierarchy:** Is the work more prominent than the decoration?
5. **Color:** Is accent color scarce, semantic and accessible?
6. **Typography:** Does the page use the canonical type roles and readable measures?
7. **Layout:** Does the component align to the grid and spacing rhythm?
8. **Shape:** Is it using the sharp editorial geometry rather than generic rounded SaaS styling?
9. **Interaction:** Are hover, focus, active, loading/error and reduced-motion states defined where applicable?
10. **Accessibility:** Is keyboard use, contrast, labeling and non-color communication intact?
11. **Motion:** Does animation explain, reveal or enrich meaning without blocking reading?
12. **Performance:** Is the visual effect possible without unjustified client JavaScript or layout shift?
13. **Responsive:** Does it remain coherent from narrow mobile to wide desktop?
14. **Reusability:** Is this a genuine reusable component/token/pattern, or should it remain a one-off narrative composition?
15. **Documentation:** If the change alters a canonical visual rule, has this `DESIGN.md` been updated in the same change?
