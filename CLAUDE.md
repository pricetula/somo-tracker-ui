# CLAUDE.md (Root)

## Monorepo Overview

This repository is a pnpm workspace with two applications:

- `apps/web` → Main product application (Next.js App Router)
- `apps/public` → Marketing website (SvelteKit)

Each app has its own CLAUDE.md with scoped architectural rules.

---

## Package Manager

- Use **pnpm only**
- Workspace config: `pnpm-workspace.yaml`
- Do NOT use npm or yarn
- Avoid duplicating dependency versions unnecessarily

---

## App Boundaries (Very Important)

- Do NOT cross-import between `apps/web` and `apps/public`
- Treat each app as an isolated deployable unit
- Shared logic must live in a proper shared package (if introduced later)

---

## CI / GitHub Actions Expectations

- Changes must respect the nearest CLAUDE.md
- Do not introduce new architectural patterns without justification
- Do not refactor across app boundaries

---

## Mental Model

- Root → Workspace management only
- apps/web → Product logic (strict rules defined there)
- apps/public → Marketing site (minimal + isolated)

Nothing in this file overrides app-level CLAUDE.md rules.
