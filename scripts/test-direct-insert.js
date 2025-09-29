#!/usr/bin/env node

/**
 * Test Direct Table Creation and Data Insertion
 *
 * Simple test to create table and insert data directly via Supabase REST API
 */

const https = require('https');

class SupabaseDirectTest {
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

  async insertTestData() {
    const testData = {
      platform: 'youtube',
      content_id: 'test_' + Date.now(),
      title: 'Test Social Listening Data',
      description: 'This is a test entry for the social listening system',
      author: 'Test Author',
      published_at: new Date().toISOString(),
      view_count: 1000,
      like_count: 50,
      comment_count: 10,
      tags: ['test', 'demo'],
      content_type: 'video',
      tech_level: 'beginner',
      engagement_score: 5.5,
      relevance_score: 75,
      frameworks: ['next.js', 'react'],
      categories: ['tech', 'tutorial'],
      priority: 'high',
      raw_data: { test: true },
      extracted_at: new Date().toISOString(),
      source: 'test_script'
    };

    return new Promise((resolve, reject) => {
      const data = JSON.stringify(testData);

      const options = {
        hostname: this.supabaseUrl.replace('https://', ''),
        path: '/rest/v1/social_content',
        method: 'POST',
        headers: {
          'apikey': this.serviceKey,
          'Authorization': `Bearer ${this.serviceKey}`,
          'Content-Type': 'application/json',
          'Content-Length': data.length,
          'Prefer': 'return=representation'
        }
      };

      const req = https.request(options, (res) => {
        let response = '';
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          console.log(`Status: ${res.statusCode}`);
          console.log('Response:', response);

          if (res.statusCode === 201 || res.statusCode === 200) {
            console.log('✅ Data inserted successfully!');
            resolve(response);
          } else {
            console.log('❌ Insert failed');
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

  async checkTables() {
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
        let response = '';
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          console.log('Available endpoints:');
          console.log(response);
          resolve(response);
        });
      });

      req.on('error', reject);
      req.end();
    });
  }
}

async function main() {
  console.log('🧪 Testing Direct Supabase Integration');
  console.log('=' .repeat(50));

  const tester = new SupabaseDirectTest();

  try {
    console.log('\n📋 Checking available tables...');
    await tester.checkTables();

    console.log('\n📝 Testing data insertion...');
    await tester.insertTestData();

  } catch (error) {
    console.error('❌ Test failed:', error.message);

    // If table doesn't exist, that's expected
    if (error.message.includes('relation "social_content" does not exist')) {
      console.log('\n💡 The social_content table needs to be created in Supabase dashboard first.');
      console.log('📋 Required table structure:');
      console.log(`
CREATE TABLE social_content (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { SupabaseDirectTest };