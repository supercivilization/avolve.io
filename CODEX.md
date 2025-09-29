# Codex Assistant Project Guide: Avolve AI-Native Platform

This guide orients Codex for rapid, high-quality contributions within the Avolve AI-native monorepo.

## 1. Project Snapshot

- **Project:** Avolve AI-Native Development Platform (8-layer architecture)
- **Stack:** Next.js 15.5 · React 19.1 · TypeScript 5.9.2 · Tailwind CSS v4 (Oxide) · Expo SDK 54 · Supabase · Vercel AI SDK 5.0.48
- **Runtime:** Node.js 24.8+ with native TypeScript execution (pnpm 9 workspaces, Turbo 2.5)
- **Repository Root:** `/Users/avolve/dev/active/avolve`
- **Structure Highlights:** `apps/` (web, mobile, email), `packages/` (ui, lib, config), `scripts/`, `supabase/`, `claudedocs/`

## 2. Codex Primary Mission

Codex is our **speed & exploration specialist**. Engage Codex when we need:
- Rapid prototyping and greenfield feature spikes
- Multiple implementation variants for comparison
- Bulk code generation (components, hooks, tests)
- Parallel scaffolding across web, mobile, edge targets
- Migration helpers (e.g., CodePush → EAS, async API updates)

**Rule of thumb:** *Reach for Codex when velocity outweighs polish, then hand refined output to Claude or Gemini for review/refinement.*

## 3. Usage Playbook

### When to Involve Codex
- **Experiments & Proofs:** Generate several approaches to a UI, API, or workflow before we commit.
- **Boilerplate Expansion:** Scaffold repetitive files (NativeWind components, Vitest suites, Supabase helpers).
- **Cross-Platform Parity:** Create synchronized implementations for Next.js + Expo + Edge Functions.
- **Long-Running Tasks:** Let Codex tackle bulk migrations or scaffolding while teammates focus elsewhere.

### When to Defer
- Production-ready architecture, security-critical code, or Supabase RLS → escalate to `CLAUDE.md` guidance.
- General daily tasks already well-understood → prefer Gemini to control costs.

## 4. Orchestrated Workflow

We follow the relay model captured in `CLAUDE.md` / `GEMINI.md`:
1. **Design (Claude)** → architecture blueprint & guardrails.
2. **Build (Codex)** → generate implementations from that spec.
3. **Validate (Gemini/Claude)** → testing, optimization, production review.

Always log significant Codex runs through the AI decision tracker (`pnpm ai:decision:log`).

## 5. Prompting Guidelines

- **Context First:** Provide absolute paths plus brief excerpts of relevant files.
- **Specify Targets:** Note whether output belongs in `apps/web`, `packages/ui`, `supabase/functions`, etc.
- **Set Constraints:** Tailwind-only styling, Server Components vs Client Components, TypeScript strictness.
- **Request Variants:** Ask for multiple options when exploring; Codex excels at breadth.
- **Plan Refinement:** Conclude prompts with review instructions (tests to run, follow-up with Claude, etc.).

Example prompt:
```
codex generate component --context apps/web/app/dashboard/page.tsx \
  --requirements "Create 3 NativeWind card variants using Tailwind v4 tokens" \
  --followup "Suggest Vitest coverage and Server Action integration" 
```

## 6. Best Practices After Generation

- **Branch Isolation:** Use `git checkout -b ai/codex-<task>` before adopting Codex output.
- **Human Review:** Inspect all generated files, remove placeholders, ensure accessibility.
- **Quality Gate:** Run `pnpm lint && pnpm type-check && pnpm test` (or scoped equivalents).
- **Security Sweep:** Verify no secrets or credentials slipped into code or configs.
- **Escalation:** If Codex output touches architecture or production paths, schedule a Claude review.

## 7. Cost & Runtime Management

- Prefer codex sessions for time-bound spikes; terminate idle processes.
- Archive large generations in `claudedocs/` or `reports/` only after curating useful insights.
- Track minutes saved vs. review time inside the AI decision tracker to refine future usage.

## 8. Integrations & Tooling

- **Scripts:** `scripts/ai-relay.js` orchestrates Claude → Codex → Gemini handoffs.
- **Monitoring:** Align with `pnpm ai:decision:*` commands for accountability and cost visibility.
- **CI Hooks:** Use comment-driven workflows (`/ai build`) to request Codex assistance within PRs.

## 9. Reference Materials

- Read `CLAUDE.md` for architectural policies and environment requirements.
- Read root `GEMINI.md` (and scoped variants) for daily dev conventions and escalation criteria.
- Check `DEVELOPMENT_SETUP.md` and `WORKFLOW_SYSTEM.md` for environment provisioning & process cadence.

---

Codex is most effective when paired with clear architectural intent and rigorous review. Use it to explore fast, capture learnings, then promote validated solutions through Claude and Gemini for production-grade quality.
