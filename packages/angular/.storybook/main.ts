import type { StorybookConfig } from '@storybook/angular'
import { resolve, dirname } from 'path'
const core = '../../core'
const corePackage = resolve(__dirname, `${core}/dist`)

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
		// '../../core/src/stories/getting-started/angular.stories.mdx',
		// '../../core/src/stories/tutorials/*.stories.mdx'
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
    name: '@storybook/angular',
    options: {}
  },
  logLevel: 'error',
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: [`${corePackage}/demo`]
    })
    config.performance = {
      hints: 'warning',
      maxAssetSize: 1024 * 1024 * 2.5, // 2.5 MB
      maxEntrypointSize: 1024 * 1024 * 5, // 5 MB
    }
    config.resolve!.alias = {
      ...config.resolve!.alias,
      // '@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
    }
    return config
  },
  features: {
    storyStoreV7: false // required for storiesOf API
  }
}
export default config