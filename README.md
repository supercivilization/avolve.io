# Avolve - Intelligence Platform with Modern Web Stack

[![Node.js](https://img.shields.io/badge/Node.js-24.8.0+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-blue.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-38B2AC.svg)](https://tailwindcss.com/)
[![Production Status](https://img.shields.io/badge/Status-Intelligence%20System%20Live-brightgreen.svg)](#current-status)

> **Real-time intelligence across 536 sources powered by 48+ production scripts. Built on the latest web technologies with Next.js 15.5, React 19, and modern tooling.**

Avolve is primarily an **operational intelligence platform** with a modern web stack foundation. We monitor and analyze data from YouTube, Reddit, GitHub, and other platforms to provide actionable insights for technical decision-making. The platform is built using the latest stable web technologies and serves as both a production intelligence system and a foundation for future AI-native development features.

## 📊 Current Status

**Last Updated:** September 30, 2025

| Component | Status | Details |
|-----------|--------|---------|
| **Intelligence System** | ✅ Production Ready | 536 sources, 48+ scripts, daily data collection |
| **Web Application** | 🚧 Foundation Layer | Modern stack implemented, core features in development |
| **Component Library** | ✅ Ready to Use | shadcn/ui + Magic UI integration complete |
| **Documentation** | 🔄 Active Cleanup | Core docs complete, legacy content being archived |

---

## ✅ What's Working Now

### Production-Ready Intelligence System

Our intelligence platform is **operational and collecting data daily**:

**🎯 Multi-Platform Monitoring**
- **536 discovered sources** across YouTube, Reddit, GitHub
- **Real-time social listening** and content monitoring
- **Automated data collection** with scheduled scripts
- **Tech stack tracking** across 26+ GitHub repositories

**📊 Research & Analysis Capabilities**
- **SEO keyword research** automation
- **Competitive analysis** tools
- **Market research** data collection
- **Content intelligence** generation
- **GitHub ecosystem mapping** and dependency tracking

**🛠️ Working Scripts** (48+ operational)
```bash
# Social listening and monitoring
pnpm social:comprehensive:test      # Test all intelligence systems
pnpm social:listen                  # Run social listening
pnpm github:intelligence            # GitHub ecosystem analysis

# Configuration and validation
pnpm monitor:config                 # Validate environment setup
pnpm env:validate                   # Check all configurations
```

**📈 Real Metrics**
- 536 sources monitored across platforms
- 26+ GitHub repositories tracked
- 48+ automation scripts in production
- Daily data collection and reporting

### Modern Web Foundation

**⚡ Latest Stable Tech Stack**
- **Node.js 24.8.0** - Native TypeScript execution (2-3x startup improvements)
- **Next.js 15.5** - Turbopack for development (2-5x faster builds)
- **React 19.1** - Server Components and React Compiler
- **TypeScript 5.9.2** - Native compilation support
- **Tailwind CSS 4.1.13** - Oxide engine (5-100x faster CSS processing)
- **Supabase** - PostgreSQL + pgvector for data storage
- **Vercel AI SDK 5.0.47** - Multi-model AI integration ready

**🎨 Component Library**
- **shadcn/ui** - Accessible, customizable components
- **Magic UI** - Advanced animations and effects
- **Radix UI** - Headless primitive components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

**🏗️ Monorepo Structure**
```
apps/
├── web/              # Next.js 15.5 web application (working)
packages/
├── @unified/ui/      # Shared component library (working)
├── @unified/lib/     # Shared utilities (working)
└── @unified/config/  # Shared configurations (working)
scripts/              # 48+ intelligence automation scripts (production)
claudedocs/           # Documentation (cleanup in progress)
```

---

## 🚧 What's In Development

These features are planned or experimental:

**🤖 AI Development Tools** (Experimental)
- AI component generation from natural language
- Automated code review and optimization
- AI-powered debugging assistance

**🔄 Automated Workflows** (In Progress)
- Continuous intelligence pipeline
- Automated report generation
- Alert system for significant changes

**📈 Intelligence Dashboard** (Planned)
- Real-time data visualization
- Trend analysis and insights
- Customizable monitoring views

**🔗 API Integration Layer** (In Progress)
- Unified interface for all intelligence sources
- Automated data normalization
- External API access for consumers

**📱 Mobile Application** (Planned)
- React Native / Expo implementation
- Cross-platform intelligence access
- Not yet started

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required versions
node --version    # v24.8.0+ required
pnpm --version    # v9.12.0+ required
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/avolve-dao/avolve.git
cd avolve

# 2. Install dependencies (uses pnpm workspaces)
pnpm install

# 3. Set up environment variables (CRITICAL - don't skip!)
cp .env.local.template .env.local

# 4. Edit .env.local with your API keys
# See "Environment Setup" section below for details

# 5. Start development server
pnpm dev
```

The web app will be available at **http://localhost:3000**

### Try the Intelligence System

```bash
# Validate your configuration
pnpm monitor:config

# Test social listening (requires API keys)
pnpm social:comprehensive:test

# Run GitHub intelligence analysis
pnpm github:intelligence

# Check environment setup
pnpm env:validate
```

---

## 🔐 Environment Setup

### Required for Intelligence System

These API keys are needed for the intelligence platform to function:

**YouTube Data API** (Get from [Google Cloud Console](https://console.cloud.google.com/))
```env
YOUTUBE_API_KEY=your-youtube-api-key-here
```

**Reddit API** (Get from [Reddit Apps](https://www.reddit.com/prefs/apps))
```env
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
REDDIT_USER_AGENT=Avolve Social Listening v1.0
```

**GitHub API** (Get from [GitHub Settings](https://github.com/settings/tokens))
```env
GITHUB_TOKEN=your-github-personal-access-token
```

### Required for Web Application

**Supabase** (Local development uses safe defaults)
```env
# For local development (safe defaults from Supabase)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional (for AI features)

```env
# AI Provider API Keys
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

**📖 See [.env.local.template](.env.local.template) for complete list and instructions**

---

## 🛠️ Available Commands

### Development

```bash
pnpm dev              # Start all apps in development mode (Turbopack)
pnpm build            # Build all apps for production
pnpm start            # Start production build
pnpm type-check       # TypeScript validation across monorepo
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
```

### Intelligence System (Production Scripts)

```bash
# Configuration & Validation
pnpm env:validate                    # Validate environment setup
pnpm monitor:config                  # Check monitoring configuration

# Social Listening
pnpm social:listen                   # Run complete social listening
pnpm social:comprehensive:test       # Test all intelligence systems

# GitHub Intelligence
pnpm github:intelligence             # Analyze GitHub ecosystem
pnpm github:intelligence:repos       # Repository analysis

# Market Research & SEO
pnpm research:intelligence           # Market research pipeline
pnpm seo:advanced                    # Advanced SEO strategy
pnpm seo:modern                      # Modern SEO opportunities
```

### Testing & Quality

```bash
pnpm test                            # Run all tests
pnpm test:watch                      # Watch mode for tests
```

### Database & Infrastructure

```bash
# Supabase (if using local instance)
supabase start                       # Start local Supabase
supabase stop                        # Stop local Supabase
supabase status                      # Check Supabase status
```

---

## 📦 Project Structure

```
avolve/
├── apps/
│   ├── web/                        # Next.js 15.5 web application
│   │   ├── src/
│   │   │   ├── app/               # App router pages
│   │   │   ├── components/        # React components
│   │   │   └── styles/            # Global styles
│   │   ├── public/                # Static assets
│   │   └── package.json
│   │
│   ├── mobile/                     # Planned (not implemented)
│   └── email/                      # React Email templates (basic setup)
│
├── packages/
│   ├── @unified/ui/               # ✅ Shared component library
│   │   ├── src/
│   │   │   ├── components/       # shadcn/ui + Magic UI components
│   │   │   └── lib/              # Utilities (cn, etc.)
│   │   └── package.json
│   │
│   ├── @unified/lib/              # ✅ Shared utilities
│   │   ├── src/
│   │   │   └── index.ts         # Shared functions
│   │   └── package.json
│   │
│   └── @unified/config/           # ✅ Shared configurations
│       ├── eslint-config/        # ESLint configs
│       ├── typescript-config/    # TypeScript configs
│       └── tailwind-config/      # Tailwind configs
│
├── scripts/                        # ✅ 48+ operational intelligence scripts
│   ├── social-listening-system.js
│   ├── github-ecosystem-mapper.js
│   ├── market-research-engine.js
│   ├── seo-strategy-engine.js
│   └── [40+ more scripts...]
│
├── claudedocs/                     # 🔄 Documentation (cleanup in progress)
│   ├── comprehensive-ai-social-listening-2025.md
│   ├── DOCUMENTATION_INDEX_A_PLUS.md
│   └── [other docs...]
│
├── .env.local.template            # Environment variable template
├── .env.example                   # Alternative env template
├── turbo.json                     # Turborepo configuration
├── pnpm-workspace.yaml            # pnpm workspace config
└── package.json                   # Root package.json
```

---

## 🎯 Tech Stack Details

### Core Framework (Production)
- **Node.js 24.8.0** - Native TypeScript support, no transpilation needed
- **Next.js 15.5.3** - App Router, Turbopack (dev), Server Components
- **React 19.1.1** - Server Components, Actions API, streaming support
- **TypeScript 5.9.2** - Native execution in Node.js 24.8.0
- **pnpm 9.12+** - Fast, disk-efficient package manager
- **Turborepo 2.5.8** - Monorepo build orchestration

### Styling & Components (Production)
- **Tailwind CSS 4.1.13** - Oxide engine for 5-100x faster builds
- **shadcn/ui** - Accessible, customizable component system
- **Magic UI** - Advanced animations and effects
- **Radix UI** - Headless component primitives
- **Framer Motion 12.23.12** - Animation library
- **Lucide React** - Icon system

### Backend & Data (Production)
- **Supabase** - PostgreSQL database + Auth + Real-time + Storage
- **pgvector** - Vector search capabilities for AI features
- **Vercel AI SDK 5.0.47** - Multi-model AI integration layer

### Intelligence Platform APIs (Production)
- **YouTube Data API v3** - Video content analysis
- **Reddit API** - Social listening and community monitoring
- **GitHub API** - Repository analysis and ecosystem mapping
- **X/Twitter API** - Social media monitoring (planned)

### Development Tools (Production)
- **ESLint 9** - Latest linting with flat config
- **Prettier 3.6.2** - Code formatting
- **TypeScript ESLint** - TypeScript-specific rules
- **Tailwind Prettier Plugin** - Automatic class sorting

---

## 📚 Documentation

### Core Documentation
- **[CHANGELOG.md](CHANGELOG.md)** - Project changelog with homepage updates
- **[SECURITY_AUDIT.md](SECURITY_AUDIT.md)** - Security audit and git history cleanup
- **[HISTORY_CLEANUP_NOTICE.md](HISTORY_CLEANUP_NOTICE.md)** - Git history rewrite notice

### Intelligence System
- **[claudedocs/comprehensive-ai-social-listening-2025.md](claudedocs/comprehensive-ai-social-listening-2025.md)** - Complete social listening system
- **[claudedocs/DOCUMENTATION_INDEX_A_PLUS.md](claudedocs/DOCUMENTATION_INDEX_A_PLUS.md)** - Main documentation index
- **[claudedocs/OPERATIONAL_PROCEDURES.md](claudedocs/OPERATIONAL_PROCEDURES.md)** - Operational procedures

### Configuration Files
- **[.env.local.template](.env.local.template)** - Environment variable template with comments
- **[turbo.json](turbo.json)** - Turborepo configuration
- **[pnpm-workspace.yaml](pnpm-workspace.yaml)** - Workspace configuration

---

## 🗺️ Roadmap

### ✅ Foundation Complete
- [x] Intelligence platform operational (536 sources, 48+ scripts)
- [x] Modern web stack implementation (Next.js 15.5, React 19)
- [x] Component library setup (shadcn/ui + Magic UI)
- [x] Monorepo structure with Turborepo
- [x] Honest project positioning and documentation

### 🎯 Next Steps (No Dependencies)
These can be worked on independently:
- [ ] Intelligence dashboard UI
- [ ] Documentation cleanup
- [ ] Component showcase page
- [ ] Enhanced error handling and logging

### 📊 Intelligence Enhancement (Depends on: Dashboard UI)
- [ ] Real-time intelligence alerts
- [ ] Automated workflow system
- [ ] Enhanced GitHub intelligence features

### 🤖 AI Development Features (Depends on: API Layer)
- [ ] API documentation generation
- [ ] Public API for external integrations
- [ ] AI component generation (experimental)
- [ ] Full AI development platform features

### 📱 Platform Expansion (Depends on: Core API + Component Library)
- [ ] Mobile application (React Native/Expo)
- [ ] Enterprise features and multi-tenancy
- [ ] Advanced analytics and reporting

---

## 🤝 Contributing

We welcome contributions! This project is building in public with transparency about what works and what's in progress.

### Getting Started

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- **Write TypeScript** - All new code should be TypeScript
- **Follow existing patterns** - Check similar components for style
- **Test your changes** - Ensure scripts work with `pnpm` commands
- **Update documentation** - Keep README and docs in sync
- **Be honest about status** - Mark experimental features clearly

### Areas We Need Help

- 📊 Intelligence dashboard UI development
- 🧪 Test coverage improvements
- 📖 Documentation cleanup and organization
- 🐛 Bug fixes and error handling
- 🎨 Component library enhancements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **GitHub**: https://github.com/avolve-dao/avolve
- **Issues**: https://github.com/avolve-dao/avolve/issues
- **Discussions**: https://github.com/avolve-dao/avolve/discussions
- **Documentation**: [claudedocs/DOCUMENTATION_INDEX_A_PLUS.md](claudedocs/DOCUMENTATION_INDEX_A_PLUS.md)

---

## 🙏 Acknowledgments

**Technology Stack:**
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [Vercel](https://vercel.com/) - Deployment and hosting platform
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Magic UI](https://magicui.design/) - Advanced UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

**Built with transparency and honesty in mind. We're building something powerful, one honest step at a time.**

---

**Last Updated:** September 30, 2025
**Project Status:** Intelligence System Production Ready ✅ | Web Foundation In Progress 🚧
