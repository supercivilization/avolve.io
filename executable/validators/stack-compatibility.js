#!/usr/bin/env node

/**
 * Stack Compatibility Validator
 *
 * Validates that technology combinations in documentation
 * are compatible and versions are current.
 */

import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Technology compatibility matrix
const COMPATIBILITY_MATRIX = {
  'next.js': {
    versions: ['15.5.3', '15.5.2', '15.5.1', '15.5.0'],
    compatibleWith: {
      'react': ['19.1.0', '19.1.1'],
      'typescript': ['5.9.2', '5.9.1'],
      'tailwind': ['4.1.0', '4.0.0'],
      'vercel-ai-sdk': ['5.0.44', '5.0.43']
    },
    incompatibleWith: {
      'react': ['18.x', '17.x'],
      'typescript': ['4.x', '3.x']
    }
  },
  'react': {
    versions: ['19.1.1', '19.1.0'],
    compatibleWith: {
      'next.js': ['15.5.x'],
      'typescript': ['5.9.x'],
      'react-dom': ['19.1.x']
    }
  },
  'supabase': {
    versions: ['2.57.0', '2.56.0'],
    compatibleWith: {
      'postgresql': ['15', '16'],
      'next.js': ['13.x', '14.x', '15.x']
    }
  },
  'vercel-ai-sdk': {
    versions: ['5.0.44', '5.0.43'],
    compatibleWith: {
      'next.js': ['15.x'],
      'react': ['19.x'],
      'openai': ['4.x']
    }
  }
};

// Current version recommendations (updated monthly)
const CURRENT_VERSIONS = {
  'next.js': '15.5.3',
  'react': '19.1.1',
  'typescript': '5.9.2',
  'tailwind': '4.1.0',
  'supabase': '2.57.0',
  'vercel-ai-sdk': '5.0.44',
  'node.js': '24.8.0',
  'expo': '52.0.0'
};

// Known issues and workarounds
const KNOWN_ISSUES = {
  'next.js-15.5.x': {
    'react-19.x': {
      severity: 'warning',
      description: 'React 19 requires Next.js experimental configuration',
      workaround: 'Add { experimental: { reactCompiler: true } } to next.config.js'
    }
  },
  'tailwind-4.x': {
    'next.js-15.x': {
      severity: 'info',
      description: 'Tailwind v4 requires PostCSS configuration',
      workaround: 'Use @tailwindcss/postcss plugin'
    }
  }
};

/**
 * Validates a technology stack configuration
 * @param {Object} stackConfig - Configuration object with technologies and versions
 * @returns {Object} Validation results with errors, warnings, and recommendations
 */
function validateStack(stackConfig) {
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    recommendations: [],
    compatibility: {}
  };

  // Check each technology
  for (const [tech, version] of Object.entries(stackConfig)) {
    const techKey = tech.toLowerCase().replace(/[^a-z-]/g, '-');

    // Version currency check
    if (CURRENT_VERSIONS[techKey]) {
      const current = CURRENT_VERSIONS[techKey];
      if (version !== current) {
        results.recommendations.push({
          type: 'version-update',
          tech,
          current: version,
          recommended: current,
          message: `Consider upgrading ${tech} from ${version} to ${current}`
        });
      }
    }

    // Compatibility matrix check
    if (COMPATIBILITY_MATRIX[techKey]) {
      const matrix = COMPATIBILITY_MATRIX[techKey];

      // Check if version is supported
      const majorVersion = version.split('.')[0] + '.x';
      if (!matrix.versions.some(v => v.startsWith(version.split('.')[0]))) {
        results.warnings.push({
          type: 'unsupported-version',
          tech,
          version,
          message: `${tech} ${version} may not be officially supported`
        });
      }

      // Check compatibility with other technologies
      for (const [otherTech, otherVersion] of Object.entries(stackConfig)) {
        const otherTechKey = otherTech.toLowerCase().replace(/[^a-z-]/g, '-');

        if (matrix.incompatibleWith && matrix.incompatibleWith[otherTechKey]) {
          const incompatible = matrix.incompatibleWith[otherTechKey];
          if (incompatible.some(v => otherVersion.startsWith(v.replace('.x', '')))) {
            results.errors.push({
              type: 'incompatible-versions',
              tech1: tech,
              version1: version,
              tech2: otherTech,
              version2: otherVersion,
              message: `${tech} ${version} is incompatible with ${otherTech} ${otherVersion}`
            });
            results.valid = false;
          }
        }
      }
    }

    // Known issues check
    const issueKey = `${techKey}-${version.split('.')[0]}.x`;
    if (KNOWN_ISSUES[issueKey]) {
      for (const [otherTech, otherVersion] of Object.entries(stackConfig)) {
        const otherIssueKey = `${otherTech.toLowerCase().replace(/[^a-z-]/g, '-')}-${otherVersion.split('.')[0]}.x`;

        if (KNOWN_ISSUES[issueKey][otherIssueKey]) {
          const issue = KNOWN_ISSUES[issueKey][otherIssueKey];
          results[issue.severity === 'warning' ? 'warnings' : 'errors'].push({
            type: 'known-issue',
            tech1: tech,
            tech2: otherTech,
            severity: issue.severity,
            description: issue.description,
            workaround: issue.workaround
          });
        }
      }
    }
  }

  return results;
}

