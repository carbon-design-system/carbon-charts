import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		outDir: '../../pages',
		sourcemap: true
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},
	plugins: [vue()]
})
