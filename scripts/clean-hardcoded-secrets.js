#!/usr/bin/env node

/**
 * Security cleanup script to remove hardcoded secrets from files
 * Run this script to clean up any remaining hardcoded API keys
 */

const fs = require('fs');
const path = require('path');

const HARDCODED_SECRETS = [
  'process.env.YOUTUBE_API_KEY',
  'process.env.GITHUB_TOKEN',
  'process.env.SUPABASE_SERVICE_ROLE_KEY',
  'process.env.SUPABASE_SERVICE_ROLE_KEY'
];

const REPLACEMENTS = {
  'process.env.YOUTUBE_API_KEY': 'process.env.YOUTUBE_API_KEY',
  'process.env.GITHUB_TOKEN': 'process.env.GITHUB_TOKEN',
  'process.env.SUPABASE_SERVICE_ROLE_KEY': 'process.env.SUPABASE_SERVICE_ROLE_KEY',
  'process.env.SUPABASE_SERVICE_ROLE_KEY': 'process.env.SUPABASE_SERVICE_ROLE_KEY'
};

function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [secret, replacement] of Object.entries(REPLACEMENTS)) {
      if (content.includes(secret)) {
        console.log(`🧹 Cleaning ${path.basename(filePath)}: ${secret.substring(0, 10)}...`);
        content = content.replace(new RegExp(secret, 'g'), replacement);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}: ${error.message}`);
  }
  return false;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let totalCleaned = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.name.startsWith('.') && file.name !== 'node_modules') {
        totalCleaned += scanDirectory(fullPath);
      }
    } else if (file.name.match(/\.(js|ts|tsx|jsx|json)$/)) {
      if (cleanFile(fullPath)) {
        totalCleaned++;
      }
    }
  }

  return totalCleaned;
}

async function main() {
  console.log('🔒 Security Cleanup: Removing hardcoded secrets');
  console.log('================================================');

  const projectRoot = path.join(__dirname, '..');
  const cleaned = scanDirectory(projectRoot);

  console.log(`\n✅ Cleanup complete! ${cleaned} files modified`);

  if (cleaned === 0) {
    console.log('🎉 No hardcoded secrets found - your project is secure!');
  } else {
    console.log('\n⚠️  Important:');
    console.log('   - Update your .env.local with new API keys');
    console.log('   - Test your scripts to ensure they work with environment variables');
    console.log('   - Never commit real API keys to version control');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { cleanFile, scanDirectory };