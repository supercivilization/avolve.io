-- Enable pgvector extension for vector similarity search
-- This must run BEFORE any migrations that use the vector type

-- Enable the vector extension (pgvector)
create extension if not exists vector with schema extensions;

-- Enable pg_trgm for fuzzy text search
create extension if not exists pg_trgm with schema extensions;
