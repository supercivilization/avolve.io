# Production Monitoring Setup

## Sentry Error Monitoring

### Installation

```bash
# Add Sentry packages
yarn add @sentry/nextjs @sentry/react-native

# For Expo (mobile)
cd apps/expo
npx @sentry/wizard@latest -i reactNative
```

### Next.js Configuration

Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  environment: process.env.NODE_ENV,

  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
})
```

Create `sentry.server.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

Create `sentry.edge.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

### Environment Variables

Add to `.env`:
```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/your-project-id
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

### Next.js Config Integration

Update `apps/next/next.config.js`:
```javascript
const { withSentryConfig } = require('@sentry/nextjs')

// ... existing config

module.exports = withSentryConfig(
  yourNextConfig,
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
)
```

## Performance Monitoring

### Vercel Analytics

```bash
yarn add @vercel/analytics @vercel/speed-insights
```

Add to `apps/next/pages/_app.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

## Uptime Monitoring

### Recommended Services
- **Better Uptime**: https://betteruptime.com (free tier)
- **UptimeRobot**: https://uptimerobot.com (free tier)
- **Checkly**: https://www.checklysq.com (API monitoring)

### Setup Endpoint

Create `apps/next/app/api/health/route.ts`:
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  // Check database connection
  // Check external services
  // Return health status

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
}
```

## Logging

### Recommended: Axiom

```bash
yarn add next-axiom
```

Update `next.config.js`:
```javascript
const { withAxiom } = require('next-axiom')

module.exports = withAxiom({
  // your config
})
```

Add to `pages/_app.tsx`:
```typescript
import { useLogger } from 'next-axiom'

export default function App({ Component, pageProps }) {
  const logger = useLogger()

  useEffect(() => {
    logger.info('App mounted')
  }, [])

  return <Component {...pageProps} />
}
```

## Database Monitoring

### Supabase Monitoring

1. Enable Supabase dashboard alerts
2. Monitor connection pool usage
3. Track slow queries
4. Set up RLS policy violations alerts

### Custom Metrics

Create `apps/next/app/api/metrics/route.ts`:
```typescript
export async function GET() {
  const metrics = {
    activeUsers: await getActiveUserCount(),
    dbConnections: await getDBConnectionCount(),
    apiLatency: await getAverageAPILatency(),
  }

  return Response.json(metrics)
}
```

## Alert Configuration

### Critical Alerts
- Error rate > 1%
- Response time > 3s
- Database connection pool > 80%
- Deployment failures

### Warning Alerts
- Error rate > 0.5%
- Response time > 1s
- Memory usage > 70%

## Production Checklist

- [ ] Sentry configured for Next.js + Expo
- [ ] Vercel Analytics installed
- [ ] Uptime monitoring active
- [ ] Health check endpoint created
- [ ] Database monitoring enabled
- [ ] Alert rules configured
- [ ] Team notifications setup (Slack/Discord)
- [ ] Incident response plan documented
- [ ] On-call rotation defined (if team)

## Cost Optimization

| Service | Free Tier | Recommended Plan |
|---------|-----------|------------------|
| Sentry | 5K errors/month | Developer ($26/mo) |
| Vercel Analytics | Unlimited | Included |
| Better Uptime | 10 monitors | Free |
| Axiom | 500MB/month | Team ($25/mo) |

**Total Monthly Cost**: $51 for production-grade monitoring
