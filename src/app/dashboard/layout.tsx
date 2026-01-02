"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/lib/subscription";
import { TierBadge } from "@/components/feature-gate";
import {
  BookOpen,
  Wrench,
  Boxes,
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

// 4T Navigation Structure
const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Training",
    href: "/dashboard/training",
    icon: BookOpen,
    description: "The Map - Learn the theory",
    badge: "4T",
  },
  {
    name: "Techniques",
    href: "/dashboard/techniques",
    icon: Wrench,
    description: "The Method - Master the how",
    badge: "4T",
  },
  {
    name: "Tools",
    href: "/dashboard/tools",
    icon: Boxes,
    description: "The Lever - Multiply your effort",
    badge: "4T",
  },
  {
    name: "Connect",
    href: "/dashboard/connect",
    icon: Users,
    description: "The Artist - Human expertise",
    badge: "4T",
  },
];

const bottomNavigation = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { tier, isLoading } = useSubscription();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background">
        {/* Logo & Tier */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="text-xl font-bold">
            Avolve
          </Link>
          {!isLoading && <TierBadge tier={tier} />}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {item.name}
                      {item.badge && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 opacity-0 transition-opacity",
                      isActive && "opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Bottom Navigation */}
          <div className="space-y-1">
            {bottomNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-border p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  );
}
