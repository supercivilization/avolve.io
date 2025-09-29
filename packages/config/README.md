# @unified/config

Shared configuration files for ESLint, TypeScript, and Tailwind CSS across the monorepo.

## 🚀 Quick Start

```bash
# Install in your app
pnpm add -D @unified/config

# Extend configurations in your project
echo 'export { default } from "@unified/config/eslint"' > eslint.config.js
echo 'export { default } from "@unified/config/tailwind"' > tailwind.config.ts
```

## 🔧 Available Configurations

### ESLint Configuration
- **Base Rules** - Core ESLint rules for JavaScript/TypeScript
- **React Rules** - React-specific linting rules
- **Next.js Rules** - Next.js framework optimizations
- **Accessibility Rules** - WCAG compliance validation
- **AI-Aware Rules** - Rules for AI-generated code validation

### TypeScript Configuration
- **Base Config** - Core TypeScript compiler options
- **React Config** - React-specific TypeScript settings
- **Node Config** - Node.js backend TypeScript configuration
- **Strict Config** - Maximum type safety configuration

### Tailwind Configuration
- **Design System** - Complete Vercel-compatible design system
- **AI Components** - Styles for AI-generated components
- **Accessibility** - WCAG-compliant color and spacing
- **Performance** - Optimized for Tailwind v4 Oxide engine

### Prettier Configuration
- **Code Formatting** - Consistent code style across projects
- **Tailwind Integration** - Automatic class sorting
- **Import Sorting** - Organized import statements

## 🏗️ Configuration Structure

```
src/
├── eslint/              # ESLint configurations
│   ├── base.js         # Base ESLint rules
│   ├── react.js        # React-specific rules
│   ├── next.js         # Next.js optimizations
│   └── index.js        # Main ESLint export
├── typescript/          # TypeScript configurations
│   ├── base.json       # Base TypeScript config
│   ├── react.json      # React TypeScript config
│   ├── node.json       # Node.js TypeScript config
│   └── strict.json     # Strict TypeScript config
├── tailwind/           # Tailwind configurations
│   ├── base.js         # Base Tailwind config
│   ├── design-system.js # Design system tokens
│   ├── components.js   # Component-specific styles
│   └── index.js        # Main Tailwind export
├── prettier/           # Prettier configurations
│   └── index.js        # Prettier configuration
└── index.js           # Package exports
```

## 📝 ESLint Configuration

### Base Configuration
```javascript
// eslint.config.js
export { default } from '@unified/config/eslint';

// Or customize
import { baseConfig } from '@unified/config/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      // Your custom rules
      'no-console': 'warn'
    }
  }
];
```

### Available Rules
- **@typescript-eslint/recommended** - TypeScript best practices
- **@next/next/recommended** - Next.js optimizations
- **jsx-a11y/recommended** - Accessibility compliance
- **react-hooks/recommended** - React Hooks best practices
- **import/recommended** - Import/export validation

### AI-Aware Rules
```javascript
{
  rules: {
    // AI-generated code validation
    'ai-generated/require-documentation': 'error',
    'ai-generated/validate-accessibility': 'error',
    'ai-generated/performance-check': 'warn',
    
    // Prevent AI hallucinations
    'no-unreachable-ai-logic': 'error',
    'validate-ai-responses': 'error'
  }
}
```

## 📘 TypeScript Configuration

