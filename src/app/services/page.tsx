import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// Pricing verified: 2025-10-05
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Services - External Tools & Pricing | Avolve.io",
  description: "Current pricing for Vercel, Supabase, Claude API, Stripe, Resend, and Sentry. Last updated October 5, 2025.",
};

export default function ServicesPage() {
  const services = [
    {
      name: "Vercel",
      category: "Hosting & Deployment",
      pricing: [
        { tier: "Hobby", price: "$0/mo", features: ["Personal projects", "100GB bandwidth", "Unlimited websites"] },
        { tier: "Pro", price: "$20/mo", features: ["Commercial use", "1TB bandwidth", "Advanced analytics"] },
        { tier: "Enterprise", price: "Custom", features: ["Custom bandwidth", "SLA", "Dedicated support"] }
      ],
      whenToUse: "Deploy Next.js apps globally with zero config",
      whenToSwitch: "Need multi-cloud, custom infrastructure, or >$500/mo spend",
      migration: "Low"
    },
    {
      name: "Supabase",
      category: "Database & Auth",
      pricing: [
        { tier: "Free", price: "$0/mo", features: ["500MB database", "50MB file storage", "50,000 monthly active users"] },
        { tier: "Pro", price: "$25/mo", features: ["8GB database", "100GB storage", "100,000 MAU"] },
        { tier: "Team", price: "$599/mo", features: ["Custom database size", "Custom storage", "Custom MAU"] }
      ],
      whenToUse: "Need Postgres + Auth + Storage in one service",
      whenToSwitch: "Need >100GB data, complex multi-region, or database-specific features",
      migration: "Medium"
    },
    {
      name: "Claude API",
      category: "AI Models",
      pricing: [
        { tier: "Claude 3.7 Sonnet", price: "$3 per 1M input tokens", features: ["$15 per 1M output", "200K context", "Best for production"] },
        { tier: "Claude 3.5 Haiku", price: "$0.80 per 1M input", features: ["$4 per 1M output", "200K context", "Fast, affordable"] },
        { tier: "Batch API", price: "50% discount", features: ["24h processing", "Large volumes", "Non-urgent tasks"] }
      ],
      whenToUse: "Build AI features: chat, analysis, code generation",
      whenToSwitch: "Need open-source models, on-prem, or >$1000/mo AI spend",
      migration: "Low"
    },
    {
      name: "Stripe",
      category: "Payments",
      pricing: [
        { tier: "Standard", price: "2.9% + 30¢", features: ["Per successful charge", "All payment methods", "Global payments"] },
        { tier: "Volume Discount", price: "Custom", features: [">$1M/mo volume", "Negotiated rates", "Dedicated support"] },
        { tier: "Billing", price: "+0.5%", features: ["Subscription management", "Invoicing", "Revenue recognition"] }
      ],
      whenToUse: "Accept payments, subscriptions, marketplaces",
      whenToSwitch: "High volume (>$5M/mo), specific regional needs, or crypto",
      migration: "High"
    },
    {
      name: "Resend",
      category: "Transactional Email",
      pricing: [
        { tier: "Free", price: "$0/mo", features: ["3,000 emails/mo", "1 domain", "100 emails/day"] },
        { tier: "Pro", price: "$20/mo", features: ["50,000 emails/mo", "Unlimited domains", "Email analytics"] },
        { tier: "Enterprise", price: "Custom", features: ["Custom volume", "Dedicated IP", "SLA"] }
      ],
      whenToUse: "Send transactional emails (signup, reset, receipts)",
      whenToSwitch: "Need >100k emails/mo, advanced deliverability, or email marketing",
      migration: "Low"
    },
    {
      name: "Sentry",
      category: "Error Monitoring",
      pricing: [
        { tier: "Developer", price: "$0/mo", features: ["5,000 errors/mo", "1 user", "30 day retention"] },
        { tier: "Team", price: "$26/mo", features: ["50,000 errors/mo", "Unlimited users", "90 day retention"] },
        { tier: "Business", price: "$80/mo", features: ["200,000 errors/mo", "Priority support", "Custom retention"] }
      ],
      whenToUse: "Track errors, performance issues, user feedback",
      whenToSwitch: "Need >500k errors/mo or self-hosted solution",
      migration: "Low"
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": service.name,
        "description": service.whenToUse,
        "offers": service.pricing.map(tier => ({
          "@type": "Offer",
          "name": tier.tier,
          "price": tier.price,
          "priceCurrency": "USD"
        }))
      }
    }))
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-neutral-700">Services</h1>
          <p className="text-xl text-gray-700 mb-12">
            External managed capabilities - what you buy, not build
          </p>

          <section id="services-definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What are Services?</h2>
            <p className="text-gray-700 mb-4">
              Services are external, managed capabilities that your application uses. Instead of building
              and maintaining infrastructure, you pay for hosted solutions that scale automatically.
            </p>
            <p className="text-gray-700">
              Services host your <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>,
              power your <Link href="/systems" className="text-gray-600 hover:underline ml-1">Systems</Link>, and
              deliver your <Link href="/solutions" className="text-slate-600 hover:underline ml-1">Solutions</Link>.
            </p>
          </section>

          <div className="space-y-12">
            {services.map((service) => (
              <section key={service.name} id={service.name.toLowerCase()} className="border-t pt-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                  <p className="text-gray-600">{service.category}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold mb-2">When to Use</h3>
                    <p className="text-gray-700">{service.whenToUse}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">When to Switch</h3>
                    <p className="text-gray-700">{service.whenToSwitch}</p>
                  </div>
                </div>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Tier</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.pricing.map((tier) => (
                        <tr key={tier.tier}>
                          <td className="border border-gray-300 px-4 py-2 font-bold">{tier.tier}</td>
                          <td className="border border-gray-300 px-4 py-2 font-mono">{tier.price}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <ul className="list-disc list-inside space-y-1">
                              {tier.features.map((feature, i) => (
                                <li key={i} className="text-sm">{feature}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Migration Difficulty:</strong> {service.migration}
                  {service.migration === "Low" && " - Easy to switch providers"}
                  {service.migration === "Medium" && " - Requires data migration, moderate effort"}
                  {service.migration === "High" && " - Complex integration, significant refactoring"}
                </p>
              </section>
            ))}
          </div>

          <section id="cost-optimization" className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Cost Optimization Tips</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Start free:</strong> All services offer free tiers. Build and validate before paying.
              </li>
              <li>
                <strong>Monitor usage:</strong> Set up billing alerts before hitting paid tiers.
              </li>
              <li>
                <strong>Batch operations:</strong> Claude API offers 50% discount for batch processing.
              </li>
              <li>
                <strong>Cache aggressively:</strong> Reduce API calls, database queries, and bandwidth.
              </li>
              <li>
                <strong>Right-size early:</strong> Don't over-provision. Scale as needed.
              </li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Services Relate to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Host <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Vercel deploys Next.js, Supabase stores data</li>
              <li>• <strong>Power <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Auth via Supabase, payments via Stripe</li>
              <li>• <strong>Deliver <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> AI chat uses Claude, emails via Resend</li>
              <li>• <strong>Need <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Monitor costs, debug API failures, optimize usage</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:underline">
              ← Back to Home
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
