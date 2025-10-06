# Version Audit & Corrections - October 6, 2025

## Verified Versions (Source of Truth)

Based on parallel agent research completed October 6, 2025:

| Technology | CORRECT Version | Currently On Site | Status |
|------------|----------------|-------------------|---------|
| **Node.js** | 22.20.0 LTS (recommend)<br/>24.9.0 (becomes LTS Oct 28) | 24.8.0 | ❌ UPDATE |
| **TypeScript** | 5.9.3 | 5.9.2 | ❌ UPDATE |
| **React** | 19.2.0 | 19.2.0 | ✅ CORRECT |
| **Next.js** | 15.5.4 (stable per research) | 15.5.5 | ⚠️ VERIFY (conflicting data) |
| **Tailwind CSS** | 4.1.14 | 4.1.13 | ❌ UPDATE |
| **shadcn/ui** | 3.4.0, 58 components | 3.3.1 | ❌ UPDATE |
| **Vercel AI SDK** | 5.0.60 | 5.0.48 | ❌ UPDATE |
| **Claude Sonnet 4.5** | claude-sonnet-4-5-20250929 | Correct | ✅ CORRECT |
| **Supabase** | PostgreSQL 15.8 (not 17!)<br/>pgvector 0.8.0<br/>supabase-js 2.58.0 | PostgreSQL 17 mentioned | ❌ UPDATE |
| **@supabase/ssr** | 0.7.0 (beta) | 0.7.1 | ⚠️ VERIFY |

## Critical Corrections Needed

### 1. Node.js - MAJOR CORRECTION REQUIRED

**Current (WRONG):** "Node.js 24.8.0"
**Correct:** "Node.js 22.20.0 LTS (production) or 24.9.0 (pre-LTS, becomes LTS Oct 28)"

**Reason:**
- 24.8.0 is outdated (Sep 10, 2025 release)
- 24.9.0 released Sep 25, 2025
- **22.20.0 is recommended for production until Oct 28**
- Must clarify LTS vs Current status

**Impact:** HIGH - Affects nodejs page, all schema.org metadata, pathway pages

### 2. TypeScript - MINOR UPDATE

**Current:** "TypeScript 5.9.2"
**Correct:** "TypeScript 5.9.3"

**Released:** October 1, 2025 (5 days ago)

**Impact:** MEDIUM - Affects software pages, schema metadata

### 3. Tailwind CSS - MINOR UPDATE

**Current:** "Tailwind CSS 4.1.13"
**Correct:** "Tailwind CSS 4.1.14"

**Released:** October 1, 2025

**Impact:** LOW - Minor patch update

### 4. shadcn/ui - MINOR UPDATE

**Current:** "shadcn/ui 3.3.1"
**Correct:** "shadcn/ui 3.4.0 (58 components)"

**Released:** October 5, 2025 (yesterday)

**Impact:** MEDIUM - CLI version update, component count

### 5. Vercel AI SDK - PATCH UPDATE

**Current:** "Vercel AI SDK 5.0.48"
**Correct:** "Vercel AI SDK 5.0.60"

**Impact:** LOW - Patch version

### 6. Supabase PostgreSQL - CRITICAL CORRECTION

**Current (WRONG):** "PostgreSQL 17"
**Correct:** "PostgreSQL 15.8 (default production), 17 in development"

**Reason:**
- PostgreSQL 15.8 is the CURRENT DEFAULT for production
- PostgreSQL 17 is in development, not yet default
- CLI uses 17 (local dev), production uses 15.8

**Impact:** HIGH - Major factual error, affects architecture decisions

### 7. Next.js - VERIFY CONFLICTING DATA

**Research said:** 15.5.4 (August 18, 2025)
**Site shows:** 15.5.5

**Action:** Need to verify which is actually latest stable

**Impact:** LOW if 15.5.5 exists, MEDIUM if we're claiming unreleased version

## Honesty & Accuracy Issues

### Issue 1: Claiming "Latest" When Not Latest

Example: "Node.js 24.8.0" when 24.9.0 exists

**Fix:** Always state "as of [date]" for version claims

### Issue 2: PostgreSQL 17 Not Production Default

