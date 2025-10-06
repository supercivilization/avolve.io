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
      <div className="container max-w-screen-2xl px-4 md:px-6">
        {/* Premium Card Footer */}
        <div className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-lg border border-border/50 bg-gradient-to-b from-background to-muted/20 p-8 md:p-12 shadow-sm">
              {/* Status Bar */}
              <div className="mb-8 flex items-center justify-between border-b border-border/30 pb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-foreground">All Systems Operational</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground/70">Updated Oct 5, 2025</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Back to top</span>
                </Button>
              </div>

              {/* Main Content Grid */}
              <div className="grid gap-8 md:grid-cols-4 mb-8">
                {/* Navigate Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Navigate</h4>
                  <nav className="flex flex-col gap-2.5 text-sm">
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      About
                    </Link>
                    <Link
                      href="/solutions"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Solutions
                    </Link>
                    <Link
                      href="/systems"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Systems
                    </Link>
                    <Link
                      href="/software"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Software
                    </Link>
                    <Link
                      href="/services"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Services
                    </Link>
                    <Link
                      href="/support"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Support
                    </Link>
                  </nav>
                </div>

                {/* Tech Stack Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Tech Stack</h4>
                  <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                    <a
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      Next.js 15.5
                    </a>
                    <a
                      href="https://react.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      React 19.2
                    </a>
                    <a
                      href="https://www.typescriptlang.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      TypeScript 5.9
                    </a>
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      Supabase
                    </a>
                    <a
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      shadcn/ui
                    </a>
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      Tailwind CSS
                    </a>
                  </div>
                </div>

                {/* Resources Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
                  <nav className="flex flex-col gap-2.5 text-sm">
                    <a
                      href="https://nextjs.org/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Documentation
                    </a>
                    <a
                      href="https://github.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Vercel
                    </a>
                  </nav>
                </div>

                {/* Connect Column */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-foreground">Connect</h4>
                  <nav className="flex flex-col gap-2.5 text-sm">
                    <a
                      href="https://www.joshuaseymour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Joshua Seymour
                    </a>
                    <a
                      href="https://github.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jseymour/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.supercivilization.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      Supercivilization
                    </a>
                  </nav>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-border/30 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground/70">
                  <p>
                    © 2025{" "}
                    <a
                      href="https://www.supercivilization.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors duration-150"
                    >
                      Supercivilization
                    </a>
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <Link href="/privacy" className="hover:text-foreground transition-colors duration-150">
                      Privacy
                    </Link>
                    <span>·</span>
                    <Link href="/terms" className="hover:text-foreground transition-colors duration-150">
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
