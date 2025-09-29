# Avolve AI-Native Development Platform - Claude Code Configuration

## Project Overview

**Avolve AI-Native Development Platform** - Complete AI-native development platform with 8-layer architecture, automatic accessibility compliance, and revolutionary development workflows.

**Stack**: Next.js 15.5 + React 19.1 + TypeScript 5.9 + Tailwind CSS v4 + shadcn/ui Platform + Supabase AI-first

## Project Structure

```
/avolve-ai-native-platform/
├── apps/
│   ├── web/           # Next.js 15.5 web application
│   ├── mobile/        # Expo SDK 54 mobile app
│   └── email/         # React Email templates
├── packages/
│   ├── ui/            # shadcn/ui components
│   ├── lib/           # Shared utilities
│   └── config/        # Shared configuration
├── scripts/           # Intelligence & monitoring systems
├── claudedocs/        # AI-generated insights and documentation
├── config/            # System configurations
└── supabase/          # Database and backend
```

## Key Technologies & Versions

### Core Stack
- **Node.js**: 24.8.0+ (native TypeScript support)
- **Package Manager**: pnpm 9.12.0+ with workspaces
- **Build System**: Turbo 2.5+ for monorepo orchestration
- **Next.js**: 15.5.3 with Turbopack for development
- **React**: 19.1.1 with Server Components & React Compiler
- **TypeScript**: 5.9.2 with native Go-based compilation

### AI Development Framework
- **Vercel AI SDK**: 5.0.48 for multi-modal AI applications
- **MCP Integration**: Model Context Protocol for system connectivity
- **AI Decision Tracking**: Custom framework for cost optimization
- **Multi-Provider AI**: OpenAI, Anthropic, Google AI support

### Styling & Components
- **Tailwind CSS**: v4.1.13 with Oxide engine (100x faster builds)
- **shadcn/ui Platform**: Universal component distribution
- **Magic UI**: Advanced animations and premium components
- **Framer Motion**: 12.23.12 for advanced animations

### Backend & Infrastructure
- **Supabase**: AI-first backend with pgvector, Edge Functions V2
- **PostgreSQL**: 15+ with vector search and real-time capabilities
- **Vercel AI Cloud**: Global edge deployment with Fluid Compute

## Development Commands

### Primary Development
```bash
pnpm dev                    # Start all apps in development
pnpm build                  # Build all apps for production
pnpm test                   # Run all test suites
pnpm lint                   # Lint all code
pnpm type-check            # TypeScript checking across monorepo
```

### AI Decision Tracking
```bash
pnpm ai:decision:dashboard  # View AI tool usage analytics
pnpm ai:decision:analytics  # Detailed cost and effectiveness analysis
pnpm ai:decision:log       # Log AI tool decisions manually
```

### Intelligence & Monitoring
```bash
pnpm monitor:comprehensive  # Full tech stack monitoring
pnpm intelligence:pipeline  # Strategic intelligence analysis
pnpm social:all            # Social listening across platforms
pnpm research:intelligence # Market research and insights
pnpm seo:advanced          # Advanced SEO strategy generation
```

### Environment & Validation
```bash
pnpm env:validate          # Validate development environment
pnpm env:features          # Check feature availability
pnpm security:clean        # Clean hardcoded secrets
```

## AI Development Best Practices

### Tool Selection Strategy
- **Claude Code**: Architecture, production code, security reviews
- **Gemini**: Daily development, documentation, free-tier tasks
- **Codex**: Rapid prototyping, bulk generation, experimentation

### Decision Logging
Always log AI decisions for cost optimization:
```javascript
// After using any AI tool
await aiTracker.logDecision({
  tool: 'claude-code',
  task: 'component-creation',
  outcome: 'success',
  quality_score: 8,
  time_saved_minutes: 30
});
```

## Architecture Patterns

### 8-Layer AI-Native Architecture
1. **Layer 0**: Node.js 24.8.0 native TypeScript runtime
2. **Layer 1**: Next.js 15.5 Turbopack optimization
3. **Layer 2**: React 19.1 Server Components + Compiler
4. **Layer 3**: TypeScript 5.9.2 Go-based type system
5. **Layer 4**: Tailwind v4 Oxide styling engine
6. **Layer 5**: shadcn/ui Platform component distribution
7. **Layer 6**: Vercel AI Cloud edge deployment
8. **Layer 7**: Vercel AI SDK 5.0 development amplifier

### Key Features
- **Server Components**: Leverage React 19.1 for optimal performance
- **AI Integration**: Multi-provider AI access with cost tracking
- **Edge Deployment**: Global edge functions with Fluid Compute
- **Real-time Systems**: Supabase real-time subscriptions
- **Vector Search**: AI-powered search with pgvector

## Development Focus Areas

### Current Priorities
1. **AI-Native Workflows**: Maximize AI tool effectiveness
2. **Performance Optimization**: Leverage modern stack capabilities
3. **Intelligence Systems**: Market research and competitive analysis
4. **Content Generation**: SEO-optimized, AI-enhanced content
5. **Social Listening**: Comprehensive platform monitoring

### Quality Standards
- **Accessibility**: 100% WCAG 2.1 AA compliance (automated)
- **Performance**: Core Web Vitals optimization
- **Security**: No hardcoded secrets, proper environment management
- **AI Decisions**: All major AI usage tracked and optimized

## Environment Variables

### Required
```bash
NODE_ENV=development
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<supabase_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

### Optional (Enhanced Features)
```bash
# AI Providers
OPENAI_API_KEY=<your_key>
ANTHROPIC_API_KEY=<your_key>
GOOGLE_AI_API_KEY=<your_key>

# Intelligence Systems
GITHUB_TOKEN=<your_token>
YOUTUBE_API_KEY=<your_key>
REDDIT_CLIENT_ID=<your_id>
REDDIT_CLIENT_SECRET=<your_secret>

# SEO & Research
DATAFORSEO_USER=<username>
DATAFORSEO_PASSWORD=<password>
```

## Special Considerations

### AI-Enhanced Development
- This project extensively uses AI for development acceleration
- AI decision tracking is built-in for cost optimization
- Multiple AI providers supported with unified interface

### Modern Stack Optimizations
- TypeScript runs natively in Node.js 24.8.0 (no compilation needed)
- Turbopack provides 2-5x faster builds than Webpack
- Tailwind v4 Oxide engine offers 5-100x faster CSS processing

### Intelligence-First Architecture
- Built-in social listening across platforms
- Automated market research and competitive analysis
- SEO strategy generation with AI optimization
- Real-time tech stack monitoring and alerts

## Documentation

- **Main README**: Project overview and quick start
- **Development Setup**: Complete development environment guide
- **AI Decision Tracking**: Cost optimization framework
- **System Documentation**: Architecture and implementation details

---

This is a cutting-edge AI-native development platform showcasing the best of 2025 technology stack with intelligent automation, monitoring, and optimization built-in.