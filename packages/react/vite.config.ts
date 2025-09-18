import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			name: 'ChartsReact',
			fileName: format => `index.${format === 'es' ? 'm' : 'umd.c'}js`
		},
		rollupOptions: {
			external: ['react', 'react-dom' /*, 'react-dom/client', 'react/jsx-runtime'*/],
			output: {
				globals: {
					react: 'React'
				},
				exports: 'named'
			}
		}
	},
	plugins: [
		react(),
		dts({
			entryRoot: 'src',
			logLevel: 'silent' // Suppress package.json errors as they don't need d.ts files
		})
	]
})
