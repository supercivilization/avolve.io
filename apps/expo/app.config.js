export default {
  expo: {
    name: 'takeout demo',
    slug: 'takeout-demo',
    jsEngine: 'hermes',
    scheme: 'myapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      contentFit: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/your-project-id',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'dev.tamagui.takeoutdemo',
      buildNumber: '6',
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'dev.tamagui.takeoutdemo',
      permissions: ['android.permission.RECORD_AUDIO'],
      versionCode: 3,
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-notifications',
        {
          icon: './assets/icon.png',
          color: '#ffffff',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
      // Google Sign-In requires GOOGLE_IOS_SCHEME env var
      // See: https://react-native-google-signin.github.io/docs/setting-up/expo
      ...(process.env.GOOGLE_IOS_SCHEME
        ? [
            [
              '@react-native-google-signin/google-signin',
              {
                iosUrlScheme: process.env.GOOGLE_IOS_SCHEME,
              },
            ],
          ]
        : []),
      'expo-apple-authentication',
      'expo-router',
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: true,
          },
          android: {
            newArchEnabled: true,
          },
        },
      ],
      'expo-font',
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'b5f02af2-6475-4d9e-81b3-664f89564580',
      },
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    owner: 'tamagui-team',
  },
}
