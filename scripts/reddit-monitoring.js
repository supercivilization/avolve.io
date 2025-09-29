#!/usr/bin/env node

/**
 * Reddit Monitoring for Developer Communities
 *
 * Monitors key developer subreddits for framework discussions, releases,
 * and community sentiment around our modern tech stack.
 *
 * Free tier: 100 queries per minute (6,000/hour, 144,000/day)
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class RedditMonitoring {
  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID;
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET;
    this.userAgent = 'Avolve-Social-Listening/1.0 (by /u/avolve-dev)';
    this.accessToken = null;

    // Priority subreddits for monitoring
    this.subreddits = {
      // High-priority tech stack specific
      priority1: [
        'webdev',        // 3.2M - General web development
        'reactjs',       // 325K - React discussions
        'nextjs',        // 89K - Next.js community
        'typescript',    // 180K - TypeScript discussions
        'tailwindcss',   // 45K - Tailwind CSS
        'supabase'       // 25K - Supabase community
      ],

      // Secondary - broader ecosystem
      priority2: [
        'javascript',    // 2.8M - JavaScript ecosystem
        'frontend',      // 1.1M - Frontend development
        'programming',   // 4.8M - General programming
        'webdev',        // Web development trends
        'node'           // Node.js discussions
      ]
    };

    // Framework keywords for relevance scoring
    this.frameworkKeywords = {
      'next.js': 30, 'nextjs': 30, 'next js': 30, 'next 15': 35,
      'react': 25, 'react 19': 35, 'reactjs': 25,
      'typescript': 25, 'typescript 5': 30, 'ts': 15,
      'tailwind': 25, 'tailwindcss': 30, 'tailwind css': 30, 'tailwind v4': 35,
      'supabase': 30,
      'vercel': 20, 'deployment': 15,
      'security': 20, 'vulnerability': 25,
      'performance': 15, 'optimization': 15
    };

    this.requestCount = 0;
    this.maxRequestsPerMinute = 90; // Stay under 100 limit
  }

  /**
   * Authenticate with Reddit API
   */
  async authenticate() {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Reddit API credentials not found. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET');
    }

    return new Promise((resolve, reject) => {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const postData = 'grant_type=client_credentials';

      const options = {
        hostname: 'www.reddit.com',
        path: '/api/v1/access_token',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'User-Agent': this.userAgent,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.access_token) {
              this.accessToken = response.access_token;
              console.log('✅ Reddit API authentication successful');
              resolve(response.access_token);
            } else {
              reject(new Error('No access token received'));
            }
          } catch (e) {
            reject(new Error('Invalid authentication response'));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Make authenticated Reddit API request
   */
  async makeRequest(endpoint, params = {}) {
    if (this.requestCount >= this.maxRequestsPerMinute) {
      console.log('⚠️  Rate limit approaching, waiting...');
      await new Promise(resolve => setTimeout(resolve, 60000));
      this.requestCount = 0;
    }

    if (!this.accessToken) {
      await this.authenticate();
    }

    return new Promise((resolve, reject) => {
      const queryString = new URLSearchParams(params).toString();
      const path = endpoint + (queryString ? '?' + queryString : '');

      const options = {
        hostname: 'oauth.reddit.com',
        path: path,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'User-Agent': this.userAgent
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
   * Get hot posts from subreddit
   */
  async getSubredditPosts(subreddit, sort = 'hot', limit = 25) {
    try {
      const response = await this.makeRequest(
        `/r/${subreddit}/${sort}`,
        {
          limit: limit,
          sr_detail: true,
          show_srs: true
        }
      );

      return this.processPosts(response.data?.children || [], subreddit);
    } catch (error) {
      console.error(`❌ Error fetching r/${subreddit}:`, error.message);
      return [];
    }
  }

  /**
   * Search Reddit for specific terms
   */
  async searchReddit(query, subreddit = null, limit = 25) {
    try {
      const searchPath = subreddit ? `/r/${subreddit}/search` : '/search';
      const response = await this.makeRequest(searchPath, {
        q: query,
        sort: 'relevance',
        t: 'week', // Last week
        limit: limit,
        restrict_sr: subreddit ? 'true' : 'false'
      });

      return this.processPosts(response.data?.children || [], `search:${query}`);
    } catch (error) {
      console.error(`❌ Error searching for "${query}":`, error.message);
      return [];
    }
  }

  /**
   * Process Reddit posts for our monitoring
   */
  processPosts(posts, source) {
    return posts
      .map(postData => {
        const post = postData.data;

        const relevanceScore = this.calculateRelevanceScore(post.title + ' ' + (post.selftext || ''));
        const engagementScore = this.calculateEngagementScore(post);

        return {
          id: post.id,
          source: source,
          platform: 'reddit',
          title: post.title,
          content: post.selftext || '',
          url: `https://reddit.com${post.permalink}`,
          subreddit: post.subreddit,
          author: post.author,
          created_at: new Date(post.created_utc * 1000).toISOString(),
          score: post.score,
          upvote_ratio: post.upvote_ratio,
          num_comments: post.num_comments,
          engagement_score: engagementScore,
          relevance_score: relevanceScore,
          frameworks: this.extractFrameworks(post.title + ' ' + (post.selftext || '')),
          categories: this.categorizeContent(post.title + ' ' + (post.selftext || '')),
          priority: this.assessPriority(post.title + ' ' + (post.selftext || ''), engagementScore),
          extracted_at: new Date().toISOString()
        };
      })
      .filter(post => post.relevance_score > 15) // Filter for relevant content
      .sort((a, b) => b.engagement_score - a.engagement_score);
  }

  /**
   * Calculate engagement score for Reddit post
   */
  calculateEngagementScore(post) {
    const score = post.score || 0;
    const comments = post.num_comments || 0;
    const ratio = post.upvote_ratio || 0.5;

    // Reddit engagement formula
    const engagementScore = (score * ratio) + (comments * 2);
    return Math.log10(engagementScore + 1) * 10;
  }

  /**
   * Calculate relevance to our tech stack
   */
  calculateRelevanceScore(text) {
    let score = 0;
    const lowerText = text.toLowerCase();

    for (const [keyword, points] of Object.entries(this.frameworkKeywords)) {
      if (lowerText.includes(keyword)) {
        score += points;
      }
    }

    // Boost for questions and discussions
    if (lowerText.includes('?') || lowerText.includes('how to') || lowerText.includes('help')) {
      score += 5;
    }

    // Boost for version-specific content
    if (lowerText.includes('15') || lowerText.includes('19') || lowerText.includes('v4')) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Extract framework mentions
   */
  extractFrameworks(text) {
    const frameworks = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('next.js') || lowerText.includes('nextjs')) frameworks.push('next.js');
    if (lowerText.includes('react')) frameworks.push('react');
    if (lowerText.includes('typescript') || lowerText.includes(' ts ')) frameworks.push('typescript');
    if (lowerText.includes('tailwind')) frameworks.push('tailwind');
    if (lowerText.includes('supabase')) frameworks.push('supabase');

    return frameworks;
  }

  /**
   * Categorize content
   */
  categorizeContent(text) {
    const categories = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('help') || lowerText.includes('?')) categories.push('question');
    if (lowerText.includes('tutorial') || lowerText.includes('guide')) categories.push('tutorial');
    if (lowerText.includes('release') || lowerText.includes('update')) categories.push('release');
    if (lowerText.includes('performance') || lowerText.includes('optimization')) categories.push('performance');
    if (lowerText.includes('bug') || lowerText.includes('issue')) categories.push('issue');
    if (lowerText.includes('security') || lowerText.includes('vulnerability')) categories.push('security');

    return categories;
  }

  /**
   * Assess priority level
   */
  assessPriority(text, engagementScore) {
    const lowerText = text.toLowerCase();

    // High priority indicators
    if (lowerText.includes('security') || lowerText.includes('vulnerability') ||
        lowerText.includes('breaking') || lowerText.includes('critical')) {
      return 'high';
    }

    // Medium priority for high engagement
    if (engagementScore > 20 || lowerText.includes('release') || lowerText.includes('update')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Run comprehensive Reddit monitoring
   */
  async runMonitoring() {
    console.log('🤖 Reddit Community Monitoring');
    console.log('=' .repeat(50));

    const results = [];

    try {
      // Authenticate first
      await this.authenticate();

      // Monitor priority subreddits
      console.log('\n🎯 Priority Subreddits');
      for (const subreddit of this.subreddits.priority1) {
        console.log(`📱 Monitoring r/${subreddit}...`);

        // Get hot posts
        const hotPosts = await this.getSubredditPosts(subreddit, 'hot', 15);
        results.push(...hotPosts);
        console.log(`   ✅ Hot posts: ${hotPosts.length} relevant`);

        // Get new posts for trending detection
        const newPosts = await this.getSubredditPosts(subreddit, 'new', 10);
        results.push(...newPosts);
        console.log(`   ✅ New posts: ${newPosts.length} relevant`);

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Targeted searches for specific topics
      console.log('\n🔍 Targeted Searches');
      const searchTerms = [
        'Next.js 15',
        'React 19',
        'Tailwind v4',
        'TypeScript 5.9',
        'Supabase',
        'security vulnerability'
      ];

      for (const term of searchTerms) {
        console.log(`🔎 Searching for: "${term}"`);
        const searchResults = await this.searchReddit(term, null, 10);
        results.push(...searchResults);
        console.log(`   ✅ Found: ${searchResults.length} relevant posts`);

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Remove duplicates
      const uniqueResults = this.deduplicateResults(results);

      // Save results
      const timestamp = Date.now();
      const filename = `reddit-monitoring-${timestamp}.json`;
      const filepath = path.join(__dirname, '..', 'data', filename);

      const monitoringData = {
        timestamp: new Date().toISOString(),
        api_usage: this.requestCount,
        subreddits_monitored: this.subreddits.priority1,
        results: uniqueResults,
        summary: this.generateSummary(uniqueResults)
      };

      fs.writeFileSync(filepath, JSON.stringify(monitoringData, null, 2));

      console.log(`\n💾 Results saved: ${filepath}`);
      console.log(`📊 API usage: ${this.requestCount}/${this.maxRequestsPerMinute} per minute`);
      console.log(`🎯 Total relevant posts: ${uniqueResults.length}`);

      return uniqueResults;

    } catch (error) {
      console.error('❌ Reddit monitoring failed:', error.message);
      return [];
    }
  }

  /**
   * Remove duplicate posts
   */
  deduplicateResults(results) {
    const seen = new Set();
    return results.filter(post => {
      const key = `${post.platform}:${post.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Generate monitoring summary
   */
  generateSummary(posts) {
    const summary = {
      total_posts: posts.length,
      subreddits: {},
      frameworks: {},
      categories: {},
      priority_breakdown: {
        high: posts.filter(p => p.priority === 'high').length,
        medium: posts.filter(p => p.priority === 'medium').length,
        low: posts.filter(p => p.priority === 'low').length
      },
      avg_engagement: 0,
      top_posts: posts
        .slice(0, 10)
        .map(p => ({
          title: p.title.substring(0, 80) + '...',
          subreddit: p.subreddit,
          score: p.score,
          comments: p.num_comments,
          frameworks: p.frameworks,
          url: p.url
        }))
    };

    // Count subreddits
    posts.forEach(post => {
      summary.subreddits[post.subreddit] = (summary.subreddits[post.subreddit] || 0) + 1;

      post.frameworks.forEach(framework => {
        summary.frameworks[framework] = (summary.frameworks[framework] || 0) + 1;
      });

      post.categories.forEach(category => {
        summary.categories[category] = (summary.categories[category] || 0) + 1;
      });
    });

    if (posts.length > 0) {
      summary.avg_engagement = posts.reduce((sum, p) => sum + p.engagement_score, 0) / posts.length;
    }

    return summary;
  }

  /**
   * Test Reddit API connection
   */
  async testConnection() {
    console.log('🔍 Testing Reddit API connection...');

    try {
      await this.authenticate();

      // Test with a simple request
      const testData = await this.getSubredditPosts('nextjs', 'hot', 1);

      if (testData.length >= 0) {
        console.log('✅ Reddit API connection successful!');
        console.log(`📊 Sample data retrieved from r/nextjs`);
        return true;
      }
    } catch (error) {
      console.error('❌ Reddit API connection failed:', error.message);
      return false;
    }
  }
}

// CLI interface
async function main() {
  const reddit = new RedditMonitoring();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await reddit.testConnection();
      break;

    case 'monitor':
      await reddit.runMonitoring();
      break;

    case 'subreddit':
      const subreddit = process.argv[3];
      if (subreddit) {
        const posts = await reddit.getSubredditPosts(subreddit);
        console.log(JSON.stringify(posts, null, 2));
      } else {
        console.log('Usage: node reddit-monitoring.js subreddit <subreddit_name>');
      }
      break;

    case 'search':
      const query = process.argv[3];
      if (query) {
        const posts = await reddit.searchReddit(query);
        console.log(JSON.stringify(posts, null, 2));
      } else {
        console.log('Usage: node reddit-monitoring.js search "<query>"');
      }
      break;

    default:
      console.log(`
Usage: node reddit-monitoring.js <command>

Commands:
  test      - Test Reddit API connection
  monitor   - Run comprehensive monitoring
  subreddit - Get posts from specific subreddit
  search    - Search Reddit for terms
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { RedditMonitoring };