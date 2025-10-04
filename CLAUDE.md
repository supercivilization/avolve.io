# Claude Code Project Guide: Avolve Intelligence Platform

**Last Updated**: September 30, 2025
**Project Type**: Intelligence Platform + Modern Web Foundation
**Status**: Intelligence System Production Ready, Web App Foundation Layer

## 🚨 **MANDATORY WORKFLOW RULES**

**THESE RULES OVERRIDE ALL OTHER INSTRUCTIONS. FOLLOW EXACTLY.**

### **Development Workflow Process**

1. **THINK FIRST**: Before any code changes, read the codebase for relevant files and understand the problem completely
2. **PLAN IN WRITING**: Create a plan in `tasks/todo.md` with specific, checkable todo items
3. **GET APPROVAL**: Share the plan and wait for verification before starting work
4. **EXECUTE & TRACK**: Work through todo items one by one, marking each complete as you finish
5. **EXPLAIN CONCISELY**: For each change, provide only high-level summaries - what changed, not how or why
6. **SIMPLICITY FIRST**: Every change must be as simple as possible, impact minimal code, avoid complexity
7. **REVIEW & DOCUMENT**: Add a review section to `tasks/todo.md` summarizing all changes and relevant info
8. **NO LAZINESS TOLERATED**: Never use temporary fixes, always find root causes, you are a senior developer

### **Core Philosophy**

- **Root Cause Analysis**: When bugs occur, debug deeply until you find the actual problem
- **No Shortcuts**: No TODO comments, no "fix later", no workarounds - fix it right the first time
- **Minimal Impact**: Change as few files as possible, keep modifications surgical and focused
- **Senior-Level Thinking**: Approach every problem with the mindset of an experienced developer

## 1. Project Overview

**What Avolve Actually Is:**
- **Primary**: Operational intelligence platform with 40+ production scripts
- **Secondary**: Modern web application foundation (Next.js 15.5 + React 19)
- **Reality**: Intelligence system works, web app is experimental/foundational

**Core Capabilities:**
- Multi-platform social listening (YouTube, Reddit, GitHub, X/Twitter)
- GitHub ecosystem monitoring (26+ repositories across 4 priority tiers)
- Market research and SEO automation
- Real-time data collection and reporting
- Modern component library (Magic UI + shadcn/ui patterns)

## 2. Tech Stack (Verified Reality)

**Production Stack:**
- Next.js 15.5.4 with Turbopack
- React 19.1.1 with Server Components
- TypeScript 5.9.2 (native Node.js execution)
- Tailwind CSS 4.1.13 (Oxide engine)
- Node.js 24.8.0+
- pnpm 9.12+ workspaces
- Turborepo 2.5.8

**Intelligence APIs:**
- YouTube Data API v3
- Reddit API (OAuth)
- GitHub REST API
- X/Twitter API (monitoring)

**Database:**
- Supabase (configured but minimal integration)
- PostgreSQL with pgvector

**AI SDKs** (used in intelligence scripts only):
- Vercel AI SDK 5.0.47
- @ai-sdk/anthropic, @ai-sdk/openai, @ai-sdk/google

## 3. What Works vs What Doesn't

### ✅ Working (Use These Confidently)

**Intelligence System:**
```bash
pnpm social:comprehensive:test    # Multi-platform monitoring
pnpm github:intelligence          # GitHub analysis
pnpm monitor:comprehensive        # Tech stack monitoring
pnpm seo:advanced                 # SEO research
pnpm env:validate                 # Environment validation
```

**Development:**
```bash
pnpm dev                          # Start web app
pnpm build                        # Build for production
pnpm type-check                   # TypeScript validation
```

### ❌ Don't Use (Not Implemented)

