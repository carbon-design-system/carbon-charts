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
			external: ['d3', 'd3-cloud', 'd3-sankey'], // latter two not included in d3
			output: {
				entryFileNames: '[name].mjs',
				chunkFileNames: '[name]-[hash].mjs'
			}
		}
	},
	optimizeDeps: {
		exclude: [
			'@ibm/telemetry-js' // prevent Storybook issue
		]
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: [
		// Equivalent to: npx tsc --declaration --emitDeclarationOnly --rootDir src
		// However, tsc does not resolve the alias '@/' so use vite-plugin-dts.
		dts({
			entryRoot: 'src',
			logLevel: 'silent' // Suppress package.json errors as they don't need d.ts files
		}) as unknown as PluginOption
	]
})
