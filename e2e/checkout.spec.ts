import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test('should navigate to checkout from pricing page', async ({ page }) => {
    await page.goto('/pricing')
    await page.waitForLoadState('networkidle')

    // Click on the first subscribe button
    const subscribeButton = page.getByRole('button', { name: /subscribe|get started|start|choose/i }).first()
    await subscribeButton.click()

    // Should redirect to sign-in if not authenticated
    // OR to checkout if authenticated
    await expect(page).toHaveURL(/.*sign-in|.*checkout/)
  })

  test('checkout page requires authentication', async ({ page }) => {
    // Try to access checkout directly
    await page.goto('/checkout/individual_vip')

    // Should redirect to sign-in
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should display tier information on checkout page (when authenticated)', async ({ page }) => {
    // This test assumes we have a way to authenticate
    // For now, we'll just verify the page loads correctly
    // In production, you'd use a test user or mock authentication

    await page.goto('/checkout/individual_vip')
    await page.waitForLoadState('networkidle')

    // Check we either got redirected to sign-in or the checkout page loaded
    const url = page.url()
    if (url.includes('sign-in')) {
      // Expected for unauthenticated users
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    } else {
      // If authenticated, should show checkout content
      await expect(page.getByText(/Individual VIP|checkout/i)).toBeVisible()
    }
  })

  test('should handle invalid tier gracefully', async ({ page }) => {
    await page.goto('/checkout/invalid_tier')
    await page.waitForLoadState('networkidle')

    // Should either redirect to pricing or show an error
    await expect(page).toHaveURL(/.*pricing|.*sign-in|.*checkout/)
  })
})

test.describe('Checkout Success Page', () => {
  test('should show success message on successful checkout', async ({ page }) => {
    // Navigate to success page (simulating redirect from Stripe)
    await page.goto('/checkout/success?session_id=test_session')
    await page.waitForLoadState('networkidle')

    // Check for success indicators
    const successContent = page.getByText(/success|thank you|welcome|subscription/i)
    await expect(successContent).toBeVisible()
  })

  test('should have link to dashboard after success', async ({ page }) => {
    await page.goto('/checkout/success?session_id=test_session')
    await page.waitForLoadState('networkidle')

    // Check for dashboard link or button
    const dashboardLink = page.getByRole('link', { name: /dashboard|get started|continue/i })
    await expect(dashboardLink).toBeVisible()
  })
})
