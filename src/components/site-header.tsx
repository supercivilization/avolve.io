import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SolutionsIconSimple,
  SystemsIconSimple,
  SoftwareIconSimple,
  ServicesIconSimple,
  SupportIconSimple,
} from "@/components/icons/sacred-geometry";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl hover:opacity-80 transition-opacity">
          Avolve.io
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ButtonGroup>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/solutions" className="flex items-center gap-2">
                <SolutionsIconSimple className="text-slate-600 dark:text-slate-400" size={16} />
                <span>Solutions</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/systems" className="flex items-center gap-2">
                <SystemsIconSimple className="text-gray-600 dark:text-gray-400" size={16} />
                <span>Systems</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/software" className="flex items-center gap-2">
                <SoftwareIconSimple className="text-zinc-700 dark:text-zinc-400" size={16} />
                <span>Software</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/services" className="flex items-center gap-2">
                <ServicesIconSimple className="text-neutral-600 dark:text-neutral-400" size={16} />
                <span>Services</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/support" className="flex items-center gap-2">
                <SupportIconSimple className="text-stone-600 dark:text-stone-400" size={16} />
                <span>Support</span>
              </Link>
            </Button>
          </ButtonGroup>
        </nav>

        {/* Mobile Navigation - Simple for now */}
        <nav className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/solutions">Solutions</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/support">Support</Link>
          </Button>
        </nav>

        {/* Theme Toggle */}
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
