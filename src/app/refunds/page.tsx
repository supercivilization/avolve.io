import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Refund Policy | Avolve.io",
  description: "Refund policy for Avolve.io subscriptions and services.",
}

export default function RefundsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
      </div>

      <h1 className="mb-8 text-4xl font-bold">Refund Policy</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          <strong>Effective Date:</strong> October 9, 2025<br />
          <strong>Last Updated:</strong> October 9, 2025
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. General Refund Policy</h2>
          <p>
            At Avolve.io, we want you to be satisfied with our Service. This Refund Policy explains
            our approach to refunds for subscription payments.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. 14-Day Money-Back Guarantee</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Eligibility</h3>
          <p>
            We offer a <strong>14-day money-back guarantee</strong> for first-time subscribers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Available for your first subscription purchase only</li>
            <li>Must be requested within 14 days of initial payment</li>
            <li>Full refund, no questions asked</li>
            <li>Applies to both monthly and annual subscriptions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Not Eligible</h3>
          <p>The 14-day guarantee does NOT apply to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Renewal payments (second month onwards)</li>
            <li>Subscription plan changes or upgrades</li>
            <li>Add-on purchases</li>
            <li>Accounts previously refunded</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Subscription Renewals</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 No Refunds for Renewals</h3>
          <p>
            Subscription renewals are <strong>non-refundable</strong>. We recommend:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancel your subscription before the renewal date if you don't wish to continue</li>
            <li>You retain access until the end of your paid period</li>
            <li>No refunds for partial months or unused time</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Cancellation</h3>
          <p>
            You may cancel your subscription at any time:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellation takes effect at the end of the current billing period</li>
            <li>You retain full access until that date</li>
            <li>No prorated refunds for unused time</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Exceptional Circumstances</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Service Outages</h3>
          <p>
            If we experience significant service outages (&gt;24 consecutive hours), we may offer:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prorated credit for downtime</li>
            <li>Extended subscription period</li>
            <li>Partial refund (at our discretion)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Billing Errors</h3>
          <p>
            If you were charged incorrectly due to our error:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full refund of incorrect charges</li>
            <li>Processed within 5-7 business days</li>
            <li>Contact support immediately if you notice billing errors</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Duplicate Charges</h3>
          <p>
            Duplicate charges due to technical errors will be refunded immediately.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. How to Request a Refund</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Process</h3>
          <p>To request a refund:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Submit a refund request via our <Link href="/contact" className="text-blue-600 hover:underline">Contact Form</Link> (select "Refund Request")</li>
            <li>Include your account email and reason for refund</li>
            <li>We will respond within 1 business day</li>
            <li>Approved refunds are processed within 5-7 business days</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Required Information</h3>
          <p>Please provide:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address associated with your account</li>
            <li>Date of original purchase</li>
            <li>Transaction ID (if available)</li>
            <li>Brief reason for refund request</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Refund Processing</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Timeline</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are processed to the original payment method</li>
            <li>Processing time: 5-7 business days</li>
            <li>Bank processing may take additional 3-5 days</li>
            <li>Total time: typically 10-12 business days</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Payment Method</h3>
          <p>
            Refunds are issued to the original payment method used for the purchase.
            We cannot refund to a different card or account.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. Annual Subscriptions</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.1 14-Day Guarantee</h3>
          <p>
            Annual subscriptions are eligible for the 14-day money-back guarantee:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full refund if requested within 14 days of purchase</li>
            <li>Applies to first-time annual subscribers</li>
            <li>Account access is revoked upon refund</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 After 14 Days</h3>
          <p>
            After the 14-day window:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No prorated refunds for remaining months</li>
            <li>You may cancel to prevent auto-renewal</li>
            <li>Access continues until annual period ends</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. Chargebacks</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Policy</h3>
          <p>
            Please contact us before initiating a chargeback:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We aim to resolve all billing issues amicably</li>
            <li>Chargebacks result in immediate account suspension</li>
            <li>Chargeback fees ($15-25) will be charged to reinstate access</li>
            <li>Repeated chargebacks may result in permanent ban</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Legitimate Disputes</h3>
          <p>
            If you have a legitimate billing dispute, <Link href="/contact" className="text-blue-600 hover:underline">contact us first</Link> (select "Billing & Payments").
            We will work to resolve the issue quickly.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Plan Changes</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Upgrades</h3>
          <p>
            When upgrading to a higher-tier plan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are charged the prorated difference immediately</li>
            <li>New plan takes effect immediately</li>
            <li>No refunds if you downgrade later</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Downgrades</h3>
          <p>
            When downgrading to a lower-tier plan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Change takes effect at next billing cycle</li>
            <li>No refunds for current period difference</li>
            <li>You retain higher-tier access until renewal</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">10. Account Termination by Us</h2>
          <p>
            If we terminate your account for Terms of Service violations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No refunds for remaining subscription time</li>
            <li>This includes violations such as fraud, abuse, or illegal activity</li>
            <li>We reserve the right to terminate without refund for cause</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">11. Currency and Taxes</h2>
          <p>
            All prices are in USD. Refunds are issued in the currency of the original purchase.
            Taxes and foreign exchange fees are not refundable.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to Refund Policy</h2>
          <p>
            We may modify this Refund Policy at any time. Changes will not affect refunds for
            purchases made before the policy change. Updated policies apply only to future purchases.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact for Refunds</h2>
          <p>
            For refund requests or questions:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:underline">Submit Refund Request</Link></li>
            <li><strong>Legal Entity:</strong> Avolve LLC</li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">Summary</h3>
          <ul className="list-disc pl-6 space-y-1 text-green-800 dark:text-green-200">
            <li>✓ 14-day money-back guarantee for first-time subscribers</li>
            <li>✓ Full refund, no questions asked within 14 days</li>
            <li>✓ Billing errors refunded immediately</li>
            <li>✗ No refunds for renewals after 14 days</li>
            <li>✗ No prorated refunds for cancellations</li>
          </ul>
        </section>

        <section className="mt-4 p-6 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> This refund policy is designed to be fair and transparent.
            If you have special circumstances not covered here, please contact us to discuss.
          </p>
        </section>
      </div>
    </div>
  )
}
