import { Resend } from 'resend'
import { render } from '@react-email/components'
import type { ReactElement } from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  from?: string
  replyTo?: string
}

/**
 * Send an email using Resend
 *
 * @param options - Email sending options
 * @param template - React Email template component
 */
export async function sendEmail<T>(
  options: SendEmailOptions,
  template: ReactElement<T>
) {
  const { to, subject, from = 'noreply@avolve.com', replyTo } = options

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      react: template,
      ...(replyTo && { replyTo }),
    })

    if (error) {
      console.error('Email sending failed:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}
