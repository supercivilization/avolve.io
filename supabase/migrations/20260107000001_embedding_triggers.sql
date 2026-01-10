-- ============================================================================
-- EMBEDDING TRIGGERS AND CRON JOB
-- Automatically queue embeddings for entities and process the queue
-- ============================================================================
--
-- This migration adds:
-- 1. Trigger for entity embedding queuing
-- 2. pg_cron job to process embedding queue every minute
-- 3. Cleanup job for completed queue items
--
-- Jan 7, 2026
-- ============================================================================

-- Enable pg_cron extension (requires Supabase Pro or self-hosted with cron enabled)
-- Note: This may fail on free tier - embeddings will still work via manual trigger
do $$
begin
  create extension if not exists pg_cron with schema extensions;
exception
  when others then
    raise notice 'pg_cron extension not available - queue processing will need manual triggers';
end;
$$;

-- ============================================================================
-- ENTITY EMBEDDING TRIGGER
-- Queue embeddings when entities are created with descriptions
-- ============================================================================

create or replace function queue_entity_embedding_on_insert()
returns trigger as $$
begin
  -- Only queue if entity has a name (required for embedding)
  if NEW.name is not null and length(trim(NEW.name)) > 0 then
    insert into embedding_queue (target_table, target_id, target_column, content, model)
    values (
      'knowledge_entities',
      NEW.id,
      'embedding',
      -- Combine name, description, and aliases for richer embedding
      coalesce(NEW.name, '') ||
      case when NEW.description is not null then ': ' || NEW.description else '' end ||
      case when array_length(NEW.aliases, 1) > 0 then ' (Also known as: ' || array_to_string(NEW.aliases, ', ') || ')' else '' end,
      'text-embedding-3-small'
    );
  end if;
  return NEW;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists (for idempotency)
drop trigger if exists queue_entity_embedding on knowledge_entities;

create trigger queue_entity_embedding
  after insert on knowledge_entities
  for each row execute function queue_entity_embedding_on_insert();

-- Also queue embedding when entity is updated with new description
create or replace function queue_entity_embedding_on_update()
returns trigger as $$
begin
  -- Only re-embed if name, description, or aliases changed
  if NEW.name is distinct from OLD.name
     or NEW.description is distinct from OLD.description
     or NEW.aliases is distinct from OLD.aliases then

    -- Remove any pending embedding for this entity
    delete from embedding_queue
    where target_table = 'knowledge_entities'
      and target_id = NEW.id
      and status = 'pending';

    -- Queue new embedding
    insert into embedding_queue (target_table, target_id, target_column, content, model)
    values (
      'knowledge_entities',
      NEW.id,
      'embedding',
      coalesce(NEW.name, '') ||
      case when NEW.description is not null then ': ' || NEW.description else '' end ||
      case when array_length(NEW.aliases, 1) > 0 then ' (Also known as: ' || array_to_string(NEW.aliases, ', ') || ')' else '' end,
      'text-embedding-3-small'
    );
  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists queue_entity_embedding_update on knowledge_entities;

create trigger queue_entity_embedding_update
  after update on knowledge_entities
  for each row execute function queue_entity_embedding_on_update();

-- ============================================================================
-- CHUNK SUMMARY EMBEDDING
-- Queue summary embeddings when chunks get summaries
-- ============================================================================

create or replace function queue_summary_embedding_on_update()
returns trigger as $$
begin
  -- Only queue if summary was added/changed and doesn't have embedding yet
  if NEW.summary is not null
     and NEW.summary is distinct from OLD.summary
     and NEW.summary_embedding is null then

    insert into embedding_queue (target_table, target_id, target_column, content, model)
    values (
      'knowledge_chunks',
      NEW.id,
      'summary_embedding',
      NEW.summary,
      'text-embedding-3-small'
    );
  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists queue_summary_embedding on knowledge_chunks;

create trigger queue_summary_embedding
  after update on knowledge_chunks
  for each row execute function queue_summary_embedding_on_update();

