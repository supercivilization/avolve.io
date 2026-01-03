import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.ts',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        '**/types/**',
        '**/__tests__/**',
        '**/dist/**',
        '**/.next/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@my/ui': resolve(__dirname, './packages/ui/src'),
      '@my/api': resolve(__dirname, './packages/api/src'),
      '@my/supabase': resolve(__dirname, './packages/supabase/src'),
      app: resolve(__dirname, './packages/app'),
    },
  },
})
