'use client'

import {
  Button,
  Card,
  H1,
  H3,
  Paragraph,
  ScrollView,
  SizableText,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Calendar, Clock, ArrowRight } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  category: string
}

function BlogPostCard({ title, excerpt, date, readTime, slug, category }: BlogPostCardProps) {
  const linkProps = useLink({ href: `/blog/${slug}` })

  return (
    <Card
      {...linkProps}
      padding="$5"
      borderRadius="$4"
      hoverStyle={{ scale: 1.01, backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.99 }}
      animation="quick"
      cursor="pointer"
    >
      <YStack gap="$3">
        <XStack>
          <XStack
            backgroundColor="$blue4"
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$2"
          >
            <SizableText size="$1" fontWeight="600" color="$blue10">
              {category}
            </SizableText>
          </XStack>
        </XStack>
        <H3 size="$6" fontWeight="600">
          {title}
        </H3>
        <Paragraph size="$4" color="$color11" numberOfLines={3}>
          {excerpt}
        </Paragraph>
        <XStack gap="$4" alignItems="center">
          <XStack gap="$1" alignItems="center">
            <Calendar size={14} color="$color10" />
            <SizableText size="$2" color="$color10">
              {date}
            </SizableText>
          </XStack>
          <XStack gap="$1" alignItems="center">
            <Clock size={14} color="$color10" />
            <SizableText size="$2" color="$color10">
              {readTime}
            </SizableText>
          </XStack>
        </XStack>
      </YStack>
    </Card>
  )
}

// Sample blog posts - would be fetched from database/CMS
const blogPosts: BlogPostCardProps[] = [
  {
    title: 'Mastering the CEO Role: Setting Your Mission and Vision',
    excerpt: 'Every successful business starts with clarity. Learn how to craft a mission statement that inspires action and a vision that guides your decisions.',
    date: 'Jan 5, 2026',
    readTime: '8 min read',
    slug: 'mastering-ceo-role',
    category: 'CEO',
  },
  {
    title: 'The StoryBrand Framework: Making Your Customer the Hero',
    excerpt: 'Your customer is the hero of their own story. Learn how to position yourself as the trusted guide who helps them overcome challenges.',
    date: 'Jan 3, 2026',
    readTime: '10 min read',
    slug: 'storybrand-framework',
    category: 'CMO',
  },
  {
    title: 'Running a Profitability Audit on Your Products',
    excerpt: 'Not all products are created equal. Learn how to evaluate each offering and make data-driven decisions about what to optimize, grow, or eliminate.',
    date: 'Dec 28, 2025',
    readTime: '6 min read',
    slug: 'profitability-audit',
    category: 'CVO',
  },
  {
    title: 'The 5 Meetings System for Solopreneurs',
    excerpt: 'Even as a solo operator, structured meetings with yourself drive accountability and progress. Learn how to implement this powerful system.',
    date: 'Dec 20, 2025',
    readTime: '7 min read',
    slug: 'five-meetings-system',
    category: 'COO',
  },
  {
    title: 'Profit First: A Cash Flow System That Actually Works',
    excerpt: 'Stop hoping for profit and start guaranteeing it. Learn how the 5 Accounts System transforms your relationship with money.',
    date: 'Dec 15, 2025',
    readTime: '9 min read',
    slug: 'profit-first-system',
    category: 'CFO',
  },
]

export function BlogScreen() {
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
            Blog
          </H1>
          <Paragraph
            size={media.gtMd ? '$6' : '$5'}
            color="$color11"
            textAlign="center"
            maxWidth={600}
          >
            Insights, frameworks, and strategies to help you master every role in your business.
          </Paragraph>
        </YStack>

        {/* Blog Posts */}
        <YStack
          paddingVertical="$6"
          paddingHorizontal="$4"
          alignItems="center"
        >
          <YStack gap="$4" maxWidth={800} width="100%">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </YStack>
        </YStack>

        {/* Newsletter CTA */}
        <YStack
          paddingVertical="$10"
          paddingHorizontal="$4"
          backgroundColor="$color2"
          alignItems="center"
          gap="$4"
        >
          <YStack alignItems="center" gap="$3" maxWidth={500}>
            <H3 size="$7" fontWeight="700" textAlign="center">
              Get Weekly Insights
            </H3>
            <Paragraph size="$4" color="$color11" textAlign="center">
              Join 500+ solopreneurs receiving actionable tips every week.
            </Paragraph>
            <Button
              {...useLink({ href: '/sign-up' })}
              size="$4"
              theme="active"
              iconAfter={<ArrowRight size={16} />}
            >
              Subscribe
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
