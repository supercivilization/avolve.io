# API Reference and Developer Onboarding Guide

**Version:** 1.0.0
**Date:** September 23, 2025
**Classification:** Developer Documentation

## Quick Start Guide

### Prerequisites Checklist

```bash
# System Requirements
node --version        # >=24.8.0
npm --version         # >=10.0.0
gh --version          # GitHub CLI installed
git --version         # Git installed

# Required API Keys
echo $YOUTUBE_API_KEY                    # YouTube Data API v3
echo $GITHUB_TOKEN                       # GitHub Personal Access Token
echo $X_BEARER_TOKEN                     # X.com API Bearer Token (optional)
echo $REDDIT_CLIENT_ID                   # Reddit API Client ID (optional)
echo $REDDIT_CLIENT_SECRET               # Reddit API Client Secret (optional)
```

### 5-Minute Setup

```bash
# 1. Clone and navigate to project
cd /Users/avolve/dev/active/avolve

# 2. Install dependencies (if not already installed)
npm install

# 3. Verify system connectivity
npm run social:comprehensive:test

# 4. Run initial intelligence collection
npm run github:intelligence

# 5. Generate first dashboard
npm run github:intelligence:dashboard && open dashboard/github-intelligence-dashboard.html
```

### Environment Configuration

```bash
# Create .env file with required API keys
cat > .env << 'EOF'
# Required for YouTube monitoring
YOUTUBE_API_KEY=your-youtube-api-key-here

# Required for enhanced GitHub intelligence
GITHUB_TOKEN=your_github_token_here

# Optional for X.com monitoring
X_BEARER_TOKEN=your_x_bearer_token

# Optional for Reddit monitoring
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
EOF

# Load environment variables
source .env
```

## Complete Command Reference

### Core Intelligence Commands

#### Social Listening Operations
```bash
# Comprehensive monitoring across all platforms
npm run social:comprehensive:monitor
# Duration: 30-45 seconds
# Output: data/comprehensive-social-analysis-YYYYMMDD.json
# Coverage: YouTube, X.com, GitHub, Reddit

# Platform-specific monitoring
npm run social:youtube                    # YouTube content analysis
npm run social:reddit                     # Reddit community monitoring
npm run social:x                          # X.com social intelligence

# System testing and validation
npm run social:comprehensive:test         # Test all platform connections
npm run social:comprehensive:setup        # Show setup instructions
```

#### GitHub Intelligence System
```bash
# Core GitHub intelligence operations
npm run github:intelligence               # Full repository analysis
# Duration: 20-30 seconds
# Analysis: 25+ repositories across 4 tiers
# Output: data/github-intelligence-YYYYMMDD.json

npm run github:intelligence:dashboard     # Generate interactive dashboard
# Output: dashboard/github-intelligence-dashboard.html
# Features: Charts, metrics, alerts, repository matrix

npm run github:intelligence:repos         # List monitored repositories
# Shows: All 25+ repositories organized by tier
# Details: Priority, category, tags for each repo
```

#### AI Ecosystem Discovery
```bash
# AI provider channel discovery
npm run ai:channels:find                  # Find official YouTube channels
# Discovers: 15+ AI providers with verified channels
# Output: Mapping of providers to channels with subscriber counts

npm run ai:channels:mapping               # Display ecosystem mapping
# Shows: Complete provider ecosystem with all social accounts

npm run ai:channels:verify                # Verify channel access
# Tests: API connectivity and channel permissions
# Validates: All configured channels are accessible
```

### Advanced Operations

#### Data Analysis and Processing
```bash
# YouTube-specific operations
YOUTUBE_API_KEY="your_key" node scripts/social-listening-system.js youtube
YOUTUBE_API_KEY="your_key" node scripts/social-listening-system.js verify-channels

# GitHub-specific operations
node scripts/comprehensive-github-intelligence.js analyze
node scripts/comprehensive-github-intelligence.js dashboard
node scripts/comprehensive-github-intelligence.js repos

# Cross-platform analysis
node scripts/comprehensive-social-listening.js monitor
node scripts/comprehensive-social-listening.js test
```

