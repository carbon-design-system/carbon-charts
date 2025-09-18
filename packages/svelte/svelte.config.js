import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

function removeTSAttributesFromScriptTags() {
	return {
		markup({ content }) {
			const cleaned = content.replace(/<script([^>]*)>/g, (match, attrs) => {
				const cleanedAttrs = attrs.replace(/\s*(lang|generics)="[^"]*"/g, '')
				return `<script${cleanedAttrs}>`
			})
			return { code: cleaned }
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({ script: true }), removeTSAttributesFromScriptTags()],
	kit: {
		adapter: adapter({
			pages: '../../pages'
		})
	}
}

export default config
