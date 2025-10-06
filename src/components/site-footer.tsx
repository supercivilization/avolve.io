import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container max-w-screen-2xl px-4 md:px-6">
        {/* Main Footer Content - Centered */}
        <div className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 md:gap-12 grid-cols-2 md:grid-cols-3">
              {/* Column 1: Framework & Resources */}
              <div>
                <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Navigate</h4>
                <nav className="flex flex-col gap-2.5 text-[14px]">
                  <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    About
                  </Link>
                  <Link href="/solutions" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    Solutions
                  </Link>
                  <Link href="/systems" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    Systems
                  </Link>
                  <Link href="/software" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    Software
                  </Link>
                  <Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    Services
                  </Link>
                  <Link href="/support" className="text-foreground/70 hover:text-foreground transition-colors duration-150">
                    Support
                  </Link>
                </nav>
              </div>

              {/* Column 2: External Resources */}
              <div>
                <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Resources</h4>
                <nav className="flex flex-col gap-2.5 text-[14px]">
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    Next.js Docs
                  </a>
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    shadcn/ui
                  </a>
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    Supabase
                  </a>
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    Vercel
                  </a>
                </nav>
              </div>

              {/* Column 3: Connect */}
              <div>
                <h4 className="text-[13px] font-semibold mb-3.5 text-foreground">Connect</h4>
                <nav className="flex flex-col gap-2.5 text-[14px]">
                  <a
                    href="https://www.joshuaseymour.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    Joshua Seymour
                  </a>
                  <a
                    href="https://github.com/supercivilization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jseymour/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.supercivilization.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    Supercivilization
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="border-t border-border/50 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-foreground/60">
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
            <div className="flex items-center gap-4">
              <p className="text-[12px]">Next.js 15.5 · React 19.2 · TypeScript 5.9</p>
              <span className="text-[12px]">·</span>
              <p className="text-[12px]">Updated Oct 5, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
