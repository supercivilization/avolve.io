/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (moved from experimental)
  turbopack: {
    root: require('path').resolve(__dirname, '../..'),
    resolveAlias: {
      // Optimize AI SDK imports
      "ai": "ai/dist/index.mjs",
      "@ai-sdk/openai": "@ai-sdk/openai/dist/index.mjs",
      "@ai-sdk/anthropic": "@ai-sdk/anthropic/dist/index.mjs",
      "@ai-sdk/google": "@ai-sdk/google/dist/index.mjs",
    },
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: [
    '@ai-sdk/openai',
    '@ai-sdk/anthropic',
    '@ai-sdk/google',
    'ai'
  ],

  // Typed routes (moved from experimental)
  typedRoutes: true,

  // Transpile packages from monorepo
  transpilePackages: [
    "@unified/ui",
    "@unified/lib",
    "@unified/config"
  ],

  // Image optimization with Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Optimize bundle for production
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize AI SDK packages
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.ai = {
        name: 'ai-vendor',
        test: /[\\/]node_modules[\\/](ai|@ai-sdk)[\\/]/,
        priority: 30,
        chunks: 'all',
      };
    }

    return config;
  },

  // Environment variables for AI development
  env: {
    VERCEL_AI_SDK_VERSION: '5.0.47',
    NEXT_JS_VERSION: '15.5.3',
    REACT_VERSION: '19.1.1',
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO and UX
  async redirects() {
    return [
      // Add any necessary redirects here
    ];
  },

};

module.exports = nextConfig;