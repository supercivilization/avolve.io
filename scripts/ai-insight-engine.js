#!/usr/bin/env node

/**
 * AI-Powered Insight Engine for GitHub Intelligence Data
 * Leverages MCP integration to analyze reports and generate actionable insights
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AIInsightEngine {
  constructor() {
    this.reportsDir = path.join(__dirname, '..', 'reports');
    this.insightsDir = path.join(__dirname, '..', 'claudedocs', 'insights');
  }

  async init() {
    // Ensure insights directory exists
    await fs.mkdir(this.insightsDir, { recursive: true });
    console.log('🚀 AI Insight Engine Initialized');
    console.log('📊 Analyzing GitHub Intelligence Reports...\n');
  }

  async getLatestReport() {
    const files = await fs.readdir(this.reportsDir);
    const reportFiles = files
      .filter(file => file.includes('github-intelligence') && file.endsWith('.json'))
      .sort()
      .reverse();

    if (reportFiles.length === 0) {
      throw new Error('No GitHub intelligence reports found');
    }

    const latestFile = reportFiles[0];
    const reportPath = path.join(this.reportsDir, latestFile);
    const content = await fs.readFile(reportPath, 'utf-8');

    return {
      filename: latestFile,
      data: JSON.parse(content)
    };
  }

  analyzeEcosystemHealth(report) {
    const insights = [];
    const ecosystems = Object.keys(report.ecosystem);

    for (const ecosystem of ecosystems) {
      const repos = report.ecosystem[ecosystem].repositories || {};
      const repoCount = Object.keys(repos).length;

      let totalIssues = 0;
      let highPriorityIssues = 0;
      let healthyRepos = 0;

      for (const [repoName, repoData] of Object.entries(repos)) {
        if (repoData.issues) {
          totalIssues += repoData.issues.total_open || 0;
          highPriorityIssues += repoData.issues.high_priority || 0;

          // Consider repo healthy if issues < 30 and high priority < 5
          if ((repoData.issues.total_open || 0) < 30 && (repoData.issues.high_priority || 0) < 5) {
            healthyRepos++;
          }
        }
      }

      const healthScore = Math.round((healthyRepos / repoCount) * 100);

      insights.push({
        ecosystem,
        repoCount,
        totalIssues,
        highPriorityIssues,
        healthScore,
        status: healthScore > 70 ? '🟢 HEALTHY' : healthScore > 40 ? '🟡 CAUTION' : '🔴 CRITICAL'
      });
    }

    return insights;
  }

  identifyTrends(report) {
    const trends = [];

    // Analyze issue patterns
    const allRepos = [];
    for (const ecosystem of Object.values(report.ecosystem)) {
      if (ecosystem.repositories) {
        allRepos.push(...Object.values(ecosystem.repositories));
      }
    }

    // Find repos with high activity
    const highActivityRepos = allRepos
      .filter(repo => repo.issues && repo.issues.total_open > 50)
      .sort((a, b) => (b.issues?.total_open || 0) - (a.issues?.total_open || 0))
      .slice(0, 5);

    if (highActivityRepos.length > 0) {
      trends.push({
        type: 'HIGH_ACTIVITY',
        title: 'Repositories with High Issue Activity',
        description: 'These repositories show high development activity',
        repos: highActivityRepos.map(repo => ({
          name: repo.repository,
          issues: repo.issues.total_open,
          highPriority: repo.issues.high_priority
        }))
      });
    }

    // Find stable repositories
    const stableRepos = allRepos
      .filter(repo => repo.issues && repo.issues.total_open < 15 && repo.issues.high_priority < 3)
      .slice(0, 5);

    if (stableRepos.length > 0) {
      trends.push({
        type: 'STABLE',
        title: 'Most Stable Repositories',
        description: 'These repositories show excellent maintenance and stability',
        repos: stableRepos.map(repo => ({
          name: repo.repository,
          issues: repo.issues.total_open,
          highPriority: repo.issues.high_priority
        }))
      });
    }

    return trends;
  }

  generateDevelopmentRecommendations(ecosystemHealth, trends) {
    const recommendations = [];

    // Based on ecosystem health
    const criticalEcosystems = ecosystemHealth.filter(e => e.healthScore < 50);
    if (criticalEcosystems.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'RISK_MITIGATION',
        title: 'Critical Ecosystem Dependencies',
        description: `${criticalEcosystems.length} ecosystem(s) show concerning health scores`,
        action: 'Consider alternative solutions or contribute to issue resolution',
        ecosystems: criticalEcosystems.map(e => e.ecosystem)
      });
    }

    // Based on trends
    const highActivityTrend = trends.find(t => t.type === 'HIGH_ACTIVITY');
    if (highActivityTrend) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'OPPORTUNITY',
        title: 'High Activity Repositories',
        description: 'These repositories show rapid development - consider early adoption',
        action: 'Monitor for breaking changes and new features',
        repos: highActivityTrend.repos.slice(0, 3).map(r => r.name)
      });
    }

    // MCP-specific recommendations
    const mcpRepos = ecosystemHealth.find(e => e.ecosystem === 'critical_ai');
    if (mcpRepos) {
      recommendations.push({
        priority: 'HIGH',
        category: 'MCP_INTEGRATION',
        title: 'Model Context Protocol Development',
        description: `MCP ecosystem health score: ${mcpRepos.healthScore}%`,
        action: mcpRepos.healthScore > 70
          ? 'Excellent time to implement MCP features'
          : 'Monitor development closely before major implementations'
      });
    }

    return recommendations;
  }

  async generateInsightReport(report) {
    const ecosystemHealth = this.analyzeEcosystemHealth(report.data);
    const trends = this.identifyTrends(report.data);
    const recommendations = this.generateDevelopmentRecommendations(ecosystemHealth, trends);

    const insight = {
      metadata: {
        generated_at: new Date().toISOString(),
        source_report: report.filename,
        engine_version: '1.0.0',
        mcp_enabled: true
      },
      executive_summary: {
        total_repositories: Object.values(report.data.ecosystem)
          .reduce((acc, eco) => acc + Object.keys(eco.repositories || {}).length, 0),
        average_health_score: Math.round(
          ecosystemHealth.reduce((acc, e) => acc + e.healthScore, 0) / ecosystemHealth.length
        ),
        critical_issues: ecosystemHealth.reduce((acc, e) => acc + e.highPriorityIssues, 0),
        recommendations_count: recommendations.length
      },
      ecosystem_health: ecosystemHealth,
      trends: trends,
      recommendations: recommendations,
      next_analysis: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours
    };

    return insight;
  }

  async saveInsight(insight) {
    const timestamp = insight.metadata.generated_at.replace(/[:.]/g, '-');
    const filename = `ai-ecosystem-insights-${timestamp}.json`;
    const filepath = path.join(this.insightsDir, filename);

    await fs.writeFile(filepath, JSON.stringify(insight, null, 2));

    // Also create a markdown summary
    await this.createMarkdownSummary(insight, timestamp);

    return filepath;
  }

  async createMarkdownSummary(insight, timestamp) {
    const md = `# AI Ecosystem Intelligence Report
*Generated: ${new Date(insight.metadata.generated_at).toLocaleString()}*

## Executive Summary
- **Total Repositories Monitored:** ${insight.executive_summary.total_repositories}
- **Average Health Score:** ${insight.executive_summary.average_health_score}%
- **Critical Issues:** ${insight.executive_summary.critical_issues}
- **Actionable Recommendations:** ${insight.executive_summary.recommendations_count}

## Ecosystem Health Overview

${insight.ecosystem_health.map(eco =>
  `### ${eco.ecosystem.toUpperCase()} ${eco.status}
- **Repositories:** ${eco.repoCount}
- **Health Score:** ${eco.healthScore}%
- **Total Issues:** ${eco.totalIssues}
- **High Priority:** ${eco.highPriorityIssues}
`).join('\n')}

## Key Trends

${insight.trends.map(trend =>
  `### ${trend.title}
${trend.description}

${trend.repos.map(repo => `- **${repo.name}**: ${repo.issues} issues (${repo.highPriority} high priority)`).join('\n')}
`).join('\n')}

## Development Recommendations

${insight.recommendations.map((rec, index) =>
  `### ${index + 1}. ${rec.title} (${rec.priority} Priority)
**Category:** ${rec.category}
**Description:** ${rec.description}
**Action:** ${rec.action}
${rec.ecosystems ? `**Affected Ecosystems:** ${rec.ecosystems.join(', ')}` : ''}
${rec.repos ? `**Key Repositories:** ${rec.repos.join(', ')}` : ''}
`).join('\n')}

---
*Generated by Avolve AI-Native Platform with MCP Integration*
`;

    const mdPath = path.join(this.insightsDir, `ai-ecosystem-insights-${timestamp}.md`);
    await fs.writeFile(mdPath, md);
    return mdPath;
  }

  async run() {
    try {
      await this.init();

      const report = await this.getLatestReport();
      console.log(`📄 Processing: ${report.filename}`);

      const insight = await this.generateInsightReport(report);
      const filepath = await this.saveInsight(insight);

      console.log('\n✅ AI Insight Generation Complete!');
      console.log(`📊 Insight Report: ${filepath}`);
      console.log(`📝 Markdown Summary: ${filepath.replace('.json', '.md')}`);
      console.log('\n📈 Executive Summary:');
      console.log(`   • ${insight.executive_summary.total_repositories} repositories monitored`);
      console.log(`   • ${insight.executive_summary.average_health_score}% average health score`);
      console.log(`   • ${insight.executive_summary.critical_issues} critical issues identified`);
      console.log(`   • ${insight.executive_summary.recommendations_count} actionable recommendations`);

      if (insight.recommendations.length > 0) {
        console.log('\n🎯 Top Recommendation:');
        const topRec = insight.recommendations[0];
        console.log(`   ${topRec.priority}: ${topRec.title}`);
        console.log(`   ${topRec.description}`);
      }

    } catch (error) {
      console.error('❌ Error generating insights:', error.message);
      process.exit(1);
    }
  }
}

// Command-line interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const engine = new AIInsightEngine();
  engine.run();
}