import { Menu, X } from "lucide-react";
import { HeritageMark } from "@marcusinthesky/ui";
import Link from "next/link";

// Each section carries its chapter colour. Pages declare the section they belong
// to with data-nav, and site-header.css draws that item's thread (keep in step).
const navigation = [
  { label: "About", href: "/about/", section: "about", chapter: "palm" },
  {
    label: "Research",
    href: "/research/",
    section: "research",
    chapter: "lotus",
  },
  {
    label: "Projects",
    href: "/projects/",
    section: "projects",
    chapter: "ink",
  },
  { label: "Writing", href: "/blog/", section: "writing", chapter: "rose" },
  { label: "CV", href: "/cv/", section: "cv", chapter: "ink" },
] as const;

// The mobile menu uses the native Popover API: no JavaScript, light dismiss,
// Escape to close, and focus handling from the browser.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="page-shell flex min-h-16 items-center justify-between gap-6">
        <Link
          className="flex shrink-0 items-center gap-2.5 font-serif text-sm font-medium uppercase tracking-[0.2em] no-underline"
          href="/"
        >
          <HeritageMark motif="rook" size="sm" tone="ink" />
          Marcus Gawronsky
        </Link>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-border lg:block" />
        {/* The compass star closes the rule where navigation begins. */}
        <span aria-hidden="true" className="-mx-2 hidden lg:flex">
          <HeritageMark motif="star" motion="reveal" size="sm" tone="ink" />
        </span>
        <nav aria-label="Primary" className="hidden sm:block" data-site-nav="primary">
          <ul className="flex list-none items-center p-0 label-sm">
            {navigation.map(({ chapter, href, label, section }) => (
              <li
                className="flex items-center"
                data-chapter={chapter}
                data-nav={section}
                key={href}
              >
                <Link className="relative flex min-h-16 items-center no-underline" href={href}>
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-chapter"
                    data-part="thread"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          aria-label="Open menu"
          className="-mr-2.5 inline-flex size-11 items-center justify-center sm:hidden"
          popoverTarget="site-menu"
          type="button"
        >
          <Menu aria-hidden="true" size={22} />
        </button>
      </div>

      <div
        className="fixed inset-0 m-0 h-dvh w-full max-w-none bg-background p-0 text-foreground opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out-expo -translate-y-3 open:translate-y-0 open:opacity-100 starting:open:-translate-y-3 starting:open:opacity-0"
        id="site-menu"
        popover="auto"
      >
        <div className="page-shell flex min-h-16 items-center justify-between border-b border-border">
          <span className="flex items-center gap-2.5 font-serif text-sm font-medium uppercase tracking-[0.2em]">
            <HeritageMark motif="rook" size="sm" tone="ink" />
            Marcus Gawronsky
          </span>
          <button
            aria-label="Close menu"
            className="-mr-2.5 inline-flex size-11 items-center justify-center"
            popoverTarget="site-menu"
            popoverTargetAction="hide"
            type="button"
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <nav aria-label="Menu" className="page-shell" data-site-nav="menu">
          <ul className="list-none p-0">
            {navigation.map(({ chapter, href, label, section }) => (
              <li
                className="relative border-b border-border"
                data-chapter={chapter}
                data-nav={section}
                key={href}
              >
                <Link
                  className="flex min-h-16 items-center font-serif text-4xl tracking-[-0.03em] no-underline"
                  href={href}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 h-0.5 w-12 bg-chapter"
                    data-part="thread"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
