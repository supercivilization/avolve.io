#!/usr/bin/env node

/**
 * AI Component Generator Script
 *
 * This script uses the AI SDK to generate React components with:
 * - WCAG AA accessibility compliance
 * - TypeScript type safety
 * - Comprehensive testing
 * - Storybook stories
 * - Performance optimization
 *
 * Usage:
 * npm run ai:component "Create a responsive card component with hover effects"
 * npm run ai:component "Build a accessible dropdown menu with keyboard navigation"
 */

const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { createAnthropic } = require('@ai-sdk/anthropic');
const { generateObject } = require('ai');
const { z } = require('zod');

// Initialize AI provider
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Component generation schema
const ComponentSchema = z.object({
  name: z.string().describe('Component name in PascalCase'),
  description: z.string().describe('Brief description of the component'),
  props: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    description: z.string(),
    defaultValue: z.string().optional()
  })),
  component: z.string().describe('Complete React component implementation'),
  types: z.string().describe('TypeScript type definitions'),
  tests: z.string().describe('Vitest test cases'),
  stories: z.string().describe('Storybook story'),
  docs: z.string().describe('Component documentation'),
  accessibility: z.object({
    features: z.array(z.string()),
    wcagLevel: z.string(),
    testingNotes: z.string()
  }),
  performance: z.object({
    optimizations: z.array(z.string()),
    bundleImpact: z.string(),
    renderingNotes: z.string()
  })
});

async function generateComponent(description) {
  console.log('🤖 Generating AI-native component...');
  console.log(`📝 Description: ${description}`);

  const systemPrompt = `You are an expert React component developer specializing in AI-native, accessible, and performant components.

Generate components that follow these principles:

1. **Accessibility-First Design**:
   - WCAG 2.1 AA compliance
   - Semantic HTML elements
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - Screen reader optimization
   - Focus management
   - High contrast mode support

2. **Performance Optimization**:
   - React.memo for expensive components
   - Lazy loading where appropriate
   - Optimized re-renders using useMemo/useCallback
   - Bundle size optimization
   - Efficient event handlers

3. **Vercel Design System**:
   - Use Tailwind CSS v4 with CSS variables
   - Follow spacing, typography, and color guidelines
   - Implement proper focus states
   - Respect motion preferences (prefers-reduced-motion)
   - Support dark mode

4. **Modern React Patterns**:
   - Use React 19 features where appropriate
   - Server Components when possible
   - Proper TypeScript typing with generics
   - Error boundaries for resilience
   - Compound component patterns where appropriate

5. **Testing & Documentation**:
   - Comprehensive Vitest tests including accessibility tests
   - Storybook stories with multiple variants
   - JSDoc documentation with examples
   - Usage examples and integration notes

6. **AI-Native Features**:
   - Generate components that can be easily extended by AI
   - Include data-testid attributes for AI testing
   - Use descriptive prop names for AI understanding
   - Include accessibility metadata for AI auditing

Create production-ready code with no TODO comments or placeholders.`;

  try {
    const result = await generateObject({
      model: anthropic('claude-3-5-sonnet-20241022'),
      schema: ComponentSchema,
      system: systemPrompt,
      prompt: `Generate a complete React component: ${description}

Requirements:
- Full TypeScript implementation
- WCAG 2.1 AA compliant
- Performance optimized with React 19 features
- Comprehensive testing with Vitest and Testing Library
- Storybook story with multiple variants
- Complete documentation with usage examples
- Dark mode support
- Mobile-responsive design
- Motion preference awareness

Include all necessary files: component, types, tests, stories, and documentation.`
    });

    return result.object;
  } catch (error) {
    console.error('❌ Error generating component:', error);
    throw error;
  }
}

function writeComponentFiles(component, outputDir = './packages/ui/src/components') {
  const componentName = component.name;
  const componentDir = join(outputDir, componentName.toLowerCase());

  // Create component directory
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir, { recursive: true });
  }

  // Write component file
  const componentFile = join(componentDir, `${componentName}.tsx`);
  writeFileSync(componentFile, component.component, 'utf8');
  console.log(`✅ Component written to: ${componentFile}`);

  // Write types file
  const typesFile = join(componentDir, `${componentName}.types.ts`);
  writeFileSync(typesFile, component.types, 'utf8');
  console.log(`✅ Types written to: ${typesFile}`);

  // Write test file
  const testFile = join(componentDir, `${componentName}.test.tsx`);
  writeFileSync(testFile, component.tests, 'utf8');
  console.log(`✅ Tests written to: ${testFile}`);

  // Write story file
  const storyFile = join(componentDir, `${componentName}.stories.tsx`);
  writeFileSync(storyFile, component.stories, 'utf8');
  console.log(`✅ Stories written to: ${storyFile}`);

  // Write documentation
  const docsFile = join(componentDir, `${componentName}.md`);
  writeFileSync(docsFile, component.docs, 'utf8');
  console.log(`✅ Documentation written to: ${docsFile}`);

  // Write index file for easy imports
  const indexFile = join(componentDir, 'index.ts');
  const indexContent = `export * from './${componentName}';
export * from './${componentName}.types';
export { default } from './${componentName}';`;
  writeFileSync(indexFile, indexContent, 'utf8');
  console.log(`✅ Index file written to: ${indexFile}`);

  return componentDir;
}

function generateSummary(component) {
  console.log('\n📊 Component Generation Summary:');
  console.log('================================');
  console.log(`📦 Component: ${component.name}`);
  console.log(`📝 Description: ${component.description}`);
  console.log(`🎯 Props: ${component.props.length} properties defined`);
  console.log(`♿ Accessibility: ${component.accessibility.wcagLevel} compliant`);
  console.log(`⚡ Performance: ${component.performance.optimizations.length} optimizations applied`);
  console.log('\n🔍 Accessibility Features:');
  component.accessibility.features.forEach(feature => {
    console.log(`  ✓ ${feature}`);
  });
  console.log('\n⚡ Performance Optimizations:');
  component.performance.optimizations.forEach(optimization => {
    console.log(`  ✓ ${optimization}`);
  });
  console.log(`\n📄 Files Generated:`);
  console.log(`  ✓ Component implementation (.tsx)`);
  console.log(`  ✓ TypeScript types (.types.ts)`);
  console.log(`  ✓ Test suite (.test.tsx)`);
  console.log(`  ✓ Storybook story (.stories.tsx)`);
  console.log(`  ✓ Documentation (.md)`);
  console.log(`  ✓ Index file (index.ts)`);
}

async function main() {
  const description = process.argv[2];

  if (!description) {
    console.error('❌ Please provide a component description');
    console.log('Usage: npm run ai:component "Your component description"');
    console.log('Example: npm run ai:component "Create a responsive card component with hover effects"');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    console.log('🚀 Starting AI component generation...');

    const component = await generateComponent(description);
    const componentDir = writeComponentFiles(component);

    generateSummary(component);

    console.log(`\n🎉 Component generated successfully!`);
    console.log(`📁 Location: ${componentDir}`);
    console.log(`\n🔄 Next steps:`);
    console.log(`  1. Review the generated component`);
    console.log(`  2. Run tests: npm run ui:test`);
    console.log(`  3. View in Storybook: npm run ui:storybook`);
    console.log(`  4. Build UI package: npm run ui:build`);

  } catch (error) {
    console.error('💥 Component generation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateComponent, writeComponentFiles };