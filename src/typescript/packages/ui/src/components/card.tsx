import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={`group relative rounded-none border border-border bg-card p-6 text-card-foreground transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-foreground hover:border-t-chapter focus-within:border-foreground focus-within:border-t-chapter ${className}`}
      {...props}
    />
  );
}
