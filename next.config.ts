import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set project root to silence workspace inference warning
  // (parent directory has unrelated lockfile)
  outputFileTracingRoot: "/Users/avolve/dev/active/avolve",
};

export default nextConfig;
