/// <reference types="vitest" />
import { fileURLToPath } from 'url'
import { defineConfig, type PluginOption } from 'vite'
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
			formats: ['es']
		},
		rollupOptions: {
			external: ['d3', 'd3-cloud', 'd3-sankey'], // d3-cloud and d3-sankey are not included in d3
			output: {
				exports: 'named'
			}
		}
	},
	optimizeDeps: {
		include: [
			'@carbon/colors',
			'@carbon/utils-position',
			'carbon-components',
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
	plugins: [
		// Equivalent to: npx tsc --declaration --emitDeclarationOnly --rootDir src
		// However, tsc does not translate '@/' correctly so we need to use vite-plugin-dts. TypeScript, on its own, only allows
		// type, not compilation, error suppression.
		dts({
			entryRoot: 'src',
			logLevel: 'silent' // Suppress the known errors because package.json files don't need d.ts files
		}) as unknown as PluginOption
	]
})
