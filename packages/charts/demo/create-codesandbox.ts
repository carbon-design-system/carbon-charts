import { getParameters } from 'codesandbox/lib/api/define'
import type { IFiles } from 'codesandbox-import-utils/lib/api/define'

import packageJSON from '../package.json'
const libraryVersion = packageJSON.version
const D3VERSION = packageJSON.peerDependencies['d3']

const plexCSS = `@import "https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap";`

// Codesandbox.io tasks.json for vite environments
const codeSandboxTasks =
`{
	// These tasks will run in order when initializing your CodeSandbox project.
	"setupTasks": [
		{
			"name": "Install Dependencies",
			"command": "npm install"
		}
	],

	// These tasks can be run from CodeSandbox. Running one will open a log in the app.
	"tasks": {
		"dev": {
			"name": "dev",
			"command": "npm run dev",
			"runAtStart": true
		},
		"build": {
			"name": "build",
			"command": "npm run build",
			"runAtStart": false
		},
		"preview": {
			"name": "preview",
			"command": "npm run preview",
			"runAtStart": false
		}
	}
}`

export const createChartSandbox = (chartTemplate: any) => {
	const files: IFiles = {}
	Object.keys(chartTemplate).forEach(filePath => (files[filePath] = { content: chartTemplate[filePath], isBinary: false }))
	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters({ files })}`
}

// Charts Vanilla JavaScript

export const createVanillaChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t')
	const chartComponent = demo.chartType.vanilla

	const indexHtml = `
<html>
	<head>
		<title>Parcel Sandbox</title>
		<meta charset="UTF-8" />
		<link rel="preconnect" crossorigin="anonymous" href="https://fonts.googleapis.com" />
		<link
			href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap"
			rel="stylesheet"
			crossorigin="anonymous"
		/>
	</head>
	<body>
		<div id="app" style="width: 100%; height: 100%;"></div>
		<script src="src/index.js"></script>
	</body>
</html>`

	const indexJs = `
import { ${chartComponent} } from '@carbon/charts'
import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'
import './ibm-plex-font.css'

const data = ${chartData}
const options = ${chartOptions}

// Grab chart holder HTML element and initialize the chart
const chartHolder = document.getElementById("app")
new ${chartComponent}(chartHolder, {
	data,
	options
})
`

	const packageJson = JSON.stringify({
		description: 'Carbon Charts Vanilla JavaScript Example',
		version: '0.0.0',
		scripts: {
			start: 'parcel index.html --open',
			build: 'parcel build index.html'
		},
		dependencies: {
			'@carbon/charts': libraryVersion,
			'@carbon/styles': '^1.26.0',
			d3: D3VERSION
		},
		devDependencies: {
			'parcel-bundler': '^1.12.5'
		}
	}, null, 2)

	return {
		'index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson,
		'src/ibm-plex-font.css': plexCSS,
	}
}

// Charts Angular

export const createAngularChartApp = (demo: any) => {
	const codeSandboxAngularTasks =
`{
	// These tasks will run in order when initializing your CodeSandbox project.
	"setupTasks": [
		{
			"name": "Install Dependencies",
			"command": "npm install"
		}
	],

	// These tasks can be run from CodeSandbox. Running one will open a log in the app.
	"tasks": {
		"start": {
			"name": "start",
			"command": "npm start",
			"runAtStart": true
		},
		"build": {
			"name": "build",
			"command": "npm run build",
			"runAtStart": false
		}
	}
}`

	const angularJson =
`{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "charts-angular-example": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/charts-angular-example",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "charts-angular-example:build:production"
            },
            "development": {
              "browserTarget": "charts-angular-example:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "charts-angular-example:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}
