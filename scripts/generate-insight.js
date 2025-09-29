#!/usr/bin/env node

/**
 * Insight Generator Script
 * 
 * Rapidly generates new insight pages with:
 * - Interactive demonstrations
 * - Working code examples
 * - SEO/AEO optimization
 * - Deploy-ready templates
 * 
 * Usage:
 * npm run insight:create "The Vector Search Revolution" --category=database --status=live
 * npm run insight:create "Real-time Everything" --category=architecture --status=building
 */

const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { createAnthropic } = require('@ai-sdk/anthropic');
const { generateObject } = require('ai');
const { z } = require('zod');

// Initialize AI provider
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Insight generation schema
const InsightSchema = z.object({
  slug: z.string().describe('URL-safe slug for the insight'),
  title: z.string().describe('Compelling title for the insight'),
  description: z.string().describe('One-sentence description of the insight'),
  category: z.string().describe('Technical category (architecture, database, infrastructure, etc.)'),
  status: z.enum(['live', 'building', 'researching']),
  impact: z.string().describe('Business impact level'),
  
  // Content structure
  keyInsight: z.string().describe('The main "aha" moment in 2-3 sentences'),
  technicalBreakdown: z.array(z.object({
    step: z.string(),
    title: z.string(), 
    description: z.string()
  })),
  businessImpact: z.array(z.string()).describe('Bullet points of business value'),
  
  // Interactive elements
  demoInterface: z.string().describe('React component for interactive demo'),
  codeExample: z.string().describe('Working code implementation'),
  deployTemplate: z.string().describe('Repository template for deployment'),
  
  // SEO/AEO
  keywords: z.array(z.string()),
  structuredData: z.object({
    techStack: z.array(z.string()),
    difficulty: z.string(),
    readingTime: z.string()
  }),
  
  // Related content
  relatedInsights: z.array(z.object({
    slug: z.string(),
    title: z.string(),
    status: z.string()
  })),
  
  nextSteps: z.array(z.object({
    icon: z.string(),
    text: z.string(),
    action: z.string().optional()
  }))
});

async function generateInsight(title, options = {}) {
  console.log('🧠 Generating AI-native insight...');
  console.log(`📝 Title: ${title}`);
  console.log(`🏷️  Category: ${options.category || 'architecture'}`);
  console.log(`📊 Status: ${options.status || 'building'}`);

  const systemPrompt = `You are an expert in AI-native development and the modern tech stack (Next.js 15.5, React 19, TypeScript 5.9, Vercel AI SDK 5.0, Supabase, etc.).

Generate interactive insight pages that follow the Avolve methodology:

1. **Living Documentation Principle**:
   - Every insight must have a working demonstration
   - Code examples should be deployable
   - Interactive elements prove the concepts
   - Real data over theoretical explanations

2. **Modern SEO/AEO Optimization**:
   - Structured for AI understanding (Claude, ChatGPT, Perplexity)
   - Rich structured data and metadata
   - Interactive elements that engage users
   - Code-as-documentation approach

3. **Business Value Focus**:
   - Clear ROI and business impact
   - Practical implementation guidance
   - Connection to transformation outcomes
   - Next steps for engagement

4. **Technical Authority**:
   - Deep, non-obvious insights
   - Emerging patterns others miss
   - Implementation details that matter
   - Performance and architecture implications

5. **Avolve 5S Integration**:
   - Connect to Solutions, Systems, Services, Software, Support
   - Show progression paths between offerings
   - Reference related capabilities

Generate insights that demonstrate expertise in the September 2025 tech landscape.`;

  try {
    const result = await generateObject({
      model: anthropic('claude-3-5-sonnet-20241022'),
      schema: InsightSchema,
      system: systemPrompt,
      prompt: `Generate a comprehensive insight page for: "${title}"

Context:
- Category: ${options.category || 'architecture'}
- Status: ${options.status || 'building'}
- Target audience: Technical decision-makers and implementation teams
- Focus: Practical, actionable insights with working demonstrations

Requirements:
- Include interactive demonstration component
- Provide deployable code examples
- Optimize for both human readers and AI understanding
- Connect to broader business transformation narrative
- Reference the modern tech stack (Next.js 15.5, AI SDK 5.0, etc.)

The insight should reveal non-obvious patterns or opportunities in the AI-native development landscape.`
    });

    return result.object;
  } catch (error) {
    console.error('❌ Error generating insight:', error);
    throw error;
  }
}

