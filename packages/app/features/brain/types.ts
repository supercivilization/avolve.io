// ============================================================================
// AVOLVE PROJECT BRAIN - TypeScript Types
// ============================================================================

// C-Suite knowledge domains
export type CSuiteDomain = 'ceo' | 'cmo' | 'cvo' | 'coo' | 'cfo'

// Domain metadata
export const DOMAIN_CONFIG: Record<CSuiteDomain, {
  label: string
  sublabel: string
  description: string
  color: string
  icon: string
}> = {
  ceo: {
    label: 'Focus',
    sublabel: 'CEO',
    description: 'The Cockpit - Leadership & Strategy',
    color: 'purple',
    icon: 'Plane',
  },
  cmo: {
    label: 'Users',
    sublabel: 'CMO',
    description: 'The Engines - Marketing & Sales',
    color: 'blue',
    icon: 'Zap',
  },
  cvo: {
    label: 'Value',
    sublabel: 'CVO',
    description: 'The Wings - Products & Services',
    color: 'green',
    icon: 'Layers',
  },
  coo: {
    label: 'Admin',
    sublabel: 'COO',
    description: 'The Body - Operations',
    color: 'orange',
    icon: 'Cog',
  },
  cfo: {
    label: 'Funds',
    sublabel: 'CFO',
    description: 'The Fuel Tanks - Cash Flow',
    color: 'yellow',
    icon: 'Fuel',
  },
}

// Source types
export type KnowledgeSourceType =
  | 'file'
  | 'url'
  | 'note'
  | 'conversation'
  | 'code'
  | 'image'
  | 'audio'
  | 'video'

// Entity types
export type EntityType =
  | 'person'
  | 'company'
  | 'project'
  | 'product'
  | 'concept'
  | 'tool'
  | 'metric'
  | 'process'
  | 'goal'
  | 'location'
  | 'event'
  | 'resource'

// Relationship types
export type RelationshipType =
  | 'owns'
  | 'created_by'
  | 'depends_on'
  | 'related_to'
  | 'part_of'
  | 'references'
  | 'competes_with'
  | 'integrates_with'
  | 'reports_to'
  | 'similar_to'
  | 'precedes'
  | 'follows'
  | 'influences'
  | 'measures'

// Provenance types
export type ProvenanceType =
  | 'human_authored'
  | 'human_uploaded'
  | 'ai_extracted'
  | 'ai_generated'
  | 'ai_inferred'
  | 'system_imported'
  | 'human_edited'
  | 'human_verified'

// Processing status
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed'

// ============================================================================
// DATABASE ENTITIES
// ============================================================================

export interface KnowledgeSource {
  id: string
  profile_id: string
  organization_id: string | null
  source_type: KnowledgeSourceType
  title: string
  description: string | null
  url: string | null
  storage_path: string | null
  content_hash: string | null
  mime_type: string | null
  file_size_bytes: number | null
  word_count: number | null
  domains: CSuiteDomain[]
  status: ProcessingStatus
  error_message: string | null
  processed_at: string | null
  provenance: ProvenanceType
  metadata: Record<string, unknown>
  tags: string[]
  created_at: string
  updated_at: string
}

