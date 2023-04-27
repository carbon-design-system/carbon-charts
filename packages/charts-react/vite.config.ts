import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
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
	},
	plugins: [
		react(),
		dts({
			beforeWriteFile: (filePath: string, content: string) => {
				filePath = filePath.replace('/dist/packages/charts-react/src/','/dist/')
				return { filePath, content }
			}
		})
	]
})
