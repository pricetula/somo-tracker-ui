---
name: Test Coverage Request
about: Request tests for existing frontend code
title: '[TEST] '
labels: testing
assignees: ''
---

## What Needs Testing
<!-- Describe the component, hook, action, or feature that lacks test coverage -->

## App
- [ ] `apps/web` — Main product app (Next.js)
- [ ] `apps/public` — Marketing site (SvelteKit)

## Test Type Required
<!-- Check all that apply -->
- [ ] Component test (rendering, interactions)
- [ ] Hook / composable unit test
- [ ] Server Action unit test
- [ ] End-to-end test (user flow)

## Target Files

**Source file(s):**
- `apps/web/src/features/{domain}/{layer}/{file}.ts`  or  `apps/public/src/{path}/{file}.svelte`

**Test file to create/update:**
- `apps/web/src/features/{domain}/{layer}/{file}.test.ts`  or  `apps/public/src/{path}/{file}.test.ts`

## Current Coverage
**Current coverage:** ___%
**Target coverage:** ___%

## Test Scenarios Needed

### 1. Happy Path
<!-- Describe expected successful behavior -->

### 2. Error Cases
<!-- List error scenarios to test -->
-
-

### 3. Edge Cases
<!-- Boundary conditions, empty states, loading states, etc. -->
-
-

## Testing Requirements

### Component Tests (if applicable)
- [ ] Renders correctly with required props
- [ ] Handles loading state
- [ ] Handles empty/error state
- [ ] User interactions (click, input, submit) work as expected

### Hook / Server Action Tests (if applicable)
- [ ] Mock API calls / fetch
- [ ] Test success path returns expected data
- [ ] Test error path surfaces correct error
- [ ] Test validation rejects invalid input (Zod schemas)

### End-to-End Tests (if applicable)
- [ ] Full user flow from entry point to success state
- [ ] Auth-gated routes redirect unauthenticated users
- [ ] Form submission and response handling

## Additional Context
<!-- Related issues, existing tests to reference, special considerations -->
