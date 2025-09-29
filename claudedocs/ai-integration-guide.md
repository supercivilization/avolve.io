
# Add to your existing monitoring scripts:

# At the top of any script that uses AI:
const aiTracker = require('./scripts/ai-decision-tracker.js');

# When making an AI decision:
await aiTracker.logDecision({
  tool: 'claude-code',
  task: 'architecture',
  files_affected: ['src/components/Dashboard.tsx'],
  lines_changed: 45,
  prompt_tokens: 1200,
  completion_tokens: 800,
  stack_components: ['Next.js', 'React', 'TypeScript'],
  outcome: 'success',
  quality_score: 8,
  time_saved_minutes: 30,
  notes: 'Implemented server components architecture'
});
