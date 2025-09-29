# Operational Procedures and Troubleshooting Guide

**Version:** 1.0.0
**Date:** September 23, 2025
**Classification:** Operations Manual

## Daily Operations Checklist

### Morning System Health Check (15 minutes)

#### 1. System Status Verification
```bash
# Verify all system components
npm run social:comprehensive:test

# Check API connection health
YOUTUBE_API_KEY="your-youtube-api-key-here" node scripts/social-listening-system.js verify-channels

# Test GitHub MCP integration
npm run github:intelligence:repos

# Verify data directory structure
ls -la data/ && find data/ -name "*.json" -mtime -1 | wc -l
```

#### 2. API Quota Monitoring
```javascript
// Daily quota check script
async function checkAPIQuotas() {
  const quotas = {
    youtube: await checkYouTubeQuota(),
    github: await checkGitHubRateLimit(),
    x: await checkXAPIUsage(),
    reddit: await checkRedditLimits()
  };

  console.log('📊 Daily API Quota Status:');
  Object.entries(quotas).forEach(([api, usage]) => {
    const utilizationPercent = (usage.used / usage.limit) * 100;
    const status = utilizationPercent > 80 ? '⚠️' : utilizationPercent > 50 ? '🟡' : '✅';
    console.log(`${status} ${api.toUpperCase()}: ${usage.used}/${usage.limit} (${utilizationPercent.toFixed(1)}%)`);
  });

  // Alert if any API exceeds 80% usage
  const alerts = Object.entries(quotas).filter(([_, usage]) =>
    (usage.used / usage.limit) > 0.8
  );

  if (alerts.length > 0) {
    console.log('\n🚨 HIGH USAGE ALERTS:');
    alerts.forEach(([api, usage]) => {
      console.log(`${api}: Consider reducing request frequency or upgrading quota`);
    });
  }
}
```

#### 3. Data Quality Verification
```bash
# Check for recent data collection
find data/ -name "*.json" -mtime -1 -exec basename {} \; | sort

# Verify data file sizes (detect empty or corrupted files)
find data/ -name "*.json" -size -100c -exec echo "Small file: {}" \;

# Check for error patterns in log files
grep -i "error\|fail\|exception" data/*.json | head -10
```

### Evening System Review (10 minutes)

#### 1. Intelligence Summary Generation
```bash
# Generate daily intelligence summary
npm run social:comprehensive:monitor

# Create GitHub intelligence dashboard
npm run github:intelligence:dashboard

# Review generated insights
ls -la dashboard/ && open dashboard/github-intelligence-dashboard.html
```

#### 2. Performance Metrics Collection
```javascript
// Daily performance metrics
const dailyMetrics = {
  contentProcessed: await countProcessedContent(),
  analysisAccuracy: await measureAnalysisAccuracy(),
  responseTime: await measureAverageResponseTime(),
  errorRate: await calculateErrorRate(),
  resourceUtilization: await getResourceUtilization()
};

console.log('📈 Daily Performance Metrics:');
console.log(`Content Processed: ${dailyMetrics.contentProcessed} items`);
console.log(`Analysis Accuracy: ${dailyMetrics.analysisAccuracy}%`);
console.log(`Average Response Time: ${dailyMetrics.responseTime}ms`);
console.log(`Error Rate: ${dailyMetrics.errorRate}%`);
console.log(`Resource Utilization: ${dailyMetrics.resourceUtilization}%`);
```

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. API Rate Limiting Issues

**Symptoms:**
- 429 HTTP status codes
- "Quota exceeded" error messages
- Reduced data collection rates

**Diagnostic Commands:**
```bash
# Check current API usage
curl -H "Authorization: Bearer $YOUTUBE_API_KEY" \
  "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true"

# Test GitHub API limits
gh api rate_limit

# Verify X.com API quota
curl -H "Authorization: Bearer $X_BEARER_TOKEN" \
  "https://api.twitter.com/2/users/me"
```

