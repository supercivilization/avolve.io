import {
  Avatar,
  Card,
  H2,
  Paragraph,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Star } from '@tamagui/lucide-icons'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Indie Developer',
    avatar: 'SC',
    content: 'The playbooks alone saved me months of trial and error. Went from idea to $10k MRR in 6 months following the systems here.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'SaaS Founder',
    avatar: 'MJ',
    content: 'Finally, a platform that gets solopreneurs. The AI chat is like having a senior dev on call 24/7. Worth every penny.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Freelance Consultant',
    avatar: 'ER',
    content: 'Upgraded to PRO for my small team. The office hours and code reviews have been game-changing for our velocity.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const media = useMedia()

  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      backgroundColor="$background"
      alignItems="center"
      gap="$8"
    >
      {/* Section Header */}
      <YStack alignItems="center" gap="$3" maxWidth={600}>
        <H2 size="$9" textAlign="center" fontWeight="700">
          Trusted by Builders
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          Join hundreds of solopreneurs who are scaling smarter, not harder.
        </Paragraph>
      </YStack>

      {/* Testimonials Grid */}
      <XStack
        flexWrap="wrap"
        justifyContent="center"
        gap="$4"
        maxWidth={1200}
      >
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            padding="$5"
            width={media.gtMd ? 360 : '100%'}
            maxWidth={380}
            elevate
            bordered
          >
            <YStack gap="$4">
              {/* Stars */}
              <XStack gap="$1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} color="$yellow10" fill="$yellow10" />
                ))}
              </XStack>

              {/* Content */}
              <Paragraph size="$4" color="$color12" lineHeight="$6">
                "{testimonial.content}"
              </Paragraph>

              {/* Author */}
              <XStack gap="$3" alignItems="center">
                <Avatar circular size="$4">
                  <Avatar.Fallback
                    backgroundColor="$blue10"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Paragraph size="$2" color="white" fontWeight="600">
                      {testimonial.avatar}
                    </Paragraph>
                  </Avatar.Fallback>
                </Avatar>
                <YStack>
                  <Paragraph size="$4" fontWeight="600">
                    {testimonial.name}
                  </Paragraph>
                  <Paragraph size="$2" color="$color10">
                    {testimonial.role}
                  </Paragraph>
                </YStack>
              </XStack>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}
