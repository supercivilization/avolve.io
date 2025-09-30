#!/usr/bin/env node
/**
 * Content Generator - Intelligence to Insights Pipeline
 *
 * Uses Claude Code (Claude MAX subscription) to transform intelligence
 * data into SEO-optimized insight articles.
 *
 * Usage:
 *   node scripts/content-generator.js [intelligence-file]
 *   node scripts/content-generator.js --latest
 *   node scripts/content-generator.js --preview
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Content generation prompt for Claude Code
const CONTENT_GENERATOR_PROMPT = `You are a technical content writer for Avolve, an AI-native development platform.

Your task is to transform intelligence data (from GitHub, Reddit, YouTube monitoring) into SEO-optimized insight articles.

Requirements:
1. **Audience**: Technical developers and engineering leaders
2. **Tone**: Evidence-based, technical, authoritative
3. **Structure**: Clear sections with data-driven insights
4. **SEO**: Natural keyword usage, meta-optimized
5. **Citations**: Link to sources, show data points
6. **Accessibility**: Clear language, proper heading hierarchy

Generate an insight article with:
- Compelling title (SEO-optimized)
- Executive summary
- Key findings with data
- Technical analysis
- Implementation guidance
- Related topics
- Source citations

Format as MDX with frontmatter.`;

// Find latest intelligence report
async function findLatestIntelligence() {
  const reportsDirs = [
    path.join(ROOT_DIR, 'reports'),
    path.join(ROOT_DIR, 'data'),
    path.join(ROOT_DIR, 'research')
  ];

  let latestFile = null;
  let latestTime = 0;

  for (const dir of reportsDirs) {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (file.endsWith('.json') && !file.includes('meta')) {
          const filePath = path.join(dir, file);
          const stat = await fs.stat(filePath);
          if (stat.mtimeMs > latestTime) {
            latestTime = stat.mtimeMs;
            latestFile = filePath;
          }
        }
      }
    } catch (err) {
      // Directory might not exist
      continue;
    }
  }

  return latestFile;
}

// Read and parse intelligence data
async function readIntelligenceData(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);

  return {
    filePath,
    fileName: path.basename(filePath),
    data,
    summary: generateDataSummary(data)
  };
}

// Generate a summary of the intelligence data
function generateDataSummary(data) {
  const summary = {
    type: identifyDataType(data),
    dataPoints: countDataPoints(data),
    sources: identifySources(data),
    topics: extractTopics(data),
    dateRange: extractDateRange(data)
  };

  return summary;
}

function identifyDataType(data) {
  if (data.github || data.repositories) return 'github-intelligence';
  if (data.youtube || data.videos) return 'youtube-monitoring';
  if (data.reddit || data.posts) return 'reddit-discussions';
  if (data.monitoring || data.ecosystem) return 'tech-stack-monitoring';
  if (data.strategy || data.seo) return 'seo-research';
  return 'general-intelligence';
}

function countDataPoints(data) {
  let count = 0;

  if (Array.isArray(data)) {
    count = data.length;
  } else if (data.github?.repositories) {
    count = data.github.repositories.length;
  } else if (data.posts || data.comments) {
    count = (data.posts?.length || 0) + (data.comments?.length || 0);
  } else if (data.monitoring?.sources) {
    count = Object.values(data.monitoring.sources).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
  }

  return count || Object.keys(data).length;
}

function identifySources(data) {
  const sources = new Set();

  if (data.github) sources.add('github');
  if (data.youtube) sources.add('youtube');
  if (data.reddit) sources.add('reddit');
  if (data.sources) {
    Object.keys(data.sources).forEach(s => sources.add(s));
  }

  return Array.from(sources);
}

function extractTopics(data) {
  const topics = new Set();

  // Extract from various data structures
  if (data.technologies) {
    data.technologies.forEach(t => topics.add(t));
  }
  if (data.topics) {
    data.topics.forEach(t => topics.add(t));
  }
  if (data.keywords) {
    data.keywords.forEach(k => topics.add(k));
  }

  return Array.from(topics).slice(0, 10);
}

function extractDateRange(data) {
  if (data.timestamp) {
    return { generated: new Date(data.timestamp).toISOString() };
  }
  if (data.dateRange) {
    return data.dateRange;
  }
  return { generated: new Date().toISOString() };
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Create MDX frontmatter
function createFrontmatter(intelligence, generatedContent) {
  const today = new Date().toISOString().split('T')[0];

  return {
    title: generatedContent.title,
    description: generatedContent.description,
    publishedAt: today,
    updatedAt: today,
    author: 'Avolve Intelligence',
    category: intelligence.summary.type,
    tags: intelligence.summary.topics.slice(0, 5),
    seo: {
      title: `${generatedContent.title} | Avolve Insights`,
      description: generatedContent.description,
      keywords: intelligence.summary.topics
    },
    schema: {
      type: 'TechArticle',
      proficiencyLevel: 'Intermediate'
    },
    intelligence: {
      sources: intelligence.summary.sources,
      confidence: 0.85,
      dataPoints: intelligence.summary.dataPoints,
      generatedAt: new Date().toISOString()
    }
  };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  console.log('🎯 Avolve Content Generator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Determine source file
  let intelligenceFile;
  if (args[0] === '--latest' || args.length === 0) {
    console.log('📊 Finding latest intelligence report...');
    intelligenceFile = await findLatestIntelligence();
    if (!intelligenceFile) {
      console.error('❌ No intelligence reports found in reports/, data/, or research/');
      process.exit(1);
    }
    console.log(`✓ Found: ${path.basename(intelligenceFile)}\n`);
  } else {
    intelligenceFile = path.resolve(args[0]);
  }

  // Read intelligence data
  console.log('📖 Reading intelligence data...');
  const intelligence = await readIntelligenceData(intelligenceFile);
  console.log('✓ Data loaded\n');

  console.log('📋 Intelligence Summary:');
  console.log(`   Type: ${intelligence.summary.type}`);
  console.log(`   Data Points: ${intelligence.summary.dataPoints}`);
  console.log(`   Sources: ${intelligence.summary.sources.join(', ')}`);
  console.log(`   Topics: ${intelligence.summary.topics.slice(0, 5).join(', ')}`);
  console.log();

  // Preview mode - show what we'd generate
  if (args.includes('--preview')) {
    console.log('👀 PREVIEW MODE - No files will be generated\n');
    console.log('Intelligence data summary:');
    console.log(JSON.stringify(intelligence.summary, null, 2));
    console.log('\nTo generate content, run without --preview flag');
    console.log('Use Claude Code to transform this data into an insight article.');
    return;
  }

  console.log('🤖 Ready to generate content with Claude Code\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📝 CONTENT GENERATION TASK FOR CLAUDE CODE:\n');
  console.log(CONTENT_GENERATOR_PROMPT);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📊 INTELLIGENCE DATA TO TRANSFORM:\n');
  console.log(JSON.stringify(intelligence.data, null, 2).slice(0, 2000) + '...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('💡 Next Steps:');
  console.log('   1. Claude Code will analyze the intelligence data');
  console.log('   2. Generate an SEO-optimized insight article');
  console.log('   3. Create MDX file in apps/web/content/insights/');
  console.log('   4. Update content index\n');

  console.log('⏳ Waiting for Claude Code to generate content...\n');

  // Output file path for Claude Code to write to
  const outputDir = path.join(ROOT_DIR, 'apps/web/content/insights');
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`📁 Output directory ready: ${outputDir}`);
  console.log('\n✨ Claude Code: Please generate the insight article and save as MDX!');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});