import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Rocket, Network, Code, Cloud, LifeBuoy } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
          Avolve.io
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ButtonGroup>
            <Button variant="ghost" asChild>
              <Link href="/solutions" className="flex items-center gap-2 hover:bg-accent transition-colors">
                <Rocket className="text-slate-600 dark:text-slate-400" size={18} strokeWidth={2} />
                <span className="font-medium">Solutions</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/systems" className="flex items-center gap-2 hover:bg-accent transition-colors">
                <Network className="text-gray-600 dark:text-gray-400" size={18} strokeWidth={2} />
                <span className="font-medium">Systems</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/software" className="flex items-center gap-2 hover:bg-accent transition-colors">
                <Code className="text-zinc-700 dark:text-zinc-400" size={18} strokeWidth={2} />
                <span className="font-medium">Software</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services" className="flex items-center gap-2 hover:bg-accent transition-colors">
                <Cloud className="text-neutral-600 dark:text-neutral-400" size={18} strokeWidth={2} />
                <span className="font-medium">Services</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/support" className="flex items-center gap-2 hover:bg-accent transition-colors">
                <LifeBuoy className="text-stone-600 dark:text-stone-400" size={18} strokeWidth={2} />
                <span className="font-medium">Support</span>
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
