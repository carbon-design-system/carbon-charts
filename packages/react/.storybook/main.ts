import type { StorybookConfig } from '@storybook/react-vite'
// import Inspect from 'vite-plugin-inspect'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.tsx',
		'../../core/src/stories/getting-started/react.stories.mdx',
		'../../core/src/stories/tutorials/*.stories.mdx'
	],
	staticDirs: ['../../core/.storybook/assets'],
	viteFinal: (config) => {

		// Workaround for issue loading stories from outside the package
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
			}
		}
		if (config.build) {
			config.build.chunkSizeWarningLimit = 1800
		}

	// 	// Remove vite:dts - no need for declarations
	// 	config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts' /* || plugin!.name !== 'storybook:react-docgen-plugin'*/)
	// 	// config.plugins = [
	// 	// 	Inspect({
  //   //   	build: true,
  //   //   	outputDir: 'demo/bundle/inspect'
  //   // 	}),
	// 	// 	...config.plugins
	// 	// ]

	// 	const index = config.plugins?.findIndex(plugin => plugin?.name === 'storybook:react-docgen-plugin');
	// 	if (index !== -1) {
	// 		config.plugins[index].enforce = 'post'
	// 		// const targetPlugin = config.plugins?.splice(index, 1)[0]
	// 		// targetPlugin.enforce = 'post'
	// 		// config.plugins?.push(targetPlugin)
	// 	}

	// 	// In case we need to disable storybook:react-docgen-plugin
	// 	// config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'storybook:react-docgen-plugin')
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
		options: {
		}
	},
	// typescript: {
	// 	reactDocgenTypescriptOptions: {
	// 		exclude: [],
	// 		shouldRemoveUndefinedFromOptional: true,
	// 	},
  //   reactDocgen: 'react-docgen',
  // },
	core: {
    // disableTelemetry: true
  },
	docs: {
		autodocs: 'tag'
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
