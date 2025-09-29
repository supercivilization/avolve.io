#!/usr/bin/env node
/**
 * Production Deployment Validator
 *
 * Comprehensive validation script to ensure all system components
 * are production-ready before deployment.
 *
 * Usage:
 *   node scripts/production-deployment-validator.js
 *   node scripts/production-deployment-validator.js --verbose
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

class ProductionValidator {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      success: `${colors.green}✅`,
      error: `${colors.red}❌`,
      warning: `${colors.yellow}⚠️`,
      info: `${colors.blue}ℹ️`,
      test: `${colors.cyan}🧪`
    }[level] || '';

    console.log(`${prefix} ${message}${colors.reset}`);
  }

  async runTest(name, testFunction, critical = true) {
    this.log(`Running: ${name}`, 'test');
    const startTime = Date.now();

    try {
      const result = await testFunction();
      const duration = Date.now() - startTime;

      if (result.success) {
        this.results.passed++;
        this.log(`✅ ${name} - ${result.message} (${duration}ms)`, 'success');
      } else {
        if (critical) {
          this.results.failed++;
          this.log(`❌ ${name} - ${result.message}`, 'error');
        } else {
          this.results.warnings++;
          this.log(`⚠️  ${name} - ${result.message}`, 'warning');
        }
      }

      this.results.tests.push({
        name,
        success: result.success,
        message: result.message,
        duration,
        critical,
        details: result.details || {}
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.results.failed++;
      this.log(`❌ ${name} - Error: ${error.message}`, 'error');

      this.results.tests.push({
        name,
        success: false,
        message: error.message,
        duration,
        critical,
        error: error.toString()
      });

      return { success: false, message: error.message };
    }
  }

  async validateEnvironmentVariables() {
    const envPath = path.join(process.cwd(), '.env.local');

    if (!fs.existsSync(envPath)) {
      return {
        success: false,
        message: '.env.local file not found'
      };
    }

    const required = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const optional = [
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'YOUTUBE_API_KEY',
      'GITHUB_TOKEN'
    ];

    const envContent = fs.readFileSync(envPath, 'utf8');
    const missing = required.filter(key =>
      !envContent.includes(`${key}=`) || envContent.includes(`${key}=\n`)
    );

    const optionalMissing = optional.filter(key =>
      !envContent.includes(`${key}=`) || envContent.includes(`${key}=`)
    );

    if (missing.length > 0) {
      return {
        success: false,
        message: `Missing required environment variables: ${missing.join(', ')}`,
        details: { missing, optional: optionalMissing }
      };
    }

    return {
      success: true,
      message: `All required environment variables present. Optional missing: ${optionalMissing.length}`,
      details: { optional: optionalMissing }
    };
  }

  async validateDatabaseConnection() {
    return new Promise((resolve) => {
      const testScript = `
        const { createClient } = require('@supabase/supabase-js');

        async function test() {
          try {
            const supabase = createClient(
              process.env.SUPABASE_URL,
              process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            const { data, error } = await supabase
              .from('social_intelligence')
              .select('count')
              .limit(1);

            if (error) {
              console.log(JSON.stringify({ success: false, message: error.message }));
            } else {
              console.log(JSON.stringify({ success: true, message: 'Database connection successful' }));
            }
          } catch (error) {
            console.log(JSON.stringify({ success: false, message: error.message }));
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

      child.on('close', (code) => {
        try {
          const result = JSON.parse(output.trim());
          resolve(result);
        } catch (error) {
          resolve({
            success: false,
            message: `Failed to parse test result: ${output}`,
            details: { code, output }
          });
        }
      });
    });
  }

  async validateWorkflowComponents() {
    const components = [
      'src/lib/workflows/core-orchestrator.ts',
      'src/app/actions/workflow-actions.ts',
      'supabase/migrations/001_workflow_intelligence.sql'
    ];

    const missing = components.filter(component =>
      !fs.existsSync(path.join(process.cwd(), component))
    );

    if (missing.length > 0) {
      return {
        success: false,
        message: `Missing workflow components: ${missing.join(', ')}`,
        details: { missing }
      };
    }

    // Validate TypeScript compilation
    try {
      const child = spawn('npx', ['tsc', '--noEmit'], {
        stdio: 'pipe',
        timeout: 30000
      });

      return new Promise((resolve) => {
        let output = '';
        child.stderr.on('data', (data) => {
          output += data.toString();
        });

        child.on('close', (code) => {
          if (code === 0) {
            resolve({
              success: true,
              message: 'All workflow components valid and TypeScript compiles'
            });
          } else {
            resolve({
              success: false,
              message: 'TypeScript compilation failed',
              details: { errors: output }
            });
          }
        });
      });
    } catch (error) {
      return {
        success: false,
        message: `Component validation failed: ${error.message}`
      };
    }
  }

  async validateGitHubIntelligence() {
    return new Promise((resolve) => {
      const child = spawn('node', ['scripts/comprehensive-github-intelligence.js', 'analyze'], {
        stdio: 'pipe',
        timeout: 45000
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0 && output.includes('COMPREHENSIVE ANALYSIS COMPLETE')) {
          resolve({
            success: true,
            message: 'GitHub intelligence system working correctly'
          });
        } else {
          resolve({
            success: false,
            message: 'GitHub intelligence system failed',
            details: { code, output: output.slice(-500) }
          });
        }
      });
    });
  }

  async validateDatabaseSchema() {
    const migrationFile = path.join(process.cwd(), 'supabase/migrations/001_workflow_intelligence.sql');

    if (!fs.existsSync(migrationFile)) {
      return {
        success: false,
        message: 'Database migration file not found'
      };
    }

    const migration = fs.readFileSync(migrationFile, 'utf8');

    // Check for critical tables
    const requiredTables = [
      'social_intelligence',
      'intelligence_analysis',
      'generated_content',
      'workflow_executions',
      'performance_tracking'
    ];

    const missingTables = requiredTables.filter(table =>
      !migration.includes(`CREATE TABLE IF NOT EXISTS ${table}`)
    );

    if (missingTables.length > 0) {
      return {
        success: false,
        message: `Missing database tables: ${missingTables.join(', ')}`
      };
    }

    // Check for vector search support
    if (!migration.includes('vector') || !migration.includes('embedding')) {
      return {
        success: false,
        message: 'Vector search functionality not found in database schema'
      };
    }

    return {
      success: true,
      message: 'Database schema validates successfully'
    };
  }

  async validateBuildProcess() {
    return new Promise((resolve) => {
      this.log('Building project (this may take a few minutes)...', 'info');

      const child = spawn('pnpm', ['build'], {
        stdio: this.verbose ? 'inherit' : 'pipe',
        timeout: 300000 // 5 minutes
      });

      let output = '';
      if (!this.verbose) {
        child.stdout.on('data', (data) => {
          output += data.toString();
        });
        child.stderr.on('data', (data) => {
          output += data.toString();
        });
      }

      child.on('close', (code) => {
        if (code === 0) {
          resolve({
            success: true,
            message: 'Build process completed successfully'
          });
        } else {
          resolve({
            success: false,
            message: 'Build process failed',
            details: { code, output: output.slice(-1000) }
          });
        }
      });
    });
  }

  async validateAPIIntegration() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');

    const apiKeys = {
      openai: envContent.includes('OPENAI_API_KEY=sk-'),
      anthropic: envContent.includes('ANTHROPIC_API_KEY=sk-ant-'),
      youtube: envContent.includes('YOUTUBE_API_KEY=') && !envContent.includes('YOUTUBE_API_KEY=your-'),
      github: envContent.includes('GITHUB_TOKEN=ghp_')
    };

    const activeAPIs = Object.entries(apiKeys).filter(([key, active]) => active);

    return {
      success: true,
      message: `API integration framework ready. Active APIs: ${activeAPIs.length}/4`,
      details: { activeAPIs: activeAPIs.map(([key]) => key) }
    };
  }

  async validatePerformance() {
    // Basic performance checks
    const checks = [];

    // Check bundle size estimates
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {}).length;

    if (dependencies > 50) {
      checks.push('High dependency count may impact bundle size');
    }

    // Check for performance optimizations
    const nextConfig = fs.existsSync('next.config.js');
    if (!nextConfig) {
      checks.push('No Next.js configuration found');
    }

    return {
      success: checks.length === 0,
      message: checks.length === 0
        ? 'Performance checks passed'
        : `Performance concerns: ${checks.join(', ')}`,
      details: { dependencies, checks }
    };
  }

  async validateSecurity() {
    const securityChecks = [];

    // Check for common security issues
    const envLocal = fs.readFileSync('.env.local', 'utf8');

    if (envLocal.includes('password123') || envLocal.includes('secret123')) {
      securityChecks.push('Default passwords detected');
    }

    if (!envLocal.includes('JWT_SECRET') && !envLocal.includes('NEXTAUTH_SECRET')) {
      securityChecks.push('No JWT secret configured');
    }

    return {
      success: securityChecks.length === 0,
      message: securityChecks.length === 0
        ? 'Basic security checks passed'
        : `Security concerns: ${securityChecks.join(', ')}`,
      details: { checks: securityChecks }
    };
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results,
      recommendations: [],
      deployment_ready: this.results.failed === 0
    };

    // Generate recommendations based on results
    if (this.results.warnings > 0) {
      report.recommendations.push('Consider resolving warnings before production deployment');
    }

    if (this.results.failed > 0) {
      report.recommendations.push('Fix all failed tests before deployment');
    }

    const apiTest = this.results.tests.find(t => t.name.includes('API'));
    if (apiTest && apiTest.details.activeAPIs?.length < 2) {
      report.recommendations.push('Configure additional API keys for full functionality');
    }

    // Write report
    const reportPath = path.join(process.cwd(), 'reports', `deployment-validation-${Date.now()}.json`);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return { report, reportPath };
  }

  async run() {
    this.log('🚀 Production Deployment Validation Starting', 'info');
    this.log('================================================', 'info');

    // Run all validation tests
    await this.runTest('Environment Variables', () => this.validateEnvironmentVariables());
    await this.runTest('Database Connection', () => this.validateDatabaseConnection());
    await this.runTest('Database Schema', () => this.validateDatabaseSchema());
    await this.runTest('Workflow Components', () => this.validateWorkflowComponents());
    await this.runTest('GitHub Intelligence', () => this.validateGitHubIntelligence());
    await this.runTest('API Integration Framework', () => this.validateAPIIntegration(), false);
    await this.runTest('Build Process', () => this.validateBuildProcess());
    await this.runTest('Performance Checks', () => this.validatePerformance(), false);
    await this.runTest('Security Checks', () => this.validateSecurity(), false);

    // Generate and display report
    const { report, reportPath } = await this.generateReport();

    this.log('', 'info');
    this.log('📊 VALIDATION SUMMARY', 'info');
    this.log('==========================================', 'info');
    this.log(`✅ Passed: ${this.results.passed}`, 'success');
    this.log(`❌ Failed: ${this.results.failed}`, 'error');
    this.log(`⚠️  Warnings: ${this.results.warnings}`, 'warning');
    this.log(`📄 Report: ${reportPath}`, 'info');
    this.log('', 'info');

    if (report.deployment_ready) {
      this.log('🎉 DEPLOYMENT READY! All critical tests passed.', 'success');
    } else {
      this.log('🚨 NOT READY FOR DEPLOYMENT. Fix failed tests first.', 'error');
    }

    if (report.recommendations.length > 0) {
      this.log('📋 Recommendations:', 'info');
      report.recommendations.forEach(rec => {
        this.log(`   • ${rec}`, 'warning');
      });
    }

    return {
      ready: report.deployment_ready,
      results: this.results,
      reportPath
    };
  }
}

// CLI execution
if (require.main === module) {
  const verbose = process.argv.includes('--verbose');
  const validator = new ProductionValidator({ verbose });

  validator.run()
    .then(result => {
      process.exit(result.ready ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Validation failed:', error);
      process.exit(1);
    });
}

module.exports = ProductionValidator;