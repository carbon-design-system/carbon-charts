import { test } from '@playwright/test'
import { checkForDOMChanges } from '../../../tests/fixtures'

test('DOM has not changed', async ({ page }) => {
	await checkForDOMChanges(page)
})
