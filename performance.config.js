export default {
  targets: {
    // Performance targets based on best practices
    web: {
      firstContentfulPaint: '1.2s',
      largestContentfulPaint: '2.0s', 
      firstInputDelay: '50ms',
      interactionToNextPaint: '100ms',
      cumulativeLayoutShift: 0.05,
      totalBlockingTime: '150ms'
    },
    mobile: {
      firstContentfulPaint: '1.8s',
      largestContentfulPaint: '3.0s',
      firstInputDelay: '100ms',
      interactionToNextPaint: '150ms',
      cumulativeLayoutShift: 0.1,
      totalBlockingTime: '300ms'
    },
    ai: {
      inferenceLatency: '300ms',
      streamingDelay: '50ms',
      tokenThroughput: '100 tokens/s',
      contextProcessing: '100ms',
      toolCallLatency: '200ms'
    }
  },
  optimization: {
    // Build-time optimizations
    build: {
      enableTurbopack: true,
      enableTreeShaking: true,
      enableMinification: true,
      enableCompression: true,
      enableCodeSplitting: true,
      bundleAnalysis: true
    },
    // Runtime optimizations
    runtime: {
      enableImageOptimization: true,
      enableFontOptimization: true,
      enablePrefetching: true,
      enableServiceWorker: true,
      enableEdgeCaching: true,
      enableStreamingSSR: true
    },
    // AI-specific optimizations
    ai: {
      enableModelCaching: true,
      enableResponseCaching: true,
      enableBatching: true,
      enableStreaming: true,
      enableEdgeInference: true,
      enableComputeOptimization: true
    }
  },
  monitoring: {
    realUserMonitoring: true,
    syntheticMonitoring: true,
    coreWebVitals: true,
    customMetrics: true,
    
    tools: {
      lighthouse: true,
      webPageTest: true,
      speedCurve: true,
      newRelic: false, // Optional
      datadog: false   // Optional
    },
    
    alerts: {
      performanceDegradation: true,
      thresholdViolations: true,
      budgetExceeded: true,
      errorRateIncrease: true
    }
  },
  budgets: {
    // Performance budgets
    bundle: {
      initial: '200kb',
      async: '100kb',
      total: '1mb'
    },
    timing: {
      server: '100ms',
      client: '300ms',
      total: '400ms'
    },
    network: {
      requests: 50,
      totalSize: '2mb',
      imageSize: '500kb'
    }
  },
  testing: {
    frameworks: ['lighthouse-ci', 'web-vitals', '@next/bundle-analyzer'],
    environments: ['development', 'staging', 'production'],
    devices: ['desktop', 'tablet', 'mobile'],
    networks: ['fast-3g', 'slow-3g', 'offline']
  }
};