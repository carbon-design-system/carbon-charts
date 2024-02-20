import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'
import { objectToString } from './object-to-string'
import { version } from '../package-versions'

export function buildVueExample(demo: Demo): Project {
	const dependencies: Record<string, string> = {
		'@carbon/charts-vue': version.carbonCharts,
		d3: version.d3,
		'd3-cloud': version.d3Cloud,
		'd3-sankey': version.d3Sankey,
		vue: version.vue
	}

	const devDependencies: Record<string, string> = {
		'@vitejs/plugin-vue': version.vueVitePlugin,
		typescript: version.typescript,
		vite: version.vite, 
		'vue-tsc': version.vueTsc
	}

	const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Carbon Charts Vue Example</title>
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

	const appVue = `<script setup lang="ts">
	import { ref } from 'vue'
	import chartData from './data.ts'
	import chartOptions from './options.ts'
	const data = ref(chartData)
	const options = ref(chartOptions)
</script>

<template>
  <div id="app" class="p-1">
    <${demo.chartType.vue} :data :options />
  </div>
</template>

<style>
@import '@carbon/charts-vue/styles.css';
.p-1 {
padding: 2rem;
}
</style>
`

	const mainJs = `import { createApp } from 'vue'
import ChartsVue from '@carbon/charts-vue'
import App from './App.vue'
const app = createApp(App)
app.use(ChartsVue)
app.mount('#app')
`

	const packageJson = {
		name: 'carbon-charts-vue-example',
		description: 'Carbon Charts Vue Example',
		version: '0.0.0',
		type: 'module',
		scripts: {
			dev: 'vite',
			build: 'vue-tsc && vite build',
			preview: 'vite preview'
		},
		dependencies,
		devDependencies
	}

	const tsConfigJson = `{
		"compilerOptions": {
			"target": "ES2020",
			"useDefineForClassFields": true,
			"module": "ESNext",
			"lib": ["ES2020", "DOM", "DOM.Iterable"],
			"skipLibCheck": true,
	
			/* Bundler mode */
			"moduleResolution": "bundler",
			"allowImportingTsExtensions": true,
			"resolveJsonModule": true,
			"isolatedModules": true,
			"noEmit": true,
			"jsx": "preserve",
	
			/* Linting */
			"strict": true,
			"noUnusedLocals": true,
			"noUnusedParameters": true,
			"noFallthroughCasesInSwitch": true,
		},
		"include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
		"references": [{ "path": "./tsconfig.node.json" }]
	}`
	
		const tsConfigNodeJson = `{
			"compilerOptions": {
				"composite": true,
				"skipLibCheck": true,
				"module": "ESNext",
				"moduleResolution": "bundler",
				"allowSyntheticDefaultImports": true
			},
			"include": ["vite.config.ts"]
	}`
	
		const viteConfigTs = `import { defineConfig } from 'vite'
		import { fileURLToPath } from 'url'
		import vue from '@vitejs/plugin-vue'
		
		// https://vitejs.dev/config/
		export default defineConfig({
			resolve: {
				alias: {
					'@': fileURLToPath(new URL('./src', import.meta.url)),
					vue: 'vue/dist/vue.esm-bundler.js'
				}
			},
			plugins: [vue()],
		})		
	`

	return {
		template: 'node' as ProjectTemplate,
		title: 'Carbon Charts Vue Example',
		// dependencies,
		files: {
			'index.html': indexHtml,
			'src/App.vue': appVue,
			'src/data.ts': objectToString(demo.data),
			'src/main.ts': mainJs,
			'src/options.ts': objectToString(demo.options),
			'src/vite-env.d.ts': `/// <reference types="vite/client" />
			`,
			'package.json': JSON.stringify(packageJson, null, 2),
			'tsconfig.json': tsConfigJson,
			'tsconfig.node.json': tsConfigNodeJson,
			'vite.config.ts': viteConfigTs
		}
	}
}
