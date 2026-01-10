import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PasswordResetEmailProps {
  userName?: string
  resetUrl?: string
}

export function PasswordResetEmail({
  userName = 'there',
  resetUrl = 'https://avolve.io/reset-password',
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Avolve password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password</Heading>

          <Text style={text}>
            Hey {userName},
          </Text>

          <Text style={text}>
            We received a request to reset your password. Click the button below
            to choose a new password.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>

          <Text style={text}>
            This link will expire in 1 hour for security reasons.
          </Text>

          <Text style={textMuted}>
            If you didn't request a password reset, you can safely ignore this email.
            Your password will remain unchanged.
          </Text>

          <Text style={footer}>
            — The Avolve Team
          </Text>

          <Text style={footerLinks}>
            <Link href="https://avolve.io" style={link}>Website</Link>
            {' • '}
            <Link href="https://avolve.io/support" style={link}>Support</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default PasswordResetEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  marginBottom: '64px',
  maxWidth: '560px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 24px',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const textMuted = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '24px 0 16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
}

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  marginTop: '32px',
}

const footerLinks = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '16px',
  textAlign: 'center' as const,
}

const link = {
  color: '#0070f3',
  textDecoration: 'none',
}
