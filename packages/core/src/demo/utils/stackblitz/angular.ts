import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'
import { objectToString } from './object-to-string'
import { version } from '../package-versions'

export function buildAngularExample(demo: Demo): Project {
	const dependencies: Record<string, string> = {
		'@angular/animations': version.angular,
		'@angular/common': version.angular,
		'@angular/compiler': version.angular,
		'@angular/core': version.angular,
		'@angular/forms': version.angular,
		'@angular/platform-browser': version.angular,
		'@angular/router': version.angular,
		'@carbon/charts': version.carbonCharts,
		'@carbon/charts-angular': version.carbonCharts,
		d3: version.d3,
		'd3-cloud': version.d3Cloud,
		'd3-sankey': version.d3Sankey,
		rxjs: version.rxjs,
		tslib: version.tslib,
		'zone.js': version.zoneJs
	}

	const devDependencies: Record<string, string> = {
		'@angular-devkit/build-angular': '~0.1100.4',
		'@angular/cli': '~11.0.4',
		'@angular/compiler-cli': '~11.0.4',
		'@types/jasmine': '~3.6.0',
		'@types/node': '^12.11.1',
		codelyzer: '^6.0.0',
		'jasmine-core': '~3.6.0',
		'jasmine-spec-reporter': '~5.0.0',
		karma: '~5.1.0',
		'karma-chrome-launcher': '~3.1.0',
		'karma-coverage': '~2.0.3',
		'karma-jasmine': '~4.0.0',
		'karma-jasmine-html-reporter': '^1.5.0',
		protractor: '~7.0.0',
		'ts-node': '~8.3.0',
		tslint: '~6.1.0',
		typescript: '~4.0.2'
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

	const stylesCss = `@import '@carbon/charts/styles.css';
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
		dependencies,
		devDependencies
	}

	const TsConfigJson = `{
    "compileOnSave": false,
    "compilerOptions": {
      "outDir": "./dist/out-tsc",
      "forceConsistentCasingInFileNames": true,
      "strict": false,
      "noImplicitOverride": true,
      "noPropertyAccessFromIndexSignature": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "esModuleInterop": true,
      "sourceMap": true,
      "declaration": false,
      "downlevelIteration": true,
      "experimentalDecorators": true,
      "moduleResolution": "node",
      "importHelpers": true,
      "target": "ES2015",
      "module": "ES2022",
      "useDefineForClassFields": false,
      "lib": ["ES2022", "dom"]
    },
    "angularCompilerOptions": {
      "enableI18nLegacyMessageIdFormat": false,
      "strictInjectionParameters": true,
      "strictInputAccessModifiers": true,
      "strictTemplates": true
    }
  }`

	return {
		template: 'angular-cli' as ProjectTemplate,
		title: 'Carbon Charts Angular Example',
		dependencies,
		files: {
			'src/data.ts': objectToString(demo.data),
			'src/index.html': indexHtml,
			'src/main.ts': mainTs,
			'src/options.ts': objectToString(demo.options),
			'src/styles.css': stylesCss,
			'angular.json': angularJson,
			'package.json': JSON.stringify(packageJson, null, 2),
			'tsconfig.json': TsConfigJson
		}
	}
}
