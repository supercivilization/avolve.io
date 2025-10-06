import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - React Native: 0.81.3 (September 2025)
// - Expo SDK: 54 (September 10, 2025)
// - Next.js: 15.5.5 (for web sharing)
// - Nx/Turborepo: For monorepo management
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Mobile System - React Native/Expo + Next.js Monorepo | Avolve.io",
  description: "Production mobile architecture with React Native 0.81 New Architecture, Expo SDK 54, and Next.js 15 code sharing. Monorepo patterns for maximum efficiency.",
  keywords: ["React Native", "Expo", "Next.js monorepo", "mobile development", "cross-platform", "New Architecture", "Expo SDK 54", "React Native 0.81", "code sharing"]
};

export default function MobileSystemPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://avolve.io/systems/mobile#webpage",
        "url": "https://avolve.io/systems/mobile",
        "name": "Mobile System - React Native/Expo + Next.js Architecture",
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "about": {
          "@id": "https://avolve.io/systems/mobile#article"
        }
      },
      {
        "@type": "TechArticle",
        "@id": "https://avolve.io/systems/mobile#article",
        "headline": "Mobile System: React Native/Expo + Next.js Integration",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "Complete mobile development architecture using React Native 0.81 with New Architecture, Expo SDK 54, and Next.js code sharing in monorepo",
        "about": [
          { "@id": "https://avolve.io/software/nextjs#software" },
          { "@id": "https://avolve.io/software/react#software" }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://avolve.io/systems/mobile#howto-monorepo",
        "name": "How to Set Up React Native + Next.js Monorepo",
        "description": "Complete guide to building mobile apps that share code with Next.js web apps",
        "totalTime": "PT2H",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Initialize monorepo with Turborepo or Nx",
            "text": "Create monorepo structure with apps/mobile and apps/web directories sharing packages/shared code"
          },
          {
            "@type": "HowToStep",
            "name": "Set up Expo app with SDK 54",
            "text": "Initialize Expo app with New Architecture enabled, Expo Router for navigation, and TypeScript configuration"
          },
          {
            "@type": "HowToStep",
            "name": "Configure code sharing",
            "text": "Create shared packages for business logic, API clients, types, and utilities used by both web and mobile"
          },
          {
            "@type": "HowToStep",
            "name": "Deploy with EAS Build",
            "text": "Configure EAS Build for iOS and Android, set up OTA updates with EAS Update for instant deployments"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://avolve.io/systems/mobile#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Should I use React Native or build separate iOS/Android apps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use React Native when sharing code with Next.js web app (40-50% code reduction), need fast development cycles, have web development expertise, and target both iOS and Android. Build native when need maximum performance for games/AR/VR, deep platform-specific features, or have existing native codebases."
            }
          },
          {
            "@type": "Question",
            "name": "What is React Native New Architecture?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "New Architecture (enabled by default since RN 0.76) includes Fabric renderer for synchronous UI updates with React 18 concurrent rendering, and TurboModules for lazy loading with direct JSI communication. Production benchmarks show 1.3x faster renders and 5.3x faster complex flows. 75% of SDK 53+ projects use New Architecture."
            }
          },
          {
            "@type": "Question",
            "name": "How much does React Native mobile deployment cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EAS Build: Free tier (30 builds/month) to $1,999/month Enterprise (1000 builds). Average build times 8-15 min Android, 15-25 min iOS. Alternative: GitHub Actions at $0.28 per Android build vs EAS $1.00. Add Apple Developer ($99/year) and Google Play ($25 one-time)."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Systems", url: "/systems" },
        { name: "Mobile", url: "/systems/mobile" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-700">Mobile System</h1>
          <p className="text-xl text-gray-700 mb-12">
            React Native 0.81 + Expo SDK 54 + Next.js code sharing - production mobile architecture
          </p>

          {/* Quick Answer */}
          <section id="overview" className="mb-12 bg-gray-50 p-6 rounded-lg border-l-4 border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              The 2025 <strong>React Native/Expo ecosystem</strong> represents a mature, production-ready platform for extending Next.js applications to mobile with <strong>40-50% code sharing</strong> between web and native.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>React Native 0.81.3</strong> with New Architecture enabled by default (5.3x faster flows)</li>
              <li><strong>Expo SDK 54</strong> with iOS 26 support, 92% faster builds (120s → 10s)</li>
              <li><strong>3.57M+ weekly downloads</strong> powering Meta, Microsoft, Shopify, Tesla</li>
              <li><strong>40-50% code reduction</strong> sharing business logic with Next.js</li>
              <li><strong>26% of top 100 business apps</strong> built with React Native</li>
            </ul>
          </section>

          {/* Components */}
          <section id="components" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">System Components</h2>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Architecture Stack</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>React Native 0.81:</strong> New Architecture (Fabric + TurboModules), Hermes engine, React 19.1 support</li>
                <li><strong>Expo SDK 54:</strong> Managed workflow, Expo Router 6.0 with API routes, precompiled frameworks</li>
                <li><strong>Next.js 15.5:</strong> Web app sharing code via monorepo (apps/web + apps/mobile)</li>
                <li><strong>Monorepo Tool:</strong> Nx (complex) or Turborepo (simple) for shared packages</li>
                <li><strong>State Management:</strong> Zustand (versatile) or Legend State (performance)</li>
                <li><strong>Styling:</strong> NativeWind v4 (Tailwind) or Tamagui (performance)</li>
                <li><strong>Deployment:</strong> EAS Build + EAS Update for OTA updates</li>
              </ul>
            </div>
          </section>

          {/* Monorepo Setup */}
          <section id="monorepo-setup" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Monorepo Setup</h2>

            <h3 className="text-2xl font-bold mb-4">1. Initialize with Turborepo</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Create monorepo
npx create-turbo@latest my-app

# Structure:
my-app/
├── apps/
│   ├── web/          # Next.js 15.5.5
│   └── mobile/       # Expo SDK 54
├── packages/
│   ├── ui/           # Shared React components
│   ├── api-client/   # API integration
│   ├── types/        # TypeScript types
│   └── utils/        # Business logic
└── turbo.json        # Build pipeline config`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">2. Create Expo App</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`cd apps
npx create-expo-app mobile --template tabs

# Install dependencies
cd mobile
npx expo install expo-router react-native-reanimated
npm install nativewind tailwindcss

# Enable New Architecture (expo.json)
{
  "expo": {
    "newArchEnabled": true,
    "ios": { "newArchEnabled": true },
    "android": { "newArchEnabled": true }
  }
}`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">3. Shared Package Example</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`// packages/api-client/src/index.ts
export class ApiClient {
  constructor(private baseUrl: string) {}

  async getUser(id: string) {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
    return response.json();
  }
}

// apps/web/app/page.tsx (Next.js)
import { ApiClient } from '@repo/api-client';

// apps/mobile/app/index.tsx (React Native)
import { ApiClient } from '@repo/api-client';

// Same code, works on both platforms!`}
            </pre>
          </section>

          {/* Performance */}
          <section id="performance" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Performance Improvements</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="border border-border/40 px-4 py-2 text-left">Metric</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Before (RN 0.74)</th>
                    <th className="border border-border/40 px-4 py-2 text-left">After (RN 0.81)</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">iOS build time</td>
                    <td className="border border-border/40 px-4 py-2">120s</td>
                    <td className="border border-border/40 px-4 py-2">10s</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">92% faster</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Complete renders</td>
                    <td className="border border-border/40 px-4 py-2">Baseline</td>
                    <td className="border border-border/40 px-4 py-2">New Arch</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">1.3x faster</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Complex flows</td>
                    <td className="border border-border/40 px-4 py-2">Baseline</td>
                    <td className="border border-border/40 px-4 py-2">New Arch</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">5.3x faster</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Cold start</td>
                    <td className="border border-border/40 px-4 py-2">Baseline</td>
                    <td className="border border-border/40 px-4 py-2">Hermes</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">2-3x faster</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Memory usage</td>
                    <td className="border border-border/40 px-4 py-2">Baseline</td>
                    <td className="border border-border/40 px-4 py-2">Hermes</td>
                    <td className="border border-border/40 px-4 py-2 font-bold">15-25% less</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Deployment */}
          <section id="deployment" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Deployment with EAS</h2>

            <h3 className="text-2xl font-bold mb-4">EAS Build Configuration</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure builds (eas.json)
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": true }
    },
    "production": {
      "autoIncrement": true
    }
  }
}

