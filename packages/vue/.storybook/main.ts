import { mergeConfig} from 'vite'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	staticDirs: ['../../core/.storybook/assets'],
	framework: {
		name: '@storybook/vue3-vite',
		options: {}
	},
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],
	core: {
    disableTelemetry: true
  },
	docs: {
		autodocs: false
	},
	viteFinal: (config) => {
		config.plugins = config.plugins!.filter(plugin => plugin!.name !=='vite:dts')
		return mergeConfig(config, {
			build: { chunkSizeWarningLimit: 1900 }
		})
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
