# Architecture Decisions

## Stack Choices

### Why Next.js 15 + React 19?
- Server Components reduce bundle size and improve performance
- Built-in optimization with Turbopack (2-5x faster builds)
- Seamless Vercel deployment integration
- React 19 eliminates forwardRef boilerplate

### Why Vercel AI SDK over LangChain?
- Lighter weight, focused on streaming
- Better TypeScript support
- Direct integration with Vercel deployment
- Cleaner API for UI streaming

### Why Supabase over Firebase?
- PostgreSQL with full SQL support
- Built-in vector search with pgvector
- Better pricing model for AI applications
- Row Level Security for data protection

### Why Tailwind 4?
- 10x faster builds with Oxide engine
- Zero configuration needed
- Better integration with component libraries
- Smaller bundle sizes

### Why No Pre-commit Hooks?
- Adds friction to rapid development
- Can run linting/formatting on-demand
- CI/CD handles quality gates
- Focus on shipping fast iterations

## Performance Decisions

### Server-First Architecture
- Default to Server Components
- Use Client Components only when needed
- Stream AI responses for better UX
- Cache expensive operations

### Cost Optimization
- Start with smaller AI models (gpt-4o-mini)
- Implement proper rate limiting
- Use Vercel's Active CPU pricing
- Cache frequent queries

## Development Decisions

### TypeScript Strict Mode
- Catch errors at build time
- Better IDE experience
- Safer refactoring
- Required for production apps

### Testing Setup
- Vitest for fast unit tests
- React Testing Library for components
- Keep tests lightweight and focused
- Test behavior, not implementation

These decisions optimize for rapid AI application development while maintaining production quality.