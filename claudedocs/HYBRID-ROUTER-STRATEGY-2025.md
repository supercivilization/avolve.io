# Hybrid Router Strategy - Pages + App Router Coexistence

**Last Updated:** November 15, 2025
**Status:** Active Strategy
**Review Date:** February 2026 (90 days post Solito 5.0 release)

---

## Executive Summary

This project uses a **hybrid routing approach** with both Pages Router (legacy, stable) and App Router (modern, emerging) coexisting in the same Next.js 16 application.

**Current State:**
- **Pages Router:** 15 production routes (stable, battle-tested)
- **App Router:** 3 routes (/admin/errors, /api/trpc, /_not-found)
- **Solito:** 5.0.0 (App Router support added October 2025)
- **Next.js:** 16.0.1 (both routers fully supported)

**Strategy:** Use Pages Router for existing routes, App Router for new features, gradual migration over 2026.

---

## Router Selection Guidelines

### When to Use Pages Router

**Use Pages Router (`/pages`) for:**

✅ **Existing routes** - All 15 current production routes stay in Pages Router
✅ **Quick bug fixes** - Don't refactor router while fixing bugs
✅ **Proven patterns** - Routes using patterns not yet validated in App Router
✅ **Third-party integrations** - Libraries expecting Pages Router API

**Example:**
```
/pages/sign-in.tsx          ← Keep in Pages Router
/pages/profile/edit.tsx     ← Keep in Pages Router
/pages/settings/general.tsx ← Keep in Pages Router
```

---

### When to Use App Router

**Use App Router (`/app`) for:**

✅ **New features** - All new routes should default to App Router
✅ **Admin features** - Internal tools, dashboards, admin panels
✅ **Data-heavy pages** - Benefit from Server Components & streaming
✅ **Modern patterns** - Layouts, parallel routes, intercepting routes
✅ **API routes** - Modern edge functions and API design

**Example:**
```
/app/admin/analytics/page.tsx    ← New admin feature
/app/api/webhooks/stripe/route.ts ← New API endpoint
/app/dashboard/page.tsx          ← New user dashboard
```

---

## Technical Differences

### Pages Router Configuration

**Location:** `/pages`
**Provider:** Full provider stack with Solito router context
**Navigation:** `solito/router` hooks
**Layout:** `_app.tsx` + `_document.tsx`

**Example:**
```typescript
// pages/profile.tsx
import { useRouter } from 'solito/router'

export default function ProfilePage() {
  const router = useRouter()
  // Uses Pages Router navigation
}
```

---

### App Router Configuration

**Location:** `/app`
**Provider:** Simplified stack (no router-dependent providers)
**Navigation:** `solito/navigation` hooks (NOT `solito/router`)
**Layout:** `layout.tsx` with `skipNextHead`

**Example:**
```typescript
// app/dashboard/page.tsx
'use client'
import { useRouter } from 'solito/navigation' // NOTE: /navigation not /router

export default function DashboardPage() {
  const router = useRouter()
  // Uses App Router navigation
}
```

**Critical:** App Router MUST use `solito/navigation`, NOT `solito/router`

---

## Migration Strategy

### Phase 1: Stabilization (Nov 2025 - Jan 2026)

**Goal:** Validate Solito 5.0 stability in production

**Actions:**
- ✅ Enable App Router support (COMPLETE)
- ✅ Build new features in App Router only
- 🔄 Monitor Solito 5.0 GitHub issues
- 🔄 Track production stability metrics
- 🔄 Document any App Router issues encountered

**Success Criteria:**
- Zero critical bugs in App Router routes
- Solito 5.0 adoption increasing in community
- Performance metrics meet or exceed Pages Router

---

### Phase 2: Pilot Migration (Feb 2026 - Mar 2026)

**Goal:** Migrate 2-3 low-risk routes to App Router

**Candidate Routes (in priority order):**

1. **`/admin-errors`** - Admin-only, low traffic, easy to validate
   - Migration effort: Low
   - Risk: Low
   - Benefit: Consolidate with `/app/admin/errors`

2. **`/settings/general`** - Simple settings page
   - Migration effort: Low
   - Risk: Low
   - Benefit: Test Server Components for settings data

3. **`/privacy-policy`** - Static content page
   - Migration effort: Very Low
   - Risk: Very Low
   - Benefit: Perfect RSC use case

**Actions:**
- Create migration checklist for each route
- Migrate one route at a time
- A/B test if possible (gradual rollout)
- Monitor error rates and performance
- Document lessons learned

---

### Phase 3: Systematic Migration (Apr 2026 - Sep 2026)

**Goal:** Migrate remaining routes based on ROI

**Prioritization Matrix:**

