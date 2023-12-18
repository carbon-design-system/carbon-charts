import { mergeConfig} from 'vite'
import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	staticDirs: ['../../core/.storybook/assets'],
	framework: {
		name: '@storybook/sveltekit',
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
		return mergeConfig(config, {
			build: { chunkSizeWarningLimit: 1600 },
			server: { fs: { allow: ['../src'] }}
		})
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
