# Zod 4 Migration Options for Form Libraries

**Date:** November 15, 2025
**Context:** Exploring alternatives to `@ts-react/form` for Zod 4.x compatibility

---

## Current Situation

**Current Library:** `@ts-react/form` 1.8.3
- **Last Updated:** September 8, 2023 (2+ years old, appears unmaintained)
- **Zod Support:** `^3.19.0` only (hardcoded peer dependency)
- **Status:** 🔴 No Zod 4.x support, no updates since Sept 2023

**What it provides:**
- Auto-generates forms from Zod schemas
- Built on React Hook Form + @hookform/resolvers
- Type-safe form field mapping
- Reduces boilerplate for schema-driven forms

---

## ✅ Recommended Alternative: @autoform

**Package:** `@autoform/react` + `@autoform/zod`

### Key Information

**@autoform/zod 5.0.0:**
- **Released:** August 15, 2025 (3 months ago)
- **Zod Support:** `^3.25.0 || ^4.0.0` ✅ **SUPPORTS ZOD 4!**
- **Status:** 🟢 Actively maintained, recent updates
- **Repository:** https://github.com/vantezzen/autoform

**@autoform/react 4.0.0:**
- **Released:** June 26, 2025
- **React Support:** `^16.8.0 || ^17 || ^18 || ^19`
- **React Hook Form:** `^7` (same as current setup)
- **@hookform/resolvers:** `^3.9.0`

### Benefits

✅ **Zod 4 Support** - Can use Zod 4.x with 14x parsing performance
✅ **Actively Maintained** - Regular updates throughout 2025
✅ **Modern React Support** - React 19 compatible
✅ **Same Foundation** - Built on React Hook Form (no major paradigm shift)
✅ **Multiple UI Libraries** - Has integrations for MUI, shadcn, etc.

### Migration Effort

**Current Usage Pattern:**
```typescript
// @ts-react/form
import { createTsForm } from '@ts-react/form'

const mapping = [
  [formFields.text, TextField],
  [formFields.textarea, TextAreaField],
  // ...
] as const

const SchemaForm = createTsForm(mapping)
```

**New Pattern (Estimated):**
```typescript
// @autoform/react + @autoform/zod
import { AutoForm } from '@autoform/react'
import { zodAdapter } from '@autoform/zod'

// Similar mapping approach but with Zod 4 support
```

**Files to Update:**
- `packages/app/utils/SchemaForm.tsx` (main wrapper)
- Any files importing `SchemaForm` (~5-10 files)

**Estimated Effort:** 4-6 hours
- 2 hours: Update SchemaForm wrapper
- 2 hours: Test all forms
- 1-2 hours: Fix edge cases

---

## Alternative Options

### Option 2: Direct React Hook Form + @hookform/resolvers

**Status:** ⚠️ Partial Zod 4 support

**Findings (Nov 2025):**
- React Hook Form's `zodResolver` has compatibility issues with Zod 4
- GitHub Issues:
  - #12829: Feature request for Zod v4 support (May 19, 2025)
  - #12816: ZodError thrown instead of captured
  - #4992: "Zod 4 no longer working with hookform/resolvers"

**Workarounds:**
- Import from `zod/v4` (limited success)
- Revert to Zod v3 (current approach)

**Recommendation:** 🔴 Wait for official Zod 4 support

### Option 3: Alternative Validation Libraries

**Options researched:**
- **ArkType** - Faster than Zod, works with React Hook Form
- **Valibot** - Extremely lightweight (saved 40kB for some users)
- **Yup** - Older, stable, but different API

**Recommendation:** 🟡 Consider for new projects, not worth migration effort

---

## ⚠️ CRITICAL UPDATE: Universal App Compatibility

**IMPORTANT:** After thorough research, **@autoform is NOT compatible with React Native/Tamagui.**

@autoform only supports web-based UI libraries (shadcn/ui, Material UI, Mantine). Since this project is a **universal app** (web + native), @autoform would break the React Native mobile app.

## Recommended Path Forward

### ✅ BEST OPTION: Stay with Current Setup

**Keep @ts-react/form + Zod 3.25.76**

**Rationale:**
1. ✅ **Universal support** - Works on web + React Native with Tamagui
2. ✅ **Stable and tested** - 10+ forms working perfectly in production
3. ✅ **Auto-generation** - Reduces boilerplate, maintains productivity
4. ✅ **Recent upgrade** - Already upgraded from 3.22.2 → 3.25.76
5. ✅ **Zero risk** - No migration effort or breaking changes

**Trade-offs accepted:**
- ❌ Miss Zod 4's 14x parsing performance (acceptable)
- ❌ Using unmaintained library (but stable and working)

### Alternative: Custom Solution (NOT Recommended)

**Only consider if Zod 4 performance is absolutely critical:**

1. **Build custom wrapper** around React Hook Form
2. **Handle Zod 4 compatibility** issues manually
3. **Maintain solution** yourself going forward

**Estimated Effort:** 4-6 weeks + ongoing maintenance

**Why not recommended:**
- High effort for marginal performance gain
- React Hook Form still has Zod 4 compatibility issues
- Would lose auto-generation benefits
- No universal auto-generation alternative exists

---

## Decision Matrix

| Criteria | @ts-react/form (Current) | @autoform/react | React Hook Form Direct |
|----------|-------------------------|-----------------|------------------------|
| Zod 4 Support | ❌ No | ✅ Yes | ⚠️ Partial |
| Actively Maintained | ❌ No (2023) | ✅ Yes (2025) | ✅ Yes |
| Migration Effort | N/A | 🟡 Medium | 🔴 High |
| Performance | Good | Good+ (Zod 4) | Good+ (Zod 4) |
| Type Safety | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| Boilerplate | ✅ Minimal | ✅ Minimal | 🔴 More verbose |

---

## Immediate Actions (Nov 15, 2025)

### Option A: Stay on Zod 3.x (Current Choice)
- ✅ Zero migration risk
- ✅ Everything works today
- ❌ Miss out on 14x Zod 4 performance
- ❌ Using unmaintained form library

**Best for:** Stability-focused, low-risk approach

### Option B: Migrate to @autoform + Zod 4
- ✅ Access Zod 4 performance (14x faster)
- ✅ Modern, maintained libraries
- ❌ 3-4 weeks migration effort
- ❌ Testing overhead

**Best for:** Performance-focused, future-proof approach

---

## ✅ Final Recommendation (November 15, 2025)

**Stay on Zod 3.25.76 + @ts-react/form indefinitely**

**Reason:** No viable universal (web + native) alternative exists with auto-generation and Zod 4 support.

**Action Items:**
- ✅ Keep current setup (upgraded packages completed)
- ✅ Monitor ecosystem for universal auto-generation solutions
- ✅ Revisit if/when a Tamagui-compatible alternative emerges

**Future Review:** Only if a maintained universal form auto-generation library appears

---

## Resources

**@autoform:**
- GitHub: https://github.com/vantezzen/autoform
- npm: https://www.npmjs.com/package/@autoform/react
- Zod adapter: https://www.npmjs.com/package/@autoform/zod

**Zod 4:**
- GitHub: https://github.com/colinhacks/zod
- Changelog: https://github.com/colinhacks/zod/releases

**React Hook Form:**
- Zod 4 Support Issue: https://github.com/react-hook-form/resolvers/issues/768

---

**Last Updated:** November 15, 2025
**Next Review:** January 2026 (POC planning)
