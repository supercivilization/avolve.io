-- ============================================================================
-- AVOLVE PROJECT BRAIN SCHEMA
-- A knowledge graph + vector search system organized by C-Suite roles
-- ============================================================================
--
-- Architecture:
-- 1. Sources → Chunks → Embeddings (semantic search)
-- 2. Entities → Relationships (knowledge graph)
-- 3. Provenance tracking (who created what, human vs AI)
-- 4. C-Suite domains (CEO, CMO, CVO, COO, CFO)
--
-- Jan 7, 2026 - Initial schema
-- ============================================================================

-- Enable required extensions
create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

-- ============================================================================
-- ENUMS
-- ============================================================================

-- C-Suite knowledge domains
create type csuite_domain as enum (
  'ceo',  -- Focus/Cockpit - Strategy, Vision, Leadership
  'cmo',  -- Users/Engines - Marketing, Sales, Customer Acquisition
  'cvo',  -- Value/Wings - Products, Services, Value Creation
  'coo',  -- Admin/Body - Operations, Systems, Processes
  'cfo'   -- Funds/Fuel - Finance, Cash Flow, Metrics
);

-- Source types
create type knowledge_source_type as enum (
  'file',         -- Uploaded documents (PDF, MD, TXT, DOCX)
  'url',          -- Web pages, articles
  'note',         -- Manual notes/entries
  'conversation', -- Chat/conversation transcripts
  'code',         -- Code files, configs
  'image',        -- Images with descriptions
  'audio',        -- Audio transcripts
  'video'         -- Video transcripts
);

-- Entity types (extracted concepts)
create type entity_type as enum (
  'person',       -- People (contacts, team, influencers)
  'company',      -- Companies, organizations
  'project',      -- Projects, initiatives
  'product',      -- Products, services
  'concept',      -- Ideas, frameworks, methodologies
  'tool',         -- Software, tools, technologies
  'metric',       -- KPIs, measurements
  'process',      -- Workflows, SOPs
  'goal',         -- Objectives, OKRs
  'location',     -- Places, regions
  'event',        -- Events, milestones
  'resource'      -- General resources
);

-- Relationship types
create type relationship_type as enum (
  'owns',           -- Person/Company owns Project/Product
  'created_by',     -- Entity created by Person
  'depends_on',     -- Project depends on Resource/Tool
  'related_to',     -- General relationship
  'part_of',        -- Entity is part of another
  'references',     -- Entity references another
  'competes_with',  -- Competitive relationship
  'integrates_with',-- Integration relationship
  'reports_to',     -- Organizational hierarchy
  'similar_to',     -- Semantic similarity
  'precedes',       -- Temporal: comes before
  'follows',        -- Temporal: comes after
  'influences',     -- Causal relationship
  'measures'        -- Metric tracks entity
);

-- Provenance (origin tracking)
create type provenance_type as enum (
  'human_authored',     -- User wrote this directly
  'human_uploaded',     -- User uploaded a file
  'ai_extracted',       -- AI extracted from source
  'ai_generated',       -- AI generated (summary, etc.)
  'ai_inferred',        -- AI inferred relationship
  'system_imported',    -- System imported (API, webhook)
  'human_edited',       -- Human edited AI content
  'human_verified'      -- Human verified AI content
);

-- ============================================================================
-- KNOWLEDGE SOURCES
-- The raw inputs to the system
-- ============================================================================

create table knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,

  -- Source metadata
  source_type knowledge_source_type not null,
  title text not null,
  description text,

  -- Original content location
  url text,                          -- For web sources
  storage_path text,                 -- For uploaded files
  content_hash text,                 -- For deduplication

  -- Content info
  mime_type text,
  file_size_bytes bigint,
  word_count int,

  -- C-Suite classification (can belong to multiple domains)
  domains csuite_domain[] not null default '{}',

  -- Processing status
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  processed_at timestamptz,

  -- Provenance
  provenance provenance_type not null default 'human_uploaded',

  -- Metadata
  metadata jsonb default '{}',
  tags text[] default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for knowledge_sources
create index idx_sources_profile on knowledge_sources(profile_id);
create index idx_sources_organization on knowledge_sources(organization_id);
create index idx_sources_type on knowledge_sources(source_type);
create index idx_sources_domains on knowledge_sources using gin(domains);
create index idx_sources_status on knowledge_sources(status);
create index idx_sources_tags on knowledge_sources using gin(tags);
create index idx_sources_content_hash on knowledge_sources(content_hash);