| Route                  | Benefit | Effort | Risk | Priority |
|------------------------|---------|--------|------|----------|
| /privacy-policy        | Low     | Low    | Low  | High     |
| /terms-of-service      | Low     | Low    | Low  | High     |
| /settings/general      | Medium  | Low    | Low  | High     |
| /admin-errors          | Medium  | Low    | Low  | High     |
| /profile               | Medium  | Medium | Med  | Medium   |
| /settings/*            | Medium  | Medium | Med  | Medium   |
| /sign-in               | High    | High   | High | Low*     |
| /sign-up               | High    | High   | High | Low*     |
| /reset-password        | Medium  | High   | High | Low*     |

*Auth routes are high-risk, migrate last after all others proven stable

**Actions:**
- Migrate High Priority routes first (low-hanging fruit)
- Skip Medium Priority unless refactoring anyway
- Defer Low Priority (auth routes) until Q3-Q4 2026
- Continuous monitoring and rollback capability

---

### Phase 4: Completion (Oct 2026+)

**Goal:** All routes in App Router, remove Pages Router

**Actions:**
- Migrate remaining auth routes (highest risk)
- Remove `/pages` directory
- Simplify provider stack (use full stack in App Router)
- Update all documentation
- Remove Pages Router dependencies

**Decision Point:** Evaluate in September 2026 whether to complete migration or maintain hybrid indefinitely

---

## Development Workflow

### Creating a New Route

**Step 1:** Determine which router to use

```bash
# New feature? → Use App Router
mkdir -p app/new-feature
touch app/new-feature/page.tsx

# Bug fix to existing? → Use current router
# Edit pages/existing-route.tsx
```

**Step 2:** Use correct navigation hooks

```typescript
// App Router (NEW)
import { useRouter } from 'solito/navigation'
import { Link } from 'solito/link'

// Pages Router (EXISTING)
import { useRouter } from 'solito/router'
import { Link } from 'solito/link'
```

**Step 3:** Follow router-specific patterns

**App Router:**
- File-based routing with folders
- Use `page.tsx` for routes
- Use `layout.tsx` for layouts
- Server Components by default, add `'use client'` when needed

**Pages Router:**
- File-based routing with files
- Use `route-name.tsx` directly
- Use `_app.tsx` for global layout
- Client-side by default

---

## Testing Strategy

### App Router Tests

**Requirements:**
- Test Server Components separately from Client Components
- Mock `solito/navigation` (NOT `solito/router`)
- Test data fetching in Server Components
- Validate error boundaries

**Example:**
```typescript
// app/dashboard/__tests__/page.test.tsx
import { render } from '@testing-library/react'

jest.mock('solito/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}))

describe('Dashboard Page (App Router)', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DashboardPage />)
    expect(getByText('Dashboard')).toBeInTheDocument()
  })
})
```

---

### Pages Router Tests

**Requirements:**
- Mock `solito/router` (NOT `solito/navigation`)
- Test client-side rendering
- Validate page-level getServerSideProps/getStaticProps

**Example:**
```typescript
// pages/__tests__/profile.test.tsx
jest.mock('solito/router', () => ({
  useRouter: () => ({ push: jest.fn() })
}))
```

---

## Monitoring & Success Metrics

### Solito 5.0 Stability Monitoring

**Weekly Checks (Nov 2025 - Jan 2026):**
- [ ] Review [Solito GitHub Issues](https://github.com/nandorojo/solito/issues)
- [ ] Check for App Router-related bug reports
- [ ] Monitor community adoption (npm downloads, discussions)
- [ ] Track any production errors in our App Router routes

**Red Flags:**
- Critical bugs in Solito 5.0 App Router support
- Frequent breaking changes in minor versions
- Lack of community adoption/validation
- Performance degradation vs Pages Router

**Green Flags:**
- Stable releases without critical bugs
- Increasing community adoption
- Positive performance benchmarks
- Active maintenance and bug fixes

---

### Performance Metrics

**Track for both routers:**
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Bundle size impact

**Goal:** App Router routes should match or exceed Pages Router performance

---

## Troubleshooting

### Common Issues

**Issue:** "NextRouter was not mounted" in App Router

**Solution:** You're using `solito/router` instead of `solito/navigation`
```typescript
// ❌ Wrong (App Router)
import { useRouter } from 'solito/router'

// ✅ Correct (App Router)
import { useRouter } from 'solito/navigation'
```

---

**Issue:** Providers not working in App Router

**Solution:** App Router layout needs simplified providers (no router-dependent code)
```typescript
// ✅ Correct App Router layout
<NextThemeProvider skipNextHead>
  <TamaguiProvider>{children}</TamaguiProvider>
</NextThemeProvider>

// ❌ Wrong - full Provider includes router code
<Provider>{children}</Provider>
```

---

**Issue:** CSS not loading in App Router

**Solution:** Add `<link rel="stylesheet" href="/tamagui.css" />` to `app/layout.tsx`

---

## Decision Log

### November 13, 2025: Hybrid Strategy Adopted

**Decision:** Maintain both Pages Router and App Router

**Rationale:**
- Solito 5.0 is only 25 days old (released October 21, 2025)
- Released same day as Next.js 16 (coordinated release)
- Solito 5.0 is BREAKING CHANGE (dropped react-native-web)
- 15 production routes working perfectly in Pages Router
- Migration risk outweighs immediate benefits
- Next.js 16 fully supports both routers coexisting
- Gradual migration is lower risk than big-bang refactor

**Review Date:** February 2026 (90+ days post-release)

**Update November 15, 2025:**
- Research confirms: No critical blockers found
- Tamagui React 19 compatibility issue (3582) resolved
- Our production builds: 0 errors, all routes optimized
- Recommendation: Continue monitoring, maintain hybrid approach

---

## Resources

**Documentation:**
- [Next.js 16 App Router Docs](https://nextjs.org/docs/app)
- [Solito 5.0 Navigation](https://solito.dev/navigation)
- [Tamagui Next.js Setup](https://tamagui.dev/docs/guides/next-js)

**Internal Docs:**
- `CONFIGURATION-STANDARDS-NOV-2025.md` - Technical configuration
- `TAMAGUI-QUICK-REF.md` - Component and styling reference
- `.claude/stack-versions.json` - Current versions

**Monitoring:**
- [Solito GitHub Issues](https://github.com/nandorojo/solito/issues)
- [Solito Releases](https://github.com/nandorojo/solito/releases)
- [Next.js 16 Status](https://github.com/vercel/next.js/releases)

---

## Questions & Contact

**For architectural questions:** Review this document first
**For implementation help:** Check `CONFIGURATION-STANDARDS-NOV-2025.md`
**For urgent issues:** Check troubleshooting section above

---

*This is a living document. Update as strategy evolves.*
