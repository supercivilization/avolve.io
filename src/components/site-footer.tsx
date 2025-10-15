"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const footerSections = [
    {
      id: "solutions",
      title: "Solutions",
      href: "/solutions",
      color: "slate",
      links: [
        { href: "/solutions#ai-customer-support", label: "AI Customer Support" },
        { href: "/solutions#ai-chat-app", label: "AI Chat Application" },
      ]
    },
    {
      id: "systems",
      title: "Systems",
      href: "/systems",
      color: "gray",
      links: [
        { href: "/systems#auth-system", label: "Authentication" },
        { href: "/systems/search", label: "Search (pgvector)" },
        { href: "/systems/email", label: "Email (Resend)" },
        { href: "/systems/mobile", label: "Mobile (PWA)" },
        { href: "/systems/social", label: "Social Login" },
      ]
    },
    {
      id: "software",
      title: "Software",
      href: "/software",
      color: "zinc",
      links: [
        { href: "/software/nodejs", label: "Node.js 22/24" },
        { href: "/software/typescript", label: "TypeScript 5.9" },
        { href: "/software/react", label: "React 19.2" },
        { href: "/software/nextjs", label: "Next.js 16 Beta" },
        { href: "/software/tailwind", label: "Tailwind 4.1" },
        { href: "/software/shadcn-ui", label: "shadcn/ui 3.4" },
        { href: "/software/vercel-ai-sdk", label: "Vercel AI SDK 5.0" },
        { href: "/software/supabase", label: "Supabase (PG 15.8)" },
      ]
    },
    {
      id: "services",
      title: "Services",
      href: "/services",
      color: "neutral",
      links: [
        { href: "/services#vercel", label: "Vercel (Hosting)" },
        { href: "/services#supabase", label: "Supabase (Database)" },
        { href: "/services#claude-api", label: "Claude API (AI)" },
        { href: "/services#resend", label: "Resend (Email)" },
        { href: "/services#stripe", label: "Stripe (Payments)" },
        { href: "/services/dataforseo", label: "DataForSEO (SEO API)" },
      ]
    },
    {
      id: "support",
      title: "Support",
      href: "/support",
      color: "stone",
      links: [
        { href: "/support#auth-loops", label: "Auth Loop Fixes" },
        { href: "/support#slow-queries", label: "Slow Database Queries" },
        { href: "/support#build-failures", label: "Build Failures" },
        { href: "/support#rate-limits", label: "API Rate Limits" },
        { href: "/support#ai-coding-tools", label: "AI Coding Tools" },
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      slate: "text-slate-600 dark:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300",
      gray: "text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
      zinc: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300",
      neutral: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300",
      stone: "text-stone-600 dark:text-stone-400 hover:text-stone-500 dark:hover:text-stone-300",
    };
    return colors[color] || colors.gray;
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container max-w-screen-2xl px-4 sm:px-6">
        {/* Premium Card Footer */}
        <div className="py-12 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-xl border border-border/50 bg-gradient-to-b from-background to-muted/20 p-6 sm:p-8 md:p-12 lg:p-16 shadow-sm">
              {/* Stack Info Bar */}
              <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/30 pb-6 md:pb-8 gap-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Verified Oct 15, 2025</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Next.js 16 Beta + React 19.2 + TypeScript 5.9 + Node.js 24 LTS</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium text-foreground">Production-Tested</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="h-9 gap-2 text-muted-foreground hover:text-foreground shrink-0"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm">Back to top</span>
                </Button>
              </div>

              {/* Desktop: 5-Column Grid | Mobile: Accordion */}
              <div className="mb-8 md:mb-12">
                {/* Desktop Grid (md and up) */}
                <div className="hidden md:grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                  {footerSections.map((section) => (
                    <div key={section.id}>
                      <Link href={section.href}>
                        <h4 className={`mb-4 text-sm font-semibold transition-colors cursor-pointer ${getColorClasses(section.color)}`}>
                          {section.title}
                        </h4>
                      </Link>
                      <nav className="flex flex-col gap-3 text-sm">
                        {section.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>

                {/* Mobile Accordion (sm and down) */}
                <div className="md:hidden space-y-3">
                  {footerSections.map((section) => {
                    const isOpen = openSections.includes(section.id);
                    return (
                      <div key={section.id} className="border border-border/30 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left bg-muted/20 hover:bg-muted/30 transition-colors"
                          aria-expanded={isOpen}
                          aria-controls={`${section.id}-links`}
                          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${section.title} section`}
                        >
                          <Link
                            href={section.href}
                            onClick={(e) => e.stopPropagation()}
                            tabIndex={0}
                          >
                            <h4 className={`text-sm font-semibold transition-colors ${getColorClasses(section.color)}`}>
                              {section.title}
                            </h4>
                          </Link>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          )}
                        </button>
                        {isOpen && (
                          <nav
                            className="px-4 py-3 space-y-3 text-sm bg-background"
                            id={`${section.id}-links`}
                            role="region"
                            aria-label={`${section.title} links`}
                          >
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="block text-muted-foreground hover:text-foreground transition-colors py-1"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </nav>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pathway Quick Links Row */}
              <div className="mb-8 md:mb-12 pb-6 md:pb-8 border-b border-border/30">
                <h4 className="mb-4 text-sm font-semibold text-foreground">Integration Pathways</h4>
                <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-6 sm:gap-y-2 text-sm">
                  <Link
                    href="/software/react-to-production"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    React → Production
                  </Link>
                  <Link
                    href="/software/type-safe-stack"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Type-Safe Stack
                  </Link>
                  <Link
                    href="/software/ai-enabled-stack"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI-Enabled Stack
                  </Link>
                </nav>
              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-border/30 pt-6 md:pt-8">
                <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                  <p className="text-center sm:text-left">
                    © 2025{" "}
                    <a
                      href="https://www.supercivilization.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Supercivilization
                    </a>
                    {" "}· Built with{" "}
                    <a
                      href="https://github.com/anthropics/claude-code"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Claude Code
                    </a>
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs">
                    <Link href="/about" className="hover:text-foreground transition-colors">
                      About
                    </Link>
                    <span className="hidden sm:inline">·</span>
                    <Link href="/contact" className="hover:text-foreground transition-colors">
                      Contact
                    </Link>
                    <span className="hidden sm:inline">·</span>
                    <a
                      href="https://www.joshuaseymour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Joshua Seymour
                    </a>
                    <span className="hidden sm:inline">·</span>
                    <a
                      href="https://github.com/supercivilization/avolve.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="hidden sm:inline">·</span>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                      Privacy
                    </Link>
                    <span className="hidden sm:inline">·</span>
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                      Terms
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
