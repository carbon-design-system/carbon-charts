import type { StorybookConfig } from '@storybook/angular'
import { resolve } from 'path'

const core = '../../../../charts'
const demoDist = resolve(__dirname, `${core}/dist/demo`)

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		`${core}/stories/tutorials/!(0-api)*.stories.mdx`,
		`${core}/stories/getting-started/angular.stories.mdx`
	],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false,
				backgrounds: false,
				controls: true,
				docs: true,
				viewport: false,
				toolbars: true,
				measure: false,
				outline: false
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
	staticDirs: ['assets'],
	features: {
		storyStoreV7: false
	},
	webpackFinal: async (config, { configType }) => {
		config?.module?.rules?.push({
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: [demoDist],
		})

		config.resolve!.alias = {
      ...config.resolve!.alias,
      '@carbon/charts/demo': demoDist,
    };

		return config
	}
}
export default config
