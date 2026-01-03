/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    themeBuilder: {
      input: '../../packages/ui/src/themes/theme.ts',
      output: '../../packages/ui/src/themes/theme-generated.ts',
    },
    config: '../../packages/ui/src/tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    appDir: true, // Enable App Router support (Solito 5.0+)
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
  }),
  (nextConfig) => {
    return {
      webpack: (webpackConfig, options) => {
        webpackConfig.resolve.alias = {
          ...webpackConfig.resolve.alias,
          'react-native-svg': '@tamagui/react-native-svg',
          // Mock react-native-worklets on web (required by react-native-reanimated 4.x)
          'react-native-worklets': require.resolve('./mocks/react-native-worklets.js'),
          'react-native-worklets/package.json': require.resolve('./mocks/react-native-worklets-package.json'),
        }
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(webpackConfig, options)
        }
        return webpackConfig
      },
    }
  },
]

module.exports = () => {
  /** @type {import('next').NextConfig} */
  let config = {
    images: {
      remotePatterns: [
        {
          hostname: 'ui-avatars.com',
        },
        {
          hostname: 'localhost',
        },
        {
          hostname: '192.168.0.23',
        },
      ],
    },

    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
      'expo-image-picker',
      'react-native-gesture-handler',
      '@ts-react/form',
      'react-hook-form',
      'react-native-reanimated',
    ],
    /*
       App Router is now supported with Solito 5.0+!

       - Both /pages (Pages Router) and /app (App Router) can coexist
       - Use `solito/navigation` for App Router hooks instead of `solito/router`
       - App Router requires NextThemeProvider with skipNextHead prop
       - You can gradually migrate from Pages Router to App Router
      */
    experimental: {
      scrollRestoration: true,
      // optimizeCss: true,
    },
    turbopack: {
      resolveAlias: {
        // Stub react-native modules for web (same as webpack aliases)
        'react-native': 'react-native-web',
        'react-native-svg': '@tamagui/react-native-svg',
        'react-native-worklets': './mocks/react-native-worklets.js',
        'react-native-worklets/package.json': './mocks/react-native-worklets-package.json',
      },
    },
    redirects: async () => [
      // we have /onboarding on native but don't have a standalone page for /onboarding on web
      // it's included as a sidebar of auth pages, so we just redirect the user there
      {
        source: '/onboarding',
        destination: '/sign-in',
        permanent: false,
      },
    ],
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return {
    ...config,
    // Note: TypeScript errors in Bento UI (third-party) are ignored for builds.
    // Run `yarn typecheck` separately to check your own code.
    typescript: { ignoreBuildErrors: true },
    images: { unoptimized: true }
  }
}
