import { HeritageMark, type HeritageMotif } from "../heritage/heritage-mark";

export type TimelineItem = {
  period: string;
  title: string;
  meta?: string;
  body?: string;
  motif?: HeritageMotif;
};

type TimelineProps = {
  items: readonly TimelineItem[];
  className?: string;
};

/** A stepped vertical timeline: a hairline that draws down on scroll, with motif markers. */
export function Timeline({ className, items }: TimelineProps) {
  return (
    <div className={`relative${className ? ` ${className}` : ""}`}>
      <span aria-hidden className="motif-draw-down absolute inset-y-0 left-3 w-px bg-border" />
      <ol className="relative space-y-10">
        {items.map((item) => (
          <li
            className="relative grid grid-cols-[1.5rem_1fr] gap-x-5"
            key={`${item.period}-${item.title}`}
          >
            <span className="relative flex size-6 items-center justify-center bg-background">
              {item.motif ? (
                <HeritageMark motif={item.motif} motion="scroll" size="md" />
              ) : (
                <span aria-hidden className="size-2 bg-foreground" />
              )}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-1 font-serif text-xl font-medium">{item.title}</h3>
              {item.meta ? <p className="text-sm text-muted-foreground">{item.meta}</p> : null}
              {item.body ? <p className="mt-2">{item.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
