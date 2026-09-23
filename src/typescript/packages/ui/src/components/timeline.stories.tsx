import type { Meta, StoryObj } from "@storybook/react-vite";

import { Timeline } from "../index";

const meta = {
  title: "System/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
  args: {
    items: [
      {
        period: "2020 – 2024",
        title: "Doctor of Philosophy",
        meta: "Example University",
        body: "A longer description of the work, to check wrapping across several lines of body text in the timeline.",
        motif: "lamp",
      },
      {
        period: "2018 – 2019",
        title: "Master of Science",
        meta: "Example University",
        motif: "book",
      },
      { period: "2014 – 2017", title: "Bachelor of Business Science", motif: "anchor" },
      { period: "2013", title: "An entry without a motif" },
    ],
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { items: [] } };
