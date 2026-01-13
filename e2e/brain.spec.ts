import { test, expect } from '@playwright/test'
import { test as authTest } from './fixtures/auth.fixture'

/**
 * Brain Feature E2E Tests
 *
 * STATUS: Basic tests enabled. Full tests require authenticated session with seeded data.
 *
 * To run all tests:
 * 1. Set E2E_TEST_USER_EMAIL and E2E_TEST_USER_PASSWORD env vars
 * 2. Ensure test user has ai_chat feature access (VIP subscription)
 * 3. Run: yarn test:e2e
 */

test.describe('Brain Page - Public Access', () => {
  test('should redirect to sign-in when accessing brain page', async ({ page }) => {
    await page.goto('/brain')
    // Should redirect to sign-in for unauthenticated users
    await expect(page).toHaveURL(/.*sign-in/)
  })

  test('should show sign-in page elements after redirect', async ({ page }) => {
    await page.goto('/brain')
    await page.waitForLoadState('networkidle')

    // Verify we're on sign-in page
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })
})

test.describe('Project Brain Feature', () => {
  // Tests require authenticated user and completed Brain UI

  test.beforeEach(async ({ page }) => {
    // Navigate to a dashboard page that has the brain feature
    // For now, we'll test the public-facing aspects
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Knowledge Panel', () => {
    test.skip('should display the knowledge panel on dashboard', async ({ page }) => {
      // Look for the brain/knowledge section
      await expect(page.getByText(/knowledge/i)).toBeVisible()
    })

    test.skip('should show Add button in knowledge panel', async ({ page }) => {
      await expect(page.getByRole('button', { name: /add/i })).toBeVisible()
    })

    test.skip('should open add source sheet when clicking Add', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()

      // Check for source type options
      await expect(page.getByText(/upload file/i)).toBeVisible()
      await expect(page.getByText(/add url/i)).toBeVisible()
      await expect(page.getByText(/create note/i)).toBeVisible()
    })
  })

  test.describe('Add Note Flow', () => {
    test.skip('should allow creating a note', async ({ page }) => {
      // Open add source sheet
      await page.getByRole('button', { name: /add/i }).click()

      // Select note option
      await page.getByTestId('add-source-note').click()

      // Fill in note details
      await page.getByTestId('note-title-input').fill('Test Note Title')
      await page.getByTestId('note-content-input').fill('This is the content of my test note for the knowledge base.')

      // Submit
      await page.getByTestId('note-submit').click()

      // Wait for success message
      await expect(page.getByText(/created successfully/i)).toBeVisible({ timeout: 10000 })
    })

    test.skip('should validate required fields for notes', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()
      await page.getByTestId('add-source-note').click()

      // Try to submit without filling fields
      await page.getByTestId('note-submit').click()

      // Should show validation error
      await expect(page.getByText(/please enter a title/i)).toBeVisible()
    })
  })

  test.describe('Add URL Flow', () => {
    test.skip('should allow adding a URL source', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()
      await page.getByTestId('add-source-url').click()

      // Fill URL details
      await page.getByTestId('url-input').fill('https://example.com/article')
      await page.getByTestId('url-title-input').fill('Example Article')

      // Submit
      await page.getByTestId('url-submit').click()

      // Wait for processing
      await expect(page.getByText(/processing/i)).toBeVisible({ timeout: 5000 })
    })

    test.skip('should validate URL format', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()
      await page.getByTestId('add-source-url').click()

      // Enter invalid URL
      await page.getByTestId('url-input').fill('not-a-valid-url')
      await page.getByTestId('url-title-input').fill('Test')
      await page.getByTestId('url-submit').click()

      // Should show validation error
      await expect(page.getByText(/valid url/i)).toBeVisible()
    })
  })

  test.describe('Add File Flow', () => {
    test.skip('should allow uploading a file', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()
      await page.getByTestId('add-source-file').click()

      // Note: File upload testing requires creating a test file
      // This is a simplified version
      const fileInput = page.locator('#file-input')

      // Create a test file
      await fileInput.setInputFiles({
        name: 'test-document.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('This is test content for the knowledge base.'),
      })

      // Should show file preview
      await expect(page.getByText(/test-document.txt/i)).toBeVisible()

      // Fill title
      await page.getByTestId('file-title-input').fill('Test Document')

      // Submit
      await page.getByTestId('file-upload-submit').click()

      // Wait for upload
      await expect(page.getByText(/uploading/i)).toBeVisible({ timeout: 5000 })
    })

    test.skip('should reject unsupported file types', async ({ page }) => {
      await page.getByRole('button', { name: /add/i }).click()
      await page.getByTestId('add-source-file').click()

      const fileInput = page.locator('#file-input')

      // Try to upload unsupported file type
      await fileInput.setInputFiles({
        name: 'test.exe',
        mimeType: 'application/x-msdownload',
        buffer: Buffer.from('test'),
      })

      // Should show error
      await expect(page.getByText(/unsupported file type/i)).toBeVisible()
    })
  })

  test.describe('Knowledge Search', () => {
    test.skip('should allow searching knowledge base', async ({ page }) => {
      // Find search input
      const searchInput = page.getByPlaceholder(/search.*knowledge/i)
      await expect(searchInput).toBeVisible()

      // Perform search
      await searchInput.fill('test query')
      await searchInput.press('Enter')

      // Should show results or empty state
      await expect(
        page.getByText(/result/i).or(page.getByText(/no results/i))
      ).toBeVisible({ timeout: 10000 })
    })

    test.skip('should show search results with source info', async ({ page }) => {
      // Assuming there's existing knowledge to search
      const searchInput = page.getByPlaceholder(/search.*knowledge/i)
      await searchInput.fill('test')
      await searchInput.press('Enter')

      // Results should show source information
      // This would depend on having seeded data
    })
  })

  test.describe('Sources Tab', () => {
    test.skip('should display list of sources', async ({ page }) => {
      // Click on Sources tab
      await page.getByRole('tab', { name: /sources/i }).click()

      // Should show sources list or empty state
      await expect(
        page.getByText(/source/i).or(page.getByText(/no sources yet/i))
      ).toBeVisible()
    })

    test.skip('should show source count in tab', async ({ page }) => {
      // The tab should show count like "Sources (5)"
      const sourcesTab = page.getByRole('tab', { name: /sources/i })
      await expect(sourcesTab).toBeVisible()
    })
  })

  test.describe('Entities Tab', () => {
    test.skip('should display extracted entities', async ({ page }) => {
      // Click on Entities tab
      await page.getByRole('tab', { name: /entities/i }).click()

      // Should show entities or empty state
      await expect(
        page.getByText(/entity/i).or(page.getByText(/no entities/i))
      ).toBeVisible()
    })
  })

  test.describe('Domain Filtering', () => {
    test.skip('should filter knowledge by C-Suite domain', async ({ page }) => {
      // Navigate to a specific domain dashboard (e.g., CEO)
      await page.goto('/dashboard/ceo')
      await page.waitForLoadState('networkidle')

      // Knowledge should be filtered to CEO domain
      // This would be verified by checking the panel title or filtered results
    })
  })
})

