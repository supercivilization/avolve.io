import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageSquare, Github } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Avolve.io",
  description: "Get in touch with the Avolve.io team - Support, questions, feedback, and partnerships.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
      </div>

      <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
      <p className="mb-12 text-xl text-muted-foreground">
        We're here to help. Choose the best way to reach us based on your needs.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {/* General Inquiries */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-950">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold">General Inquiries</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Questions about our services, documentation, or general feedback.
          </p>
          <a
            href="mailto:hello@avolve.io"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            hello@avolve.io
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Technical Support */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-950">
              <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold">Technical Support</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Account issues, billing questions, or technical problems.
          </p>
          <a
            href="mailto:support@avolve.io"
            className="inline-flex items-center gap-2 text-green-600 hover:underline dark:text-green-400"
          >
            support@avolve.io
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Privacy & Data */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-950">
              <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold">Privacy & Data</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Data requests, privacy concerns, GDPR/CCPA inquiries.
          </p>
          <a
            href="mailto:privacy@avolve.io"
            className="inline-flex items-center gap-2 text-purple-600 hover:underline dark:text-purple-400"
          >
            privacy@avolve.io
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Legal & Compliance */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-950">
              <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold">Legal & Compliance</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Terms of service, legal questions, compliance matters.
          </p>
          <a
            href="mailto:legal@avolve.io"
            className="inline-flex items-center gap-2 text-orange-600 hover:underline dark:text-orange-400"
          >
            legal@avolve.io
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Billing & Refunds */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-950">
              <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold">Billing & Refunds</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Payment issues, refund requests, invoice questions.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:billing@avolve.io"
              className="block text-amber-600 hover:underline dark:text-amber-400"
            >
              billing@avolve.io
            </a>
            <a
              href="mailto:refunds@avolve.io"
              className="block text-amber-600 hover:underline dark:text-amber-400"
            >
              refunds@avolve.io
            </a>
          </div>
        </div>

        {/* Partnerships */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-950">
              <Mail className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold">Partnerships</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Business partnerships, integrations, collaborations.
          </p>
          <a
            href="mailto:partnerships@avolve.io"
            className="inline-flex items-center gap-2 text-pink-600 hover:underline dark:text-pink-400"
          >
            partnerships@avolve.io
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Additional Contact Methods */}
      <div className="mb-12 rounded-lg border border-border bg-muted/50 p-8">
        <h2 className="mb-6 text-2xl font-semibold">Other Ways to Connect</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Github className="mt-1 h-6 w-6 text-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-1">GitHub</h3>
              <p className="text-muted-foreground mb-2">
                Report issues, contribute, or view the source code.
              </p>
              <a
                href="https://github.com/supercivilization/avolve.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                github.com/supercivilization/avolve.io
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MessageSquare className="mt-1 h-6 w-6 text-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-muted-foreground">
                Join our community discussions and get help from other users.
              </p>
              <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20 p-6">
        <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Response Times</h3>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Support requests:</strong> Within 24 hours (business days)</li>
          <li>• <strong>General inquiries:</strong> Within 2-3 business days</li>
          <li>• <strong>Billing/Refunds:</strong> Within 1 business day</li>
          <li>• <strong>Critical issues:</strong> Priority response within 4 hours</li>
        </ul>
      </div>

      {/* Founder Information */}
      <div className="mt-12 border-t border-border pt-12">
        <h2 className="mb-4 text-2xl font-semibold">About Avolve.io</h2>
        <p className="text-muted-foreground mb-4">
          Avolve.io is built by <a
            href="https://www.joshuaseymour.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Joshua Seymour
          </a>, founder of{" "}
          <a
            href="https://www.supercivilization.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Supercivilization
          </a>. We're committed to providing high-quality documentation and
          resources for modern web development.
        </p>
        <p className="text-sm text-muted-foreground">
          For press inquiries or speaking engagements, contact{" "}
          <a href="mailto:admin@joshuaseymour.com" className="text-blue-600 hover:underline dark:text-blue-400">
            admin@joshuaseymour.com
          </a>
        </p>
      </div>
    </div>
  )
}
