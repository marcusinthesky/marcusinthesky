import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-foreground",
  secondary:
    "border-foreground bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground",
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center rounded-sm border px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] no-underline transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
