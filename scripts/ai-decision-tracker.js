#!/usr/bin/env node

/**
 * AI Decision Tracking Framework
 *
 * Tracks which AI tools make which decisions, measures effectiveness,
 * and provides insights for optimizing AI-native development workflows.
 *
 * Compatible with your existing monitoring infrastructure.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 28, 2025
 */

const fs = require('fs').promises;
const path = require('path');

class AIDecisionTracker {
  constructor() {
    this.trackerPath = path.join(__dirname, '..', 'claudedocs', 'ai-decisions');
    this.configPath = path.join(__dirname, '..', 'config', 'ai-decision-tracking.json');

    // AI Tools being tracked
    this.aiTools = {
      'claude-code': { name: 'Claude Code CLI', cost_per_1k: 0.015, strengths: ['architecture', 'production-code', 'security'] },
      'gemini': { name: 'Gemini CLI', cost_per_1k: 0.000, strengths: ['analysis', 'documentation', 'free-tier'] },
      'codex': { name: 'GitHub Copilot/Codex', cost_per_1k: 0.012, strengths: ['speed', 'experimentation', 'bulk-generation'] }
    };

    this.decisionTypes = [
      'architecture', 'component-creation', 'debugging', 'optimization',
      'testing', 'documentation', 'security-review', 'refactoring'
    ];
  }

  /**
   * Initialize tracking directories and config
   */
  async initialize() {
    try {
      // Create tracking directory
      await fs.mkdir(this.trackerPath, { recursive: true });

      // Create config if it doesn't exist
      await this.createDefaultConfig();

      console.log('✅ AI Decision Tracker initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize tracker:', error.message);
      return false;
    }
  }

