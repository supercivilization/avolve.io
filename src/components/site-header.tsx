"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions" },
    { href: "/systems", label: "Systems" },
    { href: "/software", label: "Software" },
    { href: "/services", label: "Services" },
    { href: "/support", label: "Support" },
  ];

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && firstMenuLinkRef.current) {
      firstMenuLinkRef.current.focus();
    }
  }, [mobileMenuOpen]);

  // Keyboard navigation: close menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <header className="w-full border-b border-border/50 bg-background">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 md:mr-10 flex items-center gap-3 group"
        >
          <span className="font-semibold text-base tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            Avolve
          </span>
          <span className="hidden lg:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            Oct 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-md hover:bg-accent/50 transition-colors"
                  aria-label="Search (coming soon)"
                  disabled
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search coming soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden rounded-md hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <nav className="container max-w-screen-2xl px-4 py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  ref={index === 0 ? firstMenuLinkRef : null}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
