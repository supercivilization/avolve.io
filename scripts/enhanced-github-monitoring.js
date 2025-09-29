#!/usr/bin/env node

/**
 * Enhanced GitHub Monitoring for Social Listening
 *
 * Comprehensive monitoring of GitHub repositories for:
 * - Releases and pre-releases
 * - Security advisories
 * - High-engagement issues and discussions
 * - Pull requests with breaking changes
 * - Community activity and contributor insights
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class EnhancedGitHubMonitoring {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.userAgent = 'Avolve-Social-Listening/1.0';

    // Critical repositories to monitor
    this.repositories = [
      // Core Framework Repositories
      { owner: 'vercel', repo: 'next.js', priority: 'critical', framework: 'next.js' },
      { owner: 'facebook', repo: 'react', priority: 'critical', framework: 'react' },
      { owner: 'microsoft', repo: 'TypeScript', priority: 'critical', framework: 'typescript' },
      { owner: 'tailwindlabs', repo: 'tailwindcss', priority: 'critical', framework: 'tailwind' },
      { owner: 'supabase', repo: 'supabase', priority: 'critical', framework: 'supabase' },

      // Ecosystem Repositories
      { owner: 'vercel', repo: 'ai', priority: 'high', framework: 'ai-sdk' },
      { owner: 'remix-run', repo: 'remix', priority: 'medium', framework: 'remix' },
      { owner: 'vitejs', repo: 'vite', priority: 'medium', framework: 'vite' },
      { owner: 'nodejs', repo: 'node', priority: 'high', framework: 'node' },
      { owner: 'denoland', repo: 'deno', priority: 'medium', framework: 'deno' }
    ];

    // GitHub API rate limits: 5000/hour for authenticated requests
    this.requestCount = 0;
    this.maxRequestsPerHour = 4500; // Stay under limit
  }

  /**
   * Make authenticated GitHub API request
   */
  async makeRequest(endpoint, params = {}) {
    if (!this.token) {
      throw new Error('GitHub token not found. Set GITHUB_TOKEN environment variable.');
    }

    return new Promise((resolve, reject) => {
      const queryString = new URLSearchParams(params).toString();
      const path = '/repos' + endpoint + (queryString ? '?' + queryString : '');

      const options = {
        hostname: 'api.github.com',
        path: path,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'User-Agent': this.userAgent,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);

            if (res.statusCode === 200) {
              this.requestCount++;
              resolve(jsonData);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${jsonData.message || data}`));
            }
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  /**
   * Get recent releases from repository
   */
  async getRecentReleases(owner, repo, limit = 10) {
    try {
      const releases = await this.makeRequest(`/${owner}/${repo}/releases`, {
        per_page: limit,
        sort: 'created',
        direction: 'desc'
      });

      return releases.map(release => ({
        id: release.id,
        name: release.name || release.tag_name,
        tag_name: release.tag_name,
        published_at: release.published_at,
        prerelease: release.prerelease,
        draft: release.draft,
        body: release.body,
        author: release.author?.login,
        html_url: release.html_url,
        assets_count: release.assets?.length || 0,
        framework: this.getRepositoryFramework(owner, repo),
        priority: this.assessReleasePriority(release),
        breaking_changes: this.detectBreakingChanges(release.body || ''),
        security_related: this.isSecurityRelease(release.body || '', release.name || '')
      }));
    } catch (error) {
      console.error(`❌ Error fetching releases for ${owner}/${repo}:`, error.message);
      return [];
    }
  }

  /**
   * Get security advisories for repository
   */
  async getSecurityAdvisories(owner, repo) {
    try {
      const advisories = await this.makeRequest(`/${owner}/${repo}/security-advisories`, {
        state: 'published',
        per_page: 20
      });

      return advisories.map(advisory => ({
        id: advisory.ghsa_id,
        summary: advisory.summary,
        description: advisory.description,
        severity: advisory.severity,
        published_at: advisory.published_at,
        updated_at: advisory.updated_at,
        cve_id: advisory.cve_id,
        cvss_score: advisory.cvss?.score,
        html_url: advisory.html_url,
        framework: this.getRepositoryFramework(owner, repo),
        priority: 'critical' // All security advisories are critical
      }));
    } catch (error) {
      // Security advisories might not be available for all repos
      if (!error.message.includes('404')) {
        console.error(`❌ Error fetching security advisories for ${owner}/${repo}:`, error.message);
      }
      return [];
    }
  }

  /**
   * Get high-engagement issues
   */
  async getHighEngagementIssues(owner, repo, limit = 20) {
    try {
      const issues = await this.makeRequest(`/${owner}/${repo}/issues`, {
        state: 'open',
        sort: 'comments',
        direction: 'desc',
        per_page: limit,
        since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // Last 30 days
      });

      return issues
        .filter(issue => !issue.pull_request && issue.comments > 10) // Filter PRs and low engagement
        .map(issue => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          body: issue.body?.substring(0, 500) || '',
          state: issue.state,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          comments: issue.comments,
          reactions: issue.reactions?.total_count || 0,
          labels: issue.labels?.map(l => l.name) || [],
          author: issue.user?.login,
          assignees: issue.assignees?.map(a => a.login) || [],
          html_url: issue.html_url,
          framework: this.getRepositoryFramework(owner, repo),
          engagement_score: this.calculateIssueEngagement(issue),
          priority: this.assessIssuePriority(issue),
          bug_report: this.isBugReport(issue),
          feature_request: this.isFeatureRequest(issue)
        }));
    } catch (error) {
      console.error(`❌ Error fetching issues for ${owner}/${repo}:`, error.message);
      return [];
    }
  }

  /**
   * Get recent discussions (if available)
   */
  async getRepositoryDiscussions(owner, repo, limit = 15) {
    try {
      // GitHub Discussions API requires GraphQL, but we can approximate with issues
      const discussions = await this.makeRequest(`/${owner}/${repo}/issues`, {
        state: 'open',
        labels: 'discussion,question',
        sort: 'updated',
        direction: 'desc',
        per_page: limit
      });

      return discussions.map(discussion => ({
        id: discussion.id,
        number: discussion.number,
        title: discussion.title,
        body: discussion.body?.substring(0, 300) || '',
        created_at: discussion.created_at,
        updated_at: discussion.updated_at,
        comments: discussion.comments,
        reactions: discussion.reactions?.total_count || 0,
        author: discussion.user?.login,
        html_url: discussion.html_url,
        framework: this.getRepositoryFramework(owner, repo),
        engagement_score: this.calculateIssueEngagement(discussion)
      }));
    } catch (error) {
      console.error(`❌ Error fetching discussions for ${owner}/${repo}:`, error.message);
      return [];
    }
  }

  /**
   * Get breaking change PRs
   */
  async getBreakingChangePRs(owner, repo, limit = 10) {
    try {
      const prs = await this.makeRequest(`/${owner}/${repo}/pulls`, {
        state: 'closed',
        sort: 'updated',
        direction: 'desc',
        per_page: limit * 2 // Get more to filter for breaking changes
      });

      return prs
        .filter(pr => pr.merged_at && this.hasBreakingChanges(pr.title, pr.body || ''))
        .slice(0, limit)
        .map(pr => ({
          id: pr.id,
          number: pr.number,
          title: pr.title,
          body: pr.body?.substring(0, 400) || '',
          merged_at: pr.merged_at,
          author: pr.user?.login,
          reviewers: pr.requested_reviewers?.map(r => r.login) || [],
          html_url: pr.html_url,
          framework: this.getRepositoryFramework(owner, repo),
          breaking_changes: this.extractBreakingChanges(pr.title, pr.body || ''),
          priority: 'high'
        }));
    } catch (error) {
      console.error(`❌ Error fetching PRs for ${owner}/${repo}:`, error.message);
      return [];
    }
  }

  /**
   * Helper: Get framework for repository
   */
  getRepositoryFramework(owner, repo) {
    const repoInfo = this.repositories.find(r => r.owner === owner && r.repo === repo);
    return repoInfo?.framework || 'unknown';
  }

  /**
   * Helper: Calculate issue engagement score
   */
  calculateIssueEngagement(issue) {
    const comments = issue.comments || 0;
    const reactions = issue.reactions?.total_count || 0;
    const ageInDays = (Date.now() - new Date(issue.created_at).getTime()) / (1000 * 60 * 60 * 24);

    // Engagement score considering recency
    return (comments * 2 + reactions) / Math.max(ageInDays, 1);
  }

  /**
   * Helper: Assess release priority
   */
  assessReleasePriority(release) {
    if (release.prerelease) return 'medium';
    if (this.isSecurityRelease(release.body || '', release.name || '')) return 'critical';
    if (this.detectBreakingChanges(release.body || '')) return 'high';
    if (release.name?.includes('major') || release.tag_name?.match(/v?\d+\.0\.0/)) return 'high';
    return 'medium';
  }

  /**
   * Helper: Assess issue priority
   */
  assessIssuePriority(issue) {
    const title = (issue.title || '').toLowerCase();
    const body = (issue.body || '').toLowerCase();
    const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];

    if (labels.includes('critical') || labels.includes('security') ||
        title.includes('security') || body.includes('vulnerability')) {
      return 'critical';
    }

    if (labels.includes('bug') || labels.includes('regression') ||
        issue.comments > 50 || (issue.reactions?.total_count || 0) > 20) {
      return 'high';
    }

    if (labels.includes('enhancement') || labels.includes('feature') || issue.comments > 20) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Helper: Detect breaking changes
   */
  detectBreakingChanges(text) {
    const lowerText = text.toLowerCase();
    return lowerText.includes('breaking') ||
           lowerText.includes('breaking change') ||
           lowerText.includes('breaking:') ||
           lowerText.includes('major:') ||
           lowerText.includes('removed') ||
           lowerText.includes('deprecated');
  }

  /**
   * Helper: Check if security release
   */
  isSecurityRelease(body, name) {
    const text = (body + ' ' + name).toLowerCase();
    return text.includes('security') ||
           text.includes('vulnerability') ||
           text.includes('cve-') ||
           text.includes('patch') && text.includes('fix');
  }

  /**
   * Helper: Check if issue is bug report
   */
  isBugReport(issue) {
    const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
    const title = (issue.title || '').toLowerCase();

    return labels.includes('bug') ||
           labels.includes('regression') ||
           title.includes('bug') ||
           title.includes('broken') ||
           title.includes('error');
  }

  /**
   * Helper: Check if issue is feature request
   */
  isFeatureRequest(issue) {
    const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
    const title = (issue.title || '').toLowerCase();

    return labels.includes('enhancement') ||
           labels.includes('feature') ||
           labels.includes('feature request') ||
           title.includes('feature') ||
           title.includes('add') ||
           title.includes('support');
  }

  /**
   * Helper: Check for breaking changes in PR
   */
  hasBreakingChanges(title, body) {
    return this.detectBreakingChanges(title + ' ' + body);
  }

  /**
   * Helper: Extract breaking changes description
   */
  extractBreakingChanges(title, body) {
    const text = title + ' ' + body;
    const lines = text.split('\n');

    return lines
      .filter(line => line.toLowerCase().includes('breaking'))
      .map(line => line.trim())
      .slice(0, 3);
  }

  /**
   * Run comprehensive GitHub monitoring
   */
  async runMonitoring() {
    console.log('🐙 Enhanced GitHub Monitoring');
    console.log('=' .repeat(50));
    console.log(`📊 Monitoring ${this.repositories.length} repositories`);

    const results = {
      releases: [],
      security_advisories: [],
      high_engagement_issues: [],
      discussions: [],
      breaking_change_prs: []
    };

    try {
      for (const repo of this.repositories.filter(r => r.priority === 'critical')) {
        console.log(`\n🔍 Monitoring ${repo.owner}/${repo.repo} (${repo.framework})`);

        // Get releases
        console.log('   📦 Fetching releases...');
        const releases = await this.getRecentReleases(repo.owner, repo.repo, 5);
        results.releases.push(...releases);
        console.log(`      ✅ Found ${releases.length} recent releases`);

        // Get security advisories
        console.log('   🛡️  Fetching security advisories...');
        const advisories = await this.getSecurityAdvisories(repo.owner, repo.repo);
        results.security_advisories.push(...advisories);
        console.log(`      ✅ Found ${advisories.length} security advisories`);

        // Get high-engagement issues
        console.log('   💬 Fetching high-engagement issues...');
        const issues = await this.getHighEngagementIssues(repo.owner, repo.repo, 10);
        results.high_engagement_issues.push(...issues);
        console.log(`      ✅ Found ${issues.length} high-engagement issues`);

        // Get breaking change PRs
        console.log('   ⚠️  Fetching breaking change PRs...');
        const breakingPRs = await this.getBreakingChangePRs(repo.owner, repo.repo, 5);
        results.breaking_change_prs.push(...breakingPRs);
        console.log(`      ✅ Found ${breakingPRs.length} breaking change PRs`);

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Save results
      const timestamp = Date.now();
      const filename = `github-monitoring-${timestamp}.json`;
      const filepath = path.join(__dirname, '..', 'data', filename);

      const monitoringData = {
        timestamp: new Date().toISOString(),
        api_usage: this.requestCount,
        repositories_monitored: this.repositories.filter(r => r.priority === 'critical').length,
        results: results,
        summary: this.generateSummary(results)
      };

      fs.writeFileSync(filepath, JSON.stringify(monitoringData, null, 2));

      console.log(`\n💾 Results saved: ${filepath}`);
      console.log(`📊 API usage: ${this.requestCount}/${this.maxRequestsPerHour} per hour`);
      console.log(`🎯 Total items found: ${this.countTotalItems(results)}`);

      return results;

    } catch (error) {
      console.error('❌ GitHub monitoring failed:', error.message);
      return results;
    }
  }

  /**
   * Count total items across all categories
   */
  countTotalItems(results) {
    return Object.values(results).reduce((sum, items) => sum + items.length, 0);
  }

  /**
   * Generate monitoring summary
   */
  generateSummary(results) {
    const summary = {
      total_items: this.countTotalItems(results),
      by_category: {
        releases: results.releases.length,
        security_advisories: results.security_advisories.length,
        high_engagement_issues: results.high_engagement_issues.length,
        breaking_change_prs: results.breaking_change_prs.length
      },
      by_framework: {},
      by_priority: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      },
      critical_alerts: [],
      recent_releases: results.releases
        .filter(r => !r.prerelease)
        .slice(0, 5)
        .map(r => ({
          name: r.name,
          framework: r.framework,
          published_at: r.published_at,
          security_related: r.security_related,
          breaking_changes: r.breaking_changes
        }))
    };

    // Count by framework and priority
    Object.values(results).flat().forEach(item => {
      if (item.framework) {
        summary.by_framework[item.framework] = (summary.by_framework[item.framework] || 0) + 1;
      }

      if (item.priority) {
        summary.by_priority[item.priority]++;
      }

      // Collect critical alerts
      if (item.priority === 'critical') {
        summary.critical_alerts.push({
          type: item.severity ? 'security_advisory' : 'release',
          title: item.summary || item.name || item.title,
          framework: item.framework,
          url: item.html_url
        });
      }
    });

    return summary;
  }

  /**
   * Test GitHub API connection
   */
  async testConnection() {
    console.log('🔍 Testing GitHub API connection...');

    if (!this.token) {
      console.log('❌ No GitHub token found. Set GITHUB_TOKEN environment variable.');
      return false;
    }

    try {
      const releases = await this.getRecentReleases('vercel', 'next.js', 1);

      if (releases.length >= 0) {
        console.log('✅ GitHub API connection successful!');
        console.log(`📊 Sample data retrieved from vercel/next.js`);
        return true;
      }
    } catch (error) {
      console.error('❌ GitHub API connection failed:', error.message);
      return false;
    }
  }
}

// CLI interface
async function main() {
  const github = new EnhancedGitHubMonitoring();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await github.testConnection();
      break;

    case 'monitor':
      await github.runMonitoring();
      break;

    case 'releases':
      const owner = process.argv[3];
      const repo = process.argv[4];
      if (owner && repo) {
        const releases = await github.getRecentReleases(owner, repo);
        console.log(JSON.stringify(releases, null, 2));
      } else {
        console.log('Usage: node enhanced-github-monitoring.js releases <owner> <repo>');
      }
      break;

    case 'issues':
      const issueOwner = process.argv[3];
      const issueRepo = process.argv[4];
      if (issueOwner && issueRepo) {
        const issues = await github.getHighEngagementIssues(issueOwner, issueRepo);
        console.log(JSON.stringify(issues, null, 2));
      } else {
        console.log('Usage: node enhanced-github-monitoring.js issues <owner> <repo>');
      }
      break;

    default:
      console.log(`
Usage: node enhanced-github-monitoring.js <command>

Commands:
  test      - Test GitHub API connection
  monitor   - Run comprehensive monitoring
  releases  - Get releases for specific repo
  issues    - Get high-engagement issues for specific repo
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { EnhancedGitHubMonitoring };