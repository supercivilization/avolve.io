import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The MCP Convergence: AI-Composable Applications | Avolve Insights',
  description: 'Interactive demonstration of Model Context Protocol creating AI-composable applications. Live examples, working code, one-click deployment.',
  keywords: 'model context protocol, MCP, AI integration, AI-composable applications, anthropic claude, openai',
  openGraph: {
    title: 'The MCP Convergence: AI-Composable Applications',
    description: 'Live demonstration of MCP servers working together to create AI-composable applications',
    type: 'article',
    authors: ['Avolve Team'],
  },
  other: {
    'robots': 'index,follow,max-image-preview:large',
    'article:tech-stack': 'Next.js, TypeScript, MCP, AI SDK',
    'article:difficulty': 'Intermediate',
    'article:reading-time': '5-10 minutes',
  }
}

export default function MCPConvergencePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-600 dark:text-zinc-400">
        <a href="/insights" className="hover:text-zinc-900 dark:hover:text-zinc-100">Insights</a>
        <span className="mx-2">/</span>
        <span>MCP Convergence</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Live Demo</span>
        </div>
        
        <h1 className="text-4xl font-bold">The MCP Convergence</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Model Context Protocol isn't just another integration standard. It's creating a new category of 
          <strong> AI-composable applications</strong> where every tool becomes an AI-callable microservice.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Left: Interactive Demo (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Live MCP Demo */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Live MCP Integration</h2>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">
                  Real-time
                </span>
              </div>
              
              <MCPDemoInterface />
            </div>
          </div>

          {/* Code Viewer */}
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Implementation Code</h3>
              <MCPCodeViewer />
            </div>
          </div>

          {/* Deploy Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Deploy Your Own</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                One-click deployment with all MCP servers pre-configured
              </p>
              <DeployButton template="mcp-starter" />
            </div>
          </div>
        </div>

        {/* Right: Explanation & Context (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Key Insight */}
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                The Hidden Revolution
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                When Microsoft, OpenAI, Google, and Anthropic all adopt the same protocol, 
                every SaaS becomes an AI-callable microservice. This isn't about chatbots – 
                it's about making every tool AI-composable.
              </p>
            </div>
          </div>

          {/* Technical Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How It Works</h3>
            
            <div className="space-y-3">
              <TechnicalPoint 
                number="01"
                title="MCP Server Connection"
                description="Each tool exposes its capabilities through standardized MCP interface"
              />
              
              <TechnicalPoint 
                number="02"
                title="AI Orchestration"
                description="AI models can discover and call any connected MCP server automatically"
              />
              
              <TechnicalPoint 
                number="03"
                title="Tool Composition"
                description="Complex workflows emerge from simple tool combinations"
              />
              
              <TechnicalPoint 
                number="04"
                title="Universal Integration"
                description="Any MCP-compatible tool works with any AI model"
              />
            </div>
          </div>

          {/* Business Impact */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Business Impact
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Eliminate custom API integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>AI can use any tool without training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Workflows become composable and reusable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Vendor lock-in becomes obsolete</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Related Insights */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Related Insights</h3>
            <div className="space-y-2">
              <RelatedInsightLink 
                href="/insights/ai-native-architecture"
                title="AI-Native Architecture"
                status="building"
              />
              <RelatedInsightLink 
                href="/insights/active-cpu-economics"
                title="Active CPU Economics"
                status="live"
              />
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Next Steps</h3>
              <div className="space-y-2 text-sm">
                <NextStepItem 
                  icon="🚀"
                  text="Deploy the demo template to your Vercel account"
                />
                <NextStepItem 
                  icon="🔧"
                  text="Add your own MCP servers to the configuration"
                />
                <NextStepItem 
                  icon="💡"
                  text="Explore AI-native architecture patterns"
                />
                <NextStepItem 
                  icon="📞"
                  text="Book a 1:1 session to discuss your MCP strategy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component implementations would go here
function MCPDemoInterface() {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-4 font-mono text-sm">
      <div className="space-y-2">
        <div className="text-emerald-400">→ Connecting to MCP servers...</div>
        <div className="text-blue-400">✓ supabase: Connected (3 tools available)</div>
        <div className="text-blue-400">✓ github: Connected (12 tools available)</div>
        <div className="text-blue-400">✓ vercel: Connected (8 tools available)</div>
        <div className="text-emerald-400 mt-4">→ AI can now orchestrate all 23 tools</div>
        <div className="text-zinc-400 mt-2 italic">Try: "Create a new repository, deploy it to Vercel, and set up analytics"</div>
      </div>
    </div>
  )
}

function MCPCodeViewer() {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
      <pre>{`// mcp.config.json
{
  "servers": {
    "supabase": {
      "command": "mcp-server-supabase",
      "args": ["--auth-url", "$SUPABASE_URL"]
    },
    "github": {
      "command": "mcp-server-github", 
      "args": ["--token", "$GITHUB_TOKEN"]
    },
    "vercel": {
      "command": "mcp-server-vercel",
      "args": ["--token", "$VERCEL_TOKEN"]
    }
  }
}`}</pre>
    </div>
  )
}

function DeployButton({ template }: { template: string }) {
  return (
    <a 
      href={`https://vercel.com/new/clone?repository-url=https://github.com/avolve/templates/${template}`}
      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>
      </svg>
      Deploy to Vercel
    </a>
  )
}

function TechnicalPoint({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center text-sm font-medium">
        {number}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

function RelatedInsightLink({ href, title, status }: { href: string, title: string, status: string }) {
  const statusColor = status === 'live' ? 'text-emerald-500' : 'text-amber-500'
  
  return (
    <a href={href} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <span className="font-medium">{title}</span>
      <span className={`text-xs ${statusColor}`}>{status}</span>
    </a>
  )
}

function NextStepItem({ icon, text }: { icon: string, text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}