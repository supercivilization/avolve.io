import {
  Paragraph,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

const footerLinks = {
  product: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Features', href: '/#features' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const linkProps = useLink({ href })
  return (
    <Paragraph
      {...linkProps}
      size="$3"
      color="$color10"
      hoverStyle={{ color: '$color12' }}
      cursor="pointer"
    >
      {label}
    </Paragraph>
  )
}

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <YStack
      paddingVertical="$8"
      paddingHorizontal="$4"
      backgroundColor="$background"
      borderTopWidth={1}
      borderTopColor="$borderColor"
    >
      <YStack maxWidth={1200} width="100%" marginHorizontal="auto" gap="$8">
        {/* Links */}
        <XStack flexWrap="wrap" gap="$10" justifyContent="center">
          {/* Product */}
          <YStack gap="$3" minWidth={120}>
            <Paragraph size="$3" fontWeight="600" color="$color12">
              Product
            </Paragraph>
            {footerLinks.product.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </YStack>

          {/* Company */}
          <YStack gap="$3" minWidth={120}>
            <Paragraph size="$3" fontWeight="600" color="$color12">
              Company
            </Paragraph>
            {footerLinks.company.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </YStack>

          {/* Legal */}
          <YStack gap="$3" minWidth={120}>
            <Paragraph size="$3" fontWeight="600" color="$color12">
              Legal
            </Paragraph>
            {footerLinks.legal.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </YStack>
        </XStack>

        {/* Copyright */}
        <YStack alignItems="center" paddingTop="$4" borderTopWidth={1} borderTopColor="$borderColor">
          <Paragraph size="$2" color="$color10">
            © {currentYear} Avolve. All rights reserved.
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  )
}
