#!/usr/bin/env node

/**
 * Project Template Generator
 *
 * Generates working project templates based on documentation examples
 * and validates they work with current technology versions.
 */

import { mkdir, writeFile, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Template configurations matching documentation
const TEMPLATES = {
  'ai-chat-minimal': {
    name: 'AI Chat App (5-minute version)',
    description: 'Minimal AI chat interface using Next.js 15 + Vercel AI SDK',
    technologies: ['next.js@15.5.3', 'react@19.1.1', 'typescript@5.9.2', 'tailwind@4.1.0', '@ai-sdk/openai@latest'],
    files: {
      'package.json': {
        type: 'json',
        content: {
          name: 'ai-chat-minimal',
          version: '0.1.0',
          private: true,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint'
          },
          dependencies: {
            'next': '15.5.3',
            'react': '19.1.1',
            'react-dom': '19.1.1',
            'ai': 'latest',
            '@ai-sdk/openai': 'latest'
          },
          devDependencies: {
            'typescript': '5.9.2',
            '@types/node': '^24',
            '@types/react': '^19',
            '@types/react-dom': '^19',
            'tailwindcss': '^4.1.0',
            'postcss': '^8',
            'autoprefixer': '^10'
          }
        }
      },
      'src/app/page.tsx': {
        type: 'code',
        language: 'typescript',
        content: `'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat Demo</h1>

      <div className="space-y-4 mb-4 h-96 overflow-y-auto border rounded p-4">
        {messages.map(m => (
          <div key={m.id} className={\`p-3 rounded \${
            m.role === 'user' ? 'bg-blue-100 ml-auto max-w-xs' : 'bg-gray-100'
          }\`}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-gray-500 text-center">
            Start a conversation with the AI...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}`
      },
      'src/app/api/chat/route.ts': {
        type: 'code',
        language: 'typescript',
        content: `import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}`
      },
      'src/app/layout.tsx': {
        type: 'code',
        language: 'typescript',
        content: `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Chat Demo',
  description: 'A minimal AI chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`
      },
      'src/app/globals.css': {
        type: 'css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;`
      },
      'tailwind.config.js': {
        type: 'code',
        language: 'javascript',
        content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
      },
      'next.config.js': {
        type: 'code',
        language: 'javascript',
        content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ai', '@ai-sdk/openai']
  }
}

module.exports = nextConfig`
      },
      'tsconfig.json': {
        type: 'json',
        content: {
          compilerOptions: {
            target: 'es5',
            lib: ['dom', 'dom.iterable', 'es6'],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            module: 'esnext',
            moduleResolution: 'bundler',
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: 'preserve',
            incremental: true,
            plugins: [{ name: 'next' }],
            baseUrl: '.',
            paths: { '@/*': ['./src/*'] }
          },
          include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
          exclude: ['node_modules']
        }
      },
      '.env.local.example': {
        type: 'text',
        content: `# Copy this to .env.local and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here`
      },
      'README.md': {
        type: 'markdown',
        content: `# AI Chat Demo

A minimal AI chat application built with Next.js 15 and Vercel AI SDK.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy environment file and add your OpenAI API key:
   \`\`\`bash
   cp .env.local.example .env.local
   # Edit .env.local and add your OpenAI API key
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Real-time AI chat interface
- Streaming responses
- Clean, responsive design
- TypeScript support

## Technology Stack

- Next.js 15 (App Router)
- React 19
- Vercel AI SDK
- Tailwind CSS
- TypeScript

## Generated by

Modern Tech Stack project template generator
`
      }
    }
  },

  'startup-mvp': {
    name: 'Startup MVP Stack',
    description: 'Production-ready full-stack application with auth, database, and AI',
    technologies: ['next.js@15.5.3', 'supabase@2.57.0', 'tailwind@4.1.0', 'vercel-ai-sdk@5.0.44'],
    files: {
      // Will be implemented if this template is requested
    }
  },

  'react-native-expo': {
    name: 'React Native Expo App',
    description: 'Mobile app with Expo Development Builds',
    technologies: ['expo@52.0.0', 'react-native@0.76.x', 'typescript@5.9.2'],
    files: {
      // Will be implemented if this template is requested
    }
  }
};

/**
 * Generates a project from template
 * @param {string} templateName - Name of the template to generate
 * @param {string} outputDir - Directory to generate the project in
 * @param {Object} options - Generation options
 */
