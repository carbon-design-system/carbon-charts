// import type { StorybookConfig } from '@storybook/react-vite'
import type { StorybookConfig } from '@storybook/react-webpack5'

// import Inspect from 'vite-plugin-inspect'
import { dirname, resolve } from 'path'

const core = '../../core'
const corePackage = resolve(__dirname, `${core}/dist`)

const config: StorybookConfig = {
	stories: [
		'../src/stories/**/*.mdx',
		'../src/stories/**/*.stories.tsx'
	],
	staticDirs: ['../../core/.storybook/assets'],

	// viteFinal: (config) => {

	// 	// Workaround for issue loading stories from outside the package
	// 	if (config.resolve) {
	// 		config.resolve.alias = {
	// 			...config.resolve.alias,
	// 			'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
	// 		}
	// 	}
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
			use: ['style-loader', 'css-loader'],
			include: [`${corePackage}/demo`]
		})
		config.performance = {
			hints: 'warning',
			maxAssetSize: 1024 * 1024 * 2.5, // 2.5 MB
			maxEntrypointSize: 1024 * 1024 * 5 // 5 MB
		}
		config.resolve!.alias = {
			...config.resolve!.alias,
			'react': resolve(__dirname, '../node_modules/react')
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
