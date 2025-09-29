# Gemini Assistant Guide: Web Application (`apps/web`)

This guide provides specific rules for the Next.js web application, inheriting from the root `GEMINI.md`.

## 1. Architecture & Patterns

- **Framework:** Next.js 15.5 with the App Router.
- **Default to Server Components:** All new components should be React Server Components (RSCs) unless they explicitly require client-side interactivity (`"use client"`).
- **Data Fetching:** Use async/await within Server Components for data fetching. Do not use `getStaticProps` or `getServerSideProps`.
- **Mutations:** Use React 19.1 Server Actions for all data mutations. Place Server Actions in `lib/actions.ts` files, co-located with the relevant feature.
- **API Routes:** Only use API routes for webhook endpoints or when required for external service integrations. Prefer Server Actions for all other cases.
- **Authentication:** Authentication is handled by Supabase. Use the Supabase client from `@/lib/supabase/server` in server-side code.

## 2. Component & Styling Rules

- **Component Library:** Use `shadcn/ui` components from the `@avolve/ui` package (`packages/ui`).
- **New Components:** When creating new components, use the `shadcn/ui` style and structure.
- **Styling:** Use Tailwind CSS utility classes directly in your JSX. Do not create separate CSS/SCSS modules.
- **Responsiveness:** All components must be responsive and tested on mobile, tablet, and desktop screen sizes.

## 3. Code Generation Workflow

- **When asked to create a new page/feature:**
  1. Create a new folder under `app/`.
  2. Create a `page.tsx` file (as a Server Component).
  3. Fetch data directly within the page component.
  4. Create any necessary child components, defaulting to Server Components.
  5. If mutations are needed, create/update a corresponding `lib/actions.ts` file.
