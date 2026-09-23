import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, ButtonLink, Card, Lotus, Motif, Plate, SectionHeading } from "../index";

const meta = {
  title: "System/Editorial components",
  component: Card,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composition: Story = {
  render: () => (
    <div className="w-[min(44rem,90vw)] space-y-8 p-6">
      <SectionHeading
        eyebrow="Research system"
        index={1}
        title="Research made operational"
        description="A small semantic layer designed for long-form research and engineering work."
      />
      <Card>
        <Badge>Case study</Badge>
        <h3 className="mt-5 font-serif text-2xl">Pricing Perspective</h3>
        <p className="mt-3 text-muted-foreground">
          Reproducible quantitative research across software, evidence, and formal claims.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ButtonLink arrow href="#example">
            Read the case study
          </ButtonLink>
          <ButtonLink href="#example" variant="secondary">
            Download CV
          </ButtonLink>
          <ButtonLink arrow href="#example" variant="text">
            All writing
          </ButtonLink>
        </div>
      </Card>
    </div>
  ),
};

const chapters = [
  ["ink", "Projects, CV, contact"],
  ["lotus", "Research, publications"],
  ["rose", "Writing"],
  ["palm", "About, heritage"],
] as const;

/** One thread per chapter: the section rule, card top edge (hover/focus) and prose underlines. */
export const Chapters: Story = {
  render: () => (
    <div className="grid w-[min(64rem,94vw)] gap-10 p-6 md:grid-cols-2">
      {chapters.map(([chapter, use]) => (
        <section className="space-y-6" data-chapter={chapter} key={chapter}>
          <SectionHeading eyebrow={chapter} title={use} />
          <Card>
            <div className="typeset">
              <p>
                Ink text keeps its contrast; the <a href="#example">underline carries the thread</a>
                . Hover or focus the card to see its top edge take the chapter colour.
              </p>
            </div>
          </Card>
        </section>
      ))}
    </div>
  ),
};

/** Specimens: an emblem plate beside a card whose metadata sits beneath the frame. */
export const Plates: Story = {
  render: () => (
    <div className="grid w-[min(44rem,90vw)] items-start gap-6 p-6 sm:grid-cols-[12rem_1fr]">
      <Plate caption="Lotus" note="Nelumbo nucifera.">
        <Motif className="mx-auto block aspect-square w-4/5" motion="none" viewBox="0 0 256 256">
          <Lotus />
        </Motif>
      </Plate>
      <Card caption="Python · Lean 4 · LaTeX">
        <h3 className="font-serif text-2xl">A specimen card</h3>
        <p className="mt-3 text-muted-foreground">
          The frame holds the argument; the label beneath it holds the metadata.
        </p>
        <div className="mt-5 flex gap-2">
          <Badge>2024</Badge>
          <Badge>Preprint</Badge>
        </div>
      </Card>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="w-[min(56rem,90vw)] space-y-4 p-6">
      <p className="label-lg">Label large</p>
      <p className="label-md">Label medium</p>
      <p className="label-sm">Label small</p>
      <p className="font-serif text-display-xl">Display extra large</p>
      <p className="font-serif text-display-lg">Display large</p>
      <p className="font-serif text-headline-lg">Headline large</p>
      <p className="font-serif text-headline-md">Headline medium</p>
      <p className="font-serif text-headline-sm">Headline small</p>
      <p className="metric-lg">1,024</p>
    </div>
  ),
};
