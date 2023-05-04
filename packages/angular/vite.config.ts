import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			formats: ['es']
		},
		rollupOptions: {
			external: ['@angular/common', '@angular/core']
		}
	},
	optimizeDeps: {
		include: ['@carbon/charts'],
		exclude: ['@carbon/telemetry']
	},
	plugins: [dts()]
})
