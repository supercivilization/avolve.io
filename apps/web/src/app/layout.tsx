import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.css";
import { cn } from "@repo/ui";

export const metadata: Metadata = {
  title: "Avolve - Intelligence Platform with Modern Web Stack",
  description: "Real-time intelligence across 536 sources powered by 48+ production scripts. Built with Next.js 15.5, React 19, and modern web technologies.",
  keywords: [
    "intelligence platform",
    "social listening",
    "github monitoring",
    "market research",
    "nextjs",
    "react",
    "typescript",
    "tailwind",
    "shadcn-ui",
    "modern web stack",
    "seo research",
    "competitive analysis"
  ],
  authors: [{ name: "Avolve Team" }],
  creator: "Avolve",
  publisher: "Avolve",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Avolve - Intelligence Platform with Modern Web Stack",
    description: "Real-time intelligence across 536 sources. Production-ready monitoring powered by modern web technologies.",
    siteName: "Avolve",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolve Intelligence Platform",
    description: "536 sources monitored. 48+ production scripts. Built on Next.js 15.5 + React 19.",
    creator: "@avolve",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMonoVF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="dns-prefetch" href="//supabase.com" />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://api.anthropic.com" />

        {/* Accessibility meta tags */}
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />

        {/* Performance optimization */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          "selection:bg-primary/20 selection:text-primary-foreground",
          "focus-within:outline-none"
        )}
      >
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Main application content */}
        <div className="relative flex min-h-screen flex-col">
          <main
            id="main-content"
            className="flex-1"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
        </div>

        {/* Enhanced error boundary and performance monitoring */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Vercel Analytics */}
            <script
              defer
              src="https://static.vercel.app/v1/script.js"
              data-domain={process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID}
            />

            {/* Core Web Vitals monitoring */}
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `
                  if ('web-vital' in window) {
                    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                      getCLS(console.log);
                      getFID(console.log);
                      getFCP(console.log);
                      getLCP(console.log);
                      getTTFB(console.log);
                    });
                  }
                `
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}