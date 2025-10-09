import type { Metadata } from "next"
import Link from "next/link"
import { UNIVERSAL_PROPERTIES, authorRef, publisherRef } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Privacy Policy | Avolve.io",
  description: "Privacy policy for Avolve.io - How we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://avolve.io/privacy#webpage",
        "url": "https://avolve.io/privacy",
        "name": "Privacy Policy - Avolve.io",
        "description": "Privacy policy for Avolve.io. How we collect, use, and protect your information in compliance with GDPR, CCPA, and applicable privacy laws.",
        "datePublished": "2025-10-09",
        "dateModified": "2025-10-09",
        ...UNIVERSAL_PROPERTIES,
        "author": authorRef,
        "publisher": publisherRef,
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        }
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
            "name": "Privacy Policy",
            "item": "https://avolve.io/privacy"
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>

        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          <strong>Effective Date:</strong> October 9, 2025<br />
          <strong>Last Updated:</strong> October 9, 2025
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Avolve LLC ("we," "us," or "our") operates the website avolve.io (the "Service").
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or use our services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (email address, name)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Communication data (support requests, feedback)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Usage data (pages visited, time spent, interactions)</li>
            <li>Device information (browser type, operating system, IP address)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining our Service</li>
            <li>Processing payments and transactions</li>
            <li>Sending administrative information and updates</li>
            <li>Responding to customer support requests</li>
            <li>Improving our Service and user experience</li>
            <li>Detecting and preventing fraud or abuse</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
          <p>We may share your information with:</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Service Providers:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Supabase:</strong> Database and authentication</li>
            <li><strong>Vercel:</strong> Hosting and infrastructure</li>
            <li><strong>Anthropic:</strong> AI services (Claude API)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Legal Requirements:</h3>
          <p>
            We may disclose your information if required by law or in response to valid requests
            by public authorities (e.g., court orders, government requests).
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit (TLS/SSL)</li>
            <li>Encryption of sensitive data at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet or electronic storage is 100% secure.
            We cannot guarantee absolute security.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes
            outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data</li>
            <li><strong>Portability:</strong> Request transfer of your data</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
            <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please use our <Link href="/contact" className="text-foreground hover:underline">Contact Form</Link>.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service.
            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>
            Our Service is not directed to individuals under 18. We do not knowingly collect
            personal information from children under 18. If you become aware that a child has
            provided us with personal information, please contact us.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on servers located outside your
            state, province, country, or other governmental jurisdiction where data protection laws
            may differ. We take appropriate safeguards to ensure your data is treated securely.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Contact Form:</strong> <Link href="/contact" className="text-foreground hover:underline">Submit Privacy Inquiry</Link></li>
            <li><strong>Legal Entity:</strong> Avolve LLC</li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">EU/UK Users - GDPR Compliance</h3>
          <p>
            If you are located in the European Union or United Kingdom, you have additional rights under GDPR,
            including the right to lodge a complaint with a supervisory authority.
          </p>
        </section>

        <section className="mt-4 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">California Users - CCPA Compliance</h3>
          <p>
            California residents have specific rights under the California Consumer Privacy Act (CCPA),
            including the right to opt-out of the sale of personal information. We do not sell personal information.
          </p>
        </section>
      </div>
    </div>
    </>
  )
}
