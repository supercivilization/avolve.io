import type { Metadata } from "next";
import Link from "next/link";
import {
  SolutionsIcon,
  SystemsIcon,
  SoftwareIcon,
  ServicesIcon,
  SupportIcon,
} from "@/components/icons/sacred-geometry";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Next.js 15, React 19, Supabase & Vercel AI: Prod Patterns",
  description: "A knowledge graph for the modern web stack. Get verified compatibility patterns for Next.js 15, React 19, Vercel AI, Supabase auth, shadcn/ui, and more.",
  alternates: {
    canonical: "https://avolve.io",
  },
};

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Modern Web Development Stack - October 2025",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "dependencies": {
          "Node.js": "24.8.0",
          "Next.js": "15.5.4",
          "React": "19.2.0",
          "TypeScript": "5.9.2",
          "Tailwind CSS": "4.1.13",
          "shadcn/ui": "3.0"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are Solutions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Solutions are business outcomes delivered to end users. Examples include SaaS applications, e-commerce platforms, and AI-powered tools."
            }
          },
          {
            "@type": "Question",
            "name": "What are Systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Systems are architecture patterns coordinating multiple components. They include authentication flows, database architectures, and API integration patterns."
            }
          },
          {
            "@type": "Question",
            "name": "What is Software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Software encompasses the code, frameworks, and libraries used in modern web development, including Next.js 15.5, React 19.2, TypeScript 5.9, and Tailwind CSS 4.1."
            }
          },
          {
            "@type": "Question",
            "name": "What are Services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Services are external managed capabilities like Vercel hosting, Supabase databases, Claude AI API, and Stripe payments that you buy instead of building yourself."
            }
          },
          {
            "@type": "Question",
            "name": "What is Support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Support covers operations maintaining production systems, including debugging, monitoring, incident response, and performance optimization."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground block mb-4" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        {/* Hero */}
        <header className="mt-4 mb-16">
          <h1 className="text-5xl font-bold mb-4">Avolve.io</h1>
          <p className="text-2xl text-muted-foreground mb-4">Ship your first app this week</p>
          <p className="text-sm text-muted-foreground">
            <strong>Stack:</strong> Next.js 15 + React 19.2 + Supabase + Vercel + AI
          </p>
        </header>

        {/* Canonical 5S Definition */}
        <section id="definition" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Modern Web Development Stack</h2>

          <dl className="space-y-8">
            <div id="solutions" className="border-l-4 border-slate-600 dark:border-slate-400 pl-6 hover:border-slate-500 transition-colors">
              <div className="flex items-start gap-4">
                <SolutionsIcon className="text-slate-600 dark:text-slate-400 flex-shrink-0" size={40} />
                <div className="flex-1">
                  <dt className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-1">Solutions</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-sm mb-3">Business outcomes delivered to end users</dd>
                  <dd className="text-sm">
                    <Link href="/solutions" className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:underline font-medium inline-flex items-center gap-1">
                      Explore Solutions <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
                </div>
              </div>
            </div>

            <div id="systems" className="border-l-4 border-gray-600 dark:border-gray-400 pl-6 hover:border-gray-500 transition-colors">
              <div className="flex items-start gap-4">
                <SystemsIcon className="text-gray-600 dark:text-gray-400 flex-shrink-0" size={40} />
                <div className="flex-1">
                  <dt className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">Systems</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-sm mb-3">Architecture patterns coordinating multiple components</dd>
                  <dd className="text-sm">
                    <Link href="/systems" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline font-medium inline-flex items-center gap-1">
                      Explore Systems <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
                </div>
              </div>
            </div>

            <div id="software" className="border-l-4 border-zinc-700 dark:border-zinc-400 pl-6 hover:border-zinc-600 transition-colors">
              <div className="flex items-start gap-4">
                <SoftwareIcon className="text-zinc-700 dark:text-zinc-400 flex-shrink-0" size={40} />
                <div className="flex-1">
                  <dt className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-1">Software</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-sm mb-3">Code, frameworks, libraries (Next.js 15.5, React 19.2, TypeScript 5.9)</dd>
                  <dd className="text-sm">
                    <Link href="/software" className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 hover:underline font-medium inline-flex items-center gap-1">
                      Explore Software <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
                </div>
              </div>
            </div>

            <div id="services" className="border-l-4 border-neutral-600 dark:border-neutral-400 pl-6 hover:border-neutral-500 transition-colors">
              <div className="flex items-start gap-4">
                <ServicesIcon className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" size={40} />
                <div className="flex-1">
                  <dt className="text-xl font-bold text-neutral-700 dark:text-neutral-300 mb-1">Services</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-sm mb-3">External managed capabilities (Vercel, Supabase, Claude API, Stripe)</dd>
                  <dd className="text-sm">
                    <Link href="/services" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline font-medium inline-flex items-center gap-1">
                      Explore Services <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
                </div>
              </div>
            </div>

            <div id="support" className="border-l-4 border-stone-600 dark:border-stone-400 pl-6 hover:border-stone-500 transition-colors">
              <div className="flex items-start gap-4">
                <SupportIcon className="text-stone-600 dark:text-stone-400 flex-shrink-0" size={40} />
                <div className="flex-1">
                  <dt className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-1">Support</dt>
                  <dd className="text-gray-700 dark:text-gray-300 text-sm mb-3">Operations maintaining production systems</dd>
                  <dd className="text-sm">
                    <Link href="/support" className="text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:underline font-medium inline-flex items-center gap-1">
                      Explore Support <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
                </div>
              </div>
            </div>
          </dl>
        </section>

        {/* Quick Navigation */}
        <section id="quick-nav" className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What do you want to do?</h2>
          <ul className="space-y-2">
            <li>→ <Link href="/solutions" className="text-slate-600 hover:underline font-medium">Build something new</Link></li>
            <li>→ <Link href="/support" className="text-stone-600 hover:underline font-medium">Fix production issue</Link></li>
            <li>→ <Link href="/software" className="text-zinc-700 hover:underline font-medium">Choose tools</Link> and <Link href="/services" className="text-neutral-600 hover:underline font-medium">services</Link></li>
            <li>→ <Link href="/systems" className="text-gray-600 hover:underline font-medium">Understand architecture</Link></li>
            <li>→ <Link href="/about" className="text-gray-600 hover:underline">About this site</Link></li>
          </ul>
        </section>

        {/* Current Stack Versions */}
        <section id="current-stack" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Current Stack Versions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tool</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Version</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Released</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Runtime</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Node.js</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">24.8.0</td>
                  <td className="border border-gray-300 px-4 py-2">Aug 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Framework</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Next.js</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">15.5.4</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">UI Library</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">React</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">19.2.0</td>
                  <td className="border border-gray-300 px-4 py-2">Oct 1, 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Language</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">TypeScript</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">5.9.2</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Styling</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Tailwind CSS</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">4.1.13</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Components</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">shadcn/ui</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">3.0</td>
                  <td className="border border-gray-300 px-4 py-2">Oct 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
