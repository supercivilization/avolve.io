import { test, expect } from '@playwright/test'

test.describe('Dashboard Navigation', () => {
  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect training page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/training')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect techniques page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/techniques')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect tools page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/tools')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect connect page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/connect')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect settings page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/settings')
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should redirect team page to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/team')
    await expect(page).toHaveURL(/.*sign-in/)
  })
})

test.describe('Dashboard Content (Public View)', () => {
  // These tests verify the dashboard structure when accessed
  // Full dashboard tests would require authentication fixtures

  test('should display proper page titles', async ({ page }) => {
    // When accessing dashboard, we get redirected to sign-in
    // But we can check that the sign-in page loads correctly
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Should have sign-in heading
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
  })
})
