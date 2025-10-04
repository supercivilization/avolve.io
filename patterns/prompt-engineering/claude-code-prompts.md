# Claude Code Prompt Engineering Patterns

Optimized prompts for maximum productivity with Claude Code across different development scenarios.

## Core Principles

### Context First
```
[Project Context]
- Tech Stack: Next.js 15 + React 19 + TypeScript + Supabase + Vercel AI SDK
- Project: [Brief description]
- Current Task: [Specific objective]

[Request]
[Your specific request here]
```

### Progressive Complexity
```
Phase 1: Get it working (MVP)
Phase 2: Make it robust (error handling, validation)
Phase 3: Make it scalable (performance, architecture)
Phase 4: Make it maintainable (testing, documentation)
```

### Explicit Constraints
```
Constraints:
- Timeline: [hours/days/weeks]
- Team size: [number of developers]
- Performance requirements: [specific metrics]
- Browser support: [specific targets]
- Budget: [cost considerations]
```

## Technology-Specific Prompts

### Next.js 15 Development
```
Context: Next.js 15 App Router project with TypeScript and Tailwind CSS

Task: [Specific feature request]

Requirements:
- Use App Router conventions
- Implement Server Components where possible
- Include proper TypeScript types
- Apply Tailwind CSS for styling
- Follow Next.js 15 best practices
- Include error boundaries where appropriate

Please provide:
1. File structure recommendations
2. Complete implementation with types
3. Any necessary configuration changes
4. Performance considerations
```

### AI Integration with Vercel AI SDK
```
Context: Building AI features with Vercel AI SDK 5.0

Goal: [Specific AI functionality]

Requirements:
- Use latest AI SDK patterns
- Implement streaming responses
- Include proper error handling
- Optimize for performance
- Consider token usage costs
- Support multiple AI models if needed

Deliverables:
1. API route implementation
2. React hook usage
3. UI components with loading states
4. Error handling strategy
5. Cost optimization recommendations
```

### Supabase Integration
```
Context: Full-stack app with Supabase backend

Feature: [Database/auth/storage feature]

Stack Details:
- Database: PostgreSQL with Row Level Security
- Auth: Supabase Auth with [specific providers]
- Storage: [if needed]
- Real-time: [if needed]

Requirements:
- Proper TypeScript types from Supabase
- Row Level Security policies
- Client and Server-side data fetching
- Error handling and loading states
- Performance optimization

Please include:
1. Database schema/migrations
2. RLS policies
3. TypeScript types
4. Client-side hooks
5. Server-side data fetching
```

### React Native/Expo Development
```
Context: React Native app with Expo Development Builds

Feature: [Mobile-specific feature]

Platform Requirements:
- iOS and Android compatibility
- Expo SDK 52 features
- TypeScript support
- Platform-specific adaptations

Considerations:
- Touch targets (44pt minimum)
- Safe area handling
- Keyboard avoidance
- Performance on lower-end devices
- Accessibility features

Deliverables:
1. Cross-platform component
2. Platform-specific adaptations
3. Performance optimizations
4. Accessibility implementation
5. Testing recommendations
```

## Workflow-Specific Patterns

### Feature Development
```
I need to implement [feature description] for a [project type].

Current State:
- [Existing functionality]
- [Current architecture]
- [Known constraints]

Success Criteria:
- [Functional requirements]
- [Performance requirements]
- [User experience requirements]

Please use a multi-phase approach:
1. Architecture planning
2. Core implementation
3. Error handling & edge cases
4. Testing strategy
5. Performance optimization

For each phase, explain your reasoning and any trade-offs.
```

### Debugging and Optimization
```
I'm experiencing [specific issue] in my [technology] application.

Context:
- Code: [relevant code snippets]
- Error: [error messages]
- Environment: [dev/staging/production]
- Frequency: [when it occurs]

Investigation Done:
- [Steps already taken]
- [Tools used]
- [Hypotheses tested]

Please help me:
1. Identify the root cause
2. Provide a fix
3. Suggest prevention strategies
4. Recommend monitoring/testing improvements
```

### Code Review and Refactoring
```
Please review this code for [specific concerns: performance, maintainability, security, etc.]

Code Context:
- Purpose: [what this code does]
- Technology: [frameworks/libraries used]
- Constraints: [performance, compatibility, etc.]

[CODE BLOCK]

Review Focus:
1. Architecture and patterns
2. Performance implications
3. Security considerations
4. Maintainability and readability
5. Testing coverage
6. Future scalability

Please provide:
- Specific improvement recommendations
- Refactored code examples
- Rationale for each suggestion
```

