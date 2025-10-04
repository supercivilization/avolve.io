# Mental Models for AI-Native Development

> **Key Principle**: Mental models are **decision frameworks**, not advice. They help you make better choices based on specific contexts and dependencies.

**Last Updated**: September 30, 2025

---

## 🧠 What Are Mental Models?

Mental models are frameworks for making decisions and solving problems. In AI-native development, they help you:

- **Choose the right tool** for a specific task
- **Understand dependencies** between technologies
- **Make trade-off decisions** between competing approaches
- **Debug systematically** when things go wrong
- **Scale appropriately** based on actual needs

**These are NOT**:
- ❌ Arbitrary rules ("always do X")
- ❌ Opinions ("X is better than Y")
- ❌ Timelines ("do this for 2 weeks")
- ❌ One-size-fits-all advice

**They ARE**:
- ✅ Decision frameworks based on context
- ✅ Cause-and-effect relationships
- ✅ Trade-off analysis tools
- ✅ Systematic problem-solving approaches

---

## 📊 Core Mental Models

### 1. Dependency Mapping

**Purpose**: Understand what you need to learn before what.

**Framework**:
```
For any new concept X:
1. What prerequisites are REQUIRED to understand X?
2. What concepts become POSSIBLE after learning X?
3. What's the CRITICAL PATH to your goal?
```

**Example Decision Tree**:
```
Goal: Build AI-powered chat application

Do I know TypeScript?
  ├─ No → Learn TypeScript first (dependency)
  └─ Yes → Continue

Do I know React?
  ├─ No → Learn React (depends on TypeScript)
  └─ Yes → Continue

Do I know Next.js?
  ├─ No → Learn Next.js (depends on React)
  └─ Yes → Continue

Do I know Vercel AI SDK?
  ├─ No → Learn AI SDK (depends on Next.js)
  └─ Yes → Build chat app (all dependencies met)
```

**When to Use**:
- Planning learning path
- Evaluating if you're ready for a new concept
- Identifying knowledge gaps in your team

---

### 2. AI Delegation Framework

**Purpose**: Choose the right AI tool for the task at hand.

**Framework**:
```
For task with:
- Complexity: [Low | Medium | High]
- Context needed: [Small | Medium | Large]
- Task duration: [Seconds | Minutes | Hours]
- Iteration needs: [None | Some | Many]

Choose tool accordingly:
```

**Decision Matrix**:

| Task Characteristics | Recommended Tool | Why |
|---------------------|------------------|-----|
| Low complexity, small context | GitHub Copilot | Fast inline suggestions |
| Medium complexity, medium context | Claude (chat) | Good balance of speed and depth |
| High complexity, large context | Claude Code (CLI) | Can maintain context across hours |
| Need to execute commands | Claude Code (CLI) | Can run shell commands |
| Visual design work | Claude + MCP | Multimodal capabilities |
| Bulk transformations | Morphllm MCP | Pattern-based editing at scale |

**Example Decision**:
```
Task: "Refactor authentication system across 15 files"

Complexity: High (architecture change)
Context: Large (15 files, interconnected)
Duration: Hours (systematic refactoring)
Iterations: Many (test, fix, repeat)

Decision: Claude Code (CLI)
Reason: Only tool that can:
- Maintain context across hours
- Edit multiple files systematically
- Run tests after each change
- Recover from errors
```

**When to Use**:
- Starting a new coding session
- Stuck with wrong tool
- Evaluating new AI tools

---

### 3. Progressive Enhancement

**Purpose**: Build systems that improve incrementally, not all-at-once.

**Framework**:
```
1. Build → Make it work
2. Validate → Prove it works
3. Enhance → Make it better
4. Repeat cycle for next feature
```

**NOT Linear Development**:
```
❌ Bad: Build everything → Test everything → Deploy
✅ Good: Build feature → Test feature → Deploy → Next feature
```

**Example Cycle**:
```
Cycle 1: Basic Authentication
  Build: Email/password login
  Validate: Can users log in?
  Enhance: Add "remember me"

Cycle 2: Social Auth
  Build: Add Google OAuth
  Validate: Does it work alongside email auth?
  Enhance: Add GitHub, Microsoft

Cycle 3: Security
  Build: Add rate limiting
  Validate: Does it block attacks?
  Enhance: Add 2FA option
```

**When to Use**:
- Planning project roadmap
- Deciding what to build next
- Recovering from feature bloat

---

### 4. Context Window Management

**Purpose**: Optimize how much context AI needs to be effective.

**Framework**:
```
Available context: FIXED (model dependent)
Context needed: VARIABLE (task dependent)

Strategy: Minimize context NEEDED, not context PROVIDED
```

**Context Optimization**:

| Approach | Context Needed | When to Use |
|----------|----------------|-------------|
| **Precise references** | Low | "In file X, function Y, line Z" |
| **Pattern matching** | Low | "All files matching `src/**/*.test.ts`" |
| **Full file reading** | Medium | "Understand this component's logic" |
| **Project-wide understanding** | High | "Refactor authentication system" |

**Example Decision**:
```
Task: "Fix bug in login component"

Bad (high context):
  "Here are all 50 files in my auth system..."

Good (low context):
  "In src/components/LoginForm.tsx:45, the validation
   fails when email is empty. Here's the relevant function..."

Why: AI only needs the specific function, not entire codebase
```

**When to Use**:
- Preparing prompts for AI
- Debugging with AI assistance
- Code review requests

---

### 5. Error Recovery Patterns

**Purpose**: Debug systematically, not randomly.

**Framework** (Dependency Chain):
```
Error occurs
  ↓
Isolate: What's the SMALLEST reproduction?
  ↓
Verify: Does it happen consistently?
  ↓
Understand: What's the CAUSE (not symptom)?
  ↓
Fix: Address the CAUSE
  ↓
Validate: Does fix work? Did it break anything else?
  ↓
Document: Why did this happen? How to prevent?
```

