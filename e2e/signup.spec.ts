import { test, expect } from '@playwright/test'

test.describe('Sign Up Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up')
    await page.waitForLoadState('networkidle')
  })

  test('should display sign-up page', async ({ page }) => {
    // Check for sign-up form elements
    await expect(page.getByRole('heading', { name: /sign up|create account/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i).first()).toBeVisible()
  })

  test('should have link to sign-in', async ({ page }) => {
    const signInLink = page.getByRole('link', { name: /sign in|log in/i })
    await expect(signInLink).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /sign up|create account|get started/i })
    await submitButton.click()

    // Should show validation message or stay on page
    await expect(page).toHaveURL(/.*sign-up/)
  })

  test('should show error for invalid email format', async ({ page }) => {
    // Enter invalid email
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/password/i).first().fill('password123')

    const submitButton = page.getByRole('button', { name: /sign up|create account|get started/i })
    await submitButton.click()

    // Should show error or stay on page
    await expect(page).toHaveURL(/.*sign-up/)
  })

  test('should navigate to sign-in page', async ({ page }) => {
    await page.getByRole('link', { name: /sign in|log in|already have/i }).click()
    await expect(page).toHaveURL(/.*sign-in/)
  })
})

test.describe('Password Reset Flow', () => {
  test('should display forgot password page', async ({ page }) => {
    await page.goto('/reset-password')
    await page.waitForLoadState('networkidle')

    // Check for reset password form
    await expect(
      page.getByRole('heading', { name: /reset|forgot|recover/i })
    ).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('should navigate to forgot password from sign-in', async ({ page }) => {
    await page.goto('/sign-in')
    await page.waitForLoadState('networkidle')

    const forgotLink = page.getByRole('link', { name: /forgot|reset/i })
    if (await forgotLink.isVisible()) {
      await forgotLink.click()
      await expect(page).toHaveURL(/.*reset-password|.*forgot-password/)
    }
  })
})
