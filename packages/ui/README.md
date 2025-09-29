# @unified/ui

Shared UI component library with shadcn/ui and Magic UI integration for cross-platform applications.

## 🚀 Quick Start

```bash
# Install in your app
pnpm add @unified/ui

# Install peer dependencies
pnpm add react react-dom
```

## 🧩 Component Library

### Core Components (shadcn/ui)
- **Accordion** - Collapsible content sections
- **Alert Dialog** - Modal confirmation dialogs
- **Avatar** - User profile images with fallbacks
- **Button** - Interactive button components
- **Card** - Content container with header/footer
- **Dialog** - Modal overlay dialogs
- **Dropdown Menu** - Contextual action menus
- **Form** - Form controls with validation
- **Input** - Text input fields
- **Label** - Form field labels
- **Popover** - Floating content containers
- **Select** - Dropdown selection components
- **Sheet** - Side panel overlays
- **Table** - Data display tables
- **Tabs** - Content organization tabs
- **Toast** - Notification messages
- **Tooltip** - Contextual help text

### AI-Enhanced Components
- **AI Component Generator** - Create components from natural language
- **Smart Forms** - AI-powered form validation
- **Intelligent Layouts** - Adaptive responsive layouts
- **Accessibility Automation** - Auto-generated ARIA attributes

## 🏗️ Architecture

```
src/
├── components/            # Component implementations
│   ├── ui/               # shadcn/ui components
│   ├── magic/            # Magic UI components
│   └── ai/               # AI-enhanced components
├── lib/                  # Utilities and helpers
│   ├── utils.ts         # Component utilities
│   └── ai-utils.ts      # AI component helpers
├── styles/              # Component styles
│   └── globals.css      # Base component styles
└── index.ts            # Package exports
```

## 🎨 Design System

### Color System
Built on HSL color space with semantic naming:
```css
--primary: 222.2 84% 4.9%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96%;
--secondary-foreground: 222.2 84% 4.9%;
--accent: 210 40% 96%;
--accent-foreground: 222.2 84% 4.9%;
```

### Typography
- **Font Family** - Geist Sans & Mono
- **Font Weights** - 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes** - Fluid scale from 0.75rem to 3rem
- **Line Heights** - Optimized for readability

### Spacing System
Touch-target optimized spacing:
```css
--touch-target: 44px;    /* Minimum touch target */
--focus-outline: 2px;    /* Focus outline width */
```

### Border Radius
Consistent border radius system:
```css
--radius: 0.5rem;
--radius-md: calc(var(--radius) - 2px);
--radius-sm: calc(var(--radius) - 4px);
```

## 🧩 Component Usage

### Basic Components
```tsx
import { Button, Card, Input } from '@unified/ui';

export function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <form className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Card>
  );
}
```

### AI-Enhanced Components
```tsx
import { generateComponent } from '@unified/ui/ai';

// Generate component from natural language
const PricingCard = await generateComponent(
  "responsive pricing card with three tiers and popular badge",
  {
    accessibility: true,
    responsive: true,
    darkMode: true
  }
);
```

## 🎯 Accessibility Features

### WCAG 2.1 AA Compliance
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA attributes
- **Color Contrast** - 4.5:1 minimum contrast ratio
- **Focus Management** - Logical focus order
- **Motion Preferences** - Respects prefers-reduced-motion

### Automatic Accessibility
- **AI-Generated ARIA** - Intelligent accessibility attributes
- **Semantic HTML** - Proper HTML element usage
- **Landmark Regions** - Clear page structure
- **Alternative Text** - Auto-generated alt text for images

## 🚀 Performance Optimization

### Bundle Optimization
- **Tree Shaking** - Import only what you use
- **Code Splitting** - Lazy loading of components
- **Dynamic Imports** - On-demand component loading
- **CSS-in-JS** - Minimal runtime CSS

### Runtime Performance
- **React 19 Optimizations** - Server Components support
- **Memoization** - Intelligent component caching
- **Virtual Scrolling** - Efficient list rendering
- **Image Optimization** - Automatic image compression

## 🛠️ Development

### Build System
```bash
# Development
pnpm dev              # Start Storybook development
pnpm build            # Build component library
pnpm test             # Run component tests
pnpm lint             # ESLint validation
pnpm type-check       # TypeScript validation

# Storybook
pnpm storybook        # Start Storybook server
pnpm build-storybook  # Build Storybook for deployment
```

### Component Development
```bash
# Generate new component
pnpm generate:component ComponentName

# Generate component with AI
pnpm ai:component "description of component"

# Update component documentation
pnpm docs:update ComponentName
```

## 📚 Storybook Integration

Interactive component documentation and testing:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

## 🧪 Testing

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('supports variants', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 🔧 Configuration

### Tailwind Integration
```typescript
// tailwind.config.ts
import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@unified/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... rest of color system
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## 📦 Package Distribution

### NPM Publishing
```bash
# Build package
pnpm build

# Publish to NPM
pnpm publish

# Publish canary version
pnpm publish --tag canary
```

### Package Configuration
```json
{
  "name": "@unified/ui",
  "version": "0.1.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": [
    "dist",
    "README.md"
  ],
  "peerDependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

## 🚀 Cross-Platform Usage

### Web Applications
```tsx
import { Button, Card } from '@unified/ui';

export function WebComponent() {
  return (
    <Card>
      <Button>Web Button</Button>
    </Card>
  );
}
```

### React Native (Future)
```tsx
import { Button, Card } from '@unified/ui/native';

export function MobileComponent() {
  return (
    <Card>
      <Button>Mobile Button</Button>
    </Card>
  );
}
```

## 📚 Learn More

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives)
- [Magic UI Components](https://magicui.design)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/)
- [Storybook Documentation](https://storybook.js.org/docs)