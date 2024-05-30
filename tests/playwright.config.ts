import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test'

export function buildConfig(port: number) {
	const config: PlaywrightTestConfig = {
		testDir: 'tests',
		timeout: 60 * 1000,
		fullyParallel: true,
		forbidOnly: !!process.env.CI,
		retries: process.env.CI ? 2 : 0,
		workers: process.env.CI ? 1 : undefined,
		reporter: 'html',
		use: {
			baseURL: `http://localhost:${port}`,
			trace: 'on-first-retry'
		},
		projects: [
			{
				name: 'chromium',
				use: { ...devices['Desktop Chrome'] }
			}
			/*
			// Oddly, these two have sub-pixel variations for certain elements
			{
				name: 'webkit',
				use: { ...devices['Desktop Safari'] }
			},
			{
				name: 'firefox',
				use: { ...devices['Desktop Firefox'] }
			}
			*/
		],
		webServer: {
			command: 'yarn dev',
			url: `http://localhost:${port}`,
			reuseExistingServer: !process.env.CI
		}
	}
	return defineConfig(config)
}
