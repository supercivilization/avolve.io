# Non-Obvious Capabilities: Avolve.io Knowledge Graph
**Date**: October 9, 2025
**Context**: Beyond "what versions are compatible"

## The Obvious Capabilities (Already Documented)

- Version compatibility checking
- Integration pattern lookup
- Production runbooks
- API access for AI assistants

## The Non-Obvious Capabilities

### 1. **Decision Archaeology**: Why Did I Choose This?

**Problem**: 6 months later, you can't remember why you chose Next.js Server Actions over tRPC

**Knowledge graph solution**:
```cypher
// Store decision context
MATCH (project:Project {name: "AI Chat SaaS"})
CREATE (decision:Decision {
  date: "2025-10-09",
  question: "How to handle client-server communication?",
  options: ["Next.js Server Actions", "tRPC", "REST API"],
  chosen: "Next.js Server Actions",
  reasoning: "Native to Next.js 15, type-safe, no additional dependencies, works with Server Components",
  trade_offs: "Less flexible than tRPC, locked into Next.js ecosystem",
  sources: ["https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions"]
})
CREATE (project)-[:MADE_DECISION]->(decision)
CREATE (decision)-[:CHOSE]->(sa:Pattern {name: "Server Actions"})
CREATE (decision)-[:REJECTED]->(trpc:Pattern {name: "tRPC", reason: "Extra dependency"})
```

**Query later**:
```cypher
MATCH (p:Project)-[:MADE_DECISION]->(d:Decision)
WHERE p.name = "AI Chat SaaS"
  AND d.date >= date('2025-09-01')
RETURN d.question, d.chosen, d.reasoning
ORDER BY d.date
```

**Non-obvious value**: Your future self (or Claude Code in a new session) can understand the **reasoning context**, not just the decision outcome.

---

### 2. **Failure Pattern Recognition**: What Didn't Work and Why

**Problem**: You fix the same auth loop bug 3 times across different projects because you forget the gotcha

**Knowledge graph solution**:
```cypher
// Capture failure patterns with context
CREATE (failure:FailurePattern {
  symptom: "Infinite redirect loop between /login and /dashboard",
  root_cause: "Middleware matcher includes /login route",
  frequency: "High - affects 40% of new Next.js + Supabase projects",
  time_to_diagnose: "30-60 minutes",
  fix: "Exclude /login from middleware matcher config",
  prevention: "Always exclude public routes from auth middleware",
  first_encountered: "2025-08-15",
  last_encountered: "2025-10-09",
  projects_affected: ["AI Chat SaaS", "Landing Page Builder", "Docs Site"]
})
CREATE (failure)-[:AFFECTS]->(nx:Software {name: "Next.js", version: "15.5.*"})
CREATE (failure)-[:AFFECTS]->(sup:Service {name: "Supabase"})
CREATE (failure)-[:RELATED_TO]->(middleware:Component {name: "Next.js Middleware"})
```

**AI assistant query**:
```typescript
// Claude Code encounters error in new project
POST /api/pattern-match
{
  "error": "Redirecting to /login repeatedly",
  "stack": ["nextjs@15.5.4", "supabase", "middleware"]
}

// Response:
{
  "likely_cause": "Middleware matcher includes /login route",
  "confidence": 0.89,
  "evidence": "40% of Next.js 15 + Supabase projects encounter this",
  "fix": "Exclude /login from middleware matcher",
  "related_runbook": "/support/nextjs-15-supabase-auth",
  "prevention": "Add to project template checklist"
}
```

**Non-obvious value**: Institutional memory of **what NOT to do**, weighted by frequency and impact.

---

### 3. **Latent Compatibility Inference**: Predict What Will Work

**Problem**: React Server Components just released with Next.js 15, but shadcn/ui docs haven't updated yet. Will it work?

