import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { mdsvex } from 'mdsvex'

// See https://kit.svelte.dev/docs/adapter-static#github-pages
const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: ['.svx', '.md'] })
	],

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		},
		// outDir: 'dist'
	}
}

export default config
