---
applyTo: "**"
---

# Monorepo: Next.js, Fastify, and Astro Starter – Copilot Instructions

## Overview

This monorepo (`nextjs-fastify-turborepo`) is designed as an advanced starter kit for rapid web application development. It consists of three primary applications:

- **Next.js App (`app`)**: Main front-end for dashboards, UIs, and extensible web products, supporting advanced authentication (credentials, OAuth2, passkeys, two-factor, organizations).
- **Fastify Backend (`backend`)**: High-performance REST API serving the Next.js app, providing authentication logic, data access, user/org management, and more.
- **Astro Marketing Site (`web`)**: Static website for product marketing, built with Astro and intended for CDN delivery.

Additionally, there is a **Drizzle Studio** DB management app and several internal packages (analytics, database integration, design system, email, observability, rate limiting, security, SEO, ESLint config, Next.js config, TypeScript config) structured within the monorepo.

## Project Structure

- `apps/` — App-specific source (Next.js, Fastify, Astro, Drizzle Studio).
  - `app/` — Next.js dashboard/frontend app
  - `backend/` — Fastify API server
  - `web/` — Astro static site
  - `studio/` — Drizzle ORM studio
- `packages/` — Shared and utility libraries (database, analytics, design system, etc.)
- `.github/` — Repo configuration, copilot/chat instructions, prompts, workflows
- `/docs/` or `/screenshots/` — Documentation and visuals

### Next.js App structure (see `apps/app/src/`):

- `src/app/` – Next.js "pages" app directory
- `src/components/` – React components (UI, views)
- `src/constants/` – Project-wide constants/config
- `src/contexts/` – React contexts/providers
- `src/features/` – Modularized features (e.g., `authentication/`, `user/`)
  - Each feature contains `api/`, `components/`, `hooks/`, `store/`, etc.
- `src/hooks/` – Shared React hooks
- `src/lib/` – General libraries/helpers
- `src/store/` – State management (if applicable)
- `src/types/` – Global TypeScript types/interfaces
- `src/utils/` – Utility functions, helpers
- `src/middleware.ts`, `src/env.ts` – Middlewares and environment utilities

### Fastify Backend structure (see `apps/backend/src/`):

- `src/api/v1/` – API versioning root
  - `user/`, `auth/`, etc. for each resource
    - `user.controller.ts` – Handlers/business logic
    - `user.route.ts` – Route definitions
    - `user.schema.ts` – Validation/schema
- `src/auth/` – Authentication logic (JWT, session, etc.)
- `src/plugins/` – Fastify plugins (CORS, security, etc.)
- `src/types/` – Type definitions
- `src/utils/` – General utilities/helpers
- `src/app.ts` – Fastify app entrypoint
- `src/env.ts` – Environment variables loader

### Astro Marketing Site:

- Astro project in `apps/web/`, structured as standard Astro static site.

## Architectural Approach

- **Monorepo** for all apps and packages, using _workspace_ management (e.g., PNPM workspaces or TurboRepo).
- **Feature-based modularity** for both frontend and backend, using clear boundaries.
- **Authentication-first design:** All apps use shared authentication, with org/user context.
- **Strict TypeScript adoption** in all code (frontend, backend, packages).
- **Configurable baseline, extensible by consumers/developers.**
- **CI/CD & Environment setup:** Each app manages its own `.env` and secrets.

## General Coding and AI Assistance Rules

### 1. Code Organization & Scalability

- Always respect the folder and modular structure outlined above.
- Implement new logic as feature-modules (do not scatter business logic).
- Place shared code in `/packages`, not duplicated across apps.
- Use versioned API pattern for backend (`/api/v1/...`).

### 2. Documentation & Comments

- **All code, especially exported functions/components, must be thoroughly commented.**
  - For React components: use JSDoc-style comments above component declarations, describing props, purpose, and usage (see code samples).
  - For backend controllers/routes: document purpose, expected request/response, and validation.
- All utilities, hooks, and abstractions require inline or above-definition comments.
- For major helpers/functions, clearly state expected input, output, and side effects.
- Comments should always be updated to reflect changes in code logic.

### 3. Conventions & Standards

- Use TypeScript for all code (strict mode).
- React: Use functional components and hooks; avoid class components.
- Use PascalCase for components, interfaces, types; camelCase for variables and functions; ALL_CAPS for constants.
- Use feature-first (not layer-first) structure for maintainability.
- Backend: Use controllers for business logic, routes to define endpoints, schemas for validation; never mix responsibilities.
- Use async/await for all asynchronous logic.
- Handle and log all errors with contextual detail.
- Use env variables through utilities only; no hardcoded secrets.

### 4. Testing, Linting, Formatting

- Ensure code passes linting (using ESLint config in `packages`).
- Formatting must follow workspace Prettier/ESLint rules.
- Add tests for critical features, utilities, and endpoints as appropriate.
- For new features or endpoints, always scaffold test files.

### 5. Best Practices

- Never expose secrets or sensitive data in source.
- For security/auth flows, use proven libraries and ensure OWASP best practices.
- Leverage observability tools and error boundaries.
- All generated or AI-assisted code must be manually reviewed before merging.
- All global changes should be backwards compatible unless noted.

## AI Code Generation Guidelines

- Assume new logic adheres to all of the above.
- Use the exact file/folder structure as described – use feature folders, do not introduce new top-level directories without justification.
- For Next.js and React, all components, hooks, and utilities require JSDoc comments, including descriptions, parameters, return types, and usage notes.
- For Fastify backend, all controllers, routes, types, and schemas require JSDoc or explanatory comments above definitions.
- Always scaffold code with descriptive comments to explain purpose and maintainability.
- Never leave TODOs or incomplete method stubs without explanation in comments.
- AI-generated code must always be commented indicating logic and structure.

## Example: Comment Format for React Components

```ts
/**
 * Dashboard Layout Component.
 *
 * Server-side layout for dashboard pages. This layout is responsible for:
 * - Fetching the current user's session. Redirects or returns 404 if unauthenticated.
 * - Fetching the user's organizations and redirecting to onboarding if none exist.
 * - Validating the user's membership in the organization (by slug). Shows 404 if access denied.
 * - Reading the sidebar state from cookies to control sidebar UI.
 * - Providing the organization/user context to sidebar and dashboard children.
 *
 * @param DashboardLayoutProps.children - The dashboard page content
 * @param DashboardLayoutProps.params - Route parameters (slug wrapped in a promise)
 * @returns The layout wrapping the dashboard page, with sidebar and header, or redirects/notFound as needed.
 */
const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  // implementation
};
```
