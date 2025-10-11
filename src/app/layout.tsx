import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LAST_VERIFIED_DATE } from "@/lib/schema";

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
        "description": "A knowledge graph for the modern web stack. Get verified compatibility patterns for Next.js 15, React 19, Vercel AI, Supabase auth, shadcn/ui, and more. Optimized for AI assistants and developers.",
        "url": "https://avolve.io",
        "inLanguage": "en-US",
        "datePublished": "2025-10-05",
        "dateModified": LAST_VERIFIED_DATE,
        "creator": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "codeRepository": "https://github.com/supercivilization/avolve.io",
        "about": [
          {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/software/nextjs#software",
            "name": "Next.js",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": "15.5.4",
            "operatingSystem": "Node.js 22.20.0 LTS",
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
            "softwareVersion": "5.9.3",
            "url": "https://www.typescriptlang.org",
            "sameAs": [
              "https://github.com/microsoft/TypeScript",
              "https://en.wikipedia.org/wiki/TypeScript",
              "https://www.wikidata.org/wiki/Q978185"
            ]
          }
        ],
        "keywords": "Next.js 15, React 19, TypeScript, modern web stack, stack integration, verified compatibility, Server Components, App Router, Tailwind CSS, shadcn/ui, Vercel, Supabase, AI-native development",
        "hasPart": [
          {
            "@id": "https://avolve.io/blog#blog"
          },
          {
            "@id": "https://avolve.io/about#aboutpage"
          },
          {
            "@id": "https://avolve.io/contact#contactpage"
          }
        ],
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
        "@type": "Blog",
        "@id": "https://avolve.io/blog#blog",
        "name": "Avolve.io Technical Documentation",
        "alternateName": "Modern Web Stack Knowledge Graph",
        "description": "Production-tested integration patterns for Next.js 15, React 19, TypeScript 5.9, and the modern web development stack. Curated technical documentation optimized for developers and AI assistants.",
        "url": "https://avolve.io",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "datePublished": "2025-10-05",
        "dateModified": LAST_VERIFIED_DATE,
        "blogPost": [
          {
            "@id": "https://avolve.io/#article"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization",
        "name": "Supercivilization",
        "slogan": "Vivify Further, Unify Faster, Thrive Forever",
        "url": "https://www.supercivilization.xyz",
        "description": "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
        "logo": {
          "@type": "ImageObject",
          "url": "https://avolve.io/logo.png",
          "width": 512,
          "height": 512
        },
        "founder": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "sameAs": [
          "https://github.com/supercivilization"
        ],
        "foundingDate": "2024"
      },
      {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "alternateName": "Josh Seymour",
        "givenName": "Joshua",
        "familyName": "Seymour",
        "url": "https://www.joshuaseymour.com",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.joshuaseymour.com/profile.png",
          "width": "1200",
          "height": "1200",
          "caption": "Joshua Seymour - Founder of Supercivilization, Creator of Avolve.io"
        },
        "description": "Founder of Supercivilization. Creator of Avolve.io — AI-native knowledge graph for modern web development stack compatibility",
        "jobTitle": "Founder",
        "email": "admin@joshuaseymour.com",
        "foundedOrganization": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "worksFor": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Entrepreneur",
            "occupationalCategory": "11-0000"
          },
          {
            "@type": "Occupation",
            "name": "Software Developer",
            "occupationalCategory": "15-1252.00"
          }
        ],
        "knowsAbout": [
          "AI-native applications",
          "Supercivilization",
          "Avolve.io",
          "Next.js",
          "React",
          "TypeScript",
          "Vercel AI SDK",
          "Supabase",
          "shadcn/ui",
          "Web Development",
          "Modern Tech Stack",
          "AI Integration",
          "Full Stack Development",
          "Technology innovation"
        ],
        "sameAs": [
          "https://www.youtube.com/@joshuaseymour",
          "https://github.com/joshuaseymour",
          "https://tiktok.com/@joshuajseymour",
          "https://substack.com/@joshuaseymour",
          "https://x.com/joshuaseymour",
          "https://t.me/joshuaseymour",
          "https://www.instagram.com/joshuajseymour/"
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
