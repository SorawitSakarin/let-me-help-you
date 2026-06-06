# Memory

This file serves as the primary source of truth for persistent context and decisions across sessions.

## Project Details
- **Workspace Name:** SorawitSakarin/let-me-help-you
- **User:** Sorawit

## Context & Status
- **Current Active Branch:** `dev`
- **Total Open PRs:** 3 (PR #224, PR #227, and PR #232 are currently open)
- **Main Branch Status:** Fully merged and synchronized with `dev` (last merged on 2026-05-26)

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
- **`updatedAt` Schema & NEW Badge Implementation (2026-05-25):**
  - **Tools Schema Extension (`src/data/feature.ts`):** Introduced an optional `updatedAt` date property to tool objects.
  - **Dynamic "NEW" Badges (`src/components/ToolsGrid.tsx`):** Designed and integrated a custom pixel-art **NEW** badge matching the retro theme. Elements are calculated relative to the client's current time with safety logic to avoid SSR hydration mismatches.
  - **Sitemap Dynamic Dates (`src/app/sitemap.ts`):** Directly linked sitemap generation's `lastModified` metadata to each tool's `updatedAt` for enhanced SEO crawling.
- **Retro Speed Typer Feature (2026-06-06):**
  - **Feature Page (`src/app/test-typing-speed/page.tsx`):** Created the Retro Speed Typer typing game/test featuring configurable durations, modes (code snippets, game quotes, pangrams), interactive stats calculation (WPM, Accuracy), sound effects synthesis via Web Audio, and local high scores storage.
  - **Card Registration (`src/data/feature.ts`):** Registered the tool card under "Developer Tools" with an up-to-date timestamp (`2026-06-06`) to trigger the pixelated "NEW" badge.
  - **SEO Keywords Addition (`src/utils/seo.ts`):** Integrated 6 new typing-related keywords to boost index rankings.
  - **README Update (`README.md`):** Updated features list with the 30th feature description and added structural route details.
  - **Page Unit Tests (`src/app/test-typing-speed/page.test.tsx`):** Implemented clean RTL/Jest tests mocking browser Web Audio context and localstorage API.
- **Text Diff Viewer Feature (2026-06-07):**
  - **Feature Page (`src/app/compare-text/page.tsx`):** Created the Text Diff Viewer client-side tool implementing an LCS dynamic programming line diff algorithm, side-by-side split view, inline unified view, file upload, preset templates, case/whitespace ignoring options, and standard patch-diff copying.
  - **Card Registration (`src/data/feature.ts`):** Registered the tool card under "Developer Tools" with date `2026-06-07` to trigger the pixelated "NEW" badge.
  - **SEO Keywords Addition (`src/utils/seo.ts`):** Integrated 6 new diff/compare related keywords.
  - **README Update (`README.md`):** Documented the 41st feature and added its path to the project structure section.
- **Timezone & Sitemap Timestamp Fix (2026-06-07):**
  - **Tools Grid Badge Logic Fix (`src/components/ToolsGrid.tsx`):** Refactored `isNew` helper to compare date values using midnight of the local calendar day instead of UTC, solving timezone-offset negative diff bugs that blocked new same-day release badges.
  - **Sitemap Date Fix (`src/app/sitemap.ts`):** Assigned a static timestamp of last month (May 7, 2026) for the `share-daily-knowledge` feature which lacks a db registry entry.

