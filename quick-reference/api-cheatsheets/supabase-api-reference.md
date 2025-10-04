---
title: "Supabase API Reference"
technology: "supabase"
version: "2.57.0"
status: "current"
confidence: "high"
last_updated: "2025-09-21"
document_type: "api_reference"
purpose: "Complete reference for Supabase database operations, auth, real-time, and storage"
---

# 🗄️ Supabase API Reference

**Version**: Supabase JS v2.57.0
**Focus**: Database operations, authentication, real-time, storage, and edge functions
**Last Updated**: September 21, 2025

---

## 🚀 Client Initialization

### Basic Client Setup
```typescript
import { createClient } from '@supabase/supabase-js';

// Public client (for client-side operations)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service role client (for server-side operations)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

### Server-Side Rendering (SSR) Setup
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Server Components
export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
```

---

## 📊 Database Operations

### Basic CRUD Operations

#### Select (Read)
```typescript
// Simple select
const { data, error } = await supabase
  .from('users')
  .select('*');

// Select specific columns
const { data, error } = await supabase
  .from('users')
  .select('id, name, email');

// Select with relationships
const { data, error } = await supabase
  .from('users')
  .select(`
    id,
    name,
    email,
    posts (
      id,
      title,
      content
    )
  `);

// Count rows
const { count, error } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true });
```

#### Insert (Create)
```typescript
// Single insert
const { data, error } = await supabase
  .from('users')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  })
  .select();

// Multiple insert
const { data, error } = await supabase
  .from('users')
  .insert([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ])
  .select();

// Upsert (insert or update)
const { data, error } = await supabase
  .from('users')
  .upsert({
    id: 123,
    name: 'Updated Name',
    email: 'updated@example.com'
  })
  .select();
```

#### Update
```typescript
// Update by ID
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Updated Name' })
  .eq('id', 123)
  .select();

// Update multiple rows
const { data, error } = await supabase
  .from('users')
  .update({ active: true })
  .eq('status', 'pending')
  .select();

// Increment/decrement
const { data, error } = await supabase
  .rpc('increment_view_count', { post_id: 123 });
```

#### Delete
```typescript
// Delete by ID
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', 123);

// Delete with conditions
const { error } = await supabase
  .from('users')
  .delete()
  .eq('active', false)
  .lt('last_login', '2023-01-01');
```

### Advanced Filtering

#### Text and Pattern Matching
```typescript
// Text search
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .textSearch('title', 'react OR nextjs');

// Like pattern matching
const { data, error } = await supabase
  .from('users')
  .select('*')
  .like('name', '%John%');

// Case insensitive like
const { data, error } = await supabase
  .from('users')
  .select('*')
  .ilike('email', '%@GMAIL.COM');

// Full text search
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .textSearch('content', 'javascript & framework');
```

#### Numeric and Date Filters
```typescript
// Numeric comparisons
const { data, error } = await supabase
  .from('products')
  .select('*')
  .gte('price', 100)
  .lte('price', 500);

// Date ranges
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .gte('created_at', '2023-01-01')
  .lt('created_at', '2024-01-01');

// Array operations
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .contains('tags', ['javascript', 'react']);

// JSON operations
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('metadata->>city', 'New York');
```

#### Complex Queries
```typescript
// OR conditions
const { data, error } = await supabase
  .from('users')
  .select('*')
  .or('age.gte.18,status.eq.premium');

// Nested conditions
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .or('title.ilike.%react%,content.ilike.%nextjs%')
  .eq('published', true);

// Ordering and pagination
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })
  .range(0, 9); // First 10 items
```

---

## 🔐 Authentication

### Sign Up & Sign In

#### Email/Password Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      first_name: 'John',
      last_name: 'Doe'
    }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
});

// Sign out
const { error } = await supabase.auth.signOut();
```

#### OAuth Providers
```typescript
// GitHub OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback'
  }
});

// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback',
    queryParams: {
      access_type: 'offline',
      prompt: 'consent'
    }
  }
});

// Multiple providers
const providers = ['github', 'google', 'discord', 'twitter'];
```

#### Magic Link & OTP
```typescript
// Magic link
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'http://localhost:3000/auth/callback'
  }
});

// SMS OTP
const { error } = await supabase.auth.signInWithOtp({
  phone: '+1234567890'
});

