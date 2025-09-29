#!/usr/bin/env node

/**
 * Find Official YouTube Channels for Modern Tech Stack
 *
 * Uses YouTube API to find and verify official channels for our tech stack frameworks
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');

class OfficialChannelFinder {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || 'process.env.YOUTUBE_API_KEY';

    // Known official handles and channel names
    this.officialSources = {
      'vercel': {
        handles: ['@vercel', '@VercelHQ'],
        searchTerms: ['Vercel official', 'Next.js official'],
        expectedKeywords: ['next.js', 'vercel', 'deployment']
      },
      'react': {
        handles: ['@reactjs', '@Meta', '@FacebookDevelopers'],
        searchTerms: ['React official', 'Facebook Developers', 'Meta Developers'],
        expectedKeywords: ['react', 'facebook', 'meta', 'javascript']
      },
      'microsoft-typescript': {
        handles: ['@MicrosoftDeveloper', '@VisualStudio'],
        searchTerms: ['Microsoft Developer', 'TypeScript official', 'Visual Studio'],
        expectedKeywords: ['typescript', 'microsoft', 'developer']
      },
      'tailwind': {
        handles: ['@TailwindLabs', '@adamwathan'],
        searchTerms: ['Tailwind CSS', 'Tailwind Labs', 'Adam Wathan'],
        expectedKeywords: ['tailwind', 'css', 'framework']
      },
      'supabase': {
        handles: ['@supabase'],
        searchTerms: ['Supabase official', 'Supabase'],
        expectedKeywords: ['supabase', 'postgres', 'database']
      },
      'anthropic': {
        handles: ['@AnthropicAI'],
        searchTerms: ['Anthropic', 'Claude AI'],
        expectedKeywords: ['anthropic', 'claude', 'ai']
      }
    };
  }

  /**
   * Search for channels by handle or username
   */
  async searchChannelByHandle(handle) {
    const cleanHandle = handle.replace('@', '');

    try {
      // Try search API first
      const searchResults = await this.makeAPIRequest('/search', {
        part: 'snippet',
        type: 'channel',
        q: cleanHandle,
        maxResults: 10
      });

      if (searchResults.items && searchResults.items.length > 0) {
        // Look for exact match or verified channel
        const exactMatch = searchResults.items.find(item =>
          item.snippet.title.toLowerCase().includes(cleanHandle.toLowerCase()) ||
          item.snippet.channelTitle.toLowerCase().includes(cleanHandle.toLowerCase())
        );

        if (exactMatch) {
          return await this.getChannelDetails(exactMatch.snippet.channelId);
        }
      }

      return null;
    } catch (error) {
      console.error(`Error searching for handle ${handle}:`, error.message);
      return null;
    }
  }

  /**
   * Get detailed channel information
   */
  async getChannelDetails(channelId) {
    try {
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
      subscriberCount > 10000, // Reasonable threshold for tech companies
      description.includes('official'),
      description.includes('we are'),
      description.includes('company'),
      title.match(/^(vercel|react|microsoft|tailwind|supabase|anthropic)$/i)
    ];

    return officialIndicators.filter(Boolean).length >= 2;
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
   * Find all official channels
   */
  async findAllOfficialChannels() {
    console.log('🔍 Finding Official YouTube Channels for Modern Tech Stack');
    console.log('=' .repeat(60));

    const results = {
      found_channels: {},
      summary: {},
      total_found: 0,
      verification_status: {}
    };

    for (const [framework, sources] of Object.entries(this.officialSources)) {
      console.log(`\n📺 Searching for ${framework} channels...`);

      const frameworkChannels = [];

      // Try each handle
      for (const handle of sources.handles) {
        console.log(`   🔎 Trying handle: ${handle}`);

        const channel = await this.searchChannelByHandle(handle);
        if (channel) {
          frameworkChannels.push(channel);
          console.log(`   ✅ Found: ${channel.title} (${channel.subscriberCount} subscribers)`);
        } else {
          console.log(`   ❌ Not found: ${handle}`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Try search terms if handles didn't work
      if (frameworkChannels.length === 0) {
        for (const searchTerm of sources.searchTerms.slice(0, 2)) { // Limit searches
          console.log(`   🔎 Searching: "${searchTerm}"`);

          try {
            const searchResults = await this.makeAPIRequest('/search', {
              part: 'snippet',
              type: 'channel',
              q: searchTerm,
              maxResults: 5
            });

            if (searchResults.items) {
              for (const item of searchResults.items) {
                const channelDetails = await this.getChannelDetails(item.snippet.channelId);

                if (channelDetails && channelDetails.verified) {
                  // Check if channel content matches expected keywords
                  const matchesKeywords = sources.expectedKeywords.some(keyword =>
                    channelDetails.title.toLowerCase().includes(keyword) ||
                    channelDetails.description.toLowerCase().includes(keyword)
                  );

                  if (matchesKeywords) {
                    frameworkChannels.push(channelDetails);
                    console.log(`   ✅ Found via search: ${channelDetails.title} (${channelDetails.subscriberCount} subscribers)`);
                    break; // Found one, move on
                  }
                }
              }
            }

            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (error) {
            console.log(`   ❌ Search failed: ${error.message}`);
          }
        }
      }

      results.found_channels[framework] = frameworkChannels;
      results.total_found += frameworkChannels.length;

      if (frameworkChannels.length > 0) {
        results.verification_status[framework] = 'found';
        console.log(`   🎯 ${framework}: ${frameworkChannels.length} channel(s) found`);
      } else {
        results.verification_status[framework] = 'not_found';
        console.log(`   ⚠️  ${framework}: No official channels identified`);
      }
    }

    // Generate summary
    results.summary = {
      total_frameworks: Object.keys(this.officialSources).length,
      frameworks_with_channels: Object.keys(results.verification_status).filter(
        f => results.verification_status[f] === 'found'
      ).length,
      coverage_percentage: Math.round(
        (Object.keys(results.verification_status).filter(f => results.verification_status[f] === 'found').length /
         Object.keys(this.officialSources).length) * 100
      )
    };

    this.displayResults(results);
    return results;
  }

  /**
   * Display final results
   */
  displayResults(results) {
    console.log('\n' + '=' .repeat(60));
    console.log('📊 OFFICIAL YOUTUBE CHANNELS FOUND');
    console.log('=' .repeat(60));

    console.log(`\n🎯 Coverage: ${results.summary.frameworks_with_channels}/${results.summary.total_frameworks} frameworks (${results.summary.coverage_percentage}%)`);

    console.log('\n📺 Official Channels Identified:');
    for (const [framework, channels] of Object.entries(results.found_channels)) {
      if (channels.length > 0) {
        console.log(`\n   ${framework.toUpperCase()}:`);
        channels.forEach(channel => {
          console.log(`   ✅ ${channel.title}`);
          console.log(`      ID: ${channel.id}`);
          console.log(`      Subscribers: ${parseInt(channel.subscriberCount).toLocaleString()}`);
          console.log(`      Videos: ${parseInt(channel.videoCount).toLocaleString()}`);
          if (channel.customUrl) console.log(`      URL: youtube.com/${channel.customUrl}`);
        });
      }
    }

    if (results.total_found > 0) {
      console.log('\n🚀 Ready for Enhanced YouTube Monitoring!');
      console.log('\nNext steps:');
      console.log('1. Add these channel IDs to your monitoring configuration');
      console.log('2. Set up direct channel subscription monitoring');
      console.log('3. Configure real-time notifications for new uploads');
    } else {
      console.log('\n⚠️  No official channels found. Consider:');
      console.log('1. Manual channel ID lookup');
      console.log('2. Community channel monitoring');
      console.log('3. Keyword-based search (current approach)');
    }
  }
}

// CLI interface
async function main() {
  const finder = new OfficialChannelFinder();

  const command = process.argv[2] || 'find';

  switch (command) {
    case 'find':
    case 'search':
      await finder.findAllOfficialChannels();
      break;

    case 'channel':
      const channelId = process.argv[3];
      if (channelId) {
        const details = await finder.getChannelDetails(channelId);
        console.log(JSON.stringify(details, null, 2));
      } else {
        console.log('Usage: node find-official-youtube-channels.js channel <channel_id>');
      }
      break;

    default:
      console.log(`
🔍 Official YouTube Channel Finder

Commands:
  find    - Find all official channels for modern tech stack
  channel - Get details for specific channel ID

Examples:
  node find-official-youtube-channels.js find
  node find-official-youtube-channels.js channel UCsBjURrPoezykLs9EqgamOA
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { OfficialChannelFinder };