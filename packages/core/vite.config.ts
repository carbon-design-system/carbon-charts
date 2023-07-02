/// <reference types="vitest" />
import { fileURLToPath } from 'url'
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
			external: ['d3', 'd3-cloud', 'd3-sankey'] // d3-cloud and d3-sankey are not included in d3
		}
	},
	optimizeDeps: {
		include: [
			'@carbon/colors',
			'@carbon/utils-position',
			'carbon-components',
			'date-fns', // make peerDependency and externalize in next major
			'dom-to-image-more',
			'lodash-es' // make peerDependency and externalize in next major (or replace with modern TypeScript alternatives)
		],
		exclude: [
			'@carbon/telemetry' // prevent Storybook issue
		]
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: [
		// equivalent to: npx tsc src/*.ts --declaration --emitDeclarationOnly --declarationDir dist/ --resolveJsonModule --esModuleInterop
		dts({
			logLevel: 'silent'
		})
	]
})
