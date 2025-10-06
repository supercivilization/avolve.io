/**
 * Shared Schema.org constants and entity definitions
 * Ensures consistent @id references and entity data across all pages
 * Last updated: 2025-10-06
 */

// Entity IDs (canonical references)
export const SCHEMA_IDS = {
  website: 'https://avolve.io/#website',
  person: 'https://www.joshuaseymour.com/#person',
  organization: 'https://www.supercivilization.xyz/#organization',
} as const;

// Person entity (Joshua Seymour)
export const personSchema = {
  "@type": "Person",
  "@id": SCHEMA_IDS.person,
  "name": "Joshua Seymour",
  "alternateName": "Josh Seymour",
  "givenName": "Joshua",
  "familyName": "Seymour",
  "url": "https://www.joshuaseymour.com",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.joshuaseymour.com/profile.png",
    "width": "1200",
    "height": "1200",
    "caption": "Joshua Seymour - Founder of Supercivilization, Creator of Avolve.io"
  },
  "description": "Founder of Supercivilization. Creator of Avolve.io — AI-native knowledge graph for modern web development stack compatibility",
  "jobTitle": "Founder",
  "email": "admin@joshuaseymour.com",
  "foundedOrganization": {
    "@id": SCHEMA_IDS.organization
  },
  "worksFor": {
    "@id": SCHEMA_IDS.organization
  },
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Entrepreneur",
      "occupationalCategory": "11-0000"
    },
    {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationalCategory": "15-1252.00"
    }
  ],
  "knowsAbout": [
    "AI-native applications",
    "Supercivilization",
    "Avolve.io",
    "Next.js",
    "React",
    "TypeScript",
    "Vercel AI SDK",
    "Supabase",
    "shadcn/ui",
    "Web Development",
    "Modern Tech Stack",
    "AI Integration",
    "Full Stack Development",
    "Technology innovation"
  ],
  "sameAs": [
    "https://www.youtube.com/@joshuaseymour",
    "https://github.com/joshuaseymour",
    "https://tiktok.com/@joshuajseymour",
    "https://substack.com/@joshuaseymour",
    "https://x.com/joshuaseymour",
    "https://t.me/joshuaseymour",
    "https://www.instagram.com/joshuajseymour/"
  ]
} as const;

// Organization entity (Supercivilization)
export const organizationSchema = {
  "@type": "Organization",
  "@id": SCHEMA_IDS.organization,
  "name": "Supercivilization",
  "slogan": "Vivify Further, Unify Faster, Thrive Forever",
  "url": "https://www.supercivilization.xyz",
  "description": "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
  "logo": {
    "@type": "ImageObject",
    "url": "https://avolve.io/logo.png",
    "width": 512,
    "height": 512
  },
  "founder": {
    "@id": SCHEMA_IDS.person
  },
  "sameAs": [
    "https://github.com/supercivilization"
  ],
  "foundingDate": "2024"
} as const;

// Entity reference helpers (for use in author/publisher fields)
export const authorRef = { "@id": SCHEMA_IDS.person };
export const publisherRef = { "@id": SCHEMA_IDS.organization };
export const websiteRef = { "@id": SCHEMA_IDS.website };

// Helper to create consistent dateModified timestamps
export function getSchemaDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

// Current verified date
export const LAST_VERIFIED_DATE = '2025-10-06';
