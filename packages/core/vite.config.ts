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
			external: [ 'd3', 'd3-cloud', 'd3-sankey'] // Note d3-cloud and d3-sankey are not included in d3!
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
			'@carbon/telemetry'
		]
	},
	plugins: [
		dts({
			exclude: './package.json'
		})
		// equivalent to: npx tsc src/*.ts --declaration --emitDeclarationOnly --declarationDir dist/ --resolveJsonModule --esModuleInterop
	]
})
