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

## Conventions
- **Files:** kebab-case.ts, named exports only
- **Types:** Alias from OpenAPI schema (`src/types/api.ts`) in `features/[x]/types/index.ts`


## Feature Pattern
Standard structure (see existing features for examples):
1. `types/index.ts` — Type aliases from OpenAPI schema
2. `api/actions.ts` — Server Actions (validate, call apiClient, return ActionResult)
3. `api/use-[feature].ts` — Query hooks with *Meta exports for prefetching
4. `api/use-[feature]-mutations.ts` — Mutation hooks that invalidate queries

## Best Practices
- URL Search Params for shareable state (filters, pagination, tabs)
- Zod inference for types: `z.infer<typeof schema>`