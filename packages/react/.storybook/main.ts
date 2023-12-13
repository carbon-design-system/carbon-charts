import { mergeConfig, type InlineConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.tsx', '../src/stories/**/*.mdx'],
	staticDirs: ['../../core/.storybook/assets'],

	addons: [
		"@storybook/addon-links",
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		},
    "@storybook/addon-interactions"
	],

	framework: {
		name: '@storybook/react-vite',
		options: {}
	},

	docs: {
		autodocs: 'tag'
	},

	typescript: {
		reactDocgen: 'react-docgen'
	},

	async viteFinal(config: InlineConfig) {
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')
		return mergeConfig(config, {
			build: {
				chunkSizeWarningLimit: 1800,
				rollupOptions: {
					treeshake: false,
					// Avoid error Failed to load url /sb-preview/runtime.js (resolved id: /sb-preview/runtime.js). Does the file exist?
          external: [
						/\/sb-preview\/runtime.js$/ // does not prevent error
          ]
        }
			},
			optimizeDeps: {
				include: [ // prevents "Can't find variable: dc" when running locally
					'@carbon/charts'
				]
			}
		})
	},

	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