// Integration test for brain chat (requires authenticated session)
test.describe('Brain Chat', () => {
  test.skip('should allow chatting with the brain', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Find chat input
    const chatInput = page.getByTestId('brain-chat-input')
    await expect(chatInput).toBeVisible()

    // Send a message
    await chatInput.fill('What do I know about project management?')
    await page.getByTestId('send-message').click()

    // Wait for response
    await expect(page.getByTestId('assistant-message')).toBeVisible({ timeout: 30000 })
  })

  test.skip('should show citations from knowledge base', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    const chatInput = page.getByTestId('brain-chat-input')
    await chatInput.fill('Summarize my notes')
    await page.getByTestId('send-message').click()

    // Response should include citations if knowledge exists
    await expect(page.getByTestId('assistant-message')).toBeVisible({ timeout: 30000 })
    // Citations would be checked here
  })
})

// Authenticated tests using auth fixture
authTest.describe('Brain Feature - Authenticated', () => {
  authTest.skip(
    !process.env.E2E_TEST_USER_EMAIL || !process.env.E2E_TEST_USER_PASSWORD,
    'Requires E2E_TEST_USER_EMAIL and E2E_TEST_USER_PASSWORD env vars'
  )

  authTest('should access brain page when authenticated', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/brain')
    await authenticatedPage.waitForLoadState('networkidle')

    // Should see brain page content, not sign-in redirect
    await expect(authenticatedPage.getByText(/brain/i)).toBeVisible()
  })

  authTest('should display brain tabs when authenticated', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/brain')
    await authenticatedPage.waitForLoadState('networkidle')

    // Should see the three tabs
    await expect(authenticatedPage.getByRole('tab', { name: /chat/i })).toBeVisible()
    await expect(authenticatedPage.getByRole('tab', { name: /search/i })).toBeVisible()
    await expect(authenticatedPage.getByRole('tab', { name: /sources/i })).toBeVisible()
  })

  authTest('should switch between brain tabs', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/brain')
    await authenticatedPage.waitForLoadState('networkidle')

    // Click Search tab
    await authenticatedPage.getByRole('tab', { name: /search/i }).click()
    await expect(authenticatedPage.getByPlaceholder(/search/i)).toBeVisible()

    // Click Sources tab
    await authenticatedPage.getByRole('tab', { name: /sources/i }).click()
    await expect(authenticatedPage.getByText(/knowledge sources/i)).toBeVisible()
  })
})
