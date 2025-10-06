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
                  <span className="text-muted-foreground">Updated Oct 5, 2025</span>
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

              {/* Main Content Grid */}
              <div className="grid gap-12 md:grid-cols-4 mb-12">
                {/* Navigate Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Navigate</h4>
                  <nav className="flex flex-col gap-3 text-sm">
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      href="/solutions"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Solutions
                    </Link>
                    <Link
                      href="/systems"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Systems
                    </Link>
                    <Link
                      href="/software"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Software
                    </Link>
                    <Link
                      href="/services"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Services
                    </Link>
                    <Link
                      href="/support"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Support
                    </Link>
                  </nav>
                </div>

                {/* Tech Stack Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Tech Stack</h4>
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <a
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Next.js 15.5
                    </a>
                    <a
                      href="https://react.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      React 19.2
                    </a>
                    <a
                      href="https://www.typescriptlang.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      TypeScript 5.9
                    </a>
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Supabase
                    </a>
                    <a
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      shadcn/ui
                    </a>
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Tailwind CSS
                    </a>
                  </div>
                </div>

                {/* Resources Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
                  <nav className="flex flex-col gap-3 text-sm">
                    <a
                      href="https://nextjs.org/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </a>
                    <a
                      href="https://github.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Vercel
                    </a>
                  </nav>
                </div>

                {/* Connect Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Connect</h4>
                  <nav className="flex flex-col gap-3 text-sm">
                    <a
                      href="https://www.joshuaseymour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Joshua Seymour
                    </a>
                    <a
                      href="https://github.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jseymour/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.supercivilization.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Supercivilization
                    </a>
                  </nav>
                </div>
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
                  </p>
                  <div className="flex items-center gap-4 text-xs">
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
