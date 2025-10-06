"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="w-full border-b border-border/50 bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="mr-8 flex items-center gap-2.5 group"
        >
          <span className="font-semibold text-[15px] tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            Avolve
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/60 tracking-wide uppercase">
            <span className="inline-block w-1 h-1 rounded-full bg-emerald-500" />
            Oct 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/about"
            className="px-3 py-1.5 text-[14px] font-medium text-foreground/70 hover:text-foreground hover:bg-accent/80 rounded-md transition-colors duration-150"
          >
            About
          </Link>
          <Link
            href="/solutions"
            className="px-3 py-1.5 text-[14px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-150"
          >
            Solutions
          </Link>
          <Link
            href="/systems"
            className="px-3 py-1.5 text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-150"
          >
            Systems
          </Link>
          <Link
            href="/software"
            className="px-3 py-1.5 text-[14px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors duration-150"
          >
            Software
          </Link>
          <Link
            href="/services"
            className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors duration-150"
          >
            Services
          </Link>
          <Link
            href="/support"
            className="px-3 py-1.5 text-[14px] font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors duration-150"
          >
            Support
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-0.5 mr-1">
            <Link
              href="/about"
              className="px-2.5 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-accent/80 rounded-md transition-colors duration-150"
            >
              About
            </Link>
            <Link
              href="/solutions"
              className="px-2.5 py-1.5 text-[13px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-150"
            >
              Solutions
            </Link>
          </nav>

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md hover:bg-accent/80 transition-colors duration-150"
            aria-label="Search"
            disabled
          >
            <Search className="h-[15px] w-[15px] text-muted-foreground/70" />
          </Button>

          {/* Theme Toggle */}
          <div className="h-8 flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
