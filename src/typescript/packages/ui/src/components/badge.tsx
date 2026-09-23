import type { ComponentPropsWithoutRef } from "react";

export function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border bg-card px-2.5 py-1 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground ${className}`}
      {...props}
    />
  );
}
