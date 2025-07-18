---
applyTo: "apps/backend/src/**/*.ts"
description: "Instructions for Fastify backend/Node.js code"
---

# Fastify API & Backend Guidelines

## File Structure

- Organize each resource in `src/api/v1/<resource>` as:
  - `<resource>.controller.ts` for business logic/handlers.
  - `<resource>.route.ts` for endpoint definitions.
  - `<resource>.schema.ts` for all validation schemas.
  - `index.ts` to aggregate and export modules for the resource.

## Programming Patterns

- TypeScript is required, with strict mode on.
- All async logic uses `async/await`, including in route handlers and controllers.
- Modularize business logic into functions or service classes where possible.

## Comments & Documentation

- Each controller and route must start with a JSDoc block:
  - Describe endpoint, auth requirements, request body, params, and expected response.
  - Add parameter and return type descriptions.

## Error Handling

- Always validate and sanitize incoming data with schema validation.
- Use `try/catch` for business logic. On error, respond with error details, do not crash or leak stack traces.
- Log all major errors with contextual metadata.

## API Versioning & Security

- All endpoints must be versioned (`/api/v1/...`).
- Always enforce authentication and authorization as middleware or guards.
- Follow OWASP REST API security best practices.

---
