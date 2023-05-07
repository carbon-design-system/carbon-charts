// import type { StorybookConfig } from '@storybook/react-vite'
import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
	stories: [
		'../src/stories/**/*.mdx',
		'../src/stories/**/*.stories.tsx'
	],
	staticDirs: ['../../core/.storybook/assets'],

	// viteFinal: (config) => {
	// 	if (config.build) {
	// 		config.build.chunkSizeWarningLimit = 1800
	// 	}

	// 	// Remove vite:dts - no need for declarations
	// 	config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts' /* || plugin!.name !== 'storybook:react-docgen-plugin'*/)

	// 	return config
	// },

	webpackFinal: async (config) => {
		config.module?.rules?.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader']
		})
		config.performance = {
			hints: 'warning',
			maxAssetSize: 1024 * 1024 * 2.5, // 2.5 MB
			maxEntrypointSize: 1024 * 1024 * 5 // 5 MB
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
		// name: '@storybook/react-vite',
		name: '@storybook/react-webpack5',
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
