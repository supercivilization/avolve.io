"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-6">
        {/* Logo */}
        <Link
          href="/"
          className="mr-10 flex items-center gap-3 group"
        >
          <span className="font-semibold text-base tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            Avolve
          </span>
          <span className="hidden lg:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Oct 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            About
          </Link>
          <Link
            href="/solutions"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            Solutions
          </Link>
          <Link
            href="/systems"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            Systems
          </Link>
          <Link
            href="/software"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            Software
          </Link>
          <Link
            href="/services"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            Services
          </Link>
          <Link
            href="/support"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          >
            Support
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-1">
            <Link
              href="/about"
              className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              About
            </Link>
            <Link
              href="/solutions"
              className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              Solutions
            </Link>
          </nav>

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-accent/50 transition-colors"
            aria-label="Search"
            disabled
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
