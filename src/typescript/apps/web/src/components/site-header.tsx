import { Menu, X } from "lucide-react";
import Link from "next/link";

const navigation = [
  ["About", "/about/"],
  ["Research", "/research/"],
  ["Projects", "/projects/"],
  ["Blog", "/blog/"],
  ["CV", "/cv/"],
] as const;

// The mobile menu uses the native Popover API: no JavaScript, light dismiss,
// Escape to close, and focus handling from the browser.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="page-shell flex min-h-16 items-center justify-between gap-6">
        <Link className="font-serif text-lg font-medium no-underline" href="/">
          Marcus Gawronsky
        </Link>
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex list-none items-center gap-6 p-0 font-sans text-[0.7rem] uppercase tracking-[0.14em]">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <Link className="underline-draw py-2" href={href}>
                  {label}
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
          <span className="font-serif text-lg font-medium">Marcus Gawronsky</span>
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
        <nav aria-label="Menu" className="page-shell">
          <ul className="list-none p-0">
            {navigation.map(([label, href]) => (
              <li className="border-b border-border" key={href}>
                <Link
                  className="flex min-h-16 items-center font-serif text-4xl tracking-[-0.03em] no-underline"
                  href={href}
                >
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
