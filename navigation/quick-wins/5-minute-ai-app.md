# 5-Minute AI App: Chat Interface with Vercel AI SDK

Build a working AI chat application in under 5 minutes to validate the modern tech stack.

## Prerequisites (1 minute)
- Node.js 24+ installed
- OpenAI API key (free tier works)
- Terminal access

## Implementation (4 minutes)

### Step 1: Project Setup (60 seconds)
```bash
# Create new Next.js app with AI template
npx create-next-app@latest ai-chat-demo --typescript --tailwind --app --src-dir --import-alias "@/*"
cd ai-chat-demo

# Install AI SDK
npm install ai @ai-sdk/openai
```

### Step 2: Environment Configuration (30 seconds)
```bash
# Create environment file
echo "OPENAI_API_KEY=your_api_key_here" > .env.local
```

### Step 3: API Route (90 seconds)
```typescript
// src/app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Step 4: Chat Interface (60 seconds)
```tsx
// src/app/page.tsx
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4 mb-4">
        {messages.map(m => (
          <div key={m.id} className={`p-3 rounded ${
            m.role === 'user' ? 'bg-blue-100 ml-auto max-w-xs' : 'bg-gray-100'
          }`}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-1 p-2 border rounded-l"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

### Step 5: Run and Test (30 seconds)
```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Type a message and see AI response streaming in real-time
```

## What You Just Built

### Technical Components Demonstrated
- **Next.js 15**: App Router with TypeScript
- **Vercel AI SDK**: Streaming AI responses
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: `useChat` for state management

### Architecture Patterns Shown
- **API Routes**: Serverless function handling
- **Streaming**: Real-time response chunks
- **Client State**: Automatic message management
- **Error Handling**: Built-in retry logic

## Immediate Enhancements (Optional +5 minutes each)

### Add Message History Persistence
```typescript
// Update useChat hook
const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
  initialMessages: [], // Could load from localStorage
  onFinish: (message) => {
    // Save to localStorage or database
    localStorage.setItem('chat-history', JSON.stringify(messages));
  }
});
```

### Add Different AI Models
```typescript
// src/app/api/chat/route.ts - Add model selection
const { messages, model = 'gpt-3.5-turbo' } = await req.json();

const result = await streamText({
  model: openai(model), // Allow gpt-4, gpt-3.5-turbo, etc.
  messages,
});
```

### Add Typing Indicators
```typescript
// Update chat interface
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

// Add loading state to UI
{isLoading && (
  <div className="bg-gray-100 p-3 rounded animate-pulse">
    AI is typing...
  </div>
)}
```

## Learning Outcomes

### Immediate Understanding
- **Vercel AI SDK**: How streaming responses work
- **Next.js API Routes**: Serverless function patterns
- **React Hooks**: State management for AI interactions
- **Modern CSS**: Tailwind utility classes

### Architectural Insights
- **Client-Server Communication**: Real-time data flow
- **Error Boundaries**: Graceful failure handling
- **Performance**: Streaming vs batch responses
- **User Experience**: Loading states and feedback

## Next Steps

### If This Felt Easy (Beginner → Intermediate)
1. **Add Authentication**: Implement user sessions
2. **Add Database**: Store conversation history
3. **Add File Upload**: Enable document chat
4. **Deploy**: Push to Vercel in 30 seconds

### If This Felt Complex (Need Foundation)
1. **React Basics**: Complete React tutorial first
2. **TypeScript Primer**: Understand type safety benefits
3. **Next.js Fundamentals**: Learn App Router patterns
4. **API Design**: Understand REST and streaming

### If This Felt Trivial (Intermediate → Advanced)
1. **Multi-Modal**: Add image and voice inputs
2. **Function Calling**: Connect AI to external APIs
3. **RAG Implementation**: Add vector search
4. **Production Hardening**: Add rate limiting, auth, monitoring

## Troubleshooting

### Common Issues (30-second fixes)

**"Cannot find module 'ai'"**
```bash
# Ensure AI SDK is installed
npm install ai @ai-sdk/openai
```

**"Invalid API key"**
```bash
# Check environment file
cat .env.local
# Ensure no spaces around = sign
```

**"Network error"**
```bash
# Check if dev server is running
npm run dev
# Verify port 3000 is accessible
```

**"TypeScript errors"**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Cost Analysis

### Development Cost: $0
- Next.js: Free
- Vercel AI SDK: Free
- Local development: Free

### Production Cost: ~$5-20/month
- Vercel hosting: $0 (hobby) to $20/month (pro)
- OpenAI API: $0.002/1K tokens (~$5/month for moderate usage)
- Domain: ~$10/year

### Scaling Cost: Linear
- API calls scale with usage
- Hosting scales automatically
- No infrastructure management

## Success Metrics

✅ **Chat interface loads without errors**
✅ **AI responds to user messages**
✅ **Responses stream in real-time**
✅ **Multiple exchanges work**
✅ **Mobile-responsive design**

If all boxes check, you've successfully validated:
- Modern development tooling
- AI integration patterns
- Real-time web applications
- Production deployment readiness

---

**Time invested**: 5 minutes
**Knowledge gained**: Foundation for AI-native development
**Next milestone**: Production deployment in 5 more minutes

*This quick win demonstrates the power of modern tooling - what used to take days now takes minutes.*