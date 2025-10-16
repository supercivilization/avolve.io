import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "State Management for Multi-Agent Systems | AI Orchestration | Avolve.io",
  description:
    "Managing state, memory, and context across multi-agent AI workflows. Patterns for temporal continuity, shared context, state isolation, and production state architectures.",
  keywords:
    "AI state management, multi-agent memory, context management, temporal continuity, agent state, AI orchestration, distributed state, Vercel AI SDK state",
  alternates: {
    canonical: "https://avolve.io/systems/state-management",
  },
};

export default function StateManagementPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">
          State Management for Multi-Agent Systems
        </h1>
        <p className="text-xl text-muted-foreground">
          State is memory. Memory is identity. Identity determines behavior.
          Managing state across multi-agent workflows is the foundation of
          reliable AI orchestration.
        </p>
      </div>

      {/* Strategic Context */}
      <div className="mb-12 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20">
        <h3 className="mb-2 text-lg font-semibold text-purple-900 dark:text-purple-200">
          Strategic Foundation: State as Identity
        </h3>
        <p className="mb-3 text-purple-800 dark:text-purple-300">
          Without temporal continuity, you have independent function calls, not
          an intelligent system. State creates memory. Memory creates identity.
          Identity enables coherent behavior over time.
        </p>
        <p className="text-sm text-purple-700 dark:text-purple-400">
          <strong>Core insight:</strong>{" "}
          <Link
            href="/about/philosophy#state-is-identity"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            State is the foundation of temporal continuity
          </Link>
          . Multi-agent systems without proper state management are just random
          function calls. Read the full framework in{" "}
          <Link
            href="/about/philosophy"
            className="underline hover:text-purple-900 dark:hover:text-purple-200"
          >
            Philosophy: The Industrialization of Intelligence
          </Link>
          .
        </p>
      </div>

      {/* Core Principle */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">The Core Principle</h2>
        <div className="rounded-lg bg-muted p-6">
          <p className="mb-4 text-lg font-semibold">
            State determines what an agent can remember, and therefore what it
            can become.
          </p>
          <p className="text-muted-foreground">
            In multi-agent orchestration, state management isn't about data
            storage—it's about creating temporal continuity across independent
            AI agents. Without it, you have stateless function calls. With it,
            you have systems that learn, adapt, and maintain coherent behavior.
          </p>
        </div>
      </section>

      {/* State Management Patterns */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">State Management Patterns</h2>

        {/* Shared Context Pattern */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            1. Shared Context Pattern
          </h3>
          <p className="mb-4 text-muted-foreground">
            All agents read from and write to shared state. Simplest pattern,
            but requires careful management to avoid conflicts.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Shared Context Object
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Vercel AI SDK - Shared context across agents
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface SharedContext {
  conversationHistory: Array<{ role: string; content: string }>;
  userPreferences: Record<string, any>;
  sessionData: Record<string, any>;
  metadata: {
    userId: string;
    sessionId: string;
    startTime: number;
  };
}

class MultiAgentOrchestrator {
  private context: SharedContext;

  constructor(userId: string, sessionId: string) {
    this.context = {
      conversationHistory: [],
      userPreferences: {},
      sessionData: {},
      metadata: {
        userId,
        sessionId,
        startTime: Date.now(),
      },
    };
  }

  async runAgent(
    agentName: string,
    prompt: string,
    model: any = openai('gpt-4o-mini')
  ) {
    // Agent can read from shared context
    const contextualPrompt = \`
Context:
- User ID: \${this.context.metadata.userId}
- Session started: \${new Date(this.context.metadata.startTime).toISOString()}
- Conversation history: \${this.context.conversationHistory.length} messages
- User preferences: \${JSON.stringify(this.context.userPreferences)}

Current task: \${prompt}
    \`;

    const result = await generateText({
      model,
      prompt: contextualPrompt,
      maxTokens: 500,
    });

    // Agent writes to shared context
    this.context.conversationHistory.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: result.text, agent: agentName }
    );

    // Update session data based on agent output
    this.context.sessionData[\`last_\${agentName}_response\`] = result.text;
    this.context.sessionData[\`\${agentName}_call_count\`] =
      (this.context.sessionData[\`\${agentName}_call_count\`] || 0) + 1;

    return result.text;
  }

  getContext() {
    return this.context;
  }

  updatePreferences(preferences: Record<string, any>) {
    this.context.userPreferences = {
      ...this.context.userPreferences,
      ...preferences,
    };
  }
}

// Usage
const orchestrator = new MultiAgentOrchestrator('user-123', 'session-456');

// Agent 1: Classify user intent
const intent = await orchestrator.runAgent(
  'classifier',
  'User says: "I need help with my billing"'
);

// Agent 2: Can access context from Agent 1
const response = await orchestrator.runAgent(
  'support',
  \`Handle billing issue. Detected intent: \${intent}\`
);

// Check accumulated context
console.log(orchestrator.getContext().conversationHistory);
// Shows full conversation across both agents`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>When to use:</strong> Sequential agent workflows where
              later agents need context from earlier agents. Keep context
              object small (&lt;10KB) to avoid token bloat.
            </p>
          </div>
        </div>

        {/* Isolated State Pattern */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            2. Isolated State Pattern
          </h3>
          <p className="mb-4 text-muted-foreground">
            Each agent maintains its own state. Pass only necessary data between
            agents. Better for parallel workflows and state isolation.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Agent-Specific State with Explicit Passing
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Each agent manages own state, pass data explicitly
interface AgentState<T> {
  data: T;
  metadata: {
    agentName: string;
    lastUpdate: number;
    callCount: number;
  };
}

class StatefulAgent<T> {
  private state: AgentState<T>;

  constructor(agentName: string, initialData: T) {
    this.state = {
      data: initialData,
      metadata: {
        agentName,
        lastUpdate: Date.now(),
        callCount: 0,
      },
    };
  }

  async run(prompt: string, model: any, context?: Record<string, any>) {
    // Build prompt with agent-specific state + optional context
    const fullPrompt = \`
Agent: \${this.state.metadata.agentName}
Agent state: \${JSON.stringify(this.state.data)}
Additional context: \${context ? JSON.stringify(context) : 'none'}

Task: \${prompt}
    \`;

    const result = await generateText({
      model,
      prompt: fullPrompt,
      maxTokens: 500,
    });

    // Update agent-specific state
    this.state.metadata.lastUpdate = Date.now();
    this.state.metadata.callCount++;

    return {
      response: result.text,
      state: this.state,
    };
  }

  updateState(updates: Partial<T>) {
    this.state.data = { ...this.state.data, ...updates };
    this.state.metadata.lastUpdate = Date.now();
  }

  getState() {
    return this.state;
  }
}

// Usage: Parallel agents with isolated state
const classifierAgent = new StatefulAgent('classifier', {
  patterns: ['billing', 'technical', 'sales'],
  confidence_threshold: 0.7,
});

const routerAgent = new StatefulAgent('router', {
  routes: { billing: 'support-team-1', technical: 'support-team-2' },
  fallback: 'general-support',
});

// Run agents in parallel with isolated state
const [classification, routing] = await Promise.all([
  classifierAgent.run('Classify: user needs billing help', openai('gpt-4o-mini')),
  routerAgent.run('Determine best team', openai('gpt-4o-mini')),
]);

// Pass only necessary data between agents
const finalResponse = await routerAgent.run(
  \`Route this request: \${classification.response}\`,
  openai('gpt-4o-mini'),
  { classification: classification.response } // Explicit context passing
);`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>When to use:</strong> Parallel agent workflows,
              specialized agents that don't need full system context, or when
              you need strong state isolation for testing/debugging.
            </p>
          </div>
        </div>

        {/* Persistent State Pattern */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            3. Persistent State Pattern (Database-Backed)
          </h3>
          <p className="mb-4 text-muted-foreground">
            Store state in database for long-running workflows, cross-session
            memory, and production reliability.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Supabase-Backed Agent State
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Production pattern: Database-backed state
import { createClient } from '@supabase/supabase-js';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Database schema:
// CREATE TABLE agent_state (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   session_id TEXT NOT NULL,
//   agent_name TEXT NOT NULL,
//   state JSONB NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE INDEX idx_session_agent ON agent_state(session_id, agent_name);

class PersistentAgent {
  constructor(
    private sessionId: string,
    private agentName: string
  ) {}

  async loadState() {
    const { data, error } = await supabase
      .from('agent_state')
      .select('state')
      .eq('session_id', this.sessionId)
      .eq('agent_name', this.agentName)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Not found is ok
      throw error;
    }

    return data?.state || {};
  }

  async saveState(state: Record<string, any>) {
    const { error } = await supabase.from('agent_state').upsert(
      {
        session_id: this.sessionId,
        agent_name: this.agentName,
        state,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'session_id,agent_name',
      }
    );

    if (error) throw error;
  }

  async run(prompt: string, model: any = openai('gpt-4o-mini')) {
    // Load state from database
    const state = await this.loadState();

    const fullPrompt = \`
Agent: \${this.agentName}
Persistent state: \${JSON.stringify(state)}
Task: \${prompt}
    \`;

    const result = await generateText({
      model,
      prompt: fullPrompt,
      maxTokens: 500,
    });

    // Update and persist state
    const updatedState = {
      ...state,
      lastResponse: result.text,
      lastUpdate: new Date().toISOString(),
      callCount: (state.callCount || 0) + 1,
    };

    await this.saveState(updatedState);

    return result.text;
  }
}

// Usage: State persists across requests
const agent = new PersistentAgent('session-123', 'support-agent');

// Request 1
await agent.run('Help user with billing question');

// ... time passes, different server, different request ...

// Request 2: Agent remembers previous interaction
const agent2 = new PersistentAgent('session-123', 'support-agent');
await agent2.run('Follow up on previous billing issue');
// Agent has access to state from Request 1`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Production necessity:</strong> For any multi-turn
              conversation or workflow spanning &gt;5 minutes, database-backed
              state is required. In-memory state dies when your server restarts.
            </p>
          </div>
        </div>

        {/* Vector Memory Pattern */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            4. Vector Memory Pattern (Semantic Search)
          </h3>
          <p className="mb-4 text-muted-foreground">
            Store conversation history and agent outputs as vector embeddings.
            Retrieve relevant context based on semantic similarity, not exact
            matching.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Supabase pgvector for Agent Memory
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Semantic memory using vector embeddings
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

// Database schema:
// CREATE EXTENSION vector;
// CREATE TABLE agent_memory (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   session_id TEXT NOT NULL,
//   agent_name TEXT NOT NULL,
//   content TEXT NOT NULL,
//   embedding vector(1536),
//   metadata JSONB,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE INDEX ON agent_memory USING ivfflat (embedding vector_cosine_ops);

class VectorMemoryAgent {
  constructor(
    private sessionId: string,
    private agentName: string
  ) {}

  async storeMemory(content: string, metadata?: Record<string, any>) {
    // Generate embedding
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: content,
    });

    // Store in database with vector
    const { error } = await supabase.from('agent_memory').insert({
      session_id: this.sessionId,
      agent_name: this.agentName,
      content,
      embedding,
      metadata,
    });

    if (error) throw error;
  }

  async searchMemory(query: string, limit: number = 5) {
    // Generate query embedding
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query,
    });

    // Semantic search using cosine similarity
    const { data, error } = await supabase.rpc('search_agent_memory', {
      query_embedding: embedding,
      match_session_id: this.sessionId,
      match_agent_name: this.agentName,
      match_limit: limit,
    });

    if (error) throw error;

    return data;
  }

  async runWithMemory(prompt: string, model: any = openai('gpt-4o')) {
    // Search for relevant past context
    const relevantMemories = await this.searchMemory(prompt);

    // Build context from semantic search results
    const memoryContext = relevantMemories
      .map((m: any) => \`[Past context]: \${m.content}\`)
      .join('\\n');

    const fullPrompt = \`
Relevant past interactions:
\${memoryContext}

Current task: \${prompt}
    \`;

    const result = await generateText({
      model,
      prompt: fullPrompt,
      maxTokens: 500,
    });

    // Store this interaction in memory
    await this.storeMemory(
      \`User: \${prompt}\\nAssistant: \${result.text}\`,
      { timestamp: new Date().toISOString() }
    );

    return result.text;
  }
}

// SQL function for semantic search:
// CREATE OR REPLACE FUNCTION search_agent_memory(
//   query_embedding vector(1536),
//   match_session_id text,
//   match_agent_name text,
//   match_limit int
// )
// RETURNS TABLE (
//   id uuid,
//   content text,
//   similarity float
// )
// LANGUAGE plpgsql
// AS $$
// BEGIN
//   RETURN QUERY
//   SELECT
//     agent_memory.id,
//     agent_memory.content,
//     1 - (agent_memory.embedding <=> query_embedding) as similarity
//   FROM agent_memory
//   WHERE session_id = match_session_id
//     AND agent_name = match_agent_name
//   ORDER BY agent_memory.embedding <=> query_embedding
//   LIMIT match_limit;
// END;
// $$;

// Usage: Agent remembers semantically similar interactions
const agent = new VectorMemoryAgent('session-123', 'support-agent');

await agent.runWithMemory('User had billing issue last week');
// Agent searches memory, finds semantically related past billing conversations
// Even if exact words don't match`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20">
            <p className="text-sm text-purple-800 dark:text-purple-300">
              <strong>When to use:</strong> Long-running agents with extensive
              history, customer support bots, personal assistants, or any system
              where "remembering" semantically related context matters more than
              exact chronological history.
            </p>
          </div>
        </div>
      </section>

      {/* State Architecture Patterns */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">
          Production State Architectures
        </h2>

        {/* Layered State */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            1. Layered State Architecture
          </h3>
          <p className="mb-4 text-muted-foreground">
            Separate state by lifecycle and access patterns: ephemeral,
            session, and long-term state.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">Pattern: Three-Layer State</h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Production architecture: Layered state management
class LayeredStateAgent {
  // Layer 1: Ephemeral (in-memory, request-scoped)
  private ephemeral: Record<string, any> = {};

  // Layer 2: Session (Redis, 30-min TTL)
  private sessionKey: string;

  // Layer 3: Long-term (Postgres, permanent)
  private userId: string;

  constructor(userId: string, sessionId: string) {
    this.userId = userId;
    this.sessionKey = \`session:\${sessionId}\`;
  }

  // Ephemeral: Temporary computation results
  setEphemeral(key: string, value: any) {
    this.ephemeral[key] = value;
  }

  getEphemeral(key: string) {
    return this.ephemeral[key];
  }

  // Session: Redis-backed, expires after 30 min
  async setSession(key: string, value: any) {
    // Using Upstash Redis or similar
    await redis.setex(\`\${this.sessionKey}:\${key}\`, 1800, JSON.stringify(value));
  }

  async getSession(key: string) {
    const data = await redis.get(\`\${this.sessionKey}:\${key}\`);
    return data ? JSON.parse(data) : null;
  }

  // Long-term: Postgres, permanent storage
  async setLongTerm(key: string, value: any) {
    await supabase.from('user_state').upsert({
      user_id: this.userId,
      key,
      value,
      updated_at: new Date().toISOString(),
    });
  }

  async getLongTerm(key: string) {
    const { data } = await supabase
      .from('user_state')
      .select('value')
      .eq('user_id', this.userId)
      .eq('key', key)
      .single();

    return data?.value;
  }

  async run(prompt: string, model: any = openai('gpt-4o-mini')) {
    // Read from all layers
    const userPreferences = await this.getLongTerm('preferences');
    const conversationHistory = await this.getSession('history');
    const currentContext = this.getEphemeral('context');

    const fullPrompt = \`
User preferences (long-term): \${JSON.stringify(userPreferences)}
Recent conversation (session): \${JSON.stringify(conversationHistory)}
Current context (ephemeral): \${JSON.stringify(currentContext)}

Task: \${prompt}
    \`;

    const result = await generateText({ model, prompt: fullPrompt });

    // Write to appropriate layers
    this.setEphemeral('lastResponse', result.text);
    await this.setSession('lastInteraction', {
      prompt,
      response: result.text,
      timestamp: Date.now(),
    });

    return result.text;
  }
}

// Layer decision guide:
// - Ephemeral: Intermediate computation, request-scoped temp data
// - Session: Conversation history, recent preferences, transient state
// - Long-term: User profile, learned preferences, permanent records`}</code>
            </pre>
          </div>
        </div>

        {/* Event Sourcing */}
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            2. Event Sourcing Pattern
          </h3>
          <p className="mb-4 text-muted-foreground">
            Store all state changes as immutable events. Reconstruct current
            state by replaying events. Perfect for audit trails and debugging.
          </p>

          <div className="rounded-lg bg-muted p-6">
            <h4 className="mb-2 font-semibold">
              Pattern: Event-Sourced Agent State
            </h4>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
              <code>{`// Event sourcing for full agent history
interface StateEvent {
  id: string;
  sessionId: string;
  agentName: string;
  eventType: 'agent_called' | 'state_updated' | 'decision_made';
  data: Record<string, any>;
  timestamp: number;
}

class EventSourcedAgent {
  constructor(
    private sessionId: string,
    private agentName: string
  ) {}

  async appendEvent(eventType: StateEvent['eventType'], data: Record<string, any>) {
    const event: StateEvent = {
      id: crypto.randomUUID(),
      sessionId: this.sessionId,
      agentName: this.agentName,
      eventType,
      data,
      timestamp: Date.now(),
    };

    // Store event (immutable, append-only)
    await supabase.from('agent_events').insert(event);

    return event;
  }

  async getEvents(limit?: number): Promise<StateEvent[]> {
    const query = supabase
      .from('agent_events')
      .select('*')
      .eq('session_id', this.sessionId)
      .eq('agent_name', this.agentName)
      .order('timestamp', { ascending: true });

    if (limit) query.limit(limit);

    const { data } = await query;
    return data || [];
  }

  async reconstructState(): Promise<Record<string, any>> {
    const events = await this.getEvents();

    // Replay events to build current state
    const state: Record<string, any> = {};

    for (const event of events) {
      switch (event.eventType) {
        case 'state_updated':
          Object.assign(state, event.data);
          break;
        case 'decision_made':
          state.lastDecision = event.data;
          break;
        // ... handle other event types
      }
    }

    return state;
  }

  async run(prompt: string, model: any = openai('gpt-4o-mini')) {
    // Reconstruct state from events
    const state = await this.reconstructState();

    await this.appendEvent('agent_called', { prompt });

    const result = await generateText({
      model,
      prompt: \`State: \${JSON.stringify(state)}\\nTask: \${prompt}\`,
    });

    await this.appendEvent('state_updated', {
      lastResponse: result.text,
    });

    return result.text;
  }

  // Debugging: Replay history to specific point
  async replayToTimestamp(timestamp: number) {
    const query = supabase
      .from('agent_events')
      .select('*')
      .eq('session_id', this.sessionId)
      .eq('agent_name', this.agentName)
      .lte('timestamp', timestamp)
      .order('timestamp', { ascending: true });

    const { data: events } = await query;

    const state: Record<string, any> = {};
    for (const event of events || []) {
      if (event.eventType === 'state_updated') {
        Object.assign(state, event.data);
      }
    }

    return state;
  }
}`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>When to use:</strong> Systems requiring full audit trails,
              debugging complex agent behavior, compliance requirements, or when
              you need to "replay" agent decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Common Mistakes</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ No state management at all
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Every agent call is independent. No memory, no continuity, no
              coherent behavior. This isn't a system, it's random function
              calls.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ In-memory state for production
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Server restarts, your state dies. Use in-memory for ephemeral data
              only. Session and long-term state must be persistent.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Putting everything in shared context
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Bloated context object means every agent pays token cost for
              irrelevant data. Pass only what each agent needs.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ No state cleanup strategy
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              State accumulates forever. Set TTLs, implement cleanup jobs, or
              your database becomes a junk drawer.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="mb-1 font-semibold text-red-900 dark:text-red-200">
              ❌ Synchronous state updates blocking agent execution
            </h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Don't wait for database writes before returning agent response.
              Update state async unless you need transaction guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Best Practices</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Layer state by lifecycle
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Ephemeral (in-memory), session (Redis, 30min TTL), long-term
              (Postgres). Different data has different lifecycles—treat them
              differently.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Set explicit TTLs on session state
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Don't rely on manual cleanup. Redis SETEX or Postgres scheduled
              jobs to expire old data automatically.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Use vector memory for semantic search
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              When conversation history grows beyond 10-20 messages, switch to
              vector-based retrieval. Pass only semantically relevant context to
              agents.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Update state async when possible
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              Return agent response immediately, update database in background.
              Use transactions only when atomicity matters.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
              ✅ Consider event sourcing for critical workflows
            </h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              For compliance, debugging, or audit trails, event sourcing gives
              you complete history of all state changes.
            </p>
          </div>
        </div>
      </section>

      {/* Production Considerations */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Production Considerations</h2>

        <div className="space-y-6">
          {/* Token Economics */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              1. Token Economics of State
            </h3>
            <p className="mb-3 text-muted-foreground">
              Every byte of state you pass to agents costs tokens. Optimize
              ruthlessly.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="mb-2">
                <strong>Token cost examples:</strong>
              </p>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>
                  Entire conversation history (20 messages): ~2,000 tokens =
                  $0.006/request @ Claude 3.5 Sonnet
                </li>
                <li>
                  Vector search (top 5 relevant messages): ~500 tokens =
                  $0.0015/request
                </li>
                <li>
                  Minimal context (user ID + intent): ~50 tokens =
                  $0.00015/request
                </li>
              </ul>
              <p className="mt-3 font-semibold text-green-700 dark:text-green-300">
                💰 At 1M requests/month: Minimal context saves $5,850/month vs
                full history
              </p>
            </div>
          </div>

          {/* State Cleanup */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">2. State Cleanup</h3>
            <p className="mb-3 text-muted-foreground">
              Implement automated cleanup to prevent unbounded state growth.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`// Supabase cleanup job (run daily)
-- Delete session state older than 7 days
DELETE FROM agent_state
WHERE updated_at < NOW() - INTERVAL '7 days'
  AND session_id LIKE 'session-%';

-- Delete orphaned memories (no recent activity)
DELETE FROM agent_memory
WHERE session_id IN (
  SELECT DISTINCT session_id
  FROM agent_memory
  GROUP BY session_id
  HAVING MAX(created_at) < NOW() - INTERVAL '30 days'
);

-- Archive old events (keep last 90 days, archive rest)
INSERT INTO agent_events_archive
SELECT * FROM agent_events
WHERE timestamp < EXTRACT(EPOCH FROM NOW() - INTERVAL '90 days') * 1000;

DELETE FROM agent_events
WHERE timestamp < EXTRACT(EPOCH FROM NOW() - INTERVAL '90 days') * 1000;`}</code>
              </pre>
            </div>
          </div>

          {/* Monitoring */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              3. State Monitoring
            </h3>
            <p className="mb-3 text-muted-foreground">
              Track state size, access patterns, and performance impact.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="mb-2">
                <strong>Key metrics to monitor:</strong>
              </p>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                <li>Average state size per session (bytes)</li>
                <li>State access latency (Redis/Postgres read time)</li>
                <li>State growth rate (MB/day)</li>
                <li>Cache hit rate (if using Redis caching)</li>
                <li>Token cost from state context ($/request)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Related Resources</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/systems/agent-coordination"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Agent Coordination Patterns</h3>
            <p className="text-sm text-muted-foreground">
              Sequential, parallel, and hierarchical workflows. State management
              strategies for different orchestration patterns.
            </p>
          </Link>

          <Link
            href="/systems/model-routing"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Model Routing Strategies</h3>
            <p className="text-sm text-muted-foreground">
              Cost-optimized routing across models. Different models may require
              different state strategies.
            </p>
          </Link>

          <Link
            href="/about/philosophy"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">
              Philosophy: The Industrialization of Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              Strategic framework: State is identity. Memory creates temporal
              continuity. Why state management is foundational.
            </p>
          </Link>

          <Link
            href="/software/vercel-ai-sdk"
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 font-semibold">Vercel AI SDK</h3>
            <p className="text-sm text-muted-foreground">
              Implementation examples using Vercel AI SDK. State management with
              streaming responses and multi-turn conversations.
            </p>
          </Link>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mb-12">
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 className="mb-4 text-2xl font-bold">Key Takeaways</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>State is memory, memory is identity</strong>. Without
                proper state management, you have stateless function calls, not
                intelligent agents.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Layer state by lifecycle</strong>: Ephemeral
                (in-memory), session (Redis), long-term (Postgres). Different
                data needs different storage.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Token economics matter</strong>: Full conversation
                history costs 10x more than vector search retrieval. Optimize
                what you pass to agents.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Use vector memory for semantic search</strong>: When
                history grows beyond 10-20 messages, switch to embedding-based
                retrieval.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Implement state cleanup</strong>: Set TTLs, run cleanup
                jobs, archive old data. Unbounded state growth kills
                performance.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">
                •
              </span>
              <span>
                <strong>Consider event sourcing for critical workflows</strong>:
                Full audit trail, debugging capability, compliance requirements
                all benefit from event-sourced state.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Link
          href="/systems/model-routing"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Model Routing Strategies
        </Link>
        <Link
          href="/systems/tool-orchestration"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Tool Orchestration with MCP →
        </Link>
      </div>
    </div>
  );
}
