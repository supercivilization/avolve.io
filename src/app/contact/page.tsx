"use client"

import Link from "next/link"
import { Mail, MessageSquare } from "lucide-react"
import { useState } from "react"
import Script from "next/script"

const LAST_VERIFIED_DATE = "2025-10-06"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://avolve.io/contact#contactpage",
        "name": "Contact Avolve.io",
        "description": "Contact us for questions, feedback, or support about Avolve.io - your modern web development stack integration reference.",
        "url": "https://avolve.io/contact",
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "inLanguage": "en-US",
        "datePublished": "2025-10-05",
        "dateModified": LAST_VERIFIED_DATE
      },
      {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization",
        "name": "Supercivilization",
        "url": "https://www.supercivilization.xyz",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "availableLanguage": "English",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          },
          "areaServed": "Worldwide"
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
            "name": "Contact",
            "item": "https://avolve.io/contact"
          }
        ]
      }
    ]
  }

  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>

        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
      <p className="mb-12 text-xl text-muted-foreground">
        Have a question, feedback, or need support? We're here to help.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Contact Form - Takes 2 columns */}
        <div className="md:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
                <MessageSquare className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h2 className="text-2xl font-semibold">Send us a Message</h2>
            </div>

            {status === "success" ? (
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-6 text-center">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-800 dark:text-green-200 mb-4">
                  Thank you for contacting us. We'll respond within 1-2 business days.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-foreground hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="refund">Refund Request</option>
                    <option value="privacy">Privacy & Data</option>
                    <option value="legal">Legal</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                  <p>
                    By submitting this form, you agree that we'll use your email address to respond to your inquiry.
                    See our <Link href="/privacy" className="text-foreground hover:underline">Privacy Policy</Link> for details.
                  </p>
                </div>

                {status === "error" && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 text-red-800 dark:text-red-200">
                    Failed to send message. Please try again or contact us through GitHub.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-medium text-zinc-50 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info Sidebar - Takes 1 column */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Response Time
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• General: 1-2 business days</li>
              <li>• Support: Within 24 hours</li>
              <li>• Billing: Within 1 business day</li>
              <li>• Critical: Within 4 hours</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-3">GitHub</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Report issues or contribute to our open-source project.
            </p>
            <a
              href="https://github.com/supercivilization/avolve.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:underline"
            >
              View on GitHub →
            </a>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-3">About Avolve</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Built by <a
                href="https://www.joshuaseymour.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Joshua Seymour
              </a>, founder of{" "}
              <a
                href="https://www.supercivilization.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Supercivilization
              </a>.
            </p>
            <p className="text-xs text-muted-foreground">
              Legal Entity: Avolve LLC
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
