import core from '../../../../core/package.json'
import react from '../../../../react/package.json'
import svelte from '../../../../svelte/package.json'
import vue from '../../../../vue/package.json'

export const version = {
	carbonCharts: core.version,
	d3: core.dependencies['d3'],
	d3Cloud: core.dependencies['d3-cloud'],
	d3Sankey: core.dependencies['d3-sankey'],
	angular: 'latest',
	react: react.dependencies['react'],
	svelteVite: svelte.devDependencies['@sveltejs/vite-plugin-svelte'],
	svelteTsConfig: 'latest',
	svelte: svelte.devDependencies['svelte'],
	svelteCheck: svelte.devDependencies['svelte-check'],
	tslib: svelte.devDependencies['tslib'],
	typescript: core.devDependencies['typescript'],
	vite: core.devDependencies['vite'],
	vue: vue.dependencies['vue'],
	vueTsc: vue.devDependencies['vue-tsc'],
	vueVitePlugin: vue.devDependencies['@vitejs/plugin-vue']
}
