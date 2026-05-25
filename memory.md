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
- **Daily PR Reviewer:** Scheduled a recurring daily cron task at **9:00 AM (09:00) local time** (`0 9 * * *`) that executes `node scripts/daily-pr-reviewer.js`.
  - Conducts senior frontend code reviews.
  - Resolves redundancies and enhances code quality/content.
  - Automatically runs quality checks (`npm run test`, `npm run build`, `npm run lint`).
  - Automatically pushes improvements to PR branches, merges to `dev`, and merges `dev` to `main`.