/**
 * Validates stack configurations found in documentation files
 */
async function validateDocumentationStacks() {
  const documentationPaths = [
    '../../navigation/decision-trees/stack-selection.md',
    '../../navigation/quick-wins/5-minute-ai-app.md',
    '../../nextjs-complete-guide.md',
    '../../react-19-complete-guide.md'
  ];

  const allResults = [];

  for (const docPath of documentationPaths) {
    try {
      const fullPath = join(__dirname, docPath);
      const content = await readFile(fullPath, 'utf8');

      // Extract version numbers from documentation
      const versionMatches = content.match(/(\w+(?:[.-]\w+)*)\s+(?:v?)([\d.]+)/g) || [];
      const stackConfig = {};

      for (const match of versionMatches) {
        const [, tech, version] = match.match(/(\w+(?:[.-]\w+)*)\s+(?:v?)([\d.]+)/) || [];
        if (tech && version) {
          stackConfig[tech] = version;
        }
      }

      if (Object.keys(stackConfig).length > 0) {
        const validation = validateStack(stackConfig);
        allResults.push({
          file: docPath,
          stackConfig,
          validation
        });
      }
    } catch (error) {
      console.error(`Error reading ${docPath}:`, error.message);
    }
  }

  return allResults;
}

/**
 * Formats validation results for human readability
 */
function formatResults(results) {
  let output = '\n🔍 Stack Compatibility Validation Results\n';
  output += '==========================================\n\n';

  for (const result of results) {
    output += `📄 File: ${result.file}\n`;
    output += `📦 Stack: ${Object.entries(result.stackConfig).map(([k,v]) => `${k}@${v}`).join(', ')}\n`;

    const { validation } = result;

    if (validation.valid) {
      output += '✅ Status: Compatible\n';
    } else {
      output += '❌ Status: Issues Found\n';
    }

    if (validation.errors.length > 0) {
      output += '\n🚨 Errors:\n';
      validation.errors.forEach(error => {
        output += `  - ${error.message}\n`;
        if (error.workaround) {
          output += `    💡 Workaround: ${error.workaround}\n`;
        }
      });
    }

    if (validation.warnings.length > 0) {
      output += '\n⚠️  Warnings:\n';
      validation.warnings.forEach(warning => {
        output += `  - ${warning.message}\n`;
        if (warning.workaround) {
          output += `    💡 Workaround: ${warning.workaround}\n`;
        }
      });
    }

    if (validation.recommendations.length > 0) {
      output += '\n💡 Recommendations:\n';
      validation.recommendations.forEach(rec => {
        output += `  - ${rec.message}\n`;
      });
    }

    output += '\n' + '-'.repeat(50) + '\n\n';
  }

  return output;
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Stack Compatibility Validator

Usage:
  node stack-compatibility.js [options]

Options:
  --json          Output results as JSON
  --file <path>   Validate specific file
  --stack <config> Validate specific stack configuration

Examples:
  node stack-compatibility.js
  node stack-compatibility.js --json
  node stack-compatibility.js --stack "next.js:15.5.3,react:19.1.1"
`);
    return;
  }

  if (args.includes('--stack')) {
    const stackIndex = args.indexOf('--stack');
    const stackString = args[stackIndex + 1];
    const stackConfig = {};

    stackString.split(',').forEach(pair => {
      const [tech, version] = pair.split(':');
      stackConfig[tech] = version;
    });

    const validation = validateStack(stackConfig);

    if (args.includes('--json')) {
      console.log(JSON.stringify({ stackConfig, validation }, null, 2));
    } else {
      console.log(formatResults([{ file: 'CLI Input', stackConfig, validation }]));
    }
    return;
  }

  const results = await validateDocumentationStacks();

  if (args.includes('--json')) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(formatResults(results));
  }

  // Exit with error code if any validations failed
  const hasErrors = results.some(r => !r.validation.valid);
  process.exit(hasErrors ? 1 : 0);
}

// Export for programmatic use
export { validateStack, validateDocumentationStacks };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}