import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Living Insights | Avolve',
  description: 'Interactive demonstrations of AI-native development. Every insight is a working example you can test, modify, and deploy.',
  keywords: 'ai native development, modern tech stack, interactive demos, next.js, vercel, supabase',
}

const insights = [
  {
    slug: 'mcp-convergence',
    title: 'The MCP Convergence',
    description: 'How Model Context Protocol creates AI-composable applications',
    status: 'live',
    impact: 'Foundational',
    category: 'Architecture'
  },
  {
    slug: 'active-cpu-economics', 
    title: 'Active CPU Economics',
    description: 'Real cost savings from Vercel\'s Active CPU pricing model',
    status: 'live',
    impact: 'High ROI',
    category: 'Infrastructure'
  },
  {
    slug: 'ai-native-architecture',
    title: 'AI-Native Architecture',
    description: 'Building applications with AI as a core component, not a feature',
    status: 'building',
    impact: 'Transformational',
    category: 'Architecture'
  },
  {
    slug: 'supabase-vector-dominance',
    title: 'Supabase Vector Dominance',
    description: 'Why pgvector outperforms dedicated vector databases',
    status: 'building',
    impact: 'Performance',
    category: 'Database'
  },
  {
    slug: 'typescript-native-compiler',
    title: 'TypeScript Native Compiler',
    description: 'How the Go-based compiler changes everything',
    status: 'researching',
    impact: 'Developer Experience',
    category: 'Development'
  },
  {
    slug: 'disappearing-framework',
    title: 'The Disappearing Framework',
    description: 'Server Components are eliminating traditional frontend/backend boundaries',
    status: 'researching',
    impact: 'Paradigm Shift',
    category: 'Architecture'
  }
]

export default function InsightsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Living Documentation
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
          Interactive Insights
        </h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Every insight is a <strong>working demonstration</strong>. Test the concepts, 
          explore the code, deploy your own versions. This is documentation that proves itself.
        </p>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>

      {/* Meta Information */}
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-8 space-y-4">
        <h2 className="text-2xl font-semibold">About This Documentation</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2">Code as Documentation</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Every explanation is backed by working code. No theories, only implementations.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">AI-Optimized</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Structured for both human readers and AI understanding. Built for the Answer Engine era.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Always Current</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Updated in real-time as new patterns emerge. Documentation that evolves with the stack.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightCard({ insight }: { insight: typeof insights[0] }) {
  const statusColors = {
    live: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    building: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    researching: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  }

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="space-y-4">
        {/* Status & Category */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[insight.status as keyof typeof statusColors]}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {insight.status}
          </span>
          <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
            {insight.category}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {insight.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {insight.description}
          </p>
        </div>

        {/* Impact */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Impact:</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{insight.impact}</span>
          </div>
        </div>

        {/* Action */}
        {insight.status === 'live' && (
          <div className="pt-3">
            <a 
              href={`/insights/${insight.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              Explore Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}