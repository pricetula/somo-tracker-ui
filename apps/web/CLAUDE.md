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
│   ├── (auth)/       # Unauthenticated routes (login, authenticate, logout)
│   └── (authenticated)/ # Protected routes; auth guard lives in layout
├── components/       # Shared UI Tiering
│   ├── ui/           # Raw Shadcn primitives (Button, Input)
│   └── shared/       # Cross-feature components + TanStack Query provider
├── features/         # Domain-specific modules
│   └── [feature-name]/
│       ├── api/      # TanStack Query hooks + Server Actions (actions.ts)
│       ├── components/ # Feature-specific UI
│       └── types/    # Zod schemas (schema.ts) + inferred types
├── lib/              # Shared clients (api-client.ts, get-query-client.ts, utils.ts)
├── store/            # Zustand stores for global UI state
├── types/            # Global shared types (e.g. ActionResult<T>)
└── proxy.ts          # Middleware logic (imported by Next.js middleware.ts at root)

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
- **Return type:** Server Actions return `ActionResult<T>` (defined in `src/types/action-result.ts`) for consistent success/error handling.
- **Query metadata:** Export a `*Meta` object (e.g., `meMeta`) alongside each hook to allow RSC prefetching via `getQueryClient().fetchQuery(meMeta)`.
- **API Client:** Use `src/lib/api-client.ts` for all authenticated backend calls. It automatically injects the `session_token` cookie as `Authorization: Bearer` and handles 401s.

---

### 4. Form Strategy

- **Library:** `react-hook-form` + `zodResolver`.
- **Validation:** Use the same Zod schema for both client-side form validation and server-side action validation.
- **Server Errors:** Catch action failures in TanStack `onError` and map to fields using `form.setError('field', { message })`.

---

### 5. Auth & Cookies
- **Cookie Mutations:** Setting or deleting cookies MUST happen inside a Server Action triggered from a Client Component (e.g., `useEffect` or form submission) or a Route Handler.
- **Rendering Restriction:** Never call a Server Action that modifies cookies directly within the body of a Server Component during render.
- **Auth Flow:** Always use a `'use client'` intermediary page for auth callbacks (like `/authenticate`) to safely trigger cookie-setting actions via `useEffect`.
- **Auth Guard:** The `(authenticated)` route group layout uses a Server Component (`auth-guard.tsx`) that prefetches user data, redirects unauthenticated users to `/login`, and redirects users without `school_id` to `/onboarding`.
- **Logout:** The `/logout` page is a `'use client'` component that calls the `logout()` Server Action in a `useEffect` to delete the session cookie, then redirects.
- **Middleware:** Route protection logic lives in `src/proxy.ts`. It redirects unauthenticated requests to `/login`, prevents authenticated users from accessing `/login` or `/authenticate`, and injects `x-current-path` header for server components.

---

## 📋 Best Practices

- **Hydration:** Prefetch data in Server Components using `getQueryClient().fetchQuery(featureMeta)` and wrap Client Components in `<HydrationBoundary dehydratedState={dehydrate(queryClient)}>`.
- **Zod Inference:** Always use `z.infer<typeof schema>` to generate TypeScript types. Avoid manually declaring interfaces for data shapes that can be schema-derived.
- **URL State:** Use URL Search Params for any UI state that should be shareable (filters, pagination, tabs).
- **Theming:** Use CSS variables (e.g., `bg-primary`, `text-muted-foreground`) exclusively. No hex codes.