#!/usr/bin/env node

/**
 * Comprehensive Modern Tech Stack Social Listening System
 *
 * Monitors YouTube, Reddit, GitHub for all components of the AI-Native Development Stack:
 * - Core Frameworks: Next.js 15.5, React 19.1.1, TypeScript 5.9.2
 * - AI Development: Vercel AI SDK 5.0.48, MCP, OpenAI GPT-5, Anthropic Claude 3.7
 * - Styling/UI: Tailwind CSS v4.1.13, shadcn/ui Platform, Framer Motion 12.23.12
 * - Backend: Supabase 2025, Vercel AI Cloud, PostgreSQL 15+
 * - Development Tools: Vitest 3.2.4, Playwright 1.55.0, ESLint 9+
 *
 * @version 2.0.0
 * @author Avolve AI-Native Platform
 * @date September 25, 2025
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

class ComprehensiveTechStackMonitor {
  constructor() {
    this.configPath = path.join(__dirname, '..', 'config', 'modern-tech-stack-monitoring.json');
    this.config = null;
    this.results = [];

    // API Keys from environment
    this.apiKeys = {
      youtube: process.env.YOUTUBE_API_KEY,
      reddit_client_id: process.env.REDDIT_CLIENT_ID,
      reddit_client_secret: process.env.REDDIT_CLIENT_SECRET,
      github: process.env.GITHUB_TOKEN
    };

    this.requestCounts = {
      youtube: 0,
      reddit: 0,
      github: 0
    };
  }

  /**
   * Load monitoring configuration
   */
  async loadConfiguration() {
    try {
      const configData = await fs.readFile(this.configPath, 'utf8');
      this.config = JSON.parse(configData).modernTechStackMonitoring;
      console.log('✅ Configuration loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }

  /**
   * Run comprehensive monitoring across all platforms
   */
  async runComprehensiveMonitoring() {
    console.log('🚀 Comprehensive Modern Tech Stack Monitoring');
    console.log('=' .repeat(60));
    console.log('📊 Monitoring AI-Native Development Stack 2025');
    console.log('=' .repeat(60));

    await this.loadConfiguration();

    const startTime = Date.now();

    // Run all monitoring in parallel
    const monitoringTasks = [
      this.monitorYouTube(),
      this.monitorReddit(),
      this.monitorGitHub()
    ];

    const results = await Promise.allSettled(monitoringTasks);

    // Process results
    results.forEach((result, index) => {
      const platforms = ['YouTube', 'Reddit', 'GitHub'];
      if (result.status === 'fulfilled') {
        console.log(`✅ ${platforms[index]} monitoring completed`);
      } else {
        console.log(`❌ ${platforms[index]} monitoring failed:`, result.reason.message);
      }
    });

    const duration = (Date.now() - startTime) / 1000;
    await this.generateReport(duration);
  }

  /**
   * Monitor YouTube for tech stack content
   */
  async monitorYouTube() {
    if (!this.apiKeys.youtube) {
      throw new Error('YouTube API key not found');
    }

    console.log('\\n📺 YouTube Monitoring');
    console.log('-'.repeat(40));

    const youtubeConfig = this.config.monitoringConfiguration.platforms.youtube;
    const allResults = [];

    // Monitor search queries
    for (const query of youtubeConfig.searchQueries) {
      console.log(`🔍 Searching: "${query}"`);

      try {
        const searchResults = await this.searchYouTube(query, 10);
        const processedResults = searchResults.map(video => ({
          ...video,
          query: query,
          platform: 'youtube',
          relevance_score: this.calculateYouTubeRelevance(video, query),
          extracted_at: new Date().toISOString()
        }));

        allResults.push(...processedResults);
        console.log(`   ✅ Found ${processedResults.length} relevant videos`);

        // Rate limiting
        await this.delay(100);
      } catch (error) {
        console.log(`   ❌ Search failed: ${error.message}`);
      }
    }

    // Monitor official channels
    for (const channelName of youtubeConfig.officialChannels) {
      console.log(`📺 Monitoring channel: ${channelName}`);

      try {
        const channelVideos = await this.getChannelVideos(channelName, 5);
        const processedVideos = channelVideos.map(video => ({
          ...video,
          source: `channel:${channelName}`,
          platform: 'youtube',
          relevance_score: this.calculateChannelRelevance(video, channelName),
          extracted_at: new Date().toISOString()
        }));

        allResults.push(...processedVideos);
        console.log(`   ✅ Found ${processedVideos.length} new videos`);

        await this.delay(100);
      } catch (error) {
        console.log(`   ❌ Channel monitoring failed: ${error.message}`);
      }
    }

    // Filter and sort results
    const filteredResults = allResults
      .filter(video => video.relevance_score > 15)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    console.log(`📊 YouTube Summary: ${filteredResults.length} relevant videos found`);
    this.results.push({
      platform: 'youtube',
      count: filteredResults.length,
      data: filteredResults.slice(0, 50) // Limit to top 50
    });

    return filteredResults;
  }

  /**
   * Monitor Reddit for tech stack discussions
   */
  async monitorReddit() {
    if (!this.apiKeys.reddit_client_id || !this.apiKeys.reddit_client_secret) {
      throw new Error('Reddit API credentials not found');
    }

    console.log('\\n🔍 Reddit Monitoring');
    console.log('-'.repeat(40));

    const redditConfig = this.config.monitoringConfiguration.platforms.reddit;
    const allResults = [];

    // Authenticate with Reddit
    const accessToken = await this.authenticateReddit();

    // Monitor tier 1 subreddits (most important)
    for (const subreddit of redditConfig.subreddits.tier1) {
      console.log(`📱 Monitoring r/${subreddit}...`);

      try {
        const posts = await this.getRedditPosts(accessToken, subreddit, 'hot', 25);
        const processedPosts = posts.map(post => ({
          ...post,
          platform: 'reddit',
          source: `r/${subreddit}`,
          relevance_score: this.calculateRedditRelevance(post),
          extracted_at: new Date().toISOString()
        }));

        allResults.push(...processedPosts);
        console.log(`   ✅ Found ${processedPosts.length} relevant posts`);

        await this.delay(500);
      } catch (error) {
        console.log(`   ❌ r/${subreddit} monitoring failed: ${error.message}`);
      }
    }

    // Search for specific tech stack terms
    for (const query of redditConfig.searchQueries) {
      console.log(`🔎 Reddit search: "${query}"`);

      try {
        const searchResults = await this.searchReddit(accessToken, query, 15);
        const processedResults = searchResults.map(post => ({
          ...post,
          platform: 'reddit',
          source: `search:${query}`,
          query: query,
          relevance_score: this.calculateRedditRelevance(post, query),
          extracted_at: new Date().toISOString()
        }));

        allResults.push(...processedResults);
        console.log(`   ✅ Found ${processedResults.length} relevant posts`);

        await this.delay(500);
      } catch (error) {
        console.log(`   ❌ Search failed: ${error.message}`);
      }
    }

    // Filter and deduplicate
    const uniqueResults = this.deduplicateRedditResults(allResults);
    const filteredResults = uniqueResults
      .filter(post => post.relevance_score > 20)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    console.log(`📊 Reddit Summary: ${filteredResults.length} relevant posts found`);
    this.results.push({
      platform: 'reddit',
      count: filteredResults.length,
      data: filteredResults.slice(0, 100) // Limit to top 100
    });

    return filteredResults;
  }

  /**
   * Monitor GitHub repositories for tech stack updates
   */
  async monitorGitHub() {
    if (!this.apiKeys.github) {
      throw new Error('GitHub API token not found');
    }

    console.log('\\n📂 GitHub Monitoring');
    console.log('-'.repeat(40));

    const githubConfig = this.config.monitoringConfiguration.platforms.github;
    const allResults = [];

    // Monitor all repository categories
    const repoCategories = ['critical_ai', 'tech_stack', 'ui_components', 'dev_tools'];

    for (const category of repoCategories) {
      console.log(`\\n🎯 Monitoring ${category.toUpperCase()} repositories`);

      const repos = githubConfig.repositories[category] || [];

      for (const repo of repos) {
        console.log(`  📂 Analyzing ${repo}...`);

        try {
          // Get recent issues, releases, and discussions
          const repoData = await Promise.all([
            this.getGitHubIssues(repo, 10),
            this.getGitHubReleases(repo, 5),
            this.getGitHubDiscussions(repo, 5)
          ]);

          const [issues, releases, discussions] = repoData;

          const processedData = [
            ...issues.map(item => ({ ...item, type: 'issue', repo, platform: 'github' })),
            ...releases.map(item => ({ ...item, type: 'release', repo, platform: 'github' })),
            ...discussions.map(item => ({ ...item, type: 'discussion', repo, platform: 'github' }))
          ].map(item => ({
            ...item,
            relevance_score: this.calculateGitHubRelevance(item),
            extracted_at: new Date().toISOString()
          }));

          allResults.push(...processedData);
          console.log(`     ✅ Found ${processedData.length} relevant items`);

          await this.delay(200);
        } catch (error) {
          console.log(`     ❌ ${repo} monitoring failed: ${error.message}`);
        }
      }
    }

    const filteredResults = allResults
      .filter(item => item.relevance_score > 25)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    console.log(`📊 GitHub Summary: ${filteredResults.length} relevant items found`);
    this.results.push({
      platform: 'github',
      count: filteredResults.length,
      data: filteredResults.slice(0, 75) // Limit to top 75
    });

    return filteredResults;
  }

  /**
   * Calculate relevance score for YouTube content
   */
  calculateYouTubeRelevance(video, query) {
    let score = 0;
    const title = video.title.toLowerCase();
    const description = video.description.toLowerCase();
    const content = title + ' ' + description;

    // Framework-specific scoring
    const frameworks = this.getAllFrameworkKeywords();
    for (const [framework, keywords] of Object.entries(frameworks)) {
      for (const keyword of keywords) {
        if (content.includes(keyword.toLowerCase())) {
          score += 30;
        }
      }
    }

    // Version-specific bonus
    if (content.includes('15') || content.includes('19') || content.includes('v4') || content.includes('5.9')) {
      score += 20;
    }

    // Tutorial/guide bonus
    if (content.includes('tutorial') || content.includes('guide') || content.includes('how to')) {
      score += 15;
    }

    // Recent content bonus (published within last 7 days)
    const publishDate = new Date(video.publishedAt);
    const daysSincePublish = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePublish <= 7) {
      score += 25;
    }

    return Math.min(score, 100);
  }

  /**
   * Calculate relevance score for Reddit posts
   */
  calculateRedditRelevance(post, query = '') {
    let score = 0;
    const content = (post.title + ' ' + (post.content || '')).toLowerCase();

    // Framework keyword scoring
    const frameworks = this.getAllFrameworkKeywords();
    for (const [framework, keywords] of Object.entries(frameworks)) {
      for (const keyword of keywords) {
        if (content.includes(keyword.toLowerCase())) {
          score += 25;
        }
      }
    }

    // Engagement bonus
    const engagement = (post.score || 0) + (post.num_comments || 0) * 2;
    score += Math.log10(engagement + 1) * 5;

    // Query-specific bonus
    if (query && content.includes(query.toLowerCase())) {
      score += 30;
    }

    // Question/help bonus (community insights)
    if (content.includes('?') || content.includes('help') || content.includes('how')) {
      score += 10;
    }

    // Critical topic bonus
    if (content.includes('security') || content.includes('vulnerability') || content.includes('breaking')) {
      score += 40;
    }

    return Math.min(score, 100);
  }

  /**
   * Calculate relevance score for GitHub content
   */
  calculateGitHubRelevance(item) {
    let score = 0;
    const content = (item.title + ' ' + (item.body || '')).toLowerCase();

    // Base score by type
    const typeScores = { release: 40, issue: 30, discussion: 25 };
    score += typeScores[item.type] || 20;

    // Critical labels/tags
    const criticalKeywords = [
      'breaking change', 'security', 'vulnerability', 'migration',
      'performance', 'bug fix', 'enhancement', 'feature'
    ];

    for (const keyword of criticalKeywords) {
      if (content.includes(keyword)) {
        score += 25;
      }
    }

    // Framework relevance
    const frameworks = this.getAllFrameworkKeywords();
    for (const [framework, keywords] of Object.entries(frameworks)) {
      for (const keyword of keywords) {
        if (content.includes(keyword.toLowerCase())) {
          score += 20;
        }
      }
    }

    // Recent activity bonus
    const createdDate = new Date(item.created_at || item.published_at);
    const daysSinceCreated = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreated <= 7) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  /**
   * Get all framework keywords from configuration
   */
  getAllFrameworkKeywords() {
    const keywords = {};
    const categories = ['coreFrameworks', 'aiDevelopmentFramework', 'stylingAndUI', 'backendDatabase'];

    for (const category of categories) {
      if (this.config[category] && this.config[category].components) {
        for (const component of this.config[category].components) {
          keywords[component.name] = component.keywords;
        }
      }
    }

    return keywords;
  }

  /**
   * YouTube API methods
   */
  async searchYouTube(query, maxResults = 25) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=relevance&publishedAfter=${this.getRecentDateISO()}&key=${this.apiKeys.youtube}`;

    const response = await this.makeHttpRequest(url);
    this.requestCounts.youtube++;

    return response.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails
    }));
  }

  async getChannelVideos(channelName, maxResults = 10) {
    // First get channel ID by name
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(channelName)}&type=channel&maxResults=1&key=${this.apiKeys.youtube}`;
    const channelSearch = await this.makeHttpRequest(searchUrl);

    if (!channelSearch.items.length) return [];

    const channelId = channelSearch.items[0].id.channelId;

    // Get recent videos from channel
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&publishedAfter=${this.getRecentDateISO()}&key=${this.apiKeys.youtube}`;
    const videosResponse = await this.makeHttpRequest(videosUrl);

    this.requestCounts.youtube += 2;

    return videosResponse.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails
    }));
  }

  /**
   * Reddit API methods
   */
  async authenticateReddit() {
    const auth = Buffer.from(`${this.apiKeys.reddit_client_id}:${this.apiKeys.reddit_client_secret}`).toString('base64');
    const postData = 'grant_type=client_credentials';

    const options = {
      hostname: 'www.reddit.com',
      path: '/api/v1/access_token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'Avolve Social Listening v2.0',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await this.makeHttpsRequest(options, postData);
    return response.access_token;
  }

  async getRedditPosts(accessToken, subreddit, sort = 'hot', limit = 25) {
    const options = {
      hostname: 'oauth.reddit.com',
      path: `/r/${subreddit}/${sort}?limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Avolve Social Listening v2.0'
      }
    };

    const response = await this.makeHttpsRequest(options);
    this.requestCounts.reddit++;

    return response.data.children.map(item => item.data);
  }

  async searchReddit(accessToken, query, limit = 25) {
    const options = {
      hostname: 'oauth.reddit.com',
      path: `/search?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance&t=week`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Avolve Social Listening v2.0'
      }
    };

    const response = await this.makeHttpsRequest(options);
    this.requestCounts.reddit++;

    return response.data.children.map(item => item.data);
  }

  /**
   * GitHub API methods
   */
  async getGitHubIssues(repo, limit = 10) {
    const url = `https://api.github.com/repos/${repo}/issues?state=open&sort=updated&per_page=${limit}`;
    const response = await this.makeHttpRequest(url, {
      'Authorization': `token ${this.apiKeys.github}`,
      'User-Agent': 'Avolve-Tech-Stack-Monitor'
    });

    this.requestCounts.github++;
    return response;
  }

  async getGitHubReleases(repo, limit = 5) {
    const url = `https://api.github.com/repos/${repo}/releases?per_page=${limit}`;
    const response = await this.makeHttpRequest(url, {
      'Authorization': `token ${this.apiKeys.github}`,
      'User-Agent': 'Avolve-Tech-Stack-Monitor'
    });

    this.requestCounts.github++;
    return response;
  }

  async getGitHubDiscussions(repo, limit = 5) {
    // GitHub GraphQL API would be ideal for discussions, but REST API fallback
    try {
      const url = `https://api.github.com/repos/${repo}/discussions?per_page=${limit}`;
      const response = await this.makeHttpRequest(url, {
        'Authorization': `token ${this.apiKeys.github}`,
        'User-Agent': 'Avolve-Tech-Stack-Monitor'
      });

      this.requestCounts.github++;
      return response;
    } catch (error) {
      // Fallback to empty array if discussions API not available
      return [];
    }
  }

  /**
   * Utility methods
   */
  async makeHttpRequest(url, headers = {}) {
    return new Promise((resolve, reject) => {
      const options = { headers: { ...headers } };

      https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      }).on('error', reject);
    });
  }

  async makeHttpsRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', reject);

      if (postData) {
        req.write(postData);
      }

      req.end();
    });
  }

  calculateChannelRelevance(video, channelName) {
    // Official channels get higher base relevance
    return this.calculateYouTubeRelevance(video, '') + 20;
  }

  deduplicateRedditResults(results) {
    const seen = new Set();
    return results.filter(post => {
      const key = post.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  getRecentDateISO() {
    // Get date 7 days ago
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString();
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate comprehensive monitoring report
   */
  async generateReport(duration) {
    const timestamp = new Date().toISOString();
    const reportData = {
      timestamp,
      duration: `${duration}s`,
      configuration: this.config.version,
      platforms: {
        youtube: { enabled: true, results: this.results.find(r => r.platform === 'youtube')?.count || 0 },
        reddit: { enabled: true, results: this.results.find(r => r.platform === 'reddit')?.count || 0 },
        github: { enabled: true, results: this.results.find(r => r.platform === 'github')?.count || 0 }
      },
      api_usage: this.requestCounts,
      results: this.results,
      summary: this.generateSummary()
    };

    // Save JSON report
    const reportPath = path.join(__dirname, '..', 'reports', `comprehensive-tech-stack-monitoring-${Date.now()}.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(reportData, null, 2));

    // Generate markdown digest
    const digestPath = path.join(__dirname, '..', 'reports', 'daily-tech-stack-digest.md');
    await this.generateMarkdownDigest(reportData, digestPath);

    console.log('\\n📊 COMPREHENSIVE MONITORING COMPLETE');
    console.log('==================================================');
    console.log(`⏱️  Analysis Duration: ${duration}s`);
    console.log(`📁 Full Report: ${reportPath}`);
    console.log(`📄 Daily Digest: ${digestPath}`);

    console.log('\\n📈 RESULTS SUMMARY:');
    console.log(`🎯 Total Items Monitored: ${reportData.results.reduce((sum, r) => sum + r.count, 0)}`);
    console.log(`📺 YouTube Videos: ${reportData.platforms.youtube.results}`);
    console.log(`🔍 Reddit Posts: ${reportData.platforms.reddit.results}`);
    console.log(`📂 GitHub Items: ${reportData.platforms.github.results}`);

    console.log('\\n💡 KEY INSIGHTS:');
    const insights = this.generateKeyInsights();
    insights.forEach((insight, index) => {
      console.log(`   ${index + 1}. ${insight}`);
    });
  }

  generateSummary() {
    const totalItems = this.results.reduce((sum, result) => sum + result.count, 0);
    const platforms = this.results.map(r => r.platform);

    return {
      total_items: totalItems,
      platforms_monitored: platforms.length,
      api_requests: Object.values(this.requestCounts).reduce((sum, count) => sum + count, 0),
      monitoring_scope: 'Full AI-Native Development Stack 2025'
    };
  }

  generateKeyInsights() {
    const insights = [];

    // Analyze results for key insights
    this.results.forEach(platformResult => {
      const data = platformResult.data;
      if (!data.length) return;

      const highRelevance = data.filter(item => item.relevance_score > 70);
      if (highRelevance.length > 0) {
        insights.push(`${platformResult.platform}: ${highRelevance.length} high-priority items detected`);
      }
    });

    if (insights.length === 0) {
      insights.push('No critical issues detected across monitored platforms');
      insights.push('Tech stack ecosystem showing stable activity levels');
    }

    return insights;
  }

  async generateMarkdownDigest(reportData, digestPath) {
    const markdown = `# Daily Tech Stack Monitoring Digest
*Generated: ${reportData.timestamp}*

## Overview
- **Duration**: ${reportData.duration}
- **Total Items**: ${reportData.results.reduce((sum, r) => sum + r.count, 0)}
- **Platforms**: YouTube, Reddit, GitHub
- **API Requests**: ${Object.values(reportData.api_usage).reduce((sum, count) => sum + count, 0)}

## Platform Results

### 📺 YouTube (${reportData.platforms.youtube.results} videos)
${this.generatePlatformMarkdown('youtube')}

### 🔍 Reddit (${reportData.platforms.reddit.results} posts)
${this.generatePlatformMarkdown('reddit')}

### 📂 GitHub (${reportData.platforms.github.results} items)
${this.generatePlatformMarkdown('github')}

## Key Insights
${this.generateKeyInsights().map(insight => `- ${insight}`).join('\\n')}

---
*Powered by Avolve AI-Native Social Listening System v2.0*
`;

    await fs.writeFile(digestPath, markdown);
  }

  generatePlatformMarkdown(platform) {
    const platformData = this.results.find(r => r.platform === platform);
    if (!platformData || !platformData.data.length) {
      return 'No significant activity detected.\\n';
    }

    const topItems = platformData.data.slice(0, 5);
    return topItems.map(item => {
      const title = item.title || item.name;
      const score = item.relevance_score;
      return `- **${title}** (Score: ${score})`;
    }).join('\\n') + '\\n';
  }
}

// CLI Interface
async function main() {
  const monitor = new ComprehensiveTechStackMonitor();

  const command = process.argv[2] || 'monitor';

  try {
    switch (command) {
      case 'monitor':
        await monitor.runComprehensiveMonitoring();
        break;

      case 'youtube':
        await monitor.loadConfiguration();
        await monitor.monitorYouTube();
        break;

      case 'reddit':
        await monitor.loadConfiguration();
        await monitor.monitorReddit();
        break;

      case 'github':
        await monitor.loadConfiguration();
        await monitor.monitorGitHub();
        break;

      case 'config':
        await monitor.loadConfiguration();
        console.log('✅ Configuration loaded and validated');
        console.log('📊 Monitoring scope:', Object.keys(monitor.config).join(', '));
        break;

      default:
        console.log(`
🚀 Comprehensive Modern Tech Stack Monitor v2.0

Usage: node comprehensive-tech-stack-monitor.js <command>

Commands:
  monitor  - Run full comprehensive monitoring (default)
  youtube  - Monitor YouTube only
  reddit   - Monitor Reddit only
  github   - Monitor GitHub only
  config   - Validate configuration

Environment Variables Required:
  YOUTUBE_API_KEY          - YouTube Data API key
  REDDIT_CLIENT_ID         - Reddit API client ID
  REDDIT_CLIENT_SECRET     - Reddit API client secret
  GITHUB_TOKEN             - GitHub API token
        `);
    }
  } catch (error) {
    console.error('❌ Monitoring failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ComprehensiveTechStackMonitor };