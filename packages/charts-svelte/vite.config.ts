import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			// external: ['@carbon/charts'] // embed it rather than make it a peerDependency
		}
	},
	plugins: [sveltekit()]
})
