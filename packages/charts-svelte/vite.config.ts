import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@carbon/charts', '@carbon/telemetry', 'carbon-components'],
		exclude: []
	},
	ssr: {
		noExternal: ['@carbon/charts', '@carbon/telemetry', 'carbon-components']
	}
})
