import type { ComponentPropsWithoutRef } from "react";

export function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground ${className}`}
      {...props}
    />
  );
}
