import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  Anchor,
  AntiqueLamp,
  DotField,
  HeritageMark,
  heritageMotifs,
  InstitutionalDevice,
  Lotus,
  Motif,
  MottoCallout,
  MottoRibbon,
  MottoScroll,
  MuralCrown,
  OpenBook,
  PalmBranch,
  PalmCorner,
  PrayerHands,
  Rook,
  Rose,
  RouteDots,
  Shuttle,
  ShuttleDivider,
  TableMountain,
  TableMountainLine,
  Torse,
  type MotifTone,
} from "../index";

const meta = {
  title: "Heritage/Motifs",
  component: HeritageMark,
  parameters: { layout: "padded" },
  args: { motif: "rook" },
} satisfies Meta<typeof HeritageMark>;

export default meta;
type Story = StoryObj<typeof meta>;

const TONES: MotifTone[] = ["heritage", "ink", "sacs", "uct"];

const PARTS: [string, ReactNode][] = [
  ["Lotus", <Lotus key="lotus" />],
  ["Rose", <Rose key="rose" />],
  ["Shuttle", <Shuttle key="shuttle" />],
  ["Palm (left)", <PalmBranch key="palm-left" side="left" />],
  ["Palm (right)", <PalmBranch key="palm-right" side="right" />],
  ["Prayer hands", <PrayerHands key="hands" />],
  ["Torse", <Torse key="torse" />],
  ["Motto scroll", <MottoScroll key="scroll" />],
  ["Rook", <Rook key="rook" />],
  ["Open book", <OpenBook key="book" />],
  ["Route", <RouteDots key="route" />],
  ["Table Mountain", <TableMountain key="mountain" />],
  ["Anchor", <Anchor key="anchor" />],
  ["Antique lamp", <AntiqueLamp key="lamp" />],
  ["Mural crown", <MuralCrown key="crown" />],
  ["Motto ribbon", <MottoRibbon key="ribbon" text="Spectemur Agendo" />],
];

export const Default: Story = {
  args: { motif: "rook", size: "lg", title: "Rook" },
};

export const PartsByTone: Story = {
  render: () => (
    <table className="border-collapse text-sm">
      <thead>
        <tr>
          <th className="p-2 text-left" scope="col">
            Part
          </th>
          {TONES.map((tone) => (
            <th className="p-2" key={tone} scope="col">
              {tone}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PARTS.map(([name, part]) => (
          <tr className="border-t border-border" key={name}>
            <th className="p-2 text-left font-normal" scope="row">
              {name}
            </th>
            {TONES.map((tone) => (
              <td className="p-2" key={tone}>
                <Motif className="size-20 bg-card" tone={tone} viewBox="0 0 256 256">
                  {part}
                </Motif>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const MarkSizes: Story = {
  render: () => (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
      {heritageMotifs.map((motif) => (
        <li className="flex items-center gap-2" key={motif}>
          <HeritageMark motif={motif} size="sm" />
          <HeritageMark motif={motif} size="md" />
          <HeritageMark motif={motif} size="lg" title={motif} />
        </li>
      ))}
    </ul>
  ),
};

export const RevealOnLoad: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {heritageMotifs.map((motif) => (
        <HeritageMark key={motif} motif={motif} motion="reveal" size="lg" />
      ))}
    </div>
  ),
};

export const HoverAndFocus: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["lotus", "rose", "shuttle", "rook", "book"] as const).map((motif) => (
        <a
          className="group inline-flex items-center gap-2 border border-border p-3"
          href="#hover"
          key={motif}
        >
          <HeritageMark motif={motif} motion="hover" size="lg" />
          <span className="capitalize">{motif}</span>
        </a>
      ))}
    </div>
  ),
};

export const ScrollContainer: Story = {
  render: () => (
    <section
      aria-label="Scroll-driven motifs"
      className="h-96 overflow-y-auto border border-border"
      // Scrollable regions must be keyboard reachable.
      tabIndex={0}
    >
      <p className="p-4 text-muted-foreground">
        Scroll down. Motifs scrub on their own view timeline; under reduced motion or without
        scroll-timeline support they render finished.
      </p>
      <div className="h-80" />
      <div className="space-y-24 p-4">
        {heritageMotifs.map((motif) => (
          <HeritageMark className="size-24" key={motif} motif={motif} motion="scroll" />
        ))}
        <InstitutionalDevice className="h-40" motion="scroll" tone="sacs" />
      </div>
      <div className="h-80" />
    </section>
  ),
};

export const Ornaments: Story = {
  render: () => (
    <div className="max-w-3xl space-y-10">
      <ShuttleDivider />
      <DotField />
      <DotField columns={24} rows={2} tone="ink" />
      <div className="flex gap-6">
        <PalmCorner className="size-40" />
        <PalmCorner className="size-40" side="right" />
      </div>
      <TableMountainLine />
    </div>
  ),
};

export const InstitutionalDevices: Story = {
  render: () => (
    <div className="flex gap-8">
      {TONES.map((tone) => (
        <InstitutionalDevice
          className="h-40"
          key={tone}
          title={`Device, ${tone} tone`}
          tone={tone}
        />
      ))}
    </div>
  ),
};

export const Mottos: Story = {
  render: () => (
    <div className="max-w-xl space-y-10">
      <MottoCallout institution="sacs" />
      <MottoCallout institution="uct" />
    </div>
  ),
};

export const ReducedMotion: Story = {
  render: () => (
    <p className="max-w-prose">
      All motif motion sits inside <code>prefers-reduced-motion: no-preference</code>, and scroll
      motion also inside <code>@supports (animation-timeline: view())</code>. Keyframes are
      from-only, so emulating reduced motion in the browser shows every motif finished; hover keeps
      only its saturation change.
    </p>
  ),
};
