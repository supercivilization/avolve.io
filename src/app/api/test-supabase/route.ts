/**
 * Supabase Connection Test Endpoint
 *
 * GET /api/test-supabase
 *
 * Tests Supabase connection and returns status
 */

import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createServerClient()

    // Test basic connection
    const { data, error } = await supabase
      .from('_schema_version')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json({
        connected: false,
        error: error.message,
        details: 'Database connection failed'
      }, { status: 500 })
    }

    return NextResponse.json({
      connected: true,
      database: 'Supercivilization',
      projectId: 'coybefkmcykzbeosjgyt',
      message: 'Successfully connected to Supabase'
    })
  } catch (error) {
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Failed to create Supabase client'
    }, { status: 500 })
  }
}