-- ============================================================================
-- CHUNKS
-- Semantic units of content with embeddings
-- ============================================================================

create table knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references knowledge_sources(id) on delete cascade,

  -- Content
  content text not null,
  content_tokens int,

  -- Position in source
  chunk_index int not null,
  start_offset int,
  end_offset int,

  -- Hierarchy (for nested sections)
  parent_chunk_id uuid references knowledge_chunks(id) on delete set null,
  depth int not null default 0,

  -- Section metadata
  section_title text,
  section_path text[],  -- ["Chapter 1", "Section 2", "Subsection A"]

  -- Embedding (1536 dimensions for OpenAI, 384 for gte-small)
  embedding vector(1536),
  embedding_model text,

  -- Summary
  summary text,
  summary_embedding vector(1536),

  -- C-Suite domains (inherited or explicit)
  domains csuite_domain[] not null default '{}',

  -- Metadata
  metadata jsonb default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for knowledge_chunks
create index idx_chunks_source on knowledge_chunks(source_id);
create index idx_chunks_parent on knowledge_chunks(parent_chunk_id);
create index idx_chunks_domains on knowledge_chunks using gin(domains);

-- HNSW index for fast similarity search (use ivfflat for larger datasets)
create index idx_chunks_embedding on knowledge_chunks
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

create index idx_chunks_summary_embedding on knowledge_chunks
  using hnsw (summary_embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- ============================================================================
-- ENTITIES
-- Extracted concepts and objects
-- ============================================================================

create table knowledge_entities (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,

  -- Entity info
  entity_type entity_type not null,
  name text not null,
  normalized_name text generated always as (lower(trim(name))) stored,
  aliases text[] default '{}',
  description text,

  -- Classification
  domains csuite_domain[] not null default '{}',

  -- Embedding for semantic search on entity
  embedding vector(1536),

  -- External references
  external_id text,         -- For linking to external systems
  external_url text,        -- Link to external source

  -- Provenance
  provenance provenance_type not null default 'ai_extracted',
  confidence_score float check (confidence_score >= 0 and confidence_score <= 1),
  verified boolean not null default false,
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,

  -- Metadata
  metadata jsonb default '{}',
  tags text[] default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Unique per user/org and type
  unique (profile_id, entity_type, normalized_name)
);

-- Indexes for knowledge_entities
create index idx_entities_profile on knowledge_entities(profile_id);
create index idx_entities_organization on knowledge_entities(organization_id);
create index idx_entities_type on knowledge_entities(entity_type);
create index idx_entities_domains on knowledge_entities using gin(domains);
create index idx_entities_name on knowledge_entities using gin(name gin_trgm_ops);
create index idx_entities_normalized on knowledge_entities(normalized_name);
create index idx_entities_aliases on knowledge_entities using gin(aliases);
create index idx_entities_tags on knowledge_entities using gin(tags);
create index idx_entities_embedding on knowledge_entities
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- ============================================================================
-- ENTITY MENTIONS
-- Links entities to chunks where they appear
-- ============================================================================

create table entity_mentions (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references knowledge_entities(id) on delete cascade,
  chunk_id uuid not null references knowledge_chunks(id) on delete cascade,

  -- Where in the chunk
  start_char int,
  end_char int,
  mention_text text,

  -- Context
  context_before text,
  context_after text,

  -- Confidence
  confidence_score float check (confidence_score >= 0 and confidence_score <= 1),

  created_at timestamptz not null default now(),

  unique (entity_id, chunk_id, start_char)
);

-- Indexes for entity_mentions
create index idx_mentions_entity on entity_mentions(entity_id);
create index idx_mentions_chunk on entity_mentions(chunk_id);

-- ============================================================================
-- RELATIONSHIPS
-- Connections between entities (the graph)
-- ============================================================================

create table entity_relationships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,

  -- The relationship triple
  source_entity_id uuid not null references knowledge_entities(id) on delete cascade,
  relationship_type relationship_type not null,
  target_entity_id uuid not null references knowledge_entities(id) on delete cascade,

  -- Relationship details
  description text,
  weight float default 1.0 check (weight >= 0 and weight <= 1),

  -- Bidirectional or not
  is_bidirectional boolean not null default false,

  -- Where this relationship was found
  evidence_chunk_ids uuid[] default '{}',

  -- Provenance
  provenance provenance_type not null default 'ai_inferred',
  confidence_score float check (confidence_score >= 0 and confidence_score <= 1),
  verified boolean not null default false,
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,

  -- Temporal bounds (if relationship is time-bound)
  valid_from timestamptz,
  valid_until timestamptz,

  -- Metadata
  metadata jsonb default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Prevent duplicate relationships
  unique (source_entity_id, relationship_type, target_entity_id)
);

