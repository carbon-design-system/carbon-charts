import type { StorybookConfig } from '@storybook/sveltekit'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	staticDirs: ['../../core/.storybook/assets'],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],
	async viteFinal(config) {
		if (config.build) {
			config.build.chunkSizeWarningLimit = 1600
		}
		if (config.server?.fs) {
			config.server.fs.allow = ['../src']
		}
		return config
	},
	framework: {
		name: '@storybook/sveltekit',
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
