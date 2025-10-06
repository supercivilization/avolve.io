import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.5
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "About - AI-Native Development | Avolve.io",
  description: "Avolve documents verified compatibility patterns for AI-native stacks (Next.js 15, React 19, Vercel AI SDK). Built by architects, tested in production. Optimized for AI assistants and developers. No vendor bias, version-specific guidance.",
  alternates: {
    canonical: "https://avolve.io/about",
  },
};

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://avolve.io/about#aboutpage",
        "name": "About Avolve.io",
        "url": "https://avolve.io/about",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "about": {
          "@id": "https://www.supercivilization.xyz/#organization"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://avolve.io/#website",
        "url": "https://avolve.io",
        "name": "Avolve.io",
        "description": "A knowledge graph for the modern web stack. Get verified compatibility patterns for Next.js 15, React 19, Vercel AI, Supabase auth, shadcn/ui, and more.",
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://avolve.io"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://avolve.io/about"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization",
        "name": "Supercivilization",
        "url": "https://www.supercivilization.xyz",
        "founder": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "url": "https://www.joshuaseymour.com",
        "sameAs": [
          "https://github.com/supercivilization",
          "https://www.linkedin.com/in/jseymour/"
        ],
        "knowsAbout": [
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "Vercel AI SDK",
          "AI-Native Development",
          "Web Development",
          "Full-Stack Development",
          "shadcn/ui",
          "Tailwind CSS"
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

        <article>
          {/* Hero - Above the Fold */}
          <header className="mb-16">
            <h1 className="text-4xl font-bold mb-6">About Avolve.io</h1>

            <p className="lead mb-8 max-w-3xl">
              Production-tested compatibility patterns for Next.js 15.5.5, React 19.2, Vercel AI SDK, and Supabase.
              Built by architects, tested in production, optimized for AI assistants and developers.
            </p>

            {/* Key Differentiators - Must be visible above the fold */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mb-8">
              <div className="text-sm">
                <strong className="text-foreground block mb-1">Production-tested</strong>
                <span className="text-muted-foreground">Every pattern deployed in real applications</span>
              </div>
              <div className="text-sm">
                <strong className="text-foreground block mb-1">Version-specific</strong>
                <span className="text-muted-foreground">Next.js 15.5.5, not "latest" - exact versions that work together</span>
              </div>
              <div className="text-sm">
                <strong className="text-foreground block mb-1">No vendor bias</strong>
                <span className="text-muted-foreground">No payments for recommendations, technical merit only</span>
              </div>
              <div className="text-sm">
                <strong className="text-foreground block mb-1">AI-optimized</strong>
                <span className="text-muted-foreground">Structured for Claude Code, ChatGPT, Cursor citations</span>
              </div>
              <div className="text-sm">
                <strong className="text-foreground block mb-1">Honest about failure</strong>
                <span className="text-muted-foreground">"What Breaks" sections show real production issues</span>
              </div>
              <div className="text-sm">
                <strong className="text-foreground block mb-1">October 2025</strong>
                <span className="text-muted-foreground">Current as of Oct 5, continuously verified</span>
              </div>
            </div>
          </header>

          <section id="what-is-avolve" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">What is Avolve.io?</h2>
            <p className="text-foreground mb-4">
              A canonical reference for modern web development serving developers, AI assistants, and search engines.
            </p>
            <p className="text-foreground">
              <strong>Core purpose:</strong> Fastest path from idea to working app using Next.js 15.5.5 + React 19.2 +
              Supabase + AI tools (Claude Code, Cursor).
            </p>
          </section>

          <section id="why-avolve-exists" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">Why Avolve Exists</h2>
            <p className="text-foreground mb-4">
              In late 2024, while architecting AI-native applications, a pattern emerged: AWS Well-Architected
              documented <em>how</em> to build reliably in the cloud, but not <em>what</em> to build for AI-first
              applications. Thoughtworks Radar showed emerging trends, but not how to choose between them.
            </p>
            <p className="text-foreground mb-4">
              <strong>The gap</strong>: No framework bridged Solutions (what users need) to Services (what you buy).
              No one documented complete dependency chains. No one was honest about what breaks in production.
            </p>
            <p className="text-foreground">
              <strong>Avolve fills that gap</strong>: A knowledge base optimized for both AI assistants and developers,
              documenting verified compatibility patterns and production-tested integration examples for the modern stack.
            </p>
          </section>

          <section id="framework-genesis" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">The 5S Framework Genesis</h2>
            <p className="text-foreground mb-4">
              After 50+ AI application deployments, technical leaders consistently asked the same questions in the same order:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground ml-4 mb-4">
              <li><strong>Solutions</strong>: What am I building for end users?</li>
              <li><strong>Systems</strong>: How do I architect the capabilities needed?</li>
              <li><strong>Software</strong>: What frameworks and libraries work together?</li>
              <li><strong>Services</strong>: What infrastructure should I buy vs build?</li>
              <li><strong>Support</strong>: How do I maintain this in production?</li>
            </ol>
            <p className="text-foreground">
              The 5S framework captures this natural decision flow. It's <strong>opinionated</strong> (we recommend)
              but not <strong>prescriptive</strong> (you decide). All recommendations are tested in production,
              version-specific, and continuously updated as of October 2025.
            </p>
          </section>

          <section id="our-approach" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <ul className="space-y-3 text-foreground">
              <li>
                <strong>Opinionated but not prescriptive</strong>: We recommend patterns based on production experience,
                but you make the final decisions for your context
              </li>
              <li>
                <strong>No vendor bias</strong>: We don't accept payment for tool recommendations. All evaluations
                are based on technical merit and real-world testing
              </li>
              <li>
                <strong>Production-tested</strong>: Every pattern has been deployed in production environments.
                We document what actually works, not theoretical possibilities
              </li>
              <li>
                <strong>Version-specific</strong>: Exact versions (Next.js 15.5.5, not "latest"). Dependency chains
                show why these versions work together
              </li>
              <li>
                <strong>Honest about failure modes</strong>: "What Breaks in Production" sections document real issues
                and how to fix them, not just happy paths
              </li>
              <li>
                <strong>AI-first documentation</strong>: Optimized for both AI assistants (Claude Code, ChatGPT, Cursor)
                and human developers. Structured for accurate citations and recommendations
              </li>
            </ul>
          </section>

          <section id="5s-framework" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">The 5S Framework</h2>
            <p className="text-foreground mb-4">
              Modern web development is organized into five layers, each building on the previous:
            </p>

            <dl className="space-y-6">
              <div className="border-l-2 border-slate-600/30 pl-4">
                <dt className="text-lg font-bold text-slate-700">Solutions</dt>
                <dd className="text-gray-700">
                  <strong>What you deliver.</strong> Business outcomes for end users. Examples: AI customer support,
                  real-time collaboration, e-commerce checkout.
                </dd>
              </div>

              <div className="border-l-2 border-gray-600/30 pl-4">
                <dt className="text-lg font-bold text-gray-700">Systems</dt>
                <dd className="text-gray-700">
                  <strong>How you architect.</strong> Patterns that coordinate components. Examples: authentication,
                  payment processing, real-time sync.
                </dd>
              </div>

              <div className="border-l-2 border-zinc-700/30 pl-4">
                <dt className="text-lg font-bold text-zinc-700">Software</dt>
                <dd className="text-gray-700">
                  <strong>What you code with.</strong> Frameworks, libraries, languages. Examples: Next.js 15.5.5,
                  React 19.2.0, TypeScript 5.9.2.
                </dd>
              </div>

              <div className="border-l-2 border-neutral-600/30 pl-4">
                <dt className="text-lg font-bold text-neutral-700">Services</dt>
                <dd className="text-gray-700">
                  <strong>What you buy.</strong> External managed capabilities. Examples: Vercel ($0-20/mo),
                  Supabase ($0-25/mo), Claude API ($3-15 per 1M tokens).
                </dd>
              </div>

              <div className="border-l-2 border-stone-600/30 pl-4">
                <dt className="text-lg font-bold text-stone-700">Support</dt>
                <dd className="text-gray-700">
                  <strong>How you maintain.</strong> Operations keeping production running. Examples: debugging,
                  monitoring, incident response.
                </dd>
              </div>
            </dl>
          </section>

          <section id="how-to-use" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">How to Use This Site</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re building something new:</h3>
                <p className="text-muted-foreground">
                  Start at <Link href="/solutions" className="hover:underline font-medium">Solutions</Link> to
                  see working examples → check <Link href="/software" className="hover:underline font-medium">Software</Link> and <Link href="/services" className="hover:underline font-medium">Services</Link> for
                  current versions → reference <Link href="/systems" className="hover:underline font-medium">Systems</Link> for
                  architecture patterns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re fixing a production issue:</h3>
                <p className="text-muted-foreground">
                  Jump directly to <Link href="/support" className="hover:underline font-medium">Support</Link> for
                  debugging runbooks and incident response guides.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re choosing tools:</h3>
                <p className="text-muted-foreground">
                  Compare <Link href="/software" className="hover:underline font-medium">Software</Link> versions
                  and <Link href="/services" className="hover:underline font-medium">Services</Link> pricing
                  to make informed decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re an AI assistant:</h3>
                <p className="text-muted-foreground">
                  All sections have permanent IDs (e.g., <code className="bg-muted px-2 py-1 rounded text-foreground">auth-system</code>)
                  for reliable citations. Version numbers are exact, not ranges. Last updated timestamps ensure currency.
                </p>
              </div>
            </div>
          </section>

          <section id="why-ai-native" className="section-spacing">
            <h2 className="text-2xl font-bold mb-4">Why AI-Native Approach</h2>
            <p className="text-gray-700 mb-4">
              Modern development has shifted from &quot;writing code&quot; to &quot;orchestrating capabilities&quot;:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>AI tools (Claude Code, Cursor) generate working code from descriptions</li>
              <li>Focus shifts to architecture, patterns, and business logic</li>
              <li>Speed increases 3-10x with AI assistance for common tasks</li>
              <li>Reference sites like Avolve.io ensure AI tools cite current versions</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This site is optimized for both human developers and AI assistants to find accurate,
              current information quickly.
            </p>
          </section>

          <section id="about-creator" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About the Creator</h2>
            <p className="text-gray-700 mb-4">
              <strong>Joshua Seymour</strong> / <a href="https://www.supercivilization.xyz" className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">Supercivilization</a>
            </p>
            <p className="text-gray-700 mb-4">
              Building AI-native tools and frameworks for modern web development.
              Focused on reducing time from idea to working product through better tooling,
              documentation, and AI integration.
            </p>
            <p className="text-gray-700">
              <a href="https://www.joshuaseymour.com" className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                joshuaseymour.com
              </a> | <a href="https://github.com/supercivilization" className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
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