**These commands were removed (files don't exist):**
```bash
pnpm ai:interface      # REMOVED - ai-interface-generator.js doesn't exist
pnpm ai:review         # REMOVED - ai-code-reviewer.js doesn't exist
pnpm ai:optimize       # REMOVED - ai-performance-optimizer.js doesn't exist
pnpm ai:accessibility  # REMOVED - ai-accessibility-auditor.js doesn't exist
```

**Mobile app:**
- apps/mobile/ has been removed (was placeholder only)
- No mobile functionality exists
- Not on current roadmap

## 4. Directory Structure (Reality)

```
avolve/
├── apps/
│   ├── web/          # Next.js app (foundation layer, minimal pages)
│   └── email/        # React Email templates
├── packages/
│   ├── @unified/ui/      # Utilities only (not a component library)
│   ├── @unified/lib/     # Shared utilities
│   └── @unified/config/  # Shared configs
├── scripts/          # 41 intelligence automation scripts (THIS IS THE PRODUCT)
├── claudedocs/       # Documentation (needs cleanup)
└── supabase/         # Database config
```

## 5. Development Guidelines

**When Working on Intelligence Scripts:**
- These are production-ready, well-tested
- Use existing patterns from comprehensive-*.js files
- Real API integrations with proper error handling
- Generate reports in /reports/ and /dashboard/

**When Working on Web App:**
- This is foundational/experimental
- Use Server Components by default
- Keep components in apps/web/src/components/
- Magic UI components are imported, not custom-built

**Don't Promise Features That Don't Exist:**
- No "AI component generation" claims
- No "automatic accessibility" claims
- No "8-layer architecture" references
- Be honest about what's working vs planned

## 6. Current Project Status

**Intelligence Platform**: ✅ Production Ready
- 536 sources monitored
- 41 operational scripts
- Daily data collection
- Automated reporting

**Web Application**: 🚧 Foundation Layer
- Modern stack implemented
- Minimal application code
- Experimental features
- No production deployment

**Mobile**: ❌ Removed
- Was placeholder only with zero code
- Removed to reduce confusion

## 7. Roadmap (Dependency-Based, No Timelines)

**Foundation Complete** ✅
- Modern tech stack
- Intelligence scripts
- Data collection

**Next Logical Steps** (no dependencies):
- Intelligence dashboard UI
- API documentation
- Component showcase page

**Then** (depends on: Dashboard):
- Enhanced visualizations
- Real-time updates
- User authentication

**Future** (depends on: API Layer):
- AI component generation (experimental)
- Automated workflows
- Mobile app development

## 8. AI Assistant Guidelines

**When suggesting changes:**
- Verify the feature actually exists before recommending it
- Check if commands work before suggesting them
- Don't reference removed AI development features
- Lead with intelligence platform capabilities

**When debugging:**
- Intelligence scripts are well-tested, check API keys first
- Web app is minimal, many features aren't implemented yet
- Mobile app was removed, don't reference it

**When documenting:**
- Be honest about current state
- Mark planned features clearly as planned
- Use working examples only
- Remove aspirational language

## 9. Key Files to Understand

**Intelligence System:**
- scripts/comprehensive-social-listening.js (600+ lines, multi-platform)
- scripts/comprehensive-github-intelligence.js (1000+ lines, ecosystem analysis)
- scripts/comprehensive-tech-stack-monitor.js (800+ lines, framework tracking)

**Web App:**
- apps/web/src/app/page.tsx (honest homepage)
- apps/web/src/app/layout.tsx (root layout)
- apps/web/src/components/ (Magic UI imports)

**Configuration:**
- package.json (root) - intelligence-focused scripts
- .env.local.template - required API keys documented
- turbo.json - monorepo task orchestration

## 10. Common Pitfalls

❌ **Don't assume AI features work** - Most were removed
❌ **Don't reference mobile app** - It was removed
❌ **Don't claim automatic accessibility** - It's not automated
❌ **Don't promise 10-50x improvements** - Metrics aren't verified
❌ **Don't use "8-layer architecture"** - It was marketing language

✅ **Do emphasize intelligence platform** - This actually works
✅ **Do use working commands** - See section 3 above
✅ **Do be transparent** - Honesty is the new positioning
✅ **Do focus on real data** - 536 sources, 41 scripts, etc.

---

This project guide reflects the reality of September 30, 2025. Intelligence platform is production-ready. Web app is foundational. Be honest, and build on real strengths.
