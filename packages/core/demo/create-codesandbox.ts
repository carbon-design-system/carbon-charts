import { getParameters } from 'codesandbox/lib/api/define';

const packageJSON = require('@carbon/charts/package.json');
const libraryVersion = packageJSON.version;

const carbonStylesImport = `import "@carbon/styles/css/styles.css";`;

const plexCSS = `@import "https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed|IBM+Plex+Sans:400,600&display=swap";
`;

const D3VERSION = '^7.0.0';

export const createChartSandbox = (chartTemplate: any) => {
	const files = {};

	Object.keys(chartTemplate).forEach(
		(filePath) => (files[filePath] = { content: chartTemplate[filePath] })
	);

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters(
		{ files }
	)}`;
};

export const createVanillaChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t');

	const isGeoDemo = demo.options.geoData;

	const _demoOptions = { ...demo.options };
	if (isGeoDemo) {
		delete _demoOptions.geoData;
	}
	const chartOptions = JSON.stringify(
		_demoOptions,
		null,
		isGeoDemo ? '\t\t\t' : '\t'
	);
	const chartComponent = demo.chartType.vanilla;

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
</html>`;

	const indexJs = `${carbonStylesImport}

import "@carbon/charts/styles.css";
import { ${chartComponent} } from "@carbon/charts";

${isGeoDemo ? 'import * as d3 from "d3";' : ''}

const data = ${chartData};

${
	isGeoDemo
		? `
/* this data is only used for demo purposes, and is not an accurate representation of the world map */
d3.json(
  "https://raw.githubusercontent.com/Akshat55/carbon-charts/c565fc9ed1364465b641e7e3f2149f0631f0fd0b/packages/core/demo/data/topojson-110-data.json",
  function (error, topoData) {
		if (error) throw error;

		const options = {
			"geoData": topoData,${chartOptions.slice(1, -1)}};

		// Grab chart holder HTML element and initialize the chart
		const chartHolder = document.getElementById("app");
		new ${chartComponent}(chartHolder, {
			data,
			options
		});
  }
);
`
		: `
const options = ${chartOptions};

// Grab chart holder HTML element and initialize the chart
const chartHolder = document.getElementById("app");
new ${chartComponent}(chartHolder, {
	data,
	options
});`
}

`;

	const packageJson = {
		scripts: {
			start: 'parcel index.html --open',
			build: 'parcel build index.html',
		},
		dependencies: {
			'@carbon/charts': libraryVersion,
			d3: D3VERSION,
		},
		devDependencies: {
			'parcel-bundler': '^1.6.1',
		},
	};

	return {
		'index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson,
	};
};

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t');
	const chartOptions = JSON.stringify(demo.options, null, '\t');
	const chartComponent = demo.chartType.vanilla;

	const indexHtml = `<div id="root"></div>
  `;

	const indexJs = `import React from "react";
import ReactDOM from "react-dom";

${carbonStylesImport}

import "@carbon/charts/styles.css";
import { ${chartComponent} } from "@carbon/charts-react";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
import "./ibm-plex-font.css";

class App extends React.Component {
	state = {
		data: ${chartData},
		options: ${chartOptions}
	};

	render = () => (
		<${chartComponent}
			data={this.state.data}
			options={this.state.options}>
		</${chartComponent}>
	);
}
ReactDOM.render(<App />, document.getElementById("root"));
  `;
	const packageJson = {
		dependencies: {
			'@carbon/charts': libraryVersion,
			'@carbon/charts-react': libraryVersion,
			d3: D3VERSION,
			react: '16.12.0',
			'react-dom': '16.12.0',
			'react-scripts': '3.0.1',
		},
	};

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'src/ibm-plex-font.css': plexCSS,
		'package.json': packageJson,
	};
};

