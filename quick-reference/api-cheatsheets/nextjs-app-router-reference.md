---
title: "Next.js App Router API Reference"
technology: "nextjs"
version: "15.5"
status: "current"
confidence: "high"
last_updated: "2025-09-21"
document_type: "api_reference"
purpose: "Quick reference for Next.js App Router APIs and patterns"
---

# 🚀 Next.js App Router API Reference

**Version**: Next.js 15.5
**Focus**: Most commonly used APIs and patterns
**Last Updated**: September 21, 2025

---

## 📁 File-Based Routing

### Basic Routes
```typescript
// app/page.tsx - Home page
export default function Page() {
  return <h1>Home</h1>;
}

// app/about/page.tsx - /about
export default function AboutPage() {
  return <h1>About</h1>;
}

// app/blog/[slug]/page.tsx - /blog/my-post
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}
```

### Dynamic Routes
```typescript
// app/products/[id]/page.tsx
interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Product({ params, searchParams }: Props) {
  return (
    <div>
      <h1>Product {params.id}</h1>
      <p>Category: {searchParams.category}</p>
    </div>
  );
}

// app/shop/[...slug]/page.tsx - Catch-all routes
export default function Shop({ params }: { params: { slug: string[] } }) {
  return <h1>Path: {params.slug.join('/')}</h1>;
}
```

---

## 🎯 Server Components & Actions

### Server Components (Default)
```typescript
// app/posts/page.tsx - Server Component
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Default in Next.js 15+
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Server Actions
```typescript
// app/contact/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function createContact(formData: FormData) {
  'use server'; // Server Action

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Database operation
  await db.contacts.create({ name, email });

  // Revalidate and redirect
  revalidatePath('/contacts');
  redirect('/contact/success');
}

export default function Contact() {
  return (
    <form action={createContact}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Client Components
```typescript
'use client'; // Mark as Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## 🛣️ Navigation & Links

### Link Component
```typescript
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link href="/about">About</Link>

      {/* Dynamic link */}
      <Link href={`/posts/${postId}`}>Read Post</Link>

      {/* With query parameters */}
      <Link href={{
        pathname: '/search',
        query: { q: 'nextjs', category: 'tutorials' }
      }}>
        Search Results
      </Link>

      {/* External link */}
      <Link href="https://example.com" target="_blank">
        External Link
      </Link>
    </nav>
  );
}
```

### Programmatic Navigation
```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const handleNavigation = () => {
    // Push new route
    router.push('/dashboard');

    // Replace current route
    router.replace('/login');

    // Go back
    router.back();

    // Refresh current route
    router.refresh();
  };

  return <button onClick={handleNavigation}>Navigate</button>;
}
```

---

## 📊 Data Fetching

### Fetch with Caching
```typescript
// Force cache (default in Next.js 15+)
const staticData = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
});

// No cache
const dynamicData = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Revalidate every hour
const revalidatedData = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
});

// Revalidate with tag
const taggedData = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] }
});
```

### Loading & Error States
```typescript
// app/posts/loading.tsx - Loading UI
export default function Loading() {
  return <div className="animate-pulse">Loading posts...</div>;
}

// app/posts/error.tsx - Error UI
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/posts/not-found.tsx - 404 UI
export default function NotFound() {
  return (
    <div>
      <h2>Posts Not Found</h2>
      <p>Could not find the requested posts.</p>
    </div>
  );
}
```

---

## 🎨 Layouts & Templates

### Root Layout
```typescript
// app/layout.tsx - Root layout (required)
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'My awesome Next.js app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Header content</nav>
        </header>
        <main>{children}</main>
        <footer>Footer content</footer>
      </body>
    </html>
  );
}
```

### Nested Layouts
```typescript
// app/dashboard/layout.tsx - Nested layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <aside>Dashboard sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

### Template (Recreated on Navigation)
```typescript
// app/template.tsx - Recreates on every navigation
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-wrapper">{children}</div>;
}
```

---

## 🔧 API Routes

### Basic API Route
```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '10';

  const posts = await fetchPosts(parseInt(limit));

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newPost = await createPost(body);

  return NextResponse.json(newPost, { status: 201 });
}
```

### Dynamic API Routes
```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await deletePost(params.id);

  return NextResponse.json({ success: true });
}
```

---

## 🔄 Middleware

### Basic Middleware
```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'my-value');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Advanced Middleware Patterns
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  // Geographic redirection
  const country = request.geo?.country;
  if (country === 'GB' && !request.nextUrl.pathname.startsWith('/uk')) {
    return NextResponse.redirect(new URL('/uk', request.url));
  }

  // A/B testing
  const bucket = request.cookies.get('bucket')?.value ??
    (Math.random() > 0.5 ? 'a' : 'b');

  const response = NextResponse.next();
  response.cookies.set('bucket', bucket);

  return response;
}
```

---

## 🎯 Metadata & SEO

### Static Metadata
```typescript
// app/about/page.tsx
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  keywords: ['about', 'company', 'team'],
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/og-about.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/twitter-about.jpg'],
  },
};
```

### Dynamic Metadata
```typescript
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}
```

---

## ⚡ Performance Optimizations

### Image Optimization
```typescript
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      {/* Optimized image */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
        priority // Load immediately
      />

      {/* Lazy loaded image */}
      <Image
        src="/gallery-1.jpg"
        alt="Gallery image"
        width={400}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  );
}
```

### Font Optimization
```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Script Optimization
```typescript
import Script from 'next/script';

export default function Page() {
  return (
    <div>
      {/* Load after page is interactive */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        strategy="afterInteractive"
      />

      {/* Load before page is interactive */}
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_TRACKING_ID');
        `}
      </Script>
    </div>
  );
}
```

---

## 🔧 Configuration

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    serverActions: true,
    ppr: 'incremental'
  },

  // Image domains
  images: {
    domains: ['example.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🚨 Common Patterns & Gotchas

### Error Handling
```typescript
// Server Component error handling
async function getData() {
  try {
    const res = await fetch('https://api.example.com/data');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Client Component error boundary
'use client';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function MyApp() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Streaming & Suspense
```typescript
import { Suspense } from 'react';

// Slow component
async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Loaded slow content!</div>;
}

// Fast component
function FastComponent() {
  return <div>Fast content loaded immediately</div>;
}

export default function Page() {
  return (
    <div>
      <FastComponent />
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

---

*Reference updated for Next.js 15.5 - September 21, 2025*