import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
    sourcemap: true,
    chunkSizeWarningLimit: 600,
		lib: {
			entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
			name: 'ChartsReact',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React'
				},
				exports: 'named'
			}
		}
	}
})
