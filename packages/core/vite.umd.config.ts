import { fileURLToPath } from 'url'
import { defineConfig, type PluginOption } from 'vite'
import replace from '@rollup/plugin-replace'

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'bundle.umd.js'
			},
			plugins: [
				replace({
					'process.env.NODE_ENV': JSON.stringify('production'),
					preventAssignment: false
				}) as PluginOption
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
