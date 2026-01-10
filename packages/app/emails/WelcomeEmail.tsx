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

interface WelcomeEmailProps {
  userName?: string
  loginUrl?: string
}

export function WelcomeEmail({
  userName = 'there',
  loginUrl = 'https://avolve.io/sign-in',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Avolve - Let's accelerate your growth!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Avolve!</Heading>

          <Text style={text}>
            Hey {userName},
          </Text>

          <Text style={text}>
            Thanks for joining Avolve! You're now part of a community of solopreneurs
            who are building smarter, not harder.
          </Text>

          <Text style={text}>
            Here's what you can do next:
          </Text>

          <Section style={bulletPoints}>
            <Text style={bullet}>• Explore our <strong>Training</strong> library to learn the fundamentals</Text>
            <Text style={bullet}>• Browse <strong>Playbooks</strong> for step-by-step guides</Text>
            <Text style={bullet}>• Check out <strong>Templates</strong> to jumpstart your projects</Text>
            <Text style={bullet}>• Chat with our <strong>AI Assistant</strong> for instant help</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Go to Dashboard
            </Button>
          </Section>

          <Text style={text}>
            If you have any questions, just reply to this email. We're here to help!
          </Text>

          <Text style={footer}>
            — The Avolve Team
          </Text>

          <Text style={footerLinks}>
            <Link href="https://avolve.io" style={link}>Website</Link>
            {' • '}
            <Link href="https://avolve.io/pricing" style={link}>Pricing</Link>
            {' • '}
            <Link href="https://avolve.io/support" style={link}>Support</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

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
