import type { ReactNode } from "react";

type PlateProps = {
  /** The specimen's name, set in spaced capitals beneath the frame. */
  caption: string;
  /** A short line under the name: what the specimen shows or where it comes from. */
  note?: string;
  className?: string;
  children: ReactNode;
};

/** A framed specimen with a museum-label caption beneath the frame, never inside it. */
export function Plate({ caption, children, className = "", note }: PlateProps) {
  return (
    <figure className={`m-0 flex flex-col ${className}`}>
      {/* Grows when the plate is stretched (e.g. in a tile row), keeping the specimen centred. */}
      <div className="flex flex-1 flex-col justify-center border border-border bg-card p-5">
        {children}
      </div>
      <figcaption className="mt-3 text-center">
        <span className="block label-sm text-foreground">{caption}</span>
        {note ? (
          <span className="mt-1 block font-serif text-sm text-muted-foreground italic">{note}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
