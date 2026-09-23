import { profile } from "@marcusinthesky/content";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-10">
      <div className="page-shell flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg text-foreground">Marcus Gawronsky</p>
          <p className="mt-1">Cape Town · Research, data, and reliable software.</p>
        </div>
        <nav aria-label="External profiles">
          <ul className="flex list-none flex-wrap gap-4 p-0 font-mono text-xs uppercase tracking-[0.1em]">
            {profile.links.slice(0, 5).map((link) => (
              <li key={link.url}>
                <a href={link.url} rel="me noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
