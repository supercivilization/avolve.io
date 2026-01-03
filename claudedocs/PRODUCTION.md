# Production Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`yarn test && yarn test:e2e`)
- [ ] Type checking clean on YOUR code (`yarn typecheck`)
- [ ] Linting clean (`yarn lint`)
- [ ] Build succeeds (`yarn build && yarn web:prod`)
- [ ] No console errors in production build
- [ ] Security audit reviewed (`yarn npm audit`)

### Environment Setup
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Supabase production project created
- [ ] OAuth credentials configured (Google, etc.)
- [ ] API rate limits configured
- [ ] CDN/Image optimization configured

### Monitoring
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics (Vercel) installed
- [ ] Uptime monitoring active
- [ ] Alert rules configured
- [ ] Health check endpoint working

## Vercel Deployment (Web)

### Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
cd ~/dev/active/takeout/apps/next
vercel link

# Set Node.js version
echo "22" > .nvmrc

# Configure build settings
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_AUTH_JWT_SECRET
```

### Build Configuration

**vercel.json** (already in apps/next):
```json
{
  "buildCommand": "cd ../.. && yarn build && cd apps/next && yarn next:build",
  "framework": "nextjs",
  "installCommand": "yarn install",
  "env": {
    "NODE_VERSION": "22"
  }
}
```

### Environment Variables

**Required**:
- `NEXT_PUBLIC_SUPABASE_URL` - Production Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Production anon key
- `SUPABASE_AUTH_JWT_SECRET` - JWT secret from Supabase

**Optional**:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `SENTRY_AUTH_TOKEN` - Sentry upload token

### Deploy

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## Supabase Production

### Create Production Project

1. Go to https://supabase.com/dashboard
2. Create new project
3. Choose region closest to users
4. Set strong database password (save in password manager)

### Configure Database

```bash
# Apply migrations
cd ~/dev/active/takeout
supabase link --project-ref your-project-ref
supabase db push
```

### Set Up RLS Policies

Already configured in `supabase/migrations/`. Verify:

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- All tables should have rowsecurity = true
```

### Configure Auth

1. **Email Templates**: Customize in Supabase Dashboard → Authentication → Email Templates
2. **OAuth Providers**: Configure Google OAuth in Dashboard → Authentication → Providers
3. **Site URL**: Set to your Vercel production URL
4. **Redirect URLs**: Add all allowed redirect URLs

### Backup Strategy

```bash
# Daily automated backups (Supabase Pro)
# Or manual backups:
pg_dump postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres > backup.sql
```

## EAS Build (Mobile)

### Setup

```bash
cd ~/dev/active/takeout/apps/expo

# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure
```

### Build Profiles

**eas.json**:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "env": {
        "NODE_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Environment Variables

Create `apps/expo/.env.production`:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Build & Submit

```bash
# iOS Production
eas build --platform ios --profile production
eas submit --platform ios

# Android Production
eas build --platform android --profile production
eas submit --platform android
```

## Performance Optimization

### Next.js Optimizations

**Already Configured**:
- ✅ Turbopack bundler
- ✅ Image optimization (unoptimized for now)
- ✅ React 19 server components
- ✅ Automatic code splitting

**To Add**:
```javascript
// next.config.js
{
  images: {
    unoptimized: false, // Enable for production
    domains: ['ui-avatars.com', 'your-domain.supabase.co'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
}
```

### Database Optimizations

**Indexes** (add to migrations):
```sql
-- Index frequently queried columns
CREATE INDEX idx_profiles_user_id ON profiles(id);
CREATE INDEX idx_events_user_id ON events(profile_id);
CREATE INDEX idx_events_created_at ON events(created_at DESC);
```

**Connection Pooling**:
```typescript
// Use Supabase connection pooler
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  .replace('https://', 'postgresql://postgres:')
  .replace('.supabase.co', '.pooler.supabase.com:6543/postgres')
```

## Security Hardening

### Headers

**next.config.js**:
```javascript
{
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

### Rate Limiting

Use Upstash Redis:
```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  return success
    ? NextResponse.next()
    : NextResponse.json({ error: "Too many requests" }, { status: 429 })
}
```

## Monitoring & Alerts

See [MONITORING.md](./MONITORING.md) for full setup.

**Quick Setup**:
1. Sentry for error tracking
2. Vercel Analytics for performance
3. Better Uptime for availability
4. Supabase Dashboard for database metrics

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### Supabase

```bash
# Revert last migration
supabase db reset

# Or restore from backup
psql < backup.sql
```

### Mobile Apps

- iOS: Submit new build with previous version
- Android: Rollback in Google Play Console

## Post-Deployment

### Verification
- [ ] Health check returns 200
- [ ] Authentication flow works
- [ ] Database queries succeed
- [ ] Static assets load
- [ ] Mobile apps connect to production
- [ ] Error monitoring receiving data

### Performance Baseline
- [ ] Lighthouse score > 90
- [ ] Time to First Byte < 200ms
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Team Communication
- [ ] Deployment announced in team channel
- [ ] Changelog updated
- [ ] Documentation updated
- [ ] Stakeholders notified

## Troubleshooting

### Build Failures

**TypeScript errors**:
- Expected: ~750 errors in Bento UI (third-party)
- Check: Are there NEW errors in YOUR code?

**Memory issues**:
```json
// vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "memory": 3008
    }
  }
}
```

### Runtime Errors

**Database connection issues**:
- Check RLS policies
- Verify environment variables
- Check connection pooler limits

**Authentication failures**:
- Verify JWT secret matches
- Check OAuth redirect URLs
- Verify site URL in Supabase

## Cost Estimation

### Expected Monthly Costs

| Service | Usage | Cost |
|---------|-------|------|
| Vercel Pro | 1 project | $20 |
| Supabase Pro | 8GB database | $25 |
| EAS Builds | 5 builds/month | $0 (Free tier) |
| Sentry | Developer | $26 |
| Total | | **~$71/month** |

### Free Tier Option

- Vercel Hobby: Free
- Supabase Free: Free (limited)
- EAS Free: Free (limited builds)
- Total: **$0/month** (not recommended for production)

## Support & Resources

- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Expo/EAS**: https://docs.expo.dev
- **Next.js**: https://nextjs.org/docs
- **Tamagui**: https://tamagui.dev

---

**Last Updated**: November 2025
**Template Version**: 1.0.0
