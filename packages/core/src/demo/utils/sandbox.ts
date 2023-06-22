import packageJSON from '../../../package.json'

const version = {
	carbonCharts: packageJSON.version,
	carbonStyles: packageJSON.dependencies['@carbon/styles'],
	d3: packageJSON.dependencies['d3'],
	d3Cloud: packageJSON.dependencies['d3-cloud'],
	d3Sankey: packageJSON.dependencies['d3-sankey']
}

const stackBlitzRC =
`{
	"startCommand": "yarn dev"
}`

// Charts Vanilla JavaScript

export const createVanillaChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t')
	const isGeoDemo = demo.options.geoData
	const _demoOptions = { ...demo.options }
	if (isGeoDemo) {
		delete _demoOptions.geoData
	}
	const chartOptions = JSON.stringify(_demoOptions, null, isGeoDemo ? '\t\t\t' : '\t')
	const chartComponent = demo.chartType.vanilla

	const indexHtml =
`<html>
  <head>
    <title>Carbon Charts Vanilla JavaScript Example</title>
    <meta charset="UTF-8" />
    <link
      rel="preconnect"
      crossorigin="anonymous"
      href="https://fonts.googleapis.com"
    />
    <link
      href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap"
      rel="stylesheet"
      crossorigin="anonymous"
    />
		<style>
		  .p-1 {
			  padding: 2rem;
		  }
    </style>
  </head>
  <body>
	  <div class="p-1">
      <div id="app" style="width: 100%; height: 100%"></div>
		</div>
    <script src="src/index.js"></script>
  </body>
</html>`

	const indexJs = `
import { ${chartComponent} } from '@carbon/charts'
${isGeoDemo ? 'import * as d3 from "d3"' : ''}
import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'

const data = ${chartData}

${
	isGeoDemo
		? `
/* this data is only used for demo purposes, and is not an accurate representation of the world map */
d3.json(
  'https://raw.githubusercontent.com/Akshat55/carbon-charts/c565fc9ed1364465b641e7e3f2149f0631f0fd0b/packages/core/demo/data/topojson-110-data.json',
  function (error, topoData) {
		if (error) throw error

		const options = { "geoData": topoData, ${chartOptions.slice(1, -1)} }

		// Grab chart holder HTML element and initialize the chart
		const chartHolder = document.getElementById("app")
		new ${chartComponent}(chartHolder, {
			data,
			options
		})
  }
)
`
		: `
const options = ${chartOptions}

// Grab chart holder HTML element and initialize the chart
const chartHolder = document.getElementById("app")
new ${chartComponent}(chartHolder, {
	data,
	options
})`
}
`

	const packageJson = JSON.stringify(
		{
			description: 'Carbon Charts Vanilla JavaScript Example',
			version: '0.0.0',
			dependencies: {
				'@carbon/charts': version.carbonCharts,
				'@carbon/styles': version.carbonStyles,
				d3: version.d3,
				'd3-cloud': version.d3Cloud,
				'd3-sankey': version.d3Sankey
			}
		},
		null,
		2
	)

	return {
		'index.html': indexHtml,
		'index.js': indexJs,
		'package.json': packageJson
	}
}

// Charts Angular

export const createAngularChartApp = (demo: any) => {
	const angularJson = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "demo": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser-esbuild",
          "options": {
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
            "assets": [],
            "styles": ["src/styles.css"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "demo:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "demo:build:production"
            }
          }
        }
      }
    }
  },
  "defaultProject": "demo"
}`

	const packageJson = JSON.stringify(
		{
			name: 'carbon-charts-angular-example',
			version: '0.0.0',
			scripts: {
				ng: 'ng',
				start: 'NG_CLI_ANALYTICS=false ng serve',
				build: 'NG_CLI_ANALYTICS=false ng build'
			},
			dependencies: {
				'@angular/animations': '^16.1.2',
				'@angular/common': '^16.1.2',
				'@angular/compiler': '^16.1.2',
				'@angular/core': '^16.1.2',
				'@angular/platform-browser': '^16.1.2',
				'@carbon/charts': version.carbonCharts,
				'@carbon/charts-angular': version.carbonCharts,
				'@carbon/styles': version.carbonStyles,
				d3: version.d3,
				'd3-cloud': version.d3Cloud,
				'd3-sankey': version.d3Sankey,
				rxjs: '~7.8.1',
				tslib: '^2.5.3',
				'zone.js': '~0.13.1'
			}
		},
		null,
		2
	)

	const tsConfig = `{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "esnext",
    "typeRoots": ["node_modules/@types"],
    "lib": ["esnext", "dom"]
  },
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictInjectionParameters": true
  }
}`

	const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Carbon Charts Angular Example</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	<link
		href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
  <style>
	  .p-1 {
		  padding: 2rem;
	  }
  </style>
</head>
<body>
  <div class="p-1">
    <my-app></my-app>
	</div>
</body>
</html>`

	const chartComponent = demo.chartType.angular
	const chartData = JSON.stringify(demo.data, null, 2)
	const chartOptions = JSON.stringify(demo.options, null, 2)

	const mainTs = `import 'zone.js/dist/zone'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { bootstrapApplication } from '@angular/platform-browser'
import { ChartsModule } from '@carbon/charts-angular'

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ChartsModule],
	template: '<${chartComponent} [data]="data" [options]="options"></${chartComponent}>'
})
export class App {
	options = ${chartOptions}

	data = ${chartData}

}

bootstrapApplication(App)
`

	const stylesScss = `@import '@carbon/styles/css/styles.css';
@import '@carbon/charts/styles.css';`

	return {
		'angular.json': angularJson,
		'package.json': packageJson,
		'tsconfig.json': tsConfig,
		'src/index.html': indexHtml,
		'src/main.ts': mainTs,
		'src/styles.css': stylesScss
	}
}

// Charts React

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, 2)
	const chartOptions = JSON.stringify(demo.options, null, 2)
	const chartComponent = demo.chartType.vanilla

	const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Carbon Charts React Example</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	<link
		href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
  <style>
	  .p-1 {
		  padding: 2rem;
	  }
  </style>
</head>
<body>
  <div class="p-1">
	  <div id="root"></div>
  </div>
</body>
</html>`

	const indexJs = `import React from 'react'
import ReactDOM from 'react-dom'
import { ${chartComponent} } from '@carbon/charts-react'

import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'

class App extends React.Component {
	state = {
		data: ${chartData},
		options: ${chartOptions}
	}

	render = () => (
		<${chartComponent}
			data={this.state.data}
			options={this.state.options}>
		</${chartComponent}>
	)
}
ReactDOM.render(<App />, document.getElementById("root"))`

	const packageJson = JSON.stringify(
		{
			description: 'Carbon Charts React Example',
			version: '0.0.0',
			scripts: {
				dev: 'vite dev',
				build: 'vite build',
				preview: 'vite preview'
			},
			dependencies: {
				'@carbon/charts': version.carbonCharts,
				'@carbon/charts-react': version.carbonCharts,
				'@carbon/styles': version.carbonStyles,
				d3: version.d3,
				'd3-cloud': version.d3Cloud,
				'd3-sankey': version.d3Sankey,
				react: '^18.2.0',
				'react-dom': '^18.2.0'
			}
		},
		null,
		2
	)

	return {
		'public/index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson
	}
}

// Charts Svelte

export const createSvelteChartApp = (demo: any) => {
	const data = JSON.stringify(demo.data, null, 2)
	const options = JSON.stringify(demo.options, null, 2)

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
	import '@carbon/charts/styles.css'
</script>
	
<${chartComponent} data={${data}} options={${options}} style="padding:2rem;" />
`

	const svelteMainTs =
`import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
`

	const svelteViteEnvDts =
`/// <reference types="svelte" />
/// <reference types="vite/client" />
`

const svelteHtml = `<!DOCTYPE html>
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

	const packageJson = JSON.stringify(
		{
			name: 'carbon-charts-svelte-example',
			version: '0.0.0',
			type: 'module',
			scripts: {
				dev: 'vite',
				build: 'vite build',
				preview: 'vite preview',
				check: 'svelte-check --tsconfig ./tsconfig.json'
			},
			devDependencies: {
				'@carbon/charts': version.carbonCharts,
				'@carbon/charts-svelte': version.carbonCharts,
				'@carbon/styles': version.carbonStyles,
				'@sveltejs/vite-plugin-svelte': '^2.4.1',
				'@tsconfig/svelte': '^4.0.1',
				d3: version.d3,
				'd3-cloud': version.d3Cloud,
				'd3-sankey': version.d3Sankey,
				svelte: '^3.59.2',
				'svelte-check': '^3.4.3',
				tslib: '^2.5.3',
				typescript: '^5.1.3',
				vite: '^4.3.9'
			}
		},
		null,
		2
	)

	const svelteConfig =
`import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
};
`

	const svelteTsConfig =
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

	const svelteTsconfigNode = 
`{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["vite.config.ts"]
}`

	const svelteViteConfig =
`import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	optimizeDeps: {
		include: ['@carbon/charts', 'carbon-components'],
		exclude: ['@carbon/telemetry']
	}
})`

	return {
		'src/App.svelte': appSvelte,
		'src/main.ts': svelteMainTs,
		'src/vite-env.d.ts': svelteViteEnvDts,
		'.stackblitzrc': stackBlitzRC,
		'index.html': svelteHtml,
		'package.json': packageJson,
		'svelte.config.js': svelteConfig,
		'tsconfig.json': svelteTsConfig,
		'tsconfig.node.json': svelteTsconfigNode,
		'vite.config.ts': svelteViteConfig
	}
}

// Charts Vue

export const createVueChartApp = (demo: any) => {
	const data = JSON.stringify(demo.data, null, 2)
	const options = JSON.stringify(demo.options, null, 2)
	const chartComponent = demo.chartType.vue

	const appVue = `<template>
  <div id="app" class="p-1">
	  <${chartComponent} :data="data" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
	  return {
		  data: ${data},
		  options: ${options}
	  }
  }
}
</script>

<style>
  @import "@carbon/styles/css/styles.css";
  @import "@carbon/charts/styles.css";
	.p-1 {
		padding: 2rem;
	}
</style>`

	const mainJs = `import Vue from 'vue'
import ChartsVue from '@carbon/charts-vue'
import App from './App.vue'

Vue.use(ChartsVue)
Vue.config.productionTip = false
new Vue({
  render: (h) => h(App)
}).$mount('#app')`

	const packageJson = JSON.stringify(
		{
			name: 'carbon-charts-vue-example',
			description: 'Carbon Charts Vue Example',
			version: '0.0.0',
			scripts: {
				dev: 'vite',
				build: 'vite build',
				serve: 'vite preview'
			},
			dependencies: {
				'@carbon/charts': version.carbonCharts,
				'@carbon/charts-vue': version.carbonCharts,
				'@carbon/styles': version.carbonStyles,
				d3: version.d3,
				'd3-cloud': version.d3Cloud,
				'd3-sankey': version.d3Sankey,
				vue: '^2.7.14'
			},
			devDependencies: {
				vite: '^4.3.9',
				'vite-plugin-vue2': '^2.0.3',
				'vue-template-compiler': '^2.7.14'
			}
		},
		null,
		2
	)

	const viteConfig =
	`import { fileURLToPath } from 'url'
	import { defineConfig } from 'vite'
	import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
	
	export default defineConfig({
		plugins: [
			vue2({
				jsx: true
			})
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				vue: 'vue/dist/vue.esm.js'
			}
		},
		build: {
			brotliSize: false // unsupported in StackBlitz
		}
	})
`



	const indexHtml =
	`<!DOCTYPE html>
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
			<script type="module" src="/src/main.js"></script>
		</body>
	</html>
	`

	return {
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'.stackblitzrc': stackBlitzRC,
		'index.html': indexHtml,
		'package.json': packageJson,
		'vite.config.js': viteConfig
	}
}
