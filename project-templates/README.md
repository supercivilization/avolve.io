---
title: "Project Templates - AI-Native Stack Starters"
technology: "project_templates"
version: "2025.1"
status: "current"
confidence: "high"
last_updated: "2025-09-21"
next_review: "2025-12-21"
document_type: "templates_guide"
purpose: "Ready-to-use templates for starting new AI-native projects"
audience:
  all: "sections: [templates, initialization, configuration]"
ai_optimized: true
---

# 🚀 Project Templates - AI-Native Stack Starters

**Purpose**: Production-ready templates for starting new projects with the optimal AI-native stack
**Focus**: Zero-to-deployed in under 30 minutes
**Last Updated**: September 21, 2025

---

## 🎯 Template Categories

### 1. AI-First Web Application
**Perfect for**: Chatbots, AI assistants, content generation, smart dashboards
**Stack**: Next.js 15.5 + Vercel AI SDK 5.0.48 + Supabase + TypeScript
**Deploy time**: 15 minutes

```bash
# Quick start command
npx create-next-app@latest my-ai-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-ai-app

# Add AI capabilities
npm install ai @ai-sdk/openai @ai-sdk/anthropic @supabase/supabase-js

# Initialize with our optimized configuration
curl -sSL https://raw.githubusercontent.com/avolve-dao/modern-tech-stack/main/project-templates/ai-web-app/setup.sh | bash
```

**Includes**:
- ✅ AI SDK with streaming chat interface
- ✅ Supabase database with vector search
- ✅ Authentication with social providers
- ✅ Responsive UI with shadcn/ui components
- ✅ TypeScript configuration optimized for AI
- ✅ Deployment ready for Vercel

---

### 2. Full-Stack SaaS Platform
**Perfect for**: Business applications, dashboards, multi-tenant SaaS
**Stack**: Next.js 15.5 + Supabase + Stripe + TypeScript
**Deploy time**: 25 minutes

```bash
# SaaS starter
npx create-next-app@latest my-saas \
  --typescript \
  --tailwind \
  --app \
  --src-dir

cd my-saas

# Add SaaS essentials
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge
npm install @hookform/resolvers react-hook-form zod

# Initialize SaaS template
curl -sSL https://raw.githubusercontent.com/avolve-dao/modern-tech-stack/main/project-templates/saas-platform/setup.sh | bash
```

**Includes**:
- ✅ Multi-tenant database architecture
- ✅ Stripe subscription billing
- ✅ Role-based access control
- ✅ Dashboard with analytics
- ✅ Email notifications with Resend
- ✅ Customer support integration

---

### 3. Real-Time Collaborative App
**Perfect for**: Team tools, live editing, multiplayer experiences
**Stack**: Next.js 15.5 + Supabase Realtime + TypeScript
**Deploy time**: 20 minutes

```bash
# Real-time app starter
npx create-next-app@latest my-realtime-app \
  --typescript \
  --tailwind \
  --app

cd my-realtime-app

# Add real-time capabilities
npm install @supabase/supabase-js @supabase/ssr
npm install @types/uuid uuid
npm install zustand immer

# Initialize real-time template
curl -sSL https://raw.githubusercontent.com/avolve-dao/modern-tech-stack/main/project-templates/realtime-app/setup.sh | bash
```

**Includes**:
- ✅ Real-time presence system
- ✅ Live cursor tracking
- ✅ Collaborative editing interface
- ✅ Conflict-free state management
- ✅ Optimistic UI updates
- ✅ Connection status indicators

---

## ⚙️ Template Configurations

### Optimized TypeScript Config
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/app/*": ["./src/app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Next.js Configuration
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable Turbopack for development
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    // Enable Server Actions
    serverActions: true,
    // Enable PPR when stable
    ppr: 'incremental'
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Image optimization
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif']
  }
};

module.exports = nextConfig;
```

### Tailwind Configuration (v4)
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // AI-native design tokens
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // AI-specific colors
        ai: {
          primary: '#10b981',
          secondary: '#6366f1',
          accent: '#f59e0b'
        }
      },
      animation: {
        'ai-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ai-bounce': 'bounce 1s infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
```

---

## 🔧 Development Environment Setup

### Required Tools
```bash
# Node.js 18.17+ or 20.0+ (for native TypeScript support)
node --version  # Should be 18.17+ or 20.0+

# Package manager (npm 9+ recommended)
npm --version   # Should be 9.0+

# Git for version control
git --version

# VS Code extensions (recommended)
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ms-vscode.vscode-json
```

### Environment Variables Template
```bash
# .env.local template
# Copy to .env.local and fill in your values

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Providers
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Payments (if using Stripe)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email (if using Resend)
RESEND_API_KEY=your_resend_key

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

---

## 📦 Package.json Scripts

### Optimized Scripts for AI-Native Development
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "db:generate": "supabase gen types typescript --project-id $PROJECT_ID > src/types/database.types.ts",
    "db:reset": "supabase db reset",
    "db:push": "supabase db push",
    "deploy": "vercel --prod",
    "postbuild": "next-sitemap"
  }
}
```

---

## 🚀 Deployment Configurations

### Vercel Deployment (vercel.json)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Database Migrations (Supabase)
```sql
-- Initial schema for AI-native applications
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  PRIMARY KEY (id)
);

-- AI conversations
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI messages with vector embeddings
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  embedding VECTOR(1536), -- OpenAI ada-002 embedding size
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for messages
CREATE POLICY "Users can view messages in own conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );
```

---

## 📊 Success Metrics & Validation

### Template Quality Indicators
```yaml
deployment_success:
  target_time: "<30 minutes from start to deployed"
  success_rate: ">95% first-time deployments"
  breaking_changes: "<5% after template updates"

developer_experience:
  setup_complexity: "Single command initialization"
  documentation_completeness: "100% features documented"
  type_safety: "Zero TypeScript errors out of box"

performance_benchmarks:
  build_time: "<60s for standard template"
  bundle_size: "<500KB initial load"
  lighthouse_score: ">90 for all metrics"
```

### Validation Checklist
- [ ] **Template deploys successfully** to Vercel
- [ ] **Database migrations** run without errors
- [ ] **Authentication flow** works end-to-end
- [ ] **AI features** respond correctly
- [ ] **TypeScript** compiles without errors
- [ ] **Tests pass** (if included)
- [ ] **Performance meets** targets
- [ ] **Security best practices** implemented

---

## 🔄 Template Maintenance

### Update Schedule
- **Weekly**: Dependency security updates
- **Monthly**: Version bumps for stable releases
- **Quarterly**: Template architecture reviews
- **As needed**: Breaking change adaptations

### Contributing Improvements
```bash
# Fork and improve templates
git clone https://github.com/avolve-dao/modern-tech-stack
cd modern-tech-stack/project-templates

# Test your improvements
npm run template:test

# Submit pull request with validation results
```

---

*Templates are continuously updated to reflect latest best practices and technology improvements. Next review: October 21, 2025*