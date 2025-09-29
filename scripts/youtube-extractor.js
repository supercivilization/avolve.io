#!/usr/bin/env node

/**
 * YouTube Data Extractor (Node.js Version)
 * 
 * Features:
 * - YouTube transcript extraction (no API key needed)
 * - YouTube Data API v3 integration (with API key)
 * - Multiple output formats
 * - Simple setup and usage
 * 
 * Usage:
 * node youtube-extractor.js --url "https://youtube.com/watch?v=VIDEO_ID"
 * node youtube-extractor.js --video-id "VIDEO_ID" --transcript-only
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Simple argument parser
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      options[key] = value;
      if (value !== true) i++; // Skip next arg if it was a value
    }
  }
  
  return options;
}

// Extract video ID from URL
function extractVideoId(urlOrId) {
  if (urlOrId.length === 11 && !urlOrId.includes('/')) {
    return urlOrId;
  }
  
  try {
    const url = new URL(urlOrId);
    
    // youtube.com/watch?v=
    if (url.hostname.includes('youtube.com') && url.searchParams.has('v')) {
      return url.searchParams.get('v');
    }
    
    // youtu.be/
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1);
    }
    
    // youtube.com/embed/
    if (url.pathname.startsWith('/embed/')) {
      return url.pathname.split('/')[2];
    }
    
  } catch (e) {
    // Try regex as fallback
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = urlOrId.match(pattern);
      if (match) return match[1];
    }
  }
  
  throw new Error(`Could not extract video ID from: ${urlOrId}`);
}

// Simple HTTP request helper
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Extract transcript using YouTube's internal API
async function getTranscript(videoId) {
  console.log(`📝 Extracting transcript for video: ${videoId}`);
  
  try {
    // First, get the video page to find transcript data
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await httpRequest(videoUrl);
    
    if (response.statusCode !== 200) {
      throw new Error(`Failed to fetch video page: ${response.statusCode}`);
    }
    
    const html = response.body;
    
    // Look for transcript data in the page
    // This is a simplified approach - production code would need more robust parsing
    const transcriptRegex = /"captions":\s*\{[^}]*"playerCaptionsTracklistRenderer":\s*\{[^}]*"captionTracks":\s*(\[[^\]]+\])/;
    const match = html.match(transcriptRegex);
    
    if (!match) {
      console.log('⚠️  No transcript data found in video page');
      return { transcript: [], text: '' };
    }
    
    try {
      const captionTracks = JSON.parse(match[1]);
      
      // Find English transcript or first available
      const track = captionTracks.find(t => t.languageCode === 'en') || captionTracks[0];
      
      if (!track || !track.baseUrl) {
        console.log('⚠️  No usable transcript track found');
        return { transcript: [], text: '' };
      }
      
      // Fetch the transcript XML
      const transcriptResponse = await httpRequest(track.baseUrl);
      
      if (transcriptResponse.statusCode !== 200) {
        throw new Error(`Failed to fetch transcript: ${transcriptResponse.statusCode}`);
      }
      
      // Parse the XML transcript (simplified)
      const xmlData = transcriptResponse.body;
      const textMatches = xmlData.match(/<text[^>]*>([^<]+)</g);
      
      if (!textMatches) {
        console.log('⚠️  No text found in transcript XML');
        return { transcript: [], text: '' };
      }
      
      const transcript = textMatches.map((match, index) => {
        const text = match.replace(/<text[^>]*>/, '').replace(/<\/text>/, '');
        // Decode HTML entities
        const decodedText = text
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        
        return {
          start: index * 3, // Rough timing estimation
          text: decodedText.trim()
        };
      }).filter(item => item.text.length > 0);
      
      const fullText = transcript.map(item => item.text).join(' ');
      
      console.log(`✅ Extracted ${transcript.length} transcript segments`);
      console.log(`✅ Total text length: ${fullText.length} characters`);
      
      return { transcript, text: fullText };
      
    } catch (parseError) {
      console.log('⚠️  Failed to parse transcript data:', parseError.message);
      return { transcript: [], text: '' };
    }
    
  } catch (error) {
    console.error('❌ Transcript extraction failed:', error.message);
    return { transcript: [], text: '' };
  }
}

// Get video metadata using YouTube Data API v3
async function getVideoMetadata(videoId, apiKey) {
  if (!apiKey) {
    console.log('⚠️  No API key provided - skipping metadata extraction');
    return {
      title: 'Unknown (API key required)',
      description: '',
      channelTitle: '',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    };
  }
  
  console.log(`📊 Fetching metadata for video: ${videoId}`);
  
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
    const response = await httpRequest(url);
    
    if (response.statusCode !== 200) {
      throw new Error(`API request failed: ${response.statusCode} ${response.body}`);
    }
    
    const data = JSON.parse(response.body);
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const video = data.items[0];
    const snippet = video.snippet || {};
    const statistics = video.statistics || {};
    
    console.log(`✅ Retrieved metadata for: ${snippet.title}`);
    
    return {
      title: snippet.title || '',
      description: snippet.description || '',
      channelTitle: snippet.channelTitle || '',
      publishedAt: snippet.publishedAt || '',
      viewCount: parseInt(statistics.viewCount || 0),
      likeCount: parseInt(statistics.likeCount || 0),
      commentCount: parseInt(statistics.commentCount || 0),
      tags: snippet.tags || []
    };
    
  } catch (error) {
    console.error('❌ Metadata extraction failed:', error.message);
    return {
      title: 'Error fetching metadata',
      description: '',
      channelTitle: '',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    };
  }
}

// Main extraction function
async function extractVideoData(videoId, options = {}) {
  console.log(`🎬 Starting extraction for video: ${videoId}`);
  console.log(`⚙️  Options:`, options);
  
  const results = {
    videoId,
    extractedAt: new Date().toISOString(),
    metadata: {},
    transcript: [],
    transcriptText: ''
  };
  
  // Get transcript (always attempt)
  if (!options.noTranscript) {
    const { transcript, text } = await getTranscript(videoId);
    results.transcript = transcript;
    results.transcriptText = text;
  }
  
  // Get metadata (if API key provided)
  if (!options.transcriptOnly) {
    const apiKey = options.apiKey || process.env.YOUTUBE_API_KEY;
    results.metadata = await getVideoMetadata(videoId, apiKey);
  }
  
  return results;
}

// Save results to file
function saveResults(data, filename, format = 'json') {
  const outputPath = path.resolve(filename);
  
  if (format.toLowerCase() === 'json') {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  } else if (format.toLowerCase() === 'txt') {
    // Save just the transcript text
    fs.writeFileSync(outputPath, data.transcriptText || '', 'utf8');
  }
  
  console.log(`✅ Results saved to: ${outputPath}`);
}

// CLI interface
async function main() {
  const options = parseArgs();
  
  // Show help
  if (options.help || (!options.url && !options['video-id'])) {
    console.log(`
🎬 YouTube Data Extractor (Node.js)

Usage:
  node youtube-extractor.js --url "https://youtube.com/watch?v=VIDEO_ID"
  node youtube-extractor.js --video-id "VIDEO_ID"
  node youtube-extractor.js --url "URL" --transcript-only
  node youtube-extractor.js --video-id "ID" --output results.json

Options:
  --url URL              YouTube video URL
  --video-id ID          YouTube video ID
  --output FILE          Output file (default: youtube_data.json)
  --format FORMAT        Output format: json, txt (default: json)
  --transcript-only      Extract only transcript (no API needed)
  --no-transcript        Skip transcript extraction
  --api-key KEY          YouTube Data API v3 key
  --help                 Show this help

Environment Variables:
  YOUTUBE_API_KEY        YouTube Data API v3 key

Examples:
  # Extract everything (needs API key)
  node youtube-extractor.js --url "https://youtube.com/watch?v=dQw4w9WgXcQ"
  
  # Just transcript (no API key needed)
  node youtube-extractor.js --url "https://youtube.com/watch?v=dQw4w9WgXcQ" --transcript-only
  
  # Save as text file
  node youtube-extractor.js --video-id "dQw4w9WgXcQ" --transcript-only --format txt --output transcript.txt
`);
    return;
  }
  
  try {
    // Extract video ID
    const videoId = options['video-id'] || extractVideoId(options.url);
    console.log(`🎯 Video ID: ${videoId}`);
    
    // Extract data
    const data = await extractVideoData(videoId, options);
    
    // Save results
    const outputFile = options.output || 'youtube_data.json';
    const format = options.format || 'json';
    saveResults(data, outputFile, format);
    
    // Show summary
    console.log('\n📊 Extraction Summary:');
    console.log(`   Video: ${data.metadata.title || 'Unknown'}`);
    console.log(`   Transcript: ${data.transcript.length} segments`);
    console.log(`   Text length: ${data.transcriptText.length} characters`);
    
    if (data.transcriptText.length > 0) {
      console.log('\n📝 First 200 characters:');
      console.log(`"${data.transcriptText.substring(0, 200)}..."`);
    }
    
    console.log('\n🎉 Extraction complete!');
    
  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { extractVideoData, getTranscript, extractVideoId };