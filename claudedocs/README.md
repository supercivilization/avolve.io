# Tamagui Takeout Project Documentation

**Last Updated:** November 15, 2025

This directory contains comprehensive documentation for the Tamagui Takeout universal React application (web + native).

---

## Quick Navigation

### 🏗️ Architecture & Getting Started
- [**Architecture Guide**](ARCHITECTURE-GUIDE.md) ⭐ **START HERE** - Complete explanation of the entire starter
- [**SDK Ecosystem 2025**](SDK-ECOSYSTEM-2025.md) 🆕 **NEW** - All available SDKs and tools for your stack
- [Configuration Standards](CONFIGURATION-STANDARDS-NOV-2025.md) - Complete technical setup guide
- [Router Selection Guide](ROUTER-SELECTION-GUIDE.md) - Quick reference for which router to use

### 🗺️ Routing Strategy (NEW - Nov 13, 2025)
- [Hybrid Router Strategy](HYBRID-ROUTER-STRATEGY-2025.md) - Complete Pages + App Router coexistence plan
- [Migration Assessment Template](MIGRATION-ASSESSMENT-TEMPLATE.md) - Evaluate routes for migration
- [Solito 5.0 Monitoring Checklist](SOLITO-5-MONITORING-CHECKLIST.md) - Track stability and readiness

### 📚 Technical Reference
- [Core Configuration](CONFIGURATION-STANDARDS-NOV-2025.md) - Supabase, Tamagui, Next.js 16 setup
- [Stack Versions](../.claude/stack-versions.json) - Current dependency versions
- [Tamagui Quick Reference](../.claude/TAMAGUI-QUICK-REF.md) - Component and styling guide

---

## Document Index

### Architecture & Understanding

**ARCHITECTURE-GUIDE.md** ⭐ NEW - Nov 15, 2025
- Purpose: Complete explanation of the Tamagui Takeout starter template
- Audience: Everyone - especially new developers
- Key Topics:
  - What is Tamagui Takeout and how it works
  - Monorepo structure and package organization
  - How code is shared between web and mobile
  - Data flow architecture
  - Platform-specific code handling
  - Development workflow
  - Build system explanation
- Read First: If you're new to the codebase or want to understand the big picture

**SDK-ECOSYSTEM-2025.md** 🆕 NEW - Nov 15, 2025
- Purpose: Comprehensive reference for all SDKs and tools in your stack
- Audience: All developers
- Key Topics:
  - Vercel ecosystem (AI SDK, Next.js, AI Gateway)
  - Supabase SDKs and tools (MCP Server, Edge Functions V2)
  - Expo SDK 53 modules and features
  - Data & API tools (tRPC v11, TanStack Query v5)
  - State management (Zustand v5)
  - Validation (Zod v4)
  - Email (Resend), Payments (Stripe)
  - Testing tools (Vitest, Playwright)
  - Version comparison matrix
  - Recommended upgrades
- Use This: When exploring new features, planning upgrades, or learning what's available

---

### Configuration & Setup

**CONFIGURATION-STANDARDS-NOV-2025.md**
- Purpose: Complete technical configuration guide
- Audience: Developers setting up or maintaining the project
- Key Topics:
  - Next.js 16 + React 19.2 configuration
  - Supabase authentication setup
  - Tamagui + Solito configuration
  - App Router support (NEW)
  - Required dependencies

---

### Routing Architecture (NEW - Nov 13, 2025)

**HYBRID-ROUTER-STRATEGY-2025.md** ⭐ Start Here
- Purpose: Overall routing strategy and migration plan
- Audience: All developers, architects, project managers
- Key Topics:
  - Why hybrid approach (Pages + App Router)
  - Router selection guidelines
  - 4-phase migration roadmap (2025-2026)
  - Monitoring and success metrics
  - Troubleshooting common issues
- Read First: If you need to understand the overall routing strategy

**ROUTER-SELECTION-GUIDE.md** ⭐ Daily Reference
- Purpose: Quick decision tree for which router to use
- Audience: All developers (daily reference)
- Key Topics:
  - Decision tree diagram
  - Quick reference table
  - Code templates for both routers
  - Navigation hook reference
  - Common mistakes to avoid
- Use This: Every time you create or modify a route

**MIGRATION-ASSESSMENT-TEMPLATE.md**
- Purpose: Evaluate individual routes for migration readiness
- Audience: Tech leads, developers planning migrations
- Key Topics:
  - Benefit/effort/risk scoring system
  - ROI calculation
  - Priority classification
  - Example assessments
