import { expect, type Page } from '@playwright/test'

export async function runVisualRegressionTest(page: Page) {
	await page.goto('/')
	await page.waitForSelector('.cds--cc--wordcloud') // wait for last chart on test harness page to render
	await expect(page).toHaveScreenshot({
		fullPage: true,
		mask: [
			// page.locator('h1'), // Will differ by Svelte, React, Angular, Vanilla JavaScript
			// page.locator('h3'), // Will differ by component name
			page.locator('.cds--cc--wordcloud.layout-svg-wrapper') // Wordcloud places words randomly
		],
		timeout: 60000
	})
}
