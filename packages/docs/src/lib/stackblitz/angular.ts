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
		'@angular/common': '^18.0.0',
		'@angular/compiler': '^18.0.0',
		'@angular/core': '^18.0.0',
		'@angular/platform-browser': '^18.0.0',
		'@carbon/charts-angular': version.carbonCharts,
		tslib: '^2.5.0',
		'zone.js': '~0.14.0'
	}

	const devDependencies = {
		'@angular-devkit/build-angular': '^18.0.0',
		'@angular/cli': '^18.0.1',
		'@angular/compiler-cli': '^18.0.0',
		'@types/d3': '^7.4.3',
		'@types/d3-cloud': '^1.2.9',
		'@types/d3-sankey': '^0.12.4',
		'@types/topojson-client': '^3.1.0',
		typescript: '~5.4.0'
	}

	const indexHtml = `<html>
<head>
  <title>Carbon Charts Angular Example</title>
  <meta charset="UTF-8" />
	<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
  <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans-condensed.css" />
  <style>
	  .p-1 {
		  padding: 2rem;
	  }
  </style>
</head>
<body>
  <div class="p-1">
    <app-root></app-root>
	</div>
</body>
</html>`

	const mainTs = `import { Component } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import 'zone.js'
import { ChartsModule } from '@carbon/charts-angular'
import options from './options'
import data from './data'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartsModule],
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
            "tsConfig": "tsconfig.app.json"
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
		private: true,
		description: 'Carbon Charts Angular Example',
		version: '0.0.0',
		scripts: {
			ng: 'ng',
			start: 'ng serve',
			build: 'ng build'
		},
		dependencies,
		devDependencies
	}

	const tsConfigAppJson = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}`

	const tsConfigJson = `{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
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
		template: 'node' as ProjectTemplate,
		title: 'Carbon Charts Angular Example',
		files: {
			'src/data.ts': objectToString(data),
			'src/index.html': indexHtml,
			'src/main.ts': mainTs,
			'src/options.ts': objectToString(options),
			'src/styles.css': stylesCss,
			'angular.json': angularJson,
			'package.json': JSON.stringify(packageJson, null, 2),
			'tsconfig.json': tsConfigJson,
			'tsconfig.app.json': tsConfigAppJson
		}
	}
}
