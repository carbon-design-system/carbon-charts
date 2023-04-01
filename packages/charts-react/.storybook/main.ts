import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../charts/stories/getting-started/react.stories.mdx',
		'../../charts/stories/tutorials/*.stories.mdx'
	],
	viteFinal: (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
			}
		}
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
		name: '@storybook/react-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	staticDirs: ['../../charts/.storybook/assets'],
	features: {
		storyStoreV7: false
	}
}
export default config
