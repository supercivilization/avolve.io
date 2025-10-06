# Logo & Favicon Setup Guide

**Created:** October 6, 2025
**Source:** `/Users/avolve/Downloads/avolve logo.svg` (596KB)

## Required Sizes for Modern Web (2025)

### Favicons

```
public/
├── favicon.ico          # 32x32 for legacy browsers
├── favicon-16x16.png    # 16x16 browser tabs
├── favicon-32x32.png    # 32x32 browser tabs
├── favicon-96x96.png    # 96x96 browser tabs
└── apple-touch-icon.png # 180x180 iOS home screen
```

### Open Graph & Social Media

```
public/
├── og-image.png         # 1200x630 for Twitter/Facebook/LinkedIn
└── og-image-square.png  # 1200x1200 for Instagram/WhatsApp
```

### App Icons (PWA)

```
public/icons/
├── icon-192.png         # 192x192 Android Chrome
├── icon-512.png         # 512x512 Android Chrome
└── maskable-icon.png    # 512x512 with safe zone
```

## Processing Commands

### Using ImageMagick (Recommended)

Install if needed:
```bash
brew install imagemagick
```

Convert SVG to PNGs:

```bash
cd /Users/avolve/dev/active/avolve/public

# Source SVG
SVG="/Users/avolve/Downloads/avolve logo.svg"

# Favicons
magick "$SVG" -resize 16x16 favicon-16x16.png
magick "$SVG" -resize 32x32 favicon-32x32.png
magick "$SVG" -resize 96x96 favicon-96x96.png
magick "$SVG" -resize 180x180 apple-touch-icon.png

# favicon.ico (multi-resolution)
magick "$SVG" -resize 32x32 -define icon:auto-resize=16,32,48,64 favicon.ico

# Open Graph images
magick "$SVG" -resize 1200x630 -gravity center -extent 1200x630 og-image.png
magick "$SVG" -resize 1200x1200 -gravity center -extent 1200x1200 og-image-square.png

# PWA icons
mkdir -p icons
magick "$SVG" -resize 192x192 icons/icon-192.png
magick "$SVG" -resize 512x512 icons/icon-512.png
magick "$SVG" -resize 512x512 icons/maskable-icon.png
```

### Alternative: Online Tools

If ImageMagick not available:
1. **Favicon Generator:** https://realfavicongenerator.net/
2. **SVG to PNG:** https://svgtopng.com/
3. **Image Resizer:** https://bulkresizephotos.com/

## Next.js Metadata Configuration

### Update `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Avolve.io - Next.js 15 + React 19 + Supabase + AI',
    template: '%s | Avolve.io'
  },
  description: 'Modern web development stack with Next.js 15.5, React 19.2, TypeScript 5.9, Vercel AI SDK 5.0, and Supabase',

  // Favicons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
    ],
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avolve.io',
    siteName: 'Avolve.io',
    title: 'Avolve.io - Modern Web Development Stack',
    description: 'Next.js 15.5 + React 19.2 + TypeScript 5.9 + Vercel AI SDK 5.0 + Supabase',
    images: [
      {
        url: 'https://avolve.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Avolve.io Logo',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Avolve.io - Modern Web Development Stack',
    description: 'Next.js 15.5 + React 19.2 + TypeScript 5.9 + Vercel AI SDK 5.0 + Supabase',
    images: ['https://avolve.io/og-image.png'],
  },

  // App manifest
  manifest: '/manifest.json',
}
```

### Create `public/manifest.json`

```json
{
  "name": "Avolve.io - Modern Web Development Stack",
  "short_name": "Avolve",
  "description": "Next.js 15 + React 19 + Supabase + AI stack documentation",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/maskable-icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

## Optimization

### Compress PNGs

```bash
# Using optipng
brew install optipng
optipng -o7 public/**/*.png

# Or using pngquant
brew install pngquant
pngquant --quality=65-80 public/**/*.png
```

### Copy SVG Source

```bash
# Keep optimized SVG for use in code
cp "/Users/avolve/Downloads/avolve logo.svg" public/logo.svg

# Optimize it
brew install svgo
svgo public/logo.svg
```

## Verification Checklist

### Browser Testing

- [ ] Chrome: Check favicon in tab
- [ ] Safari: Check favicon + bookmark icon
- [ ] Firefox: Check favicon
- [ ] iOS Safari: Add to home screen (apple-touch-icon)
- [ ] Android Chrome: Add to home screen (PWA icons)

### Social Media Testing

- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] Facebook Debugger: https://developers.facebook.com/tools/debug/
- [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Search Console

- [ ] Google Search Console: Check structured data
- [ ] Bing Webmaster Tools: Check appearance

## File Sizes Budget

```
favicon.ico:          < 15KB
favicon-*.png:        < 5KB each
apple-touch-icon.png: < 20KB
og-image.png:         < 100KB
og-image-square.png:  < 100KB
icon-192.png:         < 30KB
icon-512.png:         < 80KB
```

## Next Steps

1. Process SVG using ImageMagick commands above
2. Update `src/app/layout.tsx` with metadata
3. Create `public/manifest.json`
4. Test favicons in multiple browsers
5. Validate Open Graph with social media tools
6. Optimize PNGs if over size budget

## Modern Standards (Oct 2025)

### What's Required

- ✅ `favicon.ico` (32x32) - Still needed for legacy
- ✅ `apple-touch-icon.png` (180x180) - iOS
- ✅ `og-image.png` (1200x630) - Social sharing
- ✅ PWA icons (192, 512) - Progressive Web App

### What's Optional

- SVG favicon (not widely supported yet)
- Multiple ICO sizes (modern browsers use PNG)
- Windows tile images (less common)

### What's Deprecated

- Apple touch icons in multiple sizes (180x180 is enough)
- Android chrome icons < 192px (not used)
- IE-specific meta tags (IE is dead)

## Troubleshooting

### Favicon not updating?

```bash
# Hard refresh in browser
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)

# Clear cache
# Or append ?v=2 to favicon URLs during development
```

### OG image not showing?

- Check HTTPS (required for Open Graph)
- Verify image is publicly accessible
- Use absolute URLs, not relative
- Wait 24h for cache to clear

### PWA icons not appearing?

- Check manifest.json is valid JSON
- Verify manifest is served with correct MIME type
- Icons must be in /public directory
- Must use HTTPS in production