#### System Maintenance
```bash
# Health checks and diagnostics
npm run social:comprehensive:test         # Full system health check
npm run social:youtube                    # YouTube-specific test
npm run social:reddit:test                # Reddit connection test
npm run social:x:test                     # X.com API test

# Data management
ls -la data/                              # View collected data
find data/ -name "*.json" -mtime -1       # Find recent data files
du -sh data/                              # Check storage usage
```

## API Documentation

### Internal API Endpoints

#### Intelligence Query API
```typescript
interface IntelligenceAPI {
  // Get comprehensive ecosystem intelligence
  '/api/intelligence/comprehensive': {
    method: 'GET';
    params: {
      timeframe?: '24h' | '7d' | '30d';
      platforms?: ('youtube' | 'x' | 'github' | 'reddit')[];
      priority?: 'all' | 'high' | 'critical';
    };
    response: {
      summary: {
        totalItems: number;
        platformBreakdown: Record<string, number>;
        priorityDistribution: Record<string, number>;
        timeRange: { start: string; end: string; };
      };
      platforms: {
        youtube: YouTubeIntelligence;
        github: GitHubIntelligence;
        x: XIntelligence;
        reddit: RedditIntelligence;
      };
      correlations: CrossPlatformCorrelation[];
      trends: TrendAnalysis[];
      alerts: Alert[];
    };
  };

  // GitHub-specific intelligence
  '/api/github/intelligence': {
    method: 'GET';
    params: {
      tier?: 'critical' | 'tech-stack' | 'infrastructure' | 'tools';
      includeMetrics?: boolean;
      includeSecurity?: boolean;
    };
    response: {
      overview: {
        totalRepositories: number;
        healthScore: number;
        criticalIssues: number;
        securityAlerts: number;
      };
      repositories: RepositoryAnalysis[];
      trends: RepositoryTrend[];
      recommendations: ActionRecommendation[];
    };
  };
}
```

#### Data Export API
```typescript
interface DataExportAPI {
  '/api/export/json': {
    method: 'GET';
    params: {
      dataset: 'comprehensive' | 'youtube' | 'github' | 'social';
      dateRange: { start: string; end: string; };
      format: 'raw' | 'analyzed' | 'summary';
    };
    response: {
      metadata: ExportMetadata;
      data: IntelligenceData[];
    };
  };

  '/api/export/dashboard-data': {
    method: 'GET';
    params: {
      dashboardType: 'github' | 'social' | 'comprehensive';
      refreshCache?: boolean;
    };
    response: {
      chartData: ChartDataset[];
      metrics: DashboardMetrics;
      lastUpdated: string;
    };
  };
}
```

### External API Integrations

#### YouTube Data API v3
```javascript
// YouTube API integration example
class YouTubeAPIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://www.googleapis.com/youtube/v3';
    this.dailyQuota = 10000; // units per day
  }

  async searchVideos(query, options = {}) {
    const params = new URLSearchParams({
      part: 'snippet,statistics',
      q: query,
      type: 'video',
      key: this.apiKey,
      maxResults: options.maxResults || 25,
      publishedAfter: options.publishedAfter || new Date(Date.now() - 24*60*60*1000).toISOString(),
      order: options.order || 'relevance'
    });

    const response = await fetch(`${this.baseURL}/search?${params}`);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async getChannelDetails(channelId) {
    const params = new URLSearchParams({
      part: 'snippet,statistics,brandingSettings',
      id: channelId,
      key: this.apiKey
    });

    const response = await fetch(`${this.baseURL}/channels?${params}`);
    return await response.json();
  }

  // API quota management
  calculateQuotaCost(operation, params) {
    const costs = {
      'search': 100,
      'channels': 1,
      'videos': 1,
      'playlistItems': 1
    };

    return costs[operation] || 1;
  }
}
```