### Learning and Onboarding
```
I want to learn [specific technology/pattern] to improve my [context: team productivity, app performance, etc.]

Background:
- Current experience: [skill level]
- Project context: [how you'll apply this]
- Timeline: [when you need to apply this knowledge]
- Learning style: [practical examples, theory first, etc.]

Please provide:
1. Conceptual overview with analogies
2. Practical examples I can run immediately
3. Progressive complexity exercises
4. Common pitfalls and how to avoid them
5. Resources for deeper learning
6. Success metrics to track progress
```

## AI-Human Collaboration Patterns

### Design Partner Pattern
```
Act as my design partner for [feature/system].

My role: [Product decisions, user requirements, business constraints]
Your role: [Technical architecture, implementation details, trade-off analysis]

Let's collaborate on:
1. Understanding the problem space
2. Exploring solution alternatives
3. Evaluating trade-offs
4. Planning implementation phases
5. Identifying risks and mitigation

Please ask clarifying questions and challenge assumptions.
```

### Iterative Development Pattern
```
Let's build [feature] iteratively with feedback loops.

Iteration 1: Basic functionality (30 minutes)
- Core feature working
- Minimal UI
- Happy path only

Iteration 2: Robust implementation (1 hour)
- Error handling
- Loading states
- Input validation

Iteration 3: Production ready (2 hours)
- Performance optimization
- Accessibility
- Testing
- Documentation

After each iteration, I'll provide feedback for the next phase.
```

### Teaching Assistant Pattern
```
Explain [complex concept] as if you're teaching it, with:

1. The big picture and why it matters
2. Step-by-step breakdown
3. Concrete examples I can try
4. Common mistakes and how to avoid them
5. When to use vs when not to use
6. How it fits into the larger ecosystem

Please check my understanding at each step and adjust explanations based on my responses.
```

## Advanced Prompt Techniques

### Chain of Thought Prompting
```
I need to implement [complex feature].

Please think through this step-by-step:
1. What are the core requirements?
2. What are the technical constraints?
3. What are the available solution approaches?
4. What are the trade-offs of each approach?
5. Which approach do you recommend and why?
6. What's the implementation plan?
7. What could go wrong and how to mitigate?

Show your reasoning at each step.
```

### Role-Based Prompting
```
Take on the role of [Senior Architect, Performance Engineer, Security Expert, etc.] and review my approach to [specific challenge].

From your perspective:
- What would you prioritize?
- What risks do you see?
- What alternatives would you consider?
- What questions would you ask the team?
- What would you implement differently?

Please provide specific, actionable feedback.
```

### Constraint-Based Prompting
```
Given these constraints:
- Must work on [specific browsers/devices]
- Performance budget: [specific metrics]
- Timeline: [specific deadline]
- Team expertise: [skill levels]
- Budget: [cost constraints]

Design a solution for [problem] that optimizes for [primary constraint] while satisfying all others.

Explain how you're balancing competing constraints and what you're prioritizing.
```

## Quality Assurance Prompts

### Code Quality Check
```
Please audit this code against modern [technology] best practices:

[CODE]

Check for:
- Performance anti-patterns
- Security vulnerabilities
- Accessibility issues
- TypeScript type safety
- Error handling completeness
- Testing gaps
- Documentation needs

Provide specific fixes with explanations.
```

### Architecture Review
```
Review this system architecture for [scalability, maintainability, security]:

[ARCHITECTURE DESCRIPTION/DIAGRAM]

Evaluate:
- Component boundaries and responsibilities
- Data flow and state management
- Integration patterns
- Failure modes and resilience
- Performance bottlenecks
- Operational complexity

Suggest improvements with implementation guidance.
```

## Success Metrics

Track the effectiveness of your prompts:

### Response Quality
- ✅ Code compiles and runs immediately
- ✅ Follows current best practices
- ✅ Includes proper error handling
- ✅ Contains helpful explanations
- ✅ Addresses edge cases

### Learning Acceleration
- ✅ Builds on existing knowledge appropriately
- ✅ Introduces new concepts progressively
- ✅ Provides actionable next steps
- ✅ Includes validation mechanisms
- ✅ Connects to broader patterns

### Productivity Gains
- ✅ Reduces back-and-forth iterations
- ✅ Prevents common implementation mistakes
- ✅ Includes performance considerations upfront
- ✅ Suggests testing strategies
- ✅ Provides maintenance considerations

---

*These patterns evolve based on user feedback and Claude Code capability improvements. Contribute your successful prompts to help the community.*