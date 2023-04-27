import type { StorybookConfig } from '@storybook/angular'
import { resolve } from 'path'
const core = '../../../../charts'
const corePackage = resolve(__dirname, `${core}/dist`)

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // Storybook monorepo-specific issue
		// '../../../../charts/src/stories/getting-started/angular.stories.mdx',
		// '../../../../charts/src/stories/tutorials/*.stories.mdx'
  ],
  staticDirs: ['../../../../charts/.storybook/assets'],
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
  features: {
    storyStoreV7: false // required for storiesOf API
  },
  webpackFinal: async (config, {
    configType
  }) => {
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
      '@carbon/charts': corePackage,
      // '@carbon/charts/demo': `../../../../charts/dist/demo`
      // '@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
    }
    return config
  }
}
export default config