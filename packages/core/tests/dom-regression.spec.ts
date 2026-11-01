import { expect, test } from '@playwright/test'
import { compile } from 'sass'
import { fileURLToPath } from 'node:url'
import { checkForDOMChanges } from '../../../tests/fixtures'

test('DOM has not changed', async ({ page }) => {
	await checkForDOMChanges(page)
})

// Use the shipped styles with the legend's rendered checkbox structure.
let css: string | undefined
function getLegendCSS() {
	return (css ??= compile(fileURLToPath(new URL('../scss/index.scss', import.meta.url)), {
		loadPaths: [
			fileURLToPath(new URL('../node_modules', import.meta.url)),
			fileURLToPath(new URL('../../../node_modules', import.meta.url))
		],
		quietDeps: true
	}).css)
}

for (const theme of ['white', 'g10', 'g90', 'g100']) {
	test(`legend keyboard focus uses the Carbon focus token in ${theme}`, async ({ page }) => {
		await page.setContent(`
			<button>Before legend</button>
			<div class="cds--chart-holder" data-carbon-theme="${theme}"
				style="padding: 16px; background: var(--cds-background)">
				<div class="cds--cc--legend">
					<div class="legend-item">
						<div class="checkbox" role="checkbox" tabindex="0"
							aria-label="Example series" aria-checked="true"></div>
						<p>Example series</p>
					</div>
				</div>
			</div>
		`)
		await page.addStyleTag({ content: getLegendCSS() })
		const checkbox = page.getByRole('checkbox', { name: 'Example series' })
		await expect(checkbox).toHaveCSS('outline-style', 'none')
		await page.getByRole('button', { name: 'Before legend' }).focus()
		await page.keyboard.press('Tab')
		await expect(checkbox).toBeFocused()
		await expect(checkbox).toHaveCSS('outline-style', 'solid')
		await expect(checkbox).toHaveCSS('outline-width', '2px')
		await expect(checkbox).toHaveCSS('outline-offset', '2px')
		await expect(checkbox).toHaveCSS(
			'outline-color',
			theme === 'white' || theme === 'g10' ? 'rgb(15, 98, 254)' : 'rgb(255, 255, 255)'
		)
		await page.getByRole('button', { name: 'Before legend' }).focus()
		await expect(checkbox).toHaveCSS('outline-style', 'none')
		await page.getByRole('button', { name: 'Before legend' }).click()
		await checkbox.click()
		await expect(checkbox).toBeFocused()
		await expect(checkbox).toHaveCSS('outline-style', 'none')
	})
}

for (const theme of ['white', 'g10', 'g90', 'g100']) {
	for (const colorScheme of ['light', 'dark'] as const) {
		test(`legend focus follows forced colors in ${theme} with ${colorScheme} scheme`, async ({
			page,
			browserName
		}) => {
			test.skip(browserName !== 'chromium', 'Forced-colors emulation requires Chromium')
			await page.emulateMedia({ forcedColors: 'active', colorScheme })
			await page.setContent(`
				<style>:root { color-scheme: ${colorScheme}; }</style>
				<button>Before legend</button>
				<div class="cds--chart-holder" data-carbon-theme="${theme}"
					style="padding: 16px; background: var(--cds-background)">
					<div class="cds--cc--legend"><div class="legend-item">
						<div class="checkbox" role="checkbox" tabindex="0"
							aria-label="Example series" aria-checked="true"></div>
					</div></div>
				</div>
			`)
			await page.addStyleTag({ content: getLegendCSS() })
			const checkbox = page.getByRole('checkbox', { name: 'Example series' })
			await page.getByRole('button', { name: 'Before legend' }).focus()
			await page.keyboard.press('Tab')
			await expect(checkbox).toBeFocused()
			const canvasText = await page.evaluate(() => {
				const probe = document.createElement('span')
				probe.style.color = 'CanvasText'
				document.body.append(probe)
				const color = getComputedStyle(probe).color
				probe.remove()
				return color
			})
			await expect(checkbox).toHaveCSS('outline-color', canvasText)
			await expect(checkbox).toHaveCSS('outline-style', 'solid')
			await expect(checkbox).toHaveCSS('outline-width', '2px')
		})
	}
}
