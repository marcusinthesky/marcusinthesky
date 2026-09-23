import { profile } from "@marcusinthesky/content";

import { BrandIcon } from "@/components/brand-icon";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-10">
      <div className="page-shell flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg text-foreground">Marcus Gawronsky</p>
          <p className="mt-1">Cape Town · Research, data, and reliable software.</p>
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