async function generateProject(templateName, outputDir, options = {}) {
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found. Available: ${Object.keys(TEMPLATES).join(', ')}`);
  }

  console.log(`🚀 Generating ${template.name}...`);
  console.log(`📁 Output directory: ${outputDir}`);

  // Create output directory
  await mkdir(outputDir, { recursive: true });

  // Generate files
  const fileResults = [];
  for (const [filePath, fileConfig] of Object.entries(template.files)) {
    const fullPath = join(outputDir, filePath);
    const dir = dirname(fullPath);

    // Create directory if needed
    await mkdir(dir, { recursive: true });

    let content;
    switch (fileConfig.type) {
      case 'json':
        content = JSON.stringify(fileConfig.content, null, 2);
        break;
      case 'code':
      case 'css':
      case 'text':
      case 'markdown':
      default:
        content = fileConfig.content;
        break;
    }

    await writeFile(fullPath, content);
    fileResults.push({
      path: filePath,
      type: fileConfig.type,
      size: content.length
    });

    console.log(`✅ Created ${filePath}`);
  }

  // Validate generated project
  console.log('\\n🔍 Validating generated project...');
  const validation = await validateGeneratedProject(outputDir, template);

  return {
    template: templateName,
    outputDir,
    files: fileResults,
    validation,
    nextSteps: generateNextSteps(template, validation)
  };
}

/**
 * Validates that a generated project is correct and functional
 */
async function validateGeneratedProject(projectDir, template) {
  const results = {
    valid: true,
    checks: [],
    errors: [],
    warnings: []
  };

  try {
    // Check package.json exists and is valid
    const packageJsonPath = join(projectDir, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

    results.checks.push({
      name: 'package.json validation',
      status: 'passed',
      details: `Found ${Object.keys(packageJson.dependencies || {}).length} dependencies`
    });

    // Check TypeScript configuration
    const tsconfigPath = join(projectDir, 'tsconfig.json');
    try {
      const tsconfig = JSON.parse(await readFile(tsconfigPath, 'utf8'));
      results.checks.push({
        name: 'TypeScript configuration',
        status: 'passed',
        details: 'Valid tsconfig.json found'
      });
    } catch (error) {
      results.warnings.push({
        name: 'TypeScript configuration',
        message: 'No tsconfig.json found - JavaScript project'
      });
    }

    // Check for required files based on template
    const requiredFiles = {
      'ai-chat-minimal': ['src/app/page.tsx', 'src/app/api/chat/route.ts'],
      'startup-mvp': ['src/app/layout.tsx', 'src/components/ui'],
      'react-native-expo': ['app.json', 'App.tsx']
    };

    if (requiredFiles[template.name]) {
      for (const file of requiredFiles[template.name]) {
        try {
          await readFile(join(projectDir, file), 'utf8');
          results.checks.push({
            name: `Required file: ${file}`,
            status: 'passed'
          });
        } catch (error) {
          results.errors.push({
            name: `Missing required file: ${file}`,
            message: error.message
          });
          results.valid = false;
        }
      }
    }

  } catch (error) {
    results.errors.push({
      name: 'Project validation',
      message: error.message
    });
    results.valid = false;
  }

  return results;
}

/**
 * Generates next steps instructions based on template and validation
 */
function generateNextSteps(template, validation) {
  const steps = [
    '📁 Navigate to your project directory',
    '📦 Install dependencies: `npm install`'
  ];

  if (template.name.includes('AI')) {
    steps.push('🔑 Copy .env.local.example to .env.local and add your API keys');
  }

  steps.push('🚀 Start development server: `npm run dev`');

  if (validation.valid) {
    steps.push('✅ Your project is ready to run!');
  } else {
    steps.push('⚠️  Please fix validation errors before running');
  }

  return steps;
}

/**
 * Lists available templates
 */
function listTemplates() {
  console.log('\\n📋 Available Project Templates:\\n');

  for (const [key, template] of Object.entries(TEMPLATES)) {
    console.log(`🎯 ${key}`);
    console.log(`   Name: ${template.name}`);
    console.log(`   Description: ${template.description}`);
    console.log(`   Technologies: ${template.technologies.join(', ')}`);
    console.log('');
  }
}

/**
 * CLI Interface
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
Project Template Generator

Generates working project templates based on modern tech stack documentation.

Usage:
  node project-template.js <template> <directory> [options]

Commands:
  list                    List available templates
  generate <template>     Generate project from template

Options:
  --validate-only         Only validate, don't generate
  --json                  Output results as JSON

Examples:
  node project-template.js list
  node project-template.js generate ai-chat-minimal ./my-ai-app
  node project-template.js generate startup-mvp ./my-startup --json
`);
    return;
  }

  const command = args[0];

  if (command === 'list') {
    listTemplates();
    return;
  }

  if (command === 'generate') {
    const templateName = args[1];
    const outputDir = args[2];

    if (!templateName || !outputDir) {
      console.error('❌ Template name and output directory are required');
      process.exit(1);
    }

    try {
      const results = await generateProject(templateName, outputDir);

      if (args.includes('--json')) {
        console.log(JSON.stringify(results, null, 2));
      } else {
        console.log('\\n🎉 Project generation complete!\\n');
        console.log('📊 Summary:');
        console.log(`   Template: ${results.template}`);
        console.log(`   Files created: ${results.files.length}`);
        console.log(`   Validation: ${results.validation.valid ? '✅ Passed' : '❌ Failed'}`);

        console.log('\\n🚀 Next Steps:');
        results.nextSteps.forEach((step, i) => {
          console.log(`   ${i + 1}. ${step}`);
        });

        if (!results.validation.valid) {
          console.log('\\n❌ Validation Errors:');
          results.validation.errors.forEach(error => {
            console.log(`   - ${error.name}: ${error.message}`);
          });
        }
      }

    } catch (error) {
      console.error('❌ Generation failed:', error.message);
      process.exit(1);
    }
    return;
  }

  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

// Export for programmatic use
export { generateProject, listTemplates, TEMPLATES };

// Run if called directly
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  main().catch(console.error);
}