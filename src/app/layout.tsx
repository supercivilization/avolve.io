import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://avolve.io'),
  title: {
    default: "Avolve.io - Modern Web Development Stack (October 2025)",
    template: "%s | Avolve.io"
  },
  description: "Canonical reference for modern web development. Ship your first app this week with Next.js 15 + React 19.2 + AI tools.",
  keywords: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "shadcn/ui", "modern web stack", "web development 2025"],
  authors: [{ name: "Joshua Seymour", url: "https://www.joshuaseymour.com" }],
  creator: "Joshua Seymour",
  publisher: "Supercivilization",
  openGraph: {
    title: "Avolve.io - Modern Web Development Stack",
    description: "Ship your first app this week. Next.js 15 + React 19.2 + Supabase + AI.",
    url: "https://avolve.io",
    siteName: "Avolve.io",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avolve.io - Modern Web Development Stack"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolve.io - Modern Web Development Stack",
    description: "Ship your first app this week. Next.js 15 + React 19.2 + Supabase + AI.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add your verification code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://avolve.io/#website",
        "name": "Avolve.io",
        "description": "Canonical reference for modern web development (October 2025)",
        "url": "https://avolve.io",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://avolve.io/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization",
        "name": "Supercivilization",
        "url": "https://www.supercivilization.xyz",
        "logo": {
          "@type": "ImageObject",
          "url": "https://avolve.io/logo.png"
        },
        "sameAs": [
          "https://github.com/supercivilization"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "url": "https://www.joshuaseymour.com",
        "sameAs": [
          "https://github.com/supercivilization"
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
