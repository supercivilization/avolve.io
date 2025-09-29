/**
 * AI Agent System - Vercel AI SDK Integration
 *
 * Autonomous agents for AI-native development workflows using Vercel AI SDK.
 * Supports multiple AI providers: OpenAI, Anthropic, Google AI.
 *
 * IMPORTANT: Agents are DISABLED by default. Set ENABLE_AI_AGENTS=true to activate.
 *
 * NOTE: This is a simplified version without tool calling for type safety.
 * When you're ready to activate agents, the full tool system can be implemented.
 */

import { generateText, streamText } from 'ai';
import { openai } from '@/lib/ai';
import { anthropic as anthropicProvider } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

// =============================================================================
// Configuration
// =============================================================================

/**
 * Check if agents are enabled
 * Set ENABLE_AI_AGENTS=true in .env.local to activate
 */
export const AGENTS_ENABLED = process.env.ENABLE_AI_AGENTS === 'true';

/**
 * Get the configured AI provider
 * Options: 'openai', 'anthropic', 'google'
 * Default: 'openai'
 */
export const AI_PROVIDER = (process.env.AI_AGENT_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'google';

/**
 * Get the model to use for agents
 */
function getModel() {
  switch (AI_PROVIDER) {
    case 'anthropic':
      return anthropicProvider('claude-3-5-sonnet-20241022');
    case 'google':
      return google('gemini-2.0-flash-exp');
    case 'openai':
    default:
      return openai.chat('gpt-4o');
  }
}

function getOpusModel() {
  switch (AI_PROVIDER) {
    case 'anthropic':
      return anthropicProvider('claude-opus-4-20250514');
    case 'google':
      return google('gemini-2.0-flash-thinking-exp-1219');
    case 'openai':
    default:
      return openai.chat('o1');
  }
}

// =============================================================================
// Agent System Prompts
// =============================================================================

const COMPONENT_GENERATOR_PROMPT = `You are a React component generation specialist working in a Next.js 15.5 + React 19.1 codebase.

Your task is to create production-ready components that:
1. Follow existing project patterns (analyze similar components first)
2. Use TypeScript with proper types
3. Implement Tailwind CSS v4 styling
4. Include WCAG 2.1 AA accessibility attributes
5. Are optimized for React 19.1 Server Components when appropriate
6. Include comprehensive Vitest tests

Process:
1. Search for similar existing components to understand patterns
2. Create the component file with full implementation
3. Generate test file with comprehensive coverage
4. Verify the component builds without errors

Never create placeholder or TODO comments - implement everything completely.`;

const CODE_REVIEW_PROMPT = `You are a senior code reviewer specializing in modern web development.

Review code for:
1. **Quality**: Clean code principles, SOLID, DRY, KISS
2. **Performance**: React 19 optimizations, bundle size, lazy loading
3. **Accessibility**: WCAG 2.1 AA compliance, semantic HTML, ARIA
4. **Security**: XSS prevention, input validation, sensitive data exposure
5. **Types**: TypeScript strict mode compliance, proper type definitions
6. **Testing**: Test coverage, edge cases, integration tests

Provide:
- Specific issues with file:line references
- Severity ratings (critical/important/recommended)
- Actionable fix recommendations with code examples
- Overall quality score and summary

Be honest and critical - don't inflate scores or use marketing language.`;

const FEATURE_IMPLEMENTATION_PROMPT = `You are a full-stack feature implementation specialist.

Your task is to implement complete, production-ready features that:
1. Work end-to-end across the full stack
2. Integrate seamlessly with existing code
3. Include proper error handling and loading states
4. Have comprehensive test coverage
5. Follow all project conventions and patterns

Process:
1. Analyze feature requirements and break down into tasks
2. Survey existing codebase to understand patterns
3. Plan file structure and integration points
4. Implement all necessary files (components, utilities, routes, tests)
5. Verify everything builds and tests pass
6. Create usage documentation

Never leave placeholder code - implement everything to completion.`;

const PERFORMANCE_OPTIMIZATION_PROMPT = `You are a performance optimization specialist for modern web applications.

Focus on:
1. **React 19 Optimizations**: Server Components, selective hydration, concurrent features
2. **Bundle Optimization**: Code splitting, lazy loading, tree shaking
3. **Core Web Vitals**: LCP, FID, CLS improvements
4. **Caching**: Leverage Turbopack and Next.js 15.5 caching strategies
5. **Images**: Next.js Image optimization, lazy loading, WebP conversion

Process:
1. Analyze current performance metrics (build output, runtime profiling)
2. Identify top 3-5 optimization opportunities
3. Implement fixes with measurable improvements
4. Verify improvements with before/after metrics
5. Document optimization strategies applied

Provide concrete metrics showing improvement percentages.`;

const ACCESSIBILITY_AUDIT_PROMPT = `You are an accessibility compliance specialist focused on WCAG 2.1 AA.

Audit for:
1. **Semantic HTML**: Proper element usage, heading hierarchy
2. **Keyboard Navigation**: Focus management, tab order, keyboard shortcuts
3. **ARIA**: Proper roles, states, properties
4. **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
5. **Screen Readers**: Alt text, labels, descriptions
6. **Form Accessibility**: Labels, error messages, validation

Process:
1. Scan components for accessibility issues
2. Categorize by severity (critical/important/recommended)
3. Implement fixes automatically where possible
4. Generate detailed accessibility report
5. Provide manual testing checklist for complex interactions

All fixes must maintain existing functionality and design.`;

// =============================================================================
// Agent Execution Functions
// =============================================================================

/**
 * Check if agents are enabled, throw error if not
 */
function checkAgentsEnabled() {
  if (!AGENTS_ENABLED) {
    throw new Error(
      'AI Agents are disabled. Set ENABLE_AI_AGENTS=true in .env.local to activate.'
    );
  }
}

/**
 * Generate a new React component
 *
 * @example
 * ```typescript
 * await generateComponent({
 *   name: 'UserProfile',
 *   description: 'Display user profile with avatar, name, bio, and actions',
 *   location: 'src/components/user'
 * });
 * ```
 */
export async function generateComponent(params: {
  name: string;
  description: string;
  location: string;
}) {
  checkAgentsEnabled();

  const { name, description, location } = params;

  const result = await generateText({
    model: getModel(),
    system: COMPONENT_GENERATOR_PROMPT,
    prompt: `Generate a React component named "${name}" in the "${location}" directory.

Component Requirements:
${description}

Follow all project conventions and generate a complete, production-ready component.

IMPORTANT: When ready, you can use file system operations to create the component files.
For now, provide the complete component code and test file code in your response.`,
  });

  return result;
}

/**
 * Review code for quality, performance, accessibility, and security
 *
 * @example
 * ```typescript
 * await reviewCode({
 *   path: 'src/components/user-profile.tsx',
 *   focus: ['performance', 'accessibility']
 * });
 * ```
 */
export async function reviewCode(params: {
  path: string;
  focus?: Array<'quality' | 'performance' | 'accessibility' | 'security' | 'types' | 'testing'>;
}) {
  checkAgentsEnabled();

  const { path, focus = [] } = params;

  const focusAreas = focus.length > 0
    ? `Focus specifically on: ${focus.join(', ')}`
    : 'Perform comprehensive review across all areas';

  const result = await generateText({
    model: getModel(),
    system: CODE_REVIEW_PROMPT,
    prompt: `Review the code at "${path}".

${focusAreas}

Provide detailed, actionable feedback with specific examples.

IMPORTANT: When ready, you can read the file to analyze it.
For now, provide a template review format showing what would be analyzed.`,
  });

  return result;
}

/**
 * Implement a complete feature end-to-end
 *
 * @example
 * ```typescript
 * await implementFeature({
 *   name: 'User Authentication',
 *   requirements: `
 *     - Login form with email/password
 *     - Social login (Google, GitHub)
 *     - Password reset flow
 *     - Protected routes
 *     - Session management
 *   `
 * });
 * ```
 */
export async function implementFeature(params: {
  name: string;
  requirements: string;
}) {
  checkAgentsEnabled();

  const { name, requirements } = params;

  const result = await generateText({
    model: getOpusModel(), // Use more powerful model for feature implementation
    system: FEATURE_IMPLEMENTATION_PROMPT,
    prompt: `Implement the feature: "${name}"

Requirements:
${requirements}

Implement everything completely - no placeholders or TODOs.

IMPORTANT: When ready, you can create multiple files for the feature.
For now, provide complete code for all necessary files in your response.`,
  });

  return result;
}

/**
 * Optimize application performance
 *
 * @example
 * ```typescript
 * await optimizePerformance({
 *   target: 'src/app/dashboard',
 *   metrics: { lcp: 4.2, fid: 180, cls: 0.15 }
 * });
 * ```
 */
export async function optimizePerformance(params: {
  target?: string;
  metrics?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
} = {}) {
  checkAgentsEnabled();

  const { target = 'entire application', metrics } = params;

  const metricsContext = metrics
    ? `\n\nCurrent metrics:\n- LCP: ${metrics.lcp || 'unknown'}s\n- FID: ${metrics.fid || 'unknown'}ms\n- CLS: ${metrics.cls || 'unknown'}`
    : '';

  const result = await generateText({
    model: getModel(),
    system: PERFORMANCE_OPTIMIZATION_PROMPT,
    prompt: `Optimize performance for: ${target}${metricsContext}

Identify and implement the highest-impact optimizations first.
Provide before/after metrics where possible.

IMPORTANT: When ready, you can analyze and modify files.
For now, provide specific optimization recommendations with code examples.`,
  });

  return result;
}

/**
 * Audit and fix accessibility issues
 *
 * @example
 * ```typescript
 * await auditAccessibility({
 *   path: 'src/components',
 *   autoFix: true
 * });
 * ```
 */
export async function auditAccessibility(params: {
  path: string;
  autoFix?: boolean;
}) {
  checkAgentsEnabled();

  const { path, autoFix = false } = params;

  const fixInstruction = autoFix
    ? 'Automatically implement fixes for all identified issues.'
    : 'Generate a detailed report of issues without making changes.';

  const result = await generateText({
    model: getModel(),
    system: ACCESSIBILITY_AUDIT_PROMPT,
    prompt: `Audit accessibility for: ${path}

${fixInstruction}

Ensure full WCAG 2.1 AA compliance.

IMPORTANT: When ready, you can scan files and make fixes.
For now, provide a detailed accessibility audit report template.`,
  });

  return result;
}

// =============================================================================
// Streaming Versions (for UI integration)
// =============================================================================

/**
 * Stream component generation progress
 */
export async function generateComponentStream(params: {
  name: string;
  description: string;
  location: string;
}) {
  checkAgentsEnabled();

  const { name, description, location } = params;

  return streamText({
    model: getModel(),
    system: COMPONENT_GENERATOR_PROMPT,
    prompt: `Generate a React component named "${name}" in the "${location}" directory.

Component Requirements:
${description}

Follow all project conventions and generate a complete, production-ready component.

IMPORTANT: When ready, you can use file system operations to create the component files.
For now, provide the complete component code and test file code in your response.`,
  });
}

// =============================================================================
// Utility Types
// =============================================================================

export type Agent = 'componentGenerator' | 'codeReview' | 'featureImplementation' | 'performanceOptimization' | 'accessibilityAudit';

export interface AgentResult {
  text: string;
  toolCalls?: Array<{
    toolName: string;
    args: Record<string, unknown>;
    result?: unknown;
  }>;
  finishReason: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// =============================================================================
// Configuration Helper
// =============================================================================

/**
 * Get agent configuration status
 */
export function getAgentConfig() {
  return {
    enabled: AGENTS_ENABLED,
    provider: AI_PROVIDER,
    model: AI_PROVIDER === 'anthropic' ? 'claude-3-5-sonnet' :
           AI_PROVIDER === 'google' ? 'gemini-2.0-flash' : 'gpt-4o',
    opusModel: AI_PROVIDER === 'anthropic' ? 'claude-opus-4' :
               AI_PROVIDER === 'google' ? 'gemini-2.0-flash-thinking' : 'o1',
    availableAgents: [
      'componentGenerator',
      'codeReview',
      'featureImplementation',
      'performanceOptimization',
      'accessibilityAudit',
    ] as Agent[],
    note: 'Agents are currently in simplified mode without file system access. Full tool calling will be enabled when agents are activated.',
  };
}