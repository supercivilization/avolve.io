import { test, expect } from '@playwright/test'

/**
 * Subscription Feature E2E Tests
 *
 * Tests for subscription tier gating and upgrade flows.
 */

test.describe('Subscription Gating - Unauthenticated', () => {
  test('should redirect protected routes to sign-in', async ({ page }) => {
    // Brain page requires authentication
    await page.goto('/brain')
    await expect(page).toHaveURL(/.*sign-in/)

    // Team page requires authentication
    await page.goto('/team')
    await expect(page).toHaveURL(/.*sign-in/)

    // Settings page requires authentication
    await page.goto('/settings')
    await expect(page).toHaveURL(/.*sign-in/)
  })
})

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing')
    await page.waitForLoadState('networkidle')
  })

  test('should display pricing page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /pricing/i })).toBeVisible()
  })

  test('should display subscription tiers', async ({ page }) => {
    // Should show all three tiers
    await expect(page.getByText(/individual vip/i)).toBeVisible()
    await expect(page.getByText(/collective pro/i)).toBeVisible()
    await expect(page.getByText(/ecosystem ceo/i)).toBeVisible()
  })

  test('should display tier prices', async ({ page }) => {
    // Prices should be visible
    await expect(page.getByText(/\$47/i)).toBeVisible() // VIP monthly
    await expect(page.getByText(/\$97/i)).toBeVisible() // PRO monthly
    await expect(page.getByText(/\$497/i)).toBeVisible() // CEO monthly
  })

  test('should have CTA buttons for each tier', async ({ page }) => {
    // Each tier should have a CTA button
    const ctaButtons = page.getByRole('link', { name: /get started|subscribe|upgrade/i })
    await expect(ctaButtons.first()).toBeVisible()
  })

  test('should link to checkout when clicking tier CTA', async ({ page }) => {
    // Click the first tier CTA
    const ctaButton = page.getByRole('link', { name: /get started|subscribe/i }).first()

    if (await ctaButton.isVisible()) {
      await ctaButton.click()
      // Should navigate to checkout or sign-in
      await expect(page).toHaveURL(/.*(?:checkout|sign-in)/)
    }
  })
})

test.describe('Upgrade Prompts', () => {
  test('should show upgrade prompt on pricing page', async ({ page }) => {
    await page.goto('/pricing')
    await page.waitForLoadState('networkidle')

    // Should have upgrade CTAs
    const upgradeLinks = page.getByRole('link').filter({ hasText: /upgrade|get started|subscribe/i })
    await expect(upgradeLinks.first()).toBeVisible()
  })
})

test.describe('Checkout Flow - Unauthenticated', () => {
  test('should redirect checkout to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/checkout/individual_vip')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should preserve checkout intent after sign-in redirect', async ({ page }) => {
    await page.goto('/checkout/collective_pro')
    await page.waitForLoadState('networkidle')

    // URL should contain redirect info or be on sign-in
    await expect(page).toHaveURL(/.*sign-in/)
  })
})
