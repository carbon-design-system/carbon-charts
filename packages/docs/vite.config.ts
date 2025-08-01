import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true, // suppress deprecations from node_modules
				logger: {
					warn(text) {
						const suppressed = ['import', 'mixed-decls', 'global-builtin', 'color-functions']
						if (suppressed.some(keyword => text.includes(keyword))) {
							return // silence this warning
						}
						console.warn('[sass]', text) // show others
					},
					debug() {} // suppress debug messages
				}
			}
		}
	}
})
