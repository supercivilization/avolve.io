import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Framework */}
          <div>
            <h4 className="font-semibold mb-4">5S Framework</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                Solutions
              </Link>
              <Link href="/systems" className="text-muted-foreground hover:text-foreground transition-colors">
                Systems
              </Link>
              <Link href="/software" className="text-muted-foreground hover:text-foreground transition-colors">
                Software
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                shadcn/ui
              </a>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Next.js Docs
              </a>
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Supabase Docs
              </a>
            </nav>
          </div>

          {/* Creator */}
          <div>
            <h4 className="font-semibold mb-4">Creator</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.joshuaseymour.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Joshua Seymour
              </a>
              <a
                href="https://www.supercivilization.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Supercivilization
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
            </nav>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold mb-4">Tech Stack</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>Next.js 15.5.4</p>
              <p>React 19.2.0</p>
              <p>TypeScript 5.9.2</p>
              <p>Tailwind CSS 4.1.13</p>
              <p>shadcn/ui 3.0</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
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
            . All rights reserved.
          </p>
          <p className="text-xs">
            Last updated: October 5, 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
