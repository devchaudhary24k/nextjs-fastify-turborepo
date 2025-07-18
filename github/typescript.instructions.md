---
applyTo: "**/*.ts,**/*.tsx,**/*.astro"
description: "TypeScript general usage rules"
---

# TypeScript Project Guidelines

## Required Practices

- All files must use TypeScript; never write raw JavaScript except where necessary for external compatibility.
- Enable strict mode in all tsconfig files and do not override without strong reason.
- Define all types and interfaces clearly; avoid `any` and use union, literal, and generics where appropriate.
- Organize shared types in `types/` or in a `types.ts` in the feature directory.
- Add JSDoc comments for all exported types, interfaces, and classes describing usage, parameters, and expected structure.
- Use `readonly` and `const` for immutable data.
- Use optional chaining and nullish coalescing for safe property access.
- Prefer type-safe APIs/utilities from shared packages (e.g. database, API).

## Naming Conventions

- PascalCase for types, interfaces, classes, and components.
- camelCase for variables, functions, properties, and hooks.
- UPPER_SNAKE_CASE for constants.
- Export only what is needed; avoid default exports except for top-level modules/components.

---
