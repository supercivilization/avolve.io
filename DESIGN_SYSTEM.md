# Avolve.io Design System

**Last Updated:** October 5, 2025

## Typography

### Font Family
- **Primary Font:** Inter (Google Fonts)
- **Fallback:** System sans-serif stack
- **Implementation:** `next/font/google` with automatic optimization
- **Variable:** `--font-inter`
- **Usage:** Applied globally via `font-sans` class on `<body>`

### Font Loading
```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

**Why Inter?**
- Modern, highly readable sans-serif
- Excellent for both UI and body text
- Optimized for screens at all sizes
- Open source and free
- Built-in support for tabular numbers

## Color System

### 5S Framework Color Mapping

Each route in the 5S framework uses a specific Tailwind grayscale color:

| Route | Color | Hex Range | Use Case |
|-------|-------|-----------|----------|
| `/solutions` | **Slate** | #64748B - #94A3B8 | Business outcomes |
| `/systems` | **Gray** | #6B7280 - #9CA3AF | Architecture patterns |
| `/software` | **Zinc** (default) | #71717A - #A1A1AA | Frameworks & libraries |
| `/services` | **Neutral** | #737373 - #A3A3A3 | External platforms |
| `/support` | **Stone** | #78716C - #A8A29E | Operations |

### Base Color Configuration

**shadcn/ui base color:** `zinc` (default for /software and global components)

This appears in `components.json`:
```json
{
  "baseColor": "zinc"
}
```

### Color Usage Patterns

**Homepage 5S Borders:**
```tsx
<div className="border-l-4 border-slate-600">Solutions</div>
<div className="border-l-4 border-gray-600">Systems</div>
<div className="border-l-4 border-zinc-700">Software</div>
<div className="border-l-4 border-neutral-600">Services</div>
<div className="border-l-4 border-stone-600">Support</div>
```

**Route-Specific Headings:**
- Solutions pages: `text-slate-700`
- Systems pages: `text-gray-700`
- Software pages: `text-zinc-700`
- Services pages: `text-neutral-700`
- Support pages: `text-stone-700`

## Dark Mode

### Implementation
- **Library:** `next-themes`
- **Strategy:** Class-based (`class="dark"`)
- **Default:** System preference
- **Toggle:** Manual override available
- **Persistence:** LocalStorage

### Color Variables

**Light Mode:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  /* ... */
}
```

**Dark Mode:**
```css
.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  /* ... */
}
```

### Accessibility

**Contrast Requirements:**
- Body text: WCAG AA 4.5:1
- Large text (18pt+): WCAG AA 3:1
- UI components: WCAG AA 3:1

**Recommendations:**
- Use `text-foreground` or `text-foreground/80` for body text
- Reserve `text-muted-foreground` for labels and secondary text only
- Test contrast ratios in both light and dark modes

## Component Styling

### shadcn/ui Configuration

**Style:** New York
**Base Color:** Zinc
**CSS Variables:** Enabled
**RSC:** Enabled
**TypeScript:** Enabled

### Component Variants

Components support multiple variants using `class-variance-authority`:

**Example: Button**
- `variant`: default, destructive, outline, secondary, ghost, link
- `size`: default, sm, lg, icon

**Example: Badge**
- `variant`: default, secondary, destructive, outline

## Spacing & Layout

### Max Widths
- **Homepage:** `max-w-6xl` (1152px)
- **Content pages:** `max-w-4xl` (896px)
- **Narrow content:** `max-w-2xl` (672px)

### Padding
- **Page wrapper:** `px-4 py-12`
- **Card padding:** `p-6`
- **Section spacing:** `space-y-8`

### Border Radius
- **Default:** `0.5rem` (via `--radius` variable)
- **Cards:** `rounded-xl`
- **Buttons:** `rounded-md`
- **Code blocks:** `rounded-lg`

## Code Blocks

### Styling
- **Background:** `bg-muted`
- **Border:** `border border-border`
- **Font:** `font-mono` (system monospace)
- **Size:** `text-sm`
- **Padding:** `p-4`

### Features
- Copy button (hover-triggered)
- Optional line numbers
- Optional filename header
- Language indicator

## Best Practices

### Color Usage
1. Use semantic color variables (`--foreground`, `--muted-foreground`) over hard-coded colors
2. Maintain route-specific color consistency (Slate for Solutions, etc.)
3. Test all colors in both light and dark modes
4. Use Tailwind's opacity modifiers (`/80`, `/60`) for hierarchy

### Typography
1. Use semantic heading levels (H1 → H2 → H3)
2. Maintain consistent size scale:
   - H1: `text-4xl` or `text-5xl`
   - H2: `text-3xl`
   - H3: `text-2xl`
   - Body: `text-base`
3. Use `font-bold` for headings, `font-medium` for emphasis
4. Use `antialiased` for improved rendering

### Dark Mode
1. Always test components in both modes
2. Use CSS variables for theme-aware colors
3. Avoid hard-coded light/dark classes when possible
4. Use `suppressHydrationWarning` on `<html>` to prevent flash

## Tailwind CSS 4 Configuration

Using Tailwind CSS 4.1.13 with `@theme inline` directive:

```css
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --font-sans: var(--font-inter);
  /* ... */
}
```

This approach integrates with Next.js optimization and provides type-safe color usage.
