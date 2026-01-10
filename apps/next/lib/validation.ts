// Zod validation schemas for API routes
import { z } from 'zod'

// C-Suite domain enum
export const CSuiteDomainSchema = z.enum(['ceo', 'cmo', 'cvo', 'coo', 'cfo'])

// Knowledge source type enum
export const KnowledgeSourceTypeSchema = z.enum(['file', 'url', 'note'])

// ============================================================================
// Brain Chat API
// ============================================================================

export const BrainChatRequestSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(10000, 'Message cannot exceed 10,000 characters')
    .transform((s) => s.trim()),

  conversation_id: z.string().uuid('Invalid conversation ID format').optional(),

  domain: CSuiteDomainSchema.optional(),

  context_limit: z.number().int().min(1).max(20).default(5),
})

export type BrainChatRequest = z.infer<typeof BrainChatRequestSchema>

// ============================================================================
// Brain Search API
// ============================================================================

export const BrainSearchRequestSchema = z.object({
  query: z
    .string()
    .min(2, 'Query must be at least 2 characters')
    .max(500, 'Query cannot exceed 500 characters')
    .transform((s) => s.trim()),

  domains: z.array(CSuiteDomainSchema).max(5).optional(),

  source_types: z.array(KnowledgeSourceTypeSchema).max(3).optional(),

  limit: z.number().int().min(1).max(50).default(10),

  offset: z.number().int().min(0).max(1000).default(0),

  semantic_weight: z.number().min(0).max(1).default(0.7),
})

export type BrainSearchRequest = z.infer<typeof BrainSearchRequestSchema>

// ============================================================================
// Validation Helper
// ============================================================================

export interface ValidationResult<T> {
  success: boolean
  data?: T
  error?: string
  details?: z.ZodIssue[]
}

/**
 * Safely parse and validate request body with Zod schema
 * Returns typed data or error details for API response
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  body: unknown
): ValidationResult<T> {
  try {
    const result = schema.safeParse(body)

    if (result.success) {
      return { success: true, data: result.data }
    }

    // Format error message from first issue
    const firstIssue = result.error.issues[0]
    const path = firstIssue.path.join('.')
    const message = path ? `${path}: ${firstIssue.message}` : firstIssue.message

    return {
      success: false,
      error: message,
      details: result.error.issues,
    }
  } catch (e) {
    return {
      success: false,
      error: 'Invalid request body',
    }
  }
}

// ============================================================================
// Sanitization Helpers
// ============================================================================

/**
 * Basic input sanitization to prevent injection attacks
 * Removes null bytes, control characters, and normalizes whitespace
 */
export function sanitizeInput(input: string): string {
  return (
    input
      // Remove null bytes
      .replace(/\0/g, '')
      // Remove control characters except newlines and tabs
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Normalize multiple spaces to single space
      .replace(/ +/g, ' ')
      // Trim leading/trailing whitespace
      .trim()
  )
}

/**
 * Check if string contains potential prompt injection patterns
 * Returns true if suspicious content detected
 */
export function detectPromptInjection(input: string): boolean {
  const suspiciousPatterns = [
    // System prompt override attempts
    /\bsystem\s*:\s*/i,
    /\bignore\s+(previous|above|all)\s+instructions/i,
    /\byou\s+are\s+now\b/i,
    /\bpretend\s+you\s+are\b/i,
    /\bact\s+as\s+if\b/i,
    // Jailbreak patterns
    /\bDAN\b/,
    /\bdo\s+anything\s+now\b/i,
    /\bjailbreak/i,
    // Role override attempts
    /\[SYSTEM\]/i,
    /\[INST\]/i,
    /<<SYS>>/i,
    /<\|im_start\|>/i,
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(input))
}
