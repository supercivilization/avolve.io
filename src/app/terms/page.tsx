import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Avolve.io",
  description: "Terms of Service for Avolve.io - Legal terms governing use of our services.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
      </div>

      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          <strong>Effective Date:</strong> October 9, 2025<br />
          <strong>Last Updated:</strong> October 9, 2025
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Avolve.io (the "Service"), you agree to be bound by these Terms of Service
            ("Terms"). If you do not agree to these Terms, do not use the Service.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            Avolve.io provides technical documentation, integration patterns, and resources for modern web development
            stacks, including but not limited to Next.js, React, TypeScript, Vercel AI SDK, and Supabase.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Account Registration</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must be at least 18 years old to create an account</li>
            <li>One account per user - no multiple accounts without permission</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Account Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All activities under your account</li>
            <li>Maintaining confidentiality of your credentials</li>
            <li>Notifying us immediately of unauthorized access</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Permitted Use</h3>
          <p>You may use the Service for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Learning and educational purposes</li>
            <li>Professional development projects</li>
            <li>Commercial software development</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Prohibited Activities</h3>
          <p>You may NOT:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe intellectual property rights</li>
            <li>Transmit malware, viruses, or harmful code</li>
            <li>Attempt to gain unauthorized access to systems</li>
            <li>Scrape or harvest data without permission</li>
            <li>Impersonate others or provide false information</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use the Service for illegal activities</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payments</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Billing</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Subscription fees are billed in advance on a monthly or annual basis</li>
            <li>Payment processing is handled securely by Stripe</li>
            <li>All fees are in USD unless otherwise stated</li>
            <li>Taxes may apply based on your location</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Refunds</h3>
          <p>
            See our <Link href="/refunds" className="text-blue-600 hover:underline">Refund Policy</Link> for
            detailed information about refund eligibility and process.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Subscription Changes</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may upgrade or downgrade your subscription at any time</li>
            <li>Changes take effect at the next billing cycle</li>
            <li>Upgrades are prorated; downgrades are not</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Cancellation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may cancel your subscription at any time</li>
            <li>Cancellation takes effect at the end of the current billing period</li>
            <li>No refunds for partial months or unused time</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Our Content</h3>
          <p>
            All content, features, and functionality of the Service are owned by Avolve.io or its licensors
            and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 License to Use</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to access and use the Service
            for your personal or commercial purposes in accordance with these Terms.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Code Examples</h3>
          <p>
            Code examples provided on the Service are licensed under MIT License unless otherwise specified.
            You may use, modify, and distribute code examples in your projects.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
          <p className="font-semibold">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
          </p>
          <p className="mt-4">We disclaim all warranties, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accuracy, completeness, or reliability of content</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Uninterrupted or error-free operation</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="font-semibold">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, AVOLVE.IO SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </p>
          <p className="mt-4">
            Our total liability shall not exceed the amount you paid to us in the 12 months prior
            to the event giving rise to liability, or $100, whichever is greater.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Avolve.io, its officers, directors, employees,
            and agents from any claims, liabilities, damages, losses, or expenses arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">10. Data and Privacy</h2>
          <p>
            Your use of the Service is subject to our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>,
            which is incorporated into these Terms by reference.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">11. Third-Party Services</h2>
          <p>
            The Service may integrate with third-party services (Stripe, Supabase, Vercel, Anthropic, etc.).
            Your use of these services is governed by their respective terms and privacy policies.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Termination by You</h3>
          <p>You may terminate your account at any time by canceling your subscription.</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Termination by Us</h3>
          <p>We may suspend or terminate your account if you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate these Terms</li>
            <li>Engage in fraudulent activity</li>
            <li>Fail to pay fees when due</li>
            <li>Use the Service in a manner harmful to us or others</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Effect of Termination</h3>
          <p>Upon termination:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your right to use the Service ceases immediately</li>
            <li>We may delete your account and data</li>
            <li>Provisions that should survive termination will remain in effect</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will notify you of material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting the updated Terms with a new "Last Updated" date</li>
            <li>Sending an email notification to your registered email</li>
          </ul>
          <p className="mt-4">
            Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California, United States,
            without regard to conflict of law principles.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">15. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.1 Informal Resolution</h3>
          <p>
            Before filing a claim, you agree to contact us at <a href="mailto:legal@avolve.io" className="text-blue-600 hover:underline">legal@avolve.io</a> to
            attempt to resolve the dispute informally.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.2 Arbitration</h3>
          <p>
            If informal resolution fails, disputes shall be resolved through binding arbitration
            in accordance with the rules of the American Arbitration Association.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">15.3 Class Action Waiver</h3>
          <p>
            You agree to resolve disputes individually and waive your right to participate in
            class actions or class arbitrations.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">16. Miscellaneous</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.1 Entire Agreement</h3>
          <p>
            These Terms, together with our Privacy Policy and Refund Policy, constitute the
            entire agreement between you and Avolve.io.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.2 Severability</h3>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions
            will continue in full force and effect.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.3 No Waiver</h3>
          <p>
            Our failure to enforce any right or provision shall not constitute a waiver of that right.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.4 Assignment</h3>
          <p>
            You may not assign or transfer these Terms without our written consent.
            We may assign these Terms at any time.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
          <p>
            For questions about these Terms, contact us:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> <a href="mailto:legal@avolve.io" className="text-blue-600 hover:underline">legal@avolve.io</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@avolve.io" className="text-blue-600 hover:underline">support@avolve.io</a></li>
            <li><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:underline">Contact Form</Link></li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> These Terms are provided as a starting point and should be reviewed
            by legal counsel to ensure compliance with applicable laws in your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  )
}
