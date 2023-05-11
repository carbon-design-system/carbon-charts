import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.ts'],
	staticDirs: ['assets'],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
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
	core: {
		// disableTelemetry: true
	},
	async viteFinal(config, _) {
		if (config.build) {
			config.build.chunkSizeWarningLimit = 1600
		}
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')
		return config
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
