set shell := ["bash", "-uc"]

default:
    @just --list

setup:
    cd src/typescript && bun install --frozen-lockfile

dev:
    cd src/typescript && bun run dev

build: cv-build
    cd src/typescript && bun run build

cv-build:
    mkdir -p src/latex/cv/build src/typescript/apps/web/public/cv
    cd src/latex/cv && XDG_CACHE_HOME="$PWD/../../../.devenv/cache" tectonic --outdir build resume.tex
    cp src/latex/cv/build/resume.pdf src/typescript/apps/web/public/cv/Marcus-Gawronsky-CV.pdf

cv-check: cv-build
    tex-fmt --check src/latex/cv/resume.tex src/latex/cv/sections/*.tex
    chktex -q -n 1 -n 8 -n 46 src/latex/cv/resume.tex
    if rg -i '([[:alnum:]._%+-]+@[[:alnum:].-]+\.[A-Za-z]{2,}|\\mobile|professional references|\\import\{\\sectiondir\}\{references)' src/latex/cv --glob '*.tex'; then echo 'Public CV source privacy check failed' >&2; exit 1; fi
    pdftotext src/latex/cv/build/resume.pdf - | if rg -i '(professional references|references|[[:alnum:]._%+-]+@[[:alnum:].-]+\.[A-Za-z]{2,}|\+27|0[678][0-9][ -]?[0-9]{3})'; then echo 'Public CV privacy check failed' >&2; exit 1; fi

check: cv-check
    cd src/typescript && bun run check
    prek run --all-files
