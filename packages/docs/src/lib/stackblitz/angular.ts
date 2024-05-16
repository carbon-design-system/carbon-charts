import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { ChartOptions, ChartTabularData } from '@carbon/charts'
import { version } from './package-versions'
import { objectToString } from './object-to-string'

export function getAngularProject(
	chartType: string,
	data: ChartTabularData,
	options: ChartOptions
): Project {
	const dependencies: Record<string, string> = {
		'@carbon/charts-angular': version.carbonCharts,
		d3: version.d3,
		'd3-cloud': version.d3Cloud,
		'd3-sankey': version.d3Sankey
	}

	const indexHtml = `<html>
<head>
  <title>Carbon Charts Angular Example</title>
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

	const mainTs = `import 'zone.js'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { bootstrapApplication } from '@angular/platform-browser'
import { ChartsModule } from '@carbon/charts-angular'
import options from './options'
import data from './data'

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ChartsModule],
	template: '<${chartType} [data]="data" [options]="options"></${chartType}>'
})
export class App {
	options = options
	data = data
}

bootstrapApplication(App)
`

	const stylesCss = `@import '@carbon/charts-angular/styles.css';`

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

	const packageJson = {
		name: 'carbon-charts-angular-example',
		description: 'Carbon Charts Angular Example',
		version: '0.0.0',
		scripts: {
			ng: 'ng',
			start: 'ng serve',
			build: 'ng build'
		},
		dependencies
	}

	const TsConfigJson = `{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
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

	return {
		template: 'angular-cli' as ProjectTemplate,
		title: 'Carbon Charts Angular Example',
		dependencies,
		files: {
			'src/data.ts': objectToString(data),
			'src/index.html': indexHtml,
			'src/main.ts': mainTs,
			'src/options.ts': objectToString(options),
			'src/styles.css': stylesCss,
			'angular.json': angularJson,
			'package.json': JSON.stringify(packageJson, null, 2),
			'tsconfig.json': TsConfigJson
		}
	}
}
