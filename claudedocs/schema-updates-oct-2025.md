# Schema.org Updates - October 2025

**Date**: October 6, 2025
**Status**: Phase 1 Complete (Foundation)
**Next**: Phase 2 (Individual Page Updates)

## Objective

Align Avolve.io structured data with Joshua Seymour's personal site schema patterns to create consistent, authoritative entity relationships across the web presence.

## Completed Changes

### 1. Root Layout Schema Enhancement (`src/app/layout.tsx`)

**Updated WebSite Entity:**
- ✅ Changed description to match personal site: "A knowledge graph for the modern web stack..."
- ✅ Added `creator` field referencing Joshua Seymour
- ✅ Added `codeRepository`: "https://github.com/supercivilization/avolve.io"
- ✅ Updated `dateModified` to 2025-10-06
- ✅ Updated software versions to current (Next.js 15.5.4, TypeScript 5.9.3, Node.js 22.20.0 LTS)
- ✅ Added "AI-native development" to keywords

**Enhanced Organization Entity (Supercivilization):**
- ✅ Added `slogan`: "Vivify Further, Unify Faster, Thrive Forever"
- ✅ Added detailed `description` from personal site
- ✅ Added `founder` relationship to Joshua Seymour

**Enhanced Person Entity (Joshua Seymour):**
- ✅ Added `alternateName`: "Josh Seymour"
- ✅ Added `givenName` and `familyName`
- ✅ Added `image` object with profile photo reference
- ✅ Added comprehensive `description` mentioning Avolve.io
- ✅ Added `email`: admin@joshuaseymour.com
- ✅ Added `foundedOrganization` relationship
- ✅ Added `hasOccupation` array with occupation categories
- ✅ Expanded `knowsAbout` array with Avolve.io-specific topics
- ✅ Added complete `sameAs` array with all social profiles:
  - YouTube, GitHub, TikTok, Substack, X (Twitter), Telegram, Instagram

### 2. BreadcrumbSchema Component Enhancement (`src/components/breadcrumb-schema.tsx`)

**New Features:**
- ✅ Added `asGraphNode` prop for embedding in @graph structures
- ✅ Added `id` prop for optional @id specification
- ✅ Created `getBreadcrumbData()` helper function for programmatic use
- ✅ Maintained backward compatibility with existing usage

**Usage Patterns:**
```tsx
// Standalone (existing pattern)
<BreadcrumbSchema items={[...]} />

// Embedded in @graph (new pattern)
<BreadcrumbSchema items={[...]} asGraphNode />

// Programmatic (new pattern)
const breadcrumbData = getBreadcrumbData(items, 'https://avolve.io/software#breadcrumb');
```

### 3. Shared Schema Constants (`src/lib/schema.ts`)

**Created centralized schema definitions:**
- ✅ `SCHEMA_IDS` - Canonical @id references for all entities
- ✅ `personSchema` - Complete Joshua Seymour entity definition
- ✅ `organizationSchema` - Complete Supercivilization entity definition
- ✅ `authorRef`, `publisherRef`, `websiteRef` - Quick reference helpers
- ✅ `getSchemaDate()` - Helper for consistent date formatting
- ✅ `LAST_VERIFIED_DATE` - Current verification timestamp

**Benefits:**
- Single source of truth for entity data
- Prevents @id reference inconsistencies
- Makes updates easier (change once, apply everywhere)
- Type-safe with TypeScript

## Schema Relationships

```
Joshua Seymour (Person)
  └─ foundedOrganization ─→ Supercivilization (Organization)
  └─ worksFor ─→ Supercivilization (Organization)
  └─ creator of ─→ Avolve.io (WebSite)

Supercivilization (Organization)
  └─ founder ─→ Joshua Seymour (Person)
  └─ publisher of ─→ Avolve.io (WebSite)

Avolve.io (WebSite)
  └─ creator ─→ Joshua Seymour (Person)
  └─ publisher ─→ Supercivilization (Organization)
  └─ codeRepository ─→ GitHub repo
```

## Consistency Verification