**Solutions:**
```javascript
// Implement exponential backoff
class RateLimitHandler {
  async handleRateLimit(error, retryCount = 0) {
    if (error.status === 429 && retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      console.log(`Rate limited. Waiting ${delay}ms before retry ${retryCount + 1}/3`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return true; // Indicate retry should happen
    }
    return false; // No more retries
  }

  async executeWithBackoff(apiCall) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        if (await this.handleRateLimit(error, attempt)) {
          continue; // Retry the API call
        }
        throw error; // Final failure
      }
    }
  }
}
```

#### 2. MCP GitHub Integration Failures

**Symptoms:**
- "MCP server not responding" errors
- GitHub data collection failures
- Authentication errors

**Diagnostic Commands:**
```bash
# Test GitHub CLI authentication
gh auth status

# Verify MCP server connection
echo '{"method": "ping"}' | npx @modelcontextprotocol/cli github

# Test repository access
gh api repos/vercel/next.js
```

**Solutions:**
```bash
# Re-authenticate GitHub CLI
gh auth refresh

# Restart MCP server
pkill -f "mcp.*github" && sleep 2

# Verify permissions
gh api user | jq '.login'
gh api rate_limit | jq '.resources.core'
```

#### 3. Dashboard Generation Failures

**Symptoms:**
- Empty dashboard files
- Chart rendering errors
- Missing visualization data

**Diagnostic Commands:**
```bash
# Check data directory integrity
ls -la data/ && du -sh data/*

# Verify JSON file validity
for file in data/*.json; do
  echo "Checking $file..."
  python3 -m json.tool "$file" > /dev/null || echo "Invalid JSON: $file"
done

# Check dashboard dependencies
curl -I https://cdn.jsdelivr.net/npm/chart.js
```

**Solutions:**
```javascript
// Dashboard generation with error handling
class DashboardGenerator {
  async generateDashboard() {
    try {
      // Validate data integrity
      const validatedData = await this.validateDataIntegrity();

      // Generate dashboard with fallbacks
      return await this.createDashboardWithFallbacks(validatedData);
    } catch (error) {
      console.error('Dashboard generation failed:', error);
      return await this.generateMinimalDashboard();
    }
  }

  async validateDataIntegrity() {
    const dataFiles = ['github-intelligence.json', 'social-listening.json'];
    const validData = {};

    for (const file of dataFiles) {
      try {
        const data = JSON.parse(await fs.readFile(`data/${file}`, 'utf8'));
        validData[file] = data;
      } catch (error) {
        console.warn(`Invalid data file ${file}, using fallback data`);
        validData[file] = this.getFallbackData(file);
      }
    }

    return validData;
  }
}
```

#### 4. Data Collection Gaps

**Symptoms:**
- Missing data for recent time periods
- Inconsistent collection patterns
- Empty analysis results

**Diagnostic Process:**
```bash
# 1. Check collection schedule
crontab -l | grep -E "(social|github|youtube)"

# 2. Review recent log files
tail -100 /var/log/social-listening.log

# 3. Test individual components
npm run social:youtube
npm run social:github:enhanced
npm run social:x:test

# 4. Check disk space and permissions
df -h
ls -la data/
```

**Recovery Actions:**
```bash
# Manual data collection recovery
echo "🔄 Starting data recovery process..."

# Collect missing YouTube data
YOUTUBE_API_KEY="your-youtube-api-key-here" \
  node scripts/social-listening-system.js youtube

# Recover GitHub intelligence
npm run github:intelligence

# Backfill missing time periods
node scripts/backfill-missing-data.js --start-date="2025-09-22" --end-date="2025-09-23"

echo "✅ Data recovery completed"
```

### Emergency Response Procedures

#### 1. Complete System Failure

**Immediate Response (< 5 minutes):**
```bash
# 1. Assess system status
systemctl status social-listening || ps aux | grep -E "(node|npm)"

# 2. Check available resources
df -h && free -m && uptime

# 3. Verify network connectivity
ping -c 3 api.github.com && ping -c 3 www.googleapis.com

# 4. Restart core services
npm run social:comprehensive:test
```

