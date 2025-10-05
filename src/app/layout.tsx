import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avolve.io - Modern Web Development Stack (October 2025)",
  description: "Canonical reference for modern web development. Ship your first app this week with Next.js 15 + React 19.2 + AI tools.",
  openGraph: {
    title: "Avolve.io - Modern Web Development Stack",
    description: "Ship your first app this week. Next.js 15 + React 19.2 + Supabase + AI.",
    url: "https://avolve.io",
    siteName: "Avolve.io",
    locale: "en_US",
    type: "website",
  },
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
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization",
        "name": "Supercivilization",
        "url": "https://www.supercivilization.xyz"
      },
      {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "url": "https://www.joshuaseymour.com"
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
