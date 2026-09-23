import type { ComponentPropsWithoutRef } from "react";

export function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`label-sm inline-flex items-center rounded-none bg-primary px-2 py-1 text-primary-foreground ${className}`}
      {...props}
    />
  );
}
