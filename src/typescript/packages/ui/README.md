# UI

Owned, server-compatible components and the replaceable visual-language layer. The package is configured for shadcn on Base UI, but v1 installs no headless behavior dependency because every launch component is presentational.

The design language is isolated in `src/styles/theme.css`, which uses the standard shadcn/ui variable names. To change the look, replace that file with any theme exported from [tweakcn](https://tweakcn.com) or [shadcn/ui themes](https://ui.shadcn.com/themes). Components only reference semantic tokens (`bg-card`, `text-primary`, `border-border`, …). Prose rhythm is isolated in `typeset.css`.
