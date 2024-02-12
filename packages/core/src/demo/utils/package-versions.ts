import core from '@/../package.json'
import react from '@/../../react/package.json'
import svelte from '@/../../svelte/package.json'
import vue from '@/../../vue/package.json'

export const version = {
	carbonCharts: core.version as string,
	d3: core.dependencies['d3'] as string,
	d3Cloud: core.dependencies['d3-cloud'] as string,
	d3Sankey: core.dependencies['d3-sankey'] as string,
	angular: 'latest',
	react: react.dependencies['react'] as string,
	svelteVite: svelte.devDependencies['@sveltejs/vite-plugin-svelte'] as string,
	svelteTsConfig: 'latest' as string,
	svelte: svelte.devDependencies['svelte'] as string,
	svelteCheck: svelte.devDependencies['svelte-check'] as string,
	tslib: svelte.devDependencies['tslib'] as string,
	typescript: core.devDependencies['typescript'] as string,
	vite: core.devDependencies['vite'] as string,
	vue: vue.dependencies['vue'] as string,
	vueTsc: vue.devDependencies['vue-tsc'] as string,
	vueVitePlugin: vue.devDependencies['@vitejs/plugin-vue'] as string
}
