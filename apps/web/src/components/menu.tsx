"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/utils";

const navigation = [
  {
    name: "Solutions",
    href: "/solutions",
    description: "Ready-to-deploy AI-native solutions"
  },
  {
    name: "Systems", 
    href: "/systems",
    description: "Scalable frameworks and methodologies"
  },
  {
    name: "Services",
    href: "/services", 
    description: "Expert implementation and transformation"
  },
  {
    name: "Software",
    href: "/software",
    description: "Curated modern tech stack tools"
  },
  {
    name: "Insights",
    href: "/insights",
    description: "Interactive demonstrations and live examples",
    highlight: true
  },
  {
    name: "Support",
    href: "/support",
    description: "24/7 AI-powered assistance"
  }
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-8">
      {navigation.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative group",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground",
              item.highlight && "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {item.name}
            {item.highlight && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            )}
            
            {/* Tooltip on hover */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.description}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black" />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}