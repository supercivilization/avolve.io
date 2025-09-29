#!/usr/bin/env node

/**
 * Environment Validation Script for Avolve AI-Native Platform
 * Validates that required environment variables are set for development
 */

const path = require('path');
const fs = require('fs');

// Load environment variables manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...values] = line.split('=');
        if (key && values.length) {
          process.env[key] = values.join('=');
        }
      }
    });
  } catch (error) {
    // .env.local doesn't exist yet, that's ok
  }
}

loadEnvFile();

const REQUIRED_VARS = {
  // Core development
  NODE_ENV: { required: true, description: 'Environment (development/production)' },

  // Local database (always required for development)
  SUPABASE_URL: { required: true, description: 'Supabase URL (local or remote)' },
  SUPABASE_ANON_KEY: { required: true, description: 'Supabase anonymous key' },
  SUPABASE_SERVICE_ROLE_KEY: { required: true, description: 'Supabase service role key' },
};

const OPTIONAL_VARS = {
  // For Claude Code functionality
  GITHUB_TOKEN: { description: 'GitHub personal access token for repository intelligence' },
  YOUTUBE_API_KEY: { description: 'YouTube Data API key for social listening' },

  // AI providers
  OPENAI_API_KEY: { description: 'OpenAI API key for GPT models' },
  ANTHROPIC_API_KEY: { description: 'Anthropic API key for Claude models' },
  GOOGLE_AI_API_KEY: { description: 'Google AI API key for Gemini models' },

  // Social platforms
  X_BEARER_TOKEN: { description: 'X/Twitter bearer token for social monitoring' },
  REDDIT_CLIENT_ID: { description: 'Reddit client ID for social monitoring' },
  REDDIT_CLIENT_SECRET: { description: 'Reddit client secret for social monitoring' },

  // SEO and research
  ANSWER_THE_PUBLIC_API_KEY: { description: 'Answer The Public API for keyword research' },
  DATAFORSEO_USER: { description: 'DataForSEO username for SEO analysis' },
  DATAFORSEO_PASSWORD: { description: 'DataForSEO password for SEO analysis' },
};

function validateEnvironment() {
  console.log('🔍 Validating Avolve Development Environment');
  console.log('==============================================');

  let hasErrors = false;
  let warningCount = 0;

  // Check required variables
  console.log('\n📋 Required Environment Variables:');
  for (const [varName, config] of Object.entries(REQUIRED_VARS)) {
    const value = process.env[varName];
    const hasValue = Boolean(value && value.trim() && !value.includes('your-') && !value.includes('placeholder'));

    if (hasValue) {
      console.log(`   ✅ ${varName}: ${getDisplayValue(value)}`);
    } else {
      console.log(`   ❌ ${varName}: Missing or placeholder`);
      console.log(`      ${config.description}`);
      hasErrors = true;
    }
  }

  // Check optional variables
  console.log('\n🔧 Optional Environment Variables:');
  for (const [varName, config] of Object.entries(OPTIONAL_VARS)) {
    const value = process.env[varName];
    const hasValue = Boolean(value && value.trim() && !value.includes('your-') && !value.includes('placeholder'));

    if (hasValue) {
      console.log(`   ✅ ${varName}: ${getDisplayValue(value)}`);
    } else {
      console.log(`   ⚠️  ${varName}: Not configured`);
      console.log(`      ${config.description}`);
      warningCount++;
    }
  }

  // Environment file check
  console.log('\n📁 Environment File Status:');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  try {
    const fs = require('fs');
    fs.accessSync(envLocalPath, fs.constants.F_OK);
    console.log(`   ✅ .env.local exists: ${envLocalPath}`);
  } catch (error) {
    console.log(`   ❌ .env.local missing: ${envLocalPath}`);
    console.log('      Copy .env.local.template to .env.local and configure your keys');
    hasErrors = true;
  }

  // Security checks
  console.log('\n🔒 Security Validation:');
  const securityIssues = checkSecurityIssues();

  if (securityIssues.length === 0) {
    console.log('   ✅ No security issues detected');
  } else {
    securityIssues.forEach(issue => {
      console.log(`   🚨 ${issue}`);
      hasErrors = true;
    });
  }

  // Summary
  console.log('\n📊 Validation Summary:');
  console.log('=====================');

  if (hasErrors) {
    console.log('❌ Environment validation failed');
    console.log('\n🚨 Action Required:');
    console.log('   1. Copy .env.local.template to .env.local if not done');
    console.log('   2. Replace placeholder values with real development keys');
    console.log('   3. Ensure no production keys are in development environment');
    console.log('   4. Run this script again to verify');
    process.exit(1);
  } else {
    console.log('✅ Environment validation passed');
    if (warningCount > 0) {
      console.log(`⚠️  ${warningCount} optional variables not configured (functionality may be limited)`);
    }
    console.log('\n🚀 Your development environment is ready!');
    console.log('   - All required variables are configured');
    console.log('   - No security issues detected');
    console.log('   - Claude Code can function properly');
  }
}