**Knowledge graph inference**:
```cypher
// Find similar patterns that DID work
MATCH (rsc:Feature {name: "React Server Components"})
      -[:INTRODUCED_IN]->(nx:Software {name: "Next.js", version: "15.0"})
MATCH (shadcn:Library {name: "shadcn/ui"})
      -[:USES]->(radix:Library {name: "Radix UI"})
MATCH (radix)-[:COMPATIBLE_WITH]->(react:Software {name: "React", version: "19.*"})
MATCH (nx)-[:REQUIRES]->(react)

// Inference: If shadcn uses Radix, and Radix works with React 19,
// and Server Components are React 19 features,
// THEN shadcn *should* work with Server Components

RETURN {
  prediction: "Compatible",
  confidence: 0.75, // Lower because not directly verified
  reasoning: "shadcn/ui → Radix UI → React 19 → Server Components (transitive compatibility)",
  recommendation: "Test in staging first, watch for client-side hooks in Server Components",
  similar_cases: [
    {pattern: "React Query worked with Server Components via 'use client'", verified: true},
    {pattern: "Framer Motion worked via client boundary", verified: true}
  ]
}
```

**Non-obvious value**: Predict compatibility for **new/undocumented scenarios** based on graph structure and similar patterns.

---

### 4. **Cost Modeling Over Time**: TCO for Stack Choices

**Problem**: Choosing between self-hosted vs. managed services, but don't know long-term costs

**Knowledge graph solution**:
```cypher
// Model cost trajectory
MATCH (project:Project)-[:USES]->(stack:Stack)
MATCH (stack)-[:INCLUDES]->(services:Service)
WITH project, stack, collect(services) AS service_list

// Calculate cost at different scales
RETURN project.name,
       [s IN service_list | s.free_tier_limit] AS free_limits,
       [s IN service_list | s.paid_tier_start] AS paid_starts,
       sum([s IN service_list | s.monthly_cost_at_1k_users]) AS cost_1k,
       sum([s IN service_list | s.monthly_cost_at_10k_users]) AS cost_10k,
       sum([s IN service_list | s.monthly_cost_at_100k_users]) AS cost_100k

// Example output:
{
  "project": "AI Chat SaaS",
  "free_until": "500 users (Supabase 50K MAU, Vercel 100GB bandwidth)",
  "cost_1k_users": "$45/mo (Supabase Pro $25 + Vercel Pro $20)",
  "cost_10k_users": "$45/mo (still within limits)",
  "cost_100k_users": "$669/mo (Supabase Team $599 + Vercel Pro $20 + Claude API $50)",
  "scaling_inflection_points": [
    {users: 50000, trigger: "Supabase MAU limit", cost_jump: "$25 → $599"},
    {bandwidth: "1TB/mo", trigger: "Vercel bandwidth", cost_jump: "$20 → $40+"}
  ]
}
```

**Non-obvious value**: **Financial impact modeling** of stack choices over project lifecycle, not just current costs.

---

### 5. **Capability Gap Detection**: What Can't You Do?

**Problem**: You're building AI chat, but realize Supabase free tier can't handle real-time for 1K concurrent users

**Knowledge graph solution**:
```cypher
// Map requirements to capabilities
MATCH (solution:Solution {name: "AI Chat SaaS"})
      -[:REQUIRES]->(capability:Capability)
MATCH (solution)-[:USES]->(stack:Stack)
MATCH (stack)-[:PROVIDES]->(available:Capability)

// Find gaps
WITH solution, collect(DISTINCT capability) AS required,
     collect(DISTINCT available) AS provided
WITH solution,
     [c IN required WHERE NOT c IN provided] AS gaps

RETURN solution.name,
       gaps,
       [g IN gaps | g.workaround] AS workarounds,
       [g IN gaps | g.paid_solution] AS upgrades_needed

// Example:
{
  "solution": "AI Chat SaaS",
  "gaps": [
    {
      "capability": "Real-time for 1K+ concurrent users",
      "current_limitation": "Supabase free tier: 200 concurrent connections",
      "workaround": "Polling every 5 seconds (degrades UX)",
      "paid_solution": "Supabase Pro ($25/mo) supports 500 concurrent, Team ($599/mo) supports 1500",
      "alternative": "Pusher ($49/mo for 500 concurrent) or Ably (pay-as-you-go)"
    }
  ]
}
```

