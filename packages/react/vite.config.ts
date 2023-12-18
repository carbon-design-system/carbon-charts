import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				exports: 'named'
			}
		}
	},

	plugins: [react(), dts()]
})