// Verify OTP
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+1234567890',
  token: '123456',
  type: 'sms'
});
```

### Session Management

#### Getting Current User
```typescript
// Get current session
const { data: { session } } = await supabase.auth.getSession();

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});
```

#### Password Management
```typescript
// Reset password
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  {
    redirectTo: 'http://localhost:3000/auth/reset-password'
  }
);

// Update password
const { error } = await supabase.auth.updateUser({
  password: 'newpassword'
});

// Update user metadata
const { error } = await supabase.auth.updateUser({
  data: {
    first_name: 'Updated Name',
    avatar_url: 'https://example.com/avatar.jpg'
  }
});
```

---

## ⚡ Real-time Subscriptions

### Database Changes
```typescript
// Listen to all changes
const subscription = supabase
  .channel('public:posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Listen to specific events
const subscription = supabase
  .channel('public:posts')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new);
    }
  )
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Updated post:', payload.new);
    }
  )
  .on('postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Deleted post:', payload.old);
    }
  )
  .subscribe();

// Filter by specific columns
const subscription = supabase
  .channel('public:posts:user_id=eq.123')
  .on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'posts',
      filter: 'user_id=eq.123'
    },
    (payload) => {
      console.log('User-specific change:', payload);
    }
  )
  .subscribe();
```

### Presence (Real-time User Tracking)
```typescript
// Track user presence
const channel = supabase.channel('room-1', {
  config: {
    presence: {
      key: user.id
    }
  }
});

// Join the channel
channel
  .on('presence', { event: 'sync' }, () => {
    const newState = channel.presenceState();
    console.log('Presence state synced:', newState);
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('User joined:', key, newPresences);
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('User left:', key, leftPresences);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      // Track user presence
      await channel.track({
        user_id: user.id,
        username: user.email,
        cursor: { x: 0, y: 0 },
        last_seen: new Date().toISOString()
      });
    }
  });

// Update presence
await channel.track({
  cursor: { x: mouseX, y: mouseY },
  typing: true
});

// Unsubscribe
await supabase.removeChannel(channel);
```

### Broadcast (Real-time Messages)
```typescript
// Send broadcast message
const channel = supabase.channel('room-1');

channel
  .on('broadcast', { event: 'cursor-pos' }, (payload) => {
    console.log('Cursor position:', payload);
  })
  .subscribe();

// Send cursor position
await channel.send({
  type: 'broadcast',
  event: 'cursor-pos',
  payload: { x: mouseX, y: mouseY, user: user.id }
});

// Send chat message
await channel.send({
  type: 'broadcast',
  event: 'message',
  payload: {
    message: 'Hello everyone!',
    user: user.id,
    timestamp: new Date().toISOString()
  }
});
```

---

## 📁 Storage Operations

### File Upload
```typescript
// Upload file
const file = event.target.files[0];
const fileExt = file.name.split('.').pop();
const fileName = `${user.id}/${Math.random()}.${fileExt}`;

const { data, error } = await supabase.storage
  .from('avatars')
  .upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  });

// Upload with custom metadata
const { data, error } = await supabase.storage
  .from('documents')
  .upload(fileName, file, {
    metadata: {
      owner: user.id,
      uploadedAt: new Date().toISOString()
    }
  });
```

### File Download & Access
```typescript
// Download file
const { data, error } = await supabase.storage
  .from('avatars')
  .download('user1/avatar.jpg');

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('user1/avatar.jpg');

console.log(data.publicUrl);

// Create signed URL (private access)
const { data, error } = await supabase.storage
  .from('private-docs')
  .createSignedUrl('document.pdf', 60); // Expires in 60 seconds
```

### File Management
```typescript
// List files
const { data, error } = await supabase.storage
  .from('avatars')
  .list('user1/', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  });

// Delete file
const { error } = await supabase.storage
  .from('avatars')
  .remove(['user1/avatar.jpg']);

// Move file
const { data, error } = await supabase.storage
  .from('avatars')
  .move('old-path/avatar.jpg', 'new-path/avatar.jpg');

// Copy file
const { data, error } = await supabase.storage
  .from('avatars')
  .copy('original/avatar.jpg', 'backup/avatar.jpg');
```

---

## 🔄 Remote Procedure Calls (RPC)

### Basic RPC Functions
```typescript
// Call a PostgreSQL function
const { data, error } = await supabase
  .rpc('get_user_stats', {
    user_id: 123
  });

