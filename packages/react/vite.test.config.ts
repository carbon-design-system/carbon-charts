import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: '../../pages/react',
		rollupOptions: {
			input: './index.html'
		}
	}
})
