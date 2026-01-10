# Avolve Project Brain - Implementation Plan

> A comprehensive knowledge management system for solopreneurs, organized by C-Suite roles.

## Overview

The Project Brain transforms Avolve from a content platform into an intelligent knowledge system where:
- Users ingest sources (files, URLs, notes, conversations)
- Content is chunked and embedded for semantic search
- Entities (people, projects, tools, concepts) are extracted
- Relationships form a knowledge graph
- Claude assists with retrieval, synthesis, and insight generation

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │   Next.js   │ │    Expo     │ │  C-Suite UI │ │  Chat UI    │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          API LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │             Next.js API Routes / tRPC                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │ Ingest   │ │ Search   │ │ Entities │ │ Conversations │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        PROCESSING LAYER                              │
│  ┌────────────────────┐ ┌────────────────────────────────────────┐ │
│  │   Edge Functions   │ │           AI Services                   │ │
│  │ ┌────────────────┐ │ │ ┌─────────────┐ ┌───────────────────┐ │ │
│  │ │ embed-content  │ │ │ │  OpenAI     │ │  Claude (Vercel)  │ │ │
│  │ │ process-source │ │ │ │ (Embeddings)│ │ (Chat/Extraction) │ │ │
│  │ │ extract-entity │ │ │ └─────────────┘ └───────────────────┘ │ │
│  │ └────────────────┘ │ └────────────────────────────────────────┘ │
│  └────────────────────┘                                             │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Supabase + pgvector                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │ Sources  │ │ Chunks   │ │ Entities │ │ Relationships │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  │              ┌──────────────────────────┐                    │   │
│  │              │     Storage (Files)      │                    │   │
│  │              └──────────────────────────┘                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## C-Suite Knowledge Domains

Each domain has specialized knowledge categories:

| Domain | Role | Knowledge Focus |
|--------|------|-----------------|
| **CEO** | Focus/Cockpit | Vision, strategy, OKRs, leadership, decision frameworks |
| **CMO** | Users/Engines | Marketing, sales, funnels, customer insights, positioning |
| **CVO** | Value/Wings | Products, services, value propositions, delivery |
| **COO** | Admin/Body | Operations, systems, processes, SOPs, workflows |
| **CFO** | Funds/Fuel | Finance, metrics, cash flow, pricing, projections |

## Implementation Phases

### Phase 1: Core Infrastructure (This Sprint)

**Files to Create:**

```
packages/app/
├── features/brain/
│   ├── index.ts
│   ├── types.ts                    # TypeScript types for brain entities
│   ├── hooks/
│   │   ├── useKnowledgeSources.ts  # CRUD for sources
│   │   ├── useKnowledgeSearch.ts   # Semantic + hybrid search
│   │   ├── useEntities.ts          # Entity management
│   │   └── useBrainChat.ts         # Claude conversations
│   ├── components/
│   │   ├── SourceUploader.tsx      # File/URL upload
│   │   ├── SourceList.tsx          # List of sources
│   │   ├── EntityCard.tsx          # Display entity
│   │   └── KnowledgeGraph.tsx      # Visualization (later)
│   └── utils/
│       ├── chunking.ts             # Text chunking strategies
│       └── embedding.ts            # Client-side embedding helpers

supabase/
├── functions/
│   ├── embed-content/              # Generate embeddings
│   │   └── index.ts
│   ├── process-source/             # Process uploaded sources
│   │   └── index.ts
│   └── extract-entities/           # AI entity extraction
│       └── index.ts

apps/next/
├── pages/api/
│   └── brain/
│       ├── sources.ts              # Source management API
│       ├── search.ts               # Search API
│       ├── entities.ts             # Entity API
│       └── chat.ts                 # Claude chat API
```

**Key Tasks:**

1. **Schema Applied** ✅
   - Migration file: `20260107000000_project_brain.sql`
   - Run: `supabase db push` or `supabase migration up`

2. **TypeScript Types**
   - Generate from schema
   - Add to `supabase/types.ts`

3. **Edge Function: Embeddings**
   ```typescript
   // supabase/functions/embed-content/index.ts
   // Uses OpenAI text-embedding-3-small (1536 dims)
   // Processes embedding_queue table
   ```

4. **Edge Function: Source Processing**
   ```typescript
   // supabase/functions/process-source/index.ts
   // Chunks content, queues embeddings, extracts entities
   ```

5. **API Routes**
   - POST /api/brain/sources - Upload/ingest
   - GET /api/brain/search - Semantic search
   - CRUD /api/brain/entities

6. **React Hooks**
   - `useKnowledgeSources()` - TanStack Query for sources
   - `useKnowledgeSearch()` - Debounced search hook
   - `useEntities()` - Entity management

### Phase 2: Retrieval & Claude Integration

**Key Tasks:**

1. **RAG Pipeline**
   - Retrieve relevant chunks
   - Build context window
   - Generate response with Claude

2. **Chat Interface**
   - Per-domain chat (CEO, CMO, etc.)
   - Context-aware responses
   - Citation of sources

3. **Entity Extraction Pipeline**
   - Claude extracts entities from chunks
   - Creates relationships automatically
   - Human verification flow

4. **Vercel AI SDK Integration**
   ```typescript
   // Using streamText from ai package
   import { streamText } from 'ai'
   import { anthropic } from '@ai-sdk/anthropic'
   ```

### Phase 3: C-Suite Knowledge UI

**Key Tasks:**

1. **Brain Tab in Each C-Suite Screen**
   - Add "Knowledge" section to CEOScreen, CMOScreen, etc.
   - Domain-filtered views
   - Quick search within domain

2. **Source Management UI**
   - Upload files (drag & drop)
   - Add URLs (paste)
   - Create notes (markdown editor)
   - View processing status

