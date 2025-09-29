#!/usr/bin/env node

/**
 * Monitoring-to-Intelligence Data Adapter
 *
 * Transforms raw monitoring data into intelligence-ready signal format
 * Bridges the gap between comprehensive monitoring outputs and strategic intelligence inputs
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 26, 2025
 */

const fs = require('fs');
const path = require('path');

class MonitoringToIntelligenceAdapter {
  constructor() {
    this.frameworkPatterns = {
      'next.js': ['nextjs', 'next.js', 'vercel', 'app router', 'turbopack'],
      'react': ['react', 'react 19', 'server components', 'jsx'],
      'tailwind': ['tailwind', 'tailwindcss', 'css framework'],
      'typescript': ['typescript', 'ts', 'type safety'],
      'supabase': ['supabase', 'database', 'edge functions'],
      'vercel': ['vercel', 'deployment', 'edge runtime'],
      'ai-development': ['ai development', 'claude code', 'mcp', 'ai sdk', 'anthropic'],
      'shadcn': ['shadcn', 'ui components', 'radix'],
      'vite': ['vite', 'vitejs', 'build tool'],
      'playwright': ['playwright', 'testing', 'e2e'],
      'sveltekit': ['svelte', 'sveltekit', 'svelte framework'],
      'angular': ['angular', 'angular framework'],
      'vue': ['vue', 'vuejs', 'vue framework']
    };

    this.categoryPatterns = {
      'release': ['release', 'version', 'update', 'new version'],
      'bug': ['bug', 'issue', 'problem', 'broken', 'error'],
      'feature': ['feature', 'new feature', 'enhancement', 'improvement'],
      'performance': ['performance', 'speed', 'fast', 'slow', 'optimization'],
      'security': ['security', 'vulnerability', 'cve', 'exploit'],
      'documentation': ['docs', 'documentation', 'readme', 'guide'],
      'discussion': ['discussion', 'question', 'help', 'how to'],
      'announcement': ['announcement', 'news', 'blog'],
      'tutorial': ['tutorial', 'example', 'demo', 'guide'],
      'comparison': ['vs', 'versus', 'compare', 'comparison']
    };

    this.priorityKeywords = {
      'high': ['breaking', 'critical', 'urgent', 'important', 'major'],
      'medium': ['minor', 'update', 'new', 'feature'],
      'low': ['discussion', 'question', 'docs']
    };
  }

  /**
   * Transform monitoring data to intelligence format
   */
  async transformMonitoringData(monitoringFile, outputFile = null) {
    console.log('📊 Monitoring-to-Intelligence Data Transformation');
    console.log('=' .repeat(60));

    try {
      // Read monitoring data
      const monitoringData = JSON.parse(fs.readFileSync(monitoringFile, 'utf8'));
      console.log(`📁 Input: ${monitoringFile}`);

      // Transform data
      const intelligenceData = this.convertToIntelligenceFormat(monitoringData);

      // Save transformed data
      const outputPath = outputFile || monitoringFile.replace('.json', '-intelligence-ready.json');
      fs.writeFileSync(outputPath, JSON.stringify(intelligenceData, null, 2));

      console.log(`✅ Transformation complete`);
      console.log(`📊 Processed ${intelligenceData.results.length} signals`);
      console.log(`📁 Output: ${outputPath}`);

      return { inputFile: monitoringFile, outputFile: outputPath, data: intelligenceData };

    } catch (error) {
      console.error('❌ Transformation failed:', error.message);
      throw error;
    }
  }

  /**
   * Convert monitoring data to intelligence-ready format
   */
  convertToIntelligenceFormat(monitoringData) {
    const intelligenceSignals = [];

    // Process each platform's results
    if (monitoringData.results) {
      monitoringData.results.forEach(platformResult => {
        const platformSignals = this.processPlatformData(platformResult);
        intelligenceSignals.push(...platformSignals);
      });
    }

    return {
      timestamp: new Date().toISOString(),
      processing_pipeline: 'monitoring_to_intelligence_v1',
      original_timestamp: monitoringData.timestamp,
      source_platforms: monitoringData.platforms,
      total_raw_items: this.countTotalItems(monitoringData),
      results: intelligenceSignals,
      transformation_summary: {
        signals_created: intelligenceSignals.length,
        platforms_processed: monitoringData.results ? monitoringData.results.length : 0,
        processing_time: new Date().toISOString()
      }
    };
  }

  /**
   * Process data from a single platform
   */
  processPlatformData(platformResult) {
    const signals = [];

    if (!platformResult.data || !Array.isArray(platformResult.data)) {
      return signals;
    }

    platformResult.data.forEach(item => {
      const signal = this.createIntelligenceSignal(item, platformResult.platform);
      if (signal && this.isSignalRelevant(signal)) {
        signals.push(signal);
      }
    });

    return signals;
  }

