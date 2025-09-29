#!/usr/bin/env node

/**
 * AI Ecosystem Official Channel Finder for Vercel AI SDK
 *
 * Finds and verifies official YouTube channels and social accounts for all
 * AI providers supported by Vercel AI SDK 5.0+
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');

class AIEcosystemChannelFinder {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || 'process.env.YOUTUBE_API_KEY';

    // Complete AI provider ecosystem for Vercel AI SDK
    this.aiProviders = {
      // Primary AI Model Providers
      'openai': {
        handles: ['@OpenAI'],
        searchTerms: ['OpenAI official', 'OpenAI GPT'],
        expectedKeywords: ['openai', 'gpt', 'chatgpt', 'artificial intelligence'],
        xAccounts: ['@OpenAI', '@sama', '@gdb'],
        githubRepos: ['openai/openai-python', 'openai/openai-node'],
        websites: ['openai.com', 'platform.openai.com']
      },

      'anthropic': {
        handles: ['@AnthropicAI', '@Anthropic'],
        searchTerms: ['Anthropic official', 'Claude AI', 'Anthropic AI'],
        expectedKeywords: ['anthropic', 'claude', 'ai safety', 'constitutional ai'],
        xAccounts: ['@AnthropicAI', '@alexalbert__', '@jaredpalmer', '@darioamodei'],
        githubRepos: ['anthropics/anthropic-sdk-python', 'anthropics/anthropic-sdk-typescript'],
        websites: ['anthropic.com', 'docs.anthropic.com']
      },

      'google-ai': {
        handles: ['@Google', '@GoogleAI', '@GoogleDevelopers', '@TensorFlow'],
        searchTerms: ['Google AI', 'Gemini AI', 'Google Developers', 'TensorFlow'],
        expectedKeywords: ['google', 'gemini', 'tensorflow', 'vertex ai', 'palm'],
        xAccounts: ['@Google', '@GoogleAI', '@GoogleDevs', '@TensorFlow'],
        githubRepos: ['google/generative-ai-js', 'google/generative-ai-python', 'tensorflow/tensorflow'],
        websites: ['ai.google', 'ai.google.dev', 'cloud.google.com/vertex-ai']
      },

      'microsoft-azure': {
        handles: ['@Microsoft', '@Azure', '@MicrosoftDeveloper', '@MSFTResearch'],
        searchTerms: ['Microsoft AI', 'Azure OpenAI', 'Microsoft Research'],
        expectedKeywords: ['microsoft', 'azure', 'openai', 'copilot', 'ai research'],
        xAccounts: ['@Microsoft', '@Azure', '@MSFTResearch', '@satyanadella'],
        githubRepos: ['Azure/azure-sdk-for-js', 'microsoft/TypeScript'],
        websites: ['azure.microsoft.com', 'learn.microsoft.com']
      },

      // AI Infrastructure & Hosting
      'groq': {
        handles: ['@GroqInc'],
        searchTerms: ['Groq AI', 'Groq LPU'],
        expectedKeywords: ['groq', 'lpu', 'inference', 'llama'],
        xAccounts: ['@GroqInc', '@JonathanRoss'],
        githubRepos: ['groq/groq-python'],
        websites: ['groq.com', 'console.groq.com']
      },

      'together-ai': {
        handles: ['@togethercomputer'],
        searchTerms: ['Together AI', 'Together Computer'],
        expectedKeywords: ['together', 'ai', 'inference', 'open source'],
        xAccounts: ['@togethercomputer', '@VipulVed'],
        githubRepos: ['togethercomputer/RedPajama-Data'],
        websites: ['together.ai', 'api.together.xyz']
      },

      'replicate': {
        handles: ['@replicate'],
        searchTerms: ['Replicate AI', 'Replicate platform'],
        expectedKeywords: ['replicate', 'machine learning', 'ai models'],
        xAccounts: ['@replicate', '@bfirsh', '@zeke'],
        githubRepos: ['replicate/replicate-python', 'replicate/replicate-javascript'],
        websites: ['replicate.com']
      },

      'huggingface': {
        handles: ['@HuggingFace'],
        searchTerms: ['Hugging Face', 'Transformers'],
        expectedKeywords: ['hugging face', 'transformers', 'datasets', 'spaces'],
        xAccounts: ['@huggingface', '@ClementDelangue', '@julien_c'],
        githubRepos: ['huggingface/transformers', 'huggingface/datasets'],
        websites: ['huggingface.co']
      },

      'mistral-ai': {
        handles: ['@MistralAI'],
        searchTerms: ['Mistral AI'],
        expectedKeywords: ['mistral', 'ai', 'open source', 'llm'],
        xAccounts: ['@MistralAI', '@arthurmensch'],
        githubRepos: ['mistralai/mistral-src'],
        websites: ['mistral.ai']
      },

      'cohere': {
        handles: ['@CohereAI'],
        searchTerms: ['Cohere AI'],
        expectedKeywords: ['cohere', 'nlp', 'embeddings', 'classification'],
        xAccounts: ['@CohereAI', '@AidanGomez'],
        githubRepos: ['cohere-ai/cohere-python'],
        websites: ['cohere.com', 'docs.cohere.com']
      },

      'fireworks-ai': {
        handles: ['@fireworksai_hq'],
        searchTerms: ['Fireworks AI'],
        expectedKeywords: ['fireworks', 'ai', 'inference', 'llm'],
        xAccounts: ['@fireworksai_hq'],
        githubRepos: ['fw-ai/fireworks-js'],
        websites: ['fireworks.ai']
      },

      'perplexity': {
        handles: ['@perplexity_ai'],
        searchTerms: ['Perplexity AI'],
        expectedKeywords: ['perplexity', 'search', 'ai', 'answer engine'],
        xAccounts: ['@perplexity_ai', '@AravSrinivas'],
        githubRepos: [],
        websites: ['perplexity.ai']
      },

      // Specialized AI Services
      'elevenlabs': {
        handles: ['@ElevenLabsIO'],
        searchTerms: ['ElevenLabs', 'AI Voice'],
        expectedKeywords: ['elevenlabs', 'voice', 'speech', 'tts'],
        xAccounts: ['@ElevenLabsIO', '@matiaszelaya'],
        githubRepos: ['elevenlabs/elevenlabs-python'],
        websites: ['elevenlabs.io']
      },

      'deepseek': {
        handles: ['@deepseek_ai'],
        searchTerms: ['DeepSeek AI'],
        expectedKeywords: ['deepseek', 'ai', 'reasoning', 'mathematics'],
        xAccounts: ['@deepseek_ai'],
        githubRepos: ['deepseek-ai/DeepSeek-Coder'],
        websites: ['deepseek.com']
      },

      'xai': {
        handles: ['@xAI', '@xai'],
        searchTerms: ['xAI Grok', 'Elon Musk xAI'],
        expectedKeywords: ['xai', 'grok', 'elon musk', 'artificial intelligence'],
        xAccounts: ['@xAI', '@elonmusk'],
        githubRepos: [],
        websites: ['x.ai']
      }
    };

    this.requestCount = 0;
    this.maxRequestsPerMinute = 45; // Conservative limit
  }

  /**
   * Search for channels by handle or username
   */
  async searchChannelByHandle(handle, provider) {
    const cleanHandle = handle.replace('@', '');

    try {
      await this.rateLimitCheck();

      const searchResults = await this.makeAPIRequest('/search', {
        part: 'snippet',
        type: 'channel',
        q: cleanHandle,
        maxResults: 5
      });

      if (searchResults.items && searchResults.items.length > 0) {
        // Look for exact match or close match
        const match = searchResults.items.find(item => {
          const title = item.snippet.title.toLowerCase();
          const channelTitle = item.snippet.channelTitle.toLowerCase();
          return title.includes(cleanHandle.toLowerCase()) ||
                 channelTitle.includes(cleanHandle.toLowerCase()) ||
                 this.matchesProvider(title + ' ' + channelTitle, provider);
        });

        if (match) {
          return await this.getChannelDetails(match.snippet.channelId);
        }
      }

      return null;
    } catch (error) {
      console.error(`Error searching for handle ${handle}:`, error.message);
      return null;
    }
  }

  /**
   * Check if content matches the provider
   */
  matchesProvider(text, provider) {
    const keywords = this.aiProviders[provider]?.expectedKeywords || [];
    return keywords.some(keyword => text.toLowerCase().includes(keyword));
  }

  /**
   * Get detailed channel information
   */
  async getChannelDetails(channelId) {
    try {
      await this.rateLimitCheck();

      const channelData = await this.makeAPIRequest('/channels', {
        part: 'snippet,statistics,brandingSettings',
        id: channelId
      });

      if (channelData.items && channelData.items.length > 0) {
        const channel = channelData.items[0];

        return {
          id: channel.id,
          title: channel.snippet.title,
          description: channel.snippet.description,
          customUrl: channel.snippet.customUrl,
          publishedAt: channel.snippet.publishedAt,
          subscriberCount: channel.statistics.subscriberCount,
          videoCount: channel.statistics.videoCount,
          viewCount: channel.statistics.viewCount,
          thumbnails: channel.snippet.thumbnails,
          keywords: channel.brandingSettings?.channel?.keywords || '',
          verified: this.isLikelyOfficial(channel)
        };
      }

      return null;
    } catch (error) {
      console.error(`Error getting channel details for ${channelId}:`, error.message);
      return null;
    }
  }

  /**
   * Check if channel appears to be official
   */
  isLikelyOfficial(channel) {
    const title = channel.snippet.title.toLowerCase();
    const description = channel.snippet.description.toLowerCase();
    const subscriberCount = parseInt(channel.statistics.subscriberCount);

    // Signs of official channels
    const officialIndicators = [
      title.includes('official'),
      subscriberCount > 5000, // AI companies usually have significant following
      description.includes('official'),
      description.includes('we are'),
      description.includes('company'),
      title.match(/^(openai|anthropic|google|microsoft|azure|groq|together|replicate)$/i)
    ];

    return officialIndicators.filter(Boolean).length >= 2;
  }

  /**
   * Rate limiting check
   */
  async rateLimitCheck() {
    if (this.requestCount >= this.maxRequestsPerMinute) {
      console.log('⚠️  Rate limit approaching, waiting 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 60000));
      this.requestCount = 0;
    }
  }

  /**
   * Make YouTube API request
   */
  async makeAPIRequest(endpoint, params) {
    return new Promise((resolve, reject) => {
      const queryParams = new URLSearchParams({
        ...params,
        key: this.apiKey
      });

      const options = {
        hostname: 'www.googleapis.com',
        path: `/youtube/v3${endpoint}?${queryParams}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
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
              reject(new Error(`API Error ${res.statusCode}: ${jsonData.error?.message || data}`));
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
   * Find all AI ecosystem channels
   */
  async findAllAIChannels() {
    console.log('🤖 Finding AI Ecosystem Official Channels for Vercel AI SDK');
    console.log('=' .repeat(70));

    const results = {
      found_channels: {},
      social_accounts: {},
      github_repositories: {},
      official_websites: {},
      summary: {},
      total_found: 0,
      coverage_status: {}
    };

    for (const [provider, sources] of Object.entries(this.aiProviders)) {
      console.log(`\n🔍 Searching for ${provider} channels...`);

      const providerChannels = [];

      // Try each handle
      for (const handle of sources.handles.slice(0, 2)) { // Limit to avoid quota
        console.log(`   🔎 Trying handle: ${handle}`);

        const channel = await this.searchChannelByHandle(handle, provider);
        if (channel && channel.verified) {
          providerChannels.push(channel);
          console.log(`   ✅ Found: ${channel.title} (${parseInt(channel.subscriberCount).toLocaleString()} subscribers)`);
        } else if (channel) {
          console.log(`   ⚠️  Found but unverified: ${channel.title}`);
        } else {
          console.log(`   ❌ Not found: ${handle}`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
      }

      // Store all provider info
      results.found_channels[provider] = providerChannels;
      results.social_accounts[provider] = sources.xAccounts;
      results.github_repositories[provider] = sources.githubRepos;
      results.official_websites[provider] = sources.websites;
      results.total_found += providerChannels.length;

      if (providerChannels.length > 0) {
        results.coverage_status[provider] = 'found';
        console.log(`   🎯 ${provider}: ${providerChannels.length} channel(s) found`);
      } else {
        results.coverage_status[provider] = 'not_found';
        console.log(`   ⚠️  ${provider}: No official channels identified`);
      }
    }

    // Generate summary
    results.summary = {
      total_providers: Object.keys(this.aiProviders).length,
      providers_with_channels: Object.keys(results.coverage_status).filter(
        p => results.coverage_status[p] === 'found'
      ).length,
      coverage_percentage: Math.round(
        (Object.keys(results.coverage_status).filter(p => results.coverage_status[p] === 'found').length /
         Object.keys(this.aiProviders).length) * 100
      )
    };

    this.displayResults(results);
    return results;
  }

  /**
   * Display comprehensive results
   */
  displayResults(results) {
    console.log('\n' + '=' .repeat(70));
    console.log('🤖 AI ECOSYSTEM OFFICIAL CHANNELS FOUND');
    console.log('=' .repeat(70));

    console.log(`\n🎯 Coverage: ${results.summary.providers_with_channels}/${results.summary.total_providers} AI providers (${results.summary.coverage_percentage}%)`);

    console.log('\n📺 Official Channels Identified:');
    for (const [provider, channels] of Object.entries(results.found_channels)) {
      if (channels.length > 0) {
        console.log(`\n   ${provider.toUpperCase().replace('-', ' ')}:`);
        channels.forEach(channel => {
          console.log(`   ✅ ${channel.title}`);
          console.log(`      ID: ${channel.id}`);
          console.log(`      Subscribers: ${parseInt(channel.subscriberCount).toLocaleString()}`);
          console.log(`      Videos: ${parseInt(channel.videoCount).toLocaleString()}`);
          if (channel.customUrl) console.log(`      URL: youtube.com/${channel.customUrl}`);
        });
      }
    }

    console.log('\n🐦 X.com Accounts to Monitor:');
    for (const [provider, accounts] of Object.entries(results.social_accounts)) {
      if (accounts.length > 0) {
        console.log(`   ${provider}: ${accounts.join(', ')}`);
      }
    }

    console.log('\n🐙 GitHub Repositories:');
    for (const [provider, repos] of Object.entries(results.github_repositories)) {
      if (repos.length > 0) {
        console.log(`   ${provider}: ${repos.join(', ')}`);
      }
    }

    if (results.total_found > 0) {
      console.log('\n🚀 AI Ecosystem Monitoring Ready!');
      console.log('\nNext steps:');
      console.log('1. Integrate these channels into monitoring configuration');
      console.log('2. Set up X.com monitoring for key AI accounts');
      console.log('3. Monitor GitHub repositories for releases and issues');
      console.log('4. Create unified AI ecosystem intelligence dashboard');
    } else {
      console.log('\n⚠️  Limited AI channels found. Recommendations:');
      console.log('1. Use search-based monitoring for AI content');
      console.log('2. Monitor X.com accounts directly');
      console.log('3. Focus on GitHub repository monitoring');
    }
  }

  /**
   * Generate complete AI ecosystem mapping
   */
  generateEcosystemMapping() {
    console.log('📋 AI Ecosystem Complete Mapping for Vercel AI SDK');
    console.log('=' .repeat(60));

    Object.entries(this.aiProviders).forEach(([provider, info]) => {
      console.log(`\n🤖 ${provider.toUpperCase().replace('-', ' ')}`);
      console.log(`   YouTube: ${info.handles.join(', ')}`);
      console.log(`   X.com: ${info.xAccounts.join(', ')}`);
      console.log(`   GitHub: ${info.githubRepos.join(', ') || 'None'}`);
      console.log(`   Websites: ${info.websites.join(', ')}`);
    });

    return this.aiProviders;
  }
}

// CLI interface
async function main() {
  const finder = new AIEcosystemChannelFinder();

  const command = process.argv[2] || 'find';

  switch (command) {
    case 'find':
    case 'search':
      await finder.findAllAIChannels();
      break;

    case 'mapping':
      finder.generateEcosystemMapping();
      break;

    case 'help':
      console.log(`
🤖 AI Ecosystem Channel Finder

Commands:
  find     - Find all AI provider official channels
  mapping  - Show complete ecosystem mapping
  help     - Show this help message

Examples:
  node ai-ecosystem-channel-finder.js find
  node ai-ecosystem-channel-finder.js mapping
      `);
      break;

    default:
      console.log('Unknown command. Use "help" for available commands.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { AIEcosystemChannelFinder };