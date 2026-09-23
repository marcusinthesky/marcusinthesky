import { ButtonLink } from "@marcusinthesky/ui";

export default function NotFound() {
  return (
    <div className="page-shell py-28">
      <p className="font-sans text-xs uppercase tracking-[0.16em] text-primary">404</p>
      <h1 className="mt-5 font-serif text-6xl">That page is not part of the graph.</h1>
      <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
        The link may be stale, or the material may still live at its original publisher.
      </p>
      <ButtonLink className="mt-8" href="/">
        Return home
      </ButtonLink>
    </div>
  );
}
