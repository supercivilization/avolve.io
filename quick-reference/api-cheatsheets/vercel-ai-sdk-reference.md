---
title: "Vercel AI SDK 5.0 API Reference"
technology: "ai_sdk"
version: "5.0.48"
status: "current"
confidence: "high"
last_updated: "2025-09-21"
document_type: "api_reference"
purpose: "Complete reference for Vercel AI SDK methods and patterns"
---

# 🤖 Vercel AI SDK 5.0 API Reference

**Version**: AI SDK 5.0.48
**Focus**: Complete method reference with examples
**Last Updated**: September 21, 2025

---

## 🚀 Core Generation Functions

### generateText()
**Purpose**: Generate text completion with any model
**Use Case**: Simple text generation, content creation, one-shot responses

```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Explain quantum computing in simple terms',
  maxTokens: 500,
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
  seed: 123, // For reproducible results
  maxRetries: 3,
  abortSignal: AbortSignal.timeout(30000)
});

console.log(result.text);
console.log(result.usage); // Token usage stats
console.log(result.finishReason); // Why generation stopped
```

### generateObject()
**Purpose**: Generate structured JSON objects with schema validation
**Use Case**: Form data extraction, API responses, structured content

```typescript
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
  })
});

const result = await generateObject({
  model: openai('gpt-4o'),
  schema,
  prompt: 'Create a fictional character profile for a 30-year-old software engineer from Berlin',
  temperature: 0.3
});

// Fully typed object
console.log(result.object.name); // string
console.log(result.object.age); // number
console.log(result.object.hobbies); // string[]
```

### streamText()
**Purpose**: Stream text generation in real-time
**Use Case**: Chat interfaces, live content generation, progressive responses

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const stream = await streamText({
  model: openai('gpt-4o'),
  prompt: 'Write a detailed explanation of machine learning',
  maxTokens: 1000,
  temperature: 0.7
});

// Stream handling
for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

// Or collect full result
const result = await stream.response;
console.log(result.text);
console.log(result.usage);
```

### streamObject()
**Purpose**: Stream structured object generation
**Use Case**: Real-time form filling, progressive data extraction

```typescript
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  content: z.object({
    introduction: z.string(),
    mainPoints: z.array(z.string()),
    conclusion: z.string()
  })
});

const stream = await streamObject({
  model: openai('gpt-4o'),
  schema,
  prompt: 'Create a blog post about sustainable web development'
});

// Stream partial objects
for await (const partialObject of stream.partialObjectStream) {
  console.log('Partial:', partialObject);
}

// Get final complete object
const result = await stream.response;
console.log('Final:', result.object);
```

---

## 💬 Chat & Conversation

### generateText() with Messages
**Purpose**: Multi-turn conversations with message history
**Use Case**: Chatbots, assistants, context-aware responses

```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    {
      role: 'system',
      content: 'You are a helpful coding assistant specialized in React and TypeScript.'
    },
    {
      role: 'user',
      content: 'How do I create a custom hook for data fetching?'
    },
    {
      role: 'assistant',
      content: 'I can help you create a custom hook for data fetching. Here\'s a basic example...'
    },
    {
      role: 'user',
      content: 'Can you add error handling to this hook?'
    }
  ],
  maxTokens: 1000
});

console.log(result.text);
```

### streamText() with Messages
**Purpose**: Real-time chat streaming
**Use Case**: Live chat applications, interactive assistants

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const stream = await streamText({
  model: openai('gpt-4o'),
  messages: [
    { role: 'system', content: 'You are a friendly AI assistant.' },
    { role: 'user', content: 'Tell me about the latest in AI development' }
  ],
  temperature: 0.7
});

// Real-time streaming
for await (const chunk of stream.textStream) {
  // Send chunk to client via WebSocket/SSE
  websocket.send(chunk);
}
```

---

## 🛠️ Tool Calling & Function Execution

### generateText() with Tools
**Purpose**: AI function calling and tool execution
**Use Case**: AI agents, automated workflows, external integrations

