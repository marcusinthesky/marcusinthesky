import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  className = "",
  style,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? "border-primary bg-primary text-[oklch(0.99_0.005_80)] hover:opacity-90"
      : "border-border bg-surface text-foreground hover:border-accent";

  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] no-underline transition-[border-color,opacity] ${variantClass} ${className}`}
      style={variant === "primary" ? { color: "#fff", ...style } : style}
      {...props}
    />
  );
}
