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
		// console.log('STORYBOOK VITE CONFIG', config)
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
		// Don't emit declarations for Storybook
		// config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'storybook:react-docgen-plugin')
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')

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