  /**
   * Log an AI decision
   */
  async logDecision(data) {
    const decision = {
      id: `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      tool: data.tool, // 'claude-code', 'gemini', 'codex'
      task: data.task, // 'architecture', 'component', 'debug', etc.
      context: {
        files_affected: data.files_affected || [],
        lines_changed: data.lines_changed || 0,
        prompt_tokens: data.prompt_tokens || 0,
        completion_tokens: data.completion_tokens || 0,
        stack_components: data.stack_components || [] // Next.js, React, TypeScript, etc.
      },
      outcome: data.outcome, // 'success', 'failure', 'iteration', 'abandoned'
      quality_score: data.quality_score, // 1-10 subjective rating
      time_saved_minutes: data.time_saved_minutes || 0,
      cost_usd: this.calculateCost(data.tool, data.prompt_tokens + data.completion_tokens),
      notes: data.notes || '',
      session_id: data.session_id || 'default'
    };

    // Save to daily log
    const today = new Date().toISOString().split('T')[0];
    const dailyLogPath = path.join(this.trackerPath, `decisions-${today}.jsonl`);

    try {
      await fs.appendFile(dailyLogPath, JSON.stringify(decision) + '\n');
      console.log(`📝 Decision logged: ${decision.tool} → ${decision.task} (${decision.outcome})`);
      return decision.id;
    } catch (error) {
      console.error('❌ Failed to log decision:', error.message);
      return null;
    }
  }

  /**
   * Get decision analytics
   */
  async getAnalytics(days = 7) {
    try {
      const decisions = await this.loadRecentDecisions(days);

      if (decisions.length === 0) {
        return {
          message: 'No decisions logged yet',
          recommendation: 'Start logging AI decisions to get insights!'
        };
      }

      const analytics = {
        summary: {
          total_decisions: decisions.length,
          days_analyzed: days,
          total_cost: decisions.reduce((sum, d) => sum + d.cost_usd, 0).toFixed(4),
          total_time_saved: decisions.reduce((sum, d) => sum + d.time_saved_minutes, 0)
        },
        by_tool: {},
        by_task: {},
        by_outcome: {},
        recommendations: []
      };

      // Group by tool
      decisions.forEach(decision => {
        if (!analytics.by_tool[decision.tool]) {
          analytics.by_tool[decision.tool] = {
            count: 0,
            success_rate: 0,
            avg_quality: 0,
            total_cost: 0,
            time_saved: 0
          };
        }

        const tool = analytics.by_tool[decision.tool];
        tool.count++;
        tool.total_cost += decision.cost_usd;
        tool.time_saved += decision.time_saved_minutes;
      });

      // Calculate success rates and averages
      Object.keys(analytics.by_tool).forEach(toolName => {
        const toolDecisions = decisions.filter(d => d.tool === toolName);
        const successful = toolDecisions.filter(d => d.outcome === 'success');

        analytics.by_tool[toolName].success_rate =
          ((successful.length / toolDecisions.length) * 100).toFixed(1);
        analytics.by_tool[toolName].avg_quality =
          (toolDecisions.reduce((sum, d) => sum + d.quality_score, 0) / toolDecisions.length).toFixed(1);
      });

      // Generate recommendations
      analytics.recommendations = this.generateRecommendations(analytics, decisions);

      return analytics;
    } catch (error) {
      console.error('❌ Failed to generate analytics:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations(analytics, decisions) {
    const recommendations = [];

    // Cost optimization
    const totalCost = parseFloat(analytics.summary.total_cost);
    if (totalCost > 50) {
      recommendations.push({
        type: 'cost-optimization',
        priority: 'high',
        message: `Monthly AI costs projected at $${(totalCost * 30 / analytics.summary.days_analyzed).toFixed(2)}. Consider using Gemini (free) for more tasks.`
      });
    }

    // Tool efficiency analysis
    Object.entries(analytics.by_tool).forEach(([tool, stats]) => {
      if (stats.success_rate < 70) {
        recommendations.push({
          type: 'success-rate',
          priority: 'medium',
          message: `${tool} has ${stats.success_rate}% success rate. Consider switching tools for similar tasks.`
        });
      }

      if (parseFloat(stats.avg_quality) < 6) {
        recommendations.push({
          type: 'quality',
          priority: 'medium',
          message: `${tool} average quality is ${stats.avg_quality}/10. May need better prompting or different tool.`
        });
      }
    });

    // Usage pattern recommendations
    const claudeUsage = decisions.filter(d => d.tool === 'claude-code').length;
    const geminiUsage = decisions.filter(d => d.tool === 'gemini').length;

    if (claudeUsage > geminiUsage * 3) {
      recommendations.push({
        type: 'usage-pattern',
        priority: 'low',
        message: 'Consider using Gemini (free) for more exploratory tasks before escalating to Claude.'
      });
    }

    return recommendations;
  }

  /**
   * Load recent decisions
   */
  async loadRecentDecisions(days) {
    const decisions = [];
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const filePath = path.join(this.trackerPath, `decisions-${dateStr}.jsonl`);

      try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.trim().split('\n').filter(line => line.trim());
        lines.forEach(line => {
          try {
            decisions.push(JSON.parse(line));
          } catch (e) {
            console.warn(`Skipping invalid decision line: ${line}`);
          }
        });
      } catch (error) {
        // File doesn't exist for this date, skip
      }
    }

    return decisions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Calculate cost based on tool and token usage
   */
  calculateCost(tool, totalTokens) {
    if (!this.aiTools[tool]) return 0;
    return (totalTokens / 1000) * this.aiTools[tool].cost_per_1k;
  }

  /**
   * Create default configuration
   */
  async createDefaultConfig() {
    const defaultConfig = {
      ai_decision_tracking: {
        version: "1.0.0",
        enabled: true,
        auto_log: false,
        retention_days: 90,
        ai_tools: this.aiTools,
        decision_types: this.decisionTypes,
        quality_thresholds: {
          excellent: 8,
          good: 6,
          needs_improvement: 4
        },
        cost_alerts: {
          daily_threshold: 5.00,
          monthly_threshold: 100.00
        }
      }
    };

    try {
      await fs.access(this.configPath);
    } catch {
      await fs.writeFile(this.configPath, JSON.stringify(defaultConfig, null, 2));
      console.log('✅ Created default AI decision tracking config');
    }
  }

  /**
   * Integration helper for your existing monitoring
   */
  async integrateWithMonitoring() {
    // This creates a bridge to your existing monitoring system
    const integrationScript = `
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
`;

    const integrationPath = path.join(__dirname, '..', 'claudedocs', 'ai-integration-guide.md');
    await fs.writeFile(integrationPath, integrationScript);
    console.log('📋 Integration guide created at claudedocs/ai-integration-guide.md');
  }
}

// CLI Interface
async function main() {
  const tracker = new AIDecisionTracker();
  const command = process.argv[2];

  switch (command) {
    case 'init':
      await tracker.initialize();
      await tracker.integrateWithMonitoring();
      break;

    case 'log':
      // Example logging - in real use, this would come from your AI interactions
      await tracker.logDecision({
        tool: 'claude-code',
        task: 'architecture',
        files_affected: ['README.md'],
        lines_changed: 0,
        prompt_tokens: 500,
        completion_tokens: 200,
        stack_components: ['Documentation'],
        outcome: 'success',
        quality_score: 9,
        time_saved_minutes: 15,
        notes: 'Implemented decision tracking framework'
      });
      break;

    case 'analytics':
      const days = parseInt(process.argv[3]) || 7;
      const analytics = await tracker.getAnalytics(days);
      console.log('\n📊 AI Decision Analytics');
      console.log('========================');
      console.log(JSON.stringify(analytics, null, 2));
      break;

    case 'dashboard':
      const recentAnalytics = await tracker.getAnalytics(7);
      console.log('\n🎯 AI Usage Dashboard (Last 7 Days)');
      console.log('====================================');

      if (recentAnalytics.summary) {
        console.log(`Total Decisions: ${recentAnalytics.summary.total_decisions}`);
        console.log(`Total Cost: $${recentAnalytics.summary.total_cost}`);
        console.log(`Time Saved: ${recentAnalytics.summary.total_time_saved} minutes`);
        console.log('\nBy Tool:');
        Object.entries(recentAnalytics.by_tool).forEach(([tool, stats]) => {
          console.log(`  ${tool}: ${stats.count} decisions, ${stats.success_rate}% success, quality ${stats.avg_quality}/10`);
        });

        if (recentAnalytics.recommendations.length > 0) {
          console.log('\n💡 Recommendations:');
          recentAnalytics.recommendations.forEach(rec => {
            console.log(`  ${rec.priority.toUpperCase()}: ${rec.message}`);
          });
        }
      } else {
        console.log(recentAnalytics.message || 'No data available');
        console.log('Run: npm run ai:decision-log to start tracking');
      }
      break;

    default:
      console.log(`
🤖 AI Decision Tracker

Usage:
  node scripts/ai-decision-tracker.js <command>

Commands:
  init        Initialize tracking system
  log         Log a test decision
  analytics   Show detailed analytics (optionally specify days)
  dashboard   Show quick dashboard

Integration:
  Add to package.json:
  "ai:decision-init": "node scripts/ai-decision-tracker.js init"
  "ai:decision-log": "node scripts/ai-decision-tracker.js log"
  "ai:decision-dashboard": "node scripts/ai-decision-tracker.js dashboard"
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AIDecisionTracker;