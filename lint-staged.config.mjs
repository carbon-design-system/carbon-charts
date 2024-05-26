export default {
	'*.{css,scss,html,json,md,yaml,yml}': 'prettier --write',
	'*.{js,mjs,svelte,ts,tsx,vue}': ['eslint --fix', 'prettier --write']
}
