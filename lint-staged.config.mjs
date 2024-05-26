export default {
	'*.{md,json,yml,css,scss,html}': 'prettier --write',
	'*.{ts,tsx,svelte,vue,mjs,js}': ['eslint --fix', 'prettier --write']
}
