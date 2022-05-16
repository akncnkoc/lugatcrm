import { test, expect } from "@playwright/test"
test("should navigate to the dashboard page and test binded input", async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/")
  // Find an element with the text 'About Page' and click on it
  await page.fill("input[name=name]", "text")
  expect(
    (await page.locator("input[name=name]").inputValue()).includes("text")
  ).toBeTruthy()
})