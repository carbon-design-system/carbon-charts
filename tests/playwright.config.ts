import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	timeout: 60 * 1000,
	testDir: '../../tests',
	outputDir: '../../test-results',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		}
	],
	webServer: {
		command: 'yarn dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI
	}
})
