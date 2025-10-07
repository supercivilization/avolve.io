import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Resend: 4.0+ (422K+ weekly npm downloads)
// - React Email: 4.0+ (March 2025)
// - @react-email/components: Latest
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Email System - Resend + React Email | Avolve.io",
  description: "Production email architecture with Resend API + React Email components. Sub-7-second setup, type-safe templates, enterprise deliverability.",
  keywords: ["Resend", "React Email", "transactional email", "email templates", "Next.js email", "React components", "email API", "modern email stack"]
};

export default function EmailSystemPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://avolve.io/systems/email#webpage",
        "url": "https://avolve.io/systems/email",
        "name": "Email System - Resend + React Email Architecture",
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "about": {
          "@id": "https://avolve.io/systems/email#article"
        }
      },
      {
        "@type": "TechArticle",
        "@id": "https://avolve.io/systems/email#article",
        "headline": "Email System: Resend + React Email Integration",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "Complete email architecture using Resend API and React Email components for type-safe, testable email templates",
        "about": [
          { "@id": "https://avolve.io/software/nextjs#software" },
          { "@id": "https://avolve.io/software/react#software" }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://avolve.io/systems/email#howto-setup",
        "name": "How to Set Up Resend + React Email in Next.js 15",
        "description": "Complete setup guide for production email system with React components",
        "totalTime": "PT15M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Install dependencies",
            "text": "Install Resend SDK, React Email, and email components: npm install resend react-email @react-email/components"
          },
          {
            "@type": "HowToStep",
            "name": "Initialize React Email",
            "text": "Run npx react-email init to set up the email development environment with preview server"
          },
          {
            "@type": "HowToStep",
            "name": "Create email template",
            "text": "Build type-safe React component email template in emails/ directory with full TypeScript support"
          },
          {
            "@type": "HowToStep",
            "name": "Send via API route",
            "text": "Create Next.js API route that imports template and sends via Resend SDK with error handling"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://avolve.io/systems/email#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why use Resend over SendGrid or Mailgun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Resend provides 3,000 free emails/month (vs SendGrid's 100/day), React Email integration, 100K emails at $90/month (vs SendGrid $249), SOC 2 compliance, and developer-first experience with sub-7-second setup. Built specifically for modern frameworks like Next.js 15."
            }
          },
          {
            "@type": "Question",
            "name": "What are the limitations of React Email?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "React Email cannot render MSO conditional comments needed for Outlook 2016 optimization, Gmail clips emails over 102KB, component overhead adds 15-30% size vs hand-coded HTML, and complex layouts may need post-processing. Works best for modern email clients and mobile devices."
            }
          },
          {
            "@type": "Question",
            "name": "How much does professional email infrastructure actually cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Beyond Resend pricing ($20-90/month), budget for email testing tools ($99-399/month for Litmus/Email on Acid), dedicated IPs ($30/month each at scale), email validation ($0.004-0.008 per check), and monitoring ($50-200/month). True cost typically runs 3-4x base API pricing."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Systems", url: "/systems" },
        { name: "Email", url: "/systems/email" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Email System</h1>
          <p className="text-xl text-foreground mb-12">
            Production email with Resend + React Email - type-safe templates, enterprise deliverability
          </p>

          {/* Quick Answer */}
          <section id="overview" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-border">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-foreground mb-4">
              The combination of <strong>Resend API</strong> and <strong>React Email components</strong> creates the most developer-friendly email platform in 2025, with 422K+ weekly npm downloads and processing millions of daily emails.
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li><strong>Sub-7-second setup</strong> with zero configuration</li>
              <li><strong>3,000 free emails/month</strong> (30x more than SendGrid)</li>
              <li><strong>Type-safe React components</strong> instead of HTML strings</li>
              <li><strong>SOC 2 Type II compliant</strong> with GDPR tools</li>
              <li><strong>$90/month for 100K emails</strong> vs $249 for SendGrid</li>
            </ul>
          </section>

          {/* Components */}
          <section id="components" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">System Components</h2>

            <div className="bg-muted p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Architecture</h3>
              <ul className="space-y-2 text-foreground">
                <li><strong>Resend API:</strong> Email delivery service with multi-region infrastructure, SPF/DKIM/DMARC built-in</li>
                <li><strong>React Email:</strong> Component framework for building type-safe, testable email templates</li>
                <li><strong>@react-email/components:</strong> 16+ pre-built components (Button, Text, Container, Image)</li>
                <li><strong>Next.js API Routes:</strong> Server-side email sending with error handling</li>
                <li><strong>TypeScript:</strong> Compile-time validation for email props and content</li>
              </ul>
            </div>
          </section>

          {/* Implementation */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Implementation</h2>

            <h3 className="text-2xl font-bold mb-4">1. Install Dependencies</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Install Resend + React Email
npm install resend react-email @react-email/components

# Initialize React Email (creates emails/ directory)
npx react-email init`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">2. Create Email Template</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`// emails/welcome.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  name,
  loginUrl
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {name}!</Heading>
          <Text style={text}>
            Thanks for joining. We're excited to have you aboard.
          </Text>
          <Button href={loginUrl} style={button}>
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">3. Send via Next.js API Route</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`// app/api/send-welcome/route.ts
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, loginUrl } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@yourdomain.com',
      to: email,
      subject: 'Welcome to our platform!',
      react: WelcomeEmail({ name, loginUrl }),
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">4. Development Preview</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Start React Email preview server with hot reload
npm run email:dev

# Opens http://localhost:3000 with:
# - Live preview of all email templates
# - Mobile/desktop responsive views
# - Real-time updates on file changes
# - Built-in linter for links/images
# - Spam score checker
# - Client compatibility checker`}
            </pre>
          </section>

          {/* Pricing */}
          <section id="pricing" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Cost at Scale</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="border border-border/40 px-4 py-2 text-left">Emails/Month</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Resend</th>
                    <th className="border border-border/40 px-4 py-2 text-left">SendGrid</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Mailgun</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Amazon SES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">3,000</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">$0 (Free)</td>
                    <td className="border border-border/40 px-4 py-2">$0 (100/day)</td>
                    <td className="border border-border/40 px-4 py-2">No free tier</td>
                    <td className="border border-border/40 px-4 py-2">$0.30</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">50,000</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">$20 (Pro)</td>
                    <td className="border border-border/40 px-4 py-2">$20</td>
                    <td className="border border-border/40 px-4 py-2">$90</td>
                    <td className="border border-border/40 px-4 py-2">$5</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">100,000</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">$90</td>
                    <td className="border border-border/40 px-4 py-2">$249</td>
                    <td className="border border-border/40 px-4 py-2">$90</td>
                    <td className="border border-border/40 px-4 py-2">$10</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">1,000,000</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">$650</td>
                    <td className="border border-border/40 px-4 py-2">Custom</td>
                    <td className="border border-border/40 px-4 py-2">Custom</td>
                    <td className="border border-border/40 px-4 py-2">$100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-stone-100 dark:bg-stone-950/20 border-l-4 border-stone-600 dark:border-stone-400 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">True Infrastructure Cost</h3>
              <p className="text-foreground mb-2">Beyond API pricing, budget for:</p>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Email testing tools (Litmus/Email on Acid): <strong>$99-399/month</strong></li>
                <li>• Dedicated IPs for scale: <strong>$30/month each</strong></li>
                <li>• Email validation services: <strong>$0.004-0.008 per validation</strong></li>
                <li>• Deliverability monitoring: <strong>$50-200/month</strong></li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Realistic total:</strong> 3-4x base API pricing for production infrastructure
              </p>
            </div>
          </section>

          {/* What Breaks */}
          <section id="limitations" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What Breaks in Production</h2>

            <div className="bg-stone-50 dark:bg-stone-950/20 border-l-4 border-stone-400 dark:border-stone-600 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-bold mb-1">Outlook 2016 rendering issues</h3>
                <p className="text-sm text-foreground mb-1">
                  React Email cannot render MSO conditional comments needed for Outlook optimization. Flexbox doesn't work, padding only on table cells.
                </p>
                <p className="text-stone-700 dark:text-stone-300 text-sm"><strong>Fix:</strong> Use table-based layouts, post-process to inject MSO conditionals, or maintain separate templates for enterprise clients.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Gmail 102KB message clipping</h3>
                <p className="text-sm text-foreground mb-1">
                  React component overhead adds 15-30% size vs hand-coded HTML. Simple emails can unexpectedly exceed Gmail's limit.
                </p>
                <p className="text-stone-700 dark:text-stone-300 text-sm"><strong>Fix:</strong> Track component "byte cost" during development, use React Email 4.0 size linter, minimize wrapper divs, compress images.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Multi-region latency for dynamic emails</h3>
                <p className="text-sm text-foreground mb-1">
                  Email rendering happens in single region before distribution. Real-time data fetching adds latency for global audiences.
                </p>
                <p className="text-stone-700 dark:text-stone-300 text-sm"><strong>Fix:</strong> Pre-render email variations, cache at edge, use React Server Components (coming in next version) for 50-70% latency reduction.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Testing complexity and cost</h3>
                <p className="text-sm text-foreground mb-1">
                  Comprehensive testing across 50+ email clients requires expensive tools. Edge cases only appear in production.
                </p>
                <p className="text-stone-700 dark:text-stone-300 text-sm"><strong>Fix:</strong> Budget for Litmus ($99-399/month), build extensive test suite, maintain compatibility matrix, test on real devices.</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Production Best Practices</h2>

            <div className="space-y-6">
              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="font-bold mb-2">Component Reusability</h3>
                <p className="text-sm text-foreground">
                  Build button, header, footer components once. Compose across multiple templates. Track byte cost per component. Use TypeScript interfaces for self-documenting props.
                </p>
              </div>

              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="font-bold mb-2">Deliverability Optimization</h3>
                <p className="text-sm text-foreground">
                  Configure SPF, DKIM, DMARC records. Use Resend's suppression list. Warm up dedicated IPs gradually. Monitor bounce rates. A/B test subject lines. Avoid spam trigger words.
                </p>
              </div>

              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="font-bold mb-2">Batch Processing Optimization</h3>
                <p className="text-sm text-foreground">
                  Group recipients by template variation (not arbitrary batching) for 2-3x throughput. Use idempotency keys to prevent duplicates. Batch API supports 100 emails per request.
                </p>
              </div>

              <div className="bg-stone-100 dark:bg-stone-950/20 border-l-4 border-stone-600 dark:border-stone-400 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Error Handling and Monitoring</h3>
                <p className="text-sm text-foreground">
                  Implement webhook listeners for delivery events. Log failures with context. Set up alerts for bounce rate spikes. Use Resend's retry mechanisms. Track email metrics in analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Relationships */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Email System Relates to Other Layers</h2>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>Built with <Link href="/software" className="text-primary hover:underline">Software</Link>:</strong> Next.js API Routes, React components, TypeScript validation</li>
              <li>• <strong>Uses <Link href="/services" className="text-primary hover:underline">Services</Link>:</strong> Resend ($0-650/mo), Litmus testing ($99-399/mo)</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-primary hover:underline">Solutions</Link>:</strong> Transactional emails, marketing campaigns, notifications</li>
              <li>• <strong>Requires <Link href="/support" className="text-primary hover:underline">Support</Link>:</strong> Deliverability monitoring, spam score tracking, client testing</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-border">
            <Link href="/systems" className="text-muted-foreground hover:underline">
              ← Back to Systems
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
