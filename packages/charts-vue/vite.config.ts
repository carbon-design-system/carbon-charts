import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	// vite does not use tsconfig.json
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		sourcemap: true,
		lib: {
			entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
			name: 'ChartsVue',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format === 'es' ? 'm' : ''}js`
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
			// tsconfig.json declarationDir is ignored for some reason
			beforeWriteFile: (filePath: string, content: string) => {
				filePath = filePath.replace('/dist/src/','/dist/') // cannot reassign and return constant
				return { filePath, content }
			}
		})
	]
})
