import type { StorybookConfig } from '@storybook/vue3-vite'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../charts/src/stories/getting-started/vue.stories.mdx',
		'../../charts/src/stories/tutorials/*.stories.mdx'
	],
	staticDirs: ['../../charts/.storybook/assets'],
	viteFinal: (config) => {
		// Solves issue related to loading stories from core
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
			}
		}
		if (config.build) {
      config.build.chunkSizeWarningLimit = 1900
		}
		// Disable declaration generation for Storybook
		config.plugins = config.plugins!.filter(plugin => plugin!.name !=='vite:dts')
		return config
	},
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