-- Indexes for entity_relationships
create index idx_relationships_profile on entity_relationships(profile_id);
create index idx_relationships_source on entity_relationships(source_entity_id);
create index idx_relationships_target on entity_relationships(target_entity_id);
create index idx_relationships_type on entity_relationships(relationship_type);

-- ============================================================================
-- ENTITY HISTORY
-- Track changes over time (evolution of understanding)
-- ============================================================================

create table entity_history (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references knowledge_entities(id) on delete cascade,

  -- What changed
  field_name text not null,
  old_value jsonb,
  new_value jsonb,

  -- Who/what changed it
  changed_by uuid references auth.users(id) on delete set null,
  provenance provenance_type not null,
  reason text,

  created_at timestamptz not null default now()
);

-- Index for entity_history
create index idx_entity_history_entity on entity_history(entity_id);
create index idx_entity_history_created on entity_history(created_at desc);

-- ============================================================================
-- CONVERSATIONS (for Claude interactions)
-- ============================================================================

create table brain_conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,

  title text,
  domain csuite_domain,

  -- Summary for quick reference
  summary text,

  -- Metadata
  metadata jsonb default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brain_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references brain_conversations(id) on delete cascade,

  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,

  -- References used in response
  chunk_ids uuid[] default '{}',
  entity_ids uuid[] default '{}',

  -- Token usage
  tokens_input int,
  tokens_output int,

  -- Metadata
  metadata jsonb default '{}',

  created_at timestamptz not null default now()
);

-- Indexes for conversations
create index idx_conversations_profile on brain_conversations(profile_id);
create index idx_conversations_domain on brain_conversations(domain);
create index idx_messages_conversation on brain_messages(conversation_id);

-- ============================================================================
-- EMBEDDING QUEUE (for async processing)
-- ============================================================================

