import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  /** A museum-label line (source, date, stack) set beneath the frame, outside it. */
  caption?: ReactNode;
};

const frame =
  "group relative rounded-none border border-border bg-card p-6 text-card-foreground transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-foreground hover:border-t-chapter focus-within:border-foreground focus-within:border-t-chapter";

export function Card({ caption, children, className = "", ...props }: CardProps) {
  if (caption === undefined) {
    return (
      <article className={`${frame} ${className}`} {...props}>
        {children}
      </article>
    );
  }
  return (
    <article className={`flex flex-col ${className}`} {...props}>
      <div className={`${frame} flex flex-1 flex-col`}>{children}</div>
      <p className="mt-3 label-sm text-muted-foreground">{caption}</p>
    </article>
  );
}