### Base Configuration
```json
// tsconfig.json
{
  "extends": "@unified/config/typescript/base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### React Configuration
```json
// tsconfig.json (React projects)
{
  "extends": "@unified/config/typescript/react",
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "ES6"]
  }
}
```

### Strict Configuration
```json
// tsconfig.json (Maximum type safety)
{
  "extends": "@unified/config/typescript/strict",
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## 🎨 Tailwind Configuration

### Base Configuration
```typescript
// tailwind.config.ts
export { default } from '@unified/config/tailwind';

// Or customize
import { createTailwindConfig } from '@unified/config/tailwind';

export default createTailwindConfig({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Your custom theme
    }
  }
});
```

### Design System Tokens
```javascript
// Complete design system
const designSystem = {
  colors: {
    // HSL-based semantic colors
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    muted: 'hsl(var(--muted))',
    destructive: 'hsl(var(--destructive))'
  },
  spacing: {
    // Touch-target optimized
    'touch-target': '44px',
    'focus-outline': '2px'
  },
  borderRadius: {
    // Consistent radius system
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)'
  },
  fontFamily: {
    // Optimized font stack
    sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'monospace']
  }
};
```

### AI-Enhanced Styles
```javascript
// AI component utilities
const aiComponents = {
  '.ai-component': {
    '@apply border border-border rounded-lg p-4': {},
    'transition': 'all 0.2s ease-in-out',
    
    '&[data-loading="true"]': {
      '@apply opacity-50 pointer-events-none': {},
      'background': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      'background-size': '200% 100%',
      'animation': 'shimmer 1.5s infinite'
    }
  },
  
  '@keyframes shimmer': {
    '0%': { 'background-position': '-200% 0' },
    '100%': { 'background-position': '200% 0' }
  }
};
```

### Accessibility Features
```javascript
// WCAG-compliant utilities
const accessibility = {
  '.sr-only': {
    'position': 'absolute',
    'width': '1px',
    'height': '1px',
    'padding': '0',
    'margin': '-1px',
    'overflow': 'hidden',
    'clip': 'rect(0, 0, 0, 0)',
    'white-space': 'nowrap',
    'border': '0'
  },
  
  '.focus-visible': {
    '@apply outline-none ring-2 ring-ring ring-offset-2': {}
  },
  
  '.motion-safe': {
    '@media (prefers-reduced-motion: no-preference)': {
      'transition': 'all 0.2s ease-in-out'
    }
  }
};
```

## 💅 Prettier Configuration

### Base Configuration
```javascript
// prettier.config.js
export { default } from '@unified/config/prettier';

// Or customize
import { prettierConfig } from '@unified/config/prettier';

export default {
  ...prettierConfig,
  semi: false, // Your preference
  singleQuote: true
};
```

### Features
- **Tailwind Class Sorting** - Automatic class organization
- **Import Sorting** - Organized import statements
- **Consistent Formatting** - Unified code style
- **Plugin Integration** - Supports all major plugins

```javascript
const prettierConfig = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports'
  ],
  importOrder: [
    '^react',
    '^next',
    '^@/',
    '^[./]'
  ],
  importOrderSeparation: true
};
```

## 🛠️ Development Workflows

### Shared Scripts
```json
{
  "scripts": {
    "lint": "eslint --config @unified/config/eslint .",
    "lint:fix": "eslint --config @unified/config/eslint . --fix",
    "format": "prettier --config @unified/config/prettier --check .",
    "format:fix": "prettier --config @unified/config/prettier --write .",
    "type-check": "tsc --noEmit --project @unified/config/typescript/base"
  }
}
```

### Git Hooks Integration
```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged --config @unified/config/lint-staged
```

### VS Code Integration
```json
// .vscode/settings.json
{
  "eslint.workingDirectories": ["packages/*", "apps/*"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "tailwindCSS.experimental.configFile": "@unified/config/tailwind"
}
```

## 🧪 Configuration Testing

### ESLint Rule Testing
```javascript
import { ESLintUtils } from '@typescript-eslint/utils';
import { baseConfig } from '@unified/config/eslint';

const { RuleTester } = ESLintUtils;

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
});

// Test custom rules
ruleTester.run('ai-generated/require-documentation', rule, {
  valid: [
    {
      code: `
        /**
         * AI-generated component for user profiles
         */
        function UserProfile() { return <div />; }
      `
    }
  ],
  invalid: [
    {
      code: 'function UserProfile() { return <div />; }',
      errors: [{ messageId: 'missingDocumentation' }]
    }
  ]
});
```

### TypeScript Configuration Validation
```bash
# Validate TypeScript configurations
pnpm tsc --showConfig --project @unified/config/typescript/base
pnpm tsc --showConfig --project @unified/config/typescript/react
pnpm tsc --showConfig --project @unified/config/typescript/strict
```

## 📦 Package Distribution

### Build Configuration
```bash
# Build all configurations
pnpm build

# Test configurations
pnpm test:configs

# Validate configurations
pnpm validate:eslint
pnpm validate:typescript
pnpm validate:tailwind
```

### Version Management
```json
{
  "name": "@unified/config",
  "version": "0.1.0",
  "exports": {
    "./eslint": "./dist/eslint/index.js",
    "./typescript/*": "./dist/typescript/*.json",
    "./tailwind": "./dist/tailwind/index.js",
    "./prettier": "./dist/prettier/index.js"
  },
  "files": [
    "dist",
    "README.md"
  ]
}
```

## 🚀 Usage Across Projects

### Web App Configuration
```javascript
// apps/web/eslint.config.js
export { default } from '@unified/config/eslint';

// apps/web/tailwind.config.ts
export { default } from '@unified/config/tailwind';

// apps/web/tsconfig.json
{
  "extends": "@unified/config/typescript/react"
}
```

### Mobile App Configuration
```javascript
// apps/mobile/eslint.config.js
import { baseConfig } from '@unified/config/eslint';

export default [
  ...baseConfig,
  {
    env: {
      'react-native/react-native': true
    },
    extends: ['@react-native-community']
  }
];
```

### Package Configuration
```javascript
// packages/ui/eslint.config.js
import { baseConfig } from '@unified/config/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      // Package-specific rules
      'react/prop-types': 'off' // Using TypeScript
    }
  }
];
```

## 📚 Learn More

- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Monorepo Configuration Patterns](https://turborepo.org/docs/handbook/linting)