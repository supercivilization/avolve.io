import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Network, Code, Cloud, LifeBuoy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

      <main className="page-container">
        <time className="text-sm text-muted-foreground block mb-6" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        {/* Hero */}
        <header className="section-spacing text-center md:text-left">
          <h1 className="mb-8">Avolve.io</h1>
          <p className="lead mb-8 max-w-2xl">
            Ship your first app this week
          </p>
          <p className="text-muted-foreground max-w-xl">
            <strong className="text-foreground">Stack:</strong> Next.js 15 + React 19.2 + Supabase + Vercel + AI
          </p>
        </header>

        {/* Canonical 5S Definition */}
        <section id="definition" className="section-spacing">
          <h2 className="mb-12">Modern Web Development Stack</h2>

          <div className="space-y-8">
            <Card id="solutions" className="border-l-4 border-slate-600 dark:border-slate-400 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Rocket className="text-slate-600 dark:text-slate-400 flex-shrink-0" size={48} strokeWidth={1.5} />
                  <div className="flex-1">
                    <CardTitle className="text-xl">Solutions</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Business outcomes delivered to end users
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/solutions" className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:underline font-medium inline-flex items-center gap-1">
                  Explore Solutions <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>

            <Card id="systems" className="border-l-4 border-gray-600 dark:border-gray-400 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Network className="text-gray-600 dark:text-gray-400 flex-shrink-0" size={48} strokeWidth={1.5} />
                  <div className="flex-1">
                    <CardTitle className="text-xl">Systems</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Architecture patterns coordinating multiple components
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/systems" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline font-medium inline-flex items-center gap-1">
                  Explore Systems <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>

            <Card id="software" className="border-l-4 border-zinc-700 dark:border-zinc-400 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Code className="text-zinc-700 dark:text-zinc-400 flex-shrink-0" size={48} strokeWidth={1.5} />
                  <div className="flex-1">
                    <CardTitle className="text-xl">Software</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Code, frameworks, libraries (Next.js 15.5, React 19.2, TypeScript 5.9)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/software" className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 hover:underline font-medium inline-flex items-center gap-1">
                  Explore Software <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>

            <Card id="services" className="border-l-4 border-neutral-600 dark:border-neutral-400 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Cloud className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" size={48} strokeWidth={1.5} />
                  <div className="flex-1">
                    <CardTitle className="text-xl">Services</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      External managed capabilities (Vercel, Supabase, Claude API, Stripe)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/services" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline font-medium inline-flex items-center gap-1">
                  Explore Services <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>

            <Card id="support" className="border-l-4 border-stone-600 dark:border-stone-400 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <LifeBuoy className="text-stone-600 dark:text-stone-400 flex-shrink-0" size={48} strokeWidth={1.5} />
                  <div className="flex-1">
                    <CardTitle className="text-xl">Support</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Operations maintaining production systems
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/support" className="text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:underline font-medium inline-flex items-center gap-1">
                  Explore Support <span aria-hidden="true">→</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Navigation */}
        <Card className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-900/10">
          <CardHeader>
            <CardTitle className="text-2xl">What do you want to do?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <span className="text-slate-600 dark:text-slate-400">→</span>
                <Link href="/solutions" className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:underline font-medium">Build something new</Link>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <span className="text-stone-600 dark:text-stone-400">→</span>
                <Link href="/support" className="text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:underline font-medium">Fix production issue</Link>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <span className="text-gray-600 dark:text-gray-400">→</span>
                <Link href="/software" className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 hover:underline font-medium">Choose tools</Link> and <Link href="/services" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline font-medium">services</Link>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <span className="text-gray-600 dark:text-gray-400">→</span>
                <Link href="/systems" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline font-medium">Understand architecture</Link>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                <span className="text-gray-600 dark:text-gray-400">→</span>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline">About this site</Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Current Stack Versions */}
        <section id="current-stack" className="section-spacing">
          <h2 className="mb-12">Current Stack Versions</h2>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Tool</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Released</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Runtime</TableCell>
                  <TableCell className="font-mono text-sm">Node.js</TableCell>
                  <TableCell className="font-mono text-sm">24.8.0</TableCell>
                  <TableCell>Aug 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Framework</TableCell>
                  <TableCell className="font-mono text-sm">Next.js</TableCell>
                  <TableCell className="font-mono text-sm">15.5.4</TableCell>
                  <TableCell>Sep 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>UI Library</TableCell>
                  <TableCell className="font-mono text-sm">React</TableCell>
                  <TableCell className="font-mono text-sm">19.2.0</TableCell>
                  <TableCell>Oct 1, 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Language</TableCell>
                  <TableCell className="font-mono text-sm">TypeScript</TableCell>
                  <TableCell className="font-mono text-sm">5.9.2</TableCell>
                  <TableCell>Sep 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Styling</TableCell>
                  <TableCell className="font-mono text-sm">Tailwind CSS</TableCell>
                  <TableCell className="font-mono text-sm">4.1.13</TableCell>
                  <TableCell>Sep 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Components</TableCell>
                  <TableCell className="font-mono text-sm">shadcn/ui</TableCell>
                  <TableCell className="font-mono text-sm">3.0</TableCell>
                  <TableCell>Oct 2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
}
