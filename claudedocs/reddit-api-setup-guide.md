# Reddit API Setup Guide for Social Listening

**Quick Setup Guide for Reddit MCP Integration**
*Implementation Date: September 24, 2025*

---

## Overview

This guide helps you obtain Reddit API credentials to enable both the Reddit MCP server integration and the direct Reddit monitoring script for social listening.

## Prerequisites

- Reddit account (free)
- Access to `/dev/active/avolve/.env.local`
- MCP configuration already includes Reddit server

## Step 1: Create Reddit App

1. **Visit Reddit App Preferences**
   ```
   https://www.reddit.com/prefs/apps
   ```

2. **Click "Create App" or "Create Another App"**

3. **Fill out the form:**
   ```
   Name: Avolve Social Listening
   App type: ☑️ script
   Description: Social listening for modern tech stack monitoring
   About URL: (leave empty)
   Redirect URL: (leave empty for script type)
   ```

4. **Click "Create app"**

## Step 2: Get Credentials

After creating the app, you'll see:

```
Avolve Social Listening
personal use script by [your username]
[random string of characters] ← This is your CLIENT_ID
secret: [another random string] ← This is your CLIENT_SECRET
```

## Step 3: Update Environment Variables

Edit `/dev/active/avolve/.env.local`:

```bash
# Reddit API Configuration (Required for MCP and social listening)
# Get credentials from https://www.reddit.com/prefs/apps
REDDIT_CLIENT_ID=your_actual_client_id_from_step2
REDDIT_CLIENT_SECRET=your_actual_client_secret_from_step2
REDDIT_USER_AGENT=Avolve Social Listening v1.0
```

**Replace the placeholder values with actual credentials from Step 2.**

## Step 4: Test Integration

### Test Direct Reddit Monitoring Script

```bash
cd /Users/avolve/dev/active/avolve
node scripts/reddit-monitoring.js test
```

**Expected Output:**
```
🔍 Testing Reddit API connection...
✅ Reddit API connection successful!
📊 Sample data retrieved from r/nextjs
```

### Test Reddit MCP Server

The Reddit MCP server should now work with Claude Code. Try asking:
- "What are the top posts on r/nextjs today?"
- "Search Reddit for Next.js 15 discussions"
- "Monitor r/webdev for React 19 mentions"

## Step 5: Verify MCP Configuration

The MCP configuration should already include:

```json
"reddit": {
  "command": "reddit-mcp-server",
  "args": [],
  "env": {
    "REDDIT_CLIENT_ID": "$REDDIT_CLIENT_ID",
    "REDDIT_CLIENT_SECRET": "$REDDIT_CLIENT_SECRET",
    "REDDIT_USER_AGENT": "Avolve Social Listening v1.0"
  },
  "description": "Reddit API integration for developer community monitoring and social listening"
}
```

## Usage Examples

### Direct Script Usage

```bash
# Test connection
node scripts/reddit-monitoring.js test

# Full monitoring run
node scripts/reddit-monitoring.js monitor

# Monitor specific subreddit
node scripts/reddit-monitoring.js subreddit reactjs

# Search for specific terms
node scripts/reddit-monitoring.js search "Next.js 15"
```

### MCP Integration Usage

With Claude Code, you can now:

1. **Monitor Communities**:
   - "Check r/nextjs for discussions about version 15"
   - "What's trending in r/webdev related to React?"

2. **Search Content**:
   - "Search Reddit for Tailwind CSS v4 discussions"
   - "Find posts about TypeScript 5.9 performance"

3. **Social Listening**:
   - "Monitor developer sentiment about Supabase"
   - "Track security discussions in programming subreddits"

## API Limits & Best Practices

### Reddit API Limits (Free Tier)
- **100 requests per minute** (6,000/hour, 144,000/day)
- **Personal use script**: Sufficient for comprehensive monitoring
- **Rate limiting**: Automatically handled in scripts

### Best Practices
1. **Respect Rate Limits**: Scripts include automatic rate limiting
2. **Meaningful User Agent**: Already configured properly
3. **Target High-Value Communities**: Focus on r/webdev, r/nextjs, r/reactjs, etc.
4. **Filter for Relevance**: Scripts automatically score content relevance

## Troubleshooting

### Common Issues

**❌ "Reddit API credentials not found"**
- Solution: Check that REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET are set in .env.local

**❌ "HTTP 401: Unauthorized"**
- Solution: Verify credentials are correct and app type is "script"

**❌ "HTTP 429: Too Many Requests"**
- Solution: Wait 1 minute, rate limiting will reset

**❌ MCP server not responding**
- Solution: Restart Claude Code to reload MCP configuration

### Verification Commands

```bash
# Check environment variables are loaded
echo $REDDIT_CLIENT_ID
echo $REDDIT_CLIENT_SECRET

# Test Reddit monitoring
node scripts/reddit-monitoring.js test

# Check MCP server status
reddit-mcp-server --version
```

## Integration Benefits

### Free Social Listening Capabilities
- **144,000 requests/day**: Sufficient for comprehensive monitoring
- **Real-time Community Insights**: Developer discussions and trends
- **Framework Sentiment Analysis**: Track React, Next.js, TypeScript discussions
- **Security Monitoring**: Early detection of vulnerabilities and issues

### Cost Efficiency
- **$0/month**: Free tier sufficient for current needs
- **No Third-party Costs**: Direct API integration vs paid services
- **High Data Quality**: Developer-focused communities with high signal-to-noise

## Next Steps

After completing setup:

1. **Run Full Monitoring**: `node scripts/reddit-monitoring.js monitor`
2. **Integrate with Social Listening System**: Add Reddit data to comprehensive pipeline
3. **Configure Automated Runs**: Set up scheduled monitoring for continuous insights
4. **Test MCP Integration**: Use Reddit capabilities directly in Claude Code

---

*This completes the Reddit API integration, adding free social listening capabilities to your modern tech stack monitoring system.*