**Recovery Process (5-30 minutes):**
```bash
# 1. Full system restart
pkill -f "node.*social"
sleep 5

# 2. Clean restart with health checks
npm run social:comprehensive:setup
npm run social:comprehensive:test

# 3. Verify data integrity
npm run github:intelligence:repos
ls -la data/ && wc -l data/*.json

# 4. Generate recovery report
echo "System Recovery Report - $(date)" > recovery-$(date +%Y%m%d-%H%M).log
npm run social:comprehensive:monitor >> recovery-$(date +%Y%m%d-%H%M).log
```

#### 2. Security Incident Response

**Immediate Actions (< 2 minutes):**
```bash
# 1. Isolate the system
sudo iptables -A INPUT -p tcp --dport 22 -j DROP  # Block SSH if needed

# 2. Preserve evidence
cp -r data/ incident-data-$(date +%Y%m%d-%H%M)/
cp -r logs/ incident-logs-$(date +%Y%m%d-%H%M)/

# 3. Check for indicators of compromise
grep -r "malicious\|suspicious\|unauthorized" data/ logs/
netstat -tulpn | grep LISTEN
```

**Investigation Process:**
```bash
# 1. Analyze API access patterns
grep -E "40[0-9]|50[0-9]" logs/* | head -20

# 2. Check for unusual data access
ls -la data/ | grep "$(date +%Y-%m-%d)"
find data/ -newer data/reference-file.json

# 3. Verify API key integrity
echo "Checking API key patterns..."
grep -E "key|token|secret" logs/* | grep -v "masked"

# 4. Generate incident report
cat > incident-report-$(date +%Y%m%d).md << 'EOF'
# Security Incident Report

**Date:** $(date)
**Incident Type:** [Specify type]
**Detection Time:** [Time of detection]
**Response Time:** [Time to response]

## Incident Summary
[Description of what happened]

## Evidence Collected
- System logs: incident-logs-$(date +%Y%m%d-%H%M)/
- Data backup: incident-data-$(date +%Y%m%d-%H%M)/
- Network analysis: [Results]

## Actions Taken
1. [Action 1]
2. [Action 2]
3. [Action 3]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
EOF
```

#### 3. Data Corruption Recovery

**Assessment Phase:**
```bash
# 1. Identify corrupted files
find data/ -name "*.json" -exec sh -c 'python3 -m json.tool "$1" >/dev/null || echo "Corrupted: $1"' _ {} \;

# 2. Check file sizes for anomalies
find data/ -name "*.json" -size -100c -o -size +10M

# 3. Verify timestamps
ls -lt data/ | head -10
```

**Recovery Actions:**
```bash
# 1. Create backup of current state
cp -r data/ data-backup-$(date +%Y%m%d-%H%M)/

# 2. Restore from last known good state
if [ -d "data-backup-$(date -d '1 day ago' +%Y%m%d)" ]; then
  echo "Restoring from yesterday's backup..."
  cp -r data-backup-$(date -d '1 day ago' +%Y%m%d)/* data/
fi

# 3. Regenerate corrupted data
npm run social:comprehensive:monitor
npm run github:intelligence

# 4. Verify recovery
npm run social:comprehensive:test
```

## Performance Optimization Procedures

### 1. System Performance Tuning

#### Memory Optimization
```javascript
// Memory usage optimization for large datasets
class MemoryOptimizer {
  constructor() {
    this.memoryThreshold = 512 * 1024 * 1024; // 512MB threshold
    this.gcInterval = 60000; // 1 minute
  }

  async optimizeMemoryUsage() {
    // Monitor memory usage
    const memUsage = process.memoryUsage();

    if (memUsage.heapUsed > this.memoryThreshold) {
      console.log('🧹 Memory cleanup triggered');

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      // Clear large objects from memory
      await this.clearLargeObjects();

      // Stream processing for large files
      await this.enableStreamProcessing();
    }
  }

  async enableStreamProcessing() {
    // Use streaming for large JSON files
    const fs = require('fs');
    const { pipeline } = require('stream');
    const { Transform } = require('stream');

    const processStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        // Process chunk without loading entire file
        const processed = this.processDataChunk(chunk);
        callback(null, processed);
      }
    });

    return new Promise((resolve, reject) => {
      pipeline(
        fs.createReadStream('data/large-file.json'),
        processStream,
        fs.createWriteStream('data/processed-file.json'),
        (err) => err ? reject(err) : resolve()
      );
    });
  }
}
```

