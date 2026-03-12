# SomoTracker UI

**SomoTracker** is a modern academic progression platform. This monorepo contains two frontend applications managed with [pnpm workspaces](https://pnpm.io/workspaces).

| App      | Path          | Framework            | Purpose                         |
| -------- | ------------- | -------------------- | ------------------------------- |
| `web`    | `apps/web`    | Next.js (App Router) | Authenticated product dashboard |
| `public` | `apps/public` | SvelteKit            | Marketing website               |

---

## Project Structure

```
somo-tracker-ui/
├── apps/
│   ├── web/          # Next.js product app
│   └── public/       # SvelteKit marketing site
├── pnpm-workspace.yaml
└── package.json
```

---

## Getting Started

**Prerequisites:** Node >= 18, pnpm >= 10

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Run both apps
pnpm dev:web
pnpm dev:public
```

### Build

```bash
pnpm build:web
pnpm build:public
```

### Other

```bash
pnpm lint       # Lint all apps
pnpm test       # Test all apps
pnpm format     # Format all files
```

---

## Apps

### apps/web — Product Dashboard

Next.js 16 App Router app for authenticated users. Feature-driven architecture.

**Stack:** Next.js · React 19 · TanStack Query v5 · Zustand · React Hook Form · Zod · Tailwind CSS · Shadcn

**Structure:**

```
src/
├── app/
│   ├── (auth)/              # Unauthenticated routes
│   └── (authenticated)/     # Protected routes
├── features/{domain}/
│   ├── types/               # Type aliases from OpenAPI schema
│   ├── api/actions.ts       # Server Actions
│   ├── api/use-{feature}.ts # Query hooks
│   └── api/use-{feature}-mutations.ts
├── components/
│   ├── ui/                  # Shadcn primitives
│   └── shared/              # Cross-feature components
├── lib/                     # api-client, query-client, utils
└── store/                   # Zustand global UI state
```

**Sync API types from backend:**

```bash
pnpm --filter web types:sync
```

---

### apps/public — Marketing Site

SvelteKit marketing site. Minimal and isolated from the product app.

**Stack:** SvelteKit 2 · Svelte 5 · Tailwind CSS · Bits UI

**Structure:**

```
src/
├── routes/          # File-based routing
└── lib/
    └── components/  # Reusable UI components
```

---

## Package Manager

This repo uses **pnpm only**. Do not use npm or yarn.

```bash
# Run a command in a specific app
pnpm --filter web <command>
pnpm --filter public <command>
```

---

## App Boundaries

`apps/web` and `apps/public` are isolated — do not cross-import between them. Any shared logic must live in a dedicated package under `packages/`.
