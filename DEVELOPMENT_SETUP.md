# Avolve AI-Native Platform - Secure Development Setup

This guide will help you set up a secure development environment for the Avolve AI-Native Platform, ensuring Claude Code can function properly while maintaining security best practices.

## 🔒 Security-First Development Environment

### Quick Setup (5 minutes)

1. **Copy environment template**:
   ```bash
   cp .env.local.template .env.local
   ```

2. **Configure your development keys** (see [API Keys Setup](#api-keys-setup) below)

3. **Validate environment**:
   ```bash
   npm run env:validate
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

---

## 📋 Required Setup

### 1. Environment Configuration

Your `.env.local` file should contain:

```bash
# Core development (required)
NODE_ENV=development
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# For Claude Code functionality (replace with your keys)
GITHUB_TOKEN=your-github-dev-token-here
YOUTUBE_API_KEY=your-youtube-api-key-here
```

**🚨 IMPORTANT**: The Supabase keys above are safe development defaults. Never use production keys in development.

### 2. API Keys Setup

#### GitHub Token (Required for Claude Code)
1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Set description: "Avolve Development - Claude Code"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `user` (Read user profile data)
   - ✅ `workflow` (Update GitHub Actions workflows)
5. Copy token and add to `.env.local`:
   ```bash
   GITHUB_TOKEN=ghp_your_new_token_here
   ```

#### YouTube API Key (Required for social listening)
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Enable "YouTube Data API v3"
3. Create credentials → API Key
4. Copy key and add to `.env.local`:
   ```bash
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

#### AI Provider Keys (Optional but recommended)
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
- **Google AI**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## 🛠️ Development Commands

### Environment Management
```bash
# Validate your environment setup
npm run env:validate

# Check which Claude Code features are available
npm run env:features

# Clean any remaining hardcoded secrets (security)
npm run security:clean
```

### Core Development
```bash
# Start development server
npm run dev

# Build the project
npm run build

# Run tests
npm run test

# Type checking
npm run type-check
```

### Claude Code Features
```bash
# GitHub repository intelligence
npm run github:intelligence

# Social listening (YouTube, Reddit, GitHub)
npm run social:all

# AI-powered insights
npm run ai:insights

# Generate content with AI
npm run insight:create
```

### Security & Maintenance
```bash
# Security audit
npm run audit:security

# Performance audit
npm run audit:performance

# Clean and reinstall dependencies
npm run reset
```

---

## 🎯 Claude Code Integration

Once your environment is configured, Claude Code can use these features:

### ✅ **Available with GitHub Token**
- Repository health monitoring
- Issue and PR management
- Code intelligence and analysis
- Automated repository insights

### ✅ **Available with YouTube API**
- Social media listening
- Content trend analysis
- AI ecosystem monitoring
- YouTube channel verification

### ⚠️ **Limited without AI Keys**
- AI code reviews require OpenAI/Anthropic keys
- Content generation requires AI provider access
- Advanced insights need multiple AI models

---

## 🔒 Security Best Practices

### Environment Security
- ✅ `.env.local` is git-ignored and never committed
- ✅ Use development-only API keys with minimal permissions
- ✅ Rotate keys regularly (every 90 days)
- ✅ Never share keys in documentation or messages

### Development Security
- ✅ All secrets removed from source code
- ✅ Environment validation prevents placeholder values
- ✅ Security cleaning script available
- ✅ Git hooks prevent accidental commits of secrets

### Production Security
- 🚨 **Never use development keys in production**
- 🚨 **Always use environment variables in deployment**
- 🚨 **Validate environment in CI/CD pipelines**

---

## 🏗️ Project Structure

```
avolve/
├── .env.local.template     # Environment template (commit this)
├── .env.local              # Your actual keys (never commit)
├── .gitignore              # Protects secrets from being committed
├── scripts/
│   ├── validate-environment.js    # Environment validation
│   ├── clean-hardcoded-secrets.js # Security cleanup
│   └── ...                # Claude Code integration scripts
├── apps/
│   └── web/               # Next.js application
├── packages/
│   └── ui/                # Shared UI components
└── DEVELOPMENT_SETUP.md   # This guide
```

---

## 🚨 Troubleshooting

### Environment Validation Fails
```bash
# Check what's missing
npm run env:validate

# See available features
npm run env:features

# Common issues:
# 1. .env.local doesn't exist → copy from template
# 2. Placeholder values → replace with real keys
# 3. Wrong key format → check API documentation
```

### GitHub Token Issues
```bash
# Test your GitHub token
npm run github:test-token

# Common issues:
# 1. Token expired → regenerate at github.com/settings/tokens
# 2. Wrong permissions → ensure 'repo' and 'user' scopes
# 3. Rate limit → wait for reset or use different token
```

### YouTube API Issues
```bash
# Test YouTube API
npm run youtube:test

# Common issues:
# 1. API not enabled → enable in Google Cloud Console
# 2. Quota exceeded → check usage or request increase
# 3. Wrong API key → regenerate in Google Cloud Console
```

### Security Cleanup
```bash
# Remove any remaining hardcoded secrets
npm run security:clean

# This script will:
# 1. Find hardcoded API keys in files
# 2. Replace with environment variable references
# 3. Report what was cleaned
```

---

## 📚 Additional Resources

### Documentation
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Local Development](https://supabase.com/docs/guides/getting-started/local-development)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [YouTube Data API](https://developers.google.com/youtube/v3)

### Security Resources
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)

---

## 🆘 Need Help?

### Quick Diagnostics
```bash
# Full environment check
npm run env:validate

# Feature availability
npm run env:features

# Security status
npm run security:clean
```

### Common Commands
```bash
# Reset everything if stuck
npm run clean && cp .env.local.template .env.local

# Start fresh development
npm run reset && npm run env:validate && npm run dev
```

**Environment Status**: Run `npm run env:validate` to see your current setup status and any required actions.

---

*Last updated: September 24, 2025*
*This guide ensures Claude Code can function properly while maintaining security best practices.*