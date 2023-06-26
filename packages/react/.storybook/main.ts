// import type { StorybookConfig } from '@storybook/react-vite' // Uncomment once https://github.com/storybookjs/storybook/issues/22435 is resolved
import type { StorybookConfig } from '@storybook/react-webpack5' // Remove once https://github.com/storybookjs/storybook/issues/22435 is resolved

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.tsx'],
	staticDirs: ['../../core/.storybook/assets'],

	// Uncomment once https://github.com/storybookjs/storybook/issues/22435 is resolved
	// viteFinal: (config) => {
	// 	if (config.build) {
	// 		config.build.chunkSizeWarningLimit = 1800
	// 	}

	// 	// Remove vite:dts - no need for declarations
	// 	config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts' /* || plugin!.name !== 'storybook:react-docgen-plugin'*/)

	// 	return config
	// },

	// Remove once https://github.com/storybookjs/storybook/issues/22435 is resolved
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
		// name: '@storybook/react-vite', // Uncomment once https://github.com/storybookjs/storybook/issues/22435 is resolved
		name: '@storybook/react-webpack5', // Remove once https://github.com/storybookjs/storybook/issues/22435 is resolved
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
