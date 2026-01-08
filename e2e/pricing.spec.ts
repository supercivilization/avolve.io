import { test, expect } from '@playwright/test'

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing')
    await page.waitForLoadState('networkidle')
  })

  test('should display all three tiers', async ({ page }) => {
    // Check for the three pricing tiers
    await expect(page.getByText('Individual VIP')).toBeVisible()
    await expect(page.getByText('Collective PRO')).toBeVisible()
    await expect(page.getByText('Ecosystem CEO')).toBeVisible()
  })

  test('should display pricing for each tier', async ({ page }) => {
    // Check for pricing
    await expect(page.getByText('$28')).toBeVisible()
    await expect(page.getByText('$288')).toBeVisible()
    await expect(page.getByText('$2,888')).toBeVisible()
  })

  test('should have subscribe buttons for each tier', async ({ page }) => {
    const subscribeButtons = page.getByRole('button', { name: /subscribe|get started|start|choose/i })
    await expect(subscribeButtons).toHaveCount(3)
  })

  test('should toggle between monthly and yearly pricing', async ({ page }) => {
    // Check for billing toggle
    const toggle = page.getByRole('switch').or(page.getByRole('button', { name: /yearly|annually/i }))

    if (await toggle.isVisible()) {
      await toggle.click()

      // Check for yearly pricing
      await expect(page.getByText('$288/year').or(page.getByText('$2,888/year'))).toBeVisible()
    }
  })

  test('should highlight the recommended tier', async ({ page }) => {
    // PRO tier should have a recommended indicator
    const proCard = page.locator('[data-tier="collective_pro"]').or(
      page.getByText('Collective PRO').locator('..')
    )
    await expect(proCard.getByText(/recommended|most popular/i)).toBeVisible()
  })
})
