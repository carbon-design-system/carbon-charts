import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			formats: ['es']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				entryFileNames: '[name].mjs'
			}
		}
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},
	plugins: [
		vue(),
		dts({
			cleanVueFileName: true,
			entryRoot: 'src',
			logLevel: 'silent' // Suppress package.json errors as they don't need d.ts files
		})
	]
})
