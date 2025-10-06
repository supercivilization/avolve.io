"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent transition-all group-hover:from-foreground group-hover:to-foreground">
            Avolve
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/70 tracking-wide uppercase">
            <span className="inline-block w-1 h-1 rounded-full bg-emerald-500/60" />
            Oct 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            About
          </Link>
          <Link
            href="/solutions"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            Solutions
          </Link>
          <Link
            href="/systems"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            Systems
          </Link>
          <Link
            href="/software"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            Software
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            Services
          </Link>
          <Link
            href="/support"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all"
          >
            Support
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu - Simple Links */}
          <nav className="flex md:hidden items-center gap-1 mr-2">
            <Link
              href="/about"
              className="px-3 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-all"
            >
              About
            </Link>
            <Link
              href="/solutions"
              className="px-3 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md transition-all"
            >
              Solutions
            </Link>
          </nav>

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-accent/50 transition-all"
            aria-label="Search"
            disabled
          >
            <Search className="h-4 w-4 text-muted-foreground/70" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
