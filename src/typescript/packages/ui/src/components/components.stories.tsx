import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, ButtonLink, Card, SectionHeading } from "../index";

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
        title="Ideas that survive contact with production"
        description="A small semantic layer designed for long-form research and engineering work."
      />
      <Card>
        <Badge>Case study</Badge>
        <h3 className="mt-5 font-serif text-2xl">Pricing Perspective</h3>
        <p className="mt-3 text-muted-foreground">
          Reproducible quantitative research across software, evidence, and formal claims.
        </p>
        <ButtonLink className="mt-6" href="#example">
          Read the case study
        </ButtonLink>
      </Card>
    </div>
  ),
};
