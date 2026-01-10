'use client'

import {
  Button,
  Card,
  H1,
  H3,
  Input,
  Label,
  Paragraph,
  ScrollView,
  SizableText,
  TextArea,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Mail, MessageCircle, Send } from '@tamagui/lucide-icons'
import { useState } from 'react'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Would submit to API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setName('')
    setEmail('')
    setMessage('')
    // Show success toast
  }

  return (
    <Card padding="$6" borderRadius="$4" maxWidth={500} width="100%">
      <YStack gap="$4">
        <YStack gap="$2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />
        </YStack>
        <YStack gap="$2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </YStack>
        <YStack gap="$2">
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            placeholder="How can we help?"
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
        </YStack>
        <Button
          size="$4"
          theme="active"
          icon={<Send size={16} />}
          onPress={handleSubmit}
          disabled={isSubmitting || !name || !email || !message}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </YStack>
    </Card>
  )
}

function ContactInfo() {
  const contactMethods = [
    {
      icon: <Mail size={24} color="$blue10" />,
      title: 'Email',
      description: 'support@avolve.io',
      action: 'Send an email',
    },
    {
      icon: <MessageCircle size={24} color="$green10" />,
      title: 'Community',
      description: 'Join our community forum',
      action: 'Join Discord',
    },
  ]

  return (
    <YStack gap="$4" maxWidth={400} width="100%">
      <H3 size="$6" fontWeight="600">
        Other Ways to Reach Us
      </H3>
      {contactMethods.map((method) => (
        <Card key={method.title} padding="$4" borderRadius="$4">
          <XStack gap="$3" alignItems="center">
            <XStack
              width={48}
              height={48}
              borderRadius="$3"
              backgroundColor="$color3"
              alignItems="center"
              justifyContent="center"
            >
              {method.icon}
            </XStack>
            <YStack flex={1}>
              <SizableText size="$4" fontWeight="600">
                {method.title}
              </SizableText>
              <Paragraph size="$3" color="$color11">
                {method.description}
              </Paragraph>
            </YStack>
          </XStack>
        </Card>
      ))}
    </YStack>
  )
}

export function ContactScreen() {
  const media = useMedia()

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        {/* Hero */}
        <YStack
          paddingVertical="$10"
          paddingHorizontal="$4"
          alignItems="center"
          gap="$4"
        >
          <H1
            size={media.gtMd ? '$11' : '$9'}
            textAlign="center"
            fontWeight="800"
          >
            Contact Us
          </H1>
          <Paragraph
            size={media.gtMd ? '$6' : '$5'}
            color="$color11"
            textAlign="center"
            maxWidth={600}
          >
            Have a question or feedback? We would love to hear from you.
          </Paragraph>
        </YStack>

        {/* Contact Content */}
        <XStack
          paddingVertical="$8"
          paddingHorizontal="$4"
          justifyContent="center"
          gap="$8"
          flexWrap="wrap"
        >
          <ContactForm />
          <ContactInfo />
        </XStack>

        {/* FAQ Teaser */}
        <YStack
          paddingVertical="$10"
          paddingHorizontal="$4"
          backgroundColor="$color2"
          alignItems="center"
          gap="$4"
        >
          <YStack alignItems="center" gap="$3" maxWidth={500}>
            <H3 size="$7" fontWeight="700" textAlign="center">
              Looking for Quick Answers?
            </H3>
            <Paragraph size="$4" color="$color11" textAlign="center">
              Check out our documentation and frequently asked questions for instant help.
            </Paragraph>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
