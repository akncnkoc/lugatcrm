import { test, expect } from '@playwright/test'

test('should navigate to the product page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'About Page' and click on it
  await page.click('text=Ürün')
  // The new url should be "/prıduct" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/product')
  // The new page should contain an h1 with "About Page"
  await expect(page.locator('h1')).toContainText('Ürünler')
})

test("should navigate to the dashboard page and test binded input", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/")
  // Find an element with the text 'About Page' and click on it
  await page.fill("input[name=name]", "text")
  expect((await page.locator("input[name=name]").inputValue()).includes("text")).toBeTruthy()
})