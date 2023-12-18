import { mergeConfig, type InlineConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.tsx', '../src/stories/**/*.mdx'],
	staticDirs: ['../../core/.storybook/assets'],
	framework: {
		name: '@storybook/react-vite',
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
	typescript: {
		reactDocgen: false // Required to overcome https://github.com/storybookjs/storybook/issues/25247
	},
	async viteFinal(config: InlineConfig) {
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')
		const newConfig: InlineConfig = mergeConfig(config, {
			build: {
				chunkSizeWarningLimit: 1800,
				// rollupOptions: {
					// Avoid error Failed to load url /sb-preview/runtime.js (resolved id: /sb-preview/runtime.js). Does the file exist?
          // external: [
					// 	/\/sb-preview\/runtime.js$/ // does not prevent error
          // ]
        // }
			},
			optimizeDeps: {
				include: [
					'@carbon/charts'
				],
				exclude: ['@carbon/telemetry']
			}
		})
		return newConfig
	},
	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
