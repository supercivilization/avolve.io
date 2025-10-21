import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Network, Code, Cloud, LifeBuoy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPageDates, formatSchemaDate } from "@/lib/dates";
import { authorRef, publisherRef, LAST_VERIFIED_DATE, UNIVERSAL_PROPERTIES, createIsBasedOn, createCitations } from "@/lib/schema";

// Dependencies (verified October 17, 2025):
// - Node.js: 22.20.0 LTS (24.9.0 becomes LTS Oct 28, 2025)
// - TypeScript: 5.9.3
// - React: 19.2.0
// - Next.js: 16.0.0-beta (Turbopack stable)
// - Tailwind CSS: 4.1.14
// - shadcn/ui: 3.4.0
// - Vercel AI SDK: 5.0.60

const pageDates = getPageDates('home');

export const metadata: Metadata = {
  title: "Avolve.io - AI Orchestration for Supercivilization",
  description: "AI orchestration of solutions, systems, software, services, and support to build, fund, and help individual Superachievers vivify further, collectives of Superachievers unify faster, and the Supercivilization ecosystem thrive forever. Created by Joshua Seymour.",
  alternates: {
    canonical: "https://avolve.io",
  },
};

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://avolve.io/#application",
        "name": "Avolve.io",
        "alternateName": "Administrative Intelligence Orchestrator",
        "applicationCategory": "DeveloperApplication",
        "description": "AI orchestration of solutions, systems, software, services, and support to build, fund, and help individual Superachievers vivify further, collectives of Superachievers unify faster, and the Supercivilization ecosystem thrive forever.",
        "creator": {
          "@type": "Person",
          "@id": "https://joshuaseymour.com/#person",
          "name": "Joshua Seymour",
          "url": "https://joshuaseymour.com",
          "founder": {
            "@type": "Organization",
            "name": "Supercivilization",
            "url": "https://supercivilization.xyz"
          }
        },
        "datePublished": formatSchemaDate(pageDates.published),
        "dateModified": LAST_VERIFIED_DATE,
        "featureList": [
          "AI orchestration using 5S framework (Solutions, Systems, Software, Services, Support)",
          "Build, fund, and help across three organizational levels",
          "Solo level: Individual Superachievers vivify further",
          "Team level: Collectives of Superachievers unify faster",
          "Firm level: Supercivilization ecosystem thrives forever",
          "Orchestrates 7 domains: News, Education, Lifestyle, Social, Business, Finance, Productivity"
        ],
        "about": [
          {
            "@type": "Thing",
            "name": "Individual Superachiever",
            "description": "Learning for entertainment, applying for enlightenment, teaching for empowerment"
          },
          {
            "@type": "Thing",
            "name": "Collective of Superachievers",
            "description": "Personalizing startup society, globalizing network union, localizing network archipelago"
          },
          {
            "@type": "Thing",
            "name": "Supercivilization Ecosystem",
            "description": "Creating new growth engines, evolving existing growth engines, managing portfolio of growth engines"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are Solutions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Outcomes orchestrated at three levels: Solo (personal success), Team (collective coordination), and Firm (ecosystem growth). Solutions define what we're building toward."
            }
          },
          {
            "@type": "Question",
            "name": "What are Systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Architectures orchestrated at three levels: Solo (personal productivity systems), Team (coordination systems), and Firm (governance and economic systems). Systems define how we orchestrate."
            }
          },
          {
            "@type": "Question",
            "name": "What is Software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tools orchestrated at three levels: Solo (personal tools), Team (collaboration software), and Firm (platform infrastructure). Software provides the capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "What are Services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "External platforms orchestrated at three levels: Solo (personal services), Team (team services), and Firm (platform services). Services provide external capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "What is Support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Guidance orchestrated at three levels: Solo (personal guidance), Team (community support), and Firm (institutional support). Support enables mastery."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://avolve.io"
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
        {/* Hero Section */}
        <header className="section-spacing">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Avolve.io
              <span className="block text-foreground/60 dark:text-muted-foreground mt-2 text-3xl md:text-4xl">AI Orchestration for Supercivilization</span>
            </h1>

            {/* Core Description */}
            <div className="mb-10 p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-background to-muted/20">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                AI orchestration of <strong>Solutions, Systems, Software, Services, and Support</strong> to build, fund, and help:
              </p>
            </div>

            {/* Three Organizational Levels */}
            <div className="space-y-8 mb-12">
              {/* Solo */}
              <div className="border-l-4 border-slate-500 dark:border-slate-600 pl-6 py-2">
                <h2 className="text-2xl font-bold mb-3 text-slate-700 dark:text-slate-300">
                  Solo <span className="text-lg font-normal text-muted-foreground">(Individual Superachiever)</span>
                </h2>
                <p className="text-xl font-semibold mb-3">Vivify Further</p>
                <ul className="space-y-2 text-foreground">
                  <li>→ <strong>Learn</strong> for entertainment</li>
                  <li>→ <strong>Apply</strong> for enlightenment</li>
                  <li>→ <strong>Teach</strong> for empowerment</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Unlock: Superhuman Enhancements + Personal Success Puzzle
                </p>
              </div>

              {/* Team */}
              <div className="border-l-4 border-gray-500 dark:border-gray-600 pl-6 py-2">
                <h2 className="text-2xl font-bold mb-3 text-gray-700 dark:text-gray-300">
                  Team <span className="text-lg font-normal text-muted-foreground">(Collective of Superachievers)</span>
                </h2>
                <p className="text-xl font-semibold mb-3">Unify Faster</p>
                <ul className="space-y-2 text-foreground">
                  <li>→ <strong>Personalize</strong> the startup society</li>
                  <li>→ <strong>Globalize</strong> the network union</li>
                  <li>→ <strong>Localize</strong> the network archipelago</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Unlock: Supersociety Advancements + Business Success Puzzle
                </p>
              </div>

              {/* Firm */}
              <div className="border-l-4 border-zinc-500 dark:border-zinc-600 pl-6 py-2">
                <h2 className="text-2xl font-bold mb-3 text-zinc-700 dark:text-zinc-300">
                  Firm <span className="text-lg font-normal text-muted-foreground">(Supercivilization Ecosystem)</span>
                </h2>
                <p className="text-xl font-semibold mb-3">Thrive Forever</p>
                <ul className="space-y-2 text-foreground">
                  <li>→ <strong>Create</strong> the new (invent growth engines)</li>
                  <li>→ <strong>Evolve</strong> the now (improve growth engines)</li>
                  <li>→ <strong>Manage</strong> the next (portfolio of growth engines)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Unlock: Supergenius Breakthroughs + Supermind Superpowers
                </p>
              </div>
            </div>

            {/* Seven Domains */}
            <div className="mb-10 p-6 rounded-lg border border-border/50 bg-gradient-to-b from-background to-muted/20">
              <h3 className="text-lg font-bold mb-4">Orchestrating 7 Domains</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">News</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Education</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Lifestyle</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Social</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Business</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Finance</div>
                <div className="px-3 py-2 rounded bg-muted/50 border border-border/40">Productivity</div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                All integrated on <strong>supercivilization.xyz</strong> as one unified platform
              </p>
            </div>

            {/* Creator Attribution */}
            <div className="p-4 rounded-lg border border-border/50 bg-gradient-to-r from-zinc-50/50 to-zinc-100/50 dark:from-zinc-900/10 dark:to-zinc-800/10">
              <p className="text-sm text-foreground">
                <strong>Created by:</strong> <Link href="https://joshuaseymour.com" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 underline">Joshua Seymour</Link>
                <br />
                <strong>Founder of:</strong> <Link href="https://supercivilization.xyz" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 underline">Supercivilization</Link>
              </p>
            </div>
          </div>
        </header>

        {/* Canonical 5S Definition */}
        <section id="definition" className="section-spacing">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The 5S Orchestration Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five layers orchestrated across Solo, Team, and Firm levels
            </p>
          </div>

          <div className="space-y-6">
            <Link href="/solutions" id="solutions" className="group block">
              <Card className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm hover:shadow-lg hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Rocket className="text-slate-600 dark:text-slate-400" size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        Solutions
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        Outcomes orchestrated at Solo (personal success), Team (collective coordination), and Firm (ecosystem growth) levels
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-600 dark:text-slate-400 font-medium inline-flex items-center gap-2">
                    Explore Solutions
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/systems" id="systems" className="group block">
              <Card className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Network className="text-gray-600 dark:text-gray-400" size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        Systems
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        Architectures orchestrated at Solo (personal systems), Team (coordination systems), and Firm (governance systems) levels
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 dark:text-gray-400 font-medium inline-flex items-center gap-2">
                    Explore Systems
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/software" id="software" className="group block">
              <Card className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm hover:shadow-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Code className="text-zinc-700 dark:text-zinc-400" size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                        Software
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        Tools orchestrated at Solo (personal tools), Team (collaboration software), and Firm (platform infrastructure) levels
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-zinc-700 dark:text-zinc-400 font-medium inline-flex items-center gap-2">
                    Explore Software
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services" id="services" className="group block">
              <Card className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Cloud className="text-neutral-600 dark:text-neutral-400" size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                        Services
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        External platforms orchestrated at Solo (personal services), Team (team services), and Firm (platform services) levels
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-neutral-600 dark:text-neutral-400 font-medium inline-flex items-center gap-2">
                    Explore Services
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/support" id="support" className="group block">
              <Card className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm hover:shadow-lg hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <LifeBuoy className="text-zinc-700 dark:text-zinc-300" size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                        Support
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        Guidance orchestrated at Solo (personal guidance), Team (community support), and Firm (institutional support) levels
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-zinc-700 dark:text-zinc-300 font-medium inline-flex items-center gap-2">
                    Explore Support
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