**Current claim:** Site suggests PostgreSQL 17 is current
**Reality:** PostgreSQL 15.8 is production default

**Fix:** Clarify "PostgreSQL 15.8 (production), 17 (in development)"

### Issue 3: LTS vs Current Confusion

**Current:** Recommending Node.js 24.8.0 without LTS context
**Reality:** 22.20.0 is LTS until Oct 28, 24.x becomes LTS Oct 28

**Fix:** Always clarify LTS status for production recommendations

## Files Requiring Updates

### Homepage (src/app/page.tsx)
- [ ] Update Node.js version in dependencies comment (line 7)
- [ ] Update TypeScript version (line 10)
- [ ] Update Tailwind version (lines 41, 62)
- [ ] Update shadcn/ui version (lines 42, 63)
- [ ] Update Vercel AI SDK version (line 64)
- [ ] Update schema.org metadata versions (lines 37-66)
- [ ] Verify Next.js 15.5.5 vs 15.5.4

### Software Pillar Pages

**nodejs/page.tsx:**
- [ ] Update from 24.8.0 to 24.9.0 throughout
- [ ] Add LTS context (22.20.0 LTS recommended until Oct 28)
- [ ] Update release date from Sep 10 to Sep 25, 2025
- [ ] Clarify native TypeScript status (RC, not stable)

**typescript/page.tsx:**
- [ ] Update from 5.9.2 to 5.9.3
- [ ] Update Node.js reference from 24.8.0 to 22.20.0 LTS

**react/page.tsx:**
- [ ] Verify React 19.2.0 is correct (✅ YES)
- [ ] Update Next.js reference if needed
- [ ] Update TypeScript from 5.9.2 to 5.9.3

**nextjs/page.tsx:**
- [ ] Verify 15.5.5 vs 15.5.4
- [ ] Update Node.js from 24.8.0
- [ ] Update dependencies

**tailwind/page.tsx:**
- [ ] Update from 4.1.13 to 4.1.14
- [ ] Verify all version references

**shadcn-ui/page.tsx:**
- [ ] Update from 3.3.1 to 3.4.0
- [ ] Update component count to 58
- [ ] Update release date info

**supabase/page.tsx:**
- [ ] CRITICAL: Change from PostgreSQL 17 to 15.8
- [ ] Add note: "PostgreSQL 17 in development, 15.8 current"
- [ ] Update pgvector to 0.8.0 (verify current claim)
- [ ] Update supabase-js to 2.58.0

**vercel-ai-sdk/page.tsx:**
- [ ] Update from 5.0.48 to 5.0.60

### Pathway Pages

**react-to-production/page.tsx:**
- [ ] Update all version references
- [ ] Verify dependency chain accuracy

**type-safe-stack/page.tsx:**
- [ ] Update TypeScript to 5.9.3
- [ ] Update Supabase PostgreSQL reference

**ai-enabled-stack/page.tsx:**
- [ ] Update Vercel AI SDK to 5.0.60
- [ ] Verify Claude Sonnet 4.5 reference (✅ correct)

### Systems/Solutions/Services Pages

- [ ] Check all version references
- [ ] Update any outdated claims

## Verification Strategy

1. **Use tech-stack-versions-oct-2025.md as source of truth**
2. **For Next.js 15.5.4 vs 15.5.5:** Research again if needed
3. **For @supabase/ssr 0.7.0 vs 0.7.1:** Verify npm registry
4. **All updates must include "verified October 2025" context**

## Production Recommendation Philosophy

**ALWAYS recommend:**
- LTS versions for production (Node.js 22.20.0)
- Stable releases over pre-releases
- Clear migration timelines

**NEVER recommend:**
- Pre-LTS without context (Node.js 24.x before Oct 28)
- Beta/RC for production without warnings
- Vague "latest" claims without dates

## Update Priority

1. **HIGH:** Node.js LTS context, Supabase PostgreSQL 15.8
2. **MEDIUM:** TypeScript 5.9.3, shadcn/ui 3.4.0
3. **LOW:** Tailwind 4.1.14, Vercel AI SDK 5.0.60

---

**Audit Date:** October 6, 2025
**Next Action:** Systematically update all files per this checklist
