import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, generateText, streamText, streamObject } from 'ai';
import { z } from 'zod';

// Initialize AI providers
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

// AI-native component generation schemas
export const ComponentSchema = z.object({
  name: z.string().describe('Component name in PascalCase'),
  description: z.string().describe('Brief description of the component'),
  props: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    description: z.string(),
    defaultValue: z.string().optional()
  })),
  jsx: z.string().describe('Complete JSX implementation'),
  css: z.string().describe('Tailwind CSS classes'),
  accessibility: z.object({
    ariaLabel: z.string().optional(),
    ariaDescribedBy: z.string().optional(),
    role: z.string().optional(),
    keyboardNavigation: z.boolean(),
    screenReaderOptimized: z.boolean()
  }),
  tests: z.string().describe('Vitest test cases'),
  storybook: z.string().describe('Storybook story'),
  performance: z.object({
    lazy: z.boolean(),
    memoized: z.boolean(),
    optimized: z.boolean()
  })
});

export const UIGenerationSchema = z.object({
  layout: z.string().describe('Layout structure'),
  components: z.array(ComponentSchema),
  styling: z.object({
    theme: z.string(),
    responsive: z.boolean(),
    darkMode: z.boolean(),
    animations: z.array(z.string())
  }),
  accessibility: z.object({
    wcagLevel: z.enum(['A', 'AA', 'AAA']),
    focusManagement: z.boolean(),
    ariaCompliant: z.boolean(),
    keyboardAccessible: z.boolean()
  }),
  performance: z.object({
    coreWebVitals: z.boolean(),
    bundleOptimized: z.boolean(),
    imageOptimized: z.boolean()
  })
});

// AI component generation function
export async function generateAIComponent(
  description: string,
  options: {
    accessibility?: 'A' | 'AA' | 'AAA';
    performance?: boolean;
    responsive?: boolean;
    darkMode?: boolean;
    animations?: boolean;
  } = {}
) {
  const {
    accessibility = 'AA',
    performance = true,
    responsive = true,
    darkMode = true,
    animations = true
  } = options;

  const systemPrompt = `You are an expert React component developer specializing in AI-native, accessible, and performant components. Generate components that follow:

1. **Accessibility-First Design**:
   - WCAG ${accessibility} compliance
   - Semantic HTML elements
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - Screen reader optimization

2. **Performance Optimization**:
   - React.memo for expensive components
   - Lazy loading where appropriate
   - Optimized re-renders
   - Bundle size optimization

3. **Vercel Design System**:
   - Use Tailwind CSS v4 with CSS variables
   - Follow spacing, typography, and color guidelines
   - Implement proper focus states
   - Respect motion preferences

4. **Modern React Patterns**:
   - Use React 19 features where appropriate
   - Server Components when possible
   - Proper TypeScript typing
   - Error boundaries for resilience

5. **Testing & Documentation**:
   - Comprehensive Vitest tests
   - Storybook stories
   - JSDoc documentation
   - Usage examples`;

  const result = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    schema: ComponentSchema,
    system: systemPrompt,
    prompt: `Generate a React component: ${description}

Requirements:
- WCAG ${accessibility} compliant
- ${performance ? 'Performance optimized' : 'Standard performance'}
- ${responsive ? 'Fully responsive' : 'Desktop focused'}
- ${darkMode ? 'Dark mode support' : 'Light mode only'}
- ${animations ? 'Motion-aware animations' : 'No animations'}

Include complete implementation with TypeScript, tests, and documentation.`
  });

  return result.object;
}

// AI-powered UI generation
export async function generateAIInterface(
  userStory: string,
  context: {
    platform?: 'web' | 'mobile' | 'desktop';
    complexity?: 'simple' | 'moderate' | 'complex';
    features?: string[];
    constraints?: string[];
  } = {}
) {
  const {
    platform = 'web',
    complexity = 'moderate',
    features = [],
    constraints = []
  } = context;

  const systemPrompt = `You are an expert UI/UX designer and developer creating AI-native interfaces. Design interfaces that are:

1. **User-Centered**: Focus on user needs and workflows
2. **Accessible**: WCAG AA compliant by default
3. **Performant**: Optimized for Core Web Vitals
4. **Responsive**: Works across all device sizes
5. **Inclusive**: Supports diverse user capabilities
6. **Modern**: Uses latest design patterns and technologies

Consider:
- User journey and task flow
- Information architecture
- Visual hierarchy
- Interaction patterns
- Error handling and edge cases
- Loading and empty states
- Progressive enhancement`;

  const result = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    schema: UIGenerationSchema,
    system: systemPrompt,
    prompt: `Create a complete UI interface for: ${userStory}

Context:
- Platform: ${platform}
- Complexity: ${complexity}
- Features: ${features.join(', ')}
- Constraints: ${constraints.join(', ')}

Generate a comprehensive interface with all necessary components, proper accessibility, and performance optimization.`
  });

  return result.object;
}

