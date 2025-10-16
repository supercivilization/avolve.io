import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Model Routing Strategies | AI Orchestration Systems | Avolve.io",
  description:
    "Intelligent model selection and routing patterns for AI orchestration: cost-based routing, capability matching, latency optimization, and production strategies for multi-model systems.",
  keywords:
    "AI model routing, model selection strategies, cost optimization, GPT-4 routing, Claude routing, multi-model systems, AI orchestration patterns, Vercel AI SDK",
  alternates: {
    canonical: "https://avolve.io/systems/model-routing",
  },
};

export default function ModelRoutingPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Model Routing Strategies</h1>
        <p className="text-xl text-muted-foreground">
          Intelligent model selection and routing patterns for AI orchestration.
          Route requests to the right model based on cost, capability, latency,
          and reliability constraints.
        </p>
      </div>

      {/* Strategic Context */}
      <div className="mb-12 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20">
        <h3 className="mb-2 text-lg font-semibold text-purple-900 dark:text-purple-200">
          Strategic Foundation: Intelligence as Fungible Infrastructure
        </h3>
        <p className="mb-3 text-purple-800 dark:text-purple-300">
          Model routing embodies the economic shift in industrialized
          intelligence: models become fungible, interchangeable components.
          Route work to the cheapest capable provider, not the "best" model.
        </p>
        <p className="text-sm text-purple-700 dark:text-purple-400">
          <strong>Core insight:</strong>{" "}
          <Link
            href="/about/philosophy#the-economics-nobody-talks-about"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            Intelligence pricing determines architecture
          </Link>
          . When intelligence becomes cheap and fungible, routing optimization
          becomes a primary value driver. Read the full framework in{" "}
          <Link
            href="/about/philosophy"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            Philosophy: The Industrialization of Intelligence
          </Link>
          .
        </p>
      </div>

      {/* Core Principle */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">The Core Principle</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4 text-lg font-semibold">
            Route each request to the cheapest model that can reliably handle
            it.
          </p>
          <p className="text-muted-foreground">
            Not the best model. Not the smartest model. The cheapest model that
            meets your quality threshold. This is the fundamental shift from
            "AI as magic" to "AI as infrastructure."
          </p>
        </div>
      </section>

      {/* Routing Strategies */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Routing Strategies</h2>

        {/* Cost-Based Routing */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            1. Cost-Based Routing (The Default)
          </h3>
          <p className="mb-4 text-muted-foreground">
            Route requests based on cost optimization. Try cheaper models first,
            fallback to expensive models only when necessary.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">Pattern: Waterfall Routing</h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Vercel AI SDK - Cost-optimized waterfall routing
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

async function generateWithCostOptimization(prompt: string) {
  const models = [
    { provider: openai('gpt-4o-mini'), cost: 0.15, name: 'GPT-4o Mini' },
    { provider: openai('gpt-4o'), cost: 2.5, name: 'GPT-4o' },
    { provider: anthropic('claude-3-5-sonnet-20241022'), cost: 3.0, name: 'Claude 3.5 Sonnet' },
  ];

  for (const model of models) {
    try {
      const result = await generateText({
        model: model.provider,
        prompt,
        maxTokens: 500,
      });

      // Validate quality (simple check - customize for your needs)
      if (result.text.length > 50 && !result.text.includes('[ERROR]')) {
        console.log(\`✅ Success with \${model.name} (\$\${model.cost}/1M tokens)\`);
        return { text: result.text, model: model.name, cost: model.cost };
      }
    } catch (error) {
      console.log(\`❌ Failed with \${model.name}, trying next...\`);
      continue;
    }
  }

  throw new Error('All models failed');
}`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Cost Reality Check:</strong> GPT-4o Mini at $0.15/1M input
              tokens is 16x cheaper than Claude 3.5 Sonnet at $3.00/1M. For many
              tasks, the quality difference doesn't justify the 16x cost
              multiplier.
            </p>
          </div>
        </div>

        {/* Capability-Based Routing */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            2. Capability-Based Routing
          </h3>
          <p className="mb-4 text-muted-foreground">
            Route based on task complexity and required capabilities. Match task
            characteristics to model strengths.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Task Classification Router
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Route based on task complexity
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

type TaskComplexity = 'simple' | 'moderate' | 'complex' | 'reasoning';

interface RoutingDecision {
  model: any;
  name: string;
  reason: string;
}

function selectModelByComplexity(complexity: TaskComplexity): RoutingDecision {
  switch (complexity) {
    case 'simple':
      // Classification, extraction, simple Q&A
      return {
        model: openai('gpt-4o-mini'),
        name: 'GPT-4o Mini',
        reason: 'Fast and cheap for simple tasks',
      };

    case 'moderate':
      // Summarization, moderate writing, basic reasoning
      return {
        model: openai('gpt-4o'),
        name: 'GPT-4o',
        reason: 'Balanced cost/performance for moderate complexity',
      };

    case 'complex':
      // Long-form writing, complex analysis, nuanced tasks
      return {
        model: anthropic('claude-3-5-sonnet-20241022'),
        name: 'Claude 3.5 Sonnet',
        reason: 'Superior performance on complex creative and analytical tasks',
      };

    case 'reasoning':
      // Mathematical reasoning, logic, step-by-step problem solving
      return {
        model: openai('o1-mini'),
        name: 'OpenAI o1-mini',
        reason: 'Specialized reasoning model with extended thinking time',
      };
  }
}

async function generateByComplexity(
  prompt: string,
  complexity: TaskComplexity
) {
  const { model, name, reason } = selectModelByComplexity(complexity);

  console.log(\`Routing to \${name}: \${reason}\`);

  const result = await generateText({
    model,
    prompt,
    maxTokens: 1000,
  });

  return { text: result.text, model: name };
}`}</code>
            </pre>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 font-semibold text-sm">
              Capability Mapping Guide:
            </h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Task Type</th>
                  <th className="py-2 text-left">Recommended Model</th>
                  <th className="py-2 text-left">Why</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2">Classification</td>
                  <td className="py-2">GPT-4o Mini</td>
                  <td className="py-2">Fast, cheap, accurate enough</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Data extraction</td>
                  <td className="py-2">GPT-4o Mini</td>
                  <td className="py-2">Structured output at low cost</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Creative writing</td>
                  <td className="py-2">Claude 3.5 Sonnet</td>
                  <td className="py-2">Superior creative capabilities</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Code generation</td>
                  <td className="py-2">GPT-4o / Claude 3.5</td>
                  <td className="py-2">Both excel, choose by ecosystem</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Math/reasoning</td>
                  <td className="py-2">o1-mini / o1</td>
                  <td className="py-2">
                    Specialized reasoning capabilities
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Long context</td>
                  <td className="py-2">Claude 3.5 Sonnet</td>
                  <td className="py-2">200K context, better recall</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Real-time chat</td>
                  <td className="py-2">GPT-4o</td>
                  <td className="py-2">Fast response, good streaming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Latency-Based Routing */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            3. Latency-Based Routing
          </h3>
          <p className="mb-4 text-muted-foreground">
            Route based on response time requirements. User-facing features need
            fast models, background jobs can use slower, cheaper models.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Latency-Aware Router
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Route based on latency requirements
type LatencyRequirement = 'realtime' | 'interactive' | 'background';

interface ModelPerformance {
  model: any;
  name: string;
  avgLatency: number; // milliseconds
  cost: number; // per 1M tokens
}

const modelsByLatency: Record<LatencyRequirement, ModelPerformance> = {
  realtime: {
    // <500ms target - user typing, autocomplete
    model: openai('gpt-4o-mini'),
    name: 'GPT-4o Mini',
    avgLatency: 300,
    cost: 0.15,
  },
  interactive: {
    // <2s target - chat responses, form submissions
    model: openai('gpt-4o'),
    name: 'GPT-4o',
    avgLatency: 1200,
    cost: 2.5,
  },
  background: {
    // >2s acceptable - reports, batch processing
    model: anthropic('claude-3-5-sonnet-20241022'),
    name: 'Claude 3.5 Sonnet',
    avgLatency: 2500,
    cost: 3.0,
  },
};

async function generateByLatency(
  prompt: string,
  requirement: LatencyRequirement
) {
  const modelConfig = modelsByLatency[requirement];

  console.log(
    \`Latency requirement: \${requirement} (~\${modelConfig.avgLatency}ms)\`
  );

  const result = await generateText({
    model: modelConfig.model,
    prompt,
    maxTokens: 500,
  });

  return { text: result.text, model: modelConfig.name };
}`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Latency Reality:</strong> Model response time varies
              significantly. GPT-4o Mini averages 300-500ms for short
              completions. Claude 3.5 Sonnet can take 2-4s for similar tasks.
              For user-facing features, latency often matters more than quality.
            </p>
          </div>
        </div>

        {/* Hybrid Routing */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            4. Hybrid Routing (Production Pattern)
          </h3>
          <p className="mb-4 text-muted-foreground">
            Combine cost, capability, and latency constraints. This is what you
            actually use in production.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Production Router with Multi-Factor Decision
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Production-ready router combining multiple factors
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

interface RoutingContext {
  taskType: 'classification' | 'generation' | 'reasoning' | 'creative';
  latencyBudget: number; // milliseconds
  costBudget: number; // per request
  userTier: 'free' | 'pro' | 'enterprise';
}

interface ModelConfig {
  provider: any;
  name: string;
  cost: number; // per 1M tokens
  avgLatency: number; // ms
  capabilities: string[];
}

const MODEL_REGISTRY: ModelConfig[] = [
  {
    provider: openai('gpt-4o-mini'),
    name: 'GPT-4o Mini',
    cost: 0.15,
    avgLatency: 300,
    capabilities: ['classification', 'extraction', 'simple-generation'],
  },
  {
    provider: openai('gpt-4o'),
    name: 'GPT-4o',
    cost: 2.5,
    avgLatency: 1200,
    capabilities: ['generation', 'reasoning', 'creative', 'code'],
  },
  {
    provider: anthropic('claude-3-5-sonnet-20241022'),
    name: 'Claude 3.5 Sonnet',
    cost: 3.0,
    avgLatency: 2500,
    capabilities: ['creative', 'reasoning', 'long-context', 'nuanced'],
  },
  {
    provider: openai('o1-mini'),
    name: 'OpenAI o1-mini',
    cost: 3.0,
    avgLatency: 5000,
    capabilities: ['reasoning', 'math', 'logic'],
  },
];

function selectModel(context: RoutingContext): ModelConfig {
  // Filter by capability
  let candidates = MODEL_REGISTRY.filter((m) =>
    m.capabilities.includes(context.taskType)
  );

  // Filter by latency budget
  candidates = candidates.filter((m) => m.avgLatency <= context.latencyBudget);

  // Filter by cost budget (estimate: 500 tokens @ $X/1M)
  const estimatedTokens = 500;
  candidates = candidates.filter((m) => {
    const estimatedCost = (m.cost / 1_000_000) * estimatedTokens;
    return estimatedCost <= context.costBudget;
  });

  // Apply user tier constraints
  if (context.userTier === 'free') {
    // Free tier: only cheapest models
    candidates = candidates.filter((m) => m.cost < 1.0);
  }

  // Sort by cost (cheapest first) and return the first match
  candidates.sort((a, b) => a.cost - b.cost);

  if (candidates.length === 0) {
    throw new Error(
      \`No model available for constraints: \${JSON.stringify(context)}\`
    );
  }

  return candidates[0];
}

async function generateWithRouting(
  prompt: string,
  context: RoutingContext
) {
  const model = selectModel(context);

  console.log(\`
🎯 Model Selection:
   Task: \${context.taskType}
   Model: \${model.name}
   Cost: \$\${model.cost}/1M tokens
   Latency: ~\${model.avgLatency}ms
   User Tier: \${context.userTier}
  \`);

  const result = await generateText({
    model: model.provider,
    prompt,
    maxTokens: 500,
  });

  return {
    text: result.text,
    model: model.name,
    estimatedCost: (model.cost / 1_000_000) * 500,
  };
}

// Usage example
const result = await generateWithRouting(
  'Summarize this article: ...',
  {
    taskType: 'generation',
    latencyBudget: 2000, // 2s max
    costBudget: 0.01, // 1 cent max
    userTier: 'free',
  }
);`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Token Economics */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Token Economics</h2>

        <p className="mb-4 text-muted-foreground">
          Model routing is fundamentally about economics. Here's what the
          numbers actually look like:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Model</th>
                <th className="py-2 text-right">Input ($/1M)</th>
                <th className="py-2 text-right">Output ($/1M)</th>
                <th className="py-2 text-right">Cost per 1K Request*</th>
                <th className="py-2 text-right">Relative Cost</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2">GPT-4o Mini</td>
                <td className="py-2 text-right">$0.15</td>
                <td className="py-2 text-right">$0.60</td>
                <td className="py-2 text-right">$0.38</td>
                <td className="py-2 text-right">1x (baseline)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">GPT-4o</td>
                <td className="py-2 text-right">$2.50</td>
                <td className="py-2 text-right">$10.00</td>
                <td className="py-2 text-right">$6.25</td>
                <td className="py-2 text-right">16x</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Claude 3.5 Sonnet</td>
                <td className="py-2 text-right">$3.00</td>
                <td className="py-2 text-right">$15.00</td>
                <td className="py-2 text-right">$9.00</td>
                <td className="py-2 text-right">24x</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">OpenAI o1-mini</td>
                <td className="py-2 text-right">$3.00</td>
                <td className="py-2 text-right">$12.00</td>
                <td className="py-2 text-right">$7.50</td>
                <td className="py-2 text-right">20x</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">GPT-4 Turbo</td>
                <td className="py-2 text-right">$10.00</td>
                <td className="py-2 text-right">$30.00</td>
                <td className="py-2 text-right">$20.00</td>
                <td className="py-2 text-right">53x</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          * Estimated cost per 1,000 requests assuming 500 input tokens, 500
          output tokens per request
        </p>

        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
          <h4 className="mb-2 font-semibold text-red-900 dark:text-red-200">
            The 24x Cost Trap
          </h4>
          <p className="text-sm text-red-800 dark:text-red-300">
            Using Claude 3.5 Sonnet for every request when GPT-4o Mini would
            suffice costs 24x more. At 1M requests/month, that's $9,000 vs
            $380. Smart routing isn't optional—it's survival.
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-muted p-6">
          <h4 className="mb-3 font-semibold">
            Real-World Routing Impact Example:
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Scenario:</strong> SaaS app with 100K requests/day (3M/month)
            </p>
            <p className="ml-4">
              • <strong>No routing (all Claude 3.5):</strong> 3M × $0.009 ={" "}
              <strong className="text-red-600 dark:text-red-400">
                $27,000/month
              </strong>
            </p>
            <p className="ml-4">
              • <strong>Simple routing (70% GPT-4o Mini, 30% Claude 3.5):</strong>
            </p>
            <p className="ml-8">
              2.1M × $0.00038 + 900K × $0.009 ={" "}
              <strong className="text-green-600 dark:text-green-400">
                $8,898/month
              </strong>
            </p>
            <p className="ml-4 mt-2 font-semibold text-green-700 dark:text-green-300">
              💰 Savings: $18,102/month ($217,224/year)
            </p>
          </div>
        </div>
      </section>

      {/* Production Considerations */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Production Considerations</h2>

        <div className="space-y-6">
          {/* Fallback Strategy */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">1. Fallback Strategy</h3>
            <p className="mb-3 text-muted-foreground">
              Models fail. APIs have outages. Always have a fallback plan.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`// Fallback with retry logic
async function generateWithFallback(prompt: string) {
  const models = [
    openai('gpt-4o-mini'),
    openai('gpt-4o'),
    anthropic('claude-3-5-sonnet-20241022'),
  ];

  for (const model of models) {
    try {
      return await generateText({ model, prompt, maxTokens: 500 });
    } catch (error) {
      console.error(\`Model failed, trying next: \${error}\`);
      continue;
    }
  }

  throw new Error('All models failed');
}`}</code>
              </pre>
            </div>
          </div>

          {/* Rate Limiting */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              2. Rate Limiting Awareness
            </h3>
            <p className="mb-3 text-muted-foreground">
              Different models have different rate limits. Route around
              congestion.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="mb-2">
                <strong>Typical Rate Limits (varies by tier):</strong>
              </p>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>GPT-4o Mini: 30,000 RPM (requests per minute)</li>
                <li>GPT-4o: 10,000 RPM</li>
                <li>Claude 3.5 Sonnet: 4,000 RPM</li>
                <li>OpenAI o1-mini: 500 RPM</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                If you hit rate limits on your primary model, automatically
                route to secondary model instead of failing.
              </p>
            </div>
          </div>

          {/* Monitoring */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              3. Monitoring and Observability
            </h3>
            <p className="mb-3 text-muted-foreground">
              Track which models are actually being used and their performance.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`// Add telemetry to routing decisions
async function generateWithTelemetry(prompt: string, context: RoutingContext) {
  const model = selectModel(context);
  const startTime = Date.now();

  try {
    const result = await generateText({
      model: model.provider,
      prompt,
      maxTokens: 500,
    });

    const latency = Date.now() - startTime;

    // Log to your analytics (PostHog, Segment, etc.)
    analytics.track('model_routing', {
      model: model.name,
      taskType: context.taskType,
      latency,
      success: true,
      userTier: context.userTier,
      estimatedCost: (model.cost / 1_000_000) * 500,
    });

    return result;
  } catch (error) {
    analytics.track('model_routing', {
      model: model.name,
      taskType: context.taskType,
      success: false,
      error: error.message,
    });
    throw error;
  }
}`}</code>
              </pre>
            </div>
          </div>

          {/* A/B Testing */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              4. A/B Testing Routing Strategies
            </h3>
            <p className="mb-3 text-muted-foreground">
              Don't guess which routing strategy works best. Measure it.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="mb-2">
                <strong>What to test:</strong>
              </p>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>Does aggressive cost optimization hurt user satisfaction?</li>
                <li>Is latency or quality more important to users?</li>
                <li>Do pro users notice quality difference vs free users?</li>
                <li>What's the minimum viable model for each task type?</li>
              </ul>
              <p className="mt-3 text-xs">
                Run A/B tests with different routing strategies and measure user
                engagement, satisfaction scores, and retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Common Mistakes</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Always using the "best" model
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Claude 3.5 Sonnet is amazing, but using it for simple
              classification tasks is burning money. Most tasks don't need the
              best model.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ No fallback strategy
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              When your primary model has an outage (and it will), your entire
              app goes down. Always have a backup model ready.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Ignoring latency in routing decisions
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Saving $0.002 per request doesn't matter if users bounce because
              your app feels slow. Factor latency into routing.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Not monitoring routing decisions
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              You can't optimize what you don't measure. Track which models are
              used, their latency, cost, and success rates.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Over-engineering the router
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Start simple: cost-based waterfall routing. Add complexity only
              when you have data showing you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Best Practices</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Start with cost-based waterfall routing
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Try cheap models first, fallback to expensive ones only when
              necessary. This single pattern handles 80% of routing needs.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Add quality validation
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Check if cheaper model output meets quality threshold before
              accepting it. Simple checks: length, format, keyword presence.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Separate user-facing from background tasks
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              User-facing: optimize for latency. Background: optimize for cost.
              Don't use the same routing strategy for both.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Build in observability from day one
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Track model usage, latency, cost, and success rates. You'll need
              this data to optimize routing decisions.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Test routing strategies with real data
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              A/B test different routing approaches. Measure user satisfaction,
              not just cost savings. Sometimes expensive models are worth it.
            </p>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Related Resources</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/systems/agent-coordination"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Agent Coordination Patterns</h3>
            <p className="text-sm text-muted-foreground">
              Sequential, parallel, and hierarchical multi-agent workflows.
              Orchestrate routed models into complex systems.
            </p>
          </Link>

          <Link
            href="/software/vercel-ai-sdk"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Vercel AI SDK</h3>
            <p className="text-sm text-muted-foreground">
              Implementation examples using Vercel AI SDK 5.0. Model routing,
              streaming, and multi-provider integration.
            </p>
          </Link>

          <Link
            href="/about/philosophy"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">
              Philosophy: The Industrialization of Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              Strategic framework explaining why model routing matters: fungible
              intelligence, economics, and infrastructure thinking.
            </p>
          </Link>

          <Link
            href="/systems/state-management"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">
              State Management for Multi-Agent Systems
            </h3>
            <p className="text-sm text-muted-foreground">
              Coming soon: Managing state across routed models. Memory,
              context, and temporal continuity.
            </p>
          </Link>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mb-12">
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 className="mb-4 text-2xl font-bold">Key Takeaways</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Route to the cheapest capable model</strong>, not the
                best. This single principle can save 10-50x in costs.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Start simple</strong>: Cost-based waterfall routing
                handles most use cases. Add complexity only when needed.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Factor in latency</strong>: User-facing features need
                fast models. Background jobs can use slower, cheaper models.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Always have fallbacks</strong>: Models fail. APIs have
                outages. Never depend on a single model.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Monitor everything</strong>: Track model usage, costs,
                latency, and success rates. Optimize based on data.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Test routing strategies</strong>: A/B test different
                approaches. Measure user satisfaction, not just cost savings.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Link
          href="/systems/agent-coordination"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Agent Coordination Patterns
        </Link>
        <Link
          href="/systems/state-management"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          State Management for Multi-Agent Systems →
        </Link>
      </div>
    </div>
  );
}
