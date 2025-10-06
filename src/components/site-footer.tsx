import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12 md:py-16 max-w-screen-2xl px-4 md:px-6">
        <div className="grid gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Framework */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">5S Framework</h4>
            <nav className="flex flex-col gap-2.5 text-[14px]">
              <Link href="/solutions" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                Solutions
              </Link>
              <Link href="/systems" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                Systems
              </Link>
              <Link href="/software" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                Software
              </Link>
              <Link href="/services" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                Services
              </Link>
              <Link href="/support" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                Support
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Resources</h4>
            <nav className="flex flex-col gap-2.5 text-[14px]">
              <Link href="/about" className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150">
                About
              </Link>
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                shadcn/ui
              </a>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                Next.js Docs
              </a>
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                Supabase Docs
              </a>
            </nav>
          </div>

          {/* Creator */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Creator</h4>
            <nav className="flex flex-col gap-2.5 text-[14px]">
              <a
                href="https://www.joshuaseymour.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                Joshua Seymour
              </a>
              <a
                href="https://www.supercivilization.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                Supercivilization
              </a>
              <a
                href="https://github.com/supercivilization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jseymour/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-150"
              >
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Tech Stack</h4>
            <div className="flex flex-col gap-2.5 text-[14px] text-foreground/70">
              <p>Next.js 15.5.4</p>
              <p>React 19.2.0</p>
              <p>TypeScript 5.9.2</p>
              <p>Tailwind CSS 4.1.13</p>
              <p>shadcn/ui 3.0</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-foreground/60">
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
            . All rights reserved.
          </p>
          <p className="text-[12px]">
            Last updated: October 5, 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