// AI code review and optimization
export async function reviewAndOptimizeCode(
  code: string,
  type: 'component' | 'hook' | 'utility' | 'api' = 'component'
) {
  const systemPrompt = `You are a senior code reviewer specializing in React, TypeScript, and web performance. Review code for:

1. **Code Quality**:
   - Best practices adherence
   - Type safety
   - Error handling
   - Performance implications

2. **Accessibility**:
   - ARIA compliance
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

3. **Performance**:
   - Bundle size impact
   - Rendering optimization
   - Memory usage
   - Core Web Vitals

4. **Security**:
   - XSS prevention
   - Input validation
   - Safe API usage

5. **Maintainability**:
   - Code clarity
   - Documentation
   - Testing coverage
   - Refactoring opportunities`;

  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: systemPrompt,
    prompt: `Review and optimize this ${type}:

\`\`\`typescript
${code}
\`\`\`

Provide:
1. Overall assessment
2. Specific issues and recommendations
3. Optimized version if significant improvements are needed
4. Testing suggestions
5. Documentation improvements`
  });

  return result.text;
}

// AI-powered accessibility audit
export async function auditAccessibility(
  component: string,
  context: string = ''
) {
  const systemPrompt = `You are an accessibility expert conducting comprehensive WCAG audits. Analyze components for:

1. **WCAG 2.1 AA Compliance**:
   - Semantic HTML usage
   - ARIA labels and roles
   - Color contrast
   - Focus management
   - Keyboard navigation

2. **Screen Reader Experience**:
   - Content structure
   - Navigation landmarks
   - Form associations
   - Error announcements

3. **Motor Accessibility**:
   - Touch target sizes
   - Click areas
   - Gesture alternatives
   - Timeout considerations

4. **Cognitive Accessibility**:
   - Clear language
   - Consistent navigation
   - Error prevention
   - Help text availability`;

  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: systemPrompt,
    prompt: `Audit this component for accessibility:

${context ? `Context: ${context}` : ''}

\`\`\`typescript
${component}
\`\`\`

Provide:
1. WCAG compliance assessment
2. Specific accessibility issues
3. Recommendations for improvement
4. Code examples for fixes
5. Testing strategies`
  });

  return result.text;
}

// AI-powered performance optimization
export async function optimizePerformance(
  code: string,
  metrics: {
    bundleSize?: number;
    renderTime?: number;
    memoryUsage?: number;
    coreWebVitals?: {
      lcp?: number;
      fid?: number;
      cls?: number;
    };
  } = {}
) {
  const systemPrompt = `You are a performance optimization expert specializing in React and web performance. Optimize code for:

1. **Bundle Size**:
   - Tree shaking optimization
   - Dynamic imports
   - Code splitting strategies
   - Dependency analysis

2. **Runtime Performance**:
   - Render optimization
   - Memory management
   - Event handler efficiency
   - State management

3. **Core Web Vitals**:
   - LCP optimization
   - FID improvement
   - CLS prevention
   - Loading strategies

4. **Caching & CDN**:
   - Static resource optimization
   - Edge caching strategies
   - Service worker implementation`;

  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: systemPrompt,
    prompt: `Optimize this code for performance:

Current metrics: ${JSON.stringify(metrics, null, 2)}

\`\`\`typescript
${code}
\`\`\`

Provide:
1. Performance analysis
2. Specific bottlenecks
3. Optimization strategies
4. Optimized code version
5. Performance testing recommendations`
  });

  return result.text;
}

// Export utility functions for common AI operations
export const aiUtils = {
  generateComponent: generateAIComponent,
  generateInterface: generateAIInterface,
  reviewCode: reviewAndOptimizeCode,
  auditAccessibility,
  optimizePerformance
};