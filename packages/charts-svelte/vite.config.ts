import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@carbon/charts', 'carbon-components', 'dom-to-image-more'],
		exclude: ['@carbon/telemetry']
	},
	ssr: {
		noExternal: ['@carbon/charts', '@carbon/telemetry', 'carbon-components']
	}
})
