import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist/demo',
		sourcemap: true,
		lib: {
			entry: fileURLToPath(new URL('demo/index.ts', import.meta.url)),
			name: 'ChartsDemoData',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			// Reduces bundle size
			external: [
				'@carbon/charts',
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
					'@carbon/charts': 'Charts',
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
	plugins: []
})