**Non-obvious value**: **Proactive identification** of what you CAN'T do with current stack, before you hit the wall in production.

---

### 6. **Alternative Stack Discovery**: What Else Could Work?

**Problem**: You're using Next.js + Supabase, but what if you need real-time beyond Supabase limits?

**Knowledge graph solution**:
```cypher
// Find alternative stacks that satisfy requirements
MATCH (current:Stack)-[:SOLVES]->(req:Requirement)
MATCH (alternative:Stack)-[:SOLVES]->(req)
WHERE alternative <> current
  AND alternative.complexity_score <= current.complexity_score + 1 // Don't suggest drastically more complex

WITH alternative,
     count(DISTINCT req) AS shared_requirements,
     collect(DISTINCT req.name) AS requirements_met

MATCH (alternative)-[:USES]->(alt_service:Service)
MATCH (current:Stack)-[:USES]->(curr_service:Service)

WITH alternative,
     shared_requirements,
     collect(DISTINCT alt_service.name) AS alt_services,
     collect(DISTINCT curr_service.name) AS curr_services,
     [s IN alt_services WHERE NOT s IN curr_services] AS services_to_add,
     [s IN curr_services WHERE NOT s IN alt_services] AS services_to_remove

RETURN alternative.name,
       shared_requirements,
       services_to_add,
       services_to_remove,
       alternative.migration_difficulty,
       alternative.cost_delta

// Example:
{
  "alternative": "Next.js + Supabase + Pusher",
  "shared_requirements": 8, // 8 out of 10 requirements met
  "services_to_add": ["Pusher"],
  "services_to_remove": [], // Keep Supabase for everything else
  "migration_difficulty": "Low - just add Pusher for real-time, keep rest",
  "cost_delta": "+$49/mo",
  "trade_offs": {
    "gains": ["Better real-time scalability", "Dedicated real-time infrastructure"],
    "losses": ["Additional service to manage", "Supabase real-time unused"]
  }
}
```

**Non-obvious value**: **Stack evolution paths** that preserve existing investment while solving new requirements.

---

### 7. **Knowledge Decay Detection**: What's Stale?

**Problem**: Your documentation says "Next.js 15.0 + React 19.0" but you're actually using 15.5.4 + 19.2.0 in production

**Knowledge graph solution**:
```cypher
// Compare documented state vs. production reality
MATCH (project:Project {name: "AI Chat SaaS"})
      -[:DOCUMENTED_STACK]->(doc:StackSnapshot {created: date('2025-09-01')})
MATCH (project)-[:ACTUAL_STACK]->(actual:StackSnapshot {created: date('2025-10-09')})

WITH doc, actual,
     [s IN doc.software WHERE NOT s IN actual.software] AS removed,
     [s IN actual.software WHERE NOT s IN doc.software] AS added,
     [s IN doc.software WHERE s IN actual.software AND doc.version != actual.version] AS changed

RETURN {
  "documentation_drift": {
    "removed": removed,
    "added": added,
    "changed": changed,
    "staleness_score": size(removed) + size(added) + (size(changed) * 2) // Changed is worse than add/remove
  },
  "recommended_updates": [
    "Update /software/nextjs to 15.5.4 (currently shows 15.0)",
    "Add /support/nextjs-15-5-breaking-changes (getServerSideProps deprecated)",
    "Update compatibility matrix for React 19.2 type improvements"
  ]
}
```

**Non-obvious value**: **Automated staleness detection** so documentation doesn't rot without you noticing.

---

### 8. **Learning Path Generation**: How to Level Up

**Problem**: You know Next.js basics but want to master Server Actions, Streaming, and Suspense for production

