import { mergeConfig, type InlineConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.tsx', '../src/stories/**/*.mdx'],
	staticDirs: ['../../core/.storybook/assets'],

	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],

	// core: {
  //   builder: '@storybook/builder-vite'
  // },

	framework: {
		name: '@storybook/react-vite',
		options: {}
	},

	docs: {
		autodocs: 'tag'
	},

	// typescript: {
	// 	reactDocgen: 'react-docgen'
	// },

	async viteFinal(config: InlineConfig) {
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')
		const newConfig: InlineConfig = mergeConfig(config, {
			build: {
				chunkSizeWarningLimit: 1800,
				emptyOutDir: true,
				// rollupOptions: {
					// treeshake: false,
					// Avoid error Failed to load url /sb-preview/runtime.js (resolved id: /sb-preview/runtime.js). Does the file exist?
          // external: [
					// 	/\/sb-preview\/runtime.js$/ // does not prevent error
          // ]
        // }
			},
			optimizeDeps: {
				include: [ // prevents "Can't find variable: dc" only when running locally
					'@carbon/charts',
					'@storybook/react',
					'@storybook/addon-essentials/docs/mdx-react-shim'
				]
			}
		})
		// console.log('Vite Config', newConfig)
		return newConfig
	},

	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
