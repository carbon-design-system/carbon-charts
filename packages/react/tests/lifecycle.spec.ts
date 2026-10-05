import { expect, test } from '@playwright/test'

for (const strictMode of [false, true]) {
	test(`releases chart resources across repeated mounts (StrictMode: ${strictMode})`, async ({
		page
	}) => {
		const errors: string[] = []
		page.on('pageerror', error => errors.push(error.message))
		await page.goto('/tests/fixtures/lifecycle.html')
		const result = await page.evaluate(async strict => {
			const modulePath = '/tests/fixtures/lifecycle.ts'
			const { runLifecycleScenario } = await import(modulePath)
			return runLifecycleScenario(strict)
		}, strictMode)

		expect(result).toMatchObject({
			mountedCount: 3,
			updatedCount: 3,
			activeObservers: 0,
			activeFullscreenListeners: 0,
			destroyedCount: 3,
			connectedCount: 0,
			respondedCount: 0
		})
		expect(result.disconnectCount).toBe(strictMode ? 6 : 3)
		expect(errors).toEqual([])
	})
}
