"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ArrowDown, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { setTheme, theme } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background - Enhanced gradients for both modes */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-50 via-gray-50 to-zinc-100 dark:from-zinc-950 dark:via-gray-950 dark:to-zinc-900 transition-colors duration-500" />

      {/* Subtle overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-zinc-100/30 to-zinc-200/40 dark:via-zinc-900/20 dark:to-zinc-800/30 transition-colors duration-500" />

      {/* Progress Bar - Enhanced visibility */}
      <div className="fixed top-0 left-0 w-full h-1 sm:h-0.5 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 dark:from-zinc-300 dark:via-zinc-200 dark:to-zinc-100 shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="flex-grow relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative inline-block animate-[fadeInDown_1s_ease-out]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avolve%20dao%20%283%29-FayiUfGfyufN6f8sxo98fvyt2BFJJE.png"
                  alt="Avolve Icon"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-6 sm:mb-8 relative z-10 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-400/30 to-zinc-600/30 dark:from-zinc-300/20 dark:to-zinc-500/20 blur-3xl" />
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-gray-800 to-zinc-700 dark:from-zinc-100 dark:via-gray-100 dark:to-zinc-200 mb-6 sm:mb-8 animate-[fadeInUp_1s_ease-out] drop-shadow-sm">
                Avolve
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4 animate-[fadeInUp_1.2s_ease-out]">
                A family office of venture builders, partners, and associates working together with Joshua Seymour to
                build, fund, and help the Supercivilization.
              </p>

              <div className="mt-16 animate-bounce">
                <ArrowDown className="w-6 h-6 mx-auto text-zinc-500 dark:text-zinc-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Joshua Seymour Card */}
              <Link href="https://www.joshuaseymour.com/" passHref legacyBehavior>
                <a
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-zinc-900/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 dark:from-stone-900 dark:via-slate-900 dark:to-stone-800 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-slate-100 to-stone-200 dark:from-stone-800 dark:via-slate-800 dark:to-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card Border */}
                  <div className="absolute inset-0 rounded-3xl border border-stone-200/50 dark:border-stone-700/50 group-hover:border-stone-300/70 dark:group-hover:border-stone-600/70 transition-colors duration-500" />

                  <div className="relative p-8 sm:p-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-joshuas-seymour-gMxuW70E55v3ZsaAZAdDA0gJTxxxyR.png"
                          alt="Joshua Seymour Icon"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-6 sm:mb-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                        />
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 via-slate-800 to-stone-800 dark:from-stone-100 dark:via-slate-100 dark:to-stone-200 mb-6 pb-1">
                        Joshua Seymour
                      </h3>

                      <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed px-2 sm:px-0">
                        I help you create your success puzzle and co-create our superpuzzle so you can prosper happily
                        forever in a world of wealth, health, and peace.
                      </p>
                    </div>
                  </div>
                </a>
              </Link>

              {/* Supercivilization Card */}
              <Link href="https://www.supercivilization.xyz/" passHref legacyBehavior>
                <a
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-zinc-900/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-gray-50 via-zinc-50 via-neutral-50 to-stone-50 dark:from-slate-900 dark:via-gray-900 dark:via-zinc-900 dark:via-neutral-900 dark:to-stone-900 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-gray-100 via-zinc-100 via-neutral-100 to-stone-100 dark:from-slate-800 dark:via-gray-800 dark:via-zinc-800 dark:via-neutral-800 dark:to-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card Border */}
                  <div className="absolute inset-0 rounded-3xl border border-zinc-200/50 dark:border-zinc-700/50 group-hover:border-zinc-300/70 dark:group-hover:border-zinc-600/70 transition-colors duration-500" />

                  <div className="relative p-8 sm:p-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-supercivilization-XCRAI0AwWn8BDcwELVnj82QmBfgcU9.png"
                          alt="Supercivilization Icon"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-6 sm:mb-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                        />
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-gray-800 via-zinc-800 via-neutral-800 to-stone-800 dark:from-slate-100 dark:via-gray-100 dark:via-zinc-100 dark:via-neutral-100 dark:to-stone-100 mb-6 pb-1">
                        Supercivilization
                      </h3>

                      <p className="text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed px-2 sm:px-0">
                        Vivify further as an individual Superachiever, unify faster as a collective of Superachievers,
                        and thrive forever in the Supercivilization ecosystem.
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 relative border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-10 w-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 hover:bg-zinc-100 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                ) : (
                  <Moon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <Link
                  href="/privacy"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  Terms & Conditions
                </Link>
                <span className="text-zinc-500 dark:text-zinc-500">© {new Date().getFullYear()} Avolve LLC</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
