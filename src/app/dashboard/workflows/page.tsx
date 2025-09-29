'use client';

/**
 * Workflow Dashboard - Real-time Intelligence Monitoring
 *
 * Live dashboard for monitoring and controlling AI-native workflows
 */

import { useState, useEffect } from 'react';
import { useStreamableValue } from 'ai/rsc';
import {
  startIntelligenceWorkflow,
  getWorkflowStatus,
  getRecentIntelligence,
  getGeneratedInsights,
  getWorkflowMetrics,
  testWorkflowComponent,
  searchIntelligence
} from '@/app/actions/workflow-actions';

interface WorkflowStatus {
  stage: string;
  progress: number;
  message: string;
  data?: any;
  timestamp: Date;
}

interface IntelligenceItem {
  id: string;
  source: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  topics: string[];
  created_at: string;
}

export default function WorkflowDashboard() {
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [recentIntelligence, setRecentIntelligence] = useState<IntelligenceItem[]>([]);
  const [generatedInsights, setGeneratedInsights] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    loadDashboardData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statusRes, metricsRes, intelligenceRes, insightsRes] = await Promise.all([
        getWorkflowStatus(),
        getWorkflowMetrics(),
        getRecentIntelligence(20),
        getGeneratedInsights()
      ]);

      if (statusRes.success) setWorkflowStatus(statusRes.status);
      if (metricsRes.success) setMetrics(metricsRes.metrics);
      if (intelligenceRes.success) setRecentIntelligence(intelligenceRes.data);
      if (insightsRes.success) setGeneratedInsights(insightsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleStartWorkflow = async () => {
    setIsRunning(true);
    try {
      const result = await startIntelligenceWorkflow();
      if (result.success) {
        console.log('Workflow started successfully');
        await loadDashboardData();
      } else {
        console.error('Workflow failed:', result.error);
      }
    } catch (error) {
      console.error('Failed to start workflow:', error);
    }
    setIsRunning(false);
  };

  const handleTestComponent = async (component: 'github' | 'analysis' | 'generation') => {
    try {
      const result = await testWorkflowComponent(component);
      console.log(`${component} test result:`, result);

      if (result.success) {
        // Show success feedback
        alert(`${component} test successful: ${result.message}`);
      } else {
        alert(`${component} test failed: ${result.message}`);
      }
    } catch (error) {
      console.error(`Failed to test ${component}:`, error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const result = await searchIntelligence(searchQuery);
      if (result.success) {
        setSearchResults(result.results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Workflow Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Monitor and control your AI-native intelligence workflows
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleStartWorkflow}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isRunning ? 'Running...' : 'Start Workflow'}
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Intelligence"
            value={metrics.total_intelligence}
            subtitle="Items collected"
          />
          <MetricCard
            title="Recent Analyses"
            value={metrics.recent_analyses}
            subtitle="Past 7 days"
          />
          <MetricCard
            title="Generated Content"
            value={metrics.generated_content}
            subtitle="Total insights"
          />
          <MetricCard
            title="Published Insights"
            value={metrics.published_insights}
            subtitle="Live on site"
          />
        </div>
      )}

      {/* Workflow Status */}
      {workflowStatus && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Current Workflow Status</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{workflowStatus.stage}</span>
                  <span className="text-sm text-zinc-500">{workflowStatus.progress}%</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all"
                    style={{ width: `${workflowStatus.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{workflowStatus.message}</p>
            <p className="text-xs text-zinc-500">
              Last updated: {formatTimestamp(workflowStatus.timestamp.toString())}
            </p>
          </div>
        </div>
      )}

      {/* Component Testing */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Component Testing</h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleTestComponent('github')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Test GitHub Collection
          </button>
          <button
            onClick={() => handleTestComponent('analysis')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Test AI Analysis
          </button>
          <button
            onClick={() => handleTestComponent('generation')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Test Content Generation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Intelligence */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Intelligence</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentIntelligence.map((item) => (
              <div
                key={item.id}
                className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.source}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-zinc-800 dark:text-zinc-200 line-clamp-2">
                  {item.content}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-1">
                    {item.topics?.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">
                    {formatTimestamp(item.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Insights */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Insights</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {generatedInsights.map((insight) => (
              <div
                key={insight.id}
                className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {insight.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    insight.published_at
                      ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                      : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {insight.published_at ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {formatTimestamp(insight.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence Search */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Intelligence Search</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intelligence using semantic similarity..."
            className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {searchResults.map((result, i) => (
              <div
                key={i}
                className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {result.source}
                  </span>
                  <span className="text-xs text-zinc-500">
                    Similarity: {(result.similarity * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-zinc-800 dark:text-zinc-200">
                  {result.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle }: { title: string; value: number; subtitle: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{value}</p>
          <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}