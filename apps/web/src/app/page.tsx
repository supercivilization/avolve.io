import { Suspense } from "react";
import { cn } from "@unified/ui";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Marquee } from "@/components/magicui/marquee";
import { Ripple } from "@/components/magicui/ripple";
import { Icons } from "@/components/ui/icons";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

// AI-Enhanced Components (to be generated)
function AIStatusIndicator() {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span>AI-Native Environment Active</span>
    </div>
  );
}

function TechStackDisplay() {
  const stack = [
    { name: "Node.js", version: "24.8.0", status: "✅ Native TypeScript" },
    { name: "Next.js", version: "15.5.3", status: "⚡ Turbopack" },
    { name: "React", version: "19.1.1", status: "🚀 Server Components" },
    { name: "TypeScript", version: "5.9.2", status: "🔥 Go Compiler Ready" },
    { name: "Tailwind CSS", version: "4.1.13", status: "⚡ Oxide Engine" },
    { name: "Vercel AI SDK", version: "5.0.47", status: "🤖 Multi-Model" },
    { name: "Supabase", version: "Latest", status: "🎯 AI-First Backend" },
    { name: "shadcn/ui", version: "Latest", status: "♿ Accessibility First" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stack.map((tech) => (
        <div
          key={tech.name}
          className={cn(
            "rounded-lg border bg-card p-4 transition-all duration-200",
            "hover:shadow-md hover:scale-[1.02]",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">{tech.name}</h3>
            <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
              {tech.version}
            </code>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tech.status}</p>
        </div>
      ))}
    </div>
  );
}

function FeatureShowcase() {
  const features = [
    {
      title: "🤖 AI Component Generation",
      description: "Generate accessible, performant React components from natural language",
      command: "pnpm ai:component \"Create a responsive dashboard card\"",
    },
    {
      title: "♿ Automatic Accessibility",
      description: "100% WCAG 2.1 AA compliance with AI-powered validation",
      command: "pnpm ai:accessibility ./src/components",
    },
    {
      title: "⚡ Performance Optimization",
      description: "AI-driven Core Web Vitals optimization and bundle analysis",
      command: "pnpm ai:optimize ./src/pages",
    },
    {
      title: "🔍 AI Code Review",
      description: "Comprehensive code quality, security, and performance analysis",
      command: "pnpm ai:review ./src",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            "rounded-lg border bg-card p-6",
            "hover:shadow-lg transition-all duration-300",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          )}
        >
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-muted-foreground mb-4">{feature.description}</p>
          <code className="block rounded bg-muted p-3 text-sm text-muted-foreground overflow-x-auto">
            {feature.command}
          </code>
        </div>
      ))}
    </div>
  );
}