**Example Debugging**:
```
Error: "Cannot read property 'name' of undefined"

❌ Bad approach:
  - Add ? everywhere
  - Hope it goes away

✅ Good approach:
  1. Isolate: Where exactly does it fail?
  2. Verify: Is the object actually undefined? Why?
  3. Understand: Is this a timing issue? Data issue?
  4. Fix: Address why object is undefined
  5. Validate: Test both success and failure cases
  6. Document: Add type check or better error handling
```

**When to Use**:
- Debugging production issues
- Investigating flaky tests
- Understanding third-party library errors

---

### 6. Scaling Decision Framework

**Purpose**: Know when to optimize vs when to scale.

**Framework**:
```
Performance problem identified
  ↓
Is it a CODE problem? (inefficient algorithm)
  ├─ Yes → OPTIMIZE first
  └─ No → Continue

Is it a RESOURCE problem? (not enough CPU/memory)
  ├─ Yes → Consider SCALING
  └─ No → Investigate further

Can you afford to scale?
  ├─ Yes → Scale
  └─ No → MUST optimize
```

**Decision Matrix**:

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| Slow on small data, fast on large data | Code inefficiency | Optimize algorithm |
| Fast on small data, slow on large data | Resource constraint | Scale or optimize |
| Intermittent slowness | Caching issue | Add/fix caching |
| Slow database queries | Missing indexes | Add indexes (optimize) |
| Database CPU at 100% | Too many connections | Connection pooling |

**Example Decision**:
```
Problem: API endpoint slow (2 seconds response time)

Investigate:
  - 1.9 seconds in database query
  - Query doing full table scan
  - Table has 1M rows, no indexes

Decision: OPTIMIZE (add index)
Reason: Scaling won't help if query is inefficient

After adding index:
  - 50ms response time
  - Saved scaling costs
```

**When to Use**:
- Performance issues arise
- Planning infrastructure budget
- Deciding between optimization and scaling

---

### 7. Trade-off Analysis

**Purpose**: Make informed decisions between competing options.

**Framework**:
```
Option A vs Option B

For each option, evaluate:
1. What do you GAIN?
2. What do you LOSE?
3. What are the DEPENDENCIES?
4. What's REVERSIBLE vs PERMANENT?
5. What's the COST (time, money, complexity)?
```

**Example Trade-offs**:

**Server Components vs Client Components**:
```
Server Components:
  ✅ Gain: Smaller bundle, direct database access, better SEO
  ❌ Lose: No interactivity, can't use hooks, no browser APIs
  Reversible: Yes (can always add 'use client')
  Cost: Must think about server vs client boundary

Client Components:
  ✅ Gain: Full interactivity, hooks, browser APIs
  ❌ Lose: Larger bundle, can't directly access database
  Reversible: Harder (need to extract server logic)
  Cost: Bundle size, hydration cost

Decision: Default to Server, add Client when needed
```

**REST vs GraphQL**:
```
REST:
  ✅ Gain: Simple, cacheable, widely understood
  ❌ Lose: Over-fetching, multiple endpoints
  Reversible: Yes (can migrate to GraphQL)
  Cost: Low complexity

GraphQL:
  ✅ Gain: Precise data fetching, single endpoint
  ❌ Lose: Complexity, harder caching, learning curve
  Reversible: Hard (entire API structure)
  Cost: High complexity

Decision: Start with REST, migrate to GraphQL if over-fetching becomes problem
```

**When to Use**:
- Architectural decisions
- Technology selection
- Refactoring decisions

---

## 🎯 Applying Mental Models

### How to Use These Frameworks

1. **Identify the decision** you need to make
2. **Select the relevant mental model** from above
3. **Apply the framework** systematically
4. **Document your reasoning** for future reference
5. **Validate the outcome** after implementation

### Example: Full Decision Process

**Scenario**: Should we add real-time features to our app?

**Apply Trade-off Analysis**:
```
Real-time with Supabase:
  ✅ Gain: Live updates, collaborative features, better UX
  ❌ Lose: Complexity, database connection costs
  Dependencies: Supabase subscription, proper RLS policies
  Reversible: Yes (can disable subscriptions)
  Cost: $25/month Supabase Pro minimum

Decision factors:
  - Do users NEED real-time? (talk to users)
  - Can we afford the cost? (check budget)
  - Do we have time to implement properly? (check roadmap)
```

**Apply Progressive Enhancement**:
```
Build: Add real-time to one feature (e.g., notifications)
Validate: Do users engage with real-time notifications?
Enhance: If yes, add to more features. If no, remove.
```

**Apply Dependency Mapping**:
```
Prerequisites:
  - ✅ Supabase setup complete
  - ✅ Authentication working
  - ✅ Row Level Security policies in place
  - ❌ WebSocket understanding (need to learn)

Decision: Learn WebSocket basics first, then implement
```

---

## 📚 Further Reading

- **[Foundational Learning Track](../learning-paths/foundational-track.md)** - Dependency-based learning progression
- **[Advanced Track](../learning-paths/advanced-track.md)** - Capability dependencies
- **[AI Assistant Decision Framework](../../decision-frameworks/ai-assistant-decision-framework.md)** - Specific AI tool selection
- **[Tech Matrix](../../quick-reference/TECH_MATRIX.md)** - Technology comparison for decisions

---

## 💡 Contributing Your Mental Models

Have a decision framework that's helped you? Share it!

See **[CONTRIBUTING.md](../../CONTRIBUTING.md)** for guidelines on proposing new mental models.

---

**Last Updated**: September 30, 2025
**Status**: Complete and Validated
**Next Review**: December 2025
