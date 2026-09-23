import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={`group reveal relative rounded-md border border-border bg-card p-6 text-card-foreground transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-foreground ${className}`}
      {...props}
    />
  );
}
