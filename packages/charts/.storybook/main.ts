import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false,
				backgrounds: false,
				controls: true,
				docs: true,
				viewport: false,
				toolbars: true,
				measure: false,
				outline: false,
				highlight: true
			}
		}
	],
	framework: {
		name: '@storybook/html-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	staticDirs: ['assets'],
	async viteFinal(config, options) {
		return config
	},
	features: {
		storyStoreV7: false
	}
}
export default config
