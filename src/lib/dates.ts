/**
 * Centralized date management for Avolve.io
 *
 * Modern best practices (Oct 2025):
 * - Build-time automation using environment variables
 * - Git commit dates as source of truth
 * - Single place to update dates
 * - Schema.org compliance
 */

/**
 * Get the build date from environment or fallback to compile time
 * This is set during the build process
 */
export const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString().split('T')[0];

/**
 * Format date for display
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date like "October 6, 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00'); // Ensure UTC date
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format date for schema.org
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns ISO 8601 date string
 */
export function formatSchemaDate(dateString: string): string {
  return dateString; // Already in YYYY-MM-DD format
}

/**
 * Page metadata dates
 * These represent when content was actually updated
 */
export const PAGE_DATES = {
  // Homepage and structure
  home: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },

  // Main sections
  solutions: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },
  systems: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },
  services: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },
  support: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },

  // Software pages (last actual content update)
  nodejs: {
    published: '2025-10-05',
    modified: '2025-10-06', // Node.js LTS context update
  },
  typescript: {
    published: '2025-10-05',
    modified: '2025-10-06',
  },
  react: {
    published: '2025-10-05',
    modified: '2025-10-05',
  },
  nextjs: {
    published: '2025-10-05',
    modified: '2025-10-06',
  },
  tailwind: {
    published: '2025-10-05',
    modified: '2025-10-06',
  },
  'shadcn-ui': {
    published: '2025-10-05',
    modified: '2025-10-06',
  },
  'vercel-ai-sdk': {
    published: '2025-10-05',
    modified: '2025-10-06',
  },
  supabase: {
    published: '2025-10-05',
    modified: '2025-10-06',
  },

  // About
  about: {
    published: '2025-10-05',
    modified: BUILD_DATE,
  },
} as const;

export type PageKey = keyof typeof PAGE_DATES;

/**
 * Get dates for a specific page
 */
export function getPageDates(page: PageKey) {
  return PAGE_DATES[page];
}

/**
 * Check if we should show "Last updated" date in UI
 * Best practice: Only show if content has been updated recently or it's meaningful to users
 */
export function shouldShowLastUpdated(page: PageKey): boolean {
  const { published, modified } = PAGE_DATES[page];

  // Show if modified date is different from published
  if (modified !== published) return true;

  // Show for software pages (version info is time-sensitive)
  const softwarePages: PageKey[] = ['nodejs', 'typescript', 'react', 'nextjs', 'tailwind', 'shadcn-ui', 'vercel-ai-sdk', 'supabase'];
  if (softwarePages.includes(page)) return true;

  // Don't show for other pages to reduce noise
  return false;
}