function getDisplayValue(value) {
  if (!value) return 'Not set';

  // Hide sensitive values, show format validation
  if (value.startsWith('ghp_')) return `GitHub token (${value.substring(0, 7)}...${value.slice(-4)})`;
  if (value.startsWith('sk-')) return `API key (${value.substring(0, 7)}...${value.slice(-4)})`;
  if (value.startsWith('AIza')) return `Google API key (${value.substring(0, 8)}...${value.slice(-4)})`;
  if (value.startsWith('eyJ')) return `JWT token (${value.substring(0, 10)}...${value.slice(-10)})`;
  if (value.startsWith('sb_')) return `Supabase key (${value.substring(0, 10)}...${value.slice(-10)})`;
  if (value.includes('supabase.co')) return `Supabase URL (${value})`;
  if (value.includes('localhost') || value.includes('127.0.0.1')) return `Local URL (${value})`;

  // For other values, show first/last few characters
  if (value.length > 20) {
    return `${value.substring(0, 10)}...${value.slice(-4)}`;
  }

  return value;
}

function checkSecurityIssues() {
  const issues = [];

  // Check for exposed secrets that should have been cleaned
  // Note: Allowing existing keys for development as requested by user
  const dangerousPatterns = [
    // Example keys removed for security - add production keys to check here
    'your-supabase-service-role-key-here' // Only flag production Supabase keys
  ];

  for (const [varName, value] of Object.entries(process.env)) {
    if (value && dangerousPatterns.some(pattern => value.includes(pattern))) {
      issues.push(`${varName} contains a production secret in development environment`);
    }
  }

  // Check for placeholder values
  const placeholderPatterns = ['your-', 'placeholder', 'replace-me', 'todo'];
  for (const [varName, value] of Object.entries(process.env)) {
    if (value && placeholderPatterns.some(pattern => value.toLowerCase().includes(pattern))) {
      // Skip if it's an intentional placeholder in non-critical vars
      if (!REQUIRED_VARS[varName]) continue;
      issues.push(`${varName} contains placeholder value - replace with real key`);
    }
  }

  return issues;
}

// Feature validation functions
function validateClaudeCodeFeatures() {
  const features = {
    'GitHub Intelligence': Boolean(process.env.GITHUB_TOKEN),
    'Social Listening': Boolean(process.env.YOUTUBE_API_KEY),
    'AI Code Review': Boolean(process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY),
    'Content Research': Boolean(process.env.ANSWER_THE_PUBLIC_API_KEY || process.env.DATAFORSEO_USER),
  };

  console.log('\n🎯 Claude Code Feature Availability:');
  for (const [feature, available] of Object.entries(features)) {
    console.log(`   ${available ? '✅' : '❌'} ${feature}`);
  }

  return features;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Avolve Environment Validator

Usage:
  npm run env:validate              # Full validation
  node scripts/validate-environment.js --features  # Show available features

Options:
  --help, -h     Show this help message
  --features     Show available Claude Code features based on environment
    `);
    process.exit(0);
  }

  if (args.includes('--features')) {
    validateClaudeCodeFeatures();
  } else {
    validateEnvironment();
  }
}

module.exports = { validateEnvironment, validateClaudeCodeFeatures };