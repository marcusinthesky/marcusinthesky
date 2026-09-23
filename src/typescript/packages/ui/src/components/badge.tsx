import type { ComponentPropsWithoutRef } from "react";

/** A compact metadata chip: silver paper, hairline, square (DESIGN.md › Chips). */
export function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`label-sm inline-flex min-h-7 items-center rounded-sm border border-border bg-muted px-2 text-foreground ${className}`}
      {...props}
    />
  );
}
