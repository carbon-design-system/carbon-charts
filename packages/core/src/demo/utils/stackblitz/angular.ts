import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'
import { objectToString } from './object-to-string'
import { version } from '../package-versions'

export function buildAngularExample(demo: Demo): Project {
	const dependencies: Record<string, string> = {
		'@carbon/charts-angular': version.carbonCharts,
		d3: version.d3,
		'd3-cloud': version.d3Cloud,
		'd3-sankey': version.d3Sankey
	}

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

	const mainTs = `import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { bootstrapApplication } from '@angular/platform-browser'
import { ChartsModule } from '@carbon/charts-angular'
import options from './options'
import data from './data'
import 'zone.js'

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ChartsModule],
	template: '<${demo.chartType.angular} [data]="data" [options]="options"></${demo.chartType.angular}>'
})
export class App {
	options = options
	data = data
}

bootstrapApplication(App)
`

	const angularJson = `{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "cli": {
      "analytics": false
    },
    "newProjectRoot": "projects",
    "projects": {
      "demo": {
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-angular:application",
            "configurations": {
              "development": {
                "extractLicenses": false,
                "namedChunks": true,
                "optimization": false,
                "sourceMap": true
              },
              "production": {
                "aot": true,
                "extractLicenses": true,
                "namedChunks": false,
                "optimization": true,
                "outputHashing": "all",
                "sourceMap": false
              }
            },
            "options": {
              "assets": [],
              "index": "src/index.html",
              "browser": "src/main.ts",
              "outputPath": "dist/demo",
              "scripts": [],
              "styles": ["src/styles.css"],
              "tsConfig": "src/tsconfig.app.json"
            }
          },
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "development": {
                "buildTarget": "demo:build:development"
              },
              "production": {
                "buildTarget": "demo:build:production"
              }
            },
            "defaultConfiguration": "development"
          }
        },
        "prefix": "app",
        "projectType": "application",
        "root": "",
        "schematics": {},
        "sourceRoot": "src"
      }
    },
    "version": 1
  }`

	const packageJson = {
		name: 'carbon-charts-angular-example',
		description: 'Carbon Charts Angular Example',
		version: '0.0.0',
    private: true,
		scripts: {
			ng: 'ng',
			start: 'ng serve',
			build: 'ng build',
			test: 'ng test',
			lint: 'ng lint',
			e2e: 'ng e2e'
		},
		dependencies
	}

	return {
		template: 'angular-cli' as ProjectTemplate,
		title: 'Carbon Charts Angular Example',
		dependencies,
		files: {
			'src/data.ts': objectToString(demo.data),
			'src/index.html': indexHtml,
			'src/main.ts': mainTs,
			'src/options.ts': objectToString(demo.options),
			'src/styles.css': `@import '@carbon/charts-angular/styles.min.css';`,
			'angular.json': angularJson,
			'package.json': JSON.stringify(packageJson, null, 2)
		}
	}
}