// Function with multiple parameters
const { data, error } = await supabase
  .rpc('calculate_distance', {
    lat1: 40.7128,
    lng1: -74.0060,
    lat2: 34.0522,
    lng2: -118.2437
  });
```

### Example PostgreSQL Functions
```sql
-- User statistics function
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS JSON AS $$
BEGIN
  RETURN (
    SELECT json_build_object(
      'post_count', COUNT(posts.id),
      'total_likes', SUM(posts.likes),
      'avg_rating', AVG(posts.rating)
    )
    FROM posts
    WHERE posts.user_id = get_user_stats.user_id
  );
END;
$$ LANGUAGE plpgsql;

-- Full text search function
CREATE OR REPLACE FUNCTION search_posts(search_term TEXT)
RETURNS TABLE(
  id UUID,
  title TEXT,
  content TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    posts.id,
    posts.title,
    posts.content,
    ts_rank(to_tsvector('english', posts.title || ' ' || posts.content), plainto_tsquery('english', search_term)) as rank
  FROM posts
  WHERE to_tsvector('english', posts.title || ' ' || posts.content) @@ plainto_tsquery('english', search_term)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
```

---

## 🧠 Vector Operations (AI/ML)

### Vector Search
```typescript
// Generate embedding (using OpenAI or similar)
const embedding = await generateEmbedding(searchQuery);

// Vector similarity search
const { data, error } = await supabase
  .rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 10
  });

// Hybrid search (vector + text)
const { data, error } = await supabase
  .rpc('hybrid_search', {
    query_text: 'machine learning',
    query_embedding: embedding,
    match_count: 10
  });
```

### Vector Database Setup
```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table with vector column
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding VECTOR(1536) -- OpenAI ada-002 dimensions
);

-- Create vector index for performance
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE(
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;
```

---

## 🔒 Row Level Security (RLS)

### Basic RLS Policies
```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY "Users can view own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create posts
CREATE POLICY "Users can insert own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);
```

### Advanced RLS Patterns
```sql
-- Role-based access
CREATE POLICY "Admins can see all posts" ON posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Time-based access
CREATE POLICY "Posts are public after publication" ON posts
  FOR SELECT USING (
    published = true AND published_at <= NOW()
  );

-- Conditional access based on user metadata
CREATE POLICY "Premium users see premium content" ON posts
  FOR SELECT USING (
    NOT premium_only OR
    (auth.jwt() ->> 'user_metadata' ->> 'subscription')::text = 'premium'
  );
```

---

## 📊 Advanced Patterns

### Batch Operations
```typescript
// Batch insert with transaction
const { data, error } = await supabase
  .rpc('batch_insert_posts', {
    posts: [
      { title: 'Post 1', content: 'Content 1', user_id: user.id },
      { title: 'Post 2', content: 'Content 2', user_id: user.id },
      { title: 'Post 3', content: 'Content 3', user_id: user.id }
    ]
  });

// Atomic operations
const { data, error } = await supabase
  .rpc('transfer_credits', {
    from_user: user1.id,
    to_user: user2.id,
    amount: 100
  });
```

### Caching Strategies
```typescript
// Client-side caching with SWR
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

function PostsList() {
  const { data: posts, error, mutate } = useSWR('/posts', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 // Cache for 1 minute
  });

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Error Handling Best Practices
```typescript
// Comprehensive error handling
async function createPost(postData: any) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select();

    if (error) {
      // Handle specific Supabase errors
      if (error.code === '23505') {
        throw new Error('Post with this title already exists');
      } else if (error.code === '42501') {
        throw new Error('You do not have permission to create posts');
      } else {
        throw new Error(`Database error: ${error.message}`);
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to create post:', error);
    return { success: false, error: error.message };
  }
}

// Type-safe error handling
interface SupabaseResponse<T> {
  data: T | null;
  error: any;
}

function handleSupabaseResponse<T>(response: SupabaseResponse<T>) {
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data!;
}
```

---

## 🔧 Configuration & Environment

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Custom configurations
SUPABASE_JWT_SECRET=your-jwt-secret
```

### TypeScript Types Generation
```bash
# Generate TypeScript types from your database
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts

# Or from local development
npx supabase gen types typescript --local > types/database.types.ts
```

### Custom Client Configuration
```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    },
    global: {
      headers: {
        'x-my-custom-header': 'my-app-name'
      }
    }
  }
);
```

---

*Reference updated for Supabase JS v2.57.0 - September 21, 2025*