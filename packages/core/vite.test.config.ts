import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
	build: {
		outDir: '../../pages/test/vanilla-js',
		rollupOptions: {
			input: './index.html'
		}
	},
  resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
