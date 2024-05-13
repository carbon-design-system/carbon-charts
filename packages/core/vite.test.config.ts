import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
	build: {
		outDir: '../../pages',
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