- Use This: When considering migrating a Pages Router route to App Router

**SOLITO-5-MONITORING-CHECKLIST.md**
- Purpose: Track Solito 5.0 stability over time
- Audience: Tech leads, project managers
- Key Topics:
  - Weekly monitoring tasks
  - GitHub issue tracking
  - Community adoption metrics
  - Production error tracking
  - Go/no-go decision criteria
- Use This: Weekly from Nov 2025 - Feb 2026 to inform migration decisions

---

## Architecture Overview

### Current State (November 13, 2025)

**Routing:**
```
├── Pages Router (/pages)         [15 routes - STABLE]
│   ├── / (home)
│   ├── /sign-in
│   ├── /sign-up
│   ├── /profile
│   ├── /settings/*
│   └── ... (10 more routes)
│
└── App Router (/app)             [3 routes - NEW]
    ├── /admin/errors
    ├── /api/trpc/[trpc]
    └── /_not-found
```

**Stack:**
- Next.js 16.0.1 (both routers supported)
- React 19.2.0
- Tamagui 1.137.0 (universal styling)
- Solito 5.0.0 (universal navigation - **App Router support NEW!**)
- Supabase 2025 (auth + database)
- Expo SDK 53.0.9 (native mobile)

---

## Migration Timeline

### Phase 1: Stabilization (Nov 2025 - Jan 2026) ✅ CURRENT
- Enable App Router support
- Build new features in App Router
- Monitor Solito 5.0 stability
- Document hybrid strategy

### Phase 2: Pilot Migration (Feb 2026 - Mar 2026) 🔄 PLANNED
- Migrate 2-3 low-risk routes
- Test App Router patterns
- Validate performance
- Document lessons learned

### Phase 3: Systematic Migration (Apr 2026 - Sep 2026) 🔄 PLANNED
- Migrate medium-priority routes
- Continuous monitoring
- Gradual rollout

### Phase 4: Completion (Oct 2026+) 🔄 PLANNED
- Migrate high-risk routes (auth)
- Remove Pages Router
- Full App Router adoption

---

## Common Workflows

### Creating a New Feature

1. **Decision:** Which router?
   - See: [Router Selection Guide](ROUTER-SELECTION-GUIDE.md)
   - Default: App Router for all new features

2. **Setup:**
   ```bash
   # App Router (new features)
   mkdir -p app/your-feature
   touch app/your-feature/page.tsx
   ```

3. **Code:**
   ```typescript
   // app/your-feature/page.tsx
   'use client'
   import { useRouter } from 'solito/navigation' // App Router
   ```

---

### Fixing a Bug in Existing Route

1. **Check location:**
   ```bash
   # Is it in /pages or /app?
   ls pages/your-route.tsx
   ls app/your-route/page.tsx
   ```

2. **Use correct router:**
   - `/pages` → Use `solito/router`
   - `/app` → Use `solito/navigation`

3. **Don't refactor router** while fixing bugs

---

### Considering a Migration

1. **Read:** [Hybrid Router Strategy](HYBRID-ROUTER-STRATEGY-2025.md)
2. **Assess:** Use [Migration Assessment Template](MIGRATION-ASSESSMENT-TEMPLATE.md)
3. **Check:** [Solito 5.0 Monitoring](SOLITO-5-MONITORING-CHECKLIST.md) for stability
4. **Decide:** Based on ROI and risk assessment

---

## Quick Reference

### Navigation Hooks

| Router       | Location | Hook Import                  |
|--------------|----------|------------------------------|
| App Router   | `/app`   | `solito/navigation`          |
| Pages Router | `/pages` | `solito/router`              |

**CRITICAL:** Do NOT mix these up! See [Router Selection Guide](ROUTER-SELECTION-GUIDE.md)

---

### File Structure

**App Router:**
```
app/
├── layout.tsx          (root layout with providers)
├── page.tsx            (home route)
└── feature/
    ├── page.tsx        (route: /feature)
    └── layout.tsx      (optional layout)
```

**Pages Router:**
```
pages/
├── _app.tsx            (global app wrapper)
├── _document.tsx       (HTML document)
├── index.tsx           (home route)
└── feature.tsx         (route: /feature)
```

---

## Decision Points

### November 2025: App Router Support Enabled ✅
- Solito upgraded to 5.0.0
- App Router configuration added
- Hybrid strategy documented
- Status: COMPLETE

### February 2026: Phase 2 Migration Decision 🔄
- Review: 11 weeks of monitoring data
- Assess: Solito 5.0 stability
- Decide: Proceed with pilot migration or wait
- Status: PENDING

