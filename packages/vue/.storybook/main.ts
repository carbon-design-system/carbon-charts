import type { StorybookConfig } from '@storybook/vue-vite'
import { dirname } from 'path'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.stories.mdx',
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
	viteFinal: (config) => {
		if (config.build) {
      config.build.chunkSizeWarningLimit = 1900
		}
		// Disable declaration generation for Storybook
		config.plugins = config.plugins!.filter(plugin => plugin!.name !=='vite:dts')
		return config
	},
	framework: {
		name: '@storybook/vue-vite',
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
