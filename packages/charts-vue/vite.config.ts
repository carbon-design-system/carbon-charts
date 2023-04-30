import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		sourcemap: true,
		chunkSizeWarningLimit: 600,
		lib: {
			entry: 'src/index.ts',
			name: 'ChartsVue',
			formats: ['es', 'umd'],
			fileName: format => `index.${format === 'es' ? 'm' : ''}js`
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				},
				exports: 'named'
			}
		}
	},
	plugins: [
		vue(),
		dts({ // generate type declaration files in dist, not dist/src
			cleanVueFileName: true,
			beforeWriteFile: (filePath: string, content: string) => {
				filePath = filePath.replace('/dist/packages/charts-vue/src/','/dist/')
				return { filePath, content }
			}
		})
	]
})
