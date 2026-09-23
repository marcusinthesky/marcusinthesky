import type { ReactNode } from "react";

type Appearance = { name: string; href: string; mark: ReactNode };

const logo = "h-auto w-[clamp(6.75rem,10vw,9.5rem)] grayscale";

const appearances: Appearance[] = [
  {
    name: "World Finance & Banking Symposium",
    href: "https://www.world-finance-conference.com/conference.php?id=34",
    // The symposium publishes no logo of its own; set in the WFC wordmark style.
    mark: (
      <span className="font-sans text-[0.7rem] leading-tight font-medium tracking-[0.04em] uppercase">
        World Finance &amp;
        <br />
        Banking
        <br />
        Symposium
      </span>
    ),
  },
  {
    name: "World Finance Conference",
    href: "https://www.world-finance-conference.com/",
    mark: (
      <img
        alt=""
        className={logo}
        height={59}
        src="/logos/world-finance-conference.png"
        width={150}
      />
    ),
  },
  {
    name: "arXiv",
    href: "https://arxiv.org/search/?query=Gawronsky%2C+Marcus&searchtype=author",
    mark: (
      <span className="font-serif text-[clamp(1.2rem,1.9vw,1.65rem)] tracking-[-0.07em]">
        arXiv
      </span>
    ),
  },
  {
    name: "SSRN",
    href: "https://www.ssrn.com/",
    mark: (
      <span className="font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-bold tracking-[0.06em]">
        SSRN
      </span>
    ),
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/marcusinthesky",
    mark: (
      <span className="font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-bold tracking-[-0.04em]">
        Hugging Face
      </span>
    ),
  },
  {
    name: "University of Cape Town",
    href: "https://www.uct.ac.za/",
    mark: (
      <img alt="" className={logo} height={53} src="/logos/uct-horizontal-black.svg" width={364} />
    ),
  },
];

/** A slow, edge-faded marquee of venues in one muted tone; pauses on hover, static under reduced motion. */
export function AppearingIn() {
  return (
    <section aria-labelledby="appearing-in-title" className="border-b border-border">
      <div className="page-shell grid items-center gap-4 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
        <h2
          className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          id="appearing-in-title"
        >
          As appearing in
        </h2>
        <div className="group overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
            {[false, true].map((duplicate) => (
              <ul
                aria-hidden={duplicate || undefined}
                className={`flex shrink-0 list-none items-center gap-12 p-0 pr-12 ${duplicate ? "motion-reduce:hidden" : "motion-reduce:flex-wrap"}`}
                key={String(duplicate)}
              >
                {appearances.map(({ href, mark, name }) => (
                  <li key={name}>
                    <a
                      aria-label={name}
                      className="inline-flex min-h-14 items-center text-muted-foreground transition-[color,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:text-foreground [&_img]:opacity-75 [&_img]:transition-opacity hover:[&_img]:opacity-100"
                      href={href}
                      rel="noreferrer"
                      tabIndex={duplicate ? -1 : undefined}
                      target="_blank"
                      title={name}
                    >
                      {mark}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
