# @unified/lib

Shared utilities and AI tools with MCP integration for the Avolve platform.

## 🚀 Quick Start

```bash
# Install in your app
pnpm add @unified/lib

# Install peer dependencies for AI features
pnpm add ai @ai-sdk/openai @ai-sdk/anthropic
```

## 🧩 Package Contents

### AI Tools & Utilities
- **MCP Integration** - Model Context Protocol tools
- **AI Component Generation** - Natural language to React components
- **Multi-Provider AI** - OpenAI, Anthropic, Google model access
- **Streaming Responses** - Real-time AI interaction
- **Tool Orchestration** - AI agent coordination

### Core Utilities
- **Type Utilities** - TypeScript helper types
- **Validation Schemas** - Zod schema definitions
- **API Helpers** - Request/response utilities
- **Error Handling** - Centralized error management
- **Logger** - Structured logging utilities

### Database & Backend
- **Supabase Utilities** - Database query helpers
- **Authentication** - Auth state management
- **Real-time** - WebSocket utilities
- **Storage** - File upload/download helpers

## 🏗️ Architecture

```
src/
├── ai/                   # AI tools and utilities
│   ├── providers/       # AI provider configurations
│   ├── tools/           # MCP-generated tools
│   ├── components/      # AI component generation
│   └── agents/          # AI agent orchestration
├── utils/               # Core utilities
│   ├── types.ts        # TypeScript utilities
│   ├── validation.ts   # Zod schemas
│   ├── api.ts          # API helpers
│   └── logger.ts       # Logging utilities
├── database/            # Database utilities
│   ├── supabase.ts     # Supabase client
│   ├── queries.ts      # Query helpers
│   └── types.ts        # Database types
└── index.ts            # Package exports
```

## 🤖 AI Integration

### Multi-Provider Configuration
```typescript
import { createAI } from '@unified/lib/ai';

const ai = createAI({
  providers: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o'
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-3-5-sonnet-20241022'
    },
    google: {
      apiKey: process.env.GOOGLE_AI_API_KEY,
      model: 'gemini-2.0-flash-exp'
    }
  },
  defaultProvider: 'openai'
});
```

### AI Component Generation
```typescript
import { generateComponent } from '@unified/lib/ai/components';

// Generate React component from natural language
const component = await generateComponent(
  "responsive pricing card with three tiers",
  {
    framework: 'react',
    styling: 'tailwind',
    accessibility: true,
    typescript: true
  }
);

// Returns:
// - Component code (TypeScript/JSX)
// - Prop types and interfaces
// - Storybook stories
// - Unit tests
// - Documentation
```

### MCP Tool Integration
```typescript
import { mcpTools } from '@unified/lib/ai/tools';

// Auto-generated tools from MCP servers
const tools = await mcpTools.initialize([
  'supabase',
  'github',
  'stripe',
  'shadcn-ui'
]);

// Use tools in AI workflows
const result = await ai.generate({
  prompt: "Create a user dashboard with data from Supabase",
  tools: [tools.supabase.query, tools.shadcn.components]
});
```

### AI Agent Orchestration
```typescript
import { createAgent, orchestrator } from '@unified/lib/ai/agents';

// Define specialized agents
const codeAgent = createAgent({
  name: 'code-generator',
  model: 'claude-3-5-sonnet-20241022',
  tools: [tools.github, tools.shadcn],
  systemPrompt: 'You are an expert React developer...'
});

const dataAgent = createAgent({
  name: 'data-manager', 
  model: 'gpt-4o',
  tools: [tools.supabase, tools.stripe],
  systemPrompt: 'You are a database expert...'
});

// Orchestrate multi-agent workflows
const dashboard = await orchestrator.execute({
  task: 'Build a complete user dashboard',
  agents: [codeAgent, dataAgent],
  coordination: 'parallel'
});
```

## 🛠️ Core Utilities

### Type Utilities
```typescript
import { AsyncReturnType, DeepPartial, RequiredKeys } from '@unified/lib/utils';

// Extract return type from async function
type UserData = AsyncReturnType<typeof fetchUser>;

// Make all properties optional recursively
type PartialConfig = DeepPartial<DatabaseConfig>;

// Extract required keys from type
type RequiredUserFields = RequiredKeys<User>;
```

### Validation Schemas
```typescript
import { z } from 'zod';
import { createValidatedHandler } from '@unified/lib/utils';

// Shared validation schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  createdAt: z.date()
});

// Create type-safe API handlers
const updateUser = createValidatedHandler({
  input: userSchema.partial(),
  handler: async (data) => {
    // data is automatically typed and validated
    return await database.user.update(data);
  }
});
```

### API Utilities
```typescript
import { createAPIClient, handleAPIError } from '@unified/lib/utils';

// Type-safe API client
const api = createAPIClient({
  baseURL: process.env.API_URL,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Centralized error handling
export async function apiCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    return handleAPIError(error);
  }
}
```

