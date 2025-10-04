import type { Metadata } from "next"
import HomePage from "./client-page"

export const metadata: Metadata = {
  title: "Avolve | Family Office & Venture Builders",
  description:
    "Avolve is a family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization. Discover our investment approach and portfolio companies.",
  keywords: [
    "family office",
    "venture builders",
    "Joshua Seymour",
    "Supercivilization",
    "investment portfolio",
    "startup ecosystem",
    "venture capital",
    "business development",
  ],
  openGraph: {
    title: "Avolve | Family Office & Venture Builders",
    description:
      "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
    url: "https://avolve.io",
    siteName: "Avolve",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
        width: 1200,
        height: 630,
        alt: "Avolve - Family Office & Venture Builders",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolve | Family Office & Venture Builders",
    description:
      "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
    ],
  },
  alternates: {
    canonical: "https://avolve.io",
  },
}

export default function Page() {
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Avolve | Family Office & Venture Builders",
            description:
              "A family office of venture builders, partners, and associates working together with Joshua Seymour to build, fund, and help the Supercivilization.",
            url: "https://avolve.io",
            mainEntity: {
              "@type": "Organization",
              name: "Avolve LLC",
              url: "https://avolve.io",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png",
              description: "Family office of venture builders, partners, and associates",
              founder: {
                "@type": "Person",
                name: "Joshua Seymour",
                url: "https://www.joshuaseymour.com",
              },
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
              ],
            },
          }),
        }}
      />
    </>
  )
}
