# CLAUDE.md — Project Guidelines & Conventions

## 🚀 Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Data Fetching:** TanStack Query v5+ (Using Server Actions as `queryFn`)
- **Validation:** Zod (Single source of truth for Schema + Types)
- **Styling:** Tailwind CSS + Shadcn UI (Primitives)
- **State:** Zustand (Global UI), URL Search Params (Search/Filter/Pagination)
- **Forms:** React Hook Form + @hookform/resolvers/zod

---

## 📂 Folder Structure (Feature-Driven)
All domain-specific logic must live in `src/features/`. Global/generic items live in `src/components/`.

src/
├── app/              # Routes & Server Layouts
├── components/       # Shared UI Tiering
│   ├── ui/           # Raw Shadcn primitives (Button, Input)
│   └── shared/       # Cross-feature components (DataTable, PageHeader)
├── features/         # Domain-specific modules
│   └── [feature-name]/
│       ├── api/      # TanStack Query hooks + Server Actions (actions.ts)
│       ├── components/ # Feature-specific UI
│       └── types/    # Zod schemas (schema.ts) + inferred types
├── hooks/            # Generic shared hooks (use-local-storage, etc.)
├── lib/              # Shared clients (db.ts, query-client.ts)
└── store/            # Zustand stores for global UI state

## 🛠️ Code Conventions

### 1. Naming & Style

- **Files/Folders:** `kebab-case.ts` (e.g., `user-profile-card.tsx`)
- **Components:** PascalCase (e.g., `UserProfileCard`)
- **Exports:** Use Named Exports strictly (no default export)
- **Server Actions:** Define in `actions.ts` within a feature folder. Mark with `'use server'`

---

### 2. Component Tiering

- **Tier 1 (UI):** `src/components/ui/` — Shadcn primitives. No business logic/hooks.
- **Tier 2 (Shared):** `src/components/shared/` — Reusable blocks.
- **Tier 3 (Feature):** `src/features/[feature]/components/` — Domain-aware components using hooks.

---

### 3. Data Fetching & Mutations

- **Queries:** Prefer `useSuspenseQuery` for automatic integration with Next.js Suspense.
- **Actions as Fetchers:** TanStack Query `queryFn` must call a Server Action directly.
- **Validation:** Every Server Action must validate inputs using a Zod Schema.

---

### 4. Form Strategy

- **Library:** `react-hook-form` + `zodResolver`.
- **Validation:** Use the same Zod schema for both client-side form validation and server-side action validation.
- **Server Errors:** Catch action failures in TanStack `onError` and map to fields using `form.setError('field', { message })`.

---

### 5. Auth & Cookies
- **Cookie Mutations:** Setting or deleting cookies MUST happen inside a Server Action triggered from a Client Component (e.g., `useEffect` or form submission) or a Route Handler.
- **Rendering Restriction:** Never call a Server Action that modifies cookies directly within the body of a Server Component during render.
- **Auth Flow:** Always use a 'use client' intermediary page for auth callbacks (like `/authenticate`) to safely trigger cookie-setting actions via `useEffect`.

---

## 📋 Best Practices

- **Hydration:** Prefetch data in Server Components using `prefetchQuery` and wrap Client Components in `<HydrationBoundary>`.
- **Zod Inference:** Always use `z.infer<typeof schema>` to generate TypeScript types.
- **URL State:** Use URL Search Params for any UI state that should be shareable (filters, pagination, tabs).
- **Theming:** Use CSS variables (e.g., `bg-primary`, `text-muted-foreground`) exclusively. No hex codes.