#### GitHub API v4 (GraphQL) with MCP
```javascript
// MCP GitHub integration example
class MCPGitHubClient {
  constructor() {
    this.mcpTools = {
      listIssues: 'mcp__github__list_issues',
      getRepository: 'mcp__github__get_file_contents',
      searchCode: 'mcp__github__search_code'
    };
  }

  async analyzeRepository(owner, repo) {
    // Parallel MCP tool execution
    const [issues, releases, security] = await Promise.all([
      this.listRepositoryIssues(owner, repo),
      this.getRepositoryReleases(owner, repo),
      this.getSecurityAdvisories(owner, repo)
    ]);

    return {
      repository: `${owner}/${repo}`,
      analysis: {
        issues: this.analyzeIssues(issues),
        releases: this.analyzeReleases(releases),
        security: this.analyzeSecurity(security)
      },
      healthScore: this.calculateHealthScore({ issues, releases, security }),
      lastAnalyzed: new Date().toISOString()
    };
  }

  async listRepositoryIssues(owner, repo) {
    // MCP GitHub tool for issue listing
    return await this.callMCPTool(this.mcpTools.listIssues, {
      owner,
      repo,
      state: 'open',
      per_page: 100,
      sort: 'created',
      direction: 'desc'
    });
  }

  calculateHealthScore(data) {
    // Health scoring algorithm
    const openIssues = data.issues.filter(i => i.state === 'open').length;
    const criticalIssues = data.issues.filter(i =>
      i.labels.some(l => l.name.includes('critical'))
    ).length;
    const recentReleases = data.releases.filter(r =>
      new Date(r.published_at) > new Date(Date.now() - 90*24*60*60*1000)
    ).length;

    // Scoring algorithm (0-100)
    let score = 100;
    score -= Math.min(openIssues * 0.5, 30);      // Deduct for open issues
    score -= criticalIssues * 5;                   // Deduct more for critical issues
    score += Math.min(recentReleases * 5, 20);     // Add for recent activity

    return Math.max(0, Math.min(100, Math.round(score)));
  }
}
```

#### X.com API v2 Integration
```javascript
// X.com API integration (when configured)
class XAPIClient {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
    this.baseURL = 'https://api.twitter.com/2';
    this.monthlyLimit = 1500; // posts per month for free tier
  }

  async getUserTweets(username, options = {}) {
    if (!this.bearerToken) {
      throw new Error('X.com API not configured. Set X_BEARER_TOKEN environment variable.');
    }

    const params = new URLSearchParams({
      'tweet.fields': 'created_at,public_metrics,context_annotations',
      'user.fields': 'public_metrics,verified',
      max_results: options.maxResults || 10
    });

    const response = await fetch(
      `${this.baseURL}/users/by/username/${username}/tweets?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`X.com API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async searchTweets(query, options = {}) {
    const params = new URLSearchParams({
      query: query,
      'tweet.fields': 'created_at,public_metrics,author_id',
      max_results: options.maxResults || 10
    });

    const response = await fetch(`${this.baseURL}/tweets/search/recent?${params}`, {
      headers: { 'Authorization': `Bearer ${this.bearerToken}` }
    });

    return await response.json();
  }
}
```

## Data Schemas and Types

