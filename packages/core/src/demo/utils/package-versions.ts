import core from '@/../package.json'
import angular from '@/../../angular/package.json'
import react from '@/../../react/package.json'
import svelte from '@/../../svelte/package.json'
import vue from '@/../../vue/package.json'

export const version = {
	carbonCharts: core.version,
	carbonStyles: core.devDependencies['@carbon/styles'],
	d3: core.dependencies['d3'],
	d3Cloud: core.dependencies['d3-cloud'],
	d3Sankey: core.dependencies['d3-sankey'],
  angular: angular.dependencies['@angular/core'],
  react: react.dependencies['react'],
  rxjs: angular.dependencies['rxjs'],
  sass: core.devDependencies['sass'],
  svelteVite: '^2.4.2',
  svelteTsConfig: '^5.0.0',
  svelte: svelte.devDependencies['svelte'],
  svelteCheck: svelte.devDependencies['svelte-check'],
  tslib: angular.dependencies['tslib'],
  typescript: angular.dependencies['typescript'],
  vite: core.devDependencies['vite'],
  vue: vue.dependencies['vue'],
  zoneJs: angular.dependencies['zone.js'],
}