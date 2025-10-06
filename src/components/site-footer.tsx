"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container max-w-screen-2xl px-6">
        {/* Premium Card Footer */}
        <div className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-xl border border-border/50 bg-gradient-to-b from-background to-muted/20 p-12 md:p-16 shadow-sm">
              {/* Status Bar */}
              <div className="mb-12 flex items-center justify-between border-b border-border/30 pb-8">
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-zinc-400 animate-pulse" />
                  <span className="font-semibold text-foreground">All Systems Operational</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground">Updated Oct 6, 2025</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="h-9 gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Back to top</span>
                </Button>
              </div>

              {/* 5S Framework Navigation - 5 Equal Columns */}
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5 mb-12">
                {/* Solutions Column - Slate */}
                <div>
                  <Link href="/solutions">
                    <h4 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer">
                      Solutions
                    </h4>
                  </Link>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/solutions#ai-customer-support"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      AI Customer Support
                    </Link>
                    <Link
                      href="/solutions#ai-chat-app"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      AI Chat Application
                    </Link>
                    <span className="text-muted-foreground/40 text-xs italic">
                      Complete examples
                    </span>
                  </nav>
                </div>

                {/* Systems Column - Gray */}
                <div>
                  <Link href="/systems">
                    <h4 className="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer">
                      Systems
                    </h4>
                  </Link>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/systems#auth-system"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Authentication
                    </Link>
                    <Link
                      href="/systems/search"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Search (pgvector)
                    </Link>
                    <Link
                      href="/systems/email"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Email (Resend)
                    </Link>
                    <Link
                      href="/systems/mobile"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Mobile (PWA)
                    </Link>
                    <Link
                      href="/systems/social"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Social Login
                    </Link>
                  </nav>
                </div>

                {/* Software Column - Zinc */}
                <div>
                  <Link href="/software">
                    <h4 className="mb-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer">
                      Software
                    </h4>
                  </Link>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/software/nodejs"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Node.js 22/24
                    </Link>
                    <Link
                      href="/software/typescript"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      TypeScript 5.9
                    </Link>
                    <Link
                      href="/software/react"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      React 19.2
                    </Link>
                    <Link
                      href="/software/nextjs"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Next.js 15.5
                    </Link>
                    <Link
                      href="/software/tailwind"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Tailwind 4.1
                    </Link>
                    <Link
                      href="/software/shadcn-ui"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      shadcn/ui 3.4
                    </Link>
                    <Link
                      href="/software/vercel-ai-sdk"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Vercel AI SDK 5.0
                    </Link>
                    <Link
                      href="/software/supabase"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Supabase (PG 15.8)
                    </Link>
                  </nav>
                </div>

                {/* Services Column - Neutral */}
                <div>
                  <Link href="/services">
                    <h4 className="mb-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors cursor-pointer">
                      Services
                    </h4>
                  </Link>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/services#vercel"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Vercel (Hosting)
                    </Link>
                    <Link
                      href="/services#supabase"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Supabase (Database)
                    </Link>
                    <Link
                      href="/services#claude-api"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Claude API (AI)
                    </Link>
                    <Link
                      href="/services#resend"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Resend (Email)
                    </Link>
                    <Link
                      href="/services#stripe"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Stripe (Payments)
                    </Link>
                    <Link
                      href="/services/dataforseo"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      DataForSEO (SEO API)
                    </Link>
                  </nav>
                </div>

                {/* Support Column - Stone */}
                <div>
                  <Link href="/support">
                    <h4 className="mb-4 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-500 dark:hover:text-stone-300 transition-colors cursor-pointer">
                      Support
                    </h4>
                  </Link>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/support#auth-loops"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Auth Loop Fixes
                    </Link>
                    <Link
                      href="/support#slow-queries"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Slow Database Queries
                    </Link>
                    <Link
                      href="/support#build-failures"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Build Failures
                    </Link>
                    <Link
                      href="/support#rate-limits"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      API Rate Limits
                    </Link>
                    <Link
                      href="/support#ai-coding-tools"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      AI Coding Tools
                    </Link>
                    <span className="text-muted-foreground/40 text-xs italic">
                      Production debugging
                    </span>
                  </nav>
                </div>
              </div>

              {/* Pathway Quick Links Row */}
              <div className="mb-12 pb-8 border-b border-border/30">
                <h4 className="mb-4 text-sm font-semibold text-foreground">Integration Pathways</h4>
                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </nav>
              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-border/30 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                  <p>
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
                  <div className="flex items-center gap-4 text-xs">
                    <a
                      href="https://www.joshuaseymour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Joshua Seymour
                    </a>
                    <span>·</span>
                    <a
                      href="https://github.com/supercivilization/avolve.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                    <span>·</span>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                      Privacy
                    </Link>
                    <span>·</span>
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
