import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		outDir: 'dist',
		sourcemap: true,
		lib: {
			entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
			name: 'CarbonCharts',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			// Reduces bundle size for ESM by 117K
			external: [
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
					'd3-scale': 'd3Scale',
					'd3-selection': 'd3Selection',
					'd3-transition': 'd3Transition',
					'd3-shape': 'd3Shape',
					'd3-color': 'd3Color',
					'd3-interpolate': 'd3Interpolate',
					'd3-axis': 'd3Axis',
					'd3-array': 'd3Array',
					'd3-hierarchy': 'd3Hierarchy',
					'd3-time-format': 'd3TimeFormat'
				},
				exports: 'named'
			}
		}
	},
	plugins: [dts()]
})