3. **Entity Browser**
   - Browse by type (people, projects, tools)
   - Filter by domain
   - View relationships

4. **Knowledge Graph Visualization**
   - D3.js or vis.js graph
   - Interactive exploration
   - Filter by domain

5. **Chat Integration**
   - Chat panel in each C-Suite screen
   - "Ask about your [CEO/CMO/etc.] knowledge"
   - Citations to sources

## File Structure After Implementation

```
packages/app/features/brain/
├── index.ts
├── types.ts
├── hooks/
│   ├── index.ts
│   ├── useKnowledgeSources.ts
│   ├── useKnowledgeSearch.ts
│   ├── useEntities.ts
│   ├── useEntityGraph.ts
│   └── useBrainChat.ts
├── components/
│   ├── index.ts
│   ├── SourceUploader.tsx
│   ├── SourceCard.tsx
│   ├── SourceList.tsx
│   ├── EntityCard.tsx
│   ├── EntityList.tsx
│   ├── EntityBrowser.tsx
│   ├── KnowledgeGraph.tsx
│   ├── KnowledgeSearch.tsx
│   ├── BrainChat.tsx
│   └── DomainKnowledgePanel.tsx
├── screens/
│   ├── BrainOverviewScreen.tsx
│   ├── SourcesScreen.tsx
│   ├── EntitiesScreen.tsx
│   └── GraphScreen.tsx
└── utils/
    ├── chunking.ts
    ├── embedding.ts
    └── citation.ts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/brain/sources | Create source (upload) |
| GET | /api/brain/sources | List sources |
| GET | /api/brain/sources/:id | Get source details |
| DELETE | /api/brain/sources/:id | Delete source |
| POST | /api/brain/search | Semantic/hybrid search |
| GET | /api/brain/entities | List entities |
| GET | /api/brain/entities/:id | Get entity with graph |
| POST | /api/brain/entities/:id/verify | Verify AI-extracted entity |
| POST | /api/brain/chat | Send message to Claude |
| GET | /api/brain/conversations | List conversations |
| GET | /api/brain/conversations/:id | Get conversation |

## Data Flow

### Ingestion Flow

```
User uploads file
       │
       ▼
┌──────────────────┐
│  POST /sources   │
│  (API Route)     │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Upload to       │
│  Supabase Storage│
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Insert source   │
│  (status=pending)│
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Trigger Edge    │
│  Function        │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  process-source  │
│  Edge Function   │
└──────────────────┘
       │
       ├──────────────────────┐
       ▼                      ▼
┌──────────────────┐   ┌──────────────────┐
│  Chunk content   │   │  Extract entities│
└──────────────────┘   └──────────────────┘
       │                      │
       ▼                      ▼
┌──────────────────┐   ┌──────────────────┐
│  Queue embeddings│   │  Store entities  │
└──────────────────┘   └──────────────────┘
       │
       ▼
┌──────────────────┐
│  embed-content   │
│  (cron job)      │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Store embeddings│
│  in chunks table │
└──────────────────┘
```

### Search Flow

```
User searches "marketing strategy"
       │
       ▼
┌──────────────────┐
│  POST /search    │
│  { query, domain}│
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Generate query  │
│  embedding       │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  hybrid_search   │
│  (SQL function)  │
└──────────────────┘
       │
       ├──────────────────────┐
       ▼                      ▼
┌──────────────────┐   ┌──────────────────┐
│  Semantic search │   │  Keyword search  │
│  (pgvector)      │   │  (tsvector)      │
└──────────────────┘   └──────────────────┘
       │                      │
       └──────────┬───────────┘
                  ▼
       ┌──────────────────┐
       │  Rank & combine  │
       │  results         │
       └──────────────────┘
                  │
                  ▼
       ┌──────────────────┐
       │  Return chunks   │
       │  with metadata   │
       └──────────────────┘
```

## Technology Choices

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Embeddings** | OpenAI text-embedding-3-small | Best quality/cost ratio, 1536 dims |
| **Vector DB** | Supabase pgvector | Already using Supabase, HNSW indexes |
| **Chat** | Claude via Vercel AI SDK | Best reasoning, already integrated |
| **Chunking** | Semantic chunking | Better than fixed-size for retrieval |
| **Graph** | PostgreSQL relations | Simple, no extra infra needed |
| **Queue** | pgmq + pg_cron | Native Postgres, no external queue |
| **Storage** | Supabase Storage | Already using, integrated with RLS |

## Security Considerations

1. **Row Level Security**: All tables have RLS policies
2. **File Validation**: Check MIME types, scan for malware
3. **Rate Limiting**: Limit uploads and API calls per user/tier
4. **Content Filtering**: Don't embed/store sensitive PII
5. **Tier Gating**: Different limits per subscription tier

## Tier-Based Limits

| Feature | Individual VIP | Collective PRO | Ecosystem CEO |
|---------|----------------|----------------|---------------|
| Sources | 100 | 1,000 | Unlimited |
| Storage | 1 GB | 10 GB | 100 GB |
| Chunks | 10,000 | 100,000 | Unlimited |
| Entities | 1,000 | 10,000 | Unlimited |
| Chat msgs/day | 50 | 500 | Unlimited |
| Graph depth | 2 | 3 | 5 |

## Success Metrics

1. **Ingestion**: Sources processed in <30s
2. **Search**: Results returned in <500ms
3. **Chat**: First token in <1s
4. **Accuracy**: >80% relevant results in top 5
5. **Entity Quality**: >70% verified by users

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1 | 2-3 days | Schema, Edge Functions, Basic API |
| Phase 2 | 2-3 days | RAG pipeline, Chat integration |
| Phase 3 | 3-5 days | Full UI, Graph visualization |

---

*Document created: January 7, 2026*
*Last updated: January 7, 2026*
