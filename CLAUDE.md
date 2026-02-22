# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Overview

pnpm workspace monorepo with two apps:
- **`apps/web`** — Next.js 16+ (App Router) dashboard (primary app)
- **`apps/public`** — SvelteKit 2 public-facing marketing site

Package manager: **pnpm** (v10+). Node.js >= 18 required.

## Commands

Run from the workspace root:

```bash
pnpm dev:web       # Start Next.js dev server (localhost:3000)
pnpm dev:public    # Start SvelteKit dev server
pnpm build:web     # Build web app for production
pnpm build:public  # Build public app for production
pnpm lint          # Lint all packages
pnpm format        # Prettier format (.ts, .tsx, .js, .jsx, .json, .md)
```

Run from within `apps/web` or `apps/public`:

```bash
pnpm dev     # Start dev server for that app
pnpm build   # Build that app
pnpm lint    # Lint that app (web only, uses ESLint 9)
```

SvelteKit-specific (from `apps/public`):

```bash
pnpm check        # svelte-check type checking
pnpm check:watch  # Watch mode type checking
```

## Architecture

### `apps/web` (Next.js)

See `apps/web/CLAUDE.md` for detailed conventions. Key points:

- **Feature-driven structure:** all domain logic in `src/features/[feature-name]/` with sub-folders `api/`, `components/`, `types/`
- **Component tiering:** `src/components/ui/` (Shadcn primitives) → `src/components/shared/` (cross-feature) → `src/features/*/components/` (domain-aware)
- **Data flow:** Server Actions as TanStack Query `queryFn`; prefer `useSuspenseQuery`; prefetch in Server Components with `HydrationBoundary`
- **State:** TanStack Query for server state, Zustand for global UI state, nuqs for URL state (filters, pagination, tabs)
- **Forms:** React Hook Form + Zod resolver; same schema for client and server validation
- **Styling:** Tailwind CSS v4 + Shadcn UI; CSS variables only (e.g., `bg-primary`), no hardcoded hex values

### `apps/public` (SvelteKit)

- Standard SvelteKit file-based routing under `src/routes/`
- Components in `src/lib/components/`
- Tailwind CSS v4 via Vite plugin
- mdsvex for Markdown (`.svx` files)

## Key Conventions (web app)

- Files/folders: `kebab-case`; components: `PascalCase`; **named exports only** (no default exports)
- Server Actions defined in `features/[feature]/api/actions.ts`, marked `'use server'`
- Zod is the single source of truth — use `z.infer<typeof schema>` for all TypeScript types
- Every Server Action must validate inputs with a Zod schema
