import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

// Primarily for building Storybook as SvelteKit builds dist
export default defineConfig({
	plugins: [sveltekit()]
})
