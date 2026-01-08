import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { WelcomeEmail } from 'app/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, userName } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const { data, error } = await resend.emails.send({
      from: 'Avolve <hello@avolve.io>',
      to: email,
      subject: 'Welcome to Avolve!',
      react: WelcomeEmail({ userName }),
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Error in send-welcome:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
