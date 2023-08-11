import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import replace from '@rollup/plugin-replace'

export default defineConfig({
	build: {
		rollupOptions: {
			external: ['warning'],
			output: {
        globals: {
          'warning': 'Warning' // assuming 'warning' exposes a global `Warning` when used outside a module system
        }
      },
			plugins: [
				replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
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