**@id References Across Codebase:**
- ✅ Person: `https://www.joshuaseymour.com/#person` (48 references)
- ✅ Organization: `https://www.supercivilization.xyz/#organization` (47 references)
- ✅ WebSite: `https://avolve.io/#website` (12 references)

All references are consistent. No mixed or incorrect @id usage found.

## Schema Type Decisions

### WebSite vs WebApplication
**Decision**: WebSite
**Rationale**:
- Avolve.io is a knowledge graph/reference site
- Primary purpose is information delivery, not interactive application functionality
- WebSite schema better represents documentation/reference sites
- Aligns with how similar sites (MDN, Stack Overflow) are structured

### Person Schema Completeness
**Decision**: Include full social profiles and occupation data
**Rationale**:
- Matches personal site schema for consistency
- Provides authority signals for search engines
- Enables better knowledge graph integration
- Helps AI assistants understand expertise and credibility

## Next Steps (Phase 2)

### Individual Page Updates
1. **Homepage** (`src/app/page.tsx`)
   - Import and use shared schema constants
   - Update dateModified to 2025-10-06
   - Ensure consistent version numbers

2. **Software Pages** (`src/app/software/*.tsx`)
   - Standardize TechArticle schema structure
   - Use `authorRef` and `publisherRef` from constants
   - Add consistent `about` references to SoftwareApplication entities

3. **Systems Pages** (`src/app/systems/*.tsx`)
   - Update HowTo schemas with consistent author/publisher
   - Add isPartOf references to website entity

4. **Services Pages** (`src/app/services/*.tsx`)
   - Standardize product/service schemas
   - Ensure consistent entity references

5. **About Page** (`src/app/about/page.tsx`)
   - Already has good Person/Organization detail
   - Verify consistency with new shared constants

### Validation & Testing
6. **Consistency Check**
   - Grep for all author/publisher references
   - Verify they use SCHEMA_IDS constants or proper @id format

7. **Schema Validation**
   - Test with Google Rich Results Test
   - Test with schema.org validator
   - Check AI assistant citation accuracy

## Files Modified

1. ✅ `src/app/layout.tsx` - Root schema definitions
2. ✅ `src/components/breadcrumb-schema.tsx` - Enhanced component
3. ✅ `src/lib/schema.ts` - New shared constants file
4. ✅ `claudedocs/schema-updates-oct-2025.md` - This documentation

## Impact Assessment

**SEO Impact:**
- ✅ Enhanced entity relationships improve knowledge graph integration
- ✅ Complete Person schema improves E-E-A-T signals
- ✅ Organization slogan and description add context
- ✅ Social profile links strengthen authority

**AI Assistant Impact:**
- ✅ Consistent @id references enable better entity resolution
- ✅ Complete knowledge graph helps AI understand expertise
- ✅ Structured occupation data clarifies qualifications
- ✅ Email and social links provide verification paths

**Maintenance Impact:**
- ✅ Shared constants reduce duplication
- ✅ Single source of truth prevents drift
- ✅ Type safety catches errors early
- ✅ Easier to update versions and dates

## Rollback Plan

If issues arise:
1. Git revert to commit before schema updates
2. All changes are additive/enhancement only
3. No breaking changes to existing functionality
4. Individual page updates can be reverted independently

## Verification Commands

```bash
# Find all @id references
grep -r "@id.*person\|@id.*organization\|@id.*website" src/app

# Count entity references
grep -ro "@id.*joshuaseymour.com/#person" src/ | wc -l
grep -ro "@id.*supercivilization.xyz/#organization" src/ | wc -l
grep -ro "@id.*avolve.io/#website" src/ | wc -l

# Check for schema import usage
grep -r "from '@/lib/schema'" src/app

# Validate JSON structure
node -e "console.log(JSON.stringify(require('./src/lib/schema.ts')))"
```

## Notes

- All changes maintain backward compatibility
- Existing pages continue to work without modification
- Phase 2 can proceed incrementally (page by page)
- Schema constants can be imported gradually
- No production downtime required

---

**Prepared by**: Claude Code
**Reviewed by**: Joshua Seymour
**Status**: Phase 1 Complete, Ready for Phase 2
