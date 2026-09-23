import { ButtonLink, HeritageMark } from "@marcusinthesky/ui";

export default function NotFound() {
  return (
    <div className="page-shell py-28">
      <p className="label-md text-primary">404</p>
      <div className="mt-5 flex items-center gap-5">
        <HeritageMark motif="rook" motion="reveal" size="lg" />
        <h1 className="font-serif text-display-lg">That page is not part of the graph.</h1>
      </div>
      <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
        The link may be stale, or the material may still live at its original publisher.
      </p>
      <ButtonLink className="mt-8" href="/">
        Return home
      </ButtonLink>
    </div>
  );
}
