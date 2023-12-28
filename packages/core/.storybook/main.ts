import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.ts'],
	staticDirs: ['assets'],
	framework: {
		name: '@storybook/html-vite',
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
	async viteFinal(config) {
		config.plugins = config.plugins!.filter(plugin => plugin!.name !== 'vite:dts')
		return mergeConfig(config, {
			build: { chunkSizeWarningLimit: 1600 }
		})
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
