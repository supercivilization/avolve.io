import { MetadataRoute } from 'next';
import { getFileModifiedDate } from '@/lib/file-stats';

/**
 * A+ 10/10 Sitemap (2025 Google Best Practices)
 * - Uses actual file modification dates (Google uses lastModified for crawl scheduling)
 * - Removes priority and changeFrequency (Google ignores these fields)
 * - Revalidates hourly to keep lastModified dates fresh
 *
 * Reference: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://avolve.io';

  return [
    {
      url: baseUrl,
      lastModified: getFileModifiedDate('src/app/page.tsx'),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: getFileModifiedDate('src/app/about/page.tsx'),
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: getFileModifiedDate('src/app/solutions/page.tsx'),
    },
    {
      url: `${baseUrl}/systems`,
      lastModified: getFileModifiedDate('src/app/systems/page.tsx'),
    },
    {
      url: `${baseUrl}/software`,
      lastModified: getFileModifiedDate('src/app/software/page.tsx'),
    },
    {
      url: `${baseUrl}/software/nextjs`,
      lastModified: getFileModifiedDate('src/app/software/nextjs/page.tsx'),
    },
    {
      url: `${baseUrl}/software/react`,
      lastModified: getFileModifiedDate('src/app/software/react/page.tsx'),
    },
    {
      url: `${baseUrl}/software/vercel-ai-sdk`,
      lastModified: getFileModifiedDate('src/app/software/vercel-ai-sdk/page.tsx'),
    },
    {
      url: `${baseUrl}/software/tailwind`,
      lastModified: getFileModifiedDate('src/app/software/tailwind/page.tsx'),
    },
    {
      url: `${baseUrl}/software/nodejs`,
      lastModified: getFileModifiedDate('src/app/software/nodejs/page.tsx'),
    },
    {
      url: `${baseUrl}/software/supabase`,
      lastModified: getFileModifiedDate('src/app/software/supabase/page.tsx'),
    },
    {
      url: `${baseUrl}/software/shadcn-ui`,
      lastModified: getFileModifiedDate('src/app/software/shadcn-ui/page.tsx'),
    },
    {
      url: `${baseUrl}/software/typescript`,
      lastModified: getFileModifiedDate('src/app/software/typescript/page.tsx'),
    },
    {
      url: `${baseUrl}/systems/mobile`,
      lastModified: getFileModifiedDate('src/app/systems/mobile/page.tsx'),
    },
    {
      url: `${baseUrl}/systems/email`,
      lastModified: getFileModifiedDate('src/app/systems/email/page.tsx'),
    },
    {
      url: `${baseUrl}/systems/social`,
      lastModified: getFileModifiedDate('src/app/systems/social/page.tsx'),
    },
    {
      url: `${baseUrl}/systems/search`,
      lastModified: getFileModifiedDate('src/app/systems/search/page.tsx'),
    },
    {
      url: `${baseUrl}/services/dataforseo`,
      lastModified: getFileModifiedDate('src/app/services/dataforseo/page.tsx'),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: getFileModifiedDate('src/app/services/page.tsx'),
    },
    {
      url: `${baseUrl}/support`,
      lastModified: getFileModifiedDate('src/app/support/page.tsx'),
    },
  ];
}

// Revalidate sitemap every hour to keep lastModified dates fresh
// This enables Incremental Static Regeneration (ISR) for the sitemap
export const revalidate = 3600;
