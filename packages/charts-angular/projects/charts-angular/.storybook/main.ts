import type { StorybookConfig } from '@storybook/angular'
import { resolve } from 'path'
const core = '../../../../charts'
const demoDist = resolve(__dirname, `${core}/dist/demo`)
// const angularPreset = resolve(__dirname, '../node_modules/@storybook/angular/preset')

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // Storybook 7 bug prevents MDX files from being shared across packages (other than core and react)
    // `${core}/stories/tutorials/!(0-api)*.stories.mdx`
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
      // '@storybook/angular/preset': angularPreset
    }
    return config
  }
}
export default config