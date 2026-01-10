export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          goal: number
          id: string
          name: string
          profile_id: string | null
          progress: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          goal: number
          id?: string
          name: string
          profile_id?: string | null
          progress: number
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          goal?: number
          id?: string
          name?: string
          profile_id?: string | null
          progress?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_category: string | null
          event_data: Json | null
          event_name: string
          id: string
          path: string | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_category?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          path?: string | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_category?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          path?: string | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      brain_conversations: {
        Row: {
          created_at: string
          domain: Database["public"]["Enums"]["csuite_domain"] | null
          id: string
          metadata: Json | null
          organization_id: string | null
          profile_id: string
          summary: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain?: Database["public"]["Enums"]["csuite_domain"] | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          profile_id: string
          summary?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: Database["public"]["Enums"]["csuite_domain"] | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          profile_id?: string
          summary?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "brain_conversations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      brain_messages: {
        Row: {
          chunk_ids: string[] | null
          content: string
          conversation_id: string
          created_at: string
          entity_ids: string[] | null
          id: string
          metadata: Json | null
          role: string
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          chunk_ids?: string[] | null
          content: string
          conversation_id: string
          created_at?: string
          entity_ids?: string[] | null
          id?: string
          metadata?: Json | null
          role: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          chunk_ids?: string[] | null
          content?: string
          conversation_id?: string
          created_at?: string
          entity_ids?: string[] | null
          id?: string
          metadata?: Json | null
          role?: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "brain_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "brain_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_stats: {
        Row: {
          avg_session_duration: unknown
          created_at: string
          date: string
          top_pages: Json | null
          top_referrers: Json | null
          total_page_views: number | null
          unique_sessions: number | null
          unique_visitors: number | null
          updated_at: string
        }
        Insert: {
          avg_session_duration?: unknown
          created_at?: string
          date: string
          top_pages?: Json | null
          top_referrers?: Json | null
          total_page_views?: number | null
          unique_sessions?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Update: {
          avg_session_duration?: unknown
          created_at?: string
          date?: string
          top_pages?: Json | null
          top_referrers?: Json | null
          total_page_views?: number | null
          unique_sessions?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      embedding_queue: {
        Row: {
          attempts: number
          content: string
          created_at: string
          id: string
          last_error: string | null
          model: string
          processed_at: string | null
          status: string
          target_column: string
          target_id: string
          target_table: string
        }
        Insert: {
          attempts?: number
          content: string
          created_at?: string
          id?: string
          last_error?: string | null
          model?: string
          processed_at?: string | null
          status?: string
          target_column: string
          target_id: string
          target_table: string
        }
        Update: {
          attempts?: number
          content?: string
          created_at?: string
          id?: string
          last_error?: string | null
          model?: string
          processed_at?: string | null
          status?: string
          target_column?: string
          target_id?: string
          target_table?: string
        }
        Relationships: []
      }
      entity_history: {
        Row: {
          changed_by: string | null
          created_at: string
          entity_id: string
          field_name: string
          id: string
          new_value: Json | null
          old_value: Json | null
          provenance: Database["public"]["Enums"]["provenance_type"]
          reason: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          entity_id: string
          field_name: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          provenance: Database["public"]["Enums"]["provenance_type"]
          reason?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          entity_id?: string
          field_name?: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          provenance?: Database["public"]["Enums"]["provenance_type"]
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_history_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_mentions: {
        Row: {
          chunk_id: string
          confidence_score: number | null
          context_after: string | null
          context_before: string | null
          created_at: string
          end_char: number | null
          entity_id: string
          id: string
          mention_text: string | null
          start_char: number | null
        }
        Insert: {
          chunk_id: string
          confidence_score?: number | null
          context_after?: string | null
          context_before?: string | null
          created_at?: string
          end_char?: number | null
          entity_id: string
          id?: string
          mention_text?: string | null
          start_char?: number | null
        }
        Update: {
          chunk_id?: string
          confidence_score?: number | null
          context_after?: string | null
          context_before?: string | null
          created_at?: string
          end_char?: number | null
          entity_id?: string
          id?: string
          mention_text?: string | null
          start_char?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_mentions_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "knowledge_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_mentions_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_relationships: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string | null
          evidence_chunk_ids: string[] | null
          id: string
          is_bidirectional: boolean
          metadata: Json | null
          profile_id: string
          provenance: Database["public"]["Enums"]["provenance_type"]
          relationship_type: Database["public"]["Enums"]["relationship_type"]
          source_entity_id: string
          target_entity_id: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
          verified: boolean
          verified_at: string | null
          verified_by: string | null
          weight: number | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          evidence_chunk_ids?: string[] | null
          id?: string
          is_bidirectional?: boolean
          metadata?: Json | null
          profile_id: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          relationship_type: Database["public"]["Enums"]["relationship_type"]
          source_entity_id: string
          target_entity_id: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          weight?: number | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          evidence_chunk_ids?: string[] | null
          id?: string
          is_bidirectional?: boolean
          metadata?: Json | null
          profile_id?: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          relationship_type?: Database["public"]["Enums"]["relationship_type"]
          source_entity_id?: string
          target_entity_id?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_relationships_source_entity_id_fkey"
            columns: ["source_entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_target_entity_id_fkey"
            columns: ["target_entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      errors: {
        Row: {
          created_at: string | null
          deployment_id: string | null
          environment: string | null
          error_type: string | null
          id: string
          message: string
          metadata: Json | null
          method: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          route: string | null
          session_id: string | null
          stack: string | null
          updated_at: string | null
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deployment_id?: string | null
          environment?: string | null
          error_type?: string | null
          id?: string
          message: string
          metadata?: Json | null
          method?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          session_id?: string | null
          stack?: string | null
          updated_at?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deployment_id?: string | null
          environment?: string | null
          error_type?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          method?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          session_id?: string | null
          stack?: string | null
          updated_at?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          name: string
          profile_id: string | null
          start_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          name: string
          profile_id?: string | null
          start_time?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          name?: string
          profile_id?: string | null
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_access: {
        Row: {
          created_at: string
          enabled: boolean
          feature_key: string
          id: string
          limits: Json | null
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          feature_key: string
          id?: string
          limits?: Json | null
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          created_at?: string
          enabled?: boolean
          feature_key?: string
          id?: string
          limits?: Json | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: []
      }
      installs: {
        Row: {
          expo_tokens: string[] | null
          user_id: string
        }
        Insert: {
          expo_tokens?: string[] | null
          user_id: string
        }
        Update: {
          expo_tokens?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      knowledge_chunks: {
        Row: {
          chunk_index: number
          content: string
          content_tokens: number | null
          created_at: string
          depth: number
          domains: Database["public"]["Enums"]["csuite_domain"][]
          embedding: string | null
          embedding_model: string | null
          end_offset: number | null
          id: string
          metadata: Json | null
          parent_chunk_id: string | null
          section_path: string[] | null
          section_title: string | null
          source_id: string
          start_offset: number | null
          summary: string | null
          summary_embedding: string | null
          updated_at: string
        }
        Insert: {
          chunk_index: number
          content: string
          content_tokens?: number | null
          created_at?: string
          depth?: number
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          embedding?: string | null
          embedding_model?: string | null
          end_offset?: number | null
          id?: string
          metadata?: Json | null
          parent_chunk_id?: string | null
          section_path?: string[] | null
          section_title?: string | null
          source_id: string
          start_offset?: number | null
          summary?: string | null
          summary_embedding?: string | null
          updated_at?: string
        }
        Update: {
          chunk_index?: number
          content?: string
          content_tokens?: number | null
          created_at?: string
          depth?: number
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          embedding?: string | null
          embedding_model?: string | null
          end_offset?: number | null
          id?: string
          metadata?: Json | null
          parent_chunk_id?: string | null
          section_path?: string[] | null
          section_title?: string | null
          source_id?: string
          start_offset?: number | null
          summary?: string | null
          summary_embedding?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_chunks_parent_chunk_id_fkey"
            columns: ["parent_chunk_id"]
            isOneToOne: false
            referencedRelation: "knowledge_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_chunks_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "knowledge_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_entities: {
        Row: {
          aliases: string[] | null
          confidence_score: number | null
          created_at: string
          description: string | null
          domains: Database["public"]["Enums"]["csuite_domain"][]
          embedding: string | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          external_id: string | null
          external_url: string | null
          id: string
          metadata: Json | null
          name: string
          normalized_name: string | null
          organization_id: string | null
          profile_id: string
          provenance: Database["public"]["Enums"]["provenance_type"]
          tags: string[] | null
          updated_at: string
          verified: boolean
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          aliases?: string[] | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          embedding?: string | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          external_id?: string | null
          external_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          normalized_name?: string | null
          organization_id?: string | null
          profile_id: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          tags?: string[] | null
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          aliases?: string[] | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          embedding?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"]
          external_id?: string | null
          external_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          normalized_name?: string | null
          organization_id?: string | null
          profile_id?: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          tags?: string[] | null
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_entities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_sources: {
        Row: {
          content_hash: string | null
          created_at: string
          description: string | null
          domains: Database["public"]["Enums"]["csuite_domain"][]
          error_message: string | null
          file_size_bytes: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          organization_id: string | null
          processed_at: string | null
          profile_id: string
          provenance: Database["public"]["Enums"]["provenance_type"]
          source_type: Database["public"]["Enums"]["knowledge_source_type"]
          status: string
          storage_path: string | null
          tags: string[] | null
          title: string
          updated_at: string
          url: string | null
          word_count: number | null
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          description?: string | null
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id?: string | null
          processed_at?: string | null
          profile_id: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          source_type: Database["public"]["Enums"]["knowledge_source_type"]
          status?: string
          storage_path?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
          word_count?: number | null
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          description?: string | null
          domains?: Database["public"]["Enums"]["csuite_domain"][]
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id?: string | null
          processed_at?: string | null
          profile_id?: string
          provenance?: Database["public"]["Enums"]["provenance_type"]
          source_type?: Database["public"]["Enums"]["knowledge_source_type"]
          status?: string
          storage_path?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_sources_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          id: string
          invited_at: string | null
          invited_by: string | null
          joined_at: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string | null
          seat_limit: number
          seats_used: number
          slug: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id?: string | null
          seat_limit?: number
          seats_used?: number
          slug: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string | null
          seat_limit?: number
          seats_used?: number
          slug?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          category_id: string | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          profile_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          profile_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          profile_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          id: string
          name: string | null
          stripe_customer_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          id: string
          name?: string | null
          stripe_customer_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          id?: string
          name?: string | null
          stripe_customer_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"] | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          number_of_days: number | null
          paid_project: boolean | null
          profile_id: string | null
          project_type: string | null
          street: string | null
          updated_at: string
          us_zip_code: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          number_of_days?: number | null
          paid_project?: boolean | null
          profile_id?: string | null
          project_type?: string | null
          street?: string | null
          updated_at?: string
          us_zip_code?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          number_of_days?: number | null
          paid_project?: boolean | null
          profile_id?: string | null
          project_type?: string | null
          street?: string | null
          updated_at?: string
          us_zip_code?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string | null
          referrer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id?: string | null
          referrer_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string | null
          referrer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_interval: Database["public"]["Enums"]["billing_interval"]
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          organization_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_interval?: Database["public"]["Enums"]["billing_interval"]
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_interval?: Database["public"]["Enums"]["billing_interval"]
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          arr: number | null
          created_at: string
          id: string
          mrr: number | null
          profile_id: string | null
          updated_at: string
          weekly_post_views: number | null
        }
        Insert: {
          arr?: number | null
          created_at?: string
          id?: string
          mrr?: number | null
          profile_id?: string | null
          updated_at?: string
          weekly_post_views?: number | null
        }
        Update: {
          arr?: number | null
          created_at?: string
          id?: string
          mrr?: number | null
          profile_id?: string | null
          updated_at?: string
          weekly_post_views?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_errors: { Args: { days_old?: number }; Returns: number }
      get_analytics_summary: { Args: { days_ago?: number }; Returns: Json }
      get_entity_graph: {
        Args: { depth?: number; entity_uuid: string; limit_per_level?: number }
        Returns: {
          entity_id: string
          entity_name: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          level: number
          related_entity_id: string
          related_entity_name: string
          related_entity_type: Database["public"]["Enums"]["entity_type"]
          relationship_type: Database["public"]["Enums"]["relationship_type"]
        }[]
      }
      get_feature_limits: {
        Args: { feature: string; user_uuid: string }
        Returns: Json
      }
      get_user_tier: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["subscription_tier"]
      }
      has_feature_access: {
        Args: { feature: string; user_uuid: string }
        Returns: boolean
      }
      hybrid_search_knowledge: {
        Args: {
          filter_domains?: Database["public"]["Enums"]["csuite_domain"][]
          filter_profile_id?: string
          keyword_weight?: number
          match_count?: number
          query_embedding: string
          query_text: string
          semantic_weight?: number
        }
        Returns: {
          content: string
          domains: Database["public"]["Enums"]["csuite_domain"][]
          id: string
          score: number
          source_id: string
        }[]
      }
      search_entities: {
        Args: {
          filter_domains?: Database["public"]["Enums"]["csuite_domain"][]
          filter_profile_id?: string
          filter_types?: Database["public"]["Enums"]["entity_type"][]
          match_limit?: number
          query: string
        }
        Returns: {
          description: string
          domains: Database["public"]["Enums"]["csuite_domain"][]
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          name: string
          similarity: number
        }[]
      }
      search_knowledge_chunks: {
        Args: {
          filter_domains?: Database["public"]["Enums"]["csuite_domain"][]
          filter_profile_id?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          domains: Database["public"]["Enums"]["csuite_domain"][]
          id: string
          metadata: Json
          similarity: number
          source_id: string
        }[]
      }
    }
    Enums: {
      billing_interval: "month" | "year"
      csuite_domain: "ceo" | "cmo" | "cvo" | "coo" | "cfo"
      entity_type:
        | "person"
        | "company"
        | "project"
        | "product"
        | "concept"
        | "tool"
        | "metric"
        | "process"
        | "goal"
        | "location"
        | "event"
        | "resource"
      knowledge_source_type:
        | "file"
        | "url"
        | "note"
        | "conversation"
        | "code"
        | "image"
        | "audio"
        | "video"
      provenance_type:
        | "human_authored"
        | "human_uploaded"
        | "ai_extracted"
        | "ai_generated"
        | "ai_inferred"
        | "system_imported"
        | "human_edited"
        | "human_verified"
      relationship_type:
        | "owns"
        | "created_by"
        | "depends_on"
        | "related_to"
        | "part_of"
        | "references"
        | "competes_with"
        | "integrates_with"
        | "reports_to"
        | "similar_to"
        | "precedes"
        | "follows"
        | "influences"
        | "measures"
      subscription_status:
        | "active"
        | "trialing"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "incomplete"
      subscription_tier: "individual_vip" | "collective_pro" | "ecosystem_ceo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      iceberg_namespaces: {
        Row: {
          bucket_name: string
          catalog_id: string
          created_at: string
          id: string
          metadata: Json
          name: string
          updated_at: string
        }
        Insert: {
          bucket_name: string
          catalog_id: string
          created_at?: string
          id?: string
          metadata?: Json
          name: string
          updated_at?: string
        }
        Update: {
          bucket_name?: string
          catalog_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "iceberg_namespaces_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "buckets_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      iceberg_tables: {
        Row: {
          bucket_name: string
          catalog_id: string
          created_at: string
          id: string
          location: string
          name: string
          namespace_id: string
          remote_table_id: string | null
          shard_id: string | null
          shard_key: string | null
          updated_at: string
        }
        Insert: {
          bucket_name: string
          catalog_id: string
          created_at?: string
          id?: string
          location: string
          name: string
          namespace_id: string
          remote_table_id?: string | null
          shard_id?: string | null
          shard_key?: string | null
          updated_at?: string
        }
        Update: {
          bucket_name?: string
          catalog_id?: string
          created_at?: string
          id?: string
          location?: string
          name?: string
          namespace_id?: string
          remote_table_id?: string | null
          shard_id?: string | null
          shard_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "iceberg_tables_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "buckets_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iceberg_tables_namespace_id_fkey"
            columns: ["namespace_id"]
            isOneToOne: false
            referencedRelation: "iceberg_namespaces"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      delete_leaf_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_level: { Args: { name: string }; Returns: number }
      get_prefix: { Args: { name: string }; Returns: string }
      get_prefixes: { Args: { name: string }; Returns: string[] }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          start_after?: string
        }
        Returns: {
          id: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      lock_top_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_legacy_v1: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v1_optimised: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      billing_interval: ["month", "year"],
      csuite_domain: ["ceo", "cmo", "cvo", "coo", "cfo"],
      entity_type: [
        "person",
        "company",
        "project",
        "product",
        "concept",
        "tool",
        "metric",
        "process",
        "goal",
        "location",
        "event",
        "resource",
      ],
      knowledge_source_type: [
        "file",
        "url",
        "note",
        "conversation",
        "code",
        "image",
        "audio",
        "video",
      ],
      provenance_type: [
        "human_authored",
        "human_uploaded",
        "ai_extracted",
        "ai_generated",
        "ai_inferred",
        "system_imported",
        "human_edited",
        "human_verified",
      ],
      relationship_type: [
        "owns",
        "created_by",
        "depends_on",
        "related_to",
        "part_of",
        "references",
        "competes_with",
        "integrates_with",
        "reports_to",
        "similar_to",
        "precedes",
        "follows",
        "influences",
        "measures",
      ],
      subscription_status: [
        "active",
        "trialing",
        "past_due",
        "canceled",
        "unpaid",
        "incomplete",
      ],
      subscription_tier: ["individual_vip", "collective_pro", "ecosystem_ceo"],
    },
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const

// Type aliases for common enum types
export type SubscriptionTier = Database['public']['Enums']['subscription_tier']
export type SubscriptionStatus = Database['public']['Enums']['subscription_status']
export type BillingInterval = Database['public']['Enums']['billing_interval']
export type CSuiteDomain = Database['public']['Enums']['csuite_domain']
export type EntityType = Database['public']['Enums']['entity_type']
export type KnowledgeSourceType = Database['public']['Enums']['knowledge_source_type']
export type ProvenanceType = Database['public']['Enums']['provenance_type']
export type RelationshipType = Database['public']['Enums']['relationship_type']
