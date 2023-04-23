/// <reference types="vitest" />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	test: {
		environment: 'jsdom'
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: {
				index: 'src/index.ts',
				'components/index': 'src/components/index.ts',
				'interfaces/index': 'src/interfaces/index.ts',
				'model/index': 'src/model/index.ts',
				'services/index': 'src/services/index.ts'
			},
			name: 'CarbonCharts',
			formats: ['es', 'cjs'],
			// fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			external: [ // externalizing D3 saves 117K in the bundle
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
				name: 'CarbonCharts',
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
	plugins: [
		dts()
	]
})
