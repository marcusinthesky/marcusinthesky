import { ArrowUpRight } from "lucide-react";

/** An outbound arrow that nudges up and right while its card (`group`) is hovered. */
export function NudgeArrow({ size = 14 }: { size?: number }) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      size={size}
    />
  );
}