**Knowledge graph solution**:
```cypher
// Map knowledge graph to learning path
MATCH (current:Knowledge {name: "Next.js Basics"})
MATCH (goal:Knowledge {name: "Production-Ready Next.js"})
MATCH path = shortestPath((current)-[:PREREQUISITE*..6]->(goal))

WITH nodes(path) AS concepts
UNWIND concepts AS concept

MATCH (concept)-[:TAUGHT_IN]->(resource:Resource)
WHERE resource.type IN ["official_docs", "tutorial", "video", "book"]

RETURN concept.name,
       concept.difficulty,
       concept.time_to_learn,
       collect({
         type: resource.type,
         url: resource.url,
         quality_score: resource.community_rating,
         last_updated: resource.last_updated
       }) AS learning_resources

// Example output:
[
  {
    "concept": "React Server Components",
    "difficulty": "intermediate",
    "time_to_learn": "4-6 hours",
    "resources": [
      {type: "official_docs", url: "react.dev/reference/rsc", rating: 4.5, updated: "2025-10-01"},
      {type: "tutorial", url: "next.js-rsc-deep-dive", rating: 4.8, updated: "2025-09-15"}
    ]
  },
  {
    "concept": "Server Actions",
    "difficulty": "intermediate",
    "time_to_learn": "3-4 hours",
    "prerequisites": ["React Server Components"],
    "resources": [...]
  },
  {
    "concept": "Streaming & Suspense",
    "difficulty": "advanced",
    "time_to_learn": "6-8 hours",
    "prerequisites": ["Server Actions", "React Server Components"],
    "resources": [...]
  }
]
```

**Non-obvious value**: **Personalized learning paths** based on where you are and where you want to go in the knowledge graph.

---

### 9. **Risk Surface Mapping**: Where Are Failure Points?

**Problem**: You're about to deploy, but don't know which parts of the stack have the most production issues

**Knowledge graph solution**:
```cypher
// Calculate risk scores for each component
MATCH (stack:Stack)-[:USES]->(component)
MATCH (component)<-[:AFFECTS]-(issue:Issue)
WHERE issue.status = "open" AND issue.severity IN ["critical", "high"]

WITH component,
     count(issue) AS issue_count,
     avg(issue.time_to_resolve_hours) AS avg_resolution_time,
     sum(CASE WHEN issue.severity = "critical" THEN 3 ELSE 1 END) AS weighted_severity

RETURN component.name,
       component.version,
       issue_count,
       avg_resolution_time,
       weighted_severity AS risk_score,
       (issue_count * weighted_severity * avg_resolution_time) AS total_risk_exposure

ORDER BY total_risk_exposure DESC

// Example:
[
  {
    "component": "Supabase Auth + Next.js Middleware",
    "version": "15.5.4",
    "issue_count": 12,
    "avg_resolution_time": 45, // minutes
    "risk_score": 18, // High
    "total_risk_exposure": 810,
    "top_issues": [
      "PKCE flow errors (affects 30% of users)",
      "Infinite redirect loops (middleware matcher)",
      "Session cookie not set (missing domain config)"
    ],
    "mitigation": "Test auth flow in staging, use /support/nextjs-15-supabase-auth runbook"
  },
  {
    "component": "Vercel AI SDK streaming",
    "version": "5.0.60",
    "issue_count": 3,
    "avg_resolution_time": 20,
    "risk_score": 5, // Low
    "total_risk_exposure": 60
  }
]
```

**Non-obvious value**: **Prioritized risk assessment** so you know where to focus pre-deployment testing and monitoring.

---

### 10. **Community Wisdom Extraction**: What Do Real Projects Do?

**Problem**: Official docs say "you can do X or Y", but what do production projects actually choose?

