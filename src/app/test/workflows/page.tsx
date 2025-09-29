'use client';

/**
 * Workflow Testing Page - Quick Testing Interface
 *
 * Simple interface for testing and validating workflow components
 */

import { useState } from 'react';
import {
  startIntelligenceWorkflow,
  testWorkflowComponent,
  getRecentIntelligence,
  getWorkflowMetrics,
  searchIntelligence
} from '@/app/actions/workflow-actions';

export default function WorkflowTestPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('AI workflow automation');

  const addResult = (title: string, data: any, success = true) => {
    const result = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      title,
      success,
      data: JSON.stringify(data, null, 2)
    };

    setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(true);
    try {
      const result = await testFn();
      addResult(testName, result, result.success !== false);
    } catch (error) {
      addResult(testName, { error: error.message }, false);
    }
    setLoading(false);
  };

  const tests = [
    {
      name: 'Test GitHub Collection',
      fn: () => testWorkflowComponent('github')
    },
    {
      name: 'Test AI Analysis',
      fn: () => testWorkflowComponent('analysis')
    },
    {
      name: 'Test Content Generation',
      fn: () => testWorkflowComponent('generation')
    },
    {
      name: 'Get Recent Intelligence',
      fn: () => getRecentIntelligence(5)
    },
    {
      name: 'Get Workflow Metrics',
      fn: () => getWorkflowMetrics()
    },
    {
      name: 'Search Intelligence',
      fn: () => searchIntelligence(searchQuery, 3)
    }
  ];

  const runFullWorkflow = () => {
    runTest('Full Intelligence Workflow', startIntelligenceWorkflow);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Workflow Testing Interface</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Test individual components or run the complete AI intelligence workflow
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={runFullWorkflow}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-4 rounded-lg font-medium transition-colors text-left"
          >
            <div className="font-semibold">🚀 Run Full Workflow</div>
            <div className="text-sm opacity-90">Complete intelligence pipeline</div>
          </button>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search query..."
                className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-sm"
              />
            </div>
            <button
              onClick={() => runTest('Search Intelligence', () => searchIntelligence(searchQuery, 5))}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded font-medium transition-colors text-sm"
            >
              🔍 Search Intelligence
            </button>
          </div>
        </div>
      </div>

      {/* Component Tests */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Component Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {tests.slice(0, 5).map((test, i) => (
            <button
              key={i}
              onClick={() => runTest(test.name, test.fn)}
              disabled={loading}
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:opacity-50 px-4 py-3 rounded-lg transition-colors text-sm text-left"
            >
              <div className="font-medium">{test.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="text-blue-700 dark:text-blue-300">Running test...</span>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test Results</h2>

        {results.length === 0 ? (
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">No test results yet. Run a test to see results here.</p>
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className={`rounded-lg border p-4 ${
                result.success
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                    {result.success ? '✅' : '❌'}
                  </span>
                  <h3 className="font-semibold">{result.title}</h3>
                </div>
                <span className="text-xs text-zinc-500">{result.timestamp}</span>
              </div>

              <details className="group">
                <summary className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                  <span className="group-open:hidden">Show details</span>
                  <span className="hidden group-open:inline">Hide details</span>
                </summary>
                <pre className="mt-3 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded p-3 overflow-x-auto">
                  {result.data}
                </pre>
              </details>
            </div>
          ))
        )}
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Testing Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">Prerequisites</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Supabase database running locally</li>
              <li>Database migrations applied</li>
              <li>Environment variables configured</li>
              <li>API keys set for AI providers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">Test Flow</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Start with component tests</li>
              <li>Check database connections</li>
              <li>Test AI model integration</li>
              <li>Run full workflow when ready</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <span className="text-amber-600">⚠️</span>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200">First Time Setup</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Run <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">supabase start</code> and apply migrations before testing.
                Some tests require API keys to be configured in your environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}