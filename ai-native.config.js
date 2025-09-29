/** @type {import('@ai-native/core').AIConfig} */
const aiConfig = {
  // Core AI-native development settings
  framework: {
    name: "avolve-ai-native",
    version: "1.0.0",
    description: "Complete AI-native development environment with 8-layer architecture"
  },

  // Technology stack configuration
  stack: {
    runtime: {
      name: "Node.js",
      version: "24.8.0",
      features: ["native-typescript", "v8-13.6", "maglev-compiler"]
    },
    framework: {
      name: "Next.js",
      version: "15.5.3",
      features: ["turbopack", "server-components", "app-router"]
    },
    ui: {
      name: "React",
      version: "19.1.1",
      features: ["react-compiler", "server-components", "concurrent-features"]
    },
    types: {
      name: "TypeScript",
      version: "5.9.2",
      features: ["native-execution", "compile-caching", "go-compiler-ready"]
    },
    styling: {
      name: "Tailwind CSS",
      version: "4.1.13",
      features: ["oxide-engine", "css-first-config", "microsecond-builds"]
    },
    components: {
      name: "shadcn/ui",
      version: "latest",
      features: ["ai-enhanced", "accessibility-first", "performance-optimized"]
    },
    deployment: {
      name: "Vercel AI Cloud",
      features: ["edge-deployment", "fluid-compute", "global-distribution"]
    },
    ai: {
      name: "Vercel AI SDK",
      version: "5.0.47",
      features: ["multi-model", "tool-calling", "generative-ui"]
    }
  },

  // AI development configuration
  ai: {
    // Model providers and configuration
    providers: {
      openai: {
        models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
        apiKey: process.env.OPENAI_API_KEY,
        features: ["function-calling", "vision", "reasoning"]
      },
      anthropic: {
        models: ["claude-3.5-sonnet", "claude-3-haiku", "claude-3-opus"],
        apiKey: process.env.ANTHROPIC_API_KEY,
        features: ["function-calling", "vision", "long-context"]
      },
      google: {
        models: ["gemini-1.5-pro", "gemini-1.5-flash"],
        apiKey: process.env.GOOGLE_AI_API_KEY,
        features: ["function-calling", "vision", "multimodal"]
      }
    },

    // Tool generation settings
    toolGeneration: {
      enabled: true,
      outputDir: "./apps/web/src/tools",
      typescript: true,
      validation: true,
      testing: true,
      documentation: true
    },

    // Agent orchestration
    agents: {
      enabled: true,
      maxConcurrent: 15,
      backgroundTasks: true,
      contextSharing: true,
      predictivePreloading: true
    },

    // Code generation preferences
    codeGeneration: {
      style: "functional",
      patterns: ["hooks", "server-components", "type-safe"],
      accessibility: "WCAG-AA",
      performance: "core-web-vitals-optimized",
      testing: "comprehensive"
    }
  },

  // Development workflow automation
  automation: {
    // Component generation
    components: {
      generateTests: true,
      generateStories: true,
      generateDocs: true,
      enforceAccessibility: true,
      optimizePerformance: true
    },

    // Code quality
    quality: {
      autoLinting: true,
      autoFormatting: true,
      autoTesting: true,
      accessibilityChecks: true,
      performanceMonitoring: true
    },

    // Deployment
    deployment: {
      autoPreview: true,
      performanceAudits: true,
      accessibilityAudits: true,
      securityScans: true,
      seoOptimization: true
    }
  },

  // Accessibility configuration
  accessibility: {
    enforceWCAG: "AA",
    autoAriaLabels: true,
    contrastValidation: true,
    focusManagement: true,
    screenReaderOptimization: true,
    keyboardNavigation: true,
    motionPreferences: true
  },

  // Performance optimization
  performance: {
    coreWebVitals: {
      lcp: { target: 2500, threshold: 4000 },
      fid: { target: 100, threshold: 300 },
      cls: { target: 0.1, threshold: 0.25 }
    },
    bundleOptimization: true,
    codeSplitting: true,
    imageOptimization: true,
    fontOptimization: true,
    edgeOptimization: true
  },

  // Testing configuration
  testing: {
    unit: {
      framework: "vitest",
      coverage: { threshold: 80 },
      aiGenerated: true
    },
    integration: {
      framework: "vitest",
      apiTesting: true,
      databaseTesting: true
    },
    e2e: {
      framework: "playwright",
      accessibilityTesting: true,
      performanceTesting: true,
      crossBrowserTesting: true
    },
    ai: {
      modelValidation: true,
      biasDetection: true,
      safetyChecks: true,
      hallucination detection: true
    }
  },

  // Monitoring and observability
  monitoring: {
    performance: {
      realUserMonitoring: true,
      syntheticMonitoring: true,
      coreWebVitals: true
    },
    accessibility: {
      automatedScanning: true,
      realUserFeedback: true,
      complianceTracking: true
    },
    ai: {
      inferenceLatency: true,
      tokenUsage: true,
      costTracking: true,
      qualityMetrics: true
    }
  },

  // Integration settings
  integrations: {
    mcp: {
      configFile: "./mcp.config.json",
      servers: [
        "supabase",
        "stripe",
        "github",
        "filesystem",
        "shadcn-ui",
        "vercel",
        "sequential-thinking",
        "web-search"
      ]
    },
    vercel: {
      projectId: process.env.VERCEL_PROJECT_ID,
      teamId: process.env.VERCEL_TEAM_ID,
      token: process.env.VERCEL_TOKEN
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  }
};

module.exports = aiConfig;