```typescript
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define tools
const weatherTool = tool({
  description: 'Get current weather for a location',
  parameters: z.object({
    location: z.string().describe('The city and country, e.g. "San Francisco, CA"')
  }),
  execute: async ({ location }) => {
    // Your weather API call here
    const weather = await getWeatherData(location);
    return { temperature: weather.temp, condition: weather.condition };
  }
});

const calculatorTool = tool({
  description: 'Perform mathematical calculations',
  parameters: z.object({
    expression: z.string().describe('Mathematical expression to evaluate')
  }),
  execute: async ({ expression }) => {
    // Safe math evaluation
    return { result: evaluateExpression(expression) };
  }
});

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'What\'s the weather like in Tokyo and what\'s 15 * 23?',
  tools: {
    getWeather: weatherTool,
    calculate: calculatorTool
  },
  maxToolRoundtrips: 3
});

console.log(result.text);
console.log(result.toolCalls); // Array of tool calls made
console.log(result.toolResults); // Results from tool executions
```

### streamText() with Tools
**Purpose**: Real-time tool calling with streaming
**Use Case**: Interactive agents, live tool execution

```typescript
import { streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';

const stream = await streamText({
  model: openai('gpt-4o'),
  prompt: 'Help me analyze this data and create a summary',
  tools: {
    analyzeData: tool({
      description: 'Analyze data and return insights',
      parameters: z.object({
        data: z.string(),
        analysisType: z.enum(['statistical', 'trends', 'anomalies'])
      }),
      execute: async ({ data, analysisType }) => {
        return await performDataAnalysis(data, analysisType);
      }
    })
  }
});

// Stream text with tool calls
for await (const chunk of stream.fullStream) {
  if (chunk.type === 'text-delta') {
    console.log('Text:', chunk.textDelta);
  } else if (chunk.type === 'tool-call') {
    console.log('Tool call:', chunk.toolName, chunk.args);
  } else if (chunk.type === 'tool-result') {
    console.log('Tool result:', chunk.result);
  }
}
```

---

## 🎨 UI Generation & Streaming Components

### streamUI()
**Purpose**: Stream React components with dynamic content
**Use Case**: Generative UI, dynamic dashboards, interactive content

```typescript
import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define UI tools
const showWeather = tool({
  description: 'Display weather information',
  parameters: z.object({
    location: z.string(),
    temperature: z.number(),
    condition: z.string()
  }),
  generate: async ({ location, temperature, condition }) => (
    <div className="weather-card">
      <h3>{location}</h3>
      <div className="temp">{temperature}°C</div>
      <div className="condition">{condition}</div>
    </div>
  )
});

const showChart = tool({
  description: 'Display a data chart',
  parameters: z.object({
    data: z.array(z.object({
      label: z.string(),
      value: z.number()
    })),
    type: z.enum(['bar', 'line', 'pie'])
  }),
  generate: async ({ data, type }) => (
    <Chart data={data} type={type} />
  )
});

const result = await streamUI({
  model: openai('gpt-4o'),
  prompt: 'Show me the weather in Paris and a chart of monthly sales',
  text: ({ content }) => <div>{content}</div>,
  tools: {
    showWeather,
    showChart
  }
});

// Render in React component
return <div>{result.value}</div>;
```

### generateUI() (Static)
**Purpose**: Generate complete UI components
**Use Case**: One-shot UI generation, static components

```typescript
import { experimental_generateUI as generateUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';

const ui = await generateUI({
  model: openai('gpt-4o'),
  prompt: 'Create a user profile card for John Doe, age 30, software engineer',
  text: ({ content }) => <p>{content}</p>,
  tools: {
    createProfileCard: tool({
      description: 'Create a user profile card',
      parameters: z.object({
        name: z.string(),
        age: z.number(),
        profession: z.string(),
        avatar: z.string().optional()
      }),
      generate: async ({ name, age, profession, avatar }) => (
        <div className="profile-card">
          {avatar && <img src={avatar} alt={name} />}
          <h2>{name}</h2>
          <p>Age: {age}</p>
          <p>Profession: {profession}</p>
        </div>
      )
    })
  }
});

return ui.value;
```

