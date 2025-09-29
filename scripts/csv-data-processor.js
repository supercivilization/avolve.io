#!/usr/bin/env node

/**
 * CSV Data Processor for Social Listening
 *
 * Processes extracted social media data (YouTube, Twitter, etc.) and stores
 * in Supabase for analysis and insights generation.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const fs = require('fs').promises;
const path = require('path');

class CSVDataProcessor {
  constructor() {
    this.supabaseConfig = {
      url: process.env.SUPABASE_URL,
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    };

    // Validate required environment variables
    if (!this.supabaseConfig.url) {
      throw new Error('SUPABASE_URL environment variable is required');
    }
    if (!this.supabaseConfig.serviceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    }
    this.dataDir = path.join(__dirname, '../data');
  }

  /**
   * Process existing YouTube extraction data
   */
  async processYouTubeData() {
    console.log('📺 Processing YouTube extraction data...');

    try {
      // Check for existing extraction files
      const extractionFiles = [
        'tech_video.json',
        'first_extraction.json',
        'test_transcript.json'
      ];

      const processedData = [];

      for (const filename of extractionFiles) {
        const filepath = path.join(__dirname, filename);
        try {
          const rawData = await fs.readFile(filepath, 'utf8');
          const videoData = JSON.parse(rawData);

          const processed = this.processVideoData(videoData, filename);
          processedData.push(processed);

          console.log(`✅ Processed ${filename}: ${videoData.metadata?.title || 'Unknown title'}`);
        } catch (error) {
          console.log(`⚠️  Could not process ${filename}: ${error.message}`);
        }
      }

      // Generate insights from processed data
      const insights = this.generateYouTubeInsights(processedData);

      // Save processed data and insights
      await this.saveProcessedData(processedData, insights);

      return {
        processedVideos: processedData.length,
        insights: insights,
        data: processedData
      };

    } catch (error) {
      console.error('Error processing YouTube data:', error);
      throw error;
    }
  }

  /**
   * Process individual video data into standardized format
   */
  processVideoData(videoData, source) {
    const processed = {
      id: videoData.videoId,
      platform: 'youtube',
      source: source,
      extractedAt: videoData.extractedAt,
      metadata: {
        title: videoData.metadata?.title || 'Unknown',
        description: videoData.metadata?.description || '',
        channelTitle: videoData.metadata?.channelTitle || '',
        publishedAt: videoData.metadata?.publishedAt,
        viewCount: videoData.metadata?.viewCount || 0,
        likeCount: videoData.metadata?.likeCount || 0,
        commentCount: videoData.metadata?.commentCount || 0,
        tags: videoData.metadata?.tags || []
      },
      content: {
        transcript: videoData.transcript || [],
        transcriptText: videoData.transcriptText || '',
        hasTranscript: (videoData.transcript || []).length > 0
      },
      analysis: this.analyzeVideoContent(videoData),
      techStackRelevance: this.assessTechStackRelevance(videoData)
    };

    return processed;
  }

  /**
   * Analyze video content for insights
   */
  analyzeVideoContent(videoData) {
    const analysis = {
      contentType: 'unknown',
      topics: [],
      sentiment: 'neutral',
      techLevel: 'unknown',
      duration: null,
      engagement: {
        score: 0,
        level: 'low'
      }
    };

    const title = videoData.metadata?.title?.toLowerCase() || '';
    const description = videoData.metadata?.description?.toLowerCase() || '';
    const tags = videoData.metadata?.tags || [];

    // Determine content type
    if (title.includes('tutorial') || title.includes('how to') || title.includes('guide')) {
      analysis.contentType = 'tutorial';
    } else if (title.includes('review') || title.includes('comparison')) {
      analysis.contentType = 'review';
    } else if (title.includes('news') || title.includes('update') || title.includes('announcement')) {
      analysis.contentType = 'news';
    } else if (title.includes('demo') || title.includes('showcase')) {
      analysis.contentType = 'demo';
    }

    // Extract topics from tags and title
    analysis.topics = tags.slice(0, 5); // Top 5 tags as topics

    // Assess technical level
    const technicalTerms = ['api', 'framework', 'library', 'typescript', 'javascript', 'react', 'nextjs'];
    const technicalCount = technicalTerms.filter(term =>
      title.includes(term) || description.includes(term)
    ).length;

    if (technicalCount >= 3) {
      analysis.techLevel = 'advanced';
    } else if (technicalCount >= 1) {
      analysis.techLevel = 'intermediate';
    } else {
      analysis.techLevel = 'beginner';
    }

    // Calculate engagement score
    const views = videoData.metadata?.viewCount || 0;
    const likes = videoData.metadata?.likeCount || 0;
    const comments = videoData.metadata?.commentCount || 0;

    if (views > 0) {
      analysis.engagement.score = ((likes + comments * 2) / views) * 100;

      if (analysis.engagement.score > 5) {
        analysis.engagement.level = 'high';
      } else if (analysis.engagement.score > 1) {
        analysis.engagement.level = 'medium';
      }
    }

    return analysis;
  }

  /**
   * Assess relevance to our tech stack
   */
  assessTechStackRelevance(videoData) {
    const relevance = {
      score: 0,
      frameworks: [],
      categories: [],
      priority: 'low'
    };

    const title = videoData.metadata?.title?.toLowerCase() || '';
    const description = videoData.metadata?.description?.toLowerCase() || '';
    const tags = (videoData.metadata?.tags || []).map(tag => tag.toLowerCase());

    const allText = `${title} ${description} ${tags.join(' ')}`;

    // Check for framework mentions
    const frameworkKeywords = {
      'nextjs': ['next.js', 'nextjs', 'next js', 'next'],
      'react': ['react', 'react 19', 'react 18', 'jsx'],
      'typescript': ['typescript', 'ts', 'types'],
      'tailwindcss': ['tailwind', 'tailwind css', 'css framework'],
      'supabase': ['supabase', 'postgres', 'postgresql'],
      'vercel': ['vercel', 'deployment', 'hosting'],
      'ai-development': ['ai', 'artificial intelligence', 'machine learning', 'llm', 'claude', 'gpt']
    };

    Object.entries(frameworkKeywords).forEach(([framework, keywords]) => {
      const matches = keywords.filter(keyword => allText.includes(keyword));
      if (matches.length > 0) {
        relevance.frameworks.push(framework);
        relevance.score += matches.length * 10;
      }
    });

    // Categorize content
    const categoryKeywords = {
      'performance': ['performance', 'optimization', 'speed', 'fast', 'benchmark'],
      'development': ['development', 'coding', 'programming', 'build', 'deploy'],
      'tutorial': ['tutorial', 'guide', 'how to', 'learn', 'course'],
      'news': ['news', 'update', 'release', 'announcement', 'new'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'automation']
    };

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const hasKeyword = keywords.some(keyword => allText.includes(keyword));
      if (hasKeyword) {
        relevance.categories.push(category);
        relevance.score += 5;
      }
    });

    // Determine priority
    if (relevance.score >= 30) {
      relevance.priority = 'high';
    } else if (relevance.score >= 15) {
      relevance.priority = 'medium';
    }

    return relevance;
  }

  /**
   * Generate insights from processed YouTube data
   */
  generateYouTubeInsights(processedData) {
    const insights = {
      summary: {
        totalVideos: processedData.length,
        relevantVideos: processedData.filter(v => v.techStackRelevance.score > 10).length,
        averageEngagement: 0,
        topFrameworks: {},
        contentTypes: {}
      },
      trends: {
        emergingTopics: [],
        popularChannels: {},
        contentGaps: []
      },
      recommendations: []
    };

    // Calculate summary statistics
    const engagementScores = processedData
      .map(v => v.analysis.engagement.score)
      .filter(score => score > 0);

    if (engagementScores.length > 0) {
      insights.summary.averageEngagement =
        engagementScores.reduce((a, b) => a + b, 0) / engagementScores.length;
    }

    // Count framework mentions
    processedData.forEach(video => {
      video.techStackRelevance.frameworks.forEach(framework => {
        insights.summary.topFrameworks[framework] =
          (insights.summary.topFrameworks[framework] || 0) + 1;
      });

      const contentType = video.analysis.contentType;
      insights.summary.contentTypes[contentType] =
        (insights.summary.contentTypes[contentType] || 0) + 1;
    });

    // Identify popular channels
    processedData.forEach(video => {
      const channel = video.metadata.channelTitle;
      if (channel && channel !== '') {
        insights.trends.popularChannels[channel] =
          (insights.trends.popularChannels[channel] || 0) + 1;
      }
    });

    // Generate recommendations
    if (insights.summary.relevantVideos > 0) {
      insights.recommendations.push({
        type: 'content_analysis',
        priority: 'medium',
        description: `Found ${insights.summary.relevantVideos} relevant videos for tech stack monitoring`,
        action: 'Continue monitoring these channels and topics'
      });
    }

    if (Object.keys(insights.summary.topFrameworks).length > 0) {
      const topFramework = Object.entries(insights.summary.topFrameworks)
        .sort(([,a], [,b]) => b - a)[0];

      insights.recommendations.push({
        type: 'trending_framework',
        priority: 'high',
        description: `${topFramework[0]} appears most frequently in monitored content`,
        action: 'Focus documentation updates on this framework'
      });
    }

    return insights;
  }

  /**
   * Save processed data and insights
   */
  async saveProcessedData(processedData, insights) {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });

      const timestamp = Date.now();

      // Save processed data
      const dataFile = path.join(this.dataDir, `processed-youtube-${timestamp}.json`);
      await fs.writeFile(dataFile, JSON.stringify(processedData, null, 2));

      // Save insights
      const insightsFile = path.join(this.dataDir, `youtube-insights-${timestamp}.json`);
      await fs.writeFile(insightsFile, JSON.stringify(insights, null, 2));

      // Save latest versions
      const latestDataFile = path.join(this.dataDir, 'latest-youtube-data.json');
      await fs.writeFile(latestDataFile, JSON.stringify(processedData, null, 2));

      const latestInsightsFile = path.join(this.dataDir, 'latest-youtube-insights.json');
      await fs.writeFile(latestInsightsFile, JSON.stringify(insights, null, 2));

      console.log(`💾 Data saved to: ${dataFile}`);
      console.log(`💾 Insights saved to: ${insightsFile}`);

    } catch (error) {
      console.error('Error saving processed data:', error);
    }
  }

  /**
   * Create CSV report from processed data
   */
  async createCSVReport(processedData) {
    const csvRows = [
      // Header row
      [
        'Video ID',
        'Title',
        'Channel',
        'Published At',
        'View Count',
        'Like Count',
        'Comment Count',
        'Content Type',
        'Tech Level',
        'Engagement Score',
        'Relevance Score',
        'Frameworks',
        'Categories',
        'Priority'
      ].join(',')
    ];

    // Data rows
    processedData.forEach(video => {
      const row = [
        video.id,
        `"${video.metadata.title.replace(/"/g, '""')}"`,
        `"${video.metadata.channelTitle.replace(/"/g, '""')}"`,
        video.metadata.publishedAt,
        video.metadata.viewCount,
        video.metadata.likeCount,
        video.metadata.commentCount,
        video.analysis.contentType,
        video.analysis.techLevel,
        video.analysis.engagement.score.toFixed(2),
        video.techStackRelevance.score,
        `"${video.techStackRelevance.frameworks.join(', ')}"`,
        `"${video.techStackRelevance.categories.join(', ')}"`,
        video.techStackRelevance.priority
      ].join(',');

      csvRows.push(row);
    });

    const csvContent = csvRows.join('\n');
    const timestamp = Date.now();
    const csvFile = path.join(this.dataDir, `youtube-report-${timestamp}.csv`);

    await fs.writeFile(csvFile, csvContent);
    console.log(`📊 CSV report saved to: ${csvFile}`);

    return csvFile;
  }

  /**
   * Display summary statistics
   */
  displaySummary(insights) {
    console.log('\n📊 YouTube Data Analysis Summary');
    console.log('=' * 40);

    console.log(`Total Videos Processed: ${insights.summary.totalVideos}`);
    console.log(`Relevant Videos: ${insights.summary.relevantVideos}`);
    console.log(`Average Engagement: ${insights.summary.averageEngagement.toFixed(2)}%`);

    console.log('\n🔥 Top Frameworks:');
    Object.entries(insights.summary.topFrameworks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([framework, count]) => {
        console.log(`  ${framework}: ${count} mentions`);
      });

    console.log('\n📺 Content Types:');
    Object.entries(insights.summary.contentTypes)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count} videos`);
      });

    console.log('\n💡 Recommendations:');
    insights.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.description}`);
      console.log(`     Action: ${rec.action}`);
    });
  }
}

// CLI Interface
async function main() {
  console.log('🚀 Avolve CSV Data Processor');
  console.log('=' * 30);

  const args = process.argv.slice(2);
  const command = args[0] || 'process';

  const processor = new CSVDataProcessor();

  try {
    switch (command) {
      case 'process':
        const results = await processor.processYouTubeData();
        processor.displaySummary(results.insights);

        if (results.processedVideos > 0) {
          await processor.createCSVReport(results.data);
        }
        break;

      case 'help':
        console.log('\n📚 Available Commands:');
        console.log('  process  - Process existing YouTube extraction data');
        console.log('  help     - Show this help message');
        break;

      default:
        console.log(`❌ Unknown command: ${command}`);
        console.log('Run "node csv-data-processor.js help" for available commands');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CSVDataProcessor };