### Core Data Types
```typescript
// Core intelligence data structures
interface IntelligenceItem {
  id: string;
  platform: 'youtube' | 'github' | 'x' | 'reddit';
  source: string;
  timestamp: string; // ISO 8601
  content: {
    title: string;
    description: string;
    url: string;
    author?: string;
  };
  metrics: {
    engagementScore: number;        // 0-100
    relevanceScore: number;         // 0-100
    priorityLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;             // 0-1
  };
  analysis: {
    categories: string[];           // ['release', 'security', 'tutorial']
    frameworks: string[];           // ['next.js', 'react', 'vercel-ai']
    sentiment?: 'positive' | 'neutral' | 'negative';
    technicalDepth: 'beginner' | 'intermediate' | 'advanced';
  };
  extracted_at: string;
}

interface GitHubRepositoryAnalysis {
  repository: {
    owner: string;
    name: string;
    fullName: string;
    tier: 'critical' | 'tech-stack' | 'infrastructure' | 'tools';
    category: string;
    priority: number;
    tags: string[];
  };
  health: {
    score: number;                  // 0-100
    openIssues: number;
    criticalIssues: number;
    lastRelease: string;
    releaseFrequency: number;       // releases per month
    communityEngagement: number;    // 0-100
  };
  security: {
    advisories: SecurityAdvisory[];
    vulnerabilities: number;
    lastSecurityUpdate: string;
    securityScore: number;          // 0-100
  };
  activity: {
    commitsLastMonth: number;
    contributorsLastMonth: number;
    issuesClosedLastMonth: number;
    activityScore: number;          // 0-100
  };
  trends: {
    starTrend: 'rising' | 'stable' | 'declining';
    issueTrend: 'improving' | 'stable' | 'concerning';
    releaseTrend: 'accelerating' | 'stable' | 'slowing';
  };
}

interface DashboardData {
  overview: {
    totalRepositories: number;
    healthScore: number;
    criticalAlerts: number;
    lastUpdated: string;
  };
  charts: {
    activityTimeline: TimeSeriesData[];
    healthDistribution: CategoryData[];
    priorityMatrix: MatrixData[][];
    trendAnalysis: TrendData[];
  };
  alerts: Alert[];
  recommendations: Recommendation[];
}
```

### Response Format Standards
```typescript
// Standard API response format
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    requestId: string;
    timestamp: string;
    version: string;
    processingTime: number;
  };
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
  };
}

// Error handling standards
interface APIError {
  code: 'RATE_LIMIT_EXCEEDED' | 'API_KEY_INVALID' | 'NETWORK_ERROR' | 'DATA_PARSING_ERROR';
  message: string;
  statusCode: number;
  retryAfter?: number; // seconds
  details?: {
    platform?: string;
    quotaUsed?: number;
    quotaLimit?: number;
  };
}
```

## Developer Integration Examples

### Custom Analysis Integration
```javascript
// Example: Custom analysis integration
class CustomAnalysisIntegration {
  constructor(systemAPI) {
    this.api = systemAPI;
    this.customAnalyzers = new Map();
  }

  // Register custom analyzer
  registerAnalyzer(name, analyzer) {
    this.customAnalyzers.set(name, analyzer);
  }

  // Run custom analysis on collected data
  async runCustomAnalysis(analyzerName, options = {}) {
    const analyzer = this.customAnalyzers.get(analyzerName);
    if (!analyzer) {
      throw new Error(`Custom analyzer '${analyzerName}' not found`);
    }

    // Get data from system
    const intelligenceData = await this.api.getIntelligenceData({
      timeframe: options.timeframe || '24h',
      platforms: options.platforms || ['youtube', 'github', 'x', 'reddit']
    });

    // Run custom analysis
    const results = await analyzer.analyze(intelligenceData, options);

    return {
      analyzer: analyzerName,
      results,
      timestamp: new Date().toISOString(),
      dataPoints: intelligenceData.length
    };
  }
}

// Example custom analyzer
class CompetitorAnalyzer {
  async analyze(data, options) {
    // Custom competitor analysis logic
    const competitors = options.competitors || [];
    const mentionAnalysis = {};

    for (const item of data) {
      for (const competitor of competitors) {
        if (item.content.title.toLowerCase().includes(competitor.toLowerCase()) ||
            item.content.description.toLowerCase().includes(competitor.toLowerCase())) {

          if (!mentionAnalysis[competitor]) {
            mentionAnalysis[competitor] = {
              mentions: 0,
              sentiment: { positive: 0, neutral: 0, negative: 0 },
              platforms: new Set(),
              examples: []
            };
          }

          mentionAnalysis[competitor].mentions++;
          mentionAnalysis[competitor].platforms.add(item.platform);
          mentionAnalysis[competitor].examples.push({
            title: item.content.title,
            platform: item.platform,
            url: item.content.url,
            timestamp: item.timestamp
          });
        }
      }
    }

    return {
      competitorMentions: mentionAnalysis,
      summary: {
        totalMentions: Object.values(mentionAnalysis).reduce((sum, c) => sum + c.mentions, 0),
        mostMentioned: Object.entries(mentionAnalysis)
          .sort(([,a], [,b]) => b.mentions - a.mentions)[0]?.[0],
        platformBreakdown: this.analyzePlatformBreakdown(mentionAnalysis)
      }
    };
  }
}
```

