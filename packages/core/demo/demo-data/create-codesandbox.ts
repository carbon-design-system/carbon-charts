import { getParameters } from "codesandbox/lib/api/define";

import { version as libraryVersion } from "@carbon/charts/package.json";

export const createChartSandbox = (chartTemplate: any) => {
	const files = {};

	Object.keys(chartTemplate)
		.forEach(filePath => files[filePath] = { content: chartTemplate[filePath] });

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${getParameters({ files })}`;
};

export const createReactChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, "\t");
	const chartOptions = JSON.stringify(demo.options, null, "\t");
	const chartComponent = demo.chartType.vanilla;

	const indexHtml = `<div id="root"></div>
  `;
	const indexJs =
		`import React from "react";
import ReactDOM from "react-dom";
import { ${chartComponent} } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
// Or
// import "@carbon/charts/styles/styles.scss";

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
			"@carbon/charts": libraryVersion,
			"@carbon/charts-react": libraryVersion,
			d3: "5.12.0",
			react: "16.12.0",
			"react-dom": "16.12.0",
			"react-scripts": "3.0.1"
		}
	};

	return {
		"src/index.html": indexHtml,
		"src/index.js": indexJs,
		"package.json": packageJson
	};
};

export const createAngularChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, "\t\t");
	const chartOptions = JSON.stringify(demo.options, null, "\t\t");
	const chartComponent = demo.chartType.angular;

	const appComponentHtml = `<${chartComponent} [data]="data" [options]="options"></${chartComponent}>`;
	const appComponentTs =
		`import { Component } from "@angular/core";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	data = ${chartData};
	options = ${chartOptions};
}`;

	const appModule =
		`import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ChartsModule } from "@carbon/charts-angular";
import { AppComponent } from "./app.component";
@NgModule({
	imports: [BrowserModule, ChartsModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}`;

	const indexHtml =
		`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Angular</title>
	</head>
	<body>
		<app-root></app-root>
	</body>
</html>`;

	const mainTs =
		`import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.log(err));
`;

	const angularCliJson =
		`{
	"apps": [
		{
			"root": "src",
			"outDir": "dist",
			"assets": ["assets", "favicon.ico"],
			"index": "index.html",
			"main": "main.ts",
			"polyfills": "polyfills.ts",
			"prefix": "app",
			"styles": ["styles.css"],
			"scripts": [],
			"environmentSource": "environments/environment.ts",
			"environments": {
				"dev": "environments/environment.ts",
				"prod": "environments/environment.prod.ts"
			}
		}
	]
}`;

	const packageJson = JSON.stringify({
		dependencies: {
			"@angular/animations": "8.2.14",
			"@angular/common": "8.2.14",
			"@angular/compiler": "8.2.14",
			"@angular/core": "8.2.14",
			"@angular/forms": "8.2.14",
			"@angular/platform-browser": "8.2.14",
			"@angular/platform-browser-dynamic": "8.2.14",
			"@angular/router": "8.2.14",
			"@carbon/charts": libraryVersion,
			"@carbon/charts-angular": libraryVersion,
			"core-js": "3.6.0",
			d3: "5.15.0",
			rxjs: "6.5.3",
			"zone.js": "0.10.2"
		}
	}, null, "\t");

	return {
		"src/index.html": indexHtml,
		"src/main.ts": mainTs,
		"src/app/app.component.html": appComponentHtml,
		"src/app/app.component.ts": appComponentTs,
		"src/app/app.module.ts": appModule,
		".angular-cli.json": angularCliJson,
		"package.json": packageJson
	};
};

export const createVueChartApp = (demo: any) => {
	const chartData = JSON.stringify(demo.data, null, "\t\t");
	const chartOptions = JSON.stringify(demo.options, null, "\t\t");
	const chartComponent = demo.chartType.vue;

	const chartVue =
`<script>
import Vue from "vue";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
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
	template: "<${chartComponent} :data="data" :options="options"></${chartComponent}>"
};
</script>
  `;

	const appVue =
`<template>
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

	const mainJs =
`import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
	render: h => h(App)
}).$mount("#app");
`;

	const packageJson = JSON.stringify({
		dependencies: {
			"@carbon/charts": libraryVersion,
			"@carbon/charts-vue": libraryVersion,
			"@vue/cli-plugin-babel": "4.1.1",
			d3: "5.15.0",
			vue: "^2.6.11"
		}
	}, null, "\t\t");

	return {
		"src/components/chart.vue": chartVue,
		"src/App.vue": appVue,
		"src/main.js": mainJs,
		"package.json": packageJson
	};
};
