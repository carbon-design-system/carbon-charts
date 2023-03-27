import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../charts/stories/tutorials/!(0-api)*.stories.mdx',
		'../../charts/stories/getting-started/react.stories.mdx'
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
		name: '@storybook/react-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	staticDirs: ['assets'],
	async viteFinal(config, _) {
		config.plugins = config.plugins!.filter(plugin => plugin!.name !=='vite:dts')
		config!.optimization = {
      minimize: false,
      minimizer: [],
    }
		return config
	},
	features: {
		storyStoreV7: false
	}
}
export default config
