import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
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
