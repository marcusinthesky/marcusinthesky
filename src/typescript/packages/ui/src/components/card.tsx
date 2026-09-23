import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={`rounded-md border border-border bg-surface p-6 shadow-[0_18px_60px_-48px_color-mix(in_oklab,var(--foreground)_55%,transparent)] backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