export interface KnowledgeChunk {
  id: string
  source_id: string
  content: string
  content_tokens: number | null
  chunk_index: number
  start_offset: number | null
  end_offset: number | null
  parent_chunk_id: string | null
  depth: number
  section_title: string | null
  section_path: string[] | null
  embedding: number[] | null // vector(1536)
  embedding_model: string | null
  summary: string | null
  summary_embedding: number[] | null
  domains: CSuiteDomain[]
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface KnowledgeEntity {
  id: string
  profile_id: string
  organization_id: string | null
  entity_type: EntityType
  name: string
  normalized_name: string
  aliases: string[]
  description: string | null
  domains: CSuiteDomain[]
  embedding: number[] | null
  external_id: string | null
  external_url: string | null
  provenance: ProvenanceType
  confidence_score: number | null
  verified: boolean
  verified_by: string | null
  verified_at: string | null
  metadata: Record<string, unknown>
  tags: string[]
  created_at: string
  updated_at: string
}

export interface EntityMention {
  id: string
  entity_id: string
  chunk_id: string
  start_char: number | null
  end_char: number | null
  mention_text: string | null
  context_before: string | null
  context_after: string | null
  confidence_score: number | null
  created_at: string
}

export interface EntityRelationship {
  id: string
  profile_id: string
  source_entity_id: string
  relationship_type: RelationshipType
  target_entity_id: string
  description: string | null
  weight: number
  is_bidirectional: boolean
  evidence_chunk_ids: string[]
  provenance: ProvenanceType
  confidence_score: number | null
  verified: boolean
  verified_by: string | null
  verified_at: string | null
  valid_from: string | null
  valid_until: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface EntityHistory {
  id: string
  entity_id: string
  field_name: string
  old_value: unknown
  new_value: unknown
  changed_by: string | null
  provenance: ProvenanceType
  reason: string | null
  created_at: string
}

export interface BrainConversation {
  id: string
  profile_id: string
  organization_id: string | null
  title: string | null
  domain: CSuiteDomain | null
  summary: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface BrainMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  chunk_ids: string[]
  entity_ids: string[]
  tokens_input: number | null
  tokens_output: number | null
  metadata: Record<string, unknown>
  created_at: string
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

// Source creation
export interface CreateSourceRequest {
  source_type: KnowledgeSourceType
  title: string
  description?: string
  url?: string
  content?: string // For notes
  domains: CSuiteDomain[]
  tags?: string[]
  metadata?: Record<string, unknown>
}

export interface CreateSourceResponse {
  source: KnowledgeSource
  upload_url?: string // Presigned URL for file upload
}

// Search
export interface SearchRequest {
  query: string
  domains?: CSuiteDomain[]
  source_types?: KnowledgeSourceType[]
  entity_types?: EntityType[]
  limit?: number
  offset?: number
  include_entities?: boolean
  semantic_weight?: number // 0-1, default 0.7
}

export interface SearchResult {
  id: string
  source_id: string
  content: string
  score: number
  domains: CSuiteDomain[]
  source_title: string
  source_type: KnowledgeSourceType
  section_title?: string
  metadata: Record<string, unknown>
}

export interface SearchResponse {
  chunks: SearchResult[]
  entities?: KnowledgeEntity[]
  total: number
  took_ms: number
}

// Entity operations
export interface CreateEntityRequest {
  entity_type: EntityType
  name: string
  description?: string
  domains: CSuiteDomain[]
  aliases?: string[]
  external_id?: string
  external_url?: string
  tags?: string[]
  metadata?: Record<string, unknown>
}

export interface EntityGraphNode {
  id: string
  entity_type: EntityType
  name: string
  domains: CSuiteDomain[]
}

export interface EntityGraphEdge {
  source_id: string
  target_id: string
  relationship_type: RelationshipType
  weight: number
  is_bidirectional: boolean
}

export interface EntityGraphResponse {
  nodes: EntityGraphNode[]
  edges: EntityGraphEdge[]
  center_entity: KnowledgeEntity
}

// Chat
export interface ChatRequest {
  message: string
  conversation_id?: string
  domain?: CSuiteDomain
  context_limit?: number // Max chunks to include
}

export interface ChatResponse {
  message: BrainMessage
  conversation: BrainConversation
  sources: Array<{
    chunk_id: string
    source_title: string
    relevance: number
  }>
}

// ============================================================================
// UI HELPER TYPES
// ============================================================================

export interface SourceWithStats extends KnowledgeSource {
  chunk_count: number
  entity_count: number
}

export interface EntityWithRelations extends KnowledgeEntity {
  mention_count: number
  relationship_count: number
  related_entities: Array<{
    entity: KnowledgeEntity
    relationship: RelationshipType
    direction: 'outgoing' | 'incoming'
  }>
}

export interface DomainStats {
  domain: CSuiteDomain
  source_count: number
  chunk_count: number
  entity_count: number
  last_updated: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const SOURCE_TYPE_LABELS: Record<KnowledgeSourceType, string> = {
  file: 'File',
  url: 'Web Page',
  note: 'Note',
  conversation: 'Conversation',
  code: 'Code',
  image: 'Image',
  audio: 'Audio',
  video: 'Video',
}

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  person: 'Person',
  company: 'Company',
  project: 'Project',
  product: 'Product',
  concept: 'Concept',
  tool: 'Tool',
  metric: 'Metric',
  process: 'Process',
  goal: 'Goal',
  location: 'Location',
  event: 'Event',
  resource: 'Resource',
}

export const RELATIONSHIP_TYPE_LABELS: Record<RelationshipType, string> = {
  owns: 'Owns',
  created_by: 'Created By',
  depends_on: 'Depends On',
  related_to: 'Related To',
  part_of: 'Part Of',
  references: 'References',
  competes_with: 'Competes With',
  integrates_with: 'Integrates With',
  reports_to: 'Reports To',
  similar_to: 'Similar To',
  precedes: 'Precedes',
  follows: 'Follows',
  influences: 'Influences',
  measures: 'Measures',
}

export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv',
  'application/json',
]

export const MAX_FILE_SIZE_MB = 50
