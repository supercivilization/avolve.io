/**
 * AI Agent API Route - Vercel AI SDK Integration
 *
 * REST API for autonomous agent operations.
 *
 * IMPORTANT: Agents are DISABLED by default.
 * Set ENABLE_AI_AGENTS=true in .env.local to activate.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateComponent,
  reviewCode,
  implementFeature,
  optimizePerformance,
  auditAccessibility,
  getAgentConfig,
  AGENTS_ENABLED,
  type Agent,
} from '@/lib/agents';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ComponentGeneratorParams {
  name: string;
  description: string;
  location: string;
}

interface CodeReviewParams {
  path: string;
  focus?: Array<'quality' | 'performance' | 'accessibility' | 'security' | 'types' | 'testing'>;
}

interface FeatureImplementationParams {
  name: string;
  requirements: string;
}

interface PerformanceOptimizationParams {
  target?: string;
  metrics?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}

interface AccessibilityAuditParams {
  path: string;
  autoFix?: boolean;
}

type AgentParams =
  | { agent: 'componentGenerator'; params: ComponentGeneratorParams }
  | { agent: 'codeReview'; params: CodeReviewParams }
  | { agent: 'featureImplementation'; params: FeatureImplementationParams }
  | { agent: 'performanceOptimization'; params: PerformanceOptimizationParams }
  | { agent: 'accessibilityAudit'; params: AccessibilityAuditParams };

/**
 * POST /api/agents/example
 *
 * Execute an autonomous agent operation
 *
 * @example Component Generation
 * ```bash
 * curl -X POST http://localhost:3000/api/agents/example \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "agent": "componentGenerator",
 *     "params": {
 *       "name": "FeatureCard",
 *       "description": "Display feature with icon, title, and description",
 *       "location": "src/components/marketing"
 *     }
 *   }'
 * ```
 *
 * @example Code Review
 * ```bash
 * curl -X POST http://localhost:3000/api/agents/example \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "agent": "codeReview",
 *     "params": {
 *       "path": "src/components/user-profile.tsx",
 *       "focus": ["accessibility", "performance"]
 *     }
 *   }'
 * ```
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check if agents are enabled
    if (!AGENTS_ENABLED) {
      return NextResponse.json(
        {
          error: 'AI Agents are disabled',
          message: 'Set ENABLE_AI_AGENTS=true in .env.local to activate agents',
          config: getAgentConfig(),
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as AgentParams;
    const { agent, params } = body;

    // Execute the appropriate agent
    let result;
    switch (agent) {
      case 'componentGenerator':
        result = await generateComponent(params);
        break;

      case 'codeReview':
        result = await reviewCode(params);
        break;

      case 'featureImplementation':
        result = await implementFeature(params);
        break;

      case 'performanceOptimization':
        result = await optimizePerformance(params);
        break;

      case 'accessibilityAudit':
        result = await auditAccessibility(params);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown agent: ${agent}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      agent,
      result: {
        text: result.text,
        usage: result.usage,
        finishReason: result.finishReason,
      },
    });
  } catch (error) {
    console.error('Agent execution error:', error);

    // Handle disabled agents error
    if (error instanceof Error && error.message.includes('disabled')) {
      return NextResponse.json(
        {
          error: error.message,
          config: getAgentConfig(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agents/example
 *
 * Get information about available agents and their configuration
 */
export async function GET() {
  const config = getAgentConfig();

  return NextResponse.json({
    enabled: config.enabled,
    provider: config.provider,
    model: config.model,
    agents: {
      componentGenerator: {
        description: 'Generates complete React components with tests and accessibility',
        requiredParams: ['name', 'description', 'location'],
        model: config.model,
      },
      codeReview: {
        description: 'Performs comprehensive code review with actionable feedback',
        requiredParams: ['path'],
        optionalParams: ['focus'],
        model: config.model,
      },
      featureImplementation: {
        description: 'Implements complete features end-to-end with all necessary files',
        requiredParams: ['name', 'requirements'],
        model: config.opusModel,
      },
      performanceOptimization: {
        description: 'Identifies and implements performance optimizations',
        requiredParams: [],
        optionalParams: ['target', 'metrics'],
        model: config.model,
      },
      accessibilityAudit: {
        description: 'Audits and fixes accessibility issues for WCAG 2.1 AA compliance',
        requiredParams: ['path'],
        optionalParams: ['autoFix'],
        model: config.model,
      },
    },
    examples: {
      componentGenerator: {
        agent: 'componentGenerator',
        params: {
          name: 'FeatureCard',
          description: 'Display feature with icon, title, and description',
          location: 'src/components/marketing',
        },
      },
      codeReview: {
        agent: 'codeReview',
        params: {
          path: 'src/components/user-profile.tsx',
          focus: ['accessibility', 'performance'],
        },
      },
    },
    activation: {
      message: config.enabled
        ? 'Agents are active and ready to use'
        : 'Agents are disabled. Add ENABLE_AI_AGENTS=true to .env.local to activate',
      steps: config.enabled ? [] : [
        '1. Create or edit .env.local in the project root',
        '2. Add: ENABLE_AI_AGENTS=true',
        '3. Add: AI_AGENT_PROVIDER=openai (or anthropic, google)',
        '4. Ensure you have the appropriate API key configured',
        '5. Restart the development server',
      ],
    },
  });
}