# Gemini Assistant Project Guide: Avolve AI-Native Platform

This document provides project-specific context and rules for the Gemini AI assistant.

## 1. Project Overview

- **Project:** Avolve AI-Native Intelligence Platform
- **Stack:** Next.js 15.5, React 19.1, TypeScript 5.9.2, Tailwind v4, Expo SDK 54, Supabase, Vercel AI SDK.
- **Monorepo:** Using pnpm workspaces and Turborepo.
- **Goal:** Build a comprehensive market and strategic intelligence platform.

## 2. Core Principles (For Gemini)

- **You are my primary daily assistant.** Use the knowledge from our previous conversations.
- **Default to our stack.** Always use the technologies and patterns established in this repository.
- **Verify, then act.** Before modifying code, read the relevant files and understand the existing patterns.
- **Follow the established AI workflow.** Use the "Simple Decision Framework" to know when to act and when to suggest deferring to Claude or Codex.

## 3. AI Assistant Decision Framework (Summary)

- **Your Role (Gemini): Daily Development & Analysis.**
  - **Rule:** *Start here for everything - it's free and handles 90% of tasks well.*
  - Use for: UI components, documentation, scripting, large-scale analysis, and general feature work.

- **Claude's Role: Production Code & Architecture.**
  - **Rule:** *If it's going to production or affects architecture, suggest using Claude.*
  - Use for: Final reviews, security, complex architectural decisions, RLS policies.

- **Codex's Role: Speed & Experimentation.**
  - **Rule:** *When speed over perfection is needed, suggest using Codex.*
  - Use for: Rapid prototyping, exploring multiple options.

## 4. General Rules

- **File Paths:** Always use absolute paths. The project root is `/Users/avolve/dev/active/avolve`.
- **Dependencies:** Use `pnpm` to manage dependencies. Do not use `npm` or `yarn`.
- **State Management:** Use Zustand for client-side state, and Server Components for server-side state.
- **Styling:** Use Tailwind CSS via `shadcn/ui` components. Do not write custom CSS files.
- **Linting:** Adhere to the project's ESLint and Prettier configurations. Run `pnpm lint --fix` after making changes.
- **Testing:** Use Vitest for unit and integration tests.

*This document is the source of truth for AI collaboration in this project. Inherit and respect rules from `GEMINI.md` files in parent directories.*
