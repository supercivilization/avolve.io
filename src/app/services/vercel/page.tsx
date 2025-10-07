import type { Metadata } from "next"
import Link from "next/link"
import { PricingOverview } from "@/components/services/PricingOverview"
import { CostTriggers } from "@/components/services/CostTriggers"
import { LimitsAndQuotas } from "@/components/services/LimitsAndQuotas"
import { CostCalculator } from "@/components/services/CostCalculator"
import { IntegrationRequirements } from "@/components/services/IntegrationRequirements"
import { LastVerified } from "@/components/shared/LastVerified"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Vercel Platform Service | Pricing & Deployment | Avolve.io",
  description:
    "Complete guide to Vercel platform pricing, limits, and Next.js deployment. Cost optimization and integration patterns for production applications.",
  keywords: "Vercel pricing, Next.js deployment, serverless limits, edge functions, Vercel integration",
}

export default function VercelServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Vercel", url: "/services/vercel" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span>/</span>
            <span>Vercel</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Vercel Platform
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Next.js deployment and hosting platform with global edge network. Optimized for modern web applications with serverless functions and edge runtime.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PricingOverview
            serviceName="Vercel"
            description="Three tiers designed for teams of all sizes. Free tier perfect for hobby projects and prototyping."
            tiers={[
              {
                name: "Hobby",
                price: "$0/mo",
                billingNote: "free forever",
                highlights: [
                  "100GB bandwidth/month",
                  "6,000 build minutes/month",
                  "100GB-hrs serverless",
                  "Unlimited API requests",
                ],
                recommended: false,
              },
              {
                name: "Pro",
                price: "$20/mo",
                billingNote: "per user",
                highlights: [
                  "1TB bandwidth/month",
                  "24,000 build minutes/month",
                  "1,000GB-hrs serverless",
                  "Team collaboration",
                ],
                recommended: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                billingNote: "contact sales",
                highlights: [
                  "Custom bandwidth",
                  "Custom build minutes",
                  "Custom serverless",
                  "SLA + Priority support",
                ],
              },
            ]}
            features={[
              {
                name: "Bandwidth",
                description: "Data transfer per month",
                tiers: {
                  "Hobby": "100GB",
                  "Pro": "1TB",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Build Minutes",
                description: "Monthly build execution time",
                tiers: {
                  "Hobby": "6,000 min",
                  "Pro": "24,000 min",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Serverless Function Execution",
                description: "GB-hours per month",
                tiers: {
                  "Hobby": "100GB-hrs",
                  "Pro": "1,000GB-hrs",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Edge Function Requests",
                description: "Requests per month",
                tiers: {
                  "Hobby": "500K",
                  "Pro": "1M",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Team Members",
                description: "Collaborate on projects",
                tiers: {
                  "Hobby": false,
                  "Pro": true,
                  "Enterprise": true,
                },
              },
              {
                name: "Custom Domains",
                description: "Use your own domain",
                tiers: {
                  "Hobby": true,
                  "Pro": true,
                  "Enterprise": true,
                },
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostTriggers
            serviceName="Vercel"
            triggers={[
              {
                id: "team-collaboration",
                title: "Team Collaboration Needed",
                currentTier: "Hobby (Free)",
                upgradeTo: "Pro ($20/user/month)",
                scenario: "Your team has more than one developer needing access to the project.",
                metrics: [
                  { name: "Team Size", threshold: ">1 developer" },
                  { name: "Cost Impact", threshold: "$20/month minimum" },
                ],
                costIncrease: "Hobby tier is single user only",
                urgency: "high",
              },
              {
                id: "high-traffic",
                title: "High Traffic Application",
                currentTier: "Hobby (100GB bandwidth)",
                upgradeTo: "Pro (1TB bandwidth)",
                scenario: "Your application is exceeding the 100GB monthly bandwidth limit on the free tier.",
                metrics: [
                  { name: "Bandwidth Usage", threshold: ">100GB/month" },
                  { name: "Overage Cost", threshold: "$20/month + bandwidth fees" },
                ],
                costIncrease: "Monitor analytics, implement caching",
                urgency: "high",
              },
              {
                id: "build-performance",
                title: "Long Build Times",
                currentTier: "Hobby (1 concurrent build)",
                upgradeTo: "Pro (4 concurrent builds)",
                scenario: "Build times exceed 10 minutes and deployments are queued, slowing down development velocity.",
                metrics: [
                  { name: "Build Duration", threshold: ">10 minutes" },
                  { name: "Performance Gain", threshold: "4x faster on Pro" },
                ],
                costIncrease: "Pro tier has 4x build concurrency",
                urgency: "medium",
              },
              {
                id: "serverless-usage",
                title: "Heavy Serverless Usage",
                currentTier: "Hobby (100GB-hrs)",
                upgradeTo: "Pro (1,000GB-hrs)",
                scenario: "Serverless function execution is exceeding free tier limits with heavy API usage.",
                metrics: [
                  { name: "Serverless Usage", threshold: ">100GB-hrs/month" },
                  { name: "Overage Cost", threshold: "$40 per 100GB-hrs" },
                ],
                costIncrease: "Optimize function cold starts",
                urgency: "medium",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            serviceName="Vercel"
            limits={[
              {
                id: "serverless-timeout",
                name: "Serverless Function Timeout",
                tier: "Hobby/Pro/Enterprise",
                value: "10s (Hobby) / 60s (Pro) / 900s (Enterprise)",
                type: "hard",
                blocksCapability: [
                  "Long-running API operations on Hobby tier",
                  "Background jobs and data processing",
                  "Complex AI inference or batch operations",
                ],
                workarounds: [
                  "Upgrade to Pro tier for 60s timeout",
                  "Use background jobs with queues",
                  "Break operations into smaller chunks",
                ],
                critical: true,
              },
              {
                id: "edge-timeout",
                name: "Edge Function Timeout",
                tier: "All",
                value: "30 seconds",
                type: "hard",
                blocksCapability: [
                  "Long-running edge computations",
                  "Heavy data transformations at edge",
                ],
                workarounds: [
                  "Keep edge functions lightweight",
                  "Offload heavy work to serverless functions",
                ],
              },
              {
                id: "serverless-memory",
                name: "Serverless Function Memory",
                tier: "Hobby/Pro/Enterprise",
                value: "1,024MB (Hobby) / 3,008MB (Pro) / Custom (Enterprise)",
                type: "hard",
                blocksCapability: [
                  "Memory-intensive operations on Hobby tier",
                  "Large file processing",
                  "In-memory data aggregations",
                ],
                workarounds: [
                  "Upgrade to Pro tier for 3GB memory",
                  "Use streaming for large files",
                  "Optimize memory usage",
                ],
                critical: true,
              },
              {
                id: "deployment-size",
                name: "Deployment Size",
                tier: "All",
                value: "50MB uncompressed",
                type: "hard",
                blocksCapability: [
                  "Large dependency bundles",
                  "Multiple heavy libraries",
                ],
                workarounds: [
                  "Code splitting and dynamic imports",
                  "Remove unused dependencies",
                  "Use external CDNs for large assets",
                ],
              },
              {
                id: "build-concurrency",
                name: "Build Concurrency",
                tier: "Hobby/Pro/Enterprise",
                value: "1 (Hobby) / 4 (Pro) / Custom (Enterprise)",
                type: "soft",
                blocksCapability: [
                  "Parallel deployments on Hobby tier",
                  "Fast development iteration",
                ],
                workarounds: [
                  "Upgrade to Pro tier for 4 concurrent builds",
                  "Queue deployments sequentially",
                ],
              },
              {
                id: "env-vars",
                name: "Environment Variables",
                tier: "All",
                value: "4KB per variable",
                type: "hard",
                blocksCapability: [
                  "Storing large configuration data",
                  "Embedding large secrets",
                ],
                workarounds: [
                  "Use external configuration services",
                  "Store large data in databases",
                ],
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            serviceName="Vercel"
            scenarios={[
              {
                id: "startup",
                name: "MVP / Prototype",
                description: "Single developer building and testing, low traffic",
                usage: [
                  { metric: "Developers", value: "1-2" },
                  { metric: "Monthly Visitors", value: "<50K" },
                  { metric: "Bandwidth", value: "<100GB" },
                  { metric: "Serverless Usage", value: "Minimal" },
                ],
                breakdown: [
                  {
                    component: "Hobby Tier Base",
                    cost: "$0/month",
                    notes: "100GB bandwidth, 6K build minutes, 100GB-hrs serverless",
                  },
                ],
                totalCost: "$0/month",
                type: "startup",
              },
              {
                id: "growth",
                name: "Growing SaaS",
                description: "Team collaboration with moderate traffic and serverless usage",
                usage: [
                  { metric: "Developers", value: "3-5" },
                  { metric: "Monthly Visitors", value: "100K+" },
                  { metric: "Bandwidth", value: "200GB" },
                  { metric: "Serverless Usage", value: "Moderate" },
                ],
                breakdown: [
                  {
                    component: "Pro Tier Base",
                    cost: "$60/month",
                    notes: "3 users × $20/user",
                  },
                  {
                    component: "Bandwidth Overage",
                    cost: "$10-20/month",
                    notes: "100GB overage above 1TB included",
                  },
                ],
                totalCost: "$60-80/month",
                type: "growth",
              },
              {
                id: "enterprise",
                name: "High-Traffic Production",
                description: "Large team with high traffic, heavy serverless and edge usage",
                usage: [
                  { metric: "Developers", value: "10+" },
                  { metric: "Monthly Visitors", value: "1M+" },
                  { metric: "Bandwidth", value: "5TB+" },
                  { metric: "Serverless Usage", value: "Heavy" },
                ],
                breakdown: [
                  {
                    component: "Pro Tier or Enterprise",
                    cost: "$200+/month",
                    notes: "10 users × $20 or custom Enterprise pricing",
                  },
                  {
                    component: "Overages",
                    cost: "Varies",
                    notes: "Bandwidth, serverless, and edge function overages",
                  },
                ],
                totalCost: "$200-1K+/month",
                type: "enterprise",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            serviceName="Vercel"
            steps={[
              {
                id: "account-setup",
                title: "Account Setup",
                description: "Create Vercel account and install CLI",
                required: true,
                estimatedTime: "5 min",
                configExample: `# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link`,
                docs: [
                  { text: "Vercel CLI Docs", href: "https://vercel.com/docs/cli" },
                ],
              },
              {
                id: "repo-connection",
                title: "Repository Connection",
                description: "Connect GitHub/GitLab/Bitbucket repository for automatic deployments",
                required: true,
                estimatedTime: "5 min",
                configExample: `// In Vercel Dashboard:
// 1. Import Git Repository
// 2. Select repository
// 3. Configure framework (Next.js auto-detected)
// 4. Set production branch (main)
// 5. Enable preview deployments for PRs`,
                docs: [
                  { text: "Git Integration", href: "https://vercel.com/docs/deployments/git" },
                ],
              },
              {
                id: "env-vars",
                title: "Environment Variables",
                description: "Configure environment variables for different environments",
                required: true,
                estimatedTime: "10 min",
                configExample: `# Add via CLI
vercel env add NEXT_PUBLIC_API_URL production
vercel env add DATABASE_URL production

# Or in dashboard: Settings → Environment Variables
# Separate values for: Production, Preview, Development
# Use NEXT_PUBLIC_ prefix for client-side vars
# Never commit secrets to repository`,
                docs: [
                  { text: "Environment Variables", href: "https://vercel.com/docs/environment-variables" },
                ],
              },
              {
                id: "custom-domain",
                title: "Custom Domain Setup",
                description: "Add custom domain with automatic SSL",
                required: false,
                estimatedTime: "10 min",
                configExample: `// In Vercel Dashboard:
// 1. Settings → Domains
// 2. Add domain (e.g., example.com)
// 3. Update DNS records:
//    - A record: 76.76.21.21
//    - Or CNAME: cname.vercel-dns.com
// 4. Verify domain ownership
// 5. SSL automatically provisioned`,
                docs: [
                  { text: "Custom Domains", href: "https://vercel.com/docs/custom-domains" },
                ],
              },
              {
                id: "team-setup",
                title: "Team Setup (Pro Tier)",
                description: "Invite team members and configure permissions",
                required: false,
                estimatedTime: "10 min",
                configExample: `// In Vercel Dashboard:
// 1. Settings → Team
// 2. Invite members via email
// 3. Configure role-based access:
//    - Member: Can deploy and view
//    - Owner: Full access
// 4. Enable production protection
// 5. Set up deployment permissions`,
                docs: [
                  { text: "Team Management", href: "https://vercel.com/docs/teams-and-accounts" },
                ],
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Solutions Using This Service</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Software Integration</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/software/nextjs" className="text-blue-600 hover:underline">
                    Next.js Framework
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
