#!/usr/bin/env node

/**
 * Simple YouTube transcript test using official approach
 * Tests basic video ID extraction and YouTube API access
 */

const https = require('https');

// Test video ID extraction
function testVideoIdExtraction() {
  console.log('🧪 Testing video ID extraction...');
  
  const testUrls = [
    'jNQXAC9IVRw',
    'https://youtube.com/watch?v=jNQXAC9IVRw',
    'https://youtu.be/jNQXAC9IVRw',
    'https://youtube.com/embed/jNQXAC9IVRw'
  ];
  
  function extractVideoId(urlOrId) {
    if (urlOrId.length === 11 && !urlOrId.includes('/')) {
      return urlOrId;
    }
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = urlOrId.match(pattern);
      if (match) return match[1];
    }
    
    throw new Error(`Could not extract video ID from: ${urlOrId}`);
  }
  
  testUrls.forEach(url => {
    try {
      const videoId = extractVideoId(url);
      console.log(`✅ ${url} → ${videoId}`);
    } catch (e) {
      console.log(`❌ ${url} → ${e.message}`);
    }
  });
}

// Test YouTube API access (if API key available)
function testYouTubeAPI(apiKey, videoId = 'jNQXAC9IVRw') {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      console.log('⚠️  No API key - skipping API test');
      resolve(null);
      return;
    }
    
    console.log('🧪 Testing YouTube Data API v3...');
    
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.error) {
            console.log(`❌ API Error: ${response.error.message}`);
            reject(new Error(response.error.message));
            return;
          }
          
          if (response.items && response.items.length > 0) {
            const video = response.items[0];
            console.log(`✅ API Test Success!`);
            console.log(`   Title: ${video.snippet.title}`);
            console.log(`   Channel: ${video.snippet.channelTitle}`);
            console.log(`   Published: ${video.snippet.publishedAt}`);
            resolve(video);
          } else {
            console.log('❌ No video found');
            reject(new Error('Video not found'));
          }
        } catch (e) {
          console.log(`❌ Parse error: ${e.message}`);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.log(`❌ Request error: ${e.message}`);
      reject(e);
    });
  });
}

// Show setup instructions
function showSetupInstructions() {
  console.log(`
🔑 YouTube Data API v3 Setup Instructions:

1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing project
3. Enable "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key
6. Set environment variable: export YOUTUBE_API_KEY="your_key_here"

💡 Tips:
- Restrict API key to YouTube Data API v3 for security
- Free quota: 10,000 units/day (plenty for testing)
- Each video metadata request costs ~1 unit

🧪 Test your setup:
node simple-youtube-test.js YOUR_API_KEY

📖 Or test without API key (transcript-only):
node youtube-extractor.js --video-id "jNQXAC9IVRw" --transcript-only
`);
}

async function main() {
  console.log('🎬 YouTube Integration Test');
  console.log('=' * 30);
  
  // Test video ID extraction
  testVideoIdExtraction();
  console.log('');
  
  // Get API key from args or environment
  const apiKey = process.argv[2] || process.env.YOUTUBE_API_KEY;
  
  if (apiKey) {
    try {
      await testYouTubeAPI(apiKey);
      console.log('\n✅ All tests passed! YouTube integration is ready.');
      console.log('\n🚀 Next steps:');
      console.log('1. Try: node youtube-extractor.js --help');
      console.log('2. Extract data: node youtube-extractor.js --video-id "jNQXAC9IVRw"');
    } catch (error) {
      console.log('\n❌ API test failed. Check your API key.');
      showSetupInstructions();
    }
  } else {
    console.log('\n🔑 No API key provided.');
    showSetupInstructions();
  }
}

if (require.main === module) {
  main().catch(console.error);
}