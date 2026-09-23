import { profile } from "@marcusinthesky/content";
import { HeritageMark, TableMountainLine } from "@marcusinthesky/ui";

import { BrandIcon } from "@/components/brand-icon";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-10">
      <div aria-hidden="true" className="page-shell flex items-end gap-4">
        <span className="mb-px h-px flex-1 bg-border" />
        <TableMountainLine className="w-56 sm:w-72" />
        <span className="mb-px h-px flex-1 bg-border" />
      </div>
      <div className="page-shell mt-8 flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2.5 font-serif text-sm font-medium uppercase tracking-[0.2em] text-foreground">
            <HeritageMark motif="rook" size="sm" tone="ink" />
            Marcus Gawronsky
          </p>
          <p className="mt-2 label-sm tabular-nums">Cape Town · 33.9° S 18.4° E</p>
          <p className="mt-4 font-serif text-sm italic text-muted-foreground">
            <span lang="la" title="Knowledge · Hope · Practice">
              Scientia · Spes · Praxis
            </span>
            <span className="sr-only"> (knowledge, hope, practice)</span>
          </p>
        </div>
        <nav aria-label="External profiles">
          <ul className="flex list-none flex-wrap gap-1 p-0">
            {profile.links.map((link) => (
              <li key={link.url}>
                <a
                  aria-label={link.label}
                  className="inline-flex size-11 items-center justify-center text-muted-foreground transition-[color,translate] duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-foreground"
                  href={link.url}
                  rel="me noreferrer"
                  title={link.label}
                >
                  <BrandIcon className="size-5" label={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
