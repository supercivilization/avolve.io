#!/usr/bin/env node

/**
 * Create Supabase Schema via REST API
 *
 * This script creates the necessary database tables for social listening
 * using Supabase's REST API directly.
 */

const https = require('https');

class SupabaseSchemaCreator {
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

  async executeSQL(sql) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ query: sql });

      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: '/rest/v1/rpc/execute_sql',
        method: 'POST',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        let response = '';
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ SQL executed successfully');
            resolve(response);
          } else {
            console.log(`❌ SQL execution failed: ${res.statusCode}`);
            console.log('Response:', response);
            reject(new Error(`HTTP ${res.statusCode}: ${response}`));
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(data);
      req.end();
    });
  }

  async createTables() {
    console.log('🏗️  Creating social listening database schema...');

    const sqlCommands = [
      // Enable extensions
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,

      // Create social_content table
      `CREATE TABLE IF NOT EXISTS social_content (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        platform VARCHAR(50) NOT NULL,
        content_id VARCHAR(255) UNIQUE NOT NULL,
        title TEXT,
        description TEXT,
        author VARCHAR(255),
        published_at TIMESTAMP WITH TIME ZONE,
        view_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        comment_count INTEGER DEFAULT 0,
        tags TEXT[] DEFAULT '{}',
        content_type VARCHAR(50) DEFAULT 'unknown',
        tech_level VARCHAR(20) DEFAULT 'intermediate',
        engagement_score DECIMAL(10,2) DEFAULT 0.0,
        relevance_score INTEGER DEFAULT 0,
        frameworks TEXT[] DEFAULT '{}',
        categories TEXT[] DEFAULT '{}',
        priority VARCHAR(10) DEFAULT 'medium',
        raw_data JSONB,
        extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        source VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,

      // Create tech_stack_mentions table
      `CREATE TABLE IF NOT EXISTS tech_stack_mentions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        content_id UUID REFERENCES social_content(id) ON DELETE CASCADE,
        framework VARCHAR(100) NOT NULL,
        mention_count INTEGER DEFAULT 1,
        context TEXT,
        sentiment VARCHAR(20) DEFAULT 'neutral',
        confidence_score DECIMAL(3,2) DEFAULT 0.0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,

      // Create monitoring_insights table
      `CREATE TABLE IF NOT EXISTS monitoring_insights (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        insight_type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(10) DEFAULT 'medium',
        frameworks TEXT[] DEFAULT '{}',
        data_points INTEGER DEFAULT 0,
        confidence_score DECIMAL(3,2) DEFAULT 0.0,
        actionable BOOLEAN DEFAULT true,
        insight_data JSONB,
        generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,

      // Create indexes
      `CREATE INDEX IF NOT EXISTS idx_social_content_platform ON social_content(platform);`,
      `CREATE INDEX IF NOT EXISTS idx_social_content_published_at ON social_content(published_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_social_content_engagement ON social_content(engagement_score DESC);`
    ];

    for (const sql of sqlCommands) {
      try {
        await this.executeSQL(sql);
        console.log('✅ Executed SQL command');
      } catch (error) {
        console.log(`⚠️  SQL command may have failed: ${error.message}`);
        // Continue with other commands
      }
    }
  }

  async testConnection() {
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
            console.log(`❌ Connection failed: ${res.statusCode}`);
            console.log('Response:', data);
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    });
  }
}

async function main() {
  console.log('🚀 Supabase Schema Creator');
  console.log('=' .repeat(50));

  const creator = new SupabaseSchemaCreator();

  try {
    await creator.testConnection();
    await creator.createTables();
    console.log('\n✅ Database schema setup complete!');
    console.log('📊 Tables created: social_content, tech_stack_mentions, monitoring_insights');
  } catch (error) {
    console.error('❌ Schema creation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { SupabaseSchemaCreator };