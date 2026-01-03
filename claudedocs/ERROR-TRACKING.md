# Error Tracking System

Native error tracking implementation using Next.js, TypeScript, Supabase, and Resend.

**Zero additional cost** - Uses your existing infrastructure!

## Features

✅ **Frontend Error Capture** - JavaScript errors, unhandled promises
✅ **Backend Error Capture** - API route errors, server-side exceptions
✅ **User Tracking** - Links errors to authenticated users
✅ **Stack Traces** - Full error stack for debugging
✅ **Admin Dashboard** - View and resolve errors at `/admin/errors`
✅ **Email Alerts** - Optional notifications via Resend
✅ **Metadata** - Custom context with each error

## Quick Start

### 1. Apply Database Migration

```bash
# Apply the errors table migration (already done if you ran setup)
supabase db reset

# Or for production
supabase db push
```

This creates the `errors` table with proper RLS policies.

### 2. Error Tracking Provider (Already Integrated!)

The `ErrorTrackingProvider` is already integrated into `packages/app/provider/index.tsx` and wraps your entire app automatically through `pages/_app.tsx`.

**That's it!** Errors are automatically tracked. No additional setup needed.

### 3. View Errors (Optional)

Navigate to `/admin/errors` to see recent errors.

### 4. Enable Email Alerts (Optional)

Add to `.env`:

```bash
RESEND_API_KEY=re_...
ERROR_ALERT_EMAIL=you@yourdomain.com
ERROR_ALERT_FROM_EMAIL=errors@yourdomain.com  # Optional
NEXT_PUBLIC_APP_URL=https://yourdomain.com    # For email links
```

Then update error logging to send alerts for critical errors.

## Usage Examples

### Frontend Error Tracking (Automatic)

Once `ErrorTrackingProvider` is added, all errors are automatically captured:

```typescript
// These will be automatically logged:
throw new Error('Something went wrong!')
Promise.reject('Unhandled promise')
// JavaScript errors, network errors, etc.
```

### Manual Error Logging (Client-Side - Pages Router)

```typescript
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { logError } from 'app/lib/error-tracking'

export function MyComponent() {
  const supabase = useSupabase()

  const handleAction = async () => {
    try {
      // Your code
    } catch (error) {
      // Manually log error with custom metadata
      await logError(supabase, {
        message: error.message,
        stack: error.stack,
        errorType: 'PaymentError',
        metadata: {
          paymentId: '123',
          amount: 99.99,
        },
      })

      // Show user-friendly message
      alert('Payment failed. Please try again.')
    }
  }
}
```

### Server-Side Error Handling

**Option 1: Automatic with Wrapper**

```typescript
// app/api/example/route.ts
import { createServerClient } from 'app/utils/supabase/server'
import { withErrorTracking } from 'app/lib/server-error-handler'

export const POST = withErrorTracking(async (req: Request) => {
  const supabase = createServerClient()

  // Your logic - errors are automatically caught and logged
  const data = await someOperation()

  return Response.json({ data })
}, createServerClient())
```

**Option 2: Manual Handling**

```typescript
// app/api/example/route.ts
import { createServerClient } from 'app/utils/supabase/server'
import { handleServerError } from 'app/lib/server-error-handler'

export async function POST(req: Request) {
  const supabase = createServerClient()

  try {
    // Your logic
    const data = await someOperation()
    return Response.json({ data })
  } catch (error) {
    return handleServerError(supabase, error, {
      route: '/api/example',
      method: 'POST',
    })
  }
}
```

### Email Alerts for Critical Errors (Server-Side Only)

```typescript
import { createServerClient } from 'app/utils/supabase/server'
import { logError } from 'app/lib/error-tracking'
import { sendErrorAlert, shouldAlertError } from 'app/lib/error-alerts'

// In an API route or server action
async function handleCriticalError(error: Error) {
  const supabase = createServerClient()

  // Log to database
  await logError(supabase, {
    message: error.message,
    stack: error.stack,
    errorType: error.name,
  })

  // Send email alert if critical (server-side only)
  if (shouldAlertError({ message: error.message, errorType: error.name })) {
    await sendErrorAlert({
      message: error.message,
      stack: error.stack,
      errorType: error.name,
      timestamp: new Date().toISOString(),
    })
  }
}
```

## Admin Dashboard

Access the error dashboard at `/admin/errors` to:

- View recent unresolved errors
- See full stack traces
- Check user impact (which users affected)
- Resolve errors once fixed
- View custom metadata

**Note**: Update the RLS policies in the migration to define who has admin access.

## Database Schema

```sql
create table errors (
  id uuid primary key,
  message text not null,
  stack text,
  error_type text,
  url text,
  route text,
  method text,
  user_agent text,
  user_id uuid references auth.users,
  session_id text,
  environment text,
  deployment_id text,
  metadata jsonb,
  resolved boolean default false,
  resolved_at timestamp,
  resolved_by uuid references auth.users,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

## Environment Variables

```bash
# Required (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Optional - Email Alerts
RESEND_API_KEY=re_...
ERROR_ALERT_EMAIL=you@yourdomain.com
ERROR_ALERT_FROM_EMAIL=errors@yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Cleanup Old Errors

```sql
-- Run periodically to clean up resolved errors older than 90 days
select cleanup_old_errors(90);
```

Or set up a Supabase cron job:

```sql
select cron.schedule(
  'cleanup-old-errors',
  '0 2 * * 0',  -- Every Sunday at 2 AM
  $$ select cleanup_old_errors(90); $$
);
```

## Comparison vs Sentry

| Feature | Native (This) | Sentry |
|---------|---------------|--------|
| Error capturing | ✅ | ✅ |
| Stack traces | ✅ | ✅ |
| User tracking | ✅ | ✅ |
| Email alerts | ✅ | ✅ |
| Source maps | ❌ | ✅ |
| Error grouping | ❌ | ✅ |
| Release tracking | ❌ | ✅ |
| Performance monitoring | ❌ | ✅ |
| Breadcrumbs | ❌ | ✅ |
| Cost | **$0** | $26/month |

## When to Upgrade to Sentry

Consider Sentry when:
- You're getting >20 errors/day
- You need source maps (see TypeScript, not compiled JS)
- You want automatic error grouping
- Performance monitoring is important
- Your time debugging is worth >$26/month

## Troubleshooting

### Errors not appearing in dashboard

1. Check RLS policies - ensure your user has access
2. Verify ErrorTrackingProvider is added to layout
3. Check browser console for logging failures
4. Verify Supabase connection is working

### Email alerts not sending

1. Verify `RESEND_API_KEY` is set
2. Verify `ERROR_ALERT_EMAIL` is set
3. Check `shouldAlertError()` logic
4. Check server logs for email sending errors

### Stack traces are missing

- Client-side errors always have stack traces
- Server-side errors may not if caught as strings
- Always throw/catch proper `Error` objects, not strings

## Files Reference

```
packages/app/
├── lib/
│   ├── error-tracking.ts         # Core error logging utilities
│   ├── server-error-handler.ts   # Server-side error handling
│   └── error-alerts.ts            # Email alert integration
└── provider/
    └── error-tracking-provider.tsx  # Frontend error boundary

apps/next/
└── app/
    └── admin/
        └── errors/
            └── page.tsx           # Admin dashboard

supabase/migrations/
└── 20251112000000_create_errors_table.sql  # Database schema
```

---

**Last Updated**: November 2025
**Cost**: $0 (uses existing infrastructure)
