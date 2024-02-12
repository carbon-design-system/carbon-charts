import core from '../../../../core/package.json'
import svelte from '../../../../svelte/package.json'
import vue from '../../../../vue/package.json'

export const version = {
	carbonCharts: core.version as string,
	d3: core.dependencies['d3'] as string,
	d3Cloud: core.dependencies['d3-cloud'] as string,
	d3Sankey: core.dependencies['d3-sankey'] as string,
	svelteVite: '^2.4.5' as string,
	svelteTsConfig: '^5.0.0' as string,
	svelte: svelte.devDependencies['svelte'] as string,
	svelteCheck: svelte.devDependencies['svelte-check'] as string,
	tslib: svelte.dependencies['tslib'] as string,
	typescript: svelte.dependencies['typescript'] as string,
	vite: svelte.devDependencies['vite'] as string,
	vue: vue.dependencies['vue'] as string
}
