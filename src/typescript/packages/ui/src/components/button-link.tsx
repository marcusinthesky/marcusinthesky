import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "text";
  arrow?: boolean;
};

const variants = {
  primary:
    "min-h-11 border border-foreground bg-foreground px-5 py-2 text-background hover:bg-foreground/90",
  secondary:
    "min-h-11 border border-foreground bg-transparent px-5 py-2 text-foreground hover:bg-muted",
  text: "min-h-11 py-2 text-foreground underline decoration-1 underline-offset-[0.35em] hover:decoration-2",
};

export function ButtonLink({
  arrow = false,
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const framed = variant !== "text";
  return (
    <a
      className={`group/button label-md relative inline-flex items-center justify-center gap-2 rounded-none transition-colors duration-300 ${framed ? "no-underline" : ""} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* The chapter thread takes the bottom edge on hover and keyboard focus. */}
      {framed ? (
        <span
          aria-hidden="true"
          className="absolute -inset-x-px -bottom-px h-0.5 origin-left scale-x-0 bg-chapter transition-transform duration-300 ease-out-expo group-hover/button:scale-x-100 group-focus-visible/button:scale-x-100"
          data-part="thread"
        />
      ) : null}
      {children}
      {arrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover/button:translate-x-[3px]"
        >
          →
        </span>
      ) : null}
    </a>
  );
}
