import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set project root to silence workspace inference warning
  // (parent directory has unrelated lockfile)
  outputFileTracingRoot: "/Users/avolve/dev/active/avolve",

  // MDX support
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
    // React Compiler is now stable in Next.js 16 but not enabled by default
    // Uncomment to enable automatic memoization:
    // reactCompiler: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Turbopack is now the default bundler in Next.js 16
  // No configuration needed - it's enabled automatically for dev and build
};

export default nextConfig;