---

## 📁 Embeddings & Vector Operations

### embed()
**Purpose**: Generate embeddings for text
**Use Case**: Vector search, semantic similarity, RAG systems

```typescript
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

// Single text embedding
const result = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'The quick brown fox jumps over the lazy dog'
});

console.log(result.embedding); // number[]
console.log(result.usage); // Token usage

// Multiple text embeddings
const multiResult = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: [
    'First document content',
    'Second document content',
    'Third document content'
  ]
});

console.log(multiResult.embeddings); // number[][]
```

### embedMany()
**Purpose**: Efficient batch embedding generation
**Use Case**: Large document processing, bulk vector creation

```typescript
import { embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';

const documents = [
  'Introduction to machine learning',
  'Deep learning fundamentals',
  'Natural language processing basics',
  'Computer vision techniques',
  'Reinforcement learning concepts'
];

const result = await embedMany({
  model: openai.embedding('text-embedding-3-small'),
  values: documents
});

// Store in vector database
for (let i = 0; i < documents.length; i++) {
  await vectorDB.store({
    text: documents[i],
    embedding: result.embeddings[i],
    id: `doc_${i}`
  });
}
```

---

## 🔄 React Integration Hooks

### useChat()
**Purpose**: Complete chat interface with React state management
**Use Case**: Chat applications, customer support, AI assistants

```typescript
'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    append,
    setMessages
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Hello! How can I help you today?' }
    ],
    onResponse: (response) => {
      console.log('Response received:', response);
    },
    onFinish: (message) => {
      console.log('Message finished:', message);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  return (
    <div className="chat-container">
      {/* Messages */}
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.role}`}
          >
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        {isLoading && (
          <button type="button" onClick={stop}>
            Stop
          </button>
        )}
      </form>

      {/* Error handling */}
      {error && (
        <div className="error">
          Error: {error.message}
          <button onClick={reload}>Retry</button>
        </div>
      )}
    </div>
  );
}
```

### useCompletion()
**Purpose**: Text completion with React state
**Use Case**: Writing assistants, auto-complete, content generation

```typescript
'use client';

import { useCompletion } from 'ai/react';

export default function CompletionComponent() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setCompletion
  } = useCompletion({
    api: '/api/completion',
    onResponse: (response) => {
      console.log('Completion started');
    },
    onFinish: (prompt, completion) => {
      console.log('Completion finished:', completion);
    }
  });

  return (
    <div className="completion-container">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Start writing..."
          rows={4}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Complete'}
        </button>
        {isLoading && (
          <button type="button" onClick={stop}>
            Stop
          </button>
        )}
      </form>

      {completion && (
        <div className="completion-result">
          <h3>Generated Completion:</h3>
          <div className="completion-text">{completion}</div>
        </div>
      )}

      {error && (
        <div className="error">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
```

### useObject()
**Purpose**: Structured object generation with React state
**Use Case**: Form generation, data extraction, structured content

```typescript
'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  metadata: z.object({
    author: z.string(),
    createdAt: z.string(),
    category: z.string()
  })
});

