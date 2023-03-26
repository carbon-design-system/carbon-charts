import { getParameters } from 'codesandbox/lib/api/define'
import type { IFiles } from 'codesandbox-import-utils/lib/api/define'

import packageJSON from '../package.json'
const libraryVersion = packageJSON.version

const plexCSS = `@import "https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap";`

const D3VERSION = '^7.8.2'

export const createChartSandbox = (chartTemplate: any) => {
	const files: IFiles = {}

	Object.keys(chartTemplate).forEach(
		(filePath) => (files[filePath] = { content: chartTemplate[filePath], isBinary: false })
	)

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters({ files })}`
}

export const createVanillaChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t')
	const chartComponent = demo.chartType.vanilla

	const indexHtml = `<html>
	<head>
		<title>Parcel Sandbox</title>
		<meta charset="UTF-8" />
		<link
			rel="preconnect"
			crossorigin="anonymous"
			href="https://fonts.gstatic.com"
		/>

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

	const packageJson = {
		scripts: {
			start: 'parcel index.html --open',
			build: 'parcel build index.html'
		},
		dependencies: {
			'@carbon/charts': libraryVersion,
			'@carbon/styles': '^1.25.0',
			d3: D3VERSION
		},
		devDependencies: {
			'parcel-bundler': '^1.6.1'
		}
	}

	return {
		'index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson,
		'src/ibm-plex-font.css': plexCSS,
	}
}

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t')
	const chartComponent = demo.chartType.vanilla

	const indexHtml = `<div id="root"></div>`

	const indexJs = `
import React from 'react'
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

	const packageJson = {
		dependencies: {
			'@carbon/charts-react': libraryVersion,
			'@carbon/styles': '^1.25.0',
			d3: D3VERSION,
			react: '^18.2.0',
			'react-dom': '^18.2.0',
			'react-scripts': '^5.0.1'
		}
	}

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'src/ibm-plex-font.css': plexCSS,
		'package.json': packageJson
	}
}

export const createAngularChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t\t')
	const chartComponent = demo.chartType.angular

	const appComponentHtml = `<${chartComponent} [data]="data" [options]="options"></${chartComponent}>`
	const appComponentTs = `
import { Component } from '@angular/core'

import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
import './ibm-plex-font.css'

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	data = ${chartData};
	options = ${chartOptions};
}`

	const appModule = `
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartsModule } from '@carbon/charts-angular'
import { AppComponent } from './app.component'

@NgModule({
	imports: [BrowserModule, ChartsModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}`

	const packageJson = JSON.stringify({
		dependencies: {
			'@angular/animations': '^15.2.4',
			'@angular/common': '^15.2.4',
			'@angular/compiler': '^15.2.4',
			'@angular/core': '^15.2.4',
			'@angular/forms': '^15.2.4',
			'@angular/platform-browser': '^15.2.4',
			'@angular/platform-browser-dynamic': '^15.2.4',
			'@carbon/charts-angular': libraryVersion,
			'@carbon/styles': '^1.25.0',
			d3: D3VERSION,
			rxjs: '~7.8.0',
			tslib: '^2.5.0',
			'zone.js': '~0.13.0'
		}
	})

	return {
		'src/app/app.component.html': appComponentHtml,
		'src/app/app.component.ts': appComponentTs,
		'src/app/ibm-plex-font.css': plexCSS,
		'src/app/app.module.ts': appModule,
		'package.json': packageJson
	}
}

export const createVueChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t\t')
	const chartComponent = demo.chartType.vue

	const chartVue = `
<script>
	import Vue from 'vue'
	import chartsVue from '@carbon/charts-vue'

	export default {
		name: 'Chart',
		components: {},
		data() {
			return {
				data: ${chartData},
				options: ${chartOptions}
			}
		},
		template: "<${chartComponent} :data='data' :options='options'></${chartComponent}>"
	}
</script>`

	const appVue = `
<script setup>
	import Chart from './components/chart'
	export default {
		name: 'App',
		components: {
			Chart
		}
	}
</script>

<template>
	<div id="app">
		<Chart/>
	</div>
</template>`

	const mainJs = `
import { createApp } from 'vue'
import App from './App.vue'

import '@carbon/styles/css/styles.css'
import '@carbon/charts/styles.css'
import './ibm-plex-font.css'

createApp(App).mount('#app')`

	const packageJson = JSON.stringify({
		name: 'carbon-charts-vue-example',
		version: '0.0.0',
		private: true,
		scripts: {
			dev: 'vite dev --host',
			start: 'vite dev --host',
			build: 'vite build',
			preview: 'vite preview'
		},
		dependencies: {
			'@carbon/charts-vue': libraryVersion,
			'@carbon/styles': '^1.25.0',
			d3: D3VERSION,
			vue: '^3.2.47'
		},
		devDependencies: {
			'@vitejs/plugin-vue': '^4.1.0',
			vite: '^4.2.1'
		}
	})

	const viteConfig = `
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})`

	const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`

	return {
		'src/components/chart.vue': chartVue,
		'src/ibm-plex-font.css': plexCSS,
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'index.html': htmlTemplate,
		'package.json': packageJson,
		'vite.config.js': viteConfig
	}
}

export const createSvelteChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t')
	const chartOptions = JSON.stringify(demo.options, null, '\t')

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

	const indexHtml = `
<!DOCTYPE html>
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

	const App = `
<script>
	import { ${chartComponent} } from "@carbon/charts-svelte"
	import '@carbon/styles/css/styles.css'
	import '@carbon/charts/styles.css'
	import './ibm-plex-font.css'
</script>

<${chartComponent} data={${chartData}} options={${chartOptions}} />`

	const packageJson = {
		name: 'carbon-charts-svelte-example',
		version: '0.0.0',
		private: true,
		scripts: {
			dev: 'vite dev --host',
			start: 'vite dev --host',
			build: 'vite build',
			preview: 'vite preview'
		},
		devDependencies: {
			'@carbon/charts-svelte': libraryVersion,
			'@carbon/styles': '^1.25.0',
			'@sveltejs/adapter-auto': '^2.0.0',
			'@sveltejs/kit': '^1.13.0',
			d3: D3VERSION,
			svelte: '^3.57.0',
			tslib: '^2.5.0',
			typescript: '^5.0.2',
			vite: '^4.2.1'
		}
	}

	const viteConfig = `
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()]
})`

	const svelteKitConfig = `
import adapter from '@sveltejs/adapter-auto'
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

	const tsConfig = `
{
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
		'App.svelte': App,
		'index.html': indexHtml,
		'package.json': packageJson,
		'ibm-plex-font.css': plexCSS,
		'vite.config.ts': viteConfig,
		'svelte.config.js': svelteKitConfig,
		'tsconfig.json': tsConfig
	}
}
