import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://avolve.io"),
  title: {
    default: "Avolve",
    template: "%s | Avolve",
  },
  description:
    "Avolve is a family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
  keywords: [
    "family office",
    "Avolve",
    "Joshua Seymour",
    "Supercivilization",
    "venture builders",
    "venture partners",
    "venture associates",
    "venture cooperative",
  ],
  authors: [{ name: "Avolve LLC" }],
  creator: "Avolve LLC",
  publisher: "Avolve LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avolve.io",
    siteName: "Avolve",
    title: "Avolve | Family Office & Venture Builders",
    description:
      "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
        width: 1200,
        height: 630,
        alt: "Avolve - Family Office & Venture Builders",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolve | Family Office & Venture Builders",
    description:
      "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
    ],
    creator: "@avolve",
  },
  alternates: {
    canonical: "https://avolve.io",
  },
  category: "business",
  classification: "Family Office, Venture Capital, Investment",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="color-scheme" content="dark light" />
        <link rel="canonical" href="https://avolve.io" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Analytics />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Avolve LLC",
              alternateName: "Avolve",
              url: "https://avolve.io",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
              description:
                "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
              foundingDate: "2024",
              industry: "Venture Capital",
              legalName: "Avolve LLC",
              sameAs: ["https://www.joshuaseymour.com", "https://www.supercivilization.xyz"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "hello@avolve.io",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
