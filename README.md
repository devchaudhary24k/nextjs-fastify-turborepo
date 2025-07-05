# Next.js Fastify Starter Template

This repository provides a comprehensive monorepo architecture integrating modern, production-ready technologies for accelerated web development. The stack includes:

- **Next.js** — Application frontend and dashboard
- **Fastify** — High-performance REST API backend
- **Astro** — Static marketing website

Out of the box, this template incorporates user authentication (including credential-based login, OAuth2, two-factor authentication, and passkeys), a PostgreSQL database managed via Drizzle ORM, and a suite of supporting utilities for analytics, observability, and security.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Applications](#applications)
- [Packages](#packages)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Support](#support)
- [Appendix](#appendix)
- [Authors](#authors)

---

## Features

- Light and dark mode toggle for improved accessibility and user preference
- Live preview functionality for dynamic content updates
- Fullscreen mode for distraction-free usage
- Cross-platform compatibility (works seamlessly on Windows, macOS, and Linux)
- Built-in authentication (credential login, OAuth2, two-factor authentication, passkeys)
- PostgreSQL database integration with Drizzle ORM
- Modular monorepo structure: Next.js app, Fastify API, Astro marketing site, Drizzle Studio
- Customizable design system with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS
- Analytics integration (PostHog, Vercel Analytics, Google Analytics)
- Email support using React Email and Resend
- Observability tools (Logtail, Sentry) for monitoring and error tracking
- API rate-limiting powered by Upstash
- Comprehensive SEO configuration
- Easy deployment to Vercel (frontend and marketing) and Render (backend)

---

## Tech Stack

**Frontend:**

- Next.js (React)
- Tailwind CSS
- shadcn/ui
- Redux (if applicable)

**Backend:**

- Fastify (Node.js)
- Drizzle ORM
- PostgreSQL

**Marketing Site:**

- Astro

**Shared & Utilities:**

- TypeScript
- ESLint
- React Email & Resend (email)
- PostHog, Vercel Analytics, Google Analytics (analytics)
- Sentry, Logtail (observability)
- Upstash (API rate limiting)
- Arcjet (security)

---

## Applications

- **app**: Next.js dashboard application.
- **backend**: Fastify REST API server.
- **studio**: Drizzle ORM Studio for database management.
- **web**: Static marketing site built with Astro.

---

## Packages

- **analytics**: Unified analytics solution utilizing PostHog, Vercel Analytics, and Google Analytics.
- **database**: PostgreSQL integration powered by Drizzle ORM.
- **design system**: Centralized UI library leveraging shadcn/ui and Tailwind CSS.
- **email**: Email functionality via React Email and Resend.
- **observability**: Logging and error tracking using Logtail and Sentry.
- **ratelimit**: API rate limiting implemented with Upstash.
- **security**: Advanced security mechanisms provided by Arcjet.
- **seo**: Shared configuration for search engine optimization.
- **eslint-config**: Standardized ESLint configuration.
- **next-config**: Centralized Next.js configuration for all modules and packages.
- **typescript-config**: Shared TypeScript configuration to enforce code quality and consistency.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/devchaudhary24k/nextjs-fastify-turborepo.git
   cd nextjs-fastify-turborepo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**  
   Copy the environment template and update the configuration for each application:

   ```bash
   cp .env.example .env
   ```

   > Repeat this step for every app within the monorepo. Edit the `.env` files with the required values.

4. **Start local services (Database & Redis)**  
   Make sure [Docker](https://www.docker.com/) is running, then launch the database and cache services:

   ```bash
   docker-compose up -d
   ```

5. **Push the database schema**

   ```bash
   pnpm run db:push
   ```

6. **Start the development servers**
   ```bash
   pnpm run dev
   ```

---

## Deployment

The recommended deployment strategy for this monorepo is as follows:

- **Next.js Application (`app`)**: Deploy to [Vercel](https://vercel.com/), which offers seamless integration and optimized hosting for Next.js apps.
- **Astro Marketing Site (`web`)**: Deploy to [Vercel](https://vercel.com/) for best static site performance and simple CI/CD from your GitHub repository.
- **Fastify Backend (`backend`)**: Deploy to [Render](https://render.com/) for fast, reliable Node.js API hosting with automatic deployments from your repository.

All of these platforms support direct integration with GitHub, enabling continuous deployment on every push to your `main` branch.

### Docker

Docker support is currently in progress and will be provided soon.

---

## Environment Variables

Each application in this monorepo requires its own set of environment variables.  
Create a `.env` file in the root directory of each app, and add the necessary variables as shown below:

---

### App (`app` - Next.js Dashboard)

- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- (Add other required variables here)

---

### Backend (`backend` - Fastify API)

- `DATABASE_URL`
- `JWT_SECRET`
- `API_PORT`
- (Add other required variables here)

---

### Studio (`studio` - Drizzle ORM Studio)

- `DATABASE_URL`
- (Add other required variables here)

---

### Web (`web` - Astro Marketing Site)

- `PUBLIC_BACKEND_URL`
- `SITE_URL`
- (Add other required variables here)

---

> Refer to the `.env.example` file in each directory for a full list and descriptions of the required environment variables.

---

## Screenshots

<!-- Replace the placeholder URL with actual image URLs once available -->

### App Dashboard

![App Dashboard Screenshot](https://placehold.co/800x450?text=App+Dashboard+Screenshot)

### Marketing Website

![Marketing Site Screenshot](https://placehold.co/800x450?text=Marketing+Site+Screenshot)

<!-- Example: Uncomment and add more if needed
### Login Flow
![Login Flow Screenshot](https://via.placeholder.com/800x450?text=Login+Screenshot) -->

> Screenshots will be updated soon, we are working on it.
>
> To add your own screenshots, upload image files to the repository (e.g., in a `/screenshots` or `/docs` directory) and update the image URLs in this section.

---

## FAQ

#### 1. Can I use this template for commercial projects?

Yes! This project is licensed under the MIT License, which permits use in both personal and commercial projects.

---

#### 2. How do I deploy the different parts of the monorepo?

The recommended approach is to deploy the Next.js app and the Astro site to Vercel, and the Fastify backend to Render. See the [Deployment](#deployment) section for details.

---

#### 3. Which database is supported?

This template uses PostgreSQL by default, managed via Drizzle ORM.

---

#### 4. How do I set up environment variables?

Each app in the monorepo has its own `.env` file. Copy the `.env.example` to `.env` in each directory and fill in the necessary values. See [Environment Variables](#environment-variables) for more information.

---

#### 5. Is Docker supported?

Docker support is currently in progress and will be available soon.

---

#### 6. How do I report bugs or request features?

Please open an issue on the [GitHub repository](https://github.com/your-username/your-repo/issues).

---

#### 7. Does the project include authentication features?

Yes. The template supports credential-based login, OAuth2, two-factor authentication (TFA), and passkey authentication out of the box.

---

#### 8. Can I contribute to this project?

Absolutely! Contributions are welcome. Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

Don’t see your question here? [Open an issue](https://github.com/your-username/your-repo/issues) or reach out via the project discussions!

---

## Contributing

Contributions are always welcome! If you’d like to get involved, please follow these steps:

1. Read the [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines and instructions on how to get started.
2. Please make sure to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) to foster a welcoming and respectful community.

We look forward to your ideas, bug reports, and pull requests!

---

## Support

If you need help or have questions, please reach out to us:

- 📧 Email: [support@devtalan.com](mailto:support@devtalan.com)
- 💬 Join our [Discord community](https://your-slack-link.com) for real-time assistance and discussion.

You can also open an issue on the [GitHub repository](https://github.com/devchaudhary24k/nextjs-fastify-turborepo/issues) for bug reports and feature requests.

---

## Appendix

### Glossary

- **Fastify**: A web framework for Node.js.
- **Passkeys**: A passwordless authentication method.

### Additional Resources

- [Official Next.js Docs](https://nextjs.org/docs)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Astro Documentation](https://docs.astro.build/)

---

## Authors

- [@devchaudhary24k](https://www.github.com/devchaudhary24k)
