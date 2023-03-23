import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../charts/stories/tutorials/!(0-api)*.stories.mdx',
		'../../charts/stories/getting-started/vue.stories.mdx'
	],
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
				outline: false
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
	staticDirs: ['./assets'],
	features: {
		storyStoreV7: false
	}
}
export default config