  /**
   * Create intelligence signal from raw platform data
   */
  createIntelligenceSignal(item, platform) {
    let signal = {
      id: this.generateSignalId(item, platform),
      platform: platform,
      timestamp: new Date().toISOString(),
      url: this.extractUrl(item, platform),
      title: this.extractTitle(item, platform),
      content: this.extractContent(item, platform),
      author: this.extractAuthor(item, platform),
      created_at: this.extractCreatedDate(item, platform),
      frameworks: [],
      categories: [],
      relevance_score: 0,
      engagement_score: 0,
      priority: 'low'
    };

    // Extract frameworks mentioned
    signal.frameworks = this.detectFrameworks(signal.title + ' ' + signal.content);

    // Extract categories
    signal.categories = this.detectCategories(signal.title + ' ' + signal.content);

    // Calculate scores
    signal.relevance_score = this.calculateRelevanceScore(signal);
    signal.engagement_score = this.calculateEngagementScore(item, platform);
    signal.priority = this.determinePriority(signal);

    return signal;
  }

  /**
   * Extract URL from platform-specific data
   */
  extractUrl(item, platform) {
    switch (platform) {
      case 'github':
        return item.html_url || item.url;
      case 'reddit':
        return `https://reddit.com${item.permalink}` || item.url;
      case 'youtube':
        return `https://youtube.com/watch?v=${item.id}` || item.url;
      default:
        return item.url || '#';
    }
  }

  /**
   * Extract title from platform-specific data
   */
  extractTitle(item, platform) {
    switch (platform) {
      case 'github':
        return item.title || 'GitHub Item';
      case 'reddit':
        return item.title || 'Reddit Post';
      case 'youtube':
        return item.snippet?.title || item.title || 'YouTube Video';
      default:
        return item.title || 'Unknown Item';
    }
  }

  /**
   * Extract content from platform-specific data
   */
  extractContent(item, platform) {
    switch (platform) {
      case 'github':
        return item.body || '';
      case 'reddit':
        return item.selftext || '';
      case 'youtube':
        return item.snippet?.description || '';
      default:
        return item.content || item.description || '';
    }
  }

  /**
   * Extract author from platform-specific data
   */
  extractAuthor(item, platform) {
    switch (platform) {
      case 'github':
        return item.user?.login || 'unknown';
      case 'reddit':
        return item.author || 'unknown';
      case 'youtube':
        return item.snippet?.channelTitle || 'unknown';
      default:
        return item.author || 'unknown';
    }
  }

  /**
   * Extract creation date from platform-specific data
   */
  extractCreatedDate(item, platform) {
    switch (platform) {
      case 'github':
        return item.created_at;
      case 'reddit':
        return item.created_utc ? new Date(item.created_utc * 1000).toISOString() : null;
      case 'youtube':
        return item.snippet?.publishedAt;
      default:
        return item.created_at || item.published_at;
    }
  }

  /**
   * Detect frameworks mentioned in content
   */
  detectFrameworks(text) {
    const frameworks = [];
    const lowerText = text.toLowerCase();

    Object.entries(this.frameworkPatterns).forEach(([framework, patterns]) => {
      if (patterns.some(pattern => lowerText.includes(pattern.toLowerCase()))) {
        frameworks.push(framework);
      }
    });

    return frameworks;
  }

  /**
   * Detect categories from content
   */
  detectCategories(text) {
    const categories = [];
    const lowerText = text.toLowerCase();

    Object.entries(this.categoryPatterns).forEach(([category, patterns]) => {
      if (patterns.some(pattern => lowerText.includes(pattern.toLowerCase()))) {
        categories.push(category);
      }
    });

    return categories;
  }

