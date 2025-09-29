# Avolve Mobile App

Cross-platform mobile application built with Expo SDK 54 and React Native New Architecture.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start Expo development server
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android
```

## 📱 Tech Stack

### Core Framework
- **Expo SDK 54** - Universal React Native platform
- **React Native 0.81** - New Architecture with Fabric & TurboModules
- **TypeScript 5.9.2** - Full type safety
- **React 19.1** - Shared components with web app

### Cross-Platform Sharing
- **90%+ Code Sharing** - Shared business logic and components
- **Platform-Specific UI** - Native look and feel
- **Shared State Management** - Consistent data layer
- **Universal Navigation** - Shared routing patterns

### AI Integration
- **Vercel AI SDK** - Same AI capabilities as web
- **On-Device AI** - Edge inference with ONNX runtime
- **Real-time AI** - Streaming responses
- **AI-Generated Components** - Mobile-first component generation

### Design System
- **Shared UI Components** - @unified/ui package integration
- **Native Primitives** - Platform-appropriate components
- **Accessibility First** - iOS and Android accessibility standards
- **Responsive Design** - Adaptive layouts for all screen sizes

## 🏗️ Architecture

```
src/
├── app/                    # Expo Router navigation
│   ├── (tabs)/            # Tab-based navigation
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Home screen
├── components/            # React Native components
│   ├── ui/               # Shared UI components
│   └── mobile/           # Mobile-specific components
├── lib/                  # Shared utilities
│   ├── ai.ts            # AI SDK mobile configuration
│   └── utils.ts         # Platform utilities
└── styles/              # React Native StyleSheet
```

## 🎯 Features

### AI-Native Mobile Experience
- **Voice-to-Component** - Generate UI through speech
- **Camera AI Integration** - Real-time image analysis
- **Gesture-Based AI** - Natural interaction patterns
- **Offline AI Capabilities** - On-device inference

### Cross-Platform Consistency
- **Shared Business Logic** - Single source of truth
- **Platform UI Adaptation** - Native look and feel
- **Consistent Navigation** - Familiar patterns across platforms
- **Synchronized State** - Real-time data synchronization

### Mobile-First Accessibility
- **Screen Reader Support** - iOS VoiceOver and Android TalkBack
- **Dynamic Type** - Respect system font size preferences
- **High Contrast** - Enhanced visibility options
- **Voice Control** - Full voice navigation support

### Performance Optimization
- **Hermes Engine** - Optimized JavaScript execution
- **Bundle Splitting** - Lazy loading of features
- **Image Optimization** - Automatic image compression
- **Memory Management** - Efficient resource usage

## 🛠️ Development Commands

```bash
# Development
pnpm dev              # Start Expo development server
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm web              # Run as web app (Expo Web)

# Building
pnpm build:ios        # Build iOS app
pnpm build:android    # Build Android app
pnpm prebuild         # Generate native projects

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run end-to-end tests
pnpm test:accessibility # Test accessibility features

# AI Development
pnpm ai:component     # Generate mobile component
pnpm ai:optimize      # Performance optimization
pnpm ai:accessibility # Accessibility validation
```

## 📱 Platform-Specific Features

### iOS Integration
- **Shortcuts App** - Siri shortcuts for AI features
- **Widgets** - Home screen AI widgets
- **App Clips** - Lightweight AI experiences
- **Push Notifications** - AI-powered notifications

### Android Integration
- **App Shortcuts** - Quick actions from launcher
- **Live Wallpapers** - AI-generated wallpapers
- **Quick Settings** - AI toggles in control center
- **Adaptive Icons** - Dynamic app icons

## 🚀 Deployment

### Development Builds
```bash
# Create development build
eas build --profile development --platform all

# Install on device
eas build:run --platform ios
eas build:run --platform android
```

### Production Release
```bash
# Build for app stores
eas build --profile production --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## 🔧 Configuration

Key configuration files:
- `app.config.ts` - Expo configuration
- `eas.json` - EAS Build and Submit configuration
- `metro.config.js` - Metro bundler configuration
- `babel.config.js` - Babel transpilation setup

## 📊 Performance Targets

- **Bundle Size** - < 50MB total
- **Startup Time** - < 2s on mid-range devices
- **Memory Usage** - < 200MB average
- **Battery Impact** - Minimal background usage
- **Frame Rate** - 60fps on all animations

## 🤖 AI Features

### Core AI Capabilities
- **Natural Language Interface** - Voice and text input
- **Computer Vision** - Real-time camera analysis
- **Predictive Text** - Context-aware suggestions
- **Smart Notifications** - AI-curated content

### On-Device AI
- **ONNX Runtime** - Local model inference
- **Core ML** - iOS-optimized models
- **TensorFlow Lite** - Android-optimized models
- **Edge Caching** - Smart model management

## 🔗 Integration with Web App

- **Shared Components** - @unified/ui package
- **Shared State** - Consistent data layer
- **Shared AI Tools** - Same AI capabilities
- **Cross-Platform Auth** - Seamless authentication

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Vercel AI SDK React Native](https://sdk.vercel.ai/docs/guides/frameworks/react-native)
- [Mobile Accessibility Guidelines](https://developer.apple.com/accessibility/)