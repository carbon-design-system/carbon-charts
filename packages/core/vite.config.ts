/// <reference types="vitest" />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	test: {
		environment: 'jsdom'
	},
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: {
				index: 'src/index.ts',
				'components/index': 'src/components/index.ts',
				'interfaces/index': 'src/interfaces/index.ts',
				'model/index': 'src/model/index.ts',
				'services/index': 'src/services/index.ts',
				'demo/index': 'src/demo/index.ts'
			},
			name: 'CarbonCharts'
		},
		rollupOptions: {
			external: [
				// externalizing D3 saves 117K in the bundle
				'd3-scale',
				'd3-selection',
				'd3-transition',
				'd3-shape',
				'd3-color',
				'd3-interpolate',
				'd3-axis',
				'd3-array',
				'd3-hierarchy',
				'd3-time-format'
			],
			output: {
				globals: {
					'd3-scale': 'd3',
					'd3-selection': 'd3',
					'd3-transition': 'd3',
					'd3-shape': 'd3',
					'd3-color': 'd3',
					'd3-interpolate': 'd3',
					'd3-axis': 'd3',
					'd3-array': 'd3',
					'd3-hierarchy': 'd3',
					'd3-time-format': 'd3'
				},
				exports: 'named'
			}
		}
	},
	optimizeDeps: {
		include: [
			'@carbon/colors',
			'@carbon/layout',
			'@carbon/themes',
			'@carbon/utils-position',
			'carbon-components',
			'date-fns',
			'dom-to-image-more',
			'lodash-es'
		],
		exclude: [
			// Storybook will not run if these are in the include list
			'@carbon/import-once',
			'@carbon/styles',
			'@carbon/telemetry',
		]
	},
	plugins: [
		dts({
			exclude: './package.json'
		})
		// equivalent to: npx tsc src/*.ts --declaration --emitDeclarationOnly --declarationDir dist/ --resolveJsonModule --esModuleInterop
	]
})