  /**
   * Calculate relevance score for Avolve.io
   */
  calculateRelevanceScore(signal) {
    let score = 0;

    // Framework relevance
    const coreFrameworks = ['next.js', 'react', 'tailwind', 'typescript', 'ai-development'];
    const frameworkMatches = signal.frameworks.filter(f => coreFrameworks.includes(f)).length;
    score += frameworkMatches * 20;

    // Category relevance
    const criticalCategories = ['release', 'bug', 'performance', 'security'];
    const categoryMatches = signal.categories.filter(c => criticalCategories.includes(c)).length;
    score += categoryMatches * 15;

    // AI-native content boost
    if (signal.frameworks.includes('ai-development') ||
        signal.content.toLowerCase().includes('claude') ||
        signal.content.toLowerCase().includes('mcp')) {
      score += 25;
    }

    // Title relevance
    if (signal.title.toLowerCase().includes('next.js') ||
        signal.title.toLowerCase().includes('react 19')) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Calculate engagement score from platform metrics
   */
  calculateEngagementScore(item, platform) {
    let score = 0;

    switch (platform) {
      case 'github':
        score += (item.comments || 0) * 2;
        score += (item.reactions?.total_count || 0) * 1;
        if (item.labels && item.labels.length > 0) score += 5;
        break;

      case 'reddit':
        score += (item.score || 0) * 0.1;
        score += (item.num_comments || 0) * 2;
        score += (item.upvote_ratio || 0.5) * 10;
        break;

      case 'youtube':
        const stats = item.statistics || {};
        score += Math.log10((parseInt(stats.viewCount) || 0) + 1) * 5;
        score += Math.log10((parseInt(stats.likeCount) || 0) + 1) * 3;
        score += Math.log10((parseInt(stats.commentCount) || 0) + 1) * 2;
        break;
    }

    return Math.min(score, 100);
  }

  /**
   * Determine priority level
   */
  determinePriority(signal) {
    const text = (signal.title + ' ' + signal.content).toLowerCase();

    // Check for high priority keywords
    if (this.priorityKeywords.high.some(keyword => text.includes(keyword))) {
      return 'high';
    }

    // High relevance = high priority
    if (signal.relevance_score > 70) {
      return 'high';
    }

    // Medium relevance or engagement
    if (signal.relevance_score > 40 || signal.engagement_score > 30) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Check if signal is relevant enough to include
   */
  isSignalRelevant(signal) {
    // Must have at least one framework or high relevance
    return signal.frameworks.length > 0 || signal.relevance_score > 30;
  }

  /**
   * Generate unique signal ID
   */
  generateSignalId(item, platform) {
    const timestamp = Date.now();
    const itemId = item.id || item.number || item.name || 'unknown';
    return `${platform}_${itemId}_${timestamp}`;
  }

  /**
   * Count total items in monitoring data
   */
  countTotalItems(monitoringData) {
    if (!monitoringData.results) return 0;

    return monitoringData.results.reduce((total, platform) => {
      return total + (platform.count || platform.data?.length || 0);
    }, 0);
  }

  /**
   * Test transformation with sample data
   */
  async testTransformation() {
    console.log('🧪 Testing Monitoring-to-Intelligence Transformation');
    console.log('=' .repeat(60));

    // Create sample monitoring data
    const sampleData = {
      timestamp: new Date().toISOString(),
      platforms: { github: { enabled: true, results: 2 } },
      results: [{
        platform: 'github',
        count: 2,
        data: [
          {
            id: 61240,
            html_url: 'https://github.com/vercel/next.js/issues/61240',
            title: 'Vercel Logging Broken on app router',
            body: 'Next.js 15 Turbopack has performance issues in production',
            user: { login: 'testuser' },
            created_at: new Date().toISOString(),
            comments: 15,
            reactions: { total_count: 5 }
          },
          {
            id: 61241,
            html_url: 'https://github.com/facebook/react/issues/61241',
            title: 'React 19 Server Components memory leak',
            body: 'Server components causing memory issues in production',
            user: { login: 'reactdev' },
            created_at: new Date().toISOString(),
            comments: 8,
            reactions: { total_count: 12 }
          }
        ]
      }]
    };

    const testFile = '/tmp/test-monitoring-data.json';
    fs.writeFileSync(testFile, JSON.stringify(sampleData, null, 2));

    const result = await this.transformMonitoringData(testFile);

    console.log(`\n✅ Transformation test complete`);
    console.log(`📊 Created ${result.data.results.length} intelligence signals`);

    // Show sample signal
    if (result.data.results.length > 0) {
      const sample = result.data.results[0];
      console.log(`\n📋 Sample Signal:`);
      console.log(`   Title: ${sample.title}`);
      console.log(`   Frameworks: [${sample.frameworks.join(', ')}]`);
      console.log(`   Categories: [${sample.categories.join(', ')}]`);
      console.log(`   Relevance: ${sample.relevance_score}`);
      console.log(`   Engagement: ${sample.engagement_score}`);
      console.log(`   Priority: ${sample.priority}`);
    }

    return result;
  }
}

// CLI interface
async function main() {
  const adapter = new MonitoringToIntelligenceAdapter();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await adapter.testTransformation();
      break;

    case 'transform':
      const inputFile = process.argv[3];
      const outputFile = process.argv[4];

      if (inputFile && fs.existsSync(inputFile)) {
        await adapter.transformMonitoringData(inputFile, outputFile);
      } else {
        console.log('Usage: node monitoring-to-intelligence-adapter.js transform <input-file.json> [output-file.json]');
      }
      break;

    default:
      console.log(`
Monitoring-to-Intelligence Data Adapter Commands:

  test      - Test transformation with sample data
  transform - Transform monitoring data to intelligence format

Examples:
  node monitoring-to-intelligence-adapter.js test
  node monitoring-to-intelligence-adapter.js transform monitoring-data.json intelligence-data.json
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { MonitoringToIntelligenceAdapter };