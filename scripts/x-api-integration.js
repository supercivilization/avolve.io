#!/usr/bin/env node

/**
 * X.com (Twitter) API Integration for Social Listening
 *
 * Strategic monitoring of critical developer accounts and framework discussions
 * Optimized for X API v2 free tier (1,500 posts/month limit)
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class XAPIIntegration {
  constructor() {
    this.bearerToken = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN;
    this.baseUrl = 'api.x.com';

    // Strategic account monitoring (optimized for free tier limits)
    this.priorityAccounts = {
      // Tier 1: Critical framework & AI accounts (daily monitoring)
      tier1: [
        // Modern Tech Stack
        'vercel', 'rauchg', 'timneutkens', 'leeerob',
        'reactjs', 'dan_abramov', 'acdlite',
        'typescript', 'ahejlsberg', 'RyanCavanaugh',
        'tailwindcss', 'adamwathan',
        'supabase', 'kiwicopple',

        // AI Ecosystem - Primary
        'OpenAI', 'sama', 'gdb',
        'AnthropicAI', 'alexalbert__', 'darioamodei',
        'Google', 'GoogleAI', 'GoogleDevs',
        'Microsoft', 'Azure', 'satyanadella'
      ],

      // Tier 2: Secondary AI providers & influencers (weekly monitoring)
      tier2: [
        // AI Infrastructure & Providers
        'GroqInc', 'JonathanRoss',
        'MistralAI', 'arthurmensch',
        'togethercomputer', 'VipulVed',
        'perplexity_ai', 'AravSrinivas',
        'xAI', 'elonmusk',
        'huggingface', 'ClementDelangue',

        // Ecosystem influencers
        'kentcdodds', 'ryanflorence', 't3dotgg', 'shadcn',
        'fireship_dev', 'anthonysheww', 'thdxr'
      ],

      // Tier 3: Additional AI providers (monthly monitoring)
      tier3: [
        'CohereAI', 'AidanGomez',
        'replicate', 'bfirsh', 'zeke',
        'ElevenLabsIO', 'matiaszelaya',
        'deepseek_ai',
        'fireworksai_hq',
        'MSFTResearch'
      ]
    };

    // Keywords for search monitoring
    this.monitoringKeywords = [
      // Modern Tech Stack
      'Next.js 15', 'React 19', 'TypeScript 5.9', 'Tailwind v4',
      'Supabase', 'Vercel AI SDK',

      // AI Keywords
      'GPT-4', 'GPT-5', 'ChatGPT', 'Claude', 'Gemini',
      'AI safety', 'LLM security', 'prompt injection',
      'AI deployment', 'model training', 'inference optimization',

      // Security & Breaking Changes
      'security vulnerability', 'CVE', 'breaking change',
      'AI vulnerability', 'model security'
    ];

    // API rate limiting
    this.monthlyLimit = 1500; // Free tier limit
    this.dailyBudget = Math.floor(this.monthlyLimit / 30); // ~50 requests per day
    this.currentUsage = 0;
  }

  /**
   * Get user timeline for specific account
   */
  async getUserTimeline(username, maxResults = 10) {
    if (this.currentUsage >= this.dailyBudget) {
      console.log(`⚠️  Daily API limit reached (${this.dailyBudget}), skipping ${username}`);
      return null;
    }

    try {
      const userId = await this.getUserId(username);
      if (!userId) return null;

      const tweets = await this.makeAPIRequest(
        `/2/users/${userId}/tweets`,
        {
          max_results: maxResults,
          'tweet.fields': 'created_at,public_metrics,context_annotations,entities,referenced_tweets',
          'user.fields': 'verified,public_metrics',
          expansions: 'author_id,referenced_tweets.id'
        }
      );

      this.currentUsage++;
      return this.processTweets(tweets, username);
    } catch (error) {
      console.error(`❌ Error fetching timeline for ${username}:`, error.message);
      return null;
    }
  }

  /**
   * Search for tweets with specific keywords
   */
  async searchTweets(query, maxResults = 20) {
    if (this.currentUsage >= this.dailyBudget) {
      console.log('⚠️  Daily API limit reached, skipping search');
      return null;
    }

    try {
      const searchResults = await this.makeAPIRequest(
        '/2/tweets/search/recent',
        {
          query: `${query} -is:retweet lang:en`,
          max_results: maxResults,
          'tweet.fields': 'created_at,public_metrics,context_annotations,entities',
          'user.fields': 'verified,public_metrics',
          expansions: 'author_id'
        }
      );

      this.currentUsage++;
      return this.processTweets(searchResults, `search:${query}`);
    } catch (error) {
      console.error(`❌ Error searching for "${query}":`, error.message);
      return null;
    }
  }

  /**
   * Get user ID from username
   */
  async getUserId(username) {
    try {
      const user = await this.makeAPIRequest(
        '/2/users/by/username/' + username,
        { 'user.fields': 'public_metrics,verified' }
      );

      return user.data?.id;
    } catch (error) {
      console.error(`❌ Error getting user ID for ${username}:`, error.message);
      return null;
    }
  }

  /**
   * Make authenticated API request
   */
  async makeAPIRequest(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      const queryString = new URLSearchParams(params).toString();
      const path = endpoint + (queryString ? '?' + queryString : '');

      const options = {
        hostname: this.baseUrl,
        path: path,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'User-Agent': 'Avolve-Social-Listening/1.0'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);

            if (res.statusCode === 200) {
              resolve(jsonData);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${jsonData.title || data}`));
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
   * Process and analyze tweets
   */
  processTweets(response, source) {
    if (!response.data) return [];

    const tweets = response.data.map(tweet => {
      const metrics = tweet.public_metrics || {};
      const engagementScore = this.calculateEngagementScore(metrics);
      const relevanceScore = this.calculateRelevanceScore(tweet.text);

      return {
        id: tweet.id,
        source: source,
        platform: 'x.com',
        text: tweet.text,
        created_at: tweet.created_at,
        author_id: tweet.author_id,
        metrics: {
          retweet_count: metrics.retweet_count || 0,
          like_count: metrics.like_count || 0,
          reply_count: metrics.reply_count || 0,
          quote_count: metrics.quote_count || 0
        },
        engagement_score: engagementScore,
        relevance_score: relevanceScore,
        frameworks: this.extractFrameworks(tweet.text),
        categories: this.categorizeContent(tweet.text),
        priority: this.assessPriority(tweet.text, engagementScore),
        extracted_at: new Date().toISOString()
      };
    });

    return tweets.filter(tweet => tweet.relevance_score > 20); // Filter for relevant content
  }

  /**
   * Calculate engagement score
   */
  calculateEngagementScore(metrics) {
    const weights = {
      retweet: 3,
      like: 1,
      reply: 4,
      quote: 2
    };

    const score =
      (metrics.retweet_count || 0) * weights.retweet +
      (metrics.like_count || 0) * weights.like +
      (metrics.reply_count || 0) * weights.reply +
      (metrics.quote_count || 0) * weights.quote;

    return Math.log10(score + 1) * 10; // Logarithmic scaling
  }

  /**
   * Calculate relevance to our tech stack
   */
  calculateRelevanceScore(text) {
    const relevanceKeywords = {
      'next.js': 30, 'nextjs': 30, 'next js': 30,
      'react': 25, 'react 19': 35, 'react19': 35,
      'typescript': 25, 'typescript 5': 30, 'ts': 15,
      'tailwind': 25, 'tailwindcss': 30, 'tailwind css': 30,
      'supabase': 30,
      'vercel': 20, 'deployment': 15, 'hosting': 10,
      'security': 20, 'vulnerability': 25, 'cve': 30,
      'release': 20, 'update': 15, 'breaking change': 25,
      'performance': 15, 'optimization': 15, 'speed': 10
    };

    let score = 0;
    const lowerText = text.toLowerCase();

    for (const [keyword, points] of Object.entries(relevanceKeywords)) {
      if (lowerText.includes(keyword)) {
        score += points;
      }
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
   * Categorize content type
   */
  categorizeContent(text) {
    const categories = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('release') || lowerText.includes('version')) categories.push('release');
    if (lowerText.includes('security') || lowerText.includes('vulnerability')) categories.push('security');
    if (lowerText.includes('tutorial') || lowerText.includes('guide')) categories.push('tutorial');
    if (lowerText.includes('performance') || lowerText.includes('benchmark')) categories.push('performance');
    if (lowerText.includes('bug') || lowerText.includes('issue')) categories.push('issue');

    return categories;
  }

  /**
   * Assess priority level
   */
  assessPriority(text, engagementScore) {
    const lowerText = text.toLowerCase();

    // High priority indicators
    if (lowerText.includes('security') || lowerText.includes('vulnerability') ||
        lowerText.includes('critical') || lowerText.includes('breaking')) {
      return 'high';
    }

    // Medium priority with high engagement
    if (engagementScore > 15) return 'medium';

    return 'low';
  }

  /**
   * Strategic monitoring execution
   */
  async runStrategicMonitoring() {
    console.log('🐦 X.com Strategic Monitoring');
    console.log('=' .repeat(50));
    console.log(`📊 Daily budget: ${this.dailyBudget} API calls`);

    const results = [];

    try {
      // Monitor Tier 1 accounts (critical - daily)
      console.log('\n🎯 Tier 1: Critical Accounts');
      for (const username of this.priorityAccounts.tier1.slice(0, 8)) { // Limit to conserve API calls
        console.log(`📱 Monitoring @${username}...`);
        const tweets = await this.getUserTimeline(username, 5);
        if (tweets) {
          results.push(...tweets);
          console.log(`   ✅ Found ${tweets.length} relevant tweets`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Search for critical keywords
      console.log('\n🔍 Keyword Monitoring');
      for (const keyword of this.monitoringKeywords.slice(0, 3)) { // Limit searches
        console.log(`🔎 Searching for: "${keyword}"`);
        const tweets = await this.searchTweets(keyword, 10);
        if (tweets) {
          results.push(...tweets);
          console.log(`   ✅ Found ${tweets.length} relevant tweets`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Save results
      const timestamp = Date.now();
      const filename = `x-monitoring-${timestamp}.json`;
      const filepath = path.join(__dirname, '..', 'data', filename);

      fs.writeFileSync(filepath, JSON.stringify({
        timestamp: new Date().toISOString(),
        api_usage: this.currentUsage,
        daily_budget: this.dailyBudget,
        results: results,
        summary: this.generateSummary(results)
      }, null, 2));

      console.log(`\n💾 Results saved: ${filepath}`);
      console.log(`📊 API usage: ${this.currentUsage}/${this.dailyBudget}`);
      console.log(`🎯 Total relevant tweets: ${results.length}`);

      return results;

    } catch (error) {
      console.error('❌ Monitoring failed:', error.message);
      return [];
    }
  }

  /**
   * Generate summary insights
   */
  generateSummary(tweets) {
    const summary = {
      total_tweets: tweets.length,
      high_priority: tweets.filter(t => t.priority === 'high').length,
      frameworks: {},
      categories: {},
      avg_engagement: 0,
      top_tweets: tweets
        .sort((a, b) => b.engagement_score - a.engagement_score)
        .slice(0, 5)
        .map(t => ({
          text: t.text.substring(0, 100) + '...',
          engagement_score: t.engagement_score,
          frameworks: t.frameworks,
          source: t.source
        }))
    };

    // Calculate framework mentions
    tweets.forEach(tweet => {
      tweet.frameworks.forEach(framework => {
        summary.frameworks[framework] = (summary.frameworks[framework] || 0) + 1;
      });

      tweet.categories.forEach(category => {
        summary.categories[category] = (summary.categories[category] || 0) + 1;
      });
    });

    // Calculate average engagement
    if (tweets.length > 0) {
      summary.avg_engagement = tweets.reduce((sum, t) => sum + t.engagement_score, 0) / tweets.length;
    }

    return summary;
  }

  /**
   * Test API connection
   */
  async testConnection() {
    console.log('🔍 Testing X API connection...');

    if (!this.bearerToken) {
      console.log('❌ No Bearer Token found. Set X_BEARER_TOKEN environment variable.');
      return false;
    }

    try {
      const user = await this.getUserId('vercel');
      if (user) {
        console.log('✅ X API connection successful!');
        return true;
      } else {
        console.log('❌ Failed to get user data');
        return false;
      }
    } catch (error) {
      console.error('❌ X API connection failed:', error.message);
      return false;
    }
  }
}

// CLI interface
async function main() {
  const xMonitor = new XAPIIntegration();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await xMonitor.testConnection();
      break;

    case 'monitor':
      await xMonitor.runStrategicMonitoring();
      break;

    case 'user':
      const username = process.argv[3];
      if (username) {
        const tweets = await xMonitor.getUserTimeline(username);
        console.log(JSON.stringify(tweets, null, 2));
      } else {
        console.log('Usage: node x-api-integration.js user <username>');
      }
      break;

    case 'search':
      const query = process.argv[3];
      if (query) {
        const tweets = await xMonitor.searchTweets(query);
        console.log(JSON.stringify(tweets, null, 2));
      } else {
        console.log('Usage: node x-api-integration.js search "<query>"');
      }
      break;

    default:
      console.log(`
Usage: node x-api-integration.js <command>

Commands:
  test      - Test API connection
  monitor   - Run strategic monitoring
  user      - Get user timeline
  search    - Search tweets
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { XAPIIntegration };