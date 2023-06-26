import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

// Primarily for building Storybook as SvelteKit builds dist
export default defineConfig({
	plugins: [sveltekit()],
	// Note: everything in Svelte is a dev dependency as it has no runtime
	build: {
		rollupOptions: {
		}
	},
	optimizeDeps: {
		include: ['@carbon/charts'],
		exclude: [
			// Cannot be included for optimization or storybook errors
			'@carbon/telemetry'
		]
	},
	ssr: {
		noExternal: ['@carbon/charts', '@carbon/telemetry']
	}
})
