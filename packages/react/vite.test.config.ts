import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: '../../pages',
		rollupOptions: {
			input: './index.html'
		}
	}
})