-- ============================================================================
-- CRON JOBS (Supabase Pro / Enterprise only)
-- ============================================================================

-- Helper function to call the embed-content Edge Function
create or replace function process_embedding_queue_batch()
returns void as $$
declare
  supabase_url text;
  service_role_key text;
begin
  -- Get configuration from vault or environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);

  -- If settings not available, skip
  if supabase_url is null or service_role_key is null then
    raise notice 'Supabase URL or service role key not configured for cron job';
    return;
  end if;

  -- Call the Edge Function using pg_net (if available)
  perform net.http_post(
    url := supabase_url || '/functions/v1/embed-content',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || service_role_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'process_queue', true,
      'batch_size', 10
    )
  );
exception
  when others then
    raise notice 'Failed to call embed-content function: %', SQLERRM;
end;
$$ language plpgsql security definer;

-- Schedule cron job to process embeddings every minute
-- Note: This requires pg_cron extension (Supabase Pro)
do $$
begin
  -- Check if cron schema exists
  if exists (select 1 from pg_namespace where nspname = 'cron') then
    -- Remove existing job if present
    perform cron.unschedule('process-embedding-queue');

    -- Schedule new job
    perform cron.schedule(
      'process-embedding-queue',
      '* * * * *',  -- Every minute
      $$select process_embedding_queue_batch()$$
    );

    raise notice 'Cron job scheduled: process-embedding-queue (every minute)';
  else
    raise notice 'pg_cron not available - use manual triggers or external scheduler';
  end if;
exception
  when others then
    raise notice 'Could not schedule cron job: %', SQLERRM;
end;
$$;

-- Cleanup job - remove completed queue items older than 24 hours
do $$
begin
  if exists (select 1 from pg_namespace where nspname = 'cron') then
    perform cron.unschedule('cleanup-embedding-queue');

    perform cron.schedule(
      'cleanup-embedding-queue',
      '0 * * * *',  -- Every hour
      $$delete from embedding_queue where status = 'completed' and processed_at < now() - interval '24 hours'$$
    );

    raise notice 'Cron job scheduled: cleanup-embedding-queue (every hour)';
  end if;
exception
  when others then
    raise notice 'Could not schedule cleanup job: %', SQLERRM;
end;
$$;

-- ============================================================================
-- HELPER FUNCTION: Manual queue processing
-- For use when cron is not available
-- ============================================================================

-- Function to manually trigger embedding processing
-- Can be called from Edge Function or client
create or replace function trigger_embedding_processing()
returns jsonb as $$
declare
  pending_count int;
  processing_count int;
begin
  select count(*) into pending_count
  from embedding_queue
  where status = 'pending';

  select count(*) into processing_count
  from embedding_queue
  where status = 'processing';

  return jsonb_build_object(
    'pending', pending_count,
    'processing', processing_count,
    'message', 'Call POST /functions/v1/embed-content with {"process_queue": true} to process'
  );
end;
$$ language plpgsql security definer;

-- Grant execute to authenticated users
grant execute on function trigger_embedding_processing() to authenticated;

-- ============================================================================
-- INDEXES FOR QUEUE PERFORMANCE
-- ============================================================================

-- Index for efficient queue status queries
create index if not exists idx_embedding_queue_status_created
  on embedding_queue(status, created_at)
  where status in ('pending', 'processing');

-- Index for cleanup queries
create index if not exists idx_embedding_queue_completed_processed
  on embedding_queue(processed_at)
  where status = 'completed';

-- ============================================================================
-- COMMENTS
-- ============================================================================

comment on function queue_entity_embedding_on_insert() is 'Queue embedding generation when a new entity is created';
comment on function queue_entity_embedding_on_update() is 'Queue embedding regeneration when entity name/description changes';
comment on function queue_summary_embedding_on_update() is 'Queue embedding for chunk summaries when added';
comment on function process_embedding_queue_batch() is 'Call embed-content Edge Function to process queue batch';
comment on function trigger_embedding_processing() is 'Get queue status - useful for monitoring';