export default function ObjectComponent() {
  const {
    object,
    submit,
    isLoading,
    error,
    stop
  } = useObject({
    api: '/api/object',
    schema
  });

  const handleGenerate = () => {
    submit('Generate a blog post about sustainable web development');
  };

  return (
    <div className="object-container">
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Object'}
      </button>

      {isLoading && (
        <button onClick={stop}>Stop</button>
      )}

      {object && (
        <div className="generated-object">
          <h2>{object.title}</h2>
          <p>{object.description}</p>

          <div className="tags">
            {object.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          {object.metadata && (
            <div className="metadata">
              <p>Author: {object.metadata.author}</p>
              <p>Created: {object.metadata.createdAt}</p>
              <p>Category: {object.metadata.category}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="error">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
```

---

## 🌐 API Route Handlers

### Chat API Route
**Purpose**: Backend chat endpoint
**Use Case**: Server-side chat processing

```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    maxTokens: 1000,
    temperature: 0.7
  });

  return result.toDataStreamResponse();
}
```

### Completion API Route
**Purpose**: Text completion endpoint
**Use Case**: Writing assistance, auto-complete

```typescript
// app/api/completion/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    prompt,
    maxTokens: 500
  });

  return result.toDataStreamResponse();
}
```

### Object Generation API Route
**Purpose**: Structured object generation endpoint
**Use Case**: Form data, structured responses

```typescript
// app/api/object/route.ts
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string())
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema,
    prompt
  });

  return result.toDataStreamResponse();
}
```

---

## 🔧 Configuration & Models

### Model Providers
**Purpose**: Configure different AI model providers
**Use Case**: Multi-model applications, provider switching

```typescript
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { azure } from '@ai-sdk/azure';

// OpenAI models
const gpt4o = openai('gpt-4o');
const gpt4turbo = openai('gpt-4-turbo');
const gpt35turbo = openai('gpt-3.5-turbo');

// Anthropic models
const claude3Sonnet = anthropic('claude-3-sonnet-20240229');
const claude3Opus = anthropic('claude-3-opus-20240229');
const claude3Haiku = anthropic('claude-3-haiku-20240307');

// Google models
const geminiPro = google('models/gemini-pro');
const geminiProVision = google('models/gemini-pro-vision');

// Azure OpenAI
const azureGpt4 = azure('gpt-4');

// Custom configuration
const customOpenAI = openai('gpt-4o', {
  apiKey: process.env.CUSTOM_OPENAI_KEY,
  baseURL: 'https://custom-endpoint.com/v1'
});
```

### Model Settings
**Purpose**: Fine-tune model behavior
**Use Case**: Optimizing for specific use cases

```typescript
// Creative writing
const creativeSettings = {
  temperature: 0.9,
  topP: 0.95,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1
};

// Factual responses
const factualSettings = {
  temperature: 0.1,
  topP: 0.1,
  frequencyPenalty: 0,
  presencePenalty: 0
};

// Code generation
const codeSettings = {
  temperature: 0.2,
  topP: 0.1,
  stop: ['```', '\n\n\n']
};

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Write a creative story about AI',
  ...creativeSettings
});
```

---

## 🚨 Error Handling & Best Practices

### Comprehensive Error Handling
```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

try {
  const result = await generateText({
    model: openai('gpt-4o'),
    prompt: 'Explain quantum computing',
    maxTokens: 500,
    maxRetries: 3,
    abortSignal: AbortSignal.timeout(30000)
  });

  console.log(result.text);
} catch (error) {
  if (error.name === 'AI_APICallError') {
    console.error('API call failed:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Response body:', error.responseBody);
  } else if (error.name === 'AI_InvalidDataError') {
    console.error('Invalid data:', error.message);
  } else if (error.name === 'AbortError') {
    console.error('Request timed out');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Rate Limiting & Retries
```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const generateWithRetry = async (prompt: string, maxAttempts = 3) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await generateText({
        model: openai('gpt-4o'),
        prompt,
        maxRetries: 0 // Handle retries manually
      });
    } catch (error) {
      if (error.statusCode === 429 && attempt < maxAttempts) {
        // Rate limited, wait and retry
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
};
```

### Streaming Error Handling
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const stream = await streamText({
  model: openai('gpt-4o'),
  prompt: 'Write a long story'
});

try {
  for await (const chunk of stream.textStream) {
    process.stdout.write(chunk);
  }
} catch (error) {
  console.error('Streaming error:', error);
  // Handle partial content
  const partialResult = await stream.response;
  console.log('Partial text received:', partialResult.text);
}
```

---

*Reference updated for Vercel AI SDK 5.0.48 - September 21, 2025*