### Webhook Integration
```javascript
// Example: Webhook integration for real-time alerts
class WebhookIntegration {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
    this.alertFilters = new Map();
  }

  // Register alert filter
  registerAlertFilter(name, filterFunction) {
    this.alertFilters.set(name, filterFunction);
  }

  // Process intelligence data and send webhooks
  async processIntelligenceUpdates(newData) {
    for (const [filterName, filterFn] of this.alertFilters) {
      const alertData = newData.filter(filterFn);

      if (alertData.length > 0) {
        await this.sendWebhook({
          alertType: filterName,
          items: alertData,
          timestamp: new Date().toISOString(),
          count: alertData.length
        });
      }
    }
  }

  async sendWebhook(payload) {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'AI-Ecosystem-Intelligence/1.0'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Webhook delivery failed:', error);
      // Implement retry logic here
    }
  }
}

// Example usage
const webhooks = new WebhookIntegration('https://hooks.slack.com/your/webhook/url');

// Register security alert filter
webhooks.registerAlertFilter('security', (item) =>
  item.analysis.categories.includes('security') &&
  item.metrics.priorityLevel === 'critical'
);

// Register release alert filter
webhooks.registerAlertFilter('releases', (item) =>
  item.analysis.categories.includes('release') &&
  item.analysis.frameworks.some(fw => ['next.js', 'react', 'vercel-ai'].includes(fw))
);
```

### Dashboard Extension
```javascript
// Example: Custom dashboard extension
class DashboardExtension {
  constructor(dashboardAPI) {
    this.api = dashboardAPI;
    this.customCharts = new Map();
    this.customMetrics = new Map();
  }

  // Add custom chart to dashboard
  addCustomChart(name, chartConfig) {
    this.customCharts.set(name, chartConfig);
  }

  // Add custom metric to dashboard
  addCustomMetric(name, metricCalculator) {
    this.customMetrics.set(name, metricCalculator);
  }

  // Generate extended dashboard data
  async generateExtendedDashboard(standardDashboardData) {
    const extended = { ...standardDashboardData };

    // Add custom charts
    extended.customCharts = {};
    for (const [name, config] of this.customCharts) {
      extended.customCharts[name] = await this.generateChartData(config);
    }

    // Add custom metrics
    extended.customMetrics = {};
    for (const [name, calculator] of this.customMetrics) {
      extended.customMetrics[name] = await calculator(standardDashboardData);
    }

    return extended;
  }

  async generateChartData(config) {
    // Get data based on chart configuration
    const data = await this.api.getIntelligenceData(config.dataQuery);

    // Transform data for chart
    return config.transformer(data);
  }
}

// Example usage
const dashboardExt = new DashboardExtension(systemAPI);

// Add custom technology adoption chart
dashboardExt.addCustomChart('tech-adoption', {
  dataQuery: { timeframe: '30d', platforms: ['github', 'youtube'] },
  transformer: (data) => {
    const techCounts = {};
    data.forEach(item => {
      item.analysis.frameworks.forEach(tech => {
        techCounts[tech] = (techCounts[tech] || 0) + 1;
      });
    });
    return Object.entries(techCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  }
});

// Add custom community engagement metric
dashboardExt.addCustomMetric('community-engagement', (dashboardData) => {
  const socialPlatforms = ['x', 'reddit'];
  const socialItems = dashboardData.items?.filter(item =>
    socialPlatforms.includes(item.platform)
  ) || [];

  const totalEngagement = socialItems.reduce((sum, item) =>
    sum + item.metrics.engagementScore, 0
  );

  return {
    score: socialItems.length > 0 ? totalEngagement / socialItems.length : 0,
    itemCount: socialItems.length,
    trend: 'stable' // Calculate trend based on historical data
  };
});
```

## Testing and Quality Assurance

