import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist/umd',
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			formats: ['umd'],
			fileName: 'bundle',
			name: 'Charts'
		}
	},
	optimizeDeps: {
		include: [ // everything included in UMD bundle
			'@carbon/colors',
			'@carbon/utils-position',
			'carbon-components',
			'd3',
			'd3-cloud',
			'd3-sankey',
			'date-fns', // make peerDependency and externalize in next major
			'html-to-image',
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
	plugins: []
})
