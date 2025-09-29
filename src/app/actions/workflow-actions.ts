'use server';

/**
 * Workflow Server Actions - AI-Native Intelligence Pipeline
 *
 * Server actions for triggering and managing AI-native workflows
 */

import { CoreWorkflowOrchestrator } from '@/lib/workflows/core-orchestrator';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Global orchestrator instance
let orchestrator: CoreWorkflowOrchestrator;

function getOrchestrator() {
  if (!orchestrator) {
    orchestrator = new CoreWorkflowOrchestrator();
  }
  return orchestrator;
}

/**
 * Start the main intelligence workflow
 */
export async function startIntelligenceWorkflow() {
  try {
    const orchestrator = getOrchestrator();
    const result = await orchestrator.executeIntelligenceWorkflow();

    // Revalidate insights pages
    revalidatePath('/insights');
    revalidatePath('/dashboard');

    return {
      success: true,
      workflow: result,
      message: 'Intelligence workflow started successfully'
    };
  } catch (error) {
    console.error('Failed to start intelligence workflow:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to start intelligence workflow'
    };
  }
}

/**
 * Get current workflow status
 */
export async function getWorkflowStatus() {
  try {
    // Get latest workflow execution
    const { data: executions } = await supabase
      .from('workflow_executions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    return {
      success: true,
      status: executions?.[0] || null
    };
  } catch (error) {
    console.error('Failed to get workflow status:', error);
    return {
      success: false,
      error: error.message,
      status: null
    };
  }
}

/**
 * Get recent intelligence data
 */
export async function getRecentIntelligence(limit = 50) {
  try {
    const { data: intelligence } = await supabase
      .from('social_intelligence')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    return {
      success: true,
      data: intelligence || []
    };
  } catch (error) {
    console.error('Failed to get recent intelligence:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
}

/**
 * Get generated content/insights
 */
export async function getGeneratedInsights() {
  try {
    const { data: insights } = await supabase
      .from('generated_content')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    return {
      success: true,
      data: insights || []
    };
  } catch (error) {
    console.error('Failed to get generated insights:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
}

/**
 * Search intelligence using vector similarity
 */
export async function searchIntelligence(query: string, limit = 10) {
  try {
    const { embed } = await import('ai');
    const { openai } = await import('@ai-sdk/openai');

    // Generate embedding for query
    const embedding = await embed({
      model: openai('text-embedding-3-large'),
      value: query
    });

    // Vector similarity search
    const { data: results } = await supabase.rpc('match_intelligence', {
      query_embedding: embedding.embedding,
      match_threshold: 0.7,
      match_count: limit
    });

    return {
      success: true,
      results: results || []
    };
  } catch (error) {
    console.error('Failed to search intelligence:', error);
    return {
      success: false,
      error: error.message,
      results: []
    };
  }
}

/**
 * Trigger content generation for specific topic
 */
export async function generateContentForTopic(topic: string) {
  try {
    const orchestrator = getOrchestrator();

    // Get relevant intelligence for topic
    const searchResult = await searchIntelligence(topic);
    if (!searchResult.success || searchResult.results.length === 0) {
      return {
        success: false,
        message: 'No relevant intelligence found for topic'
      };
    }

    // Generate content using the orchestrator's analysis methods
    // This would need to be extracted to a separate method
    // For now, return the search results
    return {
      success: true,
      intelligence: searchResult.results,
      message: `Found ${searchResult.results.length} relevant intelligence items for "${topic}"`
    };
  } catch (error) {
    console.error('Failed to generate content for topic:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to generate content'
    };
  }
}

/**
 * Get workflow performance metrics
 */
export async function getWorkflowMetrics() {
  try {
    const [
      totalIntelligence,
      recentAnalyses,
      generatedContent,
      publishedInsights
    ] = await Promise.all([
      supabase.from('social_intelligence').select('id', { count: 'exact' }),
      supabase
        .from('intelligence_analysis')
        .select('*')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase.from('generated_content').select('id', { count: 'exact' }),
      supabase
        .from('generated_content')
        .select('id')
        .not('published_at', 'is', null)
    ]);

    return {
      success: true,
      metrics: {
        total_intelligence: totalIntelligence.count || 0,
        recent_analyses: recentAnalyses.data?.length || 0,
        generated_content: generatedContent.count || 0,
        published_insights: publishedInsights.data?.length || 0,
        last_updated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Failed to get workflow metrics:', error);
    return {
      success: false,
      error: error.message,
      metrics: null
    };
  }
}

/**
 * Test individual workflow components
 */
export async function testWorkflowComponent(component: 'github' | 'analysis' | 'generation') {
  try {
    const orchestrator = getOrchestrator();

    switch (component) {
      case 'github':
        // Test GitHub data collection
        const githubData = await (orchestrator as any).collectGitHubIntelligence();
        return {
          success: true,
          data: githubData.slice(0, 5), // Return first 5 items
          message: `GitHub collection test completed: ${githubData.length} items`
        };

      case 'analysis':
        // Test AI analysis on recent data
        const recentData = await getRecentIntelligence(10);
        if (!recentData.success) {
          return {
            success: false,
            message: 'No recent data available for analysis test'
          };
        }

        // This would call the analysis methods
        return {
          success: true,
          message: 'Analysis test completed (mock result)',
          data: {
            sentiment: 0.7,
            topics: ['AI', 'workflow', 'automation'],
            trends: ['increasing-ai-adoption']
          }
        };

      case 'generation':
        // Test content generation
        return {
          success: true,
          message: 'Generation test completed (mock result)',
          data: {
            title: 'Test Generated Insight',
            description: 'This is a test insight generated by the workflow system'
          }
        };

      default:
        return {
          success: false,
          message: 'Unknown component'
        };
    }
  } catch (error) {
    console.error('Failed to test workflow component:', error);
    return {
      success: false,
      error: error.message,
      message: 'Component test failed'
    };
  }
}