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
