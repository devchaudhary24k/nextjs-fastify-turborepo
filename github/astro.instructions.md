---
applyTo: "apps/web/**/*.astro"
description: "Instructions for Astro static site code"
---

# Astro Static Site Instructions

## Component and Page Authoring

- All pages go in the `src/pages/` directory, components in `src/components/`.
- Name Astro files in kebab-case (e.g., `feature-section.astro`).
- Document each component/page with a JSDoc or Markdown summary comment at the top.
- Use TypeScript frontmatter where type safety is needed.

## Content & Layout

- Use layouts for shared structure (header, footer).
- Place global data/content (e.g., navigation, company info) in a shared config file.
- For marketing copy, separate content from layout where possible.

## Assets & Optimization

- Optimize images before use.
- Use built-in Astro image/compression components.
- Reference CDN links for 3rd party assets and fonts.

## SEO

- Ensure each page sets title, meta description, and canonical URL.

---
