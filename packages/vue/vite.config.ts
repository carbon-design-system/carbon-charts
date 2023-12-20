import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'index.mjs'
		},
		rollupOptions: {
			external: ['vue']
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},
	plugins: [
		vue(),
		dts({ // generate type declaration files in dist, not dist/src
			cleanVueFileName: true,
			beforeWriteFile: (filePath: string, content: string) => {
				filePath = filePath.replace('/dist/packages/vue/src/','/dist/')
				return { filePath, content }
			}
		})
	]
})
