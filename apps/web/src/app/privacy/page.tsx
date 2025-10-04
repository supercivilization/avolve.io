import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Avolve LLC. Learn how we collect, use, and protect your personal information when you use our services.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Avolve",
    description: "Privacy Policy for Avolve LLC. Learn how we collect, use, and protect your personal information.",
    url: "https://avolve.io/privacy",
    type: "article",
  },
  alternates: {
    canonical: "https://avolve.io/privacy",
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-gray-50 to-zinc-100 dark:from-zinc-950 dark:via-gray-950 dark:to-zinc-900 transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center mb-8 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300 underline-offset-4 hover:underline"
            >
              ← Back to Home
            </Link>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg p-8 sm:p-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-zinc-900 dark:text-zinc-100">
                Privacy Policy
              </h1>

              <div className="prose prose-sm sm:prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-lg mb-6 text-zinc-600 dark:text-zinc-400">Last Updated: April 30, 2025</p>

                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
                  1. Introduction
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Avolve LLC ("we," "our," or "us") respects your privacy and is committed to protecting your personal
                  data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                  you use our services, website, and any related applications (collectively, the "Services").
                </p>

                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
                  2. Information We Collect
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  We may collect several types of information from and about users of our Services, including:
                </p>
                <ul className="list-disc pl-6 mb-6 text-zinc-700 dark:text-zinc-300 space-y-2">
                  <li>Personal identifiers (such as name, email address, billing address, and phone number)</li>
                  <li>
                    Payment information (such as credit card details, bank account information, and billing address)
                  </li>
                  <li>Transaction information (such as purchases, services requested, and payment history)</li>
                  <li>
                    Usage data (such as how you interact with our Services, browsing history, and features you use)
                  </li>
                  <li>Device information (such as IP address, browser type, and operating system)</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
                  3. Contact Us
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mt-4">
                  <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                    Avolve LLC
                    <br />
                    Email: privacy@avolve.io
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy | Avolve",
            description:
              "Privacy Policy for Avolve LLC. Learn how we collect, use, and protect your personal information.",
            url: "https://avolve.io/privacy",
            isPartOf: {
              "@type": "WebSite",
              name: "Avolve",
              url: "https://avolve.io",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://avolve.io",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Privacy Policy",
                  item: "https://avolve.io/privacy",
                },
              ],
            },
          }),
        }}
      />
    </>
  )
}
