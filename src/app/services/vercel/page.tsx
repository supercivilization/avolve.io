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
            triggers={[
              {
                trigger: "Team Collaboration Needed",
                threshold: ">1 developer",
                impact: "$20/month minimum",
                mitigation:
                  "Hobby tier is single user only. Upgrade to Pro immediately for teams.",
              },
              {
                trigger: "High Traffic Application",
                threshold: ">100GB bandwidth/month",
                impact: "$20/month + overage",
                mitigation: "Monitor analytics, implement caching, optimize assets with Next.js Image",
              },
              {
                trigger: "Long Build Times",
                threshold: ">10 minute builds",
                impact: "4x faster on Pro tier",
                mitigation:
                  "Pro tier has 4x build concurrency. Consider code splitting and incremental builds.",
              },
              {
                trigger: "Heavy Serverless Usage",
                threshold: ">100GB-hrs/month",
                impact: "$40 per 100GB-hrs overage",
                mitigation:
                  "Optimize function cold starts, reduce memory usage, cache responses",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            limits={[
              {
                name: "Serverless Function Timeout",
                free: "10 seconds",
                paid: "60 seconds (Pro), 900 seconds (Enterprise)",
                notes: "Hard limit enforced at runtime",
              },
              {
                name: "Edge Function Timeout",
                free: "30 seconds",
                paid: "30 seconds (all tiers)",
                notes: "Edge runtime has same timeout across all plans",
              },
              {
                name: "Serverless Function Memory",
                free: "1,024MB",
                paid: "3,008MB (Pro), Custom (Enterprise)",
                notes: "Configurable per function",
              },
              {
                name: "Deployment Size",
                free: "50MB uncompressed",
                paid: "50MB uncompressed (all tiers)",
                notes: "Functions bundle size limit",
              },
              {
                name: "Build Concurrency",
                free: "1 concurrent build",
                paid: "4 concurrent (Pro), Custom (Enterprise)",
                notes: "Parallel deployments",
              },
              {
                name: "Environment Variables",
                free: "4KB per variable",
                paid: "4KB per variable (all tiers)",
                notes: "Total size limit applies",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            scenarios={[
              {
                name: "MVP / Prototype",
                usage: "1-2 developers, <50K monthly visitors, minimal serverless",
                calculation: "0 users × $20 = $0/month",
                monthlyCost: "$0",
                notes: "Hobby tier covers most MVPs perfectly",
              },
              {
                name: "Growing SaaS",
                usage: "3-5 developers, 100K+ visitors, moderate serverless",
                calculation: "3 users × $20 = $60/month + bandwidth overage ~$10",
                monthlyCost: "$60-80",
                notes: "Pro tier needed for team collaboration",
              },
              {
                name: "High-Traffic Production",
                usage: "10+ developers, 1M+ visitors, heavy serverless + edge",
                calculation: "Pro tier + overages or Enterprise pricing",
                monthlyCost: "$200+",
                notes: "Contact sales for Enterprise at this scale",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            requirements={[
              {
                category: "Account Setup",
                items: [
                  "Create Vercel account (GitHub/GitLab/Bitbucket OAuth)",
                  "Install Vercel CLI: npm i -g vercel",
                  "Link project: vercel link",
                ],
              },
              {
                category: "Repository Connection",
                items: [
                  "Connect GitHub/GitLab repository",
                  "Configure auto-deploy on push",
                  "Set production branch (usually main)",
                  "Enable preview deployments for PRs",
                ],
              },
              {
                category: "Environment Variables",
                items: [
                  "Add env vars in Vercel dashboard or vercel env",
                  "Separate production/preview/development values",
                  "Use NEXT_PUBLIC_ prefix for client-side vars",
                  "Never commit secrets to repository",
                ],
              },
              {
                category: "Custom Domain",
                items: [
                  "Add domain in Vercel dashboard",
                  "Update DNS records (A/CNAME)",
                  "SSL automatically provisioned",
                  "Verify domain ownership",
                ],
              },
              {
                category: "Team Setup (Pro)",
                items: [
                  "Invite team members via email",
                  "Configure role-based access",
                  "Set up deployment permissions",
                  "Enable production protection",
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
