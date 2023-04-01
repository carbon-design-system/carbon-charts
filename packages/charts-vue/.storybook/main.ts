import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
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
	staticDirs: ['../../charts/.storybook/assets'],
	features: {
		storyStoreV7: false
	}
}
export default config