create table embedding_queue (
  id uuid primary key default gen_random_uuid(),

  -- What to embed
  target_table text not null,
  target_id uuid not null,
  target_column text not null,
  content text not null,

  -- Processing state
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  attempts int not null default 0,
  last_error text,

  -- Model to use
  model text not null default 'text-embedding-3-small',

  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index idx_embedding_queue_status on embedding_queue(status);
create index idx_embedding_queue_created on embedding_queue(created_at);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Semantic search in chunks
create or replace function search_knowledge_chunks(
  query_embedding vector(1536),
  match_count int default 10,
  match_threshold float default 0.5,
  filter_domains csuite_domain[] default null,
  filter_profile_id uuid default null
)
returns table (
  id uuid,
  source_id uuid,
  content text,
  similarity float,
  domains csuite_domain[],
  metadata jsonb
)
language plpgsql
as $$
begin
  return query
  select
    kc.id,
    kc.source_id,
    kc.content,
    1 - (kc.embedding <=> query_embedding) as similarity,
    kc.domains,
    kc.metadata
  from knowledge_chunks kc
  join knowledge_sources ks on ks.id = kc.source_id
  where kc.embedding is not null
    and 1 - (kc.embedding <=> query_embedding) > match_threshold
    and (filter_domains is null or kc.domains && filter_domains)
    and (filter_profile_id is null or ks.profile_id = filter_profile_id)
  order by kc.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Search entities by name (fuzzy)
create or replace function search_entities(
  query text,
  filter_types entity_type[] default null,
  filter_domains csuite_domain[] default null,
  filter_profile_id uuid default null,
  match_limit int default 20
)
returns table (
  id uuid,
  entity_type entity_type,
  name text,
  description text,
  domains csuite_domain[],
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ke.id,
    ke.entity_type,
    ke.name,
    ke.description,
    ke.domains,
    similarity(ke.name, query) as similarity
  from knowledge_entities ke
  where (filter_types is null or ke.entity_type = any(filter_types))
    and (filter_domains is null or ke.domains && filter_domains)
    and (filter_profile_id is null or ke.profile_id = filter_profile_id)
    and (
      ke.name ilike '%' || query || '%'
      or ke.normalized_name ilike '%' || query || '%'
      or query = any(ke.aliases)
      or similarity(ke.name, query) > 0.3
    )
  order by similarity(ke.name, query) desc
  limit match_limit;
end;
$$;

-- Get entity graph (related entities)
create or replace function get_entity_graph(
  entity_uuid uuid,
  depth int default 2,
  limit_per_level int default 10
)
returns table (
  entity_id uuid,
  entity_type entity_type,
  entity_name text,
  relationship_type relationship_type,
  related_entity_id uuid,
  related_entity_type entity_type,
  related_entity_name text,
  level int
)
language plpgsql
as $$
begin
  return query
  with recursive entity_graph as (
    -- Base case
    select
      er.source_entity_id as entity_id,
      ke1.entity_type,
      ke1.name as entity_name,
      er.relationship_type,
      er.target_entity_id as related_entity_id,
      ke2.entity_type as related_entity_type,
      ke2.name as related_entity_name,
      1 as level
    from entity_relationships er
    join knowledge_entities ke1 on ke1.id = er.source_entity_id
    join knowledge_entities ke2 on ke2.id = er.target_entity_id
    where er.source_entity_id = entity_uuid or er.target_entity_id = entity_uuid

    union all

    -- Recursive case
    select
      er.source_entity_id,
      ke1.entity_type,
      ke1.name,
      er.relationship_type,
      er.target_entity_id,
      ke2.entity_type,
      ke2.name,
      eg.level + 1
    from entity_relationships er
    join knowledge_entities ke1 on ke1.id = er.source_entity_id
    join knowledge_entities ke2 on ke2.id = er.target_entity_id
    join entity_graph eg on (
      er.source_entity_id = eg.related_entity_id
      or er.target_entity_id = eg.entity_id
    )
    where eg.level < depth
  )
  select distinct * from entity_graph
  order by level, entity_name
  limit limit_per_level * depth;
end;
$$;

-- Hybrid search (semantic + keyword)
create or replace function hybrid_search_knowledge(
  query_text text,
  query_embedding vector(1536),
  filter_domains csuite_domain[] default null,
  filter_profile_id uuid default null,
  semantic_weight float default 0.7,
  keyword_weight float default 0.3,
  match_count int default 10
)
returns table (
  id uuid,
  source_id uuid,
  content text,
  score float,
  domains csuite_domain[]
)
language plpgsql
as $$
begin
  return query
  with semantic_results as (
    select
      kc.id,
      kc.source_id,
      kc.content,
      kc.domains,
      1 - (kc.embedding <=> query_embedding) as semantic_score,
      row_number() over (order by kc.embedding <=> query_embedding) as semantic_rank
    from knowledge_chunks kc
    join knowledge_sources ks on ks.id = kc.source_id
    where kc.embedding is not null
      and (filter_domains is null or kc.domains && filter_domains)
      and (filter_profile_id is null or ks.profile_id = filter_profile_id)
    order by kc.embedding <=> query_embedding
    limit match_count * 2
  ),
  keyword_results as (
    select
      kc.id,
      kc.source_id,
      kc.content,
      kc.domains,
      ts_rank_cd(to_tsvector('english', kc.content), plainto_tsquery('english', query_text)) as keyword_score,
      row_number() over (order by ts_rank_cd(to_tsvector('english', kc.content), plainto_tsquery('english', query_text)) desc) as keyword_rank
    from knowledge_chunks kc
    join knowledge_sources ks on ks.id = kc.source_id
    where (filter_domains is null or kc.domains && filter_domains)
      and (filter_profile_id is null or ks.profile_id = filter_profile_id)
      and to_tsvector('english', kc.content) @@ plainto_tsquery('english', query_text)
    limit match_count * 2
  )
  select
    coalesce(s.id, k.id) as id,
    coalesce(s.source_id, k.source_id) as source_id,
    coalesce(s.content, k.content) as content,
    (
      coalesce(s.semantic_score, 0) * semantic_weight +
      coalesce(k.keyword_score, 0) * keyword_weight
    ) as score,
    coalesce(s.domains, k.domains) as domains
  from semantic_results s
  full outer join keyword_results k on s.id = k.id
  order by score desc
  limit match_count;
end;
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
create trigger knowledge_sources_updated_at
  before update on knowledge_sources
  for each row execute function moddatetime(updated_at);

create trigger knowledge_chunks_updated_at
  before update on knowledge_chunks
  for each row execute function moddatetime(updated_at);

create trigger knowledge_entities_updated_at
  before update on knowledge_entities
  for each row execute function moddatetime(updated_at);

create trigger entity_relationships_updated_at
  before update on entity_relationships
  for each row execute function moddatetime(updated_at);

create trigger brain_conversations_updated_at
  before update on brain_conversations
  for each row execute function moddatetime(updated_at);

-- Queue embedding generation when content is added
create or replace function queue_embedding_on_insert()
returns trigger as $$
begin
  insert into embedding_queue (target_table, target_id, target_column, content)
  values (TG_TABLE_NAME, NEW.id, 'embedding', NEW.content);
  return NEW;
end;
$$ language plpgsql;

create trigger queue_chunk_embedding
  after insert on knowledge_chunks
  for each row execute function queue_embedding_on_insert();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Knowledge Sources RLS
alter table knowledge_sources enable row level security;

create policy "Users can view their own sources"
  on knowledge_sources for select
  using (
    profile_id = auth.uid() or
    organization_id in (select organization_id from organization_members where user_id = auth.uid())
  );

create policy "Users can create their own sources"
  on knowledge_sources for insert
  with check (profile_id = auth.uid());

create policy "Users can update their own sources"
  on knowledge_sources for update
  using (profile_id = auth.uid());

create policy "Users can delete their own sources"
  on knowledge_sources for delete
  using (profile_id = auth.uid());

-- Knowledge Chunks RLS
alter table knowledge_chunks enable row level security;

create policy "Users can view chunks from their sources"
  on knowledge_chunks for select
  using (
    source_id in (
      select id from knowledge_sources
      where profile_id = auth.uid()
        or organization_id in (select organization_id from organization_members where user_id = auth.uid())
    )
  );

-- Knowledge Entities RLS
alter table knowledge_entities enable row level security;

create policy "Users can view their own entities"
  on knowledge_entities for select
  using (
    profile_id = auth.uid() or
    organization_id in (select organization_id from organization_members where user_id = auth.uid())
  );

create policy "Users can manage their own entities"
  on knowledge_entities for all
  using (profile_id = auth.uid());

-- Entity Mentions RLS
alter table entity_mentions enable row level security;

create policy "Users can view mentions from their entities"
  on entity_mentions for select
  using (
    entity_id in (
      select id from knowledge_entities
      where profile_id = auth.uid()
        or organization_id in (select organization_id from organization_members where user_id = auth.uid())
    )
  );

-- Entity Relationships RLS
alter table entity_relationships enable row level security;

create policy "Users can view their own relationships"
  on entity_relationships for select
  using (profile_id = auth.uid());

create policy "Users can manage their own relationships"
  on entity_relationships for all
  using (profile_id = auth.uid());

-- Conversations RLS
alter table brain_conversations enable row level security;

create policy "Users can view their own conversations"
  on brain_conversations for select
  using (
    profile_id = auth.uid() or
    organization_id in (select organization_id from organization_members where user_id = auth.uid())
  );

create policy "Users can manage their own conversations"
  on brain_conversations for all
  using (profile_id = auth.uid());

-- Messages RLS
alter table brain_messages enable row level security;

create policy "Users can view messages from their conversations"
  on brain_messages for select
  using (
    conversation_id in (
      select id from brain_conversations
      where profile_id = auth.uid()
        or organization_id in (select organization_id from organization_members where user_id = auth.uid())
    )
  );

create policy "Users can add messages to their conversations"
  on brain_messages for insert
  with check (
    conversation_id in (
      select id from brain_conversations where profile_id = auth.uid()
    )
  );

-- Embedding Queue RLS (service role only)
alter table embedding_queue enable row level security;

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

comment on table knowledge_sources is 'Raw inputs to the knowledge graph (files, URLs, notes, etc.)';
comment on table knowledge_chunks is 'Semantic chunks with embeddings for retrieval';
comment on table knowledge_entities is 'Extracted concepts (people, projects, tools, etc.)';
comment on table entity_mentions is 'Links entities to chunks where they appear';
comment on table entity_relationships is 'Graph edges between entities';
comment on table entity_history is 'Audit log for entity changes';
comment on table brain_conversations is 'Claude interaction history';
comment on table brain_messages is 'Individual messages in conversations';
comment on table embedding_queue is 'Queue for async embedding generation';

comment on type csuite_domain is 'C-Suite knowledge domains: CEO (Focus), CMO (Users), CVO (Value), COO (Admin), CFO (Funds)';
comment on type provenance_type is 'Track origin of content: human authored, AI extracted, AI generated, etc.';

comment on function search_knowledge_chunks is 'Semantic similarity search using embeddings';
comment on function search_entities is 'Fuzzy entity search by name';
comment on function get_entity_graph is 'Traverse entity relationships to build knowledge graph';
comment on function hybrid_search_knowledge is 'Combined semantic + keyword search for best results';
