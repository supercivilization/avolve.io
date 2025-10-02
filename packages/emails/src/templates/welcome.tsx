import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  dashboardUrl?: string
}

export function WelcomeEmail({
  name,
  dashboardUrl = 'https://avolve.com/dashboard',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Avolve!</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thank you for joining Avolve. We're excited to have you on board!
          </Text>
          <Text style={text}>
            Get started by accessing your dashboard:
          </Text>
          <Button style={button} href={dashboardUrl}>
            Go to Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions, feel free to reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#000',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
