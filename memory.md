# Memory

This file serves as the primary source of truth for persistent context and decisions across sessions.

## Project Details
- **Workspace Name:** SorawitSakarin/let-me-help-you
- **User:** Sorawit

## Context & Status
- **Current Active Branch:** `dev`
- **Total Open PRs:** 0 (PR #224 and PR #226 successfully reviewed, enhanced, verified, and merged on 2026-05-25)
- **Main Branch Status:** Fully merged and synchronized with `dev` (last merged on 2026-05-25)

## Automated Pipelines
- **Daily PR Reviewer (GitHub Actions):** Hosted via a scheduled GitHub workflow (`.github/workflows/daily-pr-reviewer.yml`) running daily at **9:00 AM Bangkok Time** (`0 2 * * *` UTC).
  - Conducts automated senior frontend code reviews.
  - Resolves redundancies and enhances code quality/content.
  - Automatically runs verification checks (`npm run test`, `npm run build`, `npm run lint`).
  - Merges verified pull requests into the `dev` branch and fast-forward synchronizes them into `main`.

## Refactoring History
- **README & SEO Refactoring (2026-05-25):**
  - **README.md Cleanup:** Re-indexed all 27 features correctly (resolved duplicate indices), added descriptions/details for missing utilities (Unit Converter, Currency Exchange, Hacker Screen, Daily Knowledge), and fixed all structural file paths to match actual project layouts.
  - **SEO optimization (`src/utils/seo.ts`):** Removed syntax errors/ignored duplicate floating string declarations for `SITE_DESCRIPTION` and synthesized a cohesive 152-character description. Deduplicated and clean-formatted the `SEO_KEYWORDS` array.
  - **Sitemap Refactoring (`src/app/sitemap.ts`):** Transitioned sitemap generation from hardcoded routes to a fully dynamic mapping over the main `TOOLS` array in `src/data/feature.ts`, ensuring automated search engine indexing for all 27 current and future utilities.