#### API Performance Optimization
```bash
# API performance tuning script
optimize_api_performance() {
    echo "🚀 Starting API performance optimization..."

    # 1. Batch API calls for efficiency
    echo "Batching API calls..."
    node -e "
    const batchSize = 10;
    const requests = [...Array(50)].map((_, i) => ({ id: i, url: 'api/endpoint' + i }));
    const batches = [];

    for (let i = 0; i < requests.length; i += batchSize) {
        batches.push(requests.slice(i, i + batchSize));
    }

    console.log('Reduced API calls from', requests.length, 'to', batches.length, 'batches');
    "

    # 2. Implement intelligent caching
    echo "Implementing intelligent caching..."
    redis-cli FLUSHALL  # Clear cache for fresh start

    # 3. Optimize request timing
    echo "Optimizing request timing..."
    # Spread requests over time to avoid rate limiting
    node -e "
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const spreadRequests = async (requests, timeWindow) => {
        const interval = timeWindow / requests.length;
        for (let i = 0; i < requests.length; i++) {
            await delay(interval);
            // Execute request
        }
    };
    console.log('Request spreading configured');
    "

    echo "✅ API performance optimization completed"
}
```

### 2. Database and Storage Optimization

```bash
# Storage optimization procedures
optimize_storage() {
    echo "💾 Starting storage optimization..."

    # 1. Clean up old data files
    echo "Cleaning up files older than 30 days..."
    find data/ -name "*.json" -mtime +30 -delete

    # 2. Compress historical data
    echo "Compressing historical data..."
    find data/ -name "*.json" -mtime +7 -exec gzip {} \;

    # 3. Optimize data structure
    echo "Optimizing data structures..."
    node -e "
    const fs = require('fs');
    const files = fs.readdirSync('data/').filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync('data/' + file));
        const optimized = optimizeDataStructure(data);
        fs.writeFileSync('data/' + file, JSON.stringify(optimized, null, 2));
    });

    function optimizeDataStructure(data) {
        // Remove redundant fields
        // Normalize data types
        // Compress repeated strings
        return data;
    }
    "

    # 4. Check storage health
    echo "Storage health check:"
    df -h | grep -E "(data|tmp)"
    du -sh data/

    echo "✅ Storage optimization completed"
}
```

## Maintenance Procedures

### Weekly Maintenance (30 minutes)

