import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should display sign-in page', async ({ page }) => {
    await page.goto('/sign-in')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check for sign-in form elements
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should redirect to sign-in when accessing protected route', async ({ page }) => {
    // Try to access home (protected route)
    await page.goto('/')

    // Should redirect to sign-in
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should allow navigation between auth pages', async ({ page }) => {
    await page.goto('/sign-in')

    // Navigate to sign-up
    await page.getByRole('link', { name: /sign up/i }).click()
    await expect(page).toHaveURL(/.*sign-up/)

    // Navigate back to sign-in
    await page.getByRole('link', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/.*sign-in/)
  })
})
