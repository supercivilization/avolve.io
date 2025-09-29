# 🤖 AI Decision Tracking Framework

## Overview

This framework tracks AI tool usage, effectiveness, and costs to optimize your AI-native development workflow. It integrates seamlessly with your existing monitoring infrastructure.

## Quick Start

```bash
# Initialize the system
pnpm ai:decision:init

# View current dashboard
pnpm ai:decision:dashboard

# View detailed analytics
pnpm ai:decision:analytics
```

## How to Use in Your Daily Workflow

### 1. Manual Logging (Recommended to Start)

After using any AI tool for development tasks, log the decision:

```javascript
// In any script that uses AI
const AIDecisionTracker = require('./scripts/ai-decision-tracker.js');
const tracker = new AIDecisionTracker();

await tracker.logDecision({
  tool: 'claude-code', // or 'gemini', 'codex'
  task: 'component-creation', // see task types below
  files_affected: ['src/components/Dashboard.tsx'],
  lines_changed: 45,
  prompt_tokens: 1200, // approximate
  completion_tokens: 800, // approximate
  stack_components: ['Next.js', 'React', 'TypeScript'],
  outcome: 'success', // 'success', 'failure', 'iteration', 'abandoned'
  quality_score: 8, // 1-10 subjective rating
  time_saved_minutes: 30,
  notes: 'Created responsive dashboard with server components'
});
```

### 2. Task Types

- `architecture` - High-level system design decisions
- `component-creation` - Building new React components
- `debugging` - Troubleshooting and fixing issues
- `optimization` - Performance and code improvements
- `testing` - Writing or updating tests
- `documentation` - Creating or updating docs
- `security-review` - Security analysis and fixes
- `refactoring` - Code restructuring and cleanup

### 3. AI Tool Guidelines

**Claude Code** - Use for:
- Production code that will be deployed
- Complex architectural decisions
- Security-critical implementations
- Code reviews before commits

**Gemini** - Use for:
- Initial exploration and brainstorming
- Documentation and README updates
- Basic component scaffolding
- Analysis of existing code

**Codex** - Use for:
- Rapid prototyping and experiments
- Generating multiple solution variations
- Bulk code generation tasks
- When you need autonomous work while you focus elsewhere

## Dashboard Insights

### Cost Tracking
- Monitors daily/monthly AI costs
- Projects spending trends
- Alerts when approaching budget thresholds

### Effectiveness Metrics
- Success rate by tool and task type
- Average quality scores
- Time saved estimates
- ROI calculations

### Optimization Recommendations
- Suggests when to use free alternatives
- Identifies underperforming tool/task combinations
- Recommends workflow improvements

## Integration with Your Existing Stack

### With Your Monitoring Scripts

```javascript
// Add to existing monitoring scripts
const aiTracker = new (require('./ai-decision-tracker.js'))();

// When generating content with AI
const result = await generateWithAI(prompt);
await aiTracker.logDecision({
  tool: 'claude-code',
  task: 'content-generation',
  outcome: result.success ? 'success' : 'failure',
  // ... other fields
});
```

### With Your Package.json Scripts

Your package.json already includes these commands:

```json
{
  "ai:decision:init": "Initialize tracking system",
  "ai:decision:log": "Log a sample decision",
  "ai:decision:analytics": "Show detailed analytics",
  "ai:decision:dashboard": "Quick usage overview"
}
```

## Data Storage

- **Location**: `claudedocs/ai-decisions/`
- **Format**: Daily JSONL files (`decisions-YYYY-MM-DD.jsonl`)
- **Retention**: 90 days by default (configurable)
- **Privacy**: All data stays local, never uploaded

## Analytics Examples

### Weekly Report
```bash
pnpm ai:decision:analytics 7
```

Shows:
- Total decisions and costs
- Success rates by tool
- Quality scores
- Time savings
- Optimization recommendations

### Monthly Trends
```bash
pnpm ai:decision:analytics 30
```

Perfect for:
- Budget planning
- Workflow optimization
- Team reporting
- ROI analysis

## Best Practices

### 1. Consistent Logging
Log every significant AI interaction, not just successes.

### 2. Honest Quality Scores
Rate objectively:
- 9-10: Exceptional, deploy-ready
- 7-8: Good, minor tweaks needed
- 5-6: Acceptable, needs improvement
- 3-4: Poor, major issues
- 1-2: Failed, unusable

### 3. Track Context
Always include:
- Stack components involved
- Files affected
- Approximate token usage
- Time comparison vs manual work

### 4. Regular Reviews
Weekly dashboard reviews help optimize:
- Tool selection for different tasks
- Prompt strategies
- Cost management
- Workflow efficiency

## Configuration

Edit `config/ai-decision-tracking.json`:

```json
{
  "ai_decision_tracking": {
    "enabled": true,
    "auto_log": false, // Set true for automatic logging
    "retention_days": 90,
    "cost_alerts": {
      "daily_threshold": 5.00,
      "monthly_threshold": 100.00
    }
  }
}
```

## Future Enhancements

This framework is designed to evolve:

- **Auto-logging**: Detect AI usage automatically
- **Prompt optimization**: Track which prompts work best
- **Team analytics**: Compare effectiveness across developers
- **Model comparison**: A/B test different AI models
- **Integration APIs**: Connect with external tools

---

**Start tracking today** to optimize your AI-native development workflow and maximize ROI on AI tools!