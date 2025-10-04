# AI Coding Assistant Decision Framework (Sep 2025)

**Last Updated**: 2025-09-29
**Version**: 2025.09

This guide provides a comprehensive analysis and decision framework for selecting and using AI coding assistants in our modern tech stack.

## 1. Strategic Overview & Research Synthesis

**The landscape has shifted dramatically with three titans competing: Claude Code, Gemini CLI, and Codex.**

The key finding is that **successful teams are increasingly using multiple tools** rather than committing to a single solution. Our strategy is to leverage each tool's specific strengths.

- **Claude Code** (powered by **Claude Sonnet 4.5** as of Sept 29, 2025): **Industry-leading benchmarks** - 77.2% SWE-bench Verified (highest among all tools), 61.4% OSWorld, 30+ hour sustained focus. Best for production-critical code, complex architecture, security audits, and tasks requiring deep reasoning.
- **Gemini CLI**: Dominates in accessibility (free tier with 1M token context). Best for large-scale analysis, daily development, and codebase-wide refactoring.
- **Codex**: Offers unmatched flexibility (7+ hour autonomous sessions). Best for rapid prototyping, parallel task execution, and experimentation.

### The Hidden Reality of "AI-Native" Development

These tools represent different cognitive modes:
- **Claude Code** = Deep, careful thinking (Senior Architect)
- **Gemini CLI** = Broad, contextual awareness (Systems Analyst)
- **Codex** = Fast, experimental iteration (Hackathon Mode)

Our stack (Next.js 15.5, React 19.1, TypeScript 5.9.2, Tailwind v4, Expo SDK 54) is highly optimized for this AI-native development paradigm.

## 2. Simple Decision Framework

### Use **Claude Code** for:
**Production Code & Architecture**
- ✅ Final production code before deploying to Vercel
- ✅ Complex React Server Components vs Client Components decisions
- ✅ TypeScript generics and advanced type safety
- ✅ Supabase Row Level Security policies
- ✅ Multi-file refactoring that touches core business logic
- ✅ Writing comprehensive test suites
- ✅ Code reviews and security audits

**One-line rule:** *If it's going to production or affects your architecture, use Claude.*

---

### Use **Gemini CLI** for:
**Daily Development & Analysis**
- ✅ Your default for everyday coding tasks (it's free!)
- ✅ Analyzing your entire codebase at once
- ✅ UI components with Tailwind v4
- ✅ Converting Figma designs → React components
- ✅ Documentation and README updates
- ✅ Finding patterns across your monorepo
- ✅ Quick scripts and automation

**One-line rule:** *Start here for everything - it's free and handles 90% of tasks well.*

---

### Use **Codex** for:
**Speed & Experimentation**
- ✅ Rapid prototyping new features
- ✅ Generating 10 variations of a component quickly
- ✅ Parallel work (API + frontend + tests simultaneously)
- ✅ Hackathon-style fast building
- ✅ When you need it to run for hours autonomously
- ✅ Experimental features you might throw away

**One-line rule:** *When you need speed over perfection or want to explore multiple approaches.*

## 3. Daily Workflow Integration

### **Morning: Planning & Architecture**
```bash
claude-code review --architecture
# "Should this new feature use Server Components or Client Components?"
# "Review my database schema changes"
```

### **Day: Active Development**
```bash
gemini  # Default for all coding
# "Create a dashboard component with Tailwind v4"
# "Add error handling to my API routes"
# "Write tests for the user service"
```

### **When Stuck or Exploring**
```bash
codex  # Let it try multiple approaches
# "Generate 5 different ways to implement this"
# "Build this entire CRUD feature while I work on something else"
```

### **Before Committing**
```bash
claude-code review --production
# "Review this PR for security issues"
# "Optimize these TypeScript types"
```

## 4. Task-Specific Tool Selection for Our Stack

| Task | Best Tool | Why |
|------|-----------|-----|
| Next.js 15.5 App Router | **Claude** | Understands Server/Client boundary perfectly |
| React 19.1 Server Actions | **Claude** | Gets the security implications right |
| Quick React Components | **Gemini** | Free and fast enough |
| Tailwind v4 UI | **Gemini** | Can see your design + massive context |
| TypeScript 5.9 complex types | **Claude** | Best at type gymnastics |
| Basic TypeScript | **Gemini** | Good enough and free |
| Expo/React Native | **Claude** | Knows mobile-specific gotchas |
| Supabase queries | **Gemini** | Handles basic CRUD well |
| Supabase RLS policies | **Claude** | Security critical = use the best |
| API endpoints | **Gemini** | Default choice |
| API security/validation | **Claude** | Production critical |
| Test writing | **Gemini** | Good enough for most tests |
| Test strategy/TDD | **Claude** | Understands testing philosophy |
| Quick experiments | **Codex** | Built for speed |
| Bug fixing | **Gemini** | Start here (free) |
| Complex debugging | **Claude** | When Gemini can't solve it |

## 5. Dead Simple Rules & Cost Management

1.  **Start with Gemini** - it's free and good enough 80% of the time.
2.  **Upgrade to Claude** - when it's production code or you're stuck.
3.  **Use Codex** - when you want quantity/speed over quality.

**Cost-conscious approach:**
- Gemini: $0 (your daily driver)
- Claude: $20/month (use sparingly for critical stuff)
- Codex: Pay-per-use (experiments only)

This framework allows us to balance cost, quality, and speed effectively.
