# CLAUDE.md

## API reference

Use `src/types/api.ts` as reference for api requests and responses.

---

## Tech Stack

**Core:** Next.js 15+ App Router • React 19 • TypeScript 5+
**State:** TanStack Query v5 • Zustand • React Hook Form
**Validation:** Zod (Shared schemas for Client/Server)
**UI:** Tailwind CSS v4 • Shadcn/ui components

---

## Project Structure

```
src/
├── app/                      # Next.js App Router (params/searchParams are Promises)
│   ├── (auth)/              # Unauthenticated routes
│   ├── (authenticated)/     # Protected routes
│   └── api/                 # API route handlers
├── components/
│   ├── ui/                  # Shadcn primitives
│   └── shared/              # Cross-feature components
├── features/                # Feature-driven modules (Self-contained logic)
│   └── [feature-name]/
│       ├── api/
│       │   ├── actions.ts           # Server Actions (React 19 useActionState)
│       │   ├── use-[feature].ts     # TanStack Query hooks
│       │   └── use-[feature]-mutations.ts
│       ├── components/              # Feature-specific UI
│       ├── types/
│       │   └── index.ts            # Zod schemas + Type inference
│       └── utils/                   # Feature utilities
├── lib/
│   ├── api-client.ts        # Typed fetch wrapper (marked 'server-only')
│   ├── query-client.ts      # TanStack Query config
│   └── utils.ts             # Shared utilities (cn, formatting, etc.)
├── store/                   # Zustand global state
├── types/
│   └── api.ts              # OpenAPI-generated types
└── proxy.ts            # Auth & security middleware
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Files** | kebab-case | `user-profile.tsx` |
| **Components** | PascalCase | `UserProfile` |
| **Functions** | camelCase | `getUserData` |
| **Types/Interfaces** | PascalCase | `UserProfile` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| **Exports** | Named only (no default) | `export function UserProfile() {}` |

---

## React 19 & Next.js 15 Specifics

### Async Route Parameters
All `params` and `searchParams` in Next.js 15+ are **Promises**. Always await them:

**Pattern:**
- In page components: await both params and searchParams
- In layouts: await params
- In route handlers: access via request object

### React 19 useActionState Pattern
Replace `useFormState` with `useActionState` for Server Actions.

**Key Points:**
- Server Actions return `ActionState` type
- Client uses `useActionState(action, initialState)`
- Returns `[state, formAction, isPending]`
- Handle status in state: `{ status: 'success' | 'error' | 'idle', message?: string, data?: T }`

### Server-Only Code
Mark server-only utilities to prevent client bundling:
- Import `'server-only'` at top of file
- Prevents accidental client-side inclusion
- Use for database clients, API clients, secret handling

---

## Feature Module Pattern

### Directory Structure
```
features/auth/
├── api/
│   ├── actions.ts                    # Server Actions (React 19 patterns)
│   ├── use-auth.ts                   # Queries
│   └── use-auth-mutations.ts         # Mutations
├── components/
│   ├── login-form.tsx
│   └── register-form.tsx
├── types/
│   └── index.ts                      # Zod schemas + Type inference
└── utils/
    └── validators.ts
