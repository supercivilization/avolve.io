# Claude Agent SDK Usage Examples

Complete examples for using autonomous agents in the Avolve AI-Native Development Platform.

## Table of Contents

- [Setup](#setup)
- [Component Generation](#component-generation)
- [Code Review](#code-review)
- [Feature Implementation](#feature-implementation)
- [Performance Optimization](#performance-optimization)
- [Accessibility Audit](#accessibility-audit)
- [API Usage](#api-usage)
- [CLI Usage](#cli-usage)
- [Best Practices](#best-practices)

## Setup

### Environment Variables

Add to `.env.local`:

```bash
ANTHROPIC_API_KEY=your_key_here
```

### Import Agents

```typescript
import {
  generateComponent,
  reviewCode,
  implementFeature,
  optimizePerformance,
  auditAccessibility,
} from '@/lib/agents';
```

## Component Generation

### Basic Component

```typescript
// Generate a simple component
await generateComponent({
  name: 'FeatureCard',
  description: 'Display a feature with icon, title, and description',
  location: 'src/components/marketing',
});
```

**Agent will create:**
- `src/components/marketing/feature-card.tsx` - Complete component
- `src/components/marketing/feature-card.test.tsx` - Comprehensive tests

### Complex Component with Requirements

```typescript
// Generate a complex component with detailed requirements
await generateComponent({
  name: 'UserProfile',
  description: `
    User profile component with:
    - Avatar with upload capability
    - Editable name and bio fields
    - Social links section
    - Activity timeline
    - Settings button

    Requirements:
    - Server Component optimized for React 19.1
    - Tailwind CSS v4 styling
    - Full keyboard navigation
    - WCAG 2.1 AA compliant
    - Loading and error states
  `,
  location: 'src/components/user',
});
```

### Form Component

```typescript
// Generate an accessible form component
await generateComponent({
  name: 'ContactForm',
  description: `
    Contact form with:
    - Name, email, subject, message fields
    - Client-side validation with Zod
    - Server action integration
    - Loading states during submission
    - Success/error toast notifications

    Accessibility:
    - Proper label associations
    - Error announcements for screen readers
    - Focus management after submission
  `,
  location: 'src/components/forms',
});
```

## Code Review

### Review Single File

```typescript
// Comprehensive review of a component
const review = await reviewCode({
  path: 'src/components/user-profile.tsx',
});

console.log(review);
```

**Expected output:**
```
🔍 Code Review: src/components/user-profile.tsx

Quality Score: 7/10

🔴 Critical Issues:
- Line 45: Unhandled promise rejection in handleSubmit
- Line 78: Missing key prop in list items

🟡 Important Issues:
- Line 23: useState could be useReducer for complex state
- Line 56: Consider memoizing expensive calculation

🟢 Recommendations:
- Line 12: Add JSDoc comments for complex props
- Line 89: Extract magic numbers to constants

Summary:
Good component structure with proper TypeScript usage. Main concerns are error handling and performance optimization opportunities.
```

### Focused Review

```typescript
// Review focusing on specific areas
const review = await reviewCode({
  path: 'src/components/dashboard/analytics.tsx',
  focus: ['performance', 'accessibility'],
});
```

### Batch Review

```typescript
// Review multiple files
const files = [
  'src/components/auth/login-form.tsx',
  'src/components/auth/register-form.tsx',
  'src/components/auth/reset-password-form.tsx',
];

for (const file of files) {
  const review = await reviewCode({ path: file });
  console.log(`\n=== ${file} ===\n`, review);
}
```

## Feature Implementation

### Authentication Feature

```typescript
await implementFeature({
  name: 'User Authentication',
  requirements: `
    Complete authentication system:

    1. Login
       - Email/password form
       - Social login (Google, GitHub)
       - Remember me option
       - Forgot password link

    2. Registration
       - Email verification
       - Password strength indicator
       - Terms acceptance

    3. Password Reset
       - Email-based reset flow
       - Secure token validation
       - New password form

    4. Protected Routes
       - Middleware for authentication
       - Redirect to login when needed
       - Role-based access control

    5. Session Management
       - JWT tokens with refresh
       - Supabase Auth integration
       - Logout functionality

    Technical Requirements:
    - Use Supabase Auth
    - Server actions for mutations
    - Client components for forms
    - Proper error handling
    - Loading states throughout
    - Full test coverage
  `,
});
```

### Dashboard Feature

```typescript
await implementFeature({
  name: 'Analytics Dashboard',
  requirements: `
    Dashboard with real-time analytics:

    1. Metrics Cards
       - Total users, revenue, conversions
       - Trend indicators (up/down)
       - Percentage changes

    2. Charts
       - Line chart for revenue over time
       - Bar chart for user acquisition
       - Pie chart for traffic sources

    3. Data Table
       - Recent transactions
       - Sorting and filtering
       - Pagination
       - Export to CSV

    4. Real-time Updates
       - Supabase real-time subscriptions
       - Optimistic UI updates
       - WebSocket connection status

    Technical:
    - Server Components for initial data
    - Client Components for interactivity
    - React 19 Suspense boundaries
    - Error boundaries
    - Loading skeletons
  `,
});
```

### E-commerce Cart

```typescript
await implementFeature({
  name: 'Shopping Cart',
  requirements: `
    Full shopping cart functionality:

    1. Cart State
       - Add/remove items
       - Update quantities
       - Persist to localStorage
       - Sync with database for logged-in users

    2. Cart UI
       - Slide-over panel
       - Item cards with images
       - Quantity controls
       - Price calculations
       - Promo code input

    3. Checkout Flow
       - Shipping information
       - Payment integration (Stripe)
       - Order confirmation
       - Email receipt

    4. Inventory
       - Real-time stock checking
       - Low stock warnings
       - Out of stock handling

    Performance:
    - Optimistic UI updates
    - Debounced quantity changes
    - Lazy load checkout flow
  `,
});
```

## Performance Optimization

### Optimize Entire App

```typescript
await optimizePerformance({
  target: 'entire application',
});
```

### Optimize Specific Route

```typescript
await optimizePerformance({
  target: 'src/app/dashboard',
  metrics: {
    lcp: 4.2,  // Current Largest Contentful Paint (seconds)
    fid: 180,  // Current First Input Delay (milliseconds)
    cls: 0.15, // Current Cumulative Layout Shift
  },
});
```

**Agent will:**
1. Analyze bundle size and dependencies
2. Identify render bottlenecks
3. Implement code splitting
4. Add lazy loading
5. Optimize images
6. Improve caching strategies
7. Provide before/after metrics

### Target Specific Issues

```typescript
// Optimize bundle size
await optimizePerformance({
  target: 'bundle size',
});

// Optimize images
await optimizePerformance({
  target: 'image loading',
});

// Optimize React rendering
await optimizePerformance({
  target: 'React component rendering',
});
```

## Accessibility Audit

### Audit and Report

```typescript
// Generate accessibility report without making changes
const report = await auditAccessibility({
  path: 'src/components',
  autoFix: false,
});

console.log(report);
```

**Expected output:**
```
♿ Accessibility Audit: src/components

Compliance Level: WCAG 2.1 AA

🔴 Critical Issues (5):
1. src/components/modal.tsx:34
   - Missing focus trap in modal
   - Fix: Implement focus trap with focus-trap-react

2. src/components/form-input.tsx:12
   - Input missing associated label
   - Fix: Add <label htmlFor="input-id">

🟡 Important Issues (8):
1. src/components/button.tsx:45
   - Insufficient color contrast (3.2:1, requires 4.5:1)
   - Fix: Darken text color to #1a1a1a

🟢 Recommendations (3):
1. src/components/icon.tsx:23
   - Consider adding aria-label for icon-only buttons
   - Improves screen reader experience

Summary:
13 total issues found. 5 critical must be fixed immediately.
Estimated fix time: 2-3 hours.
```

### Auto-Fix Issues

```typescript
// Automatically fix all accessibility issues
await auditAccessibility({
  path: 'src/components',
  autoFix: true,
});
```

**Agent will:**
1. Scan all components
2. Identify WCAG 2.1 AA violations
3. Implement fixes automatically
4. Generate detailed report
5. Create manual testing checklist

### Audit Specific Component

```typescript
// Audit a single component
await auditAccessibility({
  path: 'src/components/navigation/header.tsx',
  autoFix: true,
});
```

## API Usage

### REST API Endpoint

```bash
# Component Generation via API
curl -X POST http://localhost:3000/api/agents/example \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "componentGenerator",
    "params": {
      "name": "PricingCard",
      "description": "Pricing tier card with features list and CTA button",
      "location": "src/components/pricing"
    }
  }'
```

### Code Review via API

```bash
# Code Review
curl -X POST http://localhost:3000/api/agents/example \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "codeReview",
    "params": {
      "path": "src/components/user-profile.tsx",
      "focus": ["accessibility", "performance"]
    }
  }'
```

### Get Available Agents

```bash
# List all agents and their parameters
curl http://localhost:3000/api/agents/example
```

## CLI Usage

### Create npm Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "agent:component": "node scripts/agent-component.js",
    "agent:review": "node scripts/agent-review.js",
    "agent:feature": "node scripts/agent-feature.js",
    "agent:optimize": "node scripts/agent-optimize.js",
    "agent:a11y": "node scripts/agent-accessibility.js"
  }
}
```

### Example CLI Script

Create `scripts/agent-component.js`:

```javascript
#!/usr/bin/env node

import { generateComponent } from '../apps/web/src/lib/agents.js';

const [name, description, location] = process.argv.slice(2);

if (!name || !description || !location) {
  console.error('Usage: npm run agent:component <name> <description> <location>');
  process.exit(1);
}

console.log(`🤖 Generating component: ${name}`);

await generateComponent({ name, description, location });

console.log('✅ Component generated successfully!');
```

### Usage

```bash
# Generate component via CLI
npm run agent:component "PricingCard" "Display pricing tier with features" "src/components/pricing"

# Review code via CLI
npm run agent:review "src/components/user-profile.tsx" "accessibility,performance"

# Optimize performance
npm run agent:optimize "src/app/dashboard"
```

## Best Practices

### 1. Use Specific Descriptions

❌ **Bad:**
```typescript
await generateComponent({
  name: 'Card',
  description: 'A card component',
  location: 'src/components',
});
```

✅ **Good:**
```typescript
await generateComponent({
  name: 'ProductCard',
  description: `
    E-commerce product card with:
    - Product image with hover zoom
    - Title, price, and rating
    - Add to cart button
    - Wishlist toggle
    - Quick view button

    Accessibility: Full keyboard navigation, ARIA labels
    Performance: Lazy load images, optimistic cart updates
  `,
  location: 'src/components/product',
});
```

### 2. Review Before Committing

Always review agent-generated code before committing:

```typescript
// Generate component
await generateComponent({...});

// Review what was generated
await reviewCode({
  path: 'src/components/product/product-card.tsx',
});

// Fix any issues, then commit
```

### 3. Use Focused Reviews

For faster reviews, focus on specific areas:

```typescript
// Performance-focused review
await reviewCode({
  path: 'src/app/dashboard/page.tsx',
  focus: ['performance'],
});

// Accessibility-focused review
await reviewCode({
  path: 'src/components/forms',
  focus: ['accessibility'],
});
```

### 4. Iterative Feature Development

Break large features into phases:

```typescript
// Phase 1: Core functionality
await implementFeature({
  name: 'User Profile - Phase 1',
  requirements: 'Basic profile display with avatar and info',
});

// Review and test

// Phase 2: Editing
await implementFeature({
  name: 'User Profile - Phase 2',
  requirements: 'Add profile editing functionality',
});

// Review and test

// Phase 3: Advanced features
await implementFeature({
  name: 'User Profile - Phase 3',
  requirements: 'Add activity timeline and settings',
});
```

### 5. Combine Agents

Use multiple agents in sequence:

```typescript
// 1. Generate component
await generateComponent({
  name: 'Dashboard',
  description: 'Admin dashboard with charts',
  location: 'src/app/admin',
});

// 2. Optimize performance
await optimizePerformance({
  target: 'src/app/admin/dashboard.tsx',
});

// 3. Audit accessibility
await auditAccessibility({
  path: 'src/app/admin/dashboard.tsx',
  autoFix: true,
});

// 4. Final review
await reviewCode({
  path: 'src/app/admin/dashboard.tsx',
});
```

### 6. Error Handling

Always handle agent errors gracefully:

```typescript
try {
  const result = await generateComponent({
    name: 'ComplexComponent',
    description: 'Very complex requirements...',
    location: 'src/components',
  });

  console.log('✅ Component generated:', result);
} catch (error) {
  console.error('❌ Agent failed:', error);

  // Fallback: Create component manually or adjust requirements
  // Log for debugging
  await logAgentError(error);
}
```

### 7. Monitor Agent Usage

Track agent operations for cost and quality:

```typescript
import { aiTracker } from '@/lib/ai-decision-tracker';

const startTime = Date.now();

await generateComponent({...});

await aiTracker.logDecision({
  tool: 'claude-agent-sdk',
  task: 'component-generation',
  outcome: 'success',
  quality_score: 8,
  time_saved_minutes: Math.round((Date.now() - startTime) / 1000 / 60),
});

// View analytics
// pnpm ai:decision:dashboard
```

### 8. Version Control Integration

Create pre-commit hooks for agent-generated code:

```bash
# .husky/pre-commit
#!/bin/sh

# Review all staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '.tsx\?$')

for FILE in $STAGED_FILES; do
  echo "🔍 Reviewing: $FILE"
  npm run agent:review "$FILE"
done
```

## Troubleshooting

### Agent Timeout

If agent operations timeout:

```typescript
// Use more specific requirements
await generateComponent({
  name: 'SimpleButton',
  description: 'Basic button with primary/secondary variants',
  location: 'src/components/ui',
});

// Instead of
await generateComponent({
  name: 'Button',
  description: 'Complete button system with all possible variants and states',
  location: 'src/components/ui',
});
```

### Incomplete Generation

If agent generates incomplete code:

```typescript
// Add explicit completion requirement
await generateComponent({
  name: 'UserForm',
  description: `
    User form with validation.

    IMPORTANT: Generate COMPLETE implementation.
    No TODO comments. No placeholders.
    All functions must be fully implemented.
  `,
  location: 'src/components/forms',
});
```

### Type Errors

If generated code has type errors:

```typescript
// First: Let agent review and fix
await reviewCode({
  path: 'src/components/problematic-component.tsx',
  focus: ['types'],
});

// Then: Ask agent to fix specific type issues
```

## Next Steps

1. **Start with Simple Components**: Begin with basic component generation
2. **Progress to Reviews**: Use code review agent to learn best practices
3. **Implement Features**: Let agents handle complete feature implementation
4. **Optimize and Audit**: Use specialized agents for performance and accessibility
5. **Create Workflows**: Build custom workflows combining multiple agents

## Resources

- [Claude Agent SDK Documentation](https://docs.anthropic.com/en/api/agent-sdk/overview)
- [Avolve AI Decision Tracking](../claudedocs/AI-DECISION-TRACKING.md)
- [Modern Tech Stack Guide](../claudedocs/TECH-STACK-ALIGNMENT-2025-09-29.md)

---

**Note**: All agents are autonomous and can understand codebases, edit files, and run commands. Always review generated code before committing to version control.