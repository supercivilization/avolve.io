import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Contact Form Submission</Heading>

        <Section style={infoSection}>
          <Text style={label}>From:</Text>
          <Text style={value}>{name}</Text>
        </Section>

        <Section style={infoSection}>
          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>
        </Section>

        <Section style={infoSection}>
          <Text style={label}>Subject:</Text>
          <Text style={value}>{subject}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={messageSection}>
          <Text style={label}>Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          Reply directly to this email to respond to {name} at {email}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
};

const infoSection = {
  padding: '0 48px',
  marginBottom: '16px',
};

const label = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const value = {
  color: '#111827',
  fontSize: '16px',
  margin: '0 0 16px',
};

const messageSection = {
  padding: '0 48px',
  marginTop: '24px',
};

const messageText = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '24px',
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '8px',
  margin: '8px 0 0',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 48px',
};

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
  marginTop: '24px',
};