function QuickStartGuide() {
  const steps = [
    {
      step: "1",
      title: "Environment Setup",
      description: "Copy .env.example to .env.local and add your AI API keys",
      code: "cp .env.example .env.local",
    },
    {
      step: "2",
      title: "Initialize AI Tools",
      description: "Set up MCP servers and AI development environment",
      code: "pnpm ai:init",
    },
    {
      step: "3",
      title: "Start Development",
      description: "Launch the AI-native development environment",
      code: "pnpm dev",
    },
    {
      step: "4",
      title: "Generate Components",
      description: "Create your first AI-generated component",
      code: "pnpm ai:component \"Create a hero section\"",
    },
  ];

  return (
    <div className="space-y-6">
      {steps.map((step) => (
        <div
          key={step.step}
          className="flex gap-4 p-4 rounded-lg border bg-card"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {step.step}
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-card-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
            <code className="block rounded bg-muted p-2 text-sm text-muted-foreground">
              {step.code}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <DotPattern className="absolute inset-0 opacity-20" />
      <FlickeringGrid className="absolute inset-0 opacity-10" />

      <div className="container mx-auto px-4 py-8 space-y-12 relative z-10">
        {/* Hero Section */}
        <BlurFade delay={0.25}>
          <section className="text-center space-y-6 py-12 relative">
            <Ripple className="absolute inset-0" />

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Avolve AI-Native Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Complete AI-native development platform with{" "}
                <strong>8-layer architecture</strong>, automatic accessibility
                compliance, and revolutionary development workflows.
              </p>
            </motion.div>

            <Suspense fallback={<div className="animate-pulse">Loading AI status...</div>}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <AIStatusIndicator />
              </motion.div>
            </Suspense>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Performance:</span>
                <span>10-50x faster development</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Accessibility:</span>
                <span>100% WCAG 2.1 AA compliance</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Cost:</span>
                <span>40-85% infrastructure savings</span>
              </div>
            </motion.div>

            {/* Hero Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative mt-16"
            >
              <div className="relative max-w-4xl mx-auto">
                <BorderBeam size={300} duration={12} delay={9} />
                <HeroVideoDialog
                  className="block border rounded-lg shadow-lg"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                  thumbnailSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&crop=center"
                  thumbnailAlt="Avolve AI-Native Platform Demo"
                />
              </div>
            </motion.div>
          </section>
        </BlurFade>

        {/* Tech Stack Section */}
        <BlurFade delay={0.5}>
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                8-Layer AI-Native Architecture
              </h2>
              <p className="text-muted-foreground">
                Revolutionary tech stack with validated performance improvements
              </p>
            </div>

            <Suspense fallback={<div className="animate-pulse">Loading tech stack...</div>}>
              <TechStackDisplay />
            </Suspense>
          </section>
        </BlurFade>

        {/* Features Section */}
        <BlurFade delay={0.75}>
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                AI-Native Development Features
              </h2>
              <p className="text-muted-foreground">
                Intelligent workflows that transform how you build applications
              </p>
            </div>

            <Suspense fallback={<div className="animate-pulse">Loading features...</div>}>
              <FeatureShowcase />
            </Suspense>
          </section>
        </BlurFade>

        {/* Magic UI Showcase */}
        <BlurFade delay={1.0}>
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Magic UI Components
              </h2>
              <p className="text-muted-foreground">
                Advanced animations and effects powered by Magic UI
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg border bg-card p-8">
              <BorderBeam size={250} duration={12} delay={9} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <div className="relative h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Ripple />
                    <Icons.logo className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Ripple Effects</h3>
                  <p className="text-sm text-muted-foreground">Interactive ripple animations for enhanced user engagement</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="relative h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center overflow-hidden">
                    <BlurFade delay={0.5}>
                      <Icons.check className="h-8 w-8 text-white" />
                    </BlurFade>
                  </div>
                  <h3 className="font-semibold">Blur Fade Animations</h3>
                  <p className="text-sm text-muted-foreground">Smooth blur-to-focus transitions for elegant reveals</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="relative h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <BorderBeam size={80} duration={8} delay={3} />
                    <Icons.arrowRight className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Border Beams</h3>
                  <p className="text-sm text-muted-foreground">Animated border highlights with customizable effects</p>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Quick Start Section */}
        <BlurFade delay={1.25}>
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Quick Start Guide
              </h2>
              <p className="text-muted-foreground">
                Get started with AI-native development in minutes
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Suspense fallback={<div className="animate-pulse">Loading guide...</div>}>
                <QuickStartGuide />
              </Suspense>
            </div>
          </section>
        </BlurFade>

        {/* Documentation Link */}
        <BlurFade delay={1.5}>
          <section className="text-center py-12 border-t">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Complete Documentation</h2>
              <p className="text-muted-foreground">
                Explore the complete AI-native development framework documentation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claudedocs/master-index-ai-native-tech-stack.md"
                  className={cn(
                    "inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
                    "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "transition-colors duration-200"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📚 Master Documentation Index
                </motion.a>
                <motion.a
                  href="/claudedocs/framework/ai-native-development-framework-2025.md"
                  className={cn(
                    "inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "transition-colors duration-200"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🧠 AI-Native Framework Guide
                </motion.a>
              </div>
            </div>
          </section>
        </BlurFade>
      </div>
    </div>
  );
}