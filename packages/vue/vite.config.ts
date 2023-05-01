import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

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
	optimizeDeps: {
		include: ['@carbon/charts'],
		exclude: ['@carbon/telemetry']
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			vue: 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		vue2({
      jsx: true
    }),
		dts({ // generate type declaration files in dist, not dist/src
			cleanVueFileName: true,
			beforeWriteFile: (filePath: string, content: string) => {
				filePath = filePath.replace('/dist/packages/charts-vue/src/','/dist/')
				return { filePath, content }
			}
		})
	]
})
