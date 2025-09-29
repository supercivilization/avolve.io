# Avolve Email Templates

React Email templates and development environment for transactional emails.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start email development server
pnpm email:dev

# Open http://localhost:3000 to preview emails
```

## 📧 Email System

### Core Stack
- **React Email 4.2** - React components for emails
- **@react-email/components** - Email-optimized components
- **Resend** - Transactional email delivery
- **AI-Generated Templates** - Natural language to email

### AI-Enhanced Features
- **Template Generation** - Describe emails in natural language
- **A/B Testing** - AI-optimized email variants
- **Content Optimization** - AI-improved subject lines and copy
- **Accessibility Compliance** - Automatic email accessibility

## 🏗️ Architecture

```
src/
├── emails/                 # Email templates
│   ├── welcome.tsx        # Welcome email template
│   ├── reset-password.tsx # Password reset template
│   └── newsletter.tsx     # Newsletter template
├── components/            # Reusable email components
│   ├── layout.tsx        # Email layout wrapper
│   ├── header.tsx        # Email header component
│   └── footer.tsx        # Email footer component
├── lib/                  # Email utilities
│   ├── ai-email.ts      # AI email generation
│   └── send.ts          # Email sending utilities
└── styles/              # Email-safe CSS
```

## 📧 Available Templates

### Transactional Emails
- **Welcome Email** - User onboarding sequence
- **Password Reset** - Secure password recovery
- **Email Verification** - Account confirmation
- **Payment Receipt** - Transaction confirmations
- **Account Update** - Profile change notifications

### Marketing Emails
- **Newsletter** - Regular content updates
- **Product Announcement** - Feature releases
- **Event Invitation** - Webinar and event invites
- **Survey Request** - User feedback collection
- **Re-engagement** - Win-back campaigns

### AI-Generated Templates
- **Custom Templates** - Generated from natural language descriptions
- **Personalized Content** - AI-customized email content
- **Dynamic Layouts** - Adaptive email structures
- **Smart Subject Lines** - AI-optimized email subjects

## 🛠️ Development Commands

```bash
# Development
pnpm email:dev        # Start email development server
pnpm email:build      # Build email templates
pnpm email:export     # Export static email HTML

# AI Email Generation
pnpm email:generate   # Generate email from description
pnpm email:optimize   # AI-optimize existing template
pnpm email:test       # A/B test email variants

# Email Delivery
pnpm email:send       # Send test emails
pnpm email:preview    # Preview email in browser
pnpm email:validate   # Validate email templates
```

## 🎨 Email Components

### Layout Components
```tsx
import { Html, Head, Body, Container } from '@react-email/components';
import { Layout } from '../components/layout';

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Layout>
      <h1>Welcome, {name}!</h1>
      <p>Thank you for joining our AI-native platform.</p>
    </Layout>
  );
}
```

### AI-Enhanced Components
```tsx
import { generateEmailContent } from '../lib/ai-email';

export async function AINewsletterEmail({ topic }: { topic: string }) {
  const content = await generateEmailContent(topic, {
    tone: 'professional',
    length: 'medium',
    includeImages: true
  });
  
  return <Newsletter content={content} />;
}
```

## 📊 Email Analytics

### Performance Metrics
- **Open Rate** - Email opening analytics
- **Click-Through Rate** - Link engagement tracking
- **Bounce Rate** - Delivery failure monitoring
- **Unsubscribe Rate** - List health metrics

### AI-Powered Insights
- **Subject Line Optimization** - A/B testing results
- **Send Time Optimization** - Best delivery times
- **Content Performance** - Engagement analysis
- **Personalization Impact** - Custom content effectiveness

## 🔧 Configuration

### Resend Configuration
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  return await resend.emails.send({
    from: 'welcome@avolve.app',
    to,
    subject: 'Welcome to Avolve',
    react: WelcomeEmail({ name })
  });
}
```

### AI Email Configuration
```typescript
export const aiEmailConfig = {
  provider: 'openai',
  model: 'gpt-4',
  templates: {
    newsletter: {
      tone: 'professional',
      length: 'medium',
      includeImages: true
    },
    transactional: {
      tone: 'friendly',
      length: 'short',
      includeImages: false
    }
  }
};
```

## 🎯 Email Best Practices

### Design Guidelines
- **Mobile-First** - Responsive email design
- **Dark Mode Support** - Color scheme adaptation
- **Accessibility** - Screen reader compatibility
- **Brand Consistency** - Unified visual identity

### Content Strategy
- **Clear Subject Lines** - Specific and actionable
- **Concise Copy** - Scannable content structure
- **Strong CTAs** - Clear call-to-action buttons
- **Personalization** - Relevant, targeted messaging

### Technical Standards
- **HTML Email** - Email client compatibility
- **CSS Inlining** - Reliable styling
- **Image Optimization** - Fast loading times
- **Fallback Text** - Alt text for images

## 🚀 Deployment

### Email Template Deployment
```bash
# Build and deploy templates
pnpm email:build && pnpm email:deploy

# Deploy to Resend
resend deploy --templates=dist/

# Sync with email service
pnpm email:sync
```

### Environment Variables
```bash
RESEND_API_KEY=re_123456789
OPENAI_API_KEY=sk-123456789
EMAIL_FROM_ADDRESS=noreply@avolve.app
EMAIL_REPLY_TO=support@avolve.app
```

## 🤖 AI Email Generation

### Natural Language Templates
```bash
# Generate email template
pnpm email:generate "Create a welcome email for new users with onboarding steps"

# Optimize existing template
pnpm email:optimize src/emails/welcome.tsx --goal="increase engagement"

# A/B test variants
pnpm email:test src/emails/newsletter.tsx --variants=3
```

### AI Features
- **Content Generation** - AI-written email copy
- **Layout Optimization** - AI-designed email structure
- **Subject Line Testing** - AI-generated variations
- **Send Time Optimization** - AI-predicted best times

## 📚 Learn More

- [React Email Documentation](https://react.email/docs)
- [Resend API Reference](https://resend.com/docs)
- [Email Design Guidelines](https://www.campaignmonitor.com/dev-resources/)
- [Email Accessibility](https://www.emailonacid.com/blog/article/email-development/email-accessibility-in-2023)