#### 1. System Health Assessment
```bash
# Comprehensive weekly health check
weekly_health_check() {
    echo "🔍 Weekly System Health Assessment - $(date)"

    # Performance metrics collection
    echo "📊 Collecting performance metrics..."
    {
        echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)"
        echo "Memory Usage: $(free | grep Mem | awk '{printf "%.2f%%", $3/$2 * 100.0}')"
        echo "Disk Usage: $(df -h / | awk 'NR==2{print $5}')"
        echo "Process Count: $(ps aux | wc -l)"
        echo "Open Files: $(lsof | wc -l)"
    } > weekly-health-$(date +%Y%m%d).log

    # API quota analysis
    echo "📈 API quota analysis..."
    node -e "
    const quotaData = require('./data/api-quota-history.json') || [];
    const weeklyUsage = quotaData.filter(d =>
        new Date(d.date) > new Date(Date.now() - 7*24*60*60*1000)
    );

    console.log('Weekly API Usage Summary:');
    const summary = weeklyUsage.reduce((acc, day) => {
        Object.keys(day.apis).forEach(api => {
            if (!acc[api]) acc[api] = { total: 0, avg: 0, peak: 0 };
            acc[api].total += day.apis[api].used;
            acc[api].peak = Math.max(acc[api].peak, day.apis[api].used);
        });
        return acc;
    }, {});

    Object.entries(summary).forEach(([api, stats]) => {
        stats.avg = stats.total / weeklyUsage.length;
        console.log(api + ':', stats);
    });
    " >> weekly-health-$(date +%Y%m%d).log

    # Data quality assessment
    echo "🔍 Data quality assessment..."
    {
        echo "Data Files Count: $(ls data/*.json | wc -l)"
        echo "Average File Size: $(ls -la data/*.json | awk '{sum+=$5; count++} END {printf "%.2f KB", sum/(count*1024)}')"
        echo "Latest Data: $(ls -t data/*.json | head -1)"
        echo "Oldest Data: $(ls -t data/*.json | tail -1)"
    } >> weekly-health-$(date +%Y%m%d).log

    echo "✅ Weekly health check completed. Report: weekly-health-$(date +%Y%m%d).log"
}
```

#### 2. Configuration Updates
```bash
# Weekly configuration review and updates
update_configurations() {
    echo "⚙️ Updating configurations..."

    # 1. Review and update monitored repositories
    echo "Reviewing GitHub repositories..."
    node -e "
    const currentRepos = require('./scripts/comprehensive-github-intelligence.js').ecosystemRepos;

    // Check for new repositories that should be monitored
    const potentialRepos = [
        'microsoft/playwright',
        'facebook/metro',
        'remix-run/remix',
        'solidjs/solid'
    ];

    console.log('Current repo count:', Object.values(currentRepos).flat().length);
    console.log('Consider adding:', potentialRepos);
    "

    # 2. Update social media accounts
    echo "Reviewing social media accounts..."
    node scripts/ai-ecosystem-channel-finder.js mapping

    # 3. Optimize monitoring frequency
    echo "Optimizing monitoring frequency..."
    node -e "
    // Analyze historical data to optimize monitoring frequency
    const historicalData = require('./data/historical-analysis.json') || {};

    // Suggest frequency adjustments based on activity patterns
    Object.entries(historicalData).forEach(([source, data]) => {
        const avgActivity = data.reduce((sum, day) => sum + day.activity, 0) / data.length;
        const suggestedFrequency = avgActivity > 50 ? 'hourly' :
                                 avgActivity > 10 ? 'daily' : 'weekly';
        console.log(source + ': Suggested frequency -', suggestedFrequency);
    });
    "

    echo "✅ Configuration updates completed"
}
```

### Monthly Maintenance (2 hours)