### Structured Logging
```typescript
import { logger } from '@unified/lib/utils';

// Structured logging with context
logger.info('User registration started', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
  userAgent: request.headers['user-agent']
});

// Error logging with stack traces
logger.error('Database connection failed', {
  error: error.message,
  stack: error.stack,
  query: failedQuery,
  duration: executionTime
});
```

## 🗄️ Database Integration

### Supabase Utilities
```typescript
import { createSupabaseClient, queryBuilder } from '@unified/lib/database';

// Type-safe Supabase client
const supabase = createSupabaseClient({
  url: process.env.SUPABASE_URL!,
  anonKey: process.env.SUPABASE_ANON_KEY!
});

// Query builder with TypeScript support
const users = await queryBuilder(supabase)
  .from('users')
  .select('id, name, email')
  .where('status', 'active')
  .orderBy('created_at', 'desc')
  .limit(10)
  .execute();
```

### Real-time Subscriptions
```typescript
import { createRealtimeSubscription } from '@unified/lib/database';

// Type-safe real-time subscriptions
const subscription = createRealtimeSubscription({
  table: 'messages',
  event: 'INSERT',
  filter: `room_id=eq.${roomId}`,
  callback: (payload) => {
    // payload is fully typed
    console.log('New message:', payload.new);
  }
});
```

### Database Migrations
```typescript
import { runMigrations, createMigration } from '@unified/lib/database';

// Create new migration
const migration = createMigration({
  name: 'add_ai_features_table',
  up: `
    CREATE TABLE ai_features (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      enabled BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  down: `DROP TABLE ai_features;`
});

// Run migrations
await runMigrations();
```

## 🔐 Authentication Utilities

### Auth State Management
```typescript
import { createAuthManager } from '@unified/lib/auth';

const auth = createAuthManager({
  supabase,
  redirectTo: '/dashboard',
  sessionRefresh: true
});

// Type-safe auth methods
const user = await auth.signIn({
  email: 'user@example.com',
  password: 'password'
});

// Auth state hooks for React
export const useAuth = () => {
  return auth.useAuthState();
};
```

### Role-Based Access Control
```typescript
import { createRBACManager } from '@unified/lib/auth';

const rbac = createRBACManager({
  roles: ['admin', 'user', 'guest'],
  permissions: ['read', 'write', 'delete'],
  policies: {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
  }
});

// Check permissions
const canDelete = rbac.hasPermission(user.role, 'delete');
```

## 🧪 Testing Utilities

### Test Helpers
```typescript
import { createTestDB, mockAIProvider } from '@unified/lib/testing';

// Database testing
const testDB = createTestDB();

beforeEach(async () => {
  await testDB.seed({
    users: 10,
    posts: 50,
    comments: 200
  });
});

// AI provider mocking
const mockAI = mockAIProvider({
  responses: {
    'generate component': mockComponentResponse,
    'analyze code': mockAnalysisResponse
  }
});
```

### Factory Functions
```typescript
import { createFactory } from '@unified/lib/testing';

// Data factories for testing
const userFactory = createFactory<User>({
  id: () => crypto.randomUUID(),
  email: (i) => `user${i}@example.com`,
  name: () => faker.person.fullName(),
  createdAt: () => new Date()
});

// Generate test data
const testUsers = userFactory.buildList(10);
```

## 📊 Performance Utilities

### Caching
```typescript
import { createCache, memoize } from '@unified/lib/performance';

// In-memory caching
const cache = createCache({
  maxSize: 1000,
  ttl: 60000 // 1 minute
});

// Function memoization
const expensiveComputation = memoize(
  async (input: string) => {
    // Expensive operation
    return processData(input);
  },
  { ttl: 300000 } // 5 minutes
);
```

### Metrics Collection
```typescript
import { metrics, timer } from '@unified/lib/performance';

// Performance timing
const measureAPICall = timer('api_call_duration');
const endTimer = measureAPICall.start();

try {
  const result = await apiCall();
  endTimer.success();
  return result;
} catch (error) {
  endTimer.error();
  throw error;
}

// Custom metrics
metrics.increment('user_registrations');
metrics.gauge('active_connections', connectionCount);
metrics.histogram('request_duration', duration);
```

## 🚀 Build & Distribution

### Package Configuration
```json
{
  "name": "@unified/lib",
  "version": "0.1.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./ai": {
      "types": "./dist/ai/index.d.ts",
      "import": "./dist/ai/index.mjs",
      "require": "./dist/ai/index.js"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.mjs",
      "require": "./dist/utils/index.js"
    }
  }
}
```

### Build Commands
```bash
# Development
pnpm dev              # Watch mode with hot reload
pnpm build            # Production build
pnpm test             # Run all tests
pnpm test:watch       # Watch mode testing
pnpm type-check       # TypeScript validation
pnpm lint             # ESLint validation

# AI Development
pnpm ai:tools         # Generate MCP tools
pnpm ai:test          # Test AI integrations
pnpm ai:validate      # Validate AI configurations
```

## 📚 Learn More

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Zod Validation](https://zod.dev)
- [TypeScript Utilities](https://www.typescriptlang.org/docs/handbook/utility-types.html)