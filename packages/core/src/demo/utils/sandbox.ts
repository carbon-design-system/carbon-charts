import { getParameters } from 'codesandbox/lib/api/define'
import type { IFiles } from 'codesandbox-import-utils/lib/api/define'

import packageJSON from '../../../package.json'
const libraryVersion = packageJSON.version
const D3VERSION = packageJSON.peerDependencies['d3']

const sandboxConfig = `{
  "infiniteLoopProtection": true,
  "hardReloadOnChange": false,
  "view": "browser",
  "container": {
    "node": "16"
  }
}`

const codeSandboxTasks = `{
	"$schema": "https://codesandbox.io/schemas/tasks.json",
	"setupTasks": [
		{
			"name": "Install Dependencies",
			"command": "yarn install"
		}
	],

	// These tasks can be run from CodeSandbox. Running one will open a log in the app.
	"tasks": {
		"dev": {
			"name": "dev",
			"command": "yarn dev",
			"runAtStart": true
		},
		"build": {
			"name": "build",
			"command": "yarn build",
			"runAtStart": false
		},
		"preview": {
			"name": "preview",
			"command": "yarn preview",
			"runAtStart": false
		}
	}
}`

export const createChartSandbox = (chartTemplate: any) => {
	const files: IFiles = {}
	Object.keys(chartTemplate).forEach((filePath) => {
		files[filePath] = {
			content: chartTemplate[filePath],
			isBinary: false
		}
	})
	const parameters = getParameters({ files })
	const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(
		parameters
	)}`
	return url
}

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

	const indexHtml = `	<html>
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
  </head>
  <body>
    <div id="app" style="width: 100%; height: 100%"></div>
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
				'@carbon/charts': libraryVersion,
				'@carbon/styles': '^1.30.0',
				d3: D3VERSION
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
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
            "assets": [],
            "styles": ["src/global_styles.css"],
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
			name: 'carbon-charts-example',
			version: '0.0.0',
			scripts: {
				ng: 'ng',
				start: 'NG_CLI_ANALYTICS=false ng serve',
				build: 'NG_CLI_ANALYTICS=false ng build'
			},
			dependencies: {
				'@angular/animations': '^15.2.8',
				'@angular/common': '^15.2.8',
				'@angular/compiler': '^15.2.8',
				'@angular/core': '^15.2.8',
				'@angular/platform-browser': '^15.2.8',
				'@carbon/charts': libraryVersion,
				'@carbon/charts-angular': libraryVersion,
				'@carbon/styles': '^1.30.0',
				d3: D3VERSION,
				rxjs: '~7.8.1',
				tslib: '^2.5.0',
				'zone.js': '~0.13.0'
			},
			devDependencies: {
				'@angular-devkit/build-angular': '^15.2.7',
				'@angular/cli': '~15.2.7',
				'@angular/compiler-cli': '^15.2.8',
				typescript: '~4.9.5'
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
</head>
<body>
  <my-app></my-app>
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
		'src/global_styles.css': stylesScss
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
</head>
<body>
	<div id="root"></div>
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
				'@carbon/charts': libraryVersion,
				'@carbon/charts-react': libraryVersion,
				'@carbon/styles': '^1.30.0',
				d3: D3VERSION,
				react: '^18.2.0',
				'react-dom': '^18.2.0',
				'react-scripts': '^5.0.1' // needed?
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

	const svelteKitTsConfig = `{
	"compilerOptions": {
		"paths": {
			"$lib": [
				"../src/lib"
			],
			"$lib/*": [
				"../src/lib/*"
			]
		},
		"rootDirs": [
			"..",
			"./types"
		],
		"importsNotUsedAsValues": "error",
		"isolatedModules": true,
		"preserveValueImports": true,
		"lib": [
			"esnext",
			"DOM",
			"DOM.Iterable"
		],
		"moduleResolution": "node",
		"module": "esnext",
		"target": "esnext",
		"ignoreDeprecations": "5.0"
	},
	"include": [
		"ambient.d.ts",
		"./types/**/$types.d.ts",
		"../vite.config.ts",
		"../src/**/*.js",
		"../src/**/*.ts",
		"../src/**/*.svelte",
		"../tests/**/*.js",
		"../tests/**/*.ts",
		"../tests/**/*.svelte"
	],
	"exclude": [
		"../node_modules/**",
		"./[!ambient.d.ts]**",
		"../src/service-worker.js",
		"../src/service-worker.ts",
		"../src/service-worker.d.ts"
	]
}`

	const appHtml = `<!DOCTYPE html>
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
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>`

	const appDts = `declare global {
	namespace App {
	}
}

export {}
`

	const pageSvelte = `<script lang="ts">
import { ${chartComponent} } from '@carbon/charts-svelte'
import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'
</script>

<${chartComponent} data={${data}} options={${options}} />`

	const packageJson = JSON.stringify(
		{
			name: 'carbon-charts-svelte-example',
			version: '0.0.0',
			type: 'module',
			license: 'MIT',
			scripts: {
				dev: 'vite dev',
				start: 'vite dev',
				build: 'vite build',
				preview: 'vite preview'
			},
			devDependencies: {
				'@carbon/charts': libraryVersion,
				'@carbon/charts-svelte': libraryVersion,
				'@carbon/styles': '^1.30.0',
				'@sveltejs/adapter-auto': '^2.1.0',
				'@sveltejs/kit': '^1.20.1',
				d3: D3VERSION,
				// sass: '^1.60.0',
				svelte: '^3.59.1',
				'svelte-check': '^3.4.3',
				tslib: '^2.5.3',
				typescript: '^5.0.4',
				vite: '^4.3.9'
			},
			engines: {
				node: '>=16.12.0'
			}
		},
		null,
		2
	)

	const svelteKitConfig = `import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
}

export default config`

	const tsConfig = `{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	}
}`

	const viteConfig = `import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@carbon/charts', 'carbon-components'],
		exclude: ['@carbon/telemetry']
	},
	ssr: {
		external: ['@carbon/charts']
		// noExternal: ['@carbon/charts', '@carbon/telemetry', 'carbon-components']
	}
})`

	return {
		// '.codesandbox/Dockerfile': dockerFile, // works but adds a lot of time to the startup process
		'.codesandbox/tasks.json': codeSandboxTasks,
		'.svelte-kit/tsconfig.json': svelteKitTsConfig,
		'src/app.html': appHtml,
		'src/app.d.ts': appDts,
		'src/routes/+page.svelte': pageSvelte,
		'src/static/.gitkeep': ' ',
		'.npmrc': 'engine-strict=true',
		'package.json': packageJson,
		'README.md': `# Carbon Charts Svelte Example`,
		'sandbox.config.json': sandboxConfig,
		'svelte.config.js': svelteKitConfig,
		'tsconfig.json': tsConfig,
		'vite.config.ts': viteConfig
	}
}

// Charts Vue

export const createVueChartApp = (demo: any) => {
	const data = JSON.stringify(demo.data, null, 2)
	const options = JSON.stringify(demo.options, null, 2)
	const chartComponent = demo.chartType.vue

	const appVue = `<template>
  <div id="app">
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
  @import "https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap";
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
			dependencies: {
				'@carbon/charts': libraryVersion,
				'@carbon/charts-vue': libraryVersion,
				'@carbon/styles': '^1.30.0',
				vue: '^2.7.14'
			}
		},
		null,
		2
	)

	return {
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'package.json': packageJson
	}
}