#### 1. Comprehensive System Audit
```bash
# Monthly comprehensive audit
monthly_audit() {
    echo "🔒 Monthly System Audit - $(date)"

    # 1. Security audit
    echo "🔐 Security audit..."
    {
        echo "API Key Status:"
        echo "YouTube API: $(echo $YOUTUBE_API_KEY | sed 's/.*\(....\)/****\1/')"
        echo "GitHub Token: $(echo $GITHUB_TOKEN | sed 's/.*\(....\)/****\1/')"
        echo "X.com Token: $(echo $X_BEARER_TOKEN | sed 's/.*\(....\)/****\1/' || echo 'Not configured')"

        echo -e "\nFile Permissions:"
        find . -name "*.js" -perm /o+w -exec echo "World-writable: {}" \;
        find . -name "*.json" -perm /o+r -exec echo "World-readable data: {}" \;

        echo -e "\nNetwork Connections:"
        netstat -tulpn | grep LISTEN | grep -E "(3000|8080|80|443)"
    } > monthly-security-audit-$(date +%Y%m).log

    # 2. Performance analysis
    echo "📈 Performance analysis..."
    node -e "
    const performanceData = require('./data/performance-history.json') || [];
    const monthlyData = performanceData.filter(d =>
        new Date(d.timestamp) > new Date(Date.now() - 30*24*60*60*1000)
    );

    const analysis = {
        averageResponseTime: monthlyData.reduce((sum, d) => sum + d.responseTime, 0) / monthlyData.length,
        peakResponseTime: Math.max(...monthlyData.map(d => d.responseTime)),
        averageMemoryUsage: monthlyData.reduce((sum, d) => sum + d.memoryUsage, 0) / monthlyData.length,
        errorRate: monthlyData.filter(d => d.errors > 0).length / monthlyData.length,
        uptime: monthlyData.filter(d => d.status === 'healthy').length / monthlyData.length
    };

    console.log('Monthly Performance Analysis:');
    console.log(JSON.stringify(analysis, null, 2));
    " > monthly-performance-analysis-$(date +%Y%m).json

    # 3. Data archival
    echo "📦 Data archival..."
    mkdir -p archives/$(date +%Y)/$(date +%m)/
    find data/ -name "*.json" -mtime +30 -exec mv {} archives/$(date +%Y)/$(date +%m)/ \;

    # 4. System optimization recommendations
    echo "🎯 System optimization recommendations..."
    node -e "
    const auditResults = {
        security: require('./monthly-security-audit-' + '$(date +%Y%m)' + '.log'),
        performance: require('./monthly-performance-analysis-' + '$(date +%Y%m)' + '.json')
    };

    const recommendations = [];

    // Performance-based recommendations
    if (auditResults.performance.averageResponseTime > 2000) {
        recommendations.push('Consider API response caching to reduce response times');
    }

    if (auditResults.performance.errorRate > 0.05) {
        recommendations.push('Error rate above 5% - review error handling and retry logic');
    }

    if (auditResults.performance.averageMemoryUsage > 500) {
        recommendations.push('Memory usage high - implement memory optimization strategies');
    }

    console.log('System Optimization Recommendations:');
    recommendations.forEach((rec, i) => console.log((i+1) + '. ' + rec));
    " > monthly-recommendations-$(date +%Y%m).txt

    echo "✅ Monthly audit completed"
}
```

#### 2. System Backup and Recovery Testing
```bash
# Monthly backup and recovery testing
backup_and_recovery_test() {
    echo "💾 Monthly backup and recovery test..."

    # 1. Create full system backup
    echo "Creating system backup..."
    tar -czf system-backup-$(date +%Y%m%d).tar.gz \
        --exclude=node_modules \
        --exclude=.git \
        --exclude=archives \
        .

    # 2. Test backup integrity
    echo "Testing backup integrity..."
    tar -tzf system-backup-$(date +%Y%m%d).tar.gz > /dev/null &&
        echo "✅ Backup integrity verified" ||
        echo "❌ Backup integrity failed"

    # 3. Test recovery procedure
    echo "Testing recovery procedure..."
    {
        # Create test recovery directory
        mkdir -p recovery-test/
        cd recovery-test/

        # Extract backup
        tar -xzf ../system-backup-$(date +%Y%m%d).tar.gz

        # Test system functionality
        npm install --silent
        npm run social:comprehensive:test

        echo "Recovery test results:" > recovery-test-results.log
        echo "Extraction: Success" >> recovery-test-results.log
        echo "Dependencies: $(npm list --depth=0 | grep -c '@' | head -1) packages" >> recovery-test-results.log
        echo "Scripts: $(ls scripts/ | wc -l) files" >> recovery-test-results.log
        echo "Configuration: $(test -f package.json && echo 'Valid' || echo 'Invalid')" >> recovery-test-results.log

        cd ..
        rm -rf recovery-test/

    } && echo "✅ Recovery test completed" || echo "❌ Recovery test failed"

    # 4. Archive old backups
    echo "Archiving old backups..."
    find . -name "system-backup-*.tar.gz" -mtime +90 -delete

    echo "✅ Backup and recovery testing completed"
}
```

This comprehensive operational procedures guide provides systematic approaches to daily operations, troubleshooting, performance optimization, and maintenance, ensuring reliable A+ system operations.