### September 2026: Phase 3 Evaluation 🔄
- Review: Pilot migration results
- Assess: Migration velocity and ROI
- Decide: Continue or adjust timeline
- Status: PENDING

### February 2027: Pages Router Sunset Decision 🔄
- Review: All migration phases
- Assess: Remaining Pages Router routes
- Decide: Remove Pages Router or maintain hybrid
- Status: PENDING

---

## Key Decisions & Rationale

### Why Hybrid Approach?

**Rationale (Nov 13, 2025):**
1. Solito 5.0.0 is only ~18 days old (too new for full migration)
2. 15 production routes in Pages Router are stable and working
3. Next.js 16 fully supports both routers coexisting
4. Migration risk outweighs immediate benefits
5. Gradual migration is safer than big-bang refactor

**Review Date:** February 2026

---

### Why Not Immediate Full Migration?

**Risk Factors:**
- Solito 5.0 stability unproven in production
- 15 routes × migration effort = significant development time
- Provider stack differences need resolution
- Testing effort across all routes
- Potential for unforeseen issues

**Mitigation:** Gradual migration with monitoring and rollback capability

---

## Monitoring Schedule

**Weekly (Nov 2025 - Jan 2026):**
- Solito 5.0 GitHub issues review
- Production error monitoring
- Performance metrics tracking
- Community sentiment assessment

**Monthly:**
- Comprehensive issue analysis
- Ecosystem compatibility check
- Alternative solutions research

**Quarterly:**
- Strategy review and adjustment
- Migration phase planning
- Documentation updates

---

## Resources

### External Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Solito Documentation](https://solito.dev)
- [Tamagui Documentation](https://tamagui.dev)
- [Supabase Documentation](https://supabase.com/docs)

### Internal Files
- `.claude/TAMAGUI-QUICK-REF.md` - Component reference
- `.claude/stack-versions.json` - Dependency versions
- `.claude/PROJECT_DEFAULTS.md` - Project standards
- `apps/next/next.config.js` - Next.js configuration
- `apps/next/app/layout.tsx` - App Router layout
- `apps/next/pages/_app.tsx` - Pages Router layout

### Monitoring Links
- [Solito GitHub](https://github.com/nandorojo/solito)
- [Solito Issues](https://github.com/nandorojo/solito/issues)
- [Solito Releases](https://github.com/nandorojo/solito/releases)
- [npm Downloads](https://npm-stat.com/charts.html?package=solito)

---

## Questions?

**Routing strategy:** See [Hybrid Router Strategy](HYBRID-ROUTER-STRATEGY-2025.md)

**Which router to use:** See [Router Selection Guide](ROUTER-SELECTION-GUIDE.md)

**Migration planning:** See [Migration Assessment Template](MIGRATION-ASSESSMENT-TEMPLATE.md)

**Stability concerns:** See [Solito 5.0 Monitoring](SOLITO-5-MONITORING-CHECKLIST.md)

**Technical setup:** See [Configuration Standards](CONFIGURATION-STANDARDS-NOV-2025.md)

---

## Document Updates

| Date       | Document                             | Change                                    |
|------------|--------------------------------------|-------------------------------------------|
| 2025-11-15 | SDK-ECOSYSTEM-2025.md                | Created - comprehensive SDK reference     |
| 2025-11-15 | README.md                            | Updated - added SDK ecosystem guide       |
| 2025-11-15 | ARCHITECTURE-GUIDE.md                | Created - complete starter explanation    |
| 2025-11-15 | SOLITO-5-MONITORING-CHECKLIST.md     | Updated - Week 1 monitoring complete      |
| 2025-11-15 | HYBRID-ROUTER-STRATEGY-2025.md       | Updated - corrected release dates         |
| 2025-11-13 | HYBRID-ROUTER-STRATEGY-2025.md       | Created - complete routing strategy       |
| 2025-11-13 | ROUTER-SELECTION-GUIDE.md            | Created - daily reference guide           |
| 2025-11-13 | MIGRATION-ASSESSMENT-TEMPLATE.md     | Created - route evaluation template       |
| 2025-11-13 | SOLITO-5-MONITORING-CHECKLIST.md     | Created - stability monitoring            |
| 2025-11-13 | CONFIGURATION-STANDARDS-NOV-2025.md  | Updated - added App Router section        |
| 2025-11-13 | README.md                            | Created - this index                      |

---

*This is a living documentation set. Update as the project evolves.*
