# Date Management System

**Created:** October 6, 2025
**Purpose:** Automated, maintainable date handling for static site builds

## Modern Best Practices (2025)

### What We Implemented

1. **Single Source of Truth** (`src/lib/dates.ts`)
   - Centralized date configuration
   - Per-page published/modified dates
   - Type-safe page keys
   - Helper functions for formatting

2. **Build-Time Automation** (`scripts/set-build-date.sh`)
   - Automatically sets `NEXT_PUBLIC_BUILD_DATE` on every build
   - No manual date updates needed
   - Runs via `prebuild` npm script

3. **Intelligent Display Logic**
   - Only show "Last updated" when meaningful to users
   - Software/version pages always show (time-sensitive)
   - Other pages only if modified ≠ published
   - Reduces UI noise

## How It Works

### 1. Build Process

```bash
npm run build
↓
prebuild script runs: bash scripts/set-build-date.sh
↓
Creates .env.production with: NEXT_PUBLIC_BUILD_DATE=2025-10-06
↓
Next.js build reads environment variable
↓
Date functions use BUILD_DATE as default
```

### 2. In Pages

```typescript
import { getPageDates, formatDate, formatSchemaDate } from "@/lib/dates";

const pageDates = getPageDates('home'); // Type-safe key

// Schema.org structured data
"datePublished": formatSchemaDate(pageDates.published),
"dateModified": formatSchemaDate(pageDates.modified),

// UI display
<time dateTime={pageDates.modified}>
  Last updated: {formatDate(pageDates.modified)}
</time>
```

### 3. Updating Dates

**When content actually changes:**

Edit `src/lib/dates.ts`:

```typescript
nodejs: {
  published: '2025-10-05',
  modified: '2025-10-06', // ← Update this when content changes
},
```

**For automatic build timestamp:**

```typescript
home: {
  published: '2025-10-05',
  modified: BUILD_DATE, // ← Auto-updates on every build
},
```

## Why This Approach?

### ✅ Advantages

1. **No manual updates** - Build date auto-generated
2. **Single source of truth** - One file to manage all dates
3. **Type safety** - TypeScript ensures valid page keys
4. **SEO compliant** - Proper Schema.org dateModified
5. **Verifiable** - Search engines trust consistent dates
6. **Meaningful** - Only show dates when helpful to users

### ❌ Avoid

1. **Hardcoded dates in every page** - Maintenance nightmare
2. **Always showing "Last updated"** - Adds noise
3. **Fake modification dates** - Search engines penalize
4. **Git commit dates for content** - Build dates ≠ content dates

## Schema.org Requirements

### datePublished
- First publication date
- **Rarely changes** - stays constant
- Format: `YYYY-MM-DD`

### dateModified
- Last content update
- **Changes when content updated**
- Format: `YYYY-MM-DD`
- **Must be ≥ datePublished**

### What Search Engines Care About

- **Accuracy** - Dates match actual updates
- **Consistency** - Same dates across sitemap/schema/HTML
- **Relevance** - Don't change dates without content changes

## File Reference

### Core Files

```
src/lib/dates.ts              # Central date configuration
scripts/set-build-date.sh     # Build date automation
.env.production               # Auto-generated (gitignored)
package.json                  # prebuild script
```

### Updated Files (Example)

```
src/app/page.tsx              # Homepage using new system
```

## Future Enhancements

### Git-Based Automation (Optional)

For even more automation, could use:

```bash
# Get last git commit date for a file
git log -1 --format=%cd --date=short src/app/page.tsx
# Output: 2025-10-06
```

### CMS Integration

If moving to headless CMS:
- CMS provides `updatedAt` timestamp
- Use that for `dateModified`
- Keep build-time automation as fallback

## Migration Guide

### Converting Existing Pages

**Before:**
```typescript
<time dateTime="2025-10-05">
  Last updated: October 5, 2025
</time>
```

**After:**
```typescript
import { getPageDates, formatDate } from "@/lib/dates";
const pageDates = getPageDates('nodejs');

<time dateTime={pageDates.modified}>
  Last updated: {formatDate(pageDates.modified)}
</time>
```

### Adding New Pages

1. Add entry to `PAGE_DATES` in `src/lib/dates.ts`
2. Use `getPageDates()` in page component
3. Apply to Schema.org and HTML `<time>` elements

## Deployment

### Vercel

- ✅ Works automatically
- `prebuild` runs before Next.js build
- Environment variable injected at build time

### Other Platforms

May need to manually run:
```bash
bash scripts/set-build-date.sh && npm run build
```

Or set `NEXT_PUBLIC_BUILD_DATE` in platform environment variables.

## Verification

### Check Build Date
```bash
cat .env.production
# NEXT_PUBLIC_BUILD_DATE=2025-10-06
```

### Check Page Output
```bash
curl https://avolve.io | grep dateModified
# Should show current date for pages using BUILD_DATE
```

### Check Type Safety
```bash
npm run build
# TypeScript will error if invalid page key used
```

## Summary

**Before:** 80 hardcoded dates across 24 files, manual updates, Oct 5/6 inconsistencies

**After:**
- One config file (`dates.ts`)
- Auto-generated build dates
- Type-safe page keys
- Consistent Schema.org dates
- Only show dates when meaningful

**Result:** Maintainable, accurate, SEO-compliant date management ✅
