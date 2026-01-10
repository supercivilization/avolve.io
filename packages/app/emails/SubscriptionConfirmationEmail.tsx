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

interface SubscriptionConfirmationEmailProps {
  userName?: string
  tierName?: string
  amount?: string
  billingInterval?: string
  dashboardUrl?: string
}

export function SubscriptionConfirmationEmail({
  userName = 'there',
  tierName = 'Individual VIP',
  amount = '$28',
  billingInterval = 'month',
  dashboardUrl = 'https://avolve.io/dashboard',
}: SubscriptionConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {tierName} - Your subscription is active!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You're In! 🎉</Heading>

          <Text style={text}>
            Hey {userName},
          </Text>

          <Text style={text}>
            Your <strong>{tierName}</strong> subscription is now active.
            Welcome to the inner circle!
          </Text>

          <Section style={receiptBox}>
            <Text style={receiptTitle}>Subscription Details</Text>
            <Text style={receiptRow}>
              <span>Plan:</span>
              <strong>{tierName}</strong>
            </Text>
            <Text style={receiptRow}>
              <span>Amount:</span>
              <strong>{amount}/{billingInterval}</strong>
            </Text>
            <Text style={receiptRow}>
              <span>Status:</span>
              <strong style={{ color: '#22c55e' }}>Active</strong>
            </Text>
          </Section>

          <Text style={text}>
            You now have access to:
          </Text>

          <Section style={bulletPoints}>
            <Text style={bullet}>✓ Full training library and documentation</Text>
            <Text style={bullet}>✓ Complete playbook collection</Text>
            <Text style={bullet}>✓ Premium templates and components</Text>
            <Text style={bullet}>✓ AI chat assistant</Text>
            <Text style={bullet}>✓ Community forum access</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>

          <Text style={textMuted}>
            You can manage your subscription anytime from your account settings.
            Questions? Just reply to this email.
          </Text>

          <Text style={footer}>
            — The Avolve Team
          </Text>

          <Text style={footerLinks}>
            <Link href="https://avolve.io/dashboard/settings" style={link}>Manage Subscription</Link>
            {' • '}
            <Link href="https://avolve.io/support" style={link}>Support</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default SubscriptionConfirmationEmail

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

const receiptBox = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const receiptTitle = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 16px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
}

const receiptRow = {
  color: '#525252',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
  display: 'flex',
  justifyContent: 'space-between',
}

const bulletPoints = {
  margin: '24px 0',
}

const bullet = {
  color: '#525252',
  fontSize: '15px',
  lineHeight: '28px',
  margin: '0',
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
