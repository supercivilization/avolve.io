import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

// Test user credentials (should match a seeded test user in Supabase)
const TEST_USER = {
  email: process.env.E2E_TEST_USER_EMAIL || 'test@example.com',
  password: process.env.E2E_TEST_USER_PASSWORD || 'testpassword123',
}

export interface AuthFixtures {
  authenticatedPage: Page
}

/**
 * Extended test fixture that provides an authenticated page.
 *
 * Usage:
 * ```typescript
 * import { test } from './fixtures/auth.fixture'
 *
 * test('authenticated test', async ({ authenticatedPage }) => {
 *   await authenticatedPage.goto('/dashboard')
 *   // Page is already logged in
 * })
 * ```
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to sign-in
    await page.goto('/sign-in')
    await page.waitForLoadState('networkidle')

    // Fill in credentials
    await page.getByLabel(/email/i).fill(TEST_USER.email)
    await page.getByLabel(/password/i).fill(TEST_USER.password)

    // Submit
    await page.getByRole('button', { name: /sign in/i }).click()

    // Wait for redirect to dashboard or home
    await page.waitForURL(/(?!.*sign-in).*/, { timeout: 10000 })

    // Use the authenticated page
    await use(page)
  },
})

export { expect }

/**
 * Helper to check if user is authenticated on a page
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  // Check for presence of user menu or avatar
  const userMenu = page.getByRole('button', { name: /account|profile|user/i })
  const avatar = page.locator('[data-testid="user-avatar"]')

  return (await userMenu.isVisible()) || (await avatar.isVisible())
}

/**
 * Helper to sign out from any page
 */
export async function signOut(page: Page): Promise<void> {
  const signOutButton = page.getByRole('button', { name: /sign out|log out/i })

  if (await signOutButton.isVisible()) {
    await signOutButton.click()
    await page.waitForURL(/.*sign-in/)
  }
}
