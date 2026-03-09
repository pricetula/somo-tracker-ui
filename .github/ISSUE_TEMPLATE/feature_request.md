---
name: Feature Request
about: Propose a new feature for Somo Tracker UI
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## Feature Summary
<!-- One-sentence description -->

## App
<!-- Which app does this belong to? -->
- [ ] `apps/web` — Main product app (Next.js)
- [ ] `apps/public` — Marketing site (SvelteKit)
- [ ] Both

## Domain
<!-- apps/web: which feature area? e.g. students, cohorts, exams, auth, schools -->
<!-- apps/public: which page/section? e.g. landing, pricing, nav -->

## User Story
**As a** [role]
**I want** [feature]
**So that** [benefit]

## Proposed Solution
<!-- Describe your proposed implementation -->

## UI / UX Notes
<!-- Wireframes, mockups, or description of the expected interface -->

## Implementation Checklist

### apps/web (Next.js + React)
- [ ] Types: `apps/web/src/features/{domain}/types/index.ts`
- [ ] Server Action: `apps/web/src/features/{domain}/api/actions.ts`
- [ ] Query hook: `apps/web/src/features/{domain}/api/use-{feature}.ts`
- [ ] Mutation hook: `apps/web/src/features/{domain}/api/use-{feature}-mutations.ts`
- [ ] Page/route: `apps/web/src/app/(authenticated)/{route}/page.tsx`
- [ ] Shared component (if needed): `apps/web/src/components/shared/`

### apps/public (SvelteKit)
- [ ] Route: `apps/public/src/routes/{path}/+page.svelte`
- [ ] Server load (if needed): `apps/public/src/routes/{path}/+page.server.ts`
- [ ] Component (if needed): `apps/public/src/lib/components/`

## Acceptance Criteria
<!-- Specific, testable criteria -->
- [ ]
- [ ]
- [ ]

## Additional Context
<!-- Mockups, diagrams, related issues, alternative solutions -->
