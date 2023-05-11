import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
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
	optimizeDeps: {
		disabled: true,
		include: ['@carbon/charts', '@carbon/icons-react'],
		exclude: [
			// Will cause errors when running storybook if in the include list
			'@carbon/telemetry'
		]
	},
	resolve: {
		alias: {
			// '@storybook/react-dom-shim': '@storybook/react-dom-shim/dist/react-18'
		}
	},
	plugins: [react(), dts()]
})