# Build for iOS + Android
eas build --platform all`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">OTA Updates with EAS Update</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Configure updates
eas update:configure

# Publish update (no app store review needed)
eas update --branch production --message "Fix critical bug"

# Users get update on next app restart
# Average deployment: < 5 minutes vs 2-7 days for app store`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">Cost Comparison</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="border border-border/40 px-4 py-2 text-left">Tier</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Price</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Builds/Month</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Build Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Free</td>
                    <td className="border border-border/40 px-4 py-2">$0</td>
                    <td className="border border-border/40 px-4 py-2">30 builds</td>
                    <td className="border border-border/40 px-4 py-2">8-25 min</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Production</td>
                    <td className="border border-border/40 px-4 py-2">$99/mo</td>
                    <td className="border border-border/40 px-4 py-2">Unlimited</td>
                    <td className="border border-border/40 px-4 py-2">8-25 min</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2">Enterprise</td>
                    <td className="border border-border/40 px-4 py-2">$1,999/mo</td>
                    <td className="border border-border/40 px-4 py-2">1000 credits</td>
                    <td className="border border-border/40 px-4 py-2">Priority queue</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 border-l-4 border-slate-600 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2"><strong>Additional Costs:</strong></p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Apple Developer Program: <strong>$99/year</strong></li>
                <li>• Google Play Developer: <strong>$25 one-time</strong></li>
                <li>• Alternative CI/CD (GitHub Actions): <strong>$0.28 per Android build</strong> vs EAS $1.00</li>
              </ul>
            </div>
          </section>

          {/* What Breaks */}
          <section id="limitations" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What Breaks in Production</h2>

            <div className="bg-stone-50 border-l-4 border-stone-400 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-bold mb-1">Third-party library New Architecture incompatibility</h3>
                <p className="text-sm text-gray-700 mb-1">
                  Firebase core libraries, some navigation libraries, and legacy native modules don't support New Architecture.
                </p>
                <p className="text-stone-700 text-sm"><strong>Fix:</strong> Check library compatibility before upgrade. Use interop layer for legacy modules. Consider alternatives (Supabase instead of Firebase). Test thoroughly in development.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Offline support requires third-party solutions</h3>
                <p className="text-sm text-gray-700 mb-1">
                  Supabase React Native has no native offline support. Network drops lose real-time connections without recovery.
                </p>
                <p className="text-stone-700 text-sm"><strong>Fix:</strong> Integrate WatermelonDB for offline-first architecture. Use PowerSync for enterprise WAL-based sync. Implement connection recovery logic. Cache critical data locally.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Monorepo Metro bundler path resolution issues</h3>
                <p className="text-sm text-gray-700 mb-1">
                  Metro doesn't resolve workspace packages correctly in monorepo by default. Symlinks cause module not found errors.
                </p>
                <p className="text-stone-700 text-sm"><strong>Fix:</strong> Configure Metro watchFolders to include packages directory. Use metro.config.js with nodeModulesPaths. Set up proper package.json exports. Test imports thoroughly.</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">EAS Build timeout on large projects</h3>
                <p className="text-sm text-gray-700 mb-1">
                  Complex monorepos with many dependencies can exceed build time limits. iOS builds timeout after 30 minutes.
                </p>
                <p className="text-stone-700 text-sm"><strong>Fix:</strong> Use build caching with eas.json. Reduce dependency size. Optimize native modules. Consider self-hosted CI/CD for large projects. Use GitHub Actions alternative.</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Best Practices</h2>

            <div className="space-y-4">
              <div className="bg-muted/30 border-l-4 border-zinc-600 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Code Sharing Strategy</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Share business logic:</strong> API clients, data transformations, validation, utilities</li>
                  <li>• <strong>Share types:</strong> TypeScript interfaces, GraphQL types, API schemas</li>
                  <li>• <strong>Don't share UI:</strong> Keep platform-specific components separate (web vs mobile UX differs)</li>
                  <li>• <strong>40-50% code reduction:</strong> Typical sharing ratio in real projects</li>
                  <li>• <strong>Use workspace packages:</strong> @repo/api-client, @repo/types, @repo/utils</li>
                </ul>
              </div>

              <div className="bg-muted/30 border-l-4 border-slate-600 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Performance Optimization</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Enable Hermes engine:</strong> 2-3x startup improvement, 15-25% memory reduction</li>
                  <li>• <strong>Use FlashList v2:</strong> 50% better scrolling performance vs FlatList</li>
                  <li>• <strong>Lazy load screens:</strong> Use React.lazy for route-based code splitting</li>
                  <li>• <strong>Optimize images:</strong> Use expo-image with caching, proper dimensions</li>
                  <li>• <strong>Profile with New Arch Profiler:</strong> Find synchronous render bottlenecks</li>
                </ul>
              </div>

              <div className="bg-muted/30 border-l-4 border-gray-600 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Development Workflow</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Expo Dev Client:</strong> Custom development builds with any native modules</li>
                  <li>• <strong>React Native DevTools:</strong> Browser-aligned debugging with breakpoints</li>
                  <li>• <strong>EAS Update for testing:</strong> Deploy preview builds to testers instantly</li>
                  <li>• <strong>TypeScript strict mode:</strong> Catch errors at compile time</li>
                  <li>• <strong>Automated testing:</strong> Detox for E2E, Jest for unit tests</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tech Stack Decisions */}
          <section id="decisions" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Key Technology Decisions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Monorepo Tool</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">Turborepo (Simple)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Official React Native + Next.js templates</li>
                      <li>✅ Rust-based performance (40-85% faster)</li>
                      <li>✅ Simpler setup for small/medium projects</li>
                      <li>✅ Watch mode for development</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">Nx (Complex)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Superior React Native/Next.js integration</li>
                      <li>✅ Distributed task execution (50+ machines)</li>
                      <li>✅ Proven scalability (26k+ components)</li>
                      <li>✅ Enterprise features and plugins</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Styling Solution</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">NativeWind v4 (Tailwind)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Full Tailwind CSS v4 support</li>
                      <li>✅ 40% faster refresh than v2</li>
                      <li>✅ Familiar if using Tailwind on web</li>
                      <li>✅ CSS variables + container queries</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">Tamagui (Performance)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Within 10% of vanilla RN performance</li>
                      <li>✅ Optimizing compiler</li>
                      <li>✅ Best for animation-heavy apps</li>
                      <li>✅ Built-in design system</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">State Management</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">Zustand 4.5 (Versatile)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ 46.7% usage rate, proven choice</li>
                      <li>✅ 4KB bundle size, minimal overhead</li>
                      <li>✅ Excellent TypeScript support</li>
                      <li>✅ 160ms initial render times</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold mb-2">Legend State 3.0 (Performance)</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Proxy-based reactivity</li>
                      <li>✅ 140ms initial renders, 20ms updates</li>
                      <li>✅ Best performance benchmarks</li>
                      <li>✅ Built-in persistence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Relationships */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Mobile System Relates to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Built with <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> React Native, Expo, Next.js, TypeScript in monorepo</li>
              <li>• <strong>Extends <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> Brings web solutions to iOS/Android with native performance</li>
              <li>• <strong>Uses <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> EAS Build ($0-1,999/mo), Supabase mobile SDKs, Apple/Google app stores</li>
              <li>• <strong>Requires <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Monitor crash rates, track performance, manage app store releases</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/systems" className="text-gray-600 hover:underline">
              ← Back to Systems
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
