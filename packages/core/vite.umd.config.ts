import { fileURLToPath } from 'url'
import { defineConfig, type Plugin } from 'vite'
import replace from '@rollup/plugin-replace'

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'bundle.umd.js'
			},
			plugins: [
				replace({
					'process.env.NODE_ENV': JSON.stringify('production')
				}) as Plugin
			]
		},
		outDir: 'dist/umd',
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.umd.ts',
			formats: ['umd'],
			fileName: 'bundle',
			name: 'Charts'
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: []
})
