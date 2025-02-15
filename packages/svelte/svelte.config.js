import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({ typescript: true }),
	kit: {
		adapter: adapter({
			pages: '../../pages'
		})
	}
}

export default config