export const createAngularChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t\t');
	const chartOptions = JSON.stringify(demo.options, null, '\t\t');
	const chartComponent = demo.chartType.angular;

	const appComponentHtml = `<${chartComponent} [data]="data" [options]="options"></${chartComponent}>`;
	const appComponentTs = `import { Component } from "@angular/core";

${carbonStylesImport}

import "@carbon/charts/styles.css";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
import "./ibm-plex-font.css";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	data = ${chartData};
	options = ${chartOptions};
}`;

	const appModule = `import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ChartsModule } from "@carbon/charts-angular";
import { AppComponent } from "./app.component";
@NgModule({
	imports: [BrowserModule, ChartsModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}`;

	const packageJson = JSON.stringify(
		{
			dependencies: {
				'@angular/animations': '8.2.14',
				'@angular/common': '8.2.14',
				'@angular/compiler': '8.2.14',
				'@angular/core': '8.2.14',
				'@angular/forms': '8.2.14',
				'@angular/platform-browser': '8.2.14',
				'@angular/platform-browser-dynamic': '8.2.14',
				'@angular/router': '8.2.14',
				'@carbon/charts': libraryVersion,
				'@carbon/charts-angular': libraryVersion,
				'core-js': '3.6.0',
				d3: D3VERSION,
				rxjs: '6.5.3',
				'zone.js': '0.10.2',
			},
		},
		null,
		'\t'
	);

	return {
		'src/app/app.component.html': appComponentHtml,
		'src/app/app.component.ts': appComponentTs,
		'src/app/ibm-plex-font.css': plexCSS,
		'src/app/app.module.ts': appModule,
		'package.json': packageJson,
	};
};

export const createVueChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t\t');
	const chartOptions = JSON.stringify(demo.options, null, '\t\t');
	const chartComponent = demo.chartType.vue;

	const chartVue = `<script>
import Vue from "vue";

${carbonStylesImport}

import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
import "../ibm-plex-font.css";

Vue.use(chartsVue);

export default {
	name: "Chart",
	components: {},
	data() {
		return {
			data: ${chartData},
			options: ${chartOptions}
		};
	},
	template: "<${chartComponent} :data='data' :options='options'></${chartComponent}>"
};
</script>
  `;

	const appVue = `<template>
	<div id="app">
		<Chart/>
	</div>
</template>
<script>
import Chart from "./components/chart";
export default {
	name: "App",
	components: {
		Chart
	}
};
</script>
  `;

	const mainJs = `import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
	render: h => h(App)
}).$mount("#app");
`;

	const packageJson = JSON.stringify(
		{
			dependencies: {
				'@carbon/charts': libraryVersion,
				'@carbon/charts-vue': libraryVersion,
				'@vue/cli-plugin-babel': '4.1.1',
				d3: D3VERSION,
				vue: '^2.6.11',
			},
		},
		null,
		'\t\t'
	);

	return {
		'src/components/chart.vue': chartVue,
		'src/ibm-plex-font.css': plexCSS,
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'package.json': packageJson,
	};
};

export const createSvelteChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, '\t');
	const chartOptions = JSON.stringify(demo.options, null, '\t');

	let chartComponent = demo.chartType.vanilla;

	switch (chartComponent) {
		case 'SimpleBarChart':
			chartComponent = 'BarChartSimple';
			break;
		case 'GroupedBarChart':
			chartComponent = 'BarChartGrouped';
			break;
		case 'StackedBarChart':
			chartComponent = 'BarChartStacked';
			break;
	}

	const indexHtml = `<!DOCTYPE html>
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
</html>
`;

	const App = `<script>
	import { ${chartComponent} } from "@carbon/charts-svelte";

	${carbonStylesImport}
	import "@carbon/charts/styles.css";
</script>

<${chartComponent}
	data={${chartData}}
	options={${chartOptions}}
	/>
`;

	const packageJson = {
		scripts: {
			dev: 'vite --port 3000',
			build: 'vite build',
		},
		devDependencies: {
			'@carbon/charts-svelte': libraryVersion,
			'@sveltejs/vite-plugin-svelte': '^1.0.1',
			d3: D3VERSION,
			svelte: '^3.49.0',
			vite: '^3.0.4',
		},
	};

	const vite = `import { svelte } from "@sveltejs/vite-plugin-svelte";

/** @type {import('vite').UserConfig} */
export default {
	plugins: [svelte()],
	optimizeDeps: { include: ["@carbon/charts"] }
};	
`;

	return {
		'App.svelte': App,
		'index.html': indexHtml,
		'package.json': packageJson,
		'vite.config.js': vite,
	};
};
