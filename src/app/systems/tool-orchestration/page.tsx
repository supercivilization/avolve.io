import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Tool Orchestration with MCP | AI Agent Systems | Avolve.io",
  description:
    "Building AI agents with Model Context Protocol (MCP) tools. Patterns for tool generation, orchestration, error handling, and production MCP server integration.",
  keywords:
    "MCP, Model Context Protocol, AI tools, tool orchestration, agent capabilities, AI SDK tools, Vercel AI SDK, Claude MCP, tool generation",
  alternates: {
    canonical: "https://avolve.io/systems/tool-orchestration",
  },
};

export default function ToolOrchestrationPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">
          Tool Orchestration with Model Context Protocol
        </h1>
        <p className="text-xl text-muted-foreground">
          MCP transforms AI agents from conversational interfaces into action-taking systems. Give agents capabilities through standardized tools, orchestrate complex workflows, and build production-ready integrations.
        </p>
      </div>

      {/* Strategic Context */}
      <div className="mb-12 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20">
        <h3 className="mb-2 text-lg font-semibold text-purple-900 dark:text-purple-200">
          Strategic Foundation: Infrastructure Inversion
        </h3>
        <p className="mb-3 text-purple-800 dark:text-purple-300">
          MCP tools represent infrastructure inversion: humans and systems become function calls accessible to AI agents. The agent decides when to invoke capabilities. We provide the infrastructure.
        </p>
        <p className="text-sm text-purple-700 dark:text-purple-400">
          <strong>Core insight:</strong>{" "}
          <Link
            href="/about/philosophy#infrastructure-inversion"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            Humans as infrastructure, agents as decision-makers
          </Link>
          . MCP tools are function calls that wrap human capabilities, databases, APIs, and systems. Read the full framework in{" "}
          <Link
            href="/about/philosophy"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            Philosophy: The Industrialization of Intelligence
          </Link>
          .
        </p>
      </div>

      {/* What is MCP */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">What is Model Context Protocol?</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4 text-muted-foreground">
            <strong>Model Context Protocol (MCP)</strong> is an open standard by Anthropic for connecting AI models to external tools, data sources, and capabilities. Instead of hardcoding integrations into every AI app, MCP provides a universal protocol for tool exposure.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Core Concepts:</strong></p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground ml-4">
              <li><strong>MCP Servers:</strong> Applications that expose tools, resources, and prompts via the protocol</li>
              <li><strong>MCP Clients:</strong> AI applications (like Claude Code, Vercel AI SDK) that connect to servers</li>
              <li><strong>Tools:</strong> Functions agents can call (e.g., database queries, API calls, file operations)</li>
              <li><strong>Resources:</strong> Data sources agents can read (e.g., documentation, configuration)</li>
              <li><strong>Prompts:</strong> Reusable prompt templates exposed by servers</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Why MCP matters:</strong> Before MCP, every AI app built custom integrations. With MCP, build the integration once, use it across all MCP-compatible applications. Write an MCP server for your database? Now Claude Code, Vercel AI SDK, and any MCP client can use it.
          </p>
        </div>
      </section>

      {/* Tool Patterns */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Tool Orchestration Patterns</h2>

        {/* Basic Tool Usage */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            1. Basic Tool Execution
          </h3>
          <p className="mb-4 text-muted-foreground">
            Give agents access to specific tools. Agent decides when to call them based on user request.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Simple Tool Execution with Vercel AI SDK
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Vercel AI SDK - Basic tool usage
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define a simple tool
const weatherTool = tool({
  description: 'Get current weather for a location',
  parameters: z.object({
    location: z.string().describe('City name or zip code'),
    units: z.enum(['celsius', 'fahrenheit']).default('fahrenheit'),
  }),
  execute: async ({ location, units }) => {
    // Call weather API
    const response = await fetch(
      \`https://api.weather.com/current?location=\${location}&units=\${units}\`
    );
    const data = await response.json();

    return {
      temperature: data.temp,
      conditions: data.conditions,
      humidity: data.humidity,
    };
  },
});

// Give agent access to tool
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'What\\'s the weather like in San Francisco?',
  tools: {
    getWeather: weatherTool,
  },
  maxSteps: 5, // Allow multi-step tool usage
});

console.log(result.text);
// Agent automatically decides to call getWeather tool
// Returns natural language response with weather data`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Key insight:</strong> You define capabilities (tools), the agent decides when to use them. No explicit control flow. This is the shift from imperative to declarative agent programming.
            </p>
          </div>
        </div>

        {/* Multi-Tool Orchestration */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            2. Multi-Tool Orchestration
          </h3>
          <p className="mb-4 text-muted-foreground">
            Agents can chain multiple tool calls to complete complex tasks. Define the tools, agent figures out the execution order.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Tool Chaining for Complex Workflows
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Multi-tool agent for customer support
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Tool 1: Search customer database
const searchCustomer = tool({
  description: 'Search for customer by email or ID',
  parameters: z.object({
    query: z.string().describe('Email or customer ID'),
  }),
  execute: async ({ query }) => {
    const customer = await db.customers.findFirst({
      where: { OR: [{ email: query }, { id: query }] },
    });
    return customer;
  },
});

// Tool 2: Get order history
const getOrderHistory = tool({
  description: 'Get order history for a customer',
  parameters: z.object({
    customerId: z.string().describe('Customer ID'),
  }),
  execute: async ({ customerId }) => {
    const orders = await db.orders.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return orders;
  },
});

// Tool 3: Issue refund
const issueRefund = tool({
  description: 'Issue a refund for an order',
  parameters: z.object({
    orderId: z.string().describe('Order ID to refund'),
    amount: z.number().describe('Refund amount in dollars'),
    reason: z.string().describe('Reason for refund'),
  }),
  execute: async ({ orderId, amount, reason }) => {
    const refund = await stripe.refunds.create({
      charge: orderId,
      amount: amount * 100, // Stripe uses cents
      reason,
    });

    // Log to database
    await db.refunds.create({
      data: { orderId, amount, reason, stripeRefundId: refund.id },
    });

    return { success: true, refundId: refund.id };
  },
});

// Agent orchestrates tool usage automatically
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Customer john@example.com wants a refund for their most recent order. Issue $29.99 refund for damaged item.',
  tools: {
    searchCustomer,
    getOrderHistory,
    issueRefund,
  },
  maxSteps: 10,
});

// Agent workflow (automatic):
// 1. Calls searchCustomer({ query: 'john@example.com' })
// 2. Calls getOrderHistory({ customerId: '<customer-id>' })
// 3. Calls issueRefund({ orderId: '<order-id>', amount: 29.99, reason: 'damaged item' })
// 4. Returns natural language confirmation`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Production consideration:</strong> Set \`maxSteps\` to prevent infinite tool loops. Agent can get stuck calling tools repeatedly. Typical range: 5-15 steps depending on workflow complexity.
            </p>
          </div>
        </div>

        {/* MCP Server Integration */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            3. MCP Server Integration
          </h3>
          <p className="mb-4 text-muted-foreground">
            Connect to existing MCP servers to expose entire systems as tools. No need to build every integration from scratch.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Connecting to MCP Servers
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Example: Using Supabase MCP server
// Configuration in mcp.config.json:
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp",
      "params": {
        "features": "database,docs,debugging,development,functions,storage",
        "readonly": false
      }
    }
  }
}

// Vercel AI SDK automatically exposes MCP tools
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Agent now has access to ALL Supabase MCP tools:
// - Query database tables
// - Read Supabase documentation
// - Manage storage buckets
// - Deploy Edge Functions
// - etc.

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Show me all users who signed up in the last 7 days',
  // Tools from MCP servers automatically included
  maxSteps: 5,
});

// Agent will:
// 1. Use Supabase MCP query tool
// 2. Construct appropriate SQL query
// 3. Return formatted results`}</code>
            </pre>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 font-semibold text-sm">
              Popular MCP Servers:
            </h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">MCP Server</th>
                  <th className="py-2 text-left">Capabilities</th>
                  <th className="py-2 text-left">Use Cases</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2">Supabase</td>
                  <td className="py-2">Database, auth, storage, functions</td>
                  <td className="py-2">Full backend operations</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">GitHub</td>
                  <td className="py-2">Repos, issues, PRs, code search</td>
                  <td className="py-2">Code management automation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Filesystem</td>
                  <td className="py-2">Read, write, search files</td>
                  <td className="py-2">File operations, code generation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Playwright</td>
                  <td className="py-2">Browser automation, testing</td>
                  <td className="py-2">E2E testing, web scraping</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">shadcn/ui</td>
                  <td className="py-2">Component search, examples</td>
                  <td className="py-2">UI development assistance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tool Generation from APIs */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            4. Automatic Tool Generation
          </h3>
          <p className="mb-4 text-muted-foreground">
            Generate AI SDK tools automatically from existing systems: OpenAPI specs, databases, internal APIs.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Generate Tools from OpenAPI Spec
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Automatic tool generation from OpenAPI/Swagger
import { generateToolsFromOpenAPI } from '@ai-sdk/tools';

// Generate tools from OpenAPI spec
const stripeTools = await generateToolsFromOpenAPI({
  spec: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml',
  operations: [
    'create_customer',
    'list_customers',
    'create_payment_intent',
    'list_charges',
  ],
  auth: {
    type: 'bearer',
    token: process.env.STRIPE_SECRET_KEY,
  },
});

// Now use auto-generated tools
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Create a customer for john@example.com and charge them $99',
  tools: stripeTools,
  maxSteps: 10,
});

