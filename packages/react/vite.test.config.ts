import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: '../../pages/test/react',
		rollupOptions: {
			input: './index.html'
		}
	}
})
