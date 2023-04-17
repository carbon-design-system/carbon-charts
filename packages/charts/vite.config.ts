import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		outDir: 'dist',
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
			name: 'CarbonCharts',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
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
