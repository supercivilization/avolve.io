#!/usr/bin/env node
/**
 * Quick System Test
 *
 * Fast validation script for development workflow testing
 * Tests core functionality without lengthy build processes
 *
 * Usage:
 *   node scripts/quick-system-test.js
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

class QuickTester {
  constructor() {
    this.results = [];
  }

  log(message, level = 'info') {
    const prefix = {
      success: `${colors.green}✅`,
      error: `${colors.red}❌`,
      warning: `${colors.yellow}⚠️`,
      info: `${colors.blue}ℹ️`,
      test: `${colors.cyan}🧪`
    }[level] || '';

    console.log(`${prefix} ${message}${colors.reset}`);
  }

  async runTest(name, testFunction) {
    this.log(`Testing: ${name}`, 'test');
    const startTime = Date.now();

    try {
      const result = await testFunction();
      const duration = Date.now() - startTime;

      if (result.success) {
        this.log(`${name} - ${result.message} (${duration}ms)`, 'success');
      } else {
        this.log(`${name} - ${result.message}`, 'error');
      }

      this.results.push({ name, ...result, duration });
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.log(`${name} - Error: ${error.message}`, 'error');
      this.results.push({ name, success: false, message: error.message, duration });
      return { success: false, message: error.message };
    }
  }

  async testEnvironment() {
    const envPath = path.join(process.cwd(), '.env.local');

    if (!fs.existsSync(envPath)) {
      return {
        success: false,
        message: '.env.local file missing'
      };
    }

    const env = fs.readFileSync(envPath, 'utf8');
    const hasSupabase = env.includes('SUPABASE_URL=http://127.0.0.1:54321');

    return {
      success: hasSupabase,
      message: hasSupabase ? 'Environment configured for local development' : 'Environment not configured correctly'
    };
  }

  async testDatabase() {
    return new Promise((resolve) => {
      const testScript = `
        const { createClient } = require('@supabase/supabase-js');

        async function test() {
          try {
            const supabase = createClient(
              process.env.SUPABASE_URL,
              process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            const { error } = await supabase
              .from('social_intelligence')
              .select('count')
              .limit(1);

            console.log(error ? 'ERROR' : 'SUCCESS');
          } catch (e) {
            console.log('ERROR');
          }
        }

        test();
      `;

      const child = spawn('node', ['-e', testScript], {
        env: { ...process.env },
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', () => {
        const success = output.trim() === 'SUCCESS';
        resolve({
          success,
          message: success ? 'Database connection working' : 'Database connection failed'
        });
      });
    });
  }

  async testGitHubIntelligence() {
    return new Promise((resolve) => {
      const child = spawn('timeout', ['15s', 'node', 'scripts/comprehensive-github-intelligence.js', 'analyze'], {
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        const success = output.includes('COMPREHENSIVE ANALYSIS COMPLETE') && code === 0;
        resolve({
          success,
          message: success ? 'GitHub intelligence system operational' : 'GitHub intelligence system issues'
        });
      });
    });
  }

  async testWorkflowFiles() {
    const criticalFiles = [
      'src/lib/workflows/core-orchestrator.ts',
      'src/app/actions/workflow-actions.ts',
      'supabase/migrations/001_workflow_intelligence.sql',
      'scripts/setup-workflows.sh'
    ];

    const missing = criticalFiles.filter(file => !fs.existsSync(file));

    return {
      success: missing.length === 0,
      message: missing.length === 0
        ? 'All critical workflow files present'
        : `Missing files: ${missing.join(', ')}`
    };
  }

  async testSupabaseStatus() {
    return new Promise((resolve) => {
      const child = spawn('supabase', ['status'], {
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        const running = output.includes('API URL: http://127.0.0.1:54321') && code === 0;
        resolve({
          success: running,
          message: running ? 'Supabase running locally' : 'Supabase not running or misconfigured'
        });
      });
    });
  }

  async testSocialListeningScripts() {
    const scripts = [
      'scripts/social-listening-system.js',
      'scripts/comprehensive-github-intelligence.js',
      'scripts/youtube-extractor.js'
    ];

    const existing = scripts.filter(script => fs.existsSync(script));

    return {
      success: existing.length >= 2,
      message: `${existing.length}/${scripts.length} social listening scripts available`
    };
  }

  async run() {
    this.log('🧪 Quick System Test Starting', 'info');
    this.log('================================', 'info');

    // Run essential tests
    await this.runTest('Environment Setup', () => this.testEnvironment());
    await this.runTest('Supabase Status', () => this.testSupabaseStatus());
    await this.runTest('Database Connection', () => this.testDatabase());
    await this.runTest('Workflow Files', () => this.testWorkflowFiles());
    await this.runTest('Social Scripts', () => this.testSocialListeningScripts());
    await this.runTest('GitHub Intelligence', () => this.testGitHubIntelligence());

    // Summary
    const passed = this.results.filter(r => r.success).length;
    const total = this.results.length;

    this.log('', 'info');
    this.log('📊 QUICK TEST SUMMARY', 'info');
    this.log('====================', 'info');
    this.log(`✅ Passed: ${passed}/${total}`, passed === total ? 'success' : 'warning');

    if (passed === total) {
      this.log('🎉 All systems operational! Ready for workflow execution.', 'success');
    } else {
      this.log('⚠️  Some systems need attention. Check failed tests above.', 'warning');
    }

    return {
      success: passed === total,
      results: this.results,
      score: `${passed}/${total}`
    };
  }
}

// CLI execution
if (require.main === module) {
  const tester = new QuickTester();

  tester.run()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = QuickTester;