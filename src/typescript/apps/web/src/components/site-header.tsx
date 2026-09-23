import Link from "next/link";

const navigation = [
  ["About", "/about/"],
  ["Research", "/research/"],
  ["Projects", "/projects/"],
  ["Writing", "/writing/"],
  ["CV", "/cv/"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90">
      <div className="page-shell flex min-h-18 items-center justify-between gap-6 py-4">
        <Link className="font-serif text-lg font-medium no-underline" href="/">
          Marcus Gawronsky
        </Link>
        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max list-none items-center gap-5 p-0 font-mono text-[0.7rem] uppercase tracking-[0.11em] text-muted-foreground">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <Link className="transition-colors hover:text-foreground" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
