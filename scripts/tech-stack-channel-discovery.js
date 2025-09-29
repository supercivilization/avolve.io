#!/usr/bin/env node

/**
 * Tech Stack Channel & Subreddit Discovery System
 *
 * Comprehensive discovery system to find all relevant YouTube channels and
 * Reddit subreddits for the modern AI-native tech stack. Uses intelligent
 * search strategies and relevance scoring to identify high-quality sources.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 25, 2025
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

class TechStackChannelDiscovery {
  constructor() {
    this.configPath = path.join(__dirname, '..', 'config', 'modern-tech-stack-monitoring.json');
    this.config = null;

    // API Keys from environment
    this.apiKeys = {
      youtube: process.env.YOUTUBE_API_KEY,
      reddit_client_id: process.env.REDDIT_CLIENT_ID,
      reddit_client_secret: process.env.REDDIT_CLIENT_SECRET
    };

    this.discoveredChannels = [];
    this.discoveredSubreddits = [];
    this.requestCounts = { youtube: 0, reddit: 0 };
  }

  /**
   * Run comprehensive discovery
   */
  async runDiscovery() {
    console.log('🔍 Comprehensive Tech Stack Channel Discovery');
    console.log('=' .repeat(60));

    await this.loadConfiguration();

    // Run discovery in parallel
    const discoveryTasks = [
      this.discoverYouTubeChannels(),
      this.discoverRedditSubreddits()
    ];

    await Promise.all(discoveryTasks);

    // Generate discovery report
    await this.generateDiscoveryReport();
  }

  /**
   * Load monitoring configuration
   */
  async loadConfiguration() {
    const configData = await fs.readFile(this.configPath, 'utf8');
    this.config = JSON.parse(configData).modernTechStackMonitoring;
    console.log('✅ Configuration loaded successfully');
  }

  /**
   * Discover YouTube channels for all tech stack components
   */
  async discoverYouTubeChannels() {
    if (!this.apiKeys.youtube) {
      console.log('⚠️  YouTube API key not found, skipping YouTube discovery');
      return;
    }

    console.log('\\n📺 YouTube Channel Discovery');
    console.log('-'.repeat(50));

    const searchTerms = this.generateYouTubeSearchTerms();
    const allChannels = [];

    for (const searchTerm of searchTerms) {
      console.log(`🔍 Searching channels for: "${searchTerm}"`);

      try {
        const channels = await this.searchYouTubeChannels(searchTerm);
        const scoredChannels = channels.map(channel => ({
          ...channel,
          searchTerm,
          relevance_score: this.calculateChannelRelevance(channel, searchTerm),
          discovered_at: new Date().toISOString()
        }));

        allChannels.push(...scoredChannels);
        console.log(`   ✅ Found ${scoredChannels.length} channels`);

        await this.delay(200); // Rate limiting
      } catch (error) {
        console.log(`   ❌ Search failed: ${error.message}`);
      }
    }

    // Deduplicate and filter channels
    this.discoveredChannels = this.deduplicateChannels(allChannels)
      .filter(channel => channel.relevance_score > 30)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    console.log(`\\n📊 YouTube Discovery Summary: ${this.discoveredChannels.length} relevant channels found`);
  }

  /**
   * Discover Reddit subreddits for all tech stack components
   */
  async discoverRedditSubreddits() {
    if (!this.apiKeys.reddit_client_id || !this.apiKeys.reddit_client_secret) {
      console.log('⚠️  Reddit API credentials not found, skipping Reddit discovery');
      return;
    }

    console.log('\\n🔍 Reddit Subreddit Discovery');
    console.log('-'.repeat(50));

    // Authenticate with Reddit
    const accessToken = await this.authenticateReddit();

    const searchTerms = this.generateRedditSearchTerms();
    const allSubreddits = [];

    // Search for subreddits
    for (const searchTerm of searchTerms) {
      console.log(`🔍 Searching subreddits for: "${searchTerm}"`);

      try {
        const subreddits = await this.searchRedditSubreddits(accessToken, searchTerm);
        const scoredSubreddits = subreddits.map(subreddit => ({
          ...subreddit,
          searchTerm,
          relevance_score: this.calculateSubredditRelevance(subreddit, searchTerm),
          discovered_at: new Date().toISOString()
        }));

        allSubreddits.push(...scoredSubreddits);
        console.log(`   ✅ Found ${scoredSubreddits.length} subreddits`);

        await this.delay(500); // Rate limiting
      } catch (error) {
        console.log(`   ❌ Search failed: ${error.message}`);
      }
    }

    // Add well-known tech subreddits
    const knownSubreddits = await this.addKnownTechSubreddits(accessToken);
    allSubreddits.push(...knownSubreddits);

    // Deduplicate and filter subreddits
    this.discoveredSubreddits = this.deduplicateSubreddits(allSubreddits)
      .filter(subreddit => subreddit.relevance_score > 25)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    console.log(`\\n📊 Reddit Discovery Summary: ${this.discoveredSubreddits.length} relevant subreddits found`);
  }

  /**
   * Generate YouTube search terms based on tech stack
   */
  generateYouTubeSearchTerms() {
    const terms = [];

    // Framework-specific terms
    terms.push(
      // Core Frameworks
      'Next.js', 'Next.js tutorial', 'Next.js 15', 'Next.js official',
      'React', 'React tutorial', 'React 19', 'React official',
      'TypeScript', 'TypeScript tutorial', 'TypeScript official',

      // AI Development
      'Vercel AI SDK', 'Vercel AI', 'AI development',
      'Claude AI', 'Anthropic AI', 'Claude Code',
      'OpenAI', 'OpenAI API', 'GPT development',
      'Model Context Protocol', 'MCP servers',

      // Styling & UI
      'Tailwind CSS', 'Tailwind CSS tutorial', 'Tailwind v4',
      'shadcn ui', 'shadcn/ui tutorial', 'Radix UI',
      'Framer Motion', 'React animation',

      // Backend & Database
      'Supabase', 'Supabase tutorial', 'PostgreSQL',
      'Vercel deployment', 'serverless',

      // Development Tools
      'Vitest', 'Playwright testing', 'ESLint',
      'VS Code', 'development tools',

      // General terms
      'web development', 'full stack development',
      'JavaScript', 'frontend development',
      'modern web development', 'AI web development'
    );

    return terms;
  }

  /**
   * Generate Reddit search terms
   */
  generateRedditSearchTerms() {
    return [
      'nextjs', 'react', 'typescript', 'javascript',
      'tailwindcss', 'supabase', 'webdev', 'programming',
      'ai', 'claude', 'openai', 'anthropic',
      'vercel', 'frontend', 'fullstack'
    ];
  }

  /**
   * Search YouTube for channels
   */
  async searchYouTubeChannels(query, maxResults = 25) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=${maxResults}&order=relevance&key=${this.apiKeys.youtube}`;

    const response = await this.makeHttpRequest(url);
    this.requestCounts.youtube++;

    return response.items.map(item => ({
      channelId: item.id.channelId,
      title: item.snippet.title,
      description: item.snippet.description,
      customUrl: item.snippet.customUrl || null,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails
    }));
  }

  /**
   * Search Reddit for subreddits
   */
  async searchRedditSubreddits(accessToken, query, limit = 25) {
    const options = {
      hostname: 'oauth.reddit.com',
      path: `/subreddits/search?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Avolve Tech Stack Discovery v1.0'
      }
    };

    const response = await this.makeHttpsRequest(options);
    this.requestCounts.reddit++;

    return response.data.children.map(item => ({
      name: item.data.display_name,
      title: item.data.title,
      description: item.data.public_description,
      subscribers: item.data.subscribers,
      created: new Date(item.data.created_utc * 1000).toISOString(),
      over18: item.data.over18,
      lang: item.data.lang,
      subreddit_type: item.data.subreddit_type
    }));
  }

  /**
   * Add well-known tech subreddits with metadata
   */
  async addKnownTechSubreddits(accessToken) {
    const knownSubreddits = [
      'webdev', 'reactjs', 'nextjs', 'typescript', 'javascript',
      'tailwindcss', 'supabase', 'programming', 'frontend',
      'fullstack', 'node', 'css', 'html5', 'webdesign',
      'artificialintelligence', 'MachineLearning', 'OpenAI',
      'ClaudeAI', 'coding', 'learnprogramming', 'cscareerquestions',
      'SideProject', 'entrepreneur', 'startups', 'productivity',
      'github', 'git', 'vscode', 'vim', 'emacs', 'linux'
    ];

    const subredditData = [];

    for (const subredditName of knownSubreddits) {
      try {
        const subreddit = await this.getSubredditInfo(accessToken, subredditName);
        if (subreddit) {
          subredditData.push({
            ...subreddit,
            searchTerm: 'known_tech_subreddit',
            relevance_score: this.calculateSubredditRelevance(subreddit, 'tech'),
            discovered_at: new Date().toISOString()
          });
        }

        await this.delay(100);
      } catch (error) {
        console.log(`   ⚠️  Could not fetch r/${subredditName}: ${error.message}`);
      }
    }

    return subredditData;
  }

  /**
   * Get detailed subreddit information
   */
  async getSubredditInfo(accessToken, subredditName) {
    const options = {
      hostname: 'oauth.reddit.com',
      path: `/r/${subredditName}/about`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Avolve Tech Stack Discovery v1.0'
      }
    };

    try {
      const response = await this.makeHttpsRequest(options);
      this.requestCounts.reddit++;

      const data = response.data;
      return {
        name: data.display_name,
        title: data.title,
        description: data.public_description,
        subscribers: data.subscribers,
        created: new Date(data.created_utc * 1000).toISOString(),
        over18: data.over18,
        lang: data.lang,
        subreddit_type: data.subreddit_type
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Calculate YouTube channel relevance score
   */
  calculateChannelRelevance(channel, searchTerm) {
    let score = 0;
    const title = channel.title.toLowerCase();
    const description = (channel.description || '').toLowerCase();
    const content = title + ' ' + description;

    // Exact framework matches
    const frameworkKeywords = {
      'next.js': 40, 'nextjs': 40, 'react': 35, 'typescript': 30,
      'tailwind': 30, 'supabase': 35, 'vercel': 30,
      'claude': 35, 'anthropic': 35, 'openai': 30,
      'ai development': 25, 'web development': 20
    };

    for (const [keyword, points] of Object.entries(frameworkKeywords)) {
      if (content.includes(keyword)) {
        score += points;
      }
    }

    // Official channels get high priority
    if (title.includes('official') ||
        title === 'vercel' || title === 'react' || title === 'next.js' ||
        title === 'supabase' || title === 'anthropic' || title === 'tailwind labs') {
      score += 50;
    }

    // Tutorial/educational content
    if (content.includes('tutorial') || content.includes('course') ||
        content.includes('learn') || content.includes('education')) {
      score += 20;
    }

    // Developer/tech focused
    if (content.includes('developer') || content.includes('programming') ||
        content.includes('coding') || content.includes('tech')) {
      score += 15;
    }

    // Penalize irrelevant content
    if (content.includes('gaming') || content.includes('music') ||
        content.includes('vlog') || content.includes('entertainment')) {
      score -= 30;
    }

    return Math.max(0, Math.min(score, 100));
  }

  /**
   * Calculate Reddit subreddit relevance score
   */
  calculateSubredditRelevance(subreddit, searchTerm) {
    let score = 0;
    const name = subreddit.name.toLowerCase();
    const title = (subreddit.title || '').toLowerCase();
    const description = (subreddit.description || '').toLowerCase();
    const content = name + ' ' + title + ' ' + description;

    // Framework-specific scoring
    const frameworkKeywords = {
      'nextjs': 50, 'react': 45, 'typescript': 40, 'javascript': 35,
      'tailwind': 40, 'css': 30, 'supabase': 45, 'webdev': 35,
      'programming': 30, 'frontend': 35, 'fullstack': 35,
      'ai': 30, 'claude': 40, 'openai': 35, 'anthropic': 35
    };

    for (const [keyword, points] of Object.entries(frameworkKeywords)) {
      if (content.includes(keyword)) {
        score += points;
      }
    }

    // Subscriber count bonus (logarithmic)
    if (subreddit.subscribers > 0) {
      score += Math.log10(subreddit.subscribers) * 3;
    }

    // Active communities (not over 18, english)
    if (!subreddit.over18 && subreddit.lang === 'en') {
      score += 10;
    }

    // Public subreddits
    if (subreddit.subreddit_type === 'public') {
      score += 10;
    }

    // Penalize irrelevant subreddits
    if (content.includes('meme') || content.includes('circlejerk') ||
        content.includes('nsfw') || content.includes('politics')) {
      score -= 20;
    }

    return Math.max(0, Math.min(score, 100));
  }

  /**
   * Deduplicate YouTube channels
   */
  deduplicateChannels(channels) {
    const seen = new Set();
    return channels.filter(channel => {
      const key = channel.channelId;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Deduplicate Reddit subreddits
   */
  deduplicateSubreddits(subreddits) {
    const seen = new Set();
    return subreddits.filter(subreddit => {
      const key = subreddit.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Reddit authentication
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
        'User-Agent': 'Avolve Tech Stack Discovery v1.0',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await this.makeHttpsRequest(options, postData);
    return response.access_token;
  }

  /**
   * Generate comprehensive discovery report
   */
  async generateDiscoveryReport() {
    const timestamp = new Date().toISOString();

    // Create discovery report
    const discoveryReport = {
      timestamp,
      discovery_version: '1.0.0',
      api_usage: this.requestCounts,
      youtube_channels: {
        total_found: this.discoveredChannels.length,
        high_relevance: this.discoveredChannels.filter(c => c.relevance_score >= 70).length,
        channels: this.discoveredChannels
      },
      reddit_subreddits: {
        total_found: this.discoveredSubreddits.length,
        high_relevance: this.discoveredSubreddits.filter(s => s.relevance_score >= 70).length,
        subreddits: this.discoveredSubreddits
      },
      recommendations: this.generateRecommendations()
    };

    // Save discovery report
    const reportPath = path.join(__dirname, '..', 'reports', `tech-stack-discovery-${Date.now()}.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(discoveryReport, null, 2));

    // Generate updated monitoring configuration
    await this.generateUpdatedConfig(discoveryReport);

    // Display summary
    this.displayDiscoverySummary(discoveryReport);

    console.log(`\\n📁 Discovery report saved: ${reportPath}`);
  }

  /**
   * Generate monitoring recommendations
   */
  generateRecommendations() {
    const recommendations = {
      youtube: {
        official_channels: this.discoveredChannels
          .filter(c => c.relevance_score >= 80)
          .slice(0, 15)
          .map(c => ({ name: c.title, channelId: c.channelId, score: c.relevance_score })),

        educational_channels: this.discoveredChannels
          .filter(c => c.relevance_score >= 60 && c.relevance_score < 80)
          .slice(0, 20)
          .map(c => ({ name: c.title, channelId: c.channelId, score: c.relevance_score }))
      },

      reddit: {
        tier1_subreddits: this.discoveredSubreddits
          .filter(s => s.relevance_score >= 70)
          .slice(0, 10)
          .map(s => ({ name: s.name, subscribers: s.subscribers, score: s.relevance_score })),

        tier2_subreddits: this.discoveredSubreddits
          .filter(s => s.relevance_score >= 50 && s.relevance_score < 70)
          .slice(0, 15)
          .map(s => ({ name: s.name, subscribers: s.subscribers, score: s.relevance_score })),

        tier3_subreddits: this.discoveredSubreddits
          .filter(s => s.relevance_score >= 30 && s.relevance_score < 50)
          .slice(0, 20)
          .map(s => ({ name: s.name, subscribers: s.subscribers, score: s.relevance_score }))
      }
    };

    return recommendations;
  }

  /**
   * Generate updated monitoring configuration
   */
  async generateUpdatedConfig(discoveryReport) {
    // Update the existing config with discovered channels and subreddits
    const updatedConfig = { ...this.config };

    // Update YouTube configuration
    const youtubeChannels = discoveryReport.recommendations.youtube.official_channels
      .map(c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'));

    updatedConfig.monitoringConfiguration.platforms.youtube.officialChannels = [
      ...updatedConfig.monitoringConfiguration.platforms.youtube.officialChannels,
      ...youtubeChannels.slice(0, 10)
    ];

    // Update Reddit configuration
    const tier1Subreddits = discoveryReport.recommendations.reddit.tier1_subreddits.map(s => s.name);
    const tier2Subreddits = discoveryReport.recommendations.reddit.tier2_subreddits.map(s => s.name);
    const tier3Subreddits = discoveryReport.recommendations.reddit.tier3_subreddits.map(s => s.name);

    updatedConfig.monitoringConfiguration.platforms.reddit.subreddits = {
      tier1: [...new Set([...updatedConfig.monitoringConfiguration.platforms.reddit.subreddits.tier1, ...tier1Subreddits])],
      tier2: [...new Set([...updatedConfig.monitoringConfiguration.platforms.reddit.subreddits.tier2, ...tier2Subreddits])],
      tier3: [...new Set(tier3Subreddits)]
    };

    // Save updated configuration
    const updatedConfigPath = path.join(__dirname, '..', 'config', 'modern-tech-stack-monitoring-updated.json');
    const configWrapper = { modernTechStackMonitoring: updatedConfig };
    await fs.writeFile(updatedConfigPath, JSON.stringify(configWrapper, null, 2));

    console.log(`\\n📁 Updated config saved: ${updatedConfigPath}`);
  }

  /**
   * Display discovery summary
   */
  displayDiscoverySummary(report) {
    console.log('\\n🎯 DISCOVERY SUMMARY');
    console.log('=' .repeat(50));

    console.log(`\\n📺 YouTube Channels (${report.youtube_channels.total_found} found)`);
    console.log('-'.repeat(30));

    const topChannels = report.recommendations.youtube.official_channels.slice(0, 10);
    for (const channel of topChannels) {
      console.log(`   ${channel.score}★ ${channel.name}`);
    }

    console.log(`\\n🔍 Reddit Subreddits (${report.reddit_subreddits.total_found} found)`);
    console.log('-'.repeat(30));

    console.log('\\n   🔴 Tier 1 (High Priority):');
    for (const subreddit of report.recommendations.reddit.tier1_subreddits.slice(0, 8)) {
      console.log(`     ${subreddit.score}★ r/${subreddit.name} (${subreddit.subscribers?.toLocaleString()} subscribers)`);
    }

    console.log('\\n   🟡 Tier 2 (Medium Priority):');
    for (const subreddit of report.recommendations.reddit.tier2_subreddits.slice(0, 5)) {
      console.log(`     ${subreddit.score}★ r/${subreddit.name} (${subreddit.subscribers?.toLocaleString()} subscribers)`);
    }

    console.log(`\\n📊 API Usage:`);
    console.log(`   YouTube: ${this.requestCounts.youtube} requests`);
    console.log(`   Reddit: ${this.requestCounts.reddit} requests`);
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

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI Interface
async function main() {
  const discovery = new TechStackChannelDiscovery();
  const command = process.argv[2] || 'discover';

  try {
    switch (command) {
      case 'discover':
      case 'all':
        await discovery.runDiscovery();
        break;

      case 'youtube':
        await discovery.loadConfiguration();
        await discovery.discoverYouTubeChannels();
        await discovery.generateDiscoveryReport();
        break;

      case 'reddit':
        await discovery.loadConfiguration();
        await discovery.discoverRedditSubreddits();
        await discovery.generateDiscoveryReport();
        break;

      default:
        console.log(`
🔍 Tech Stack Channel Discovery v1.0

Usage: node tech-stack-channel-discovery.js <command>

Commands:
  discover  - Run full discovery (YouTube + Reddit) [default]
  youtube   - Discover YouTube channels only
  reddit    - Discover Reddit subreddits only

Environment Variables Required:
  YOUTUBE_API_KEY          - YouTube Data API key
  REDDIT_CLIENT_ID         - Reddit API client ID
  REDDIT_CLIENT_SECRET     - Reddit API client secret

Example:
  YOUTUBE_API_KEY="your-key" REDDIT_CLIENT_ID="your-id" REDDIT_CLIENT_SECRET="your-secret" \\
  node tech-stack-channel-discovery.js discover
        `);
    }
  } catch (error) {
    console.error('❌ Discovery failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { TechStackChannelDiscovery };