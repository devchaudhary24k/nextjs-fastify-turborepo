---
applyTo: "**/*.tsx,**/*.jsx"
description: "Instructions specific to React and Next.js code generation"
---

# React & Next.js Coding Instructions

## Component Practices

- Always use functional components with hooks, never class components.
- All components must be defined with TypeScript types or interfaces for props.
- Use JSDoc-style comments above every exported component, including a summary, detailed purpose, props (name/type/description), and expected children or return value.
- For reusable components, document slots, style overrides, and event callbacks.

## File Organization

- Place components inside the `components/` or `features/<feature>/components/` directory.
- If a component is feature-specific, always colocate with related hooks, api logic, and types.

## State & Effects

- Prefer React hooks (`useState`, `useEffect`, etc.) over legacy APIs.
- Manage global state via the workspace solution (e.g. Redux, Zustand), not React context unless specifically required.
- Use `useCallback` and `useMemo` as needed to optimize performance.
- Avoid deep prop drilling; use context where necessary and document its usage.

## Styling

- Use Tailwind CSS classes where applicable (project default).
- For custom styles, prefer CSS modules or inline styles as last resort.

## Error Handling & UX

- All async UI logic must handle and show errors to the user.
- Use loading and skeleton components for async content.
- Gracefully handle missing/invalid props.

## Next.js Specific

- Use `getServerSideProps` or React Server Components for server-side data fetching.
- Use the app router conventions for pages, layouts, and API routes; do not modify routing structure.
- Document API routes and page components using JSDoc.

---
