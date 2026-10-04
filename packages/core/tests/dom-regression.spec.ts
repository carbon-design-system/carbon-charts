import { test, expect } from '@playwright/test'
import { checkForDOMChanges } from '../../../tests/fixtures'

test('DOM has not changed', async ({ page }) => {
	await checkForDOMChanges(page)
})

for (const orientation of ['horizontal', 'vertical']) {
	for (const data of ['zero', 'small']) {
		test(`${orientation} lollipops keep ${data} values at the baseline`, async ({ page }) => {
			await page.goto('/tests/fixtures/lollipop-zero.html')
			const lines = page.locator(`#${orientation}-${data} line.line`)
			await expect(lines).toHaveCount(3)
			const axis = orientation === 'horizontal' ? 'x' : 'y'
			const zeroCount = data === 'zero' ? 3 : 2
			await expect(lines.first()).toHaveAttribute(`${axis}1`, /\d/)
			await expect(lines.first()).toHaveAttribute(`${axis}2`, /\d/)
			await expect
				.poll(async () => {
					const coordinates = await lines.evaluateAll(
						(elements, attribute) =>
							elements.map(line => [
								Number(line.getAttribute(`${attribute}1`)),
								Number(line.getAttribute(`${attribute}2`))
							]),
						axis
					)
					return coordinates
						.slice(0, zeroCount)
						.every(([start, end]) => Math.abs(start - end) < 0.01)
				})
				.toBe(true)
			if (data === 'small') {
				const end = Number(await lines.last().getAttribute(`${axis}2`))
				const start = Number(await lines.last().getAttribute(`${axis}1`))
				expect(Math.abs(end - start)).toBeGreaterThan(4)
			}
		})
	}
}
