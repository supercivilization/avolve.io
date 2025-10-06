/**
 * Stack Version Configuration
 * Single source of truth for all technology versions
 * Last updated: 2025-10-05
 */

export const STACK_VERSIONS = {
  runtime: {
    name: 'Node.js',
    version: '24.8.0',
    released: 'Aug 2025',
  },
  framework: {
    name: 'Next.js',
    version: '15.5.5',
    released: 'Sep 2025',
  },
  ui: {
    name: 'React',
    version: '19.2.0',
    released: 'Oct 1, 2025',
  },
  language: {
    name: 'TypeScript',
    version: '5.9.2',
    released: 'Sep 2025',
  },
  styling: {
    name: 'Tailwind CSS',
    version: '4.1.13',
    released: 'Sep 2025',
  },
  components: {
    name: 'shadcn/ui',
    version: '3.0',
    released: 'Oct 2025',
  },
  ai: {
    name: 'Vercel AI SDK',
    version: '5.0',
    released: 'Sep 2025',
  },
  database: {
    name: 'Supabase',
    version: '2.0',
    released: 'Oct 2025',
  },
} as const;

export const LAST_VERIFIED = '2025-10-05';

export const STACK_TITLE = `${STACK_VERSIONS.framework.name} ${STACK_VERSIONS.framework.version.split('.')[0]}, ${STACK_VERSIONS.ui.name} ${STACK_VERSIONS.ui.version.split('.')[0]}, ${STACK_VERSIONS.language.name} ${STACK_VERSIONS.language.version}`;

export const STACK_DESCRIPTION = `Authoritative reference for ${STACK_VERSIONS.framework.name} ${STACK_VERSIONS.framework.version} + ${STACK_VERSIONS.ui.name} ${STACK_VERSIONS.ui.version} + ${STACK_VERSIONS.language.name} ${STACK_VERSIONS.language.version} modern stack. Verified compatibility, integration patterns, official resources.`;
