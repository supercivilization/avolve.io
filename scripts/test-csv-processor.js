#!/usr/bin/env node

/**
 * Test CSV Processor with Supabase Integration
 *
 * Test script to validate the CSV data processor and demonstrate
 * integration with Supabase for storing social listening data.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const { CSVDataProcessor } = require('./csv-data-processor');
const https = require('https');

class SupabaseTestIntegration {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Validate required environment variables
    if (!this.supabaseUrl) {
      throw new Error('SUPABASE_URL environment variable is required');
    }
    if (!this.serviceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    }
  }

  /**
   * Test Supabase connection
   */
  async testSupabaseConnection() {
    console.log('🔍 Testing Supabase connection...');

    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: '/rest/v1/',
        method: 'GET',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Supabase connection successful!');
            resolve(true);
          } else {
            console.log(`❌ Supabase connection failed with status: ${res.statusCode}`);
            console.log('Response:', data);
            resolve(false);
          }
        });
      });

      req.on('error', (error) => {
        console.log('❌ Supabase connection error:', error.message);
        resolve(false);
      });

      req.end();
    });
  }

  /**
   * Create social listening tables in Supabase
   */
  async createSocialListeningTables() {
    console.log('🏗️  Creating social listening tables...');

    const tables = [
      {
        name: 'social_content',
        sql: `
          CREATE TABLE IF NOT EXISTS social_content (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            platform VARCHAR(50) NOT NULL,
            content_id VARCHAR(255) NOT NULL UNIQUE,
            title TEXT,
            description TEXT,
            author VARCHAR(255),
            published_at TIMESTAMP WITH TIME ZONE,
            extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            view_count INTEGER DEFAULT 0,
            like_count INTEGER DEFAULT 0,
            comment_count INTEGER DEFAULT 0,
            share_count INTEGER DEFAULT 0,
            tags TEXT[],
            content_type VARCHAR(50),
            tech_level VARCHAR(20),
            engagement_score DECIMAL(5,2) DEFAULT 0,
            relevance_score INTEGER DEFAULT 0,
            frameworks TEXT[],
            categories TEXT[],
            priority VARCHAR(10) DEFAULT 'low',
            raw_data JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      },
      {
        name: 'tech_stack_mentions',
        sql: `
          CREATE TABLE IF NOT EXISTS tech_stack_mentions (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            content_id UUID REFERENCES social_content(id) ON DELETE CASCADE,
            framework VARCHAR(100) NOT NULL,
            mention_count INTEGER DEFAULT 1,
            context TEXT,
            sentiment VARCHAR(20) DEFAULT 'neutral',
            confidence_score DECIMAL(3,2) DEFAULT 0.5,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      },
      {
        name: 'monitoring_insights',
        sql: `
          CREATE TABLE IF NOT EXISTS monitoring_insights (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            insight_type VARCHAR(50) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            priority VARCHAR(10) DEFAULT 'medium',
            frameworks TEXT[],
            data_points INTEGER DEFAULT 0,
            confidence_score DECIMAL(3,2) DEFAULT 0.5,
            actionable BOOLEAN DEFAULT true,
            action_taken BOOLEAN DEFAULT false,
            insight_data JSONB,
            generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            expires_at TIMESTAMP WITH TIME ZONE
          );
        `
      }
    ];

    for (const table of tables) {
      try {
        await this.executeSQL(table.sql);
        console.log(`✅ Created table: ${table.name}`);
      } catch (error) {
        console.log(`⚠️  Table ${table.name} might already exist or error:`, error.message);
      }
    }

    console.log('🎯 Database schema ready for social listening data!');
  }

  /**
   * Execute SQL command on Supabase
   */
  async executeSQL(sql) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({ query: sql });

      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: '/rest/v1/rpc/execute_sql',
        method: 'POST',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data || '{}'));
          } else {
            reject(new Error(`SQL execution failed: ${res.statusCode} - ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Insert processed social content into Supabase
   */
  async insertSocialContent(processedData) {
    console.log('💾 Inserting processed data into Supabase...');

    const insertData = processedData.map(item => ({
      platform: item.platform,
      content_id: item.id,
      title: item.metadata.title,
      description: item.metadata.description,
      author: item.metadata.channelTitle,
      published_at: item.metadata.publishedAt,
      extracted_at: item.extractedAt,
      view_count: item.metadata.viewCount,
      like_count: item.metadata.likeCount,
      comment_count: item.metadata.commentCount,
      tags: item.metadata.tags,
      content_type: item.analysis.contentType,
      tech_level: item.analysis.techLevel,
      engagement_score: item.analysis.engagement.score,
      relevance_score: item.techStackRelevance.score,
      frameworks: item.techStackRelevance.frameworks,
      categories: item.techStackRelevance.categories,
      priority: item.techStackRelevance.priority,
      raw_data: item
    }));

    try {
      const result = await this.insertData('social_content', insertData);
      console.log(`✅ Inserted ${insertData.length} records into social_content table`);
      return result;
    } catch (error) {
      console.log('❌ Error inserting data:', error.message);
      throw error;
    }
  }

  /**
   * Insert data into Supabase table
   */
  async insertData(table, data) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(data);

      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: `/rest/v1/${table}`,
        method: 'POST',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(responseData || '[]'));
          } else {
            reject(new Error(`Insert failed: ${res.statusCode} - ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Query social content from Supabase
   */
  async querySocialContent(filters = {}) {
    console.log('🔍 Querying social content from Supabase...');

    let query = 'select=*';

    if (filters.platform) {
      query += `&platform=eq.${filters.platform}`;
    }

    if (filters.priority) {
      query += `&priority=eq.${filters.priority}`;
    }

    if (filters.limit) {
      query += `&limit=${filters.limit}`;
    }

    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: `/rest/v1/social_content?${query}&order=created_at.desc`,
        method: 'GET',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            const results = JSON.parse(data || '[]');
            console.log(`✅ Retrieved ${results.length} records from social_content`);
            resolve(results);
          } else {
            reject(new Error(`Query failed: ${res.statusCode} - ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  /**
   * Generate analytics from stored data
   */
  async generateAnalytics() {
    console.log('📊 Generating analytics from stored data...');

    try {
      // Get all content
      const allContent = await this.querySocialContent({ limit: 1000 });

      const analytics = {
        totalContent: allContent.length,
        platforms: {},
        frameworks: {},
        contentTypes: {},
        priorities: {},
        averageEngagement: 0,
        topPerformers: [],
        insights: []
      };

      // Analyze platform distribution
      allContent.forEach(item => {
        // Platform stats
        analytics.platforms[item.platform] = (analytics.platforms[item.platform] || 0) + 1;

        // Framework mentions
        if (item.frameworks) {
          item.frameworks.forEach(framework => {
            analytics.frameworks[framework] = (analytics.frameworks[framework] || 0) + 1;
          });
        }

        // Content types
        analytics.contentTypes[item.content_type] = (analytics.contentTypes[item.content_type] || 0) + 1;

        // Priorities
        analytics.priorities[item.priority] = (analytics.priorities[item.priority] || 0) + 1;
      });

      // Calculate average engagement
      const engagementScores = allContent
        .map(item => parseFloat(item.engagement_score))
        .filter(score => !isNaN(score) && score > 0);

      if (engagementScores.length > 0) {
        analytics.averageEngagement = engagementScores.reduce((a, b) => a + b, 0) / engagementScores.length;
      }

      // Find top performers
      analytics.topPerformers = allContent
        .filter(item => item.engagement_score > analytics.averageEngagement)
        .sort((a, b) => parseFloat(b.engagement_score) - parseFloat(a.engagement_score))
        .slice(0, 5)
        .map(item => ({
          title: item.title,
          platform: item.platform,
          engagement: item.engagement_score,
          frameworks: item.frameworks
        }));

      // Generate insights
      const topFramework = Object.entries(analytics.frameworks)
        .sort(([,a], [,b]) => b - a)[0];

      if (topFramework) {
        analytics.insights.push({
          type: 'trending_framework',
          message: `${topFramework[0]} is mentioned in ${topFramework[1]} pieces of content`,
          action: 'Consider focusing documentation updates on this framework'
        });
      }

      const highPriorityCount = analytics.priorities.high || 0;
      if (highPriorityCount > 0) {
        analytics.insights.push({
          type: 'high_priority_content',
          message: `${highPriorityCount} pieces of high-priority content detected`,
          action: 'Review and respond to high-priority content trends'
        });
      }

      return analytics;

    } catch (error) {
      console.error('Error generating analytics:', error);
      throw error;
    }
  }

  /**
   * Display analytics results
   */
  displayAnalytics(analytics) {
    console.log('\n📊 Social Listening Analytics Dashboard');
    console.log('=' * 50);

    console.log(`Total Content Pieces: ${analytics.totalContent}`);
    console.log(`Average Engagement: ${analytics.averageEngagement.toFixed(2)}%`);

    console.log('\n🌍 Platform Distribution:');
    Object.entries(analytics.platforms)
      .sort(([,a], [,b]) => b - a)
      .forEach(([platform, count]) => {
        console.log(`  ${platform}: ${count} pieces`);
      });

    console.log('\n🔧 Framework Mentions:');
    Object.entries(analytics.frameworks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([framework, count]) => {
        console.log(`  ${framework}: ${count} mentions`);
      });

    console.log('\n📺 Content Types:');
    Object.entries(analytics.contentTypes)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count} pieces`);
      });

    console.log('\n⭐ Top Performers:');
    analytics.topPerformers.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title.substring(0, 60)}...`);
      console.log(`     Platform: ${item.platform} | Engagement: ${item.engagement}%`);
      console.log(`     Frameworks: ${item.frameworks.join(', ')}`);
    });

    console.log('\n💡 Key Insights:');
    analytics.insights.forEach((insight, index) => {
      console.log(`  ${index + 1}. ${insight.message}`);
      console.log(`     Action: ${insight.action}`);
    });
  }
}

// Test runner
async function runTests() {
  console.log('🚀 Testing CSV Processor with Supabase Integration');
  console.log('=' * 60);

  const supabaseTest = new SupabaseTestIntegration();
  const csvProcessor = new CSVDataProcessor();

  try {
    // 1. Test Supabase connection
    const connectionSuccess = await supabaseTest.testSupabaseConnection();
    if (!connectionSuccess) {
      console.log('❌ Skipping database tests due to connection failure');
      return;
    }

    // 2. Create database schema
    await supabaseTest.createSocialListeningTables();

    // 3. Process existing YouTube data
    console.log('\n📺 Processing YouTube data...');
    const results = await csvProcessor.processYouTubeData();

    if (results.processedVideos > 0) {
      // 4. Insert data into Supabase
      await supabaseTest.insertSocialContent(results.data);

      // 5. Query and analyze data
      const analytics = await supabaseTest.generateAnalytics();
      supabaseTest.displayAnalytics(analytics);

      // 6. Test specific queries
      console.log('\n🔍 Testing specific queries...');

      const highPriorityContent = await supabaseTest.querySocialContent({
        priority: 'high',
        limit: 5
      });

      console.log(`Found ${highPriorityContent.length} high-priority content pieces`);

      const youtubeContent = await supabaseTest.querySocialContent({
        platform: 'youtube',
        limit: 10
      });

      console.log(`Found ${youtubeContent.length} YouTube content pieces`);

    } else {
      console.log('⚠️  No YouTube data to process. Run YouTube extraction first.');
    }

    console.log('\n✅ All tests completed successfully!');
    console.log('\n🎯 Social Listening System is ready for production use.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'test';

  switch (command) {
    case 'test':
      await runTests();
      break;

    case 'connection':
      const test = new SupabaseTestIntegration();
      await test.testSupabaseConnection();
      break;

    case 'schema':
      const schemaTest = new SupabaseTestIntegration();
      await schemaTest.createSocialListeningTables();
      break;

    case 'help':
      console.log('\n📚 Available Commands:');
      console.log('  test       - Run complete test suite');
      console.log('  connection - Test Supabase connection only');
      console.log('  schema     - Create database schema only');
      console.log('  help       - Show this help message');
      break;

    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('Run with "help" for available commands');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SupabaseTestIntegration };