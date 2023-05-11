import type { StorybookConfig } from '@storybook/sveltekit'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../core/src/stories/getting-started/svelte.stories.mdx',
		'../../core/src/stories/tutorials/*.stories.mdx'
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
		// Solves issue related to loading stories from core
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
			}
		}
		if (config.build) {
			config.build.chunkSizeWarningLimit = 1600
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
