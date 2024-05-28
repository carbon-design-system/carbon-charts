import { test, expect } from '@playwright/test'

test('has correct heading and charts have not visually changed', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Carbon Charts Svelte' })).toBeVisible()
	await page.waitForSelector('.cds--cc--wordcloud') // wait for last chart on test harness page to render
	await expect(page).toHaveScreenshot({ fullPage: true, timeout: 60000 })
})
