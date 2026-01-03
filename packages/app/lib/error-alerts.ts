/**
 * Send error alerts via email using Resend
 *
 * To enable email alerts:
 * 1. Set RESEND_API_KEY in your .env file
 * 2. Set ERROR_ALERT_EMAIL to your email address
 * 3. Call sendErrorAlert() when logging critical errors
 */

interface ErrorAlertOptions {
  message: string
  stack?: string
  url?: string
  userId?: string
  errorType?: string
  timestamp?: string
}

export async function sendErrorAlert(options: ErrorAlertOptions): Promise<void> {
  // Skip if Resend not configured
  if (!process.env.RESEND_API_KEY || !process.env.ERROR_ALERT_EMAIL) {
    console.warn(
      'Resend email alerts not configured. Set RESEND_API_KEY and ERROR_ALERT_EMAIL to enable.'
    )
    return
  }

  try {
    // Only send emails on server-side
    if (typeof window !== 'undefined') {
      return
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const html = `
      <h2>🚨 Application Error</h2>
      <p><strong>Message:</strong> ${options.message}</p>
      ${options.errorType ? `<p><strong>Type:</strong> ${options.errorType}</p>` : ''}
      ${options.url ? `<p><strong>URL:</strong> ${options.url}</p>` : ''}
      ${options.userId ? `<p><strong>User ID:</strong> ${options.userId}</p>` : ''}
      ${options.timestamp ? `<p><strong>Time:</strong> ${options.timestamp}</p>` : ''}
      ${
        options.stack
          ? `
        <h3>Stack Trace:</h3>
        <pre style="background: #f5f5f5; padding: 10px; overflow-x: auto;">${options.stack}</pre>
      `
          : ''
      }
      <hr />
      <p style="color: #666; font-size: 12px;">
        This error was logged to your Supabase database.
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/errors">View all errors</a>
      </p>
    `

    await resend.emails.send({
      from: process.env.ERROR_ALERT_FROM_EMAIL || 'errors@yourdomain.com',
      to: process.env.ERROR_ALERT_EMAIL,
      subject: `🚨 Error: ${options.message.substring(0, 50)}${options.message.length > 50 ? '...' : ''}`,
      html,
    })
  } catch (error) {
    // Don't throw - email failures shouldn't break error logging
    console.error('Failed to send error alert email:', error)
  }
}

/**
 * Check if error should trigger an alert
 * Customize this logic based on your needs
 */
export function shouldAlertError(error: {
  message: string
  errorType?: string
  url?: string
}): boolean {
  // Don't alert for common non-critical errors
  const ignoredPatterns = [
    /network error/i,
    /failed to fetch/i,
    /timeout/i,
    /aborted/i,
  ]

  if (ignoredPatterns.some((pattern) => pattern.test(error.message))) {
    return false
  }

  // Alert for server errors
  if (error.url?.includes('/api/')) {
    return true
  }

  // Alert for auth errors
  if (error.errorType?.includes('Auth')) {
    return true
  }

  // Alert for critical error types
  const criticalTypes = ['ReferenceError', 'TypeError', 'SyntaxError']
  if (error.errorType && criticalTypes.includes(error.errorType)) {
    return true
  }

  return false
}
