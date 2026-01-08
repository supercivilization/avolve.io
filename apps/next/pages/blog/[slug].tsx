'use client'

import {
  Button,
  H1,
  H3,
  Paragraph,
  ScrollView,
  SizableText,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { ArrowLeft, Calendar, Clock } from '@tamagui/lucide-icons'
import { useRouter } from 'next/router'
import { useLink } from 'solito/link'

// Sample blog post content - would be fetched from database/CMS
const blogPosts: Record<string, {
  title: string
  content: string
  date: string
  readTime: string
  category: string
}> = {
  'mastering-ceo-role': {
    title: 'Mastering the CEO Role: Setting Your Mission and Vision',
    content: `Every successful business starts with clarity. As the CEO of your solopreneur venture, your primary responsibility is to set the direction that guides all decisions.

## The Mission Statement

Your mission statement answers the fundamental question: "Why does this business exist?" It should be:
- Clear and memorable
- Action-oriented
- Focused on the value you provide

## The Vision Statement

Your vision paints a picture of the future you're working toward. It should inspire action and help you make strategic decisions.

## Key Characteristics of a Great CEO

1. **Economic Intelligence** - Understanding the numbers that drive your business
2. **Relational Intelligence** - Building meaningful connections
3. **Operational Intelligence** - Creating systems that scale

The CEO role in your business is about leadership and direction. Master this, and every other role becomes easier.`,
    date: 'Jan 5, 2026',
    readTime: '8 min read',
    category: 'CEO',
  },
  'storybrand-framework': {
    title: 'The StoryBrand Framework: Making Your Customer the Hero',
    content: `The biggest mistake businesses make is positioning themselves as the hero of the story. Your customer is the hero - you are the guide.

## The 7-Part StoryBrand Framework

1. **A Character** - Your customer has a want
2. **Has a Problem** - External, internal, and philosophical
3. **And Meets a Guide** - That's you! Show empathy and authority
4. **Who Gives Them a Plan** - Clear steps to success
5. **And Calls Them to Action** - Direct and transitional CTAs
6. **That Helps Them Avoid Failure** - Stakes matter
7. **And Ends in Success** - Paint the transformation

## Why This Works

Stories are the most powerful tool for human connection. When you frame your marketing as a story with your customer as the hero, everything changes.

Your customer doesn't need another hero - they need a guide who understands their journey.`,
    date: 'Jan 3, 2026',
    readTime: '10 min read',
    category: 'CMO',
  },
  'profitability-audit': {
    title: 'Running a Profitability Audit on Your Products',
    content: `Not all products are created equal. Some drive your business forward, others drain resources. Here's how to tell the difference.

## The Product Scoring Matrix

Rate each product on:
- **Revenue** - How much does it bring in?
- **Profit Margin** - What's the actual profit after costs?
- **Time Investment** - How much of your time does it require?
- **Growth Potential** - Can this scale?

## The Four Categories

1. **Stars** - High revenue, high margin, scalable
2. **Cash Cows** - Steady income, low maintenance
3. **Question Marks** - Potential but unproven
4. **Dogs** - Low value, consider eliminating

## Taking Action

Be ruthless about eliminating products that don't serve your business. Every product you offer should earn its place in your portfolio.`,
    date: 'Dec 28, 2025',
    readTime: '6 min read',
    category: 'CVO',
  },
  'five-meetings-system': {
    title: 'The 5 Meetings System for Solopreneurs',
    content: `Even as a solo operator, structured meetings with yourself drive accountability and progress.

## The 5 Essential Meetings

1. **Daily Huddle** (10 min) - What's the one thing today?
2. **Weekly Planning** (1 hour) - Review last week, plan next week
3. **Monthly Review** (2 hours) - Analyze metrics, adjust strategy
4. **Quarterly Planning** (Half day) - Set 90-day goals
5. **Annual Vision** (Full day) - Long-term strategy and vision

## Why This Works

Structure creates freedom. When you have dedicated time for planning and review, you free your mind to focus on execution during the rest of your time.

## Implementation Tips

- Block these meetings in your calendar as non-negotiable
- Create templates for each meeting type
- Track your progress over time

The 5 Meetings System transforms chaotic solopreneurship into intentional business building.`,
    date: 'Dec 20, 2025',
    readTime: '7 min read',
    category: 'COO',
  },
  'profit-first-system': {
    title: 'Profit First: A Cash Flow System That Actually Works',
    content: `Stop hoping for profit and start guaranteeing it with the 5 Accounts System.

## The 5 Accounts

1. **Income** - All revenue comes here first
2. **Profit** - Pay yourself first (5-15%)
3. **Owner's Pay** - Your salary (50%)
4. **Tax** - Set aside for taxes (15%)
5. **Operating Expenses** - What's left for business (20%)

## The Psychology Behind It

Traditional accounting says: Revenue - Expenses = Profit

Profit First says: Revenue - Profit = Expenses

This simple flip forces you to run a leaner, more profitable business.

## Getting Started

1. Open your 5 accounts at separate banks
2. Calculate your current allocation percentages
3. Gradually adjust toward target percentages
4. Transfer on the 10th and 25th of each month

The Profit First system transforms your relationship with money and ensures your business serves you, not the other way around.`,
    date: 'Dec 15, 2025',
    readTime: '9 min read',
    category: 'CFO',
  },
}

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query
  const media = useMedia()

  // All hooks must be called before any early returns
  const backLink = useLink({ href: '/blog' })
  const signUpLink = useLink({ href: '/sign-up' })

  const post = typeof slug === 'string' ? blogPosts[slug] : null

  if (!post) {
    return (
      <ScrollView flex={1} backgroundColor="$background">
        <YStack padding="$8" alignItems="center" gap="$4">
          <H1>Post Not Found</H1>
          <Button {...backLink} icon={<ArrowLeft size={16} />}>
            Back to Blog
          </Button>
        </YStack>
      </ScrollView>
    )
  }

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        {/* Header */}
        <YStack
          paddingVertical="$8"
          paddingHorizontal="$4"
          alignItems="center"
          gap="$4"
        >
          <YStack maxWidth={800} width="100%" gap="$4">
            <Button
              {...backLink}
              size="$3"
              chromeless
              icon={<ArrowLeft size={16} />}
              alignSelf="flex-start"
            >
              Back to Blog
            </Button>

            <XStack>
              <XStack
                backgroundColor="$blue4"
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$2"
              >
                <SizableText size="$2" fontWeight="600" color="$blue10">
                  {post.category}
                </SizableText>
              </XStack>
            </XStack>

            <H1
              size={media.gtMd ? '$10' : '$8'}
              fontWeight="800"
            >
              {post.title}
            </H1>

            <XStack gap="$4" alignItems="center">
              <XStack gap="$1" alignItems="center">
                <Calendar size={14} color="$color10" />
                <SizableText size="$3" color="$color10">
                  {post.date}
                </SizableText>
              </XStack>
              <XStack gap="$1" alignItems="center">
                <Clock size={14} color="$color10" />
                <SizableText size="$3" color="$color10">
                  {post.readTime}
                </SizableText>
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        {/* Content */}
        <YStack
          paddingVertical="$6"
          paddingHorizontal="$4"
          alignItems="center"
        >
          <YStack maxWidth={800} width="100%" gap="$4">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <H3 key={index} size="$7" fontWeight="700" marginTop="$4">
                    {paragraph.replace('## ', '')}
                  </H3>
                )
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                return (
                  <YStack key={index} gap="$2" paddingLeft="$4">
                    {paragraph.split('\n').map((item, i) => (
                      <Paragraph key={i} size="$5" color="$color11">
                        {item}
                      </Paragraph>
                    ))}
                  </YStack>
                )
              }
              return (
                <Paragraph key={index} size="$5" color="$color11" lineHeight="$7">
                  {paragraph}
                </Paragraph>
              )
            })}
          </YStack>
        </YStack>

        {/* CTA */}
        <YStack
          paddingVertical="$10"
          paddingHorizontal="$4"
          backgroundColor="$color2"
          alignItems="center"
          gap="$4"
        >
          <YStack alignItems="center" gap="$3" maxWidth={500}>
            <H3 size="$7" fontWeight="700" textAlign="center">
              Ready to Master All 5 Roles?
            </H3>
            <Paragraph size="$4" color="$color11" textAlign="center">
              Join Avolve and get the tools, frameworks, and guidance to run your business like a pro.
            </Paragraph>
            <Button
              {...signUpLink}
              size="$4"
              theme="active"
            >
              Get Started
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