```

### File Responsibilities

**1. `types/index.ts`**
- Type aliases from OpenAPI schema (`@/types/api`)
- Zod validation schemas (shared between client/server)
- Use `z.infer<typeof schema>` for type inference
- Feature-specific enums and constants

**2. `api/actions.ts`**
- Server Actions marked with `'use server'`
- Use React 19 `useActionState` pattern (return `ActionState` type)
- Always validate input with Zod before processing
- Return structured state: `{ status: 'success' | 'error' | 'idle', message?: string, data?: T }`
- Handle all error types: Zod validation, API errors, unexpected errors

**3. `api/use-[feature].ts`**
- TanStack Query hooks using `useQuery`
- Export `queryOptions` for type-safe prefetching
- Export metadata as `*QueryMeta` for server-side prefetching
- Set appropriate `staleTime` based on data volatility

**4. `api/use-[feature]-mutations.ts`**
- TanStack Query mutation hooks using `useMutation`
- Invalidate related queries in `onSuccess`
- Implement optimistic updates where appropriate
- Handle error states and rollbacks

---

## Security Best Practices

### Input Validation
- ✅ Share Zod schemas between client and server validation
- ✅ Always validate with Zod in Server Actions before processing
- ✅ Sanitize user input (no innerHTML, use textContent)
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Validate file uploads (type, size, content)

### Authentication & Authorization
- ✅ Implement middleware for protected routes
- ✅ Use httpOnly cookies for tokens (never localStorage)
- ✅ Add CSRF protection for all mutations
- ✅ Validate tokens server-side on every request
- ✅ Implement role-based access control (RBAC)
- ✅ Use `middleware.ts` for route protection

### API Security
- ✅ Mark server-only code with `'server-only'` import
- ✅ Add CSRF token to all mutation requests
- ✅ Set `credentials: 'include'` for cookie-based auth
- ✅ Use proper HTTP methods (GET = read, POST = create, PUT/PATCH = update, DELETE = delete)
- ✅ Implement rate limiting on sensitive endpoints
- ✅ Return generic error messages to clients (log details server-side)
- ✅ Never expose stack traces or sensitive data in API responses

### Environment Variables
- ✅ Prefix public vars with `NEXT_PUBLIC_`
- ✅ Never expose secrets client-side
- ✅ Validate env vars at build time with Zod
- ✅ Use `.env.local` for local secrets (never commit)
- ✅ Use different env files per environment (.env.development, .env.production)

---

## Performance Best Practices

### Data Fetching
- ✅ Use URL search params for shareable state (filters, pagination, tabs)
- ✅ Prefetch on hover for critical navigation
- ✅ Implement optimistic updates for mutations
- ✅ Configure appropriate `staleTime` to reduce requests
- ✅ Use parallel queries with `Promise.all` or `useQueries`
- ✅ Leverage React 19 Suspense for streaming data

### Code Splitting
- ✅ Use `dynamic()` imports for heavy components
- ✅ Lazy load routes with `loading.tsx`
- ✅ Split vendor bundles strategically
- ✅ Use `ssr: false` for client-only components
- ✅ Implement route-based code splitting automatically via App Router

### Caching Strategy
- **Fast-changing data:** staleTime = 0-30s (live scores, stock prices)
- **Moderate data:** staleTime = 1-5min (user profiles, notifications)
- **Slow-changing data:** staleTime = 10-30min (settings, static content)
- **Immutable data:** staleTime = Infinity (historical records)

### Bundle Optimization
- ✅ Analyze bundle size regularly
- ✅ Use barrel exports sparingly (causes larger bundles)
- ✅ Import only what you need from libraries
- ✅ Consider lighter alternatives for heavy dependencies
- ✅ Use Tailwind CSS v4's improved tree-shaking

### React 19 Performance Features
- ✅ Use `use()` hook for unwrapping promises in components
- ✅ Leverage Suspense boundaries for better loading states
- ✅ Implement React Compiler optimizations when stable
- ✅ Use `startTransition` for non-urgent updates

---

## State Management Guidelines

### Decision Matrix

| State Type | Tool | Rationale |
|-----------|------|-----------|
| **Server state** | TanStack Query | Automatic caching, refetching, deduplication |
| **URL state** | Search params | Shareable, bookmarkable, SEO-friendly |
| **Global UI** | Zustand | Simple, fast, React-agnostic |
| **Form state** | React Hook Form + useActionState | Built-in validation, server action integration |
| **Local state** | useState | Simple, component-scoped |

### When NOT to Use State Management
- ❌ Don't store server data in Zustand (use TanStack Query)
- ❌ Don't store filters in useState (use URL search params)
- ❌ Don't store form data in global state (use React Hook Form)
- ❌ Don't duplicate data across multiple state systems

### Zustand Guidelines
- Use `persist` middleware for cross-session UI state
- Keep stores flat and focused (avoid nested objects)
- Use selectors to prevent unnecessary re-renders
- Combine related state in single store, separate unrelated concerns
- Keep store slices small and composable

---

## TypeScript Guidelines

### Strict Configuration Requirements
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Strategy
- **Prefer inference:** Let Zod and functions infer types (`z.infer<typeof schema>`)
- **Avoid duplication:** Alias from OpenAPI schema, don't redefine manually
- **Use utility types:** `Partial`, `Pick`, `Omit`, `Required` for transformations
- **Avoid `any`:** Use `unknown` and narrow with type guards
- **Share types:** Use same Zod schemas on client and server

### Common Patterns
- Use discriminated unions for API responses and action states
- Extract types from arrays: `type Item = Array<T>[number]`
- Use `as const` for literal type inference
- Prefer interfaces for objects, types for unions
- Use `satisfies` operator for type checking without widening

### React 19 Type Improvements
- Use built-in `use()` hook type inference
- Leverage improved `ref` type inference
- Use `useActionState` for type-safe form actions

---

## Error Handling Strategy

### Server Actions (React 19 Pattern)
- Parse with Zod first (catch `ZodError`)
- Return structured `ActionState`: `{ status: 'success' | 'error', message?: string, data?: T }`
- Handle expected API errors with specific messages
- Catch unexpected errors with generic user-facing message
- Log full error details server-side only
- Never expose stack traces to clients

### React Query
- Use Error Boundaries for component-level errors
- Display inline errors for form submissions
- Provide retry mechanisms for failed requests
- Show loading states during retries
- Implement global error handlers for unhandled errors

### Client-Side Errors
- Never expose stack traces to users
- Implement error monitoring (Sentry, LogRocket)
- Provide actionable error messages
- Allow users to report issues easily
- Use React 19 error boundaries for graceful degradation

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)
- ✅ Zod schemas (valid/invalid inputs)
- ✅ Utility functions (pure logic)
- ✅ Custom hooks (with `renderHook`)
- ✅ Component rendering and interactions
- ✅ Test shared Zod schemas on both client and server

### Integration Tests
- ✅ Server Actions with mocked API
- ✅ Form submissions with `useActionState`
- ✅ Query and mutation flows
- ✅ Multi-step user workflows
- ✅ Test async params/searchParams handling

### E2E Tests (Playwright)
- ✅ Critical user journeys (signup → onboarding → first action)
- ✅ Authentication flows (login, logout, session expiry)
- ✅ Payment/checkout processes
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness

### Testing Priorities
1. High-risk paths (payments, auth, data deletion)
2. Complex business logic
3. Edge cases and error states
4. Accessibility compliance
5. Server Action form submissions

---

## Accessibility Requirements

### Semantic HTML
- ✅ Use `<button>` for actions, `<a>` for navigation
- ✅ Use `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`
- ✅ Use proper heading hierarchy (h1 → h2 → h3)
- ✅ Use `<form>` for form submissions (works with Server Actions)

### ARIA & Labels
- ✅ Add `aria-label` to icon-only buttons
- ✅ Use `aria-describedby` for form field hints
- ✅ Mark required fields with `aria-required`
- ✅ Announce dynamic content with `aria-live`
- ✅ Use `aria-busy` for pending states (useActionState)

### Keyboard Navigation
- ✅ All interactive elements accessible via Tab
- ✅ Implement focus trapping in modals
- ✅ Support Escape to close overlays
- ✅ Show visible focus indicators
- ✅ Ensure form submission works with Enter key

### Visual Standards
- ✅ Minimum color contrast ratio: 4.5:1 (normal text), 3:1 (large text)
- ✅ Don't rely on color alone to convey information
- ✅ Support OS-level reduced motion preferences
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Ensure loading states are announced to screen readers

---

## Import Aliases

Use absolute imports with aliases:
- `@/app/*` → App Router pages
- `@/components/*` → UI components
- `@/features/*` → Feature modules
- `@/lib/*` → Shared utilities
- `@/types/*` → Global types
- `@/store/*` → Zustand stores

---

## Common Pitfalls to Avoid

### Next.js 15 & React 19 Specific
- ❌ Forgetting to await params/searchParams (they're Promises now)
- ❌ Using `useFormState` instead of `useActionState` (React 19)
- ❌ Not marking server-only code with `'server-only'`
- ❌ Mixing client and server code without proper boundaries
- ❌ Not handling Suspense boundaries for streaming

### Data Fetching
- ❌ Fetching in `useEffect` (use TanStack Query)
- ❌ Storing server data in useState (use queries)
- ❌ Not handling loading/error states
- ❌ Making sequential requests that could be parallel
- ❌ Not leveraging React 19 Suspense for data fetching

### Forms & Server Actions
- ❌ Not validating on the server (client-side validation is UX only)
- ❌ Storing form state in global state
- ❌ Not handling form submission errors properly
- ❌ Not using shared Zod schemas between client/server
- ❌ Returning raw errors from Server Actions

### State Management
- ❌ Prop drilling instead of composition or context
- ❌ Using Context for high-frequency updates
- ❌ Creating too many Zustand stores (group related state)
- ❌ Not memoizing selectors in Zustand
- ❌ Duplicating server state in client state

### TypeScript
- ❌ Using `any` instead of proper types
- ❌ Duplicating types instead of aliasing
- ❌ Not enabling strict mode
- ❌ Ignoring TypeScript errors with `//@ts-ignore`
- ❌ Not leveraging Zod for runtime validation

### Performance
- ❌ Not lazy loading heavy components
- ❌ Missing key props in lists
- ❌ Creating functions inside render (use useCallback)
- ❌ Not memoizing expensive calculations (use useMemo)
- ❌ Over-using 'use client' directive (only when necessary)

---

## Feature Migration Checklist

When adding a new feature:

- [ ] Create feature directory: `src/features/[feature-name]/`
- [ ] Define shared Zod schemas in `types/index.ts` (client + server)
- [ ] Implement Server Actions in `api/actions.ts` using React 19 patterns
- [ ] Create query hooks in `api/use-[feature].ts` with metadata exports
- [ ] Create mutation hooks in `api/use-[feature]-mutations.ts` with invalidation
- [ ] Build UI in `components/` following design system
- [ ] Add route in `app/(authenticated)/` or `app/(auth)/`
- [ ] Handle async params/searchParams properly (await them)
- [ ] Update middleware if route requires authentication
- [ ] Mark server-only code with `'server-only'`
- [ ] Implement proper error boundaries
- [ ] Add loading states with Suspense where appropriate
- [ ] Write tests for critical paths
- [ ] Test accessibility (keyboard nav, screen readers)
- [ ] Update this documentation if introducing new patterns

---

## Quick Reference

### Async Params Pattern
```typescript
// Always await params and searchParams in Next.js 15+
const { id } = await params;
const { filter } = await searchParams;
```

### useActionState Pattern
```typescript
// Client: Use React 19 useActionState
const [state, formAction, isPending] = useActionState(myAction, initialState);

// Server: Return ActionState
return { status: 'success', data: result };
```

### Shared Zod Schema Pattern
```typescript
// types/index.ts - Share between client and server
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export type User = z.infer<typeof userSchema>;
```

### Server-Only Code
```typescript
// Mark server-only files
import 'server-only';
```

---

**Framework Versions:** Next.js 15+ • React 19 • TypeScript 5+
**Last Updated:** 2024
**Maintained by:** Frontend Architecture Team