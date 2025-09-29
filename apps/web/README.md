# Avolve Web App

Next.js 15.5 AI-native web application with the complete 8-layer technology pipeline.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev

# Open http://localhost:3000
```

## 🏗️ Architecture

### Core Stack
- **Next.js 15.5** - App Router with Turbopack
- **React 19.1** - Server Components + React Compiler
- **TypeScript 5.9.2** - Native Node.js execution
- **Tailwind CSS 4.1.13** - Oxide engine styling

### AI Integration
- **Vercel AI SDK 5.0.47** - Multi-modal AI capabilities
- **AI Component Generation** - Natural language to React components
- **Multi-Provider AI** - OpenAI, Anthropic, Google models
- **Real-time Streaming** - AI responses with React Suspense

### UI Components
- **shadcn/ui Platform** - Accessible component library
- **Radix UI Primitives** - Headless component foundation
- **Magic UI** - Advanced animations and effects
- **Framer Motion 12** - Motion design system

### Performance & Accessibility
- **Core Web Vitals** - Automatic optimization
- **WCAG 2.1 AA** - Automatic accessibility compliance
- **Motion Preferences** - Reduced motion support
- **High Contrast** - Enhanced visibility modes

## 🎯 Features

### AI-Native Development
- **Natural Language Components** - Generate React components from descriptions
- **AI-Enhanced Testing** - Automated test generation and validation
- **Intelligent Code Review** - AI-powered quality analysis
- **Performance Optimization** - Automatic Core Web Vitals improvement

### Accessibility-First Design
- **Automatic ARIA Labels** - AI-generated accessibility attributes
- **Keyboard Navigation** - Full keyboard support throughout
- **Screen Reader Optimized** - Semantic HTML and proper landmarks
- **Focus Management** - Logical focus flow and visible indicators

### Development Experience
- **Hot Reload** - Instant feedback with Turbopack
- **Type Safety** - Full TypeScript coverage
- **Component Library** - Consistent design system
- **AI Tools** - Natural language development workflows

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with accessibility features
│   ├── page.tsx           # Homepage with AI showcase
│   └── globals.css        # Design system CSS variables
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── examples/         # AI-generated example components
├── lib/                  # Utilities and configurations
│   ├── ai.ts            # AI SDK configuration and helpers
│   ├── utils.ts         # Utility functions
│   └── fonts.ts         # Font configurations
└── styles/              # Global styles and theme
```

## 🛠️ Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # ESLint validation
pnpm type-check       # TypeScript validation

# AI-Native Development
pnpm ai:component     # Generate AI component
pnpm ai:test          # AI-assisted testing
pnpm ai:optimize      # Performance optimization
pnpm ai:accessibility # Accessibility validation
```

## 🤖 AI Component Generation

Create components using natural language:

```bash
# Generate a component
node ../../scripts/ai-component-generator.js "responsive pricing card with three tiers"

# The script will create:
# - src/components/ui/pricing-card.tsx
# - src/components/ui/pricing-card.stories.tsx
# - tests/pricing-card.test.tsx
# - Auto-generated documentation
```

## 🎨 Design System

Built on Vercel Design System with AI enhancements:

- **Colors** - HSL-based with semantic naming
- **Typography** - Geist Sans & Mono font stack
- **Spacing** - Touch-target optimized sizing
- **Animations** - Motion-preference aware
- **Accessibility** - WCAG 2.1 AA compliant

## 📊 Performance Targets

- **First Contentful Paint** - < 1.2s
- **Largest Contentful Paint** - < 2.5s
- **Cumulative Layout Shift** - < 0.1
- **First Input Delay** - < 100ms
- **Time to Interactive** - < 3.5s

## 🔧 Configuration

Key configuration files:
- `next.config.js` - Next.js with AI optimizations
- `tailwind.config.ts` - Tailwind with design system
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS with Tailwind

## 🚀 Deployment

Optimized for Vercel with edge functions:

```bash
# Deploy to Vercel
vercel deploy

# Preview deployment
vercel deploy --preview

# Production deployment
vercel deploy --prod
```

## 📚 Learn More

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/)