import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set project root to silence workspace inference warning
  // (parent directory has unrelated lockfile)
  outputFileTracingRoot: "/Users/avolve/dev/active/avolve",

  // MDX support
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
