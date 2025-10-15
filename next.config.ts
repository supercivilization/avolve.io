import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set project root to silence workspace inference warning
  // (parent directory has unrelated lockfile)
  outputFileTracingRoot: "/Users/avolve/dev/active/avolve",

  // MDX support
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
    // Turbopack filesystem caching for faster compile times (Next.js 16 beta)
    turbopackFileSystemCacheForDev: true,
    // React Compiler is stable in Next.js 16 but not enabled by default
    // (compile times will be higher when enabled due to Babel usage)
    // reactCompiler: true,
  },

  // Image optimization - Next.js 16 defaults
  images: {
    formats: ['image/avif', 'image/webp'],
    // minimumCacheTTL default changed from 60s to 4 hours (14400s) in Next.js 16
    // imageSizes default removed 16 from list (used by only 4.2% of projects)
    // qualities default changed from [1..100] to [75]
  },

  // Turbopack is now the default bundler in Next.js 16
  // No configuration needed - it's enabled automatically for dev and build
  // To opt out: use --webpack flag with next dev/build commands
};

export default nextConfig;