function generateInsightFiles(insight, outputDir = './apps/web/src/app/insights') {
  const insightDir = join(outputDir, insight.slug);

  // Create insight directory
  if (!existsSync(insightDir)) {
    mkdirSync(insightDir, { recursive: true });
  }

  // Generate the main page component
  const pageContent = generatePageComponent(insight);
  const pageFile = join(insightDir, 'page.tsx');
  writeFileSync(pageFile, pageContent, 'utf8');
  console.log(`✅ Page written to: ${pageFile}`);

  // Generate demo components if needed
  if (insight.demoInterface) {
    const demoDir = join(outputDir, '../components/insights');
    if (!existsSync(demoDir)) {
      mkdirSync(demoDir, { recursive: true });
    }
    
    const demoFile = join(demoDir, `${insight.slug}-demo.tsx`);
    writeFileSync(demoFile, insight.demoInterface, 'utf8');
    console.log(`✅ Demo component written to: ${demoFile}`);
  }

  // Update insights index
  updateInsightsIndex(insight);

  return insightDir;
}

function generatePageComponent(insight) {
  return `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${insight.title} | Avolve Insights',
  description: '${insight.description}',
  keywords: '${insight.keywords.join(', ')}',
  openGraph: {
    title: '${insight.title}',
    description: '${insight.description}',
    type: 'article',
    authors: ['Avolve Team'],
  },
  other: {
    'robots': 'index,follow,max-image-preview:large',
    'article:tech-stack': '${insight.structuredData.techStack.join(', ')}',
    'article:difficulty': '${insight.structuredData.difficulty}',
    'article:reading-time': '${insight.structuredData.readingTime}',
  }
}

export default function ${insight.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-600 dark:text-zinc-400">
        <a href="/insights" className="hover:text-zinc-900 dark:hover:text-zinc-100">Insights</a>
        <span className="mx-2">/</span>
        <span>${insight.title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full ${insight.status === 'live' ? 'animate-pulse' : ''}" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            ${insight.status === 'live' ? 'Live Demo' : insight.status === 'building' ? 'In Development' : 'Research Phase'}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold">${insight.title}</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
          ${insight.description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Left: Interactive Demo (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Live Demo */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Interactive Demonstration</h2>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">
                  ${insight.status}
                </span>
              </div>
              
              {/* Demo component would be imported here */}
              <DemoInterface />
            </div>
          </div>

          {/* Code Viewer */}
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Implementation Code</h3>
              <CodeViewer code={\`${insight.codeExample.replace(/`/g, '\\`')}\`} />
            </div>
          </div>

          ${insight.status === 'live' ? `
          {/* Deploy Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Deploy Your Own</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                One-click deployment with all dependencies pre-configured
              </p>
              <DeployButton template="${insight.deployTemplate}" />
            </div>
          </div>
          ` : ''}
        </div>

        {/* Right: Explanation & Context (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Key Insight */}
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                Key Insight
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                ${insight.keyInsight}
              </p>
            </div>
          </div>

          {/* Technical Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How It Works</h3>
            
            <div className="space-y-3">
              ${insight.technicalBreakdown.map((step, index) => `
              <TechnicalPoint 
                number="${String(index + 1).padStart(2, '0')}"
                title="${step.title}"
                description="${step.description}"
              />
              `).join('')}
            </div>
          </div>

          {/* Business Impact */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Business Impact
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                ${insight.businessImpact.map(impact => `
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>${impact}</span>
                </li>
                `).join('')}
              </ul>
            </div>
          </div>

          {/* Related Insights */}
          ${insight.relatedInsights.length > 0 ? `
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Related Insights</h3>
            <div className="space-y-2">
              ${insight.relatedInsights.map(related => `
              <RelatedInsightLink 
                href="/insights/${related.slug}"
                title="${related.title}"
                status="${related.status}"
              />
              `).join('')}
            </div>
          </div>
          ` : ''}

          {/* Next Steps */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Next Steps</h3>
              <div className="space-y-2 text-sm">
                ${insight.nextSteps.map(step => `
                <NextStepItem 
                  icon="${step.icon}"
                  text="${step.text}"
                  ${step.action ? `action="${step.action}"` : ''}
                />
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component implementations
function DemoInterface() {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-4 font-mono text-sm">
      <div className="space-y-2">
        <div className="text-emerald-400">→ Interactive demo loading...</div>
        <div className="text-zinc-400 italic">This would be the actual ${insight.slug} demonstration</div>
      </div>
    </div>
  )
}

function CodeViewer({ code }: { code: string }) {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
      <pre>{code}</pre>
    </div>
  )
}

function DeployButton({ template }: { template: string }) {
  return (
    <a 
      href={\`https://vercel.com/new/clone?repository-url=https://github.com/avolve/templates/\${template}\`}
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
  const statusColor = status === 'live' ? 'text-emerald-500' : status === 'building' ? 'text-amber-500' : 'text-blue-500'
  
  return (
    <a href={href} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <span className="font-medium">{title}</span>
      <span className={\`text-xs \${statusColor}\`}>{status}</span>
    </a>
  )
}

function NextStepItem({ icon, text, action }: { icon: string, text: string, action?: string }) {
  const content = (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )

  if (action) {
    return (
      <a href={action} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
        {content}
      </a>
    )
  }

  return content
}`;
}

function updateInsightsIndex(insight) {
  // This would update the insights index page with the new insight
  console.log(`📝 Would update insights index with: ${insight.title}`);
}

function generateSummary(insight) {
  console.log('\n📊 Insight Generation Summary:');
  console.log('================================');
  console.log(`📦 Title: ${insight.title}`);
  console.log(`🏷️  Category: ${insight.category}`);
  console.log(`📊 Status: ${insight.status}`);
  console.log(`🎯 Impact: ${insight.impact}`);
  console.log(`🔑 Keywords: ${insight.keywords.join(', ')}`);
  console.log(`\n📄 Files Generated:`);
  console.log(`  ✓ Page component (/insights/${insight.slug}/page.tsx)`);
  console.log(`  ✓ Demo component (/components/insights/${insight.slug}-demo.tsx)`);
  console.log(`  ✓ SEO metadata and structured data`);
  console.log(`  ✓ Interactive demonstrations`);
  console.log(`  ✓ Deploy-ready templates`);
}

async function main() {
  const title = process.argv[2];
  const args = process.argv.slice(3);
  
  const options = {};
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value;
    }
  });

  if (!title) {
    console.error('❌ Please provide an insight title');
    console.log('Usage: npm run insight:create "Your Insight Title" --category=architecture --status=live');
    console.log('');
    console.log('Categories: architecture, database, infrastructure, development, ai');
    console.log('Status: live, building, researching');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    console.log('🚀 Starting insight generation...');

    const insight = await generateInsight(title, options);
    const insightDir = generateInsightFiles(insight);

    generateSummary(insight);

    console.log(`\n🎉 Insight generated successfully!`);
    console.log(`📁 Location: ${insightDir}`);
    console.log(`\n🔄 Next steps:`);
    console.log(`  1. Review the generated content`);
    console.log(`  2. Customize the demo components`);
    console.log(`  3. Test the interactive features`);
    console.log(`  4. Deploy to see it live`);

  } catch (error) {
    console.error('💥 Insight generation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateInsight, generateInsightFiles };