"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <span className="font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            Avolve
          </span>
          <span className="hidden sm:inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            365
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link href="#pricing" className="hidden sm:block">
            <ShimmerButton className="h-9 px-4 text-sm">
              Get Started
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
