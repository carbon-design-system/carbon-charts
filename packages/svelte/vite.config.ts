import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

// This file is really for building storybook as SvelteKit builds dist
export default defineConfig({
	plugins: [sveltekit()],
	// Note: everything in Svelte is a dev dependency as it has no runtime
	build: {
		rollupOptions: {
			// external: ['@carbon/charts/demo']
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
