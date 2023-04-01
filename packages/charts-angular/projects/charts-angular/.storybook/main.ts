import type { StorybookConfig } from '@storybook/angular'
import { resolve } from 'path'
const core = '../../../../charts'
const demoDist = resolve(__dirname, `${core}/dist/demo`)
import { dirname } from 'path'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // Storybook monorepo-specific bug
		// '../../../../charts/stories/getting-started/angular.stories.mdx',
		// '../../../../charts/stories/tutorials/*.stories.mdx'
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
			options: {
				actions: false,
        docs: true
			}
    }
  ],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../../../../charts/.storybook/assets'],
  features: {
    storyStoreV7: false
  },
  webpackFinal: async (config, {
    configType
  }) => {
    config?.module?.rules?.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: [demoDist]
    })
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@carbon/charts/demo': demoDist,
      // '@storybook/blocks': dirname(require.resolve('@storybook/blocks/package.json'))
    }
    return config
  }
}
export default config