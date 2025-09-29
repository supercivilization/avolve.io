export default {
  testDir: './tests/ai',
  use: {
    baseURL: 'http://localhost:3000',
    aiModels: ['gpt-4o', 'claude-3-5-sonnet', 'gemini-2.0-flash'],
    scenarios: [
      'happy-path',
      'edge-cases', 
      'security-tests',
      'bias-detection',
      'hallucination-tests',
      'prompt-injection-tests',
      'accessibility-validation',
      'performance-benchmarks'
    ],
    validation: {
      outputSanitization: true,
      biasDetection: true,
      factualAccuracy: true,
      ethicalCompliance: true
    }
  },
  projects: [
    {
      name: 'ai-unit-tests',
      testMatch: /.*\.ai\.test\.ts/,
      use: {
        framework: 'vitest',
        coverage: true
      }
    },
    {
      name: 'llm-evaluation',
      testMatch: /.*\.llm\.test\.ts/,
      use: {
        framework: 'deepeval',
        metrics: ['faithfulness', 'answer_relevancy', 'contextual_precision']
      }
    },
    {
      name: 'prompt-testing',
      testMatch: /.*\.prompt\.test\.ts/,
      use: {
        framework: 'promptfoo',
        evaluation: ['accuracy', 'consistency', 'safety']
      }
    },
    {
      name: 'ai-integration-tests',
      testMatch: /.*\.integration\.ai\.test\.ts/,
      use: {
        framework: 'playwright',
        aiValidation: true
      }
    }
  ],
  reporting: {
    format: ['html', 'json', 'junit'],
    aiMetrics: true,
    performanceBaseline: true,
    securityScan: true
  },
  monitoring: {
    realTimeAlerts: true,
    costTracking: true,
    performanceThresholds: {
      responseTime: '2s',
      accuracy: 0.95,
      safety: 0.99
    }
  }
};