import type { StorybookConfig } from '@storybook/react-vite'
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
			config.build.sourcemap = false
		}

		// Remove vite:dts - no need for declarations
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts' /* || plugin!.name !== 'storybook:react-docgen-plugin'*/)

		// const index = config.plugins?.findIndex(plugin => plugin?.name === 'storybook:react-docgen-plugin');
		// if (index !== -1) {
		// 	const targetPlugin = config.plugins?.splice(index, 1)[0]
		// 	delete targetPlugin?.enforce
		// 	config.plugins?.push(targetPlugin)
		// }

		// In case we need to disable storybook:react-docgen-plugin
		// config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'storybook:react-docgen-plugin')
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
