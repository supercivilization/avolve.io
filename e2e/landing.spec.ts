import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Landing page is public at /home
    await page.goto('/home')
    await page.waitForLoadState('networkidle')
  })

  test('should display hero section', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // Check for CTA button
    const ctaButton = page.getByRole('link', { name: /get started|start|join/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('should display features section', async ({ page }) => {
    // Check for features section
    const featuresSection = page.getByText(/features|what you get|included/i).first()
    await expect(featuresSection).toBeVisible()
  })

  test('should have navigation links', async ({ page }) => {
    // Check for main navigation
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
  })

  test('should navigate to pricing from landing page', async ({ page }) => {
    await page.getByRole('link', { name: /pricing/i }).click()
    await expect(page).toHaveURL(/.*pricing/)
  })

  test('should navigate to sign-in from landing page', async ({ page }) => {
    await page.getByRole('link', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should display footer with legal links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Check for footer content
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check for legal links
    await expect(page.getByRole('link', { name: /privacy/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /terms/i })).toBeVisible()
  })
})

test.describe('Landing Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/home')
    await page.waitForLoadState('networkidle')

    // Hero should still be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // CTA should be visible
    const ctaButton = page.getByRole('link', { name: /get started|start|join/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('should have mobile menu', async ({ page }) => {
    await page.goto('/home')
    await page.waitForLoadState('networkidle')

    // Look for mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i }).or(
      page.locator('[aria-label*="menu"]')
    )

    if (await menuButton.isVisible()) {
      await menuButton.click()
      // Menu should expand
      await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible()
    }
  })
})