// Agent automatically:
// 1. Calls create_customer tool with email
// 2. Calls create_payment_intent with customer ID and amount
// 3. Returns confirmation`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20">
            <p className="text-sm text-purple-800 dark:text-purple-300">
              <strong>Production pattern:</strong> Auto-generate tools for internal APIs using OpenAPI specs. One spec = dozens of AI-accessible tools. No manual tool writing required.
            </p>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Error Handling in Tool Orchestration</h2>

        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            Tools fail. APIs timeout. Databases are down. Production tool orchestration requires comprehensive error handling.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Production Error Handling Pattern
          </h3>

          <div className="rounded-lg bg-muted p-6">
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Robust tool error handling
import { tool } from 'ai';
import { z } from 'zod';

const robustTool = tool({
  description: 'Production-ready tool with error handling',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    try {
      // Attempt operation
      const result = await externalAPI.query(query);

      // Validate result
      if (!result || !result.data) {
        return {
          success: false,
          error: 'Invalid response from API',
          message: 'The API returned an unexpected format. Please try again.',
        };
      }

      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      // Log error for monitoring
      console.error('Tool execution failed:', error);

      // Return structured error to agent
      if (error.code === 'TIMEOUT') {
        return {
          success: false,
          error: 'timeout',
          message: 'The operation timed out. The service may be experiencing high load.',
          retryable: true,
        };
      }

      if (error.code === 'RATE_LIMIT') {
        return {
          success: false,
          error: 'rate_limit',
          message: 'Rate limit exceeded. Please wait before retrying.',
          retryable: true,
          retryAfter: error.retryAfter,
        };
      }

      // Generic error
      return {
        success: false,
        error: 'unknown',
        message: \`Operation failed: \${error.message}\`,
        retryable: false,
      };
    }
  },
});

// Agent receives structured error responses and can:
// - Retry on retryable errors
// - Use alternative tools
// - Inform user about failures gracefully`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Never throw unhandled errors in tools
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Unhandled errors crash the entire agent workflow. Always catch, structure, and return error information.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Return structured error objects
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Include: success flag, error type, user-friendly message, retryability. Let the agent decide how to handle failures.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Security Considerations</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">1. Tool Permissions</h3>
            <p className="mb-3 text-muted-foreground">
              Not all tools should be available to all agents. Implement permission boundaries.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`// Permission-aware tool selection
function getToolsForUser(userId: string, userRole: string) {
  const basicsTools = [searchTool, readTool];

  if (userRole === 'admin') {
    return [...basicsTools, deleteTool, refundTool, adminTool];
  }

  if (userRole === 'support') {
    return [...basicsTools, refundTool];
  }

  return basicsTools; // Default: read-only tools
}

// Use role-based tools
const tools = getToolsForUser(user.id, user.role);

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: userRequest,
  tools,
});`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">2. Input Validation</h3>
            <p className="mb-3 text-muted-foreground">
              Always validate tool parameters. Agents can make mistakes or be manipulated.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>Use Zod schemas for strict parameter validation</li>
                <li>Validate business logic constraints (e.g., refund amount ≤ order total)</li>
                <li>Sanitize inputs before passing to external systems</li>
                <li>Rate limit tool calls per user/session</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">3. Audit Logging</h3>
            <p className="mb-3 text-muted-foreground">
              Log all tool executions for compliance, debugging, and security monitoring.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`// Audit logging wrapper
function auditedTool<T>(toolDefinition: any) {
  const originalExecute = toolDefinition.execute;

  return tool({
    ...toolDefinition,
    execute: async (params: T) => {
      const startTime = Date.now();

      // Log tool call
      await db.auditLog.create({
        data: {
          toolName: toolDefinition.description,
          parameters: params,
          userId: context.userId,
          timestamp: new Date(),
        },
      });

      try {
        const result = await originalExecute(params);

        // Log success
        await db.auditLog.update({
          where: { id: auditLogId },
          data: {
            success: true,
            duration: Date.now() - startTime,
            result: result,
          },
        });

        return result;
      } catch (error) {
        // Log failure
        await db.auditLog.update({
          where: { id: auditLogId },
          data: {
            success: false,
            error: error.message,
            duration: Date.now() - startTime,
          },
        });

        throw error;
      }
    },
  });
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Best Practices</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Write clear tool descriptions
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              The agent decides when to use tools based on descriptions. Be explicit about what each tool does and when to use it.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Use Zod for parameter validation
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Strong typing prevents agent errors and provides clear parameter documentation. Zod schemas are your API contract with the agent.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Set appropriate maxSteps limits
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Prevent infinite loops. Simple tasks: 5 steps. Complex workflows: 10-15 steps. Never unlimited.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Return structured responses
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Consistent response format helps agents chain tools effectively. Include success flags, data, and error information.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Implement idempotent tools when possible
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Agents may retry failed operations. Design tools to handle duplicate calls gracefully.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Use MCP servers for standardized integrations
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Don't build custom integrations for common services. Use existing MCP servers (Supabase, GitHub, etc.) for instant tool access.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Common Mistakes</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Vague tool descriptions
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              "Get data" doesn't tell the agent when to use this tool. Be specific: "Get customer order history by customer ID."
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ No error handling in tools
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Unhandled errors crash the entire workflow. Always catch, structure, and return errors.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Exposing destructive tools without safeguards
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Delete, refund, and admin tools need explicit confirmation, role checks, and audit logging.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ No rate limiting on tool calls
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Agent loops can burn through API quotas in seconds. Implement per-user, per-session rate limits.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Building custom integrations instead of using MCP
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              If an MCP server exists for your service (Supabase, GitHub, etc.), use it. Don't rebuild what's standardized.
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
              Orchestrate multiple agents, each with their own tool access. Hierarchical and parallel coordination strategies.
            </p>
          </Link>

          <Link
            href="/systems/state-management"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">State Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage state across tool calls. Tool results often update agent state or trigger state-dependent workflows.
            </p>
          </Link>

          <Link
            href="/software/vercel-ai-sdk"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Vercel AI SDK</h3>
            <p className="text-sm text-muted-foreground">
              Implementation guide for Vercel AI SDK tools. Practical examples and production patterns.
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
              Strategic framework: Infrastructure inversion, humans as function calls, and the shift from imperative to declarative programming.
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
                <strong>Tools are capabilities, not commands</strong>. You define what agents can do, they decide when to do it. This is declarative agent programming.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>MCP standardizes tool access</strong>. Build once, use across all MCP clients. Don't rebuild integrations for every AI app.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Agents chain tools automatically</strong>. Multi-step workflows emerge from tool availability and agent reasoning. Set maxSteps to prevent loops.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Error handling is mandatory</strong>. Tools fail. Return structured errors, never throw unhandled exceptions.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Security through permission boundaries</strong>. Not all tools for all users. Implement role-based access, rate limiting, and audit logging.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Auto-generate tools from specs</strong>. OpenAPI/Swagger specs → instant AI SDK tools. No manual tool writing for well-documented APIs.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Link
          href="/systems/state-management"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← State Management for Multi-Agent Systems
        </Link>
        <Link
          href="/systems"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to Systems Overview →
        </Link>
      </div>
    </div>
  );
}
