import { test } from '@playwright/test'
import { runVisualRegressionTest } from '../../../tests/visual-regression'

test('no visual changes to charts', async ({ page }) => {
	await runVisualRegressionTest(page)
})