### Test Data Generation
```bash
# Generate test data for development
generate_test_data() {
    echo "🧪 Generating test data for development..."

    # Create test data directory
    mkdir -p test-data/

    # Generate mock YouTube data
    node -e "
    const testYouTubeData = {
        videos: Array.from({length: 10}, (_, i) => ({
            id: 'test_video_' + i,
            title: 'Test Video ' + i + ': Next.js Tutorial',
            description: 'A comprehensive tutorial on Next.js development',
            channelTitle: 'Tech Channel ' + i,
            publishedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            statistics: {
                viewCount: Math.floor(Math.random() * 10000),
                likeCount: Math.floor(Math.random() * 1000),
                commentCount: Math.floor(Math.random() * 100)
            }
        }))
    };
    require('fs').writeFileSync('test-data/youtube-test-data.json', JSON.stringify(testYouTubeData, null, 2));
    "

    # Generate mock GitHub data
    node -e "
    const testGitHubData = {
        repositories: [
            {
                owner: 'test-org',
                name: 'test-repo',
                fullName: 'test-org/test-repo',
                health: { score: 85, openIssues: 12, criticalIssues: 1 },
                activity: { commitsLastMonth: 45, contributorsLastMonth: 8 }
            }
        ]
    };
    require('fs').writeFileSync('test-data/github-test-data.json', JSON.stringify(testGitHubData, null, 2));
    "

    echo "✅ Test data generated in test-data/ directory"
}
```

### Integration Testing
```bash
# Comprehensive system integration test
integration_test() {
    echo "🔧 Running integration tests..."

    # Test API connectivity
    echo "Testing API connectivity..."
    npm run social:comprehensive:test

    # Test data collection
    echo "Testing data collection..."
    npm run social:youtube > /tmp/youtube-test.log 2>&1 &
    sleep 10
    kill $! 2>/dev/null || true

    # Test dashboard generation
    echo "Testing dashboard generation..."
    npm run github:intelligence:dashboard

    # Validate generated files
    echo "Validating generated files..."
    test -f dashboard/github-intelligence-dashboard.html && echo "✅ Dashboard generated" || echo "❌ Dashboard failed"
    test -s data/github-intelligence-$(date +%Y%m%d).json && echo "✅ Data collected" || echo "❌ Data collection failed"

    # Test system recovery
    echo "Testing system recovery..."
    pkill -f "node.*social" || true
    sleep 2
    npm run social:comprehensive:test

    echo "✅ Integration tests completed"
}
```

## Best Practices and Guidelines

### Development Workflow
1. **Always test before deployment**: Run `npm run social:comprehensive:test`
2. **Monitor API quotas**: Check usage before large operations
3. **Validate data integrity**: Verify JSON files after collection
4. **Use staged rollouts**: Test with small datasets first
5. **Document changes**: Update this guide when adding features

### Error Handling Patterns
```javascript
// Recommended error handling pattern
class RobustAPIClient {
  async callAPI(operation, params, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await this.executeOperation(operation, params);
      } catch (error) {
        console.warn(`Attempt ${attempt}/${retries} failed:`, error.message);

        if (attempt === retries) {
          // Final attempt failed - log and throw
          console.error(`All ${retries} attempts failed for ${operation}:`, error);
          throw new OperationError(`${operation} failed after ${retries} attempts`, {
            originalError: error,
            operation,
            params,
            attempts: retries
          });
        }

        // Calculate backoff delay
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}
```

### Performance Optimization
```javascript
// Recommended performance patterns
class OptimizedDataCollector {
  constructor() {
    this.cache = new Map();
    this.rateLimiter = new RateLimiter();
  }

  async collectData(sources) {
    // Parallel collection with rate limiting
    const chunks = this.chunkArray(sources, 5); // Process 5 at a time
    const results = [];

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(source => this.collectFromSource(source))
      );
      results.push(...chunkResults);

      // Brief pause between chunks to respect rate limits
      await this.rateLimiter.wait();
    }

    return results;
  }

  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
```

This comprehensive API reference and developer guide provides everything needed to understand, integrate with, and extend the AI ecosystem intelligence system.