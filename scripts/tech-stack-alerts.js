#!/usr/bin/env node

/**
 * Tech Stack Alert System
 *
 * Intelligent alerting system for critical developments in the modern tech stack.
 * Monitors for breaking changes, security vulnerabilities, major releases,
 * and performance issues across all monitored platforms.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 25, 2025
 */

const fs = require('fs').promises;
const path = require('path');

class TechStackAlertSystem {
  constructor() {
    this.alertsPath = path.join(__dirname, '..', 'alerts');
    this.configPath = path.join(__dirname, '..', 'config', 'modern-tech-stack-monitoring.json');
    this.config = null;
    this.activeAlerts = [];
  }

  /**
   * Process monitoring results and generate alerts
   */
  async processMonitoringResults(resultsPath) {
    console.log('🚨 Tech Stack Alert Processing');
    console.log('=' .repeat(40));

    // Load configuration
    await this.loadConfiguration();

    // Load monitoring results
    const results = await this.loadMonitoringResults(resultsPath);

    // Process each platform's results
    for (const platformResult of results.results) {
      await this.processPlatformResults(platformResult);
    }

    // Generate alert summary
    await this.generateAlertSummary(results.timestamp);

    console.log(`\\n📊 Alert Processing Complete: ${this.activeAlerts.length} alerts generated`);
  }

  /**
   * Load monitoring configuration
   */
  async loadConfiguration() {
    const configData = await fs.readFile(this.configPath, 'utf8');
    this.config = JSON.parse(configData).modernTechStackMonitoring;
  }

  /**
   * Load monitoring results from JSON file
   */
  async loadMonitoringResults(resultsPath) {
    const resultsData = await fs.readFile(resultsPath, 'utf8');
    return JSON.parse(resultsData);
  }

  /**
   * Process results from a specific platform
   */
  async processPlatformResults(platformResult) {
    const { platform, data } = platformResult;
    console.log(`\\n🔍 Processing ${platform} alerts...`);

    const alertConfig = this.config.monitoringConfiguration.alerting;

    for (const item of data) {
      const alerts = this.analyzeItemForAlerts(item, platform, alertConfig);
      this.activeAlerts.push(...alerts);
    }

    console.log(`   ✅ ${platform}: Found ${data.filter(item => this.hasAlert(item, alertConfig)).length} alert-worthy items`);
  }

  /**
   * Analyze individual item for alert conditions
   */
  analyzeItemForAlerts(item, platform, alertConfig) {
    const alerts = [];
    const content = this.getItemContent(item).toLowerCase();

    // Critical alerts
    for (const keyword of alertConfig.critical.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        alerts.push({
          level: 'critical',
          platform,
          type: 'security_or_breaking',
          title: item.title || item.name,
          content: this.truncateContent(content),
          keyword: keyword,
          url: item.url || item.html_url,
          timestamp: new Date().toISOString(),
          relevance_score: item.relevance_score,
          item: item
        });
      }
    }

    // Important alerts
    for (const keyword of alertConfig.important.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        alerts.push({
          level: 'important',
          platform,
          type: 'release_or_update',
          title: item.title || item.name,
          content: this.truncateContent(content),
          keyword: keyword,
          url: item.url || item.html_url,
          timestamp: new Date().toISOString(),
          relevance_score: item.relevance_score,
          item: item
        });
      }
    }

    // High relevance score alerts
    if (item.relevance_score >= 80) {
      alerts.push({
        level: 'important',
        platform,
        type: 'high_relevance',
        title: item.title || item.name,
        content: this.truncateContent(content),
        keyword: 'high_relevance_score',
        url: item.url || item.html_url,
        timestamp: new Date().toISOString(),
        relevance_score: item.relevance_score,
        item: item
      });
    }

    // Framework-specific alerts
    const frameworkAlerts = this.checkFrameworkSpecificAlerts(item, platform);
    alerts.push(...frameworkAlerts);

    return alerts;
  }

  /**
   * Check for framework-specific alert conditions
   */
  checkFrameworkSpecificAlerts(item, platform) {
    const alerts = [];
    const content = this.getItemContent(item).toLowerCase();

    // Next.js specific alerts
    if (content.includes('next.js') || content.includes('nextjs')) {
      if (content.includes('turbopack') && (content.includes('production') || content.includes('issue'))) {
        alerts.push(this.createFrameworkAlert(item, platform, 'Next.js Turbopack Production Issue', 'critical'));
      }
      if (content.includes('app router') && content.includes('breaking')) {
        alerts.push(this.createFrameworkAlert(item, platform, 'Next.js App Router Breaking Change', 'critical'));
      }
    }

    // React specific alerts
    if (content.includes('react') && content.includes('19')) {
      if (content.includes('breaking') || content.includes('migration')) {
        alerts.push(this.createFrameworkAlert(item, platform, 'React 19 Breaking Changes', 'critical'));
      }
    }

    // Tailwind specific alerts
    if (content.includes('tailwind') && content.includes('v4')) {
      if (content.includes('breaking') || content.includes('migration')) {
        alerts.push(this.createFrameworkAlert(item, platform, 'Tailwind v4 Migration Required', 'important'));
      }
    }

    // Security alerts for any framework
    if (content.includes('security') || content.includes('vulnerability') || content.includes('cve')) {
      alerts.push(this.createFrameworkAlert(item, platform, 'Security Vulnerability Detected', 'critical'));
    }

    return alerts;
  }

  /**
   * Create framework-specific alert
   */
  createFrameworkAlert(item, platform, alertTitle, level) {
    return {
      level,
      platform,
      type: 'framework_specific',
      title: alertTitle,
      originalTitle: item.title || item.name,
      content: this.truncateContent(this.getItemContent(item)),
      url: item.url || item.html_url,
      timestamp: new Date().toISOString(),
      relevance_score: item.relevance_score,
      item: item
    };
  }

  /**
   * Get content from item for analysis
   */
  getItemContent(item) {
    return [
      item.title || '',
      item.name || '',
      item.description || '',
      item.content || '',
      item.body || '',
      item.selftext || ''
    ].filter(Boolean).join(' ');
  }

  /**
   * Truncate content for alert display
   */
  truncateContent(content, maxLength = 200) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  /**
   * Check if item has any alert conditions
   */
  hasAlert(item, alertConfig) {
    const content = this.getItemContent(item).toLowerCase();

    const allKeywords = [
      ...alertConfig.critical.keywords,
      ...alertConfig.important.keywords
    ];

    return allKeywords.some(keyword => content.includes(keyword.toLowerCase())) ||
           item.relevance_score >= 80 ||
           this.hasFrameworkSpecificAlert(content);
  }

  /**
   * Check for framework-specific alert conditions
   */
  hasFrameworkSpecificAlert(content) {
    return (
      (content.includes('next.js') && content.includes('turbopack') && content.includes('issue')) ||
      (content.includes('react') && content.includes('19') && content.includes('breaking')) ||
      (content.includes('tailwind') && content.includes('v4') && content.includes('migration')) ||
      content.includes('security') ||
      content.includes('vulnerability')
    );
  }

  /**
   * Generate alert summary and save to files
   */
  async generateAlertSummary(timestamp) {
    // Create alerts directory
    await fs.mkdir(this.alertsPath, { recursive: true });

    // Group alerts by level
    const criticalAlerts = this.activeAlerts.filter(alert => alert.level === 'critical');
    const importantAlerts = this.activeAlerts.filter(alert => alert.level === 'important');

    // Generate alert summary
    const alertSummary = {
      timestamp,
      total_alerts: this.activeAlerts.length,
      critical_count: criticalAlerts.length,
      important_count: importantAlerts.length,
      alerts: {
        critical: criticalAlerts,
        important: importantAlerts
      },
      platforms: this.getAlertsByPlatform(),
      frameworks: this.getAlertsByFramework()
    };

    // Save JSON alert file
    const alertsFile = path.join(this.alertsPath, `tech-stack-alerts-${Date.now()}.json`);
    await fs.writeFile(alertsFile, JSON.stringify(alertSummary, null, 2));

    // Generate markdown alert digest
    const digestFile = path.join(this.alertsPath, 'current-alerts-digest.md');
    await this.generateAlertDigest(alertSummary, digestFile);

    // Generate console output
    this.displayAlertSummary(alertSummary);

    console.log(`\\n📁 Alerts saved to: ${alertsFile}`);
    console.log(`📄 Alert digest: ${digestFile}`);
  }

  /**
   * Group alerts by platform
   */
  getAlertsByPlatform() {
    const platforms = {};
    for (const alert of this.activeAlerts) {
      if (!platforms[alert.platform]) {
        platforms[alert.platform] = { critical: 0, important: 0, alerts: [] };
      }
      platforms[alert.platform][alert.level]++;
      platforms[alert.platform].alerts.push(alert);
    }
    return platforms;
  }

  /**
   * Group alerts by framework/technology
   */
  getAlertsByFramework() {
    const frameworks = {};
    for (const alert of this.activeAlerts) {
      const content = alert.content.toLowerCase();
      let framework = 'general';

      if (content.includes('next.js') || content.includes('nextjs')) framework = 'Next.js';
      else if (content.includes('react')) framework = 'React';
      else if (content.includes('tailwind')) framework = 'Tailwind CSS';
      else if (content.includes('typescript')) framework = 'TypeScript';
      else if (content.includes('supabase')) framework = 'Supabase';
      else if (content.includes('vercel')) framework = 'Vercel';

      if (!frameworks[framework]) {
        frameworks[framework] = { critical: 0, important: 0, alerts: [] };
      }
      frameworks[framework][alert.level]++;
      frameworks[framework].alerts.push(alert);
    }
    return frameworks;
  }

  /**
   * Display alert summary in console
   */
  displayAlertSummary(alertSummary) {
    console.log('\\n🚨 TECH STACK ALERT SUMMARY');
    console.log('=' .repeat(50));

    if (alertSummary.critical_count > 0) {
      console.log(`\\n🔴 CRITICAL ALERTS (${alertSummary.critical_count})`);
      console.log('-'.repeat(30));
      for (const alert of alertSummary.alerts.critical.slice(0, 5)) {
        console.log(`   • ${alert.title}`);
        console.log(`     Platform: ${alert.platform} | Score: ${alert.relevance_score}`);
        console.log(`     ${alert.content.substring(0, 100)}...`);
        console.log('');
      }
    }

    if (alertSummary.important_count > 0) {
      console.log(`\\n🟡 IMPORTANT ALERTS (${alertSummary.important_count})`);
      console.log('-'.repeat(30));
      for (const alert of alertSummary.alerts.important.slice(0, 3)) {
        console.log(`   • ${alert.title}`);
        console.log(`     Platform: ${alert.platform} | Score: ${alert.relevance_score}`);
        console.log('');
      }
    }

    if (alertSummary.total_alerts === 0) {
      console.log('✅ No critical alerts detected. Tech stack ecosystem appears stable.');
    }

    console.log('\\n📊 PLATFORM BREAKDOWN:');
    for (const [platform, data] of Object.entries(alertSummary.platforms)) {
      console.log(`   ${platform}: ${data.critical} critical, ${data.important} important`);
    }
  }

  /**
   * Generate markdown alert digest
   */
  async generateAlertDigest(alertSummary, digestFile) {
    let markdown = `# Tech Stack Alert Digest
*Generated: ${alertSummary.timestamp}*

## 📊 Summary
- **Total Alerts**: ${alertSummary.total_alerts}
- **Critical**: ${alertSummary.critical_count}
- **Important**: ${alertSummary.important_count}

`;

    if (alertSummary.critical_count > 0) {
      markdown += `## 🔴 Critical Alerts

`;
      for (const alert of alertSummary.alerts.critical) {
        markdown += `### ${alert.title}
- **Platform**: ${alert.platform}
- **Type**: ${alert.type}
- **Relevance Score**: ${alert.relevance_score}
- **Content**: ${alert.content}
- **URL**: ${alert.url || 'N/A'}

`;
      }
    }

    if (alertSummary.important_count > 0) {
      markdown += `## 🟡 Important Alerts

`;
      for (const alert of alertSummary.alerts.important.slice(0, 10)) {
        markdown += `### ${alert.title}
- **Platform**: ${alert.platform}
- **Relevance Score**: ${alert.relevance_score}
- **URL**: ${alert.url || 'N/A'}

`;
      }
    }

    markdown += `## 📈 Platform Breakdown

`;
    for (const [platform, data] of Object.entries(alertSummary.platforms)) {
      markdown += `- **${platform}**: ${data.critical} critical, ${data.important} important
`;
    }

    markdown += `
---
*Powered by Avolve Tech Stack Alert System v1.0*
`;

    await fs.writeFile(digestFile, markdown);
  }

  /**
   * Check for specific high-priority conditions
   */
  async runCriticalChecks(resultsPath) {
    console.log('🚨 Running Critical Tech Stack Checks');
    console.log('=' .repeat(40));

    const results = await this.loadMonitoringResults(resultsPath);
    const criticalIssues = [];

    // Check for Turbopack production issues
    const turbopackIssues = this.findTurbopackIssues(results);
    if (turbopackIssues.length > 0) {
      criticalIssues.push({
        type: 'turbopack_production',
        severity: 'critical',
        count: turbopackIssues.length,
        description: 'Turbopack production issues detected'
      });
    }

    // Check for React 19 breaking changes
    const reactBreaking = this.findReactBreakingChanges(results);
    if (reactBreaking.length > 0) {
      criticalIssues.push({
        type: 'react_19_breaking',
        severity: 'critical',
        count: reactBreaking.length,
        description: 'React 19 breaking changes reported'
      });
    }

    // Check for security vulnerabilities
    const securityIssues = this.findSecurityVulnerabilities(results);
    if (securityIssues.length > 0) {
      criticalIssues.push({
        type: 'security_vulnerability',
        severity: 'critical',
        count: securityIssues.length,
        description: 'Security vulnerabilities detected'
      });
    }

    console.log(`\\n📊 Critical Checks Complete: ${criticalIssues.length} critical issues found`);

    if (criticalIssues.length > 0) {
      console.log('\\n🚨 IMMEDIATE ACTION REQUIRED:');
      for (const issue of criticalIssues) {
        console.log(`   • ${issue.description} (${issue.count} instances)`);
      }
    } else {
      console.log('✅ No critical issues detected in tech stack');
    }

    return criticalIssues;
  }

  /**
   * Find Turbopack production issues
   */
  findTurbopackIssues(results) {
    const issues = [];
    for (const platformResult of results.results) {
      for (const item of platformResult.data) {
        const content = this.getItemContent(item).toLowerCase();
        if (content.includes('turbopack') &&
            (content.includes('production') || content.includes('bundle size') || content.includes('issue'))) {
          issues.push(item);
        }
      }
    }
    return issues;
  }

  /**
   * Find React 19 breaking changes
   */
  findReactBreakingChanges(results) {
    const issues = [];
    for (const platformResult of results.results) {
      for (const item of platformResult.data) {
        const content = this.getItemContent(item).toLowerCase();
        if (content.includes('react') && content.includes('19') &&
            (content.includes('breaking') || content.includes('migration required'))) {
          issues.push(item);
        }
      }
    }
    return issues;
  }

  /**
   * Find security vulnerabilities
   */
  findSecurityVulnerabilities(results) {
    const issues = [];
    for (const platformResult of results.results) {
      for (const item of platformResult.data) {
        const content = this.getItemContent(item).toLowerCase();
        if (content.includes('security') || content.includes('vulnerability') || content.includes('cve')) {
          issues.push(item);
        }
      }
    }
    return issues;
  }
}

// CLI Interface
async function main() {
  const alertSystem = new TechStackAlertSystem();
  const command = process.argv[2] || 'help';
  const resultsFile = process.argv[3];

  try {
    switch (command) {
      case 'process':
        if (!resultsFile) {
          console.error('❌ Please provide results file path');
          process.exit(1);
        }
        await alertSystem.processMonitoringResults(resultsFile);
        break;

      case 'critical':
        if (!resultsFile) {
          console.error('❌ Please provide results file path');
          process.exit(1);
        }
        await alertSystem.runCriticalChecks(resultsFile);
        break;

      default:
        console.log(`
🚨 Tech Stack Alert System v1.0

Usage: node tech-stack-alerts.js <command> <results-file>

Commands:
  process   - Process monitoring results and generate alerts
  critical  - Run critical checks only

Example:
  node tech-stack-alerts.js process reports/comprehensive-tech-stack-monitoring-1234567890.json
        `);
    }
  } catch (error) {
    console.error('❌ Alert processing failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { TechStackAlertSystem };