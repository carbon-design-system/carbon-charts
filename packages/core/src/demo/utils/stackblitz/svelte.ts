import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'

import { version } from '../package-versions'

export function buildSvelteExample(demo: Demo): Project {

  const devDependencies: Record<string, string> = {
    '@carbon/charts': version.carbonCharts,
    '@carbon/charts-svelte': version.carbonCharts,
    '@carbon/styles': version.carbonStyles,
    '@sveltejs/vite-plugin-svelte': version.svelteVite,
    '@tsconfig/svelte': version.svelteTsConfig,
    d3: version.d3,
    'd3-cloud': version.d3Cloud,
    'd3-sankey': version.d3Sankey,
    'svelte': version.svelte,
    'svelte-check': version.svelteCheck,
    'tslib': version.tslib,
    'typescript': version.typescript,
    'vite': version.vite
  }

  let chartComponent = demo.chartType.vanilla
  switch (chartComponent) {
		case 'SimpleBarChart':
			chartComponent = 'BarChartSimple'
			break
		case 'GroupedBarChart':
			chartComponent = 'BarChartGrouped'
			break
		case 'StackedBarChart':
			chartComponent = 'BarChartStacked'
			break
	}

  const appSvelte =
`<script lang="ts">
import { ${chartComponent} } from '@carbon/charts-svelte'
import '@carbon/styles/css/styles.css'
import '@carbon/charts-svelte/styles.css'
import options from './options'
import data from './data.json'
</script>

<${chartComponent} {data} {options} style="padding:2rem;" />
`

  const mainTs =
`import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
`

  const viteEnvDts =
`/// <reference types="svelte" />
/// <reference types="vite/client" />
`

  const stackBlitzRc = `{ "installDependencies": true, "startCommand": "yarn dev" }`

  const indexHtml =
`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" crossorigin="anonymous" href="https://fonts.googleapis.com" />
		<link
			href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400%7CIBM+Plex+Sans:400,600&display=swap"
			rel="stylesheet"
			crossorigin="anonymous"
		/>
	</head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`


  const packageJson = {
    name: 'carbon-charts-svelte-example',
    description: 'Carbon Charts Svelte Example',
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite dev',
      build: 'vite build',
      preview: 'vite preview',
      check: 'svelte-check --tsconfig ./tsconfig.json'
    },
    devDependencies
  }

  const svelteConfigJs =
`import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess()
}
`

  const tsConfigJson =
`{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"resolveJsonModule": true,
		"allowJs": true,
		"checkJs": true,
		"isolatedModules": true
	},
	"include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
	"references": [{ "path": "./tsconfig.node.json" }]
}`

  const tsConfigNodeJson =
`{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["vite.config.ts"]
}`

  const viteConfigTs =
`import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte()],
	optimizeDeps: {
		include: ['@carbon/charts', 'carbon-components'],
		exclude: ['@carbon/telemetry']
	}
})
`

  return {
    template: 'node' as ProjectTemplate,
    title: 'Carbon Charts Svelte Example',
    files: {
      'src/App.svelte': appSvelte,
      'src/data.json': JSON.stringify(demo.data, null, 2),
      'src/main.ts': mainTs,
      'src/options.json': JSON.stringify(demo.options, null, 2),
      'src/vite-env.d.ts': viteEnvDts,
      '.stackblitzrc': stackBlitzRc,
      'index.html': indexHtml,
      'package.json': JSON.stringify(packageJson, null, 2),
      'svelte.config.js': svelteConfigJs,
      'tsconfig.json': tsConfigJson,
      'tsconfig.node.json': tsConfigNodeJson,
      'vite.config.ts': viteConfigTs
    }
  }
}