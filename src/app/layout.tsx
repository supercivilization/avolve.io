import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://avolve.io'),
  title: {
    default: "Avolve.io - Modern Web Development Stack (October 2025)",
    template: "%s | Avolve.io"
  },
  description: "Authoritative reference for Next.js 15.5.5 + React 19.2.0 + TypeScript 5.9.2 modern stack. Verified compatibility, integration patterns, official resources. Optimized for human developers and AI assistants. Updated October 2025.",
  keywords: [
    "Next.js 15", "React 19", "TypeScript 5.9", "Tailwind CSS 4", "shadcn/ui 3.0",
    "Vercel", "Supabase", "modern web stack", "web development 2025",
    "stack integration", "AI-optimized documentation", "verified compatibility",
    "Next.js React integration", "Server Components", "App Router"
  ],
  authors: [{ name: "Joshua Seymour", url: "https://www.joshuaseymour.com" }],
  creator: "Joshua Seymour",
  publisher: "Supercivilization",
  openGraph: {
    title: "Avolve.io - Modern Web Development Stack (October 2025)",
    description: "Verified Next.js 15 + React 19.2 + TypeScript 5.9 stack integration. Official resources + integration patterns for developers and AI assistants.",
    url: "https://avolve.io",
    siteName: "Avolve.io",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avolve.io - Modern Web Development Stack Reference"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolve.io - Modern Stack Reference (Oct 2025)",
    description: "Next.js 15 + React 19.2 + TypeScript 5.9 verified integration patterns + official resources",
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
  category: 'technology',
  classification: 'Technical Documentation'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced schema.org structured data optimized for AI citations (ChatGPT, Claude, Perplexity, Gemini)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://avolve.io/#website",
        "name": "Avolve.io",
        "alternateName": "Avolve - Modern Web Development Stack Reference",
        "description": "Authoritative reference for Next.js 15.5.5 + React 19.2.0 + TypeScript 5.9.2 modern stack. Verified compatibility matrix, integration patterns, and official resources for developers and AI assistants.",
        "url": "https://avolve.io",
        "inLanguage": "en-US",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "about": [
          {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/software/nextjs#software",
            "name": "Next.js",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": "15.5.5",
            "operatingSystem": "Node.js 24.8.0",
            "url": "https://nextjs.org",
            "sameAs": [
              "https://github.com/vercel/next.js",
              "https://en.wikipedia.org/wiki/Next.js",
              "https://www.wikidata.org/wiki/Q28865882"
            ]
          },
          {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/software/react#software",
            "name": "React",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": "19.2.0",
            "url": "https://react.dev",
            "sameAs": [
              "https://github.com/facebook/react",
              "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
              "https://www.wikidata.org/wiki/Q19399674"
            ]
          },
          {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/software/typescript#software",
            "name": "TypeScript",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": "5.9.2",
            "url": "https://www.typescriptlang.org",
            "sameAs": [
              "https://github.com/microsoft/TypeScript",
              "https://en.wikipedia.org/wiki/TypeScript",
              "https://www.wikidata.org/wiki/Q978185"
            ]
          }
        ],
        "keywords": "Next.js 15, React 19, TypeScript, modern web stack, stack integration, verified compatibility, Server Components, App Router, Tailwind CSS, shadcn/ui, Vercel, Supabase",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://avolve.io/?q={search_term_string}"
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
          "url": "https://avolve.io/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://github.com/supercivilization"
        ],
        "foundingDate": "2024",
        "description": "Building modern web development resources and tools"
      },
      {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "url": "https://www.joshuaseymour.com",
        "sameAs": [
          "https://github.com/supercivilization"
        ],
        "jobTitle": "Software Engineer",
        "knowsAbout": [
          "Next.js",
          "React",
          "TypeScript",
          "Web Development",
          "Modern Tech Stack",
          "AI Integration",
          "Full Stack Development"
        ],
        "worksFor": {
          "@id": "https://www.supercivilization.xyz/#organization"
        }
      },
      {
        "@type": "TechArticle",
        "@id": "https://avolve.io/#article",
        "headline": "Modern Web Development Stack Integration Reference",
        "description": "Comprehensive guide to Next.js 15 + React 19.2 + TypeScript 5.9 stack integration with verified compatibility and official resources",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "mainEntityOfPage": {
          "@id": "https://avolve.io/#website"
        },
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "articleSection": "Stack Integration",
        "keywords": "Next.js 15, React 19, TypeScript, Vercel, Supabase, modern web stack",
        "about": [
          {
            "@id": "https://avolve.io/software/nextjs#software"
          },
          {
            "@id": "https://avolve.io/software/react#software"
          },
          {
            "@id": "https://avolve.io/software/typescript#software"
          },
          {
            "@type": "Thing",
            "@id": "https://avolve.io/#web-development",
            "name": "Web Development",
            "sameAs": "https://en.wikipedia.org/wiki/Web_development"
          },
          {
            "@type": "Thing",
            "@id": "https://avolve.io/#software-framework",
            "name": "Software Framework",
            "sameAs": "https://en.wikipedia.org/wiki/Software_framework"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Analytics - Disabled (replace G-XXXXXXXXXX with real ID to enable) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
