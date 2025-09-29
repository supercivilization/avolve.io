#!/usr/bin/env node

/**
 * GitHub Ecosystem Comprehensive Repository Mapper
 *
 * Discovers and maps all official GitHub repositories across the complete
 * AI ecosystem and modern tech stack for comprehensive monitoring.
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 23, 2025
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class GitHubEcosystemMapper {
  constructor() {
    this.githubToken = process.env.GITHUB_TOKEN;
    this.baseUrl = 'api.github.com';

    // Complete ecosystem mapping with official GitHub organizations and key repositories
    this.ecosystemMap = {
      // Modern Tech Stack Core
      'vercel-nextjs': {
        organization: 'vercel',
        primaryRepos: [
          'vercel/next.js',           // Next.js framework
          'vercel/ai',                // Vercel AI SDK
          'vercel/turborepo',         // Turbo monorepo system
          'vercel/turbo',            // Turbo engine
          'vercel/examples',         // Official examples
          'vercel/platforms',        // Platform examples
          'vercel/commerce',         // E-commerce template
          'vercel/app-playground',   // App router examples
          'vercel/hyper',           // Terminal
          'vercel/pkg'              // Node.js packaging
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions', 'issues'],
        priority: 'critical'
      },

      'react-meta': {
        organization: 'facebook',
        primaryRepos: [
          'facebook/react',           // React core
          'facebook/react-native',    // React Native
          'facebook/create-react-app', // CRA
          'facebook/relay',           // GraphQL client
          'facebook/flow',            // Type checker
          'facebook/jest',            // Testing framework
          'facebook/docusaurus',      // Documentation
          'facebook/flipper',         // Debugging platform
          'facebook/lexical',         // Rich text editor
          'facebook/yoga'            // Layout engine
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions'],
        priority: 'critical'
      },

      'microsoft-typescript': {
        organization: 'microsoft',
        primaryRepos: [
          'microsoft/TypeScript',         // TypeScript language
          'microsoft/TypeScript-Website', // TypeScript website
          'microsoft/vscode',            // VS Code editor
          'microsoft/playwright',        // Browser testing
          'microsoft/monaco-editor',     // Code editor
          'microsoft/fluentui',         // Fluent UI
          'microsoft/fast',             // Web components
          'microsoft/rushstack',        // Build tools
          'microsoft/botframework',     // Bot framework
          'microsoft/DeepSpeed'         // Deep learning optimization
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions'],
        priority: 'critical'
      },

      'tailwindcss': {
        organization: 'tailwindlabs',
        primaryRepos: [
          'tailwindlabs/tailwindcss',     // Tailwind CSS core
          'tailwindlabs/headlessui',      // Headless UI components
          'tailwindlabs/heroicons',       // Icon library
          'tailwindlabs/prettier-plugin-tailwindcss', // Prettier plugin
          'tailwindlabs/tailwindcss-typography',      // Typography plugin
          'tailwindlabs/tailwindcss-forms',          // Forms plugin
          'tailwindlabs/tailwindcss-aspect-ratio',   // Aspect ratio plugin
          'tailwindlabs/oxide',           // CSS engine
          'tailwindlabs/tailwindui-template' // UI templates
        ],
        watchTypes: ['releases', 'discussions', 'issues'],
        priority: 'high'
      },

      'supabase': {
        organization: 'supabase',
        primaryRepos: [
          'supabase/supabase',        // Main platform
          'supabase/supabase-js',     // JavaScript client
          'supabase/auth',            // Authentication
          'supabase/storage',         // File storage
          'supabase/realtime',        // Real-time subscriptions
          'supabase/edge-runtime',    // Edge functions runtime
          'supabase/postgres',        // PostgreSQL enhancements
          'supabase/gotrue',          // Auth server
          'supabase/pg_graphql',      // GraphQL for PostgreSQL
          'supabase/vecs'            // Vector embeddings
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions'],
        priority: 'critical'
      },

      // AI Ecosystem - Primary Providers
      'openai': {
        organization: 'openai',
        primaryRepos: [
          'openai/openai-python',         // Python SDK
          'openai/openai-node',          // Node.js SDK
          'openai/openai-go',            // Go SDK
          'openai/openai-java',          // Java SDK
          'openai/whisper',              // Speech recognition
          'openai/tiktoken',             // Tokenizer
          'openai/gpt-2',               // GPT-2 model
          'openai/CLIP',                // Vision model
          'openai/point-e',             // 3D point clouds
          'openai/consistency_models'    // Consistency models
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions'],
        priority: 'critical'
      },

      'anthropic': {
        organization: 'anthropics',
        primaryRepos: [
          'anthropics/anthropic-sdk-python',      // Python SDK
          'anthropics/anthropic-sdk-typescript',  // TypeScript SDK
          'anthropics/anthropic-quickstarts',     // Quick start examples
          'anthropics/claude-code',               // Claude Code
          'anthropics/claude-3-5-sonnet-artifacts', // Artifacts
          'anthropics/courses',                   // Educational content
          'anthropics/anthropic-cookbook'         // Recipe/examples
        ],
        watchTypes: ['releases', 'security-advisories', 'discussions'],
        priority: 'critical'
      },

      'google-ai': {
        organization: 'google',
        primaryRepos: [
          'google/generative-ai-js',      // Gemini JavaScript SDK
          'google/generative-ai-python',  // Gemini Python SDK
          'google/generative-ai-go',     // Gemini Go SDK
          'google/gemini-api',           // Gemini API examples
          'google/ai-edge-torch',        // Edge AI
          'google/mediapipe',            // ML framework
          'google/flatbuffers',          // Serialization
          'google/sentencepiece'         // Text tokenization
        ],
        additionalOrgs: {
          'tensorflow': [
            'tensorflow/tensorflow',        // TensorFlow core
            'tensorflow/tfjs',             // TensorFlow.js
            'tensorflow/models',           // Pre-trained models
            'tensorflow/hub',              // Model repository
            'tensorflow/serving',          // Model serving
            'tensorflow/lite',             // Mobile/embedded
            'tensorflow/transform',        // Data preprocessing
            'tensorflow/agents'            // Reinforcement learning
          ],
          'GoogleCloudPlatform': [
            'GoogleCloudPlatform/vertex-ai-samples',  // Vertex AI
            'GoogleCloudPlatform/python-docs-samples', // Python samples
            'GoogleCloudPlatform/nodejs-docs-samples'  // Node.js samples
          ]
        },
        watchTypes: ['releases', 'security-advisories'],
        priority: 'critical'
      },

      'microsoft-azure-ai': {
        organization: 'Azure',
        primaryRepos: [
          'Azure/azure-sdk-for-js',       // Azure SDK JavaScript
          'Azure/azure-sdk-for-python',   // Azure SDK Python
          'Azure/azure-sdk-for-net',      // Azure SDK .NET
          'Azure/azure-openai-samples',   // OpenAI integration samples
          'Azure/azure-rest-api-specs',   // API specifications
          'Azure/azureml-examples',       // ML examples
          'Azure/cognitive-services-quickstart-code', // Cognitive services
          'Azure/azure-functions-openai-extension'    // Functions OpenAI
        ],
        additionalOrgs: {
          'microsoft': [
            'microsoft/semantic-kernel',    // Semantic kernel
            'microsoft/autogen',           // Multi-agent framework
            'microsoft/phi-3',             // Phi models
            'microsoft/guidance',          // Guidance language
            'microsoft/onnxruntime',       // ONNX runtime
            'microsoft/DeepSpeed',         // Deep learning optimization
            'microsoft/FLAML'             // AutoML library
          ]
        },
        watchTypes: ['releases', 'security-advisories'],
        priority: 'critical'
      },

      // AI Infrastructure Providers
      'groq': {
        organization: 'groq',
        primaryRepos: [
          'groq/groq-python',           // Python SDK
          'groq/groq-typescript',       // TypeScript SDK
          'groq/groq-go',              // Go SDK
          'groq/examples',             // Usage examples
          'groq/cookbook'              // Recipes and guides
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'high'
      },

      'mistral-ai': {
        organization: 'mistralai',
        primaryRepos: [
          'mistralai/mistral-src',          // Source code
          'mistralai/client-python',        // Python client
          'mistralai/client-js',           // JavaScript client
          'mistralai/cookbook',            // Examples and recipes
          'mistralai/mistral-inference',   // Inference code
          'mistralai/mistral-finetune'    // Fine-tuning
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'high'
      },

      'together-ai': {
        organization: 'togethercomputer',
        primaryRepos: [
          'togethercomputer/RedPajama-Data',    // Training data
          'togethercomputer/OpenChatKit',       // Chat interface
          'togethercomputer/together-python',   // Python SDK
          'togethercomputer/MoD',              // Mixture of Depths
          'togethercomputer/stripedhyena'      // Model architecture
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'medium'
      },

      'replicate': {
        organization: 'replicate',
        primaryRepos: [
          'replicate/replicate-python',     // Python client
          'replicate/replicate-javascript', // JavaScript client
          'replicate/replicate-go',        // Go client
          'replicate/cog',                 // Container toolkit
          'replicate/replicate-swift',     // Swift client
          'replicate/zoo'                  // Model collection
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'medium'
      },

      'huggingface': {
        organization: 'huggingface',
        primaryRepos: [
          'huggingface/transformers',       // Transformers library
          'huggingface/datasets',           // Datasets library
          'huggingface/tokenizers',         // Fast tokenizers
          'huggingface/accelerate',         // Training acceleration
          'huggingface/diffusers',          // Diffusion models
          'huggingface/peft',              // Parameter-efficient tuning
          'huggingface/evaluate',          // Model evaluation
          'huggingface/optimum',           // Hardware optimization
          'huggingface/safetensors',       // Safe tensor format
          'huggingface/trl'               // Transformer RL
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'high'
      },

      'cohere': {
        organization: 'cohere-ai',
        primaryRepos: [
          'cohere-ai/cohere-python',       // Python SDK
          'cohere-ai/cohere-typescript',   // TypeScript SDK
          'cohere-ai/cohere-go',          // Go SDK
          'cohere-ai/notebooks',          // Example notebooks
          'cohere-ai/quick-start-connectors' // Data connectors
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'medium'
      },

      'elevenlabs': {
        organization: 'elevenlabs',
        primaryRepos: [
          'elevenlabs/elevenlabs-python',   // Python SDK
          'elevenlabs/elevenlabs-js',      // JavaScript SDK
          'elevenlabs/elevenlabs-go',      // Go SDK
          'elevenlabs/elevenlabs-examples' // Usage examples
        ],
        watchTypes: ['releases'],
        priority: 'medium'
      },

      'deepseek': {
        organization: 'deepseek-ai',
        primaryRepos: [
          'deepseek-ai/DeepSeek-Coder',    // Code generation model
          'deepseek-ai/DeepSeek-Math',     // Mathematics model
          'deepseek-ai/DeepSeek-VL',       // Vision-language model
          'deepseek-ai/DeepSeek-MoE'      // Mixture of experts
        ],
        watchTypes: ['releases'],
        priority: 'medium'
      },

      // Development Tools & Ecosystem
      'shadcn-ui': {
        organization: 'shadcn-ui',
        primaryRepos: [
          'shadcn-ui/ui',               // Component library
          'shadcn-ui/taxonomy',         // Next.js template
          'shadcn-ui/next-template'     // Template
        ],
        watchTypes: ['releases', 'discussions'],
        priority: 'medium'
      },

      'radix-ui': {
        organization: 'radix-ui',
        primaryRepos: [
          'radix-ui/primitives',        // Headless components
          'radix-ui/themes',           // Design system
          'radix-ui/colors',           // Color system
          'radix-ui/icons'            // Icon library
        ],
        watchTypes: ['releases'],
        priority: 'medium'
      },

      'prisma': {
        organization: 'prisma',
        primaryRepos: [
          'prisma/prisma',             // Database toolkit
          'prisma/prisma-engines',     // Core engines
          'prisma/studio',            // Database GUI
          'prisma/docs'               // Documentation
        ],
        watchTypes: ['releases', 'security-advisories'],
        priority: 'medium'
      }
    };
  }

  /**
   * Make authenticated GitHub API request
   */
  async makeGitHubRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        hostname: this.baseUrl,
        path: endpoint,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Avolve-GitHub-Ecosystem-Mapper',
          'Accept': 'application/vnd.github.v3+json',
          ...(this.githubToken && { 'Authorization': `token ${this.githubToken}` }),
          ...options.headers
        }
      };

      const req = https.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);

            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({
                data: jsonData,
                headers: res.headers,
                statusCode: res.statusCode
              });
            } else {
              reject(new Error(`GitHub API Error ${res.statusCode}: ${jsonData.message || data}`));
            }
          } catch (e) {
            reject(new Error('Invalid JSON response from GitHub API'));
          }
        });
      });

      req.on('error', reject);

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    });
  }

  /**
   * Get repository information
   */
  async getRepositoryInfo(repoPath) {
    try {
      const response = await this.makeGitHubRequest(`/repos/${repoPath}`);
      const repo = response.data;

      return {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        watchers: repo.watchers_count,
        size: repo.size,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        homepage: repo.homepage,
        topics: repo.topics || [],
        license: repo.license?.name || 'None',
        hasWiki: repo.has_wiki,
        hasPages: repo.has_pages,
        hasDiscussions: repo.has_discussions,
        archived: repo.archived,
        disabled: repo.disabled,
        visibility: repo.visibility || 'public'
      };
    } catch (error) {
      console.error(`Error getting repository info for ${repoPath}:`, error.message);
      return null;
    }
  }

  /**
   * Get organization information
   */
  async getOrganizationInfo(orgName) {
    try {
      const response = await this.makeGitHubRequest(`/orgs/${orgName}`);
      const org = response.data;

      return {
        name: org.name,
        login: org.login,
        description: org.description,
        location: org.location,
        blog: org.blog,
        email: org.email,
        publicRepos: org.public_repos,
        publicGists: org.public_gists,
        followers: org.followers,
        following: org.following,
        createdAt: org.created_at,
        updatedAt: org.updated_at,
        type: org.type,
        company: org.company
      };
    } catch (error) {
      console.error(`Error getting organization info for ${orgName}:`, error.message);
      return null;
    }
  }

  /**
   * Get recent releases for a repository
   */
  async getRecentReleases(repoPath, limit = 5) {
    try {
      const response = await this.makeGitHubRequest(`/repos/${repoPath}/releases?per_page=${limit}`);
      return response.data.map(release => ({
        tagName: release.tag_name,
        name: release.name,
        publishedAt: release.published_at,
        prerelease: release.prerelease,
        draft: release.draft,
        body: release.body?.substring(0, 500) + (release.body?.length > 500 ? '...' : ''),
        htmlUrl: release.html_url
      }));
    } catch (error) {
      console.error(`Error getting releases for ${repoPath}:`, error.message);
      return [];
    }
  }

  /**
   * Map complete GitHub ecosystem
   */
  async mapCompleteEcosystem() {
    console.log('🐙 Mapping Complete GitHub Ecosystem for AI & Modern Tech Stack');
    console.log('=' .repeat(80));

    const results = {
      organizations: {},
      repositories: {},
      summary: {
        totalOrgs: 0,
        totalRepos: 0,
        totalStars: 0,
        criticalRepos: 0,
        highPriorityRepos: 0,
        mediumPriorityRepos: 0
      },
      monitoring: {
        releases: [],
        securityAdvisories: [],
        discussions: [],
        issues: []
      },
      timestamp: new Date().toISOString()
    };

    for (const [ecosystem, config] of Object.entries(this.ecosystemMap)) {
      console.log(`\n🔍 Mapping ${ecosystem} ecosystem...`);

      // Get primary organization info
      if (config.organization) {
        console.log(`   📋 Organization: ${config.organization}`);
        const orgInfo = await this.getOrganizationInfo(config.organization);
        if (orgInfo) {
          results.organizations[config.organization] = orgInfo;
          results.summary.totalOrgs++;
          console.log(`      ✅ ${orgInfo.name} (${orgInfo.publicRepos} public repos)`);
        }
      }

      // Process primary repositories
      console.log(`   📦 Primary repositories (${config.primaryRepos.length}):`);
      for (const repoPath of config.primaryRepos) {
        const repoInfo = await this.getRepositoryInfo(repoPath);
        if (repoInfo) {
          results.repositories[repoPath] = {
            ...repoInfo,
            ecosystem,
            priority: config.priority,
            watchTypes: config.watchTypes
          };

          results.summary.totalRepos++;
          results.summary.totalStars += repoInfo.stargazersCount;

          if (config.priority === 'critical') results.summary.criticalRepos++;
          else if (config.priority === 'high') results.summary.highPriorityRepos++;
          else results.summary.mediumPriorityRepos++;

          console.log(`      ✅ ${repoInfo.name} (⭐${repoInfo.stargazersCount.toLocaleString()})`);

          // Get recent releases for high-priority repos
          if (config.priority === 'critical') {
            const releases = await this.getRecentReleases(repoPath, 3);
            if (releases.length > 0) {
              results.monitoring.releases.push({
                repository: repoPath,
                releases: releases
              });
            }
          }
        } else {
          console.log(`      ❌ Failed to get info for ${repoPath}`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Process additional organizations
      if (config.additionalOrgs) {
        for (const [orgName, repos] of Object.entries(config.additionalOrgs)) {
          console.log(`   🏢 Additional org: ${orgName} (${repos.length} repos)`);

          const orgInfo = await this.getOrganizationInfo(orgName);
          if (orgInfo) {
            results.organizations[orgName] = orgInfo;
            results.summary.totalOrgs++;
          }

          for (const repoPath of repos.slice(0, 5)) { // Limit to avoid rate limits
            const repoInfo = await this.getRepositoryInfo(repoPath);
            if (repoInfo) {
              results.repositories[repoPath] = {
                ...repoInfo,
                ecosystem,
                priority: 'medium',
                watchTypes: ['releases']
              };

              results.summary.totalRepos++;
              results.summary.totalStars += repoInfo.stargazersCount;
              results.summary.mediumPriorityRepos++;

              console.log(`      ✅ ${repoInfo.name} (⭐${repoInfo.stargazersCount.toLocaleString()})`);
            }

            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }
    }

    this.displayResults(results);
    await this.saveResults(results);

    return results;
  }

  /**
   * Display comprehensive results
   */
  displayResults(results) {
    console.log('\n' + '=' .repeat(80));
    console.log('🐙 GITHUB ECOSYSTEM MAPPING COMPLETE');
    console.log('=' .repeat(80));

    console.log(`\n📊 Summary Statistics:`);
    console.log(`   Organizations: ${results.summary.totalOrgs}`);
    console.log(`   Repositories: ${results.summary.totalRepos}`);
    console.log(`   Total Stars: ${results.summary.totalStars.toLocaleString()}`);
    console.log(`   Critical Priority: ${results.summary.criticalRepos} repos`);
    console.log(`   High Priority: ${results.summary.highPriorityRepos} repos`);
    console.log(`   Medium Priority: ${results.summary.mediumPriorityRepos} repos`);

    console.log(`\n🏆 Top Repositories by Stars:`);
    const topRepos = Object.entries(results.repositories)
      .sort(([,a], [,b]) => b.stargazersCount - a.stargazersCount)
      .slice(0, 10);

    topRepos.forEach(([repoPath, info], index) => {
      console.log(`   ${index + 1}. ${info.name} (⭐${info.stargazersCount.toLocaleString()}) - ${info.ecosystem}`);
    });

    console.log(`\n🏢 Major Organizations:`);
    Object.entries(results.organizations)
      .sort(([,a], [,b]) => b.publicRepos - a.publicRepos)
      .slice(0, 10)
      .forEach(([orgName, info]) => {
        console.log(`   ${info.name || orgName}: ${info.publicRepos} public repos`);
      });

    if (results.monitoring.releases.length > 0) {
      console.log(`\n🚀 Recent Releases:`);
      results.monitoring.releases.slice(0, 5).forEach(({ repository, releases }) => {
        console.log(`   ${repository}:`);
        releases.slice(0, 2).forEach(release => {
          console.log(`     📦 ${release.tagName} (${release.publishedAt.split('T')[0]})`);
        });
      });
    }

    console.log(`\n✅ GitHub ecosystem mapping complete! Data saved to claudedocs/`);
  }

  /**
   * Save results to files
   */
  async saveResults(results) {
    const timestamp = Date.now();
    const dataDir = path.join(__dirname, '..', 'claudedocs');

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save complete results
    const resultsFile = path.join(dataDir, `github-ecosystem-mapping-${timestamp}.json`);
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

    // Save monitoring configuration
    const monitoringRepos = Object.entries(results.repositories)
      .filter(([, info]) => info.priority === 'critical' || info.priority === 'high')
      .map(([repoPath, info]) => ({
        repository: repoPath,
        priority: info.priority,
        watchTypes: info.watchTypes,
        ecosystem: info.ecosystem,
        stars: info.stargazersCount
      }));

    const monitoringFile = path.join(dataDir, 'github-monitoring-configuration.json');
    fs.writeFileSync(monitoringFile, JSON.stringify({
      repositories: monitoringRepos,
      total: monitoringRepos.length,
      lastUpdated: new Date().toISOString()
    }, null, 2));

    console.log(`\n💾 Results saved:`);
    console.log(`   Complete data: ${path.basename(resultsFile)}`);
    console.log(`   Monitoring config: ${path.basename(monitoringFile)}`);
  }

  /**
   * Generate repository list for monitoring
   */
  generateMonitoringList() {
    const allRepos = [];

    Object.entries(this.ecosystemMap).forEach(([ecosystem, config]) => {
      config.primaryRepos.forEach(repo => {
        allRepos.push({
          repository: repo,
          ecosystem,
          priority: config.priority,
          watchTypes: config.watchTypes
        });
      });

      if (config.additionalOrgs) {
        Object.entries(config.additionalOrgs).forEach(([orgName, repos]) => {
          repos.forEach(repo => {
            allRepos.push({
              repository: repo,
              ecosystem,
              priority: 'medium',
              watchTypes: ['releases']
            });
          });
        });
      }
    });

    return allRepos;
  }
}

// CLI interface
async function main() {
  const mapper = new GitHubEcosystemMapper();

  const command = process.argv[2] || 'map';

  switch (command) {
    case 'map':
    case 'full':
      await mapper.mapCompleteEcosystem();
      break;

    case 'list':
      const repos = mapper.generateMonitoringList();
      console.log('📋 Complete Repository List for Monitoring:');
      console.log('=' .repeat(60));
      repos.forEach((repo, index) => {
        console.log(`${index + 1}. ${repo.repository} (${repo.priority}) - ${repo.ecosystem}`);
      });
      console.log(`\nTotal: ${repos.length} repositories`);
      break;

    case 'help':
      console.log(`
🐙 GitHub Ecosystem Mapper

Commands:
  map/full - Map complete GitHub ecosystem with detailed analysis
  list     - Show all repositories configured for monitoring
  help     - Show this help message

Examples:
  node github-ecosystem-mapper.js map
  node github-ecosystem-mapper.js list
      `);
      break;

    default:
      console.log('Unknown command. Use "help" for available commands.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { GitHubEcosystemMapper };