import type { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['../../core/.storybook/assets'],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],
	framework: {
		name: '@storybook/angular',
		options: {}
	},
	logLevel: 'error',
	docs: {
		autodocs: 'tag'
	},
	webpackFinal: async (config) => {
		config?.module?.rules?.push({
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		})
		config.performance = {
			hints: 'warning',
			maxAssetSize: 1024 * 1024 * 2.5, // 2.5 MB
			maxEntrypointSize: 1024 * 1024 * 5 // 5 MB
		}
		return config
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}

export default config