**Knowledge graph solution**:
```cypher
// Aggregate patterns from real projects
MATCH (project:Project)-[:USES]->(pattern:Pattern)
WHERE pattern.category = "Authentication"

WITH pattern,
     count(DISTINCT project) AS project_count,
     collect(project.scale) AS project_scales,
     avg(project.deployment_success_rate) AS avg_success_rate

RETURN pattern.name,
       project_count AS adoption_count,
       (toFloat(project_count) / totalProjectCount()) AS adoption_percentage,
       avg_success_rate,
       [scale IN project_scales | {scale: scale, count: size([p IN project_scales WHERE p = scale])}] AS scale_distribution,
       pattern.pros,
       pattern.cons

// Example:
{
  "pattern": "Next.js Middleware + Supabase getUser()",
  "adoption": "73% of Next.js 15 + Supabase projects",
  "success_rate": "94%",
  "scale_distribution": [
    {"scale": "<1K users", "count": 45},
    {"scale": "1K-10K users", "count": 23},
    {"scale": ">10K users", "count": 4}
  ],
  "pros": ["Simple", "Type-safe", "Edge-compatible"],
  "cons": ["Database query on every protected request", "Connection pool impact"],
  "alternatives": [
    {"pattern": "JWT in cookies", "adoption": "15%", "pros": ["No DB query"], "cons": ["Manual token refresh"]},
    {"pattern": "Session in Redis", "adoption": "12%", "pros": ["Fast"], "cons": ["Extra service"]}
  ]
}
```

**Non-obvious value**: **Evidence-based decision making** - not what COULD work, but what DOES work for projects like yours.

---

## How These Non-Obvious Capabilities Change the Architecture

### If Primary Purpose Includes These Capabilities:

**Minimum required**:
- ✅ Supabase entity database (entities, relationships, decisions, issues)
- ✅ Temporal tracking (version history, decision history)
- ✅ Graph queries (Neo4j or pg_graph extension)
- ✅ Semantic search (pgvector for pattern matching)

**Optional but high-value**:
- Graph algorithms (PageRank for authority, community detection for stack clusters)
- Link prediction (infer likely compatibility)
- Time-series analysis (cost modeling over time)

### MCP Server Capabilities (for Claude Code)

```typescript
// Non-obvious MCP tools
Tools:
- record_decision(project, question, options, chosen, reasoning)
- find_similar_failures(symptom, stack) -> [{failure, fix, confidence}]
- predict_compatibility(software_a, software_b) -> {prediction, confidence, reasoning}
- calculate_tco(stack, user_counts) -> {costs_at_scale, inflection_points}
- find_gaps(solution_requirements, current_stack) -> {gaps, workarounds, upgrades}
- suggest_alternatives(current_stack, new_requirement) -> {alternatives, migration_paths}
- detect_staleness(project) -> {drift_score, recommended_updates}
- generate_learning_path(current_knowledge, goal) -> {concepts, resources, timeline}
- assess_risk(stack, deployment_date) -> {components_by_risk, mitigations}
- get_community_wisdom(pattern_category) -> {popular_patterns, success_rates, scales}
```

### The Real Value Proposition

**Not just**: "What version of React works with Next.js 15.5?"

**But**:
- "Why did I choose Server Actions over tRPC 6 months ago?" (Decision archaeology)
- "I'm getting auth loop errors - have I seen this before?" (Failure pattern recognition)
- "Will shadcn/ui work with Server Components?" (Latent compatibility inference)
- "What will this stack cost at 100K users?" (Cost modeling)
- "Can my stack handle real-time for 1K concurrent users?" (Capability gap detection)
- "What if I need to add AI streaming - can I keep my current stack?" (Alternative discovery)
- "Is my documentation stale compared to production?" (Knowledge decay detection)
- "How do I level up from basics to production-ready?" (Learning path generation)
- "Which components are most likely to break in production?" (Risk surface mapping)
- "What do most projects actually use for auth?" (Community wisdom extraction)

**This is WAY beyond a compatibility matrix.**

## My Revised Recommendation

**Primary purpose** (you + Claude Code): Context management **including non-obvious capabilities**

**This changes everything** - you need:
1. ✅ Supabase entity database (more than just compatibility)
2. ✅ Graph layer (Neo4j or pg_graph) for inference and traversal
3. ✅ Temporal tracking (decisions, versions, costs over time)
4. ✅ Enhanced MCP server (10 non-obvious tools, not just lookup)
5. ✅ Semantic search (pattern matching, not just keyword)

**Architecture**: Phase 1-3 from original plan, but optimized for YOU + Claude Code, not public API

**Next step**: Start with Supabase schema that captures **decisions, failures, predictions**, not just software versions

Want me to design that schema?
