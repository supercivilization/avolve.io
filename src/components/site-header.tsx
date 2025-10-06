"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo with Context */}
        <Link href="/" className="mr-6 flex items-center">
          <span className="font-bold text-xl">Avolve.io</span>
          <span className="hidden lg:inline text-xs text-muted-foreground ml-3">
            Modern Web Stack · Oct 2025
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            href="/solutions"
            className="transition-colors hover:text-foreground text-foreground font-medium"
          >
            Solutions
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto py-0 text-sm font-normal text-foreground/60 hover:text-foreground/80">
                  Stack
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/software"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Software</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Frameworks & libraries
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Services</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            External platforms
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/systems"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Systems
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-foreground text-foreground font-medium"
          >
            Support
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden gap-2 mr-2">
            <Link
              href="/about"
              className="text-sm transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="/solutions"
              className="text-sm transition-colors hover:text-foreground text-foreground font-medium"
            >
              Solutions
            </Link>
          </nav>

          {/* Search Button Placeholder */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Search (coming soon)"
            disabled
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
