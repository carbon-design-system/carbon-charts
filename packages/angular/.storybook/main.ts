import type { StorybookConfig } from '@storybook/angular'
import { dirname } from 'path'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../../core/src/stories/getting-started/angular.stories.mdx',
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
  framework: {
    name: '@storybook/angular-vite',
    options: {}
  },
  logLevel: 'error',
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    // Workaround for issue loading stories from outside the package
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
			}
		}
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