`

const packageJson = JSON.stringify({
	description: 'Carbon Charts Angular Example',
	version: '0.0.0',
	scripts: {
		ng: 'ng',
		start: 'ng serve --disable-host-check',
		build: 'ng build',
	},
	dependencies: {
		'@angular/animations': '^15.2.4',
		'@angular/common': '^15.2.4',
		'@angular/compiler': '^15.2.4',
		'@angular/core': '^15.2.4',
		'@angular/forms': '^15.2.4',
		'@angular/platform-browser': '^15.2.4',
		'@angular/platform-browser-dynamic': '^15.2.4',
		'@angular/router': '^15.2.4',
		'@carbon/charts': libraryVersion,
		'@carbon/charts-angular': libraryVersion,
		'@carbon/styles': '^1.26.0',
		d3: D3VERSION,
		rxjs: '~7.8.0',
		tslib: '^2.3.0',
		'zone.js': '~0.12.0'
	},
	devDependencies: {
		'@angular-devkit/build-angular': '^15.2.4',
		'@angular/cli': '~15.2.4',
		'@angular/compiler-cli': '^15.2.0',
		'typescript': '~4.9.4'
	}
})

const tsConfig =
`/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
	"compileOnSave": false,
	"compilerOptions": {
		"baseUrl": "./",
		"outDir": "./dist/out-tsc",
		"forceConsistentCasingInFileNames": true,
		"strict": true,
		"noImplicitOverride": true,
		"noPropertyAccessFromIndexSignature": true,
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true,
		"sourceMap": true,
		"declaration": false,
		"downlevelIteration": true,
		"experimentalDecorators": true,
		"moduleResolution": "node",
		"importHelpers": true,
		"target": "ES2022",
		"module": "ES2022",
		"useDefineForClassFields": false,
		"lib": [
			"ES2022",
			"dom"
		]
	},
	"angularCompilerOptions": {
		"enableI18nLegacyMessageIdFormat": false,
		"strictInjectionParameters": true,
		"strictInputAccessModifiers": true,
		"strictTemplates": true
	}
}`

	const tsConfigApp =
`/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}`

	const indexHtml =
`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularTourOfHeroes</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>`

	const mainTs =
`import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))`

const stylesScss =
`@import '@carbon/styles/css/styles.css';
@import '@carbon/charts/styles.css';
@import 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap';`

	const chartData = JSON.stringify(demo.data, null, 2)
	const chartOptions = JSON.stringify(demo.options, null, 2)
	const chartComponent = demo.chartType.angular

	const appComponentHtml = `<${chartComponent} [data]="data" [options]="options"></${chartComponent}>`
	const appComponentTs =
`import { Component } from '@angular/core'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	data = ${chartData}
	options = ${chartOptions}
}`

	const appModule =
`import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartsModule } from '@carbon/charts-angular'
import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, ChartsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }`

	return {
		'.codesandbox/tasks.json': codeSandboxAngularTasks,
		'angular.json': angularJson,
		'package.json': packageJson,
		'tsconfig.json': tsConfig,
		'tsconfig.app.json': tsConfigApp,
		'dist/.gitkeep': ' ',
		'src/index.html': indexHtml,
		'src/main.ts': mainTs,
		'src/styles.scss': stylesScss,
		'src/app/app.component.html': appComponentHtml,
		'src/app/app.component.ts': appComponentTs,
		'src/app/app.component.scss': ' ',
		'src/app/app.module.ts': appModule
	}
}

// Charts React

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, 2)
	const chartOptions = JSON.stringify(demo.options, null, 2)
	const chartComponent = demo.chartType.vanilla

	const indexHtml = `<div id="root"></div>`

	const indexJs =
`import React from 'react'
import ReactDOM from 'react-dom'
import { ${chartComponent} } from '@carbon/charts-react'

import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
import './ibm-plex-font.css'

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

	const packageJson = JSON.stringify({
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
			'@carbon/styles': '^1.26.0',
			d3: D3VERSION,
			react: '^18.2.0',
			'react-dom': '^18.2.0',
			'react-scripts': '^5.0.1'
		}
	}, null, 2)

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'src/ibm-plex-font.css': plexCSS,
		'package.json': packageJson,
		'.codesandbox/tasks.json': codeSandboxTasks
	}
}

// Charts Svelte

export const createSvelteChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, 2)
	const chartOptions = JSON.stringify(demo.options, null, 2)

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

	const indexHtml =
`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<link
			rel="preconnect"
			crossorigin="anonymous"
			href="https://fonts.gstatic.com"
		/>
		<link
			href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400%7CIBM+Plex+Sans:400,600&display=swap"
			rel="stylesheet"
			crossorigin="anonymous"
		/>
	</head>
	<body>
		<script type="module">
			import App from "./App.svelte";

			const app = new App({ target: document.body });
		</script>
	</body>
</html>`

	const App =
`<script>
	import { ${chartComponent} } from "@carbon/charts-svelte"
	import '@carbon/styles/css/styles.css'
	import '@carbon/charts/styles.css'
	import './ibm-plex-font.css'
</script>

<${chartComponent} data={${chartData}} options={${chartOptions}} />`

	const packageJson = JSON.stringify({
		name: 'carbon-charts-svelte-example',
		version: '0.0.0',
		type: module,
		scripts: {
			dev: 'vite dev',
			build: 'vite build',
			preview: 'vite preview'
		},
		devDependencies: {
			'@carbon/charts': libraryVersion,
			'@carbon/charts-svelte': libraryVersion,
			'@carbon/styles': '^1.26.0',
			'@sveltejs/adapter-auto': '^2.0.0',
			'@sveltejs/kit': '^1.15.0',
			d3: D3VERSION,
			svelte: '^3.58.0',
			'svelte-check': '^3.1.4',
			tslib: '^2.5.0',
			typescript: '^5.0.3',
			vite: '^4.2.1'
		}
	}, null, 2)

	const viteConfig =
`import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()]
})`

	const svelteKitConfig =
`import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
}

export default config`

	const tsConfig =
`{
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

	return {
		'.codesandbox/tasks.json': codeSandboxTasks,
		'App.svelte': App,
		'index.html': indexHtml,
		'package.json': packageJson,
		'ibm-plex-font.css': plexCSS,
		'vite.config.ts': viteConfig,
		'svelte.config.js': svelteKitConfig,
		'tsconfig.json': tsConfig
	}
}

// Charts Vue

export const createVueChartApp = (demo: any) => {
	const dataJson = JSON.stringify(demo.data, null, '  ')
	const data = dataJson.replace(/"([^"]+)":/g, '$1:')
	const optionsJson = JSON.stringify(demo.options, null, '  ')
	const options = optionsJson.replace(/"([^"]+)":/g, '$1:')
	const chartComponent = demo.chartType.vue

	const chartVue =
`<template>
<${chartComponent} :data='data' :options='options' />
</template>

<script setup>
import { ref } from 'vue'

const data = ref(${data})

const options = ref(${options})
</script>

<style>
	@import '@carbon/styles/css/styles.css';
	@import '@carbon/charts/styles.css';
  @import 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap';
</style>`

	const appVue =
`<template>
	<Chart />
</template>

<script setup>
	import Chart from './components/Chart.vue'
</script>`

	const mainJs =
`import { createApp } from 'vue'
import ChartsVue from '@carbon/charts-vue'
import App from './App.vue'

const app = createApp(App)
app.use(ChartsVue)
app.mount('#app')`

	const packageJson = JSON.stringify({
		name: 'carbon-charts-vue-example',
		description: 'Carbon Charts Vue Example',
		version: '0.0.0',
		scripts: {
			dev: 'vite dev',
			build: 'vite build',
			preview: 'vite preview'
		},
		dependencies: {
			'@carbon/charts': libraryVersion,
			'@carbon/charts-vue': libraryVersion,
			'@carbon/styles': '^1.26.0',
			d3: D3VERSION,
			vue: '^3.2.47'
		},
		devDependencies: {
			'@vitejs/plugin-vue': '^4.1.0',
			'@vitejs/plugin-vue-jsx': '^3.0.1',
			vite: '^4.2.1'
		},
		keywords: []
	}, null, 2)

	const viteConfig =
`import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})`

	const htmlTemplate =
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue3 Example with Carbon Charts</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`

	return {
		'.codesandbox/tasks.json': codeSandboxTasks,
		'src/components/Chart.vue': chartVue,
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'index.html': htmlTemplate,
		'package.json': packageJson,
		'vite.config.js': viteConfig
	}
}