import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 font-bold text-xl"
        >
          Avolve
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link
            href="/solutions"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Solutions
          </Link>
          <Link
            href="/systems"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Systems
          </Link>
          <Link
            href="/software"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Software
          </Link>
          <Link
            href="/services"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Services
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Support
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden gap-2">
            <Link
              href="/solutions"
              className="text-sm transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Solutions
            </Link>
            <Link
              href="/about"
              className="text-sm transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
