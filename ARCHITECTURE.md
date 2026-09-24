# Architecture

## Boundaries

The repository has one deployable application and two reusable TypeScript packages. `ui` owns visual semantics and contains no profile data. `content` owns public facts and contains no Next.js routing. The web app combines them and owns SEO, feeds, JSON-LD, and deployment concerns.

The public CV deliberately remains LaTeX-first. Its HTML representation is a curated projection because parsing template-specific LaTeX into a durable web schema would create more fragile tooling than it removes. Reviewers update the typed projection and LaTeX source together.

## Tool responsibilities

| Tool | Responsibility |
| --- | --- |
| devenv | Pinned system and language tools |
| just | Human-facing commands |
| Bun | JavaScript runtime and package manager |
| Turbo | TypeScript workspace task graph |
| prek | Repository-wide Git quality gates |
| Next.js | Static HTML application and metadata |
| Fumadocs MDX | Typed future local writing collections |
| Tectonic | Reproducible public CV PDF |

## Performance model

Remote services are publishing inputs, not page-load dependencies. All routes export as files, two self-hosted variable font families (Fraunces, Inter) are served from the export via `next/font` with no third-party font requests, content pages contain no authored client JavaScript, and optional heavy capabilities such as browser Python, TTS, search, and video platforms are deferred until real content requires them.

## Publishing topology

This repository is the only source for the portfolio. Its `README.md` is the GitHub profile, not project documentation, because the repository name matches the account.

GitHub serves `https://marcusinthesky.github.io/` only from the `marcusinthesky/marcusinthesky.github.io` repository. That repository holds nothing but the published output on its `gh-pages` branch. The `Quality` workflow runs every gate against the static export and then, on `main` only, its `deploy` job pushes that same export there. Pull requests never publish.

The site is served from the root of the user site, so it has no `basePath` and root-relative URLs are correct as written. This repository must not publish its own Pages site. A project site at `/marcusinthesky/` would load the root site's assets and render unstyled. `audit:export` rejects a base path, a Pages deployment workflow, or a second publisher, and it resolves every exported link, asset, canonical URL, and feed entry against the root.
