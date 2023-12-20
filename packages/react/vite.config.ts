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
			fileName: 'index.mjs'
		},
		rollupOptions: {
			external: ['react', 'react-dom']
		}
	},
	plugins: [react(), dts()]
})
