# CLAUDE.md

## Stack
Next.js 16 App Router • TanStack Query v5 • Zod • Tailwind + Shadcn • Zustand • React Hook Form

## Structure
Feature-driven: `src/features/[name]/` contains api/, components/, types/
- `app/` — Routes with (auth) and (authenticated) groups
- `components/ui/` — Shadcn primitives
- `components/shared/` — Cross-feature UI
- `lib/` — Shared clients (api-client, query-client, utils)
- `store/` — Zustand stores for global UI state
- `proxy.ts` — Middleware logic (imported by root middleware.ts)

## Conventions
- **Files:** kebab-case.ts, named exports only
- **Server Actions:** In `actions.ts`, marked `'use server'`, return `ActionResult<T>`, validate with Zod
- **Queries:** Export `*Meta` objects for RSC prefetch, prefer useSuspenseQuery
- **Mutations:** Invalidate base queryKey on success
- **Forms:** react-hook-form + zodResolver, same Zod schema for client/server
- **Types:** Alias from OpenAPI schema (`src/types/api.ts`) in `features/[x]/types/index.ts`
- **API Calls:** Use `lib/api-client.ts` (auto-injects session_token, handles 401s)

## Auth
- Cookie mutations need Client Component trigger (useEffect/form submission)
- Auth guard: `(authenticated)/layout.tsx` redirects to /login or /onboarding
- Middleware: `src/proxy.ts` handles route protection and injects x-current-path header
- Logout: Client Component calls logout() action in useEffect

## Feature Pattern
Standard structure (see existing features for examples):
1. `types/index.ts` — Type aliases from OpenAPI schema
2. `api/actions.ts` — Server Actions (validate, call apiClient, return ActionResult)
3. `api/use-[feature].ts` — Query hooks with *Meta exports for prefetching
4. `api/use-[feature]-mutations.ts` — Mutation hooks that invalidate queries

## Best Practices
- Prefetch in RSC: `getQueryClient().fetchQuery(featureMeta)` + HydrationBoundary
- URL Search Params for shareable state (filters, pagination, tabs)
- CSS variables only (e.g., bg-primary, text-muted-foreground)
- Zod inference for types: `z.infer<typeof schema>`