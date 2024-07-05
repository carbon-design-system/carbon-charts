import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	build: {
		ssr: 'src/entry-server.tsx',
		emptyOutDir: true,
		outDir: '../../pages/server',
		rollupOptions: {
			input: 'src/main.tsx'
		}
	}
})
