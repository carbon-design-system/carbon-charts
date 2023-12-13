import { mergeConfig, type InlineConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.tsx', '../src/stories/**/*.mdx'],
	staticDirs: ['../../core/.storybook/assets'],

	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false
			}
		}
	],

	// core: {
  //   builder: '@storybook/builder-vite'
  // },

	framework: {
		name: '@storybook/react-vite',
		options: {}
	},

	docs: {
		autodocs: 'tag'
	},

	// typescript: {
	// 	reactDocgen: 'react-docgen'
	// },

	async viteFinal(config: InlineConfig) {
		config.plugins = config.plugins!.filter((plugin) => plugin!.name !== 'vite:dts')
		const newConfig: InlineConfig = mergeConfig(config, {
			build: {
				chunkSizeWarningLimit: 1800,
				emptyOutDir: true,
				// rollupOptions: {
					// treeshake: false,
					// Avoid error Failed to load url /sb-preview/runtime.js (resolved id: /sb-preview/runtime.js). Does the file exist?
          // external: [
					// 	/\/sb-preview\/runtime.js$/ // does not prevent error
          // ]
        // }
			},
			optimizeDeps: {
				include: [ // prevents "Can't find variable: dc" only when running locally
					'@carbon/charts',
					'@base2/pretty-print-object',
					'@storybook/react',
					'@storybook/svelte',
					'@storybook/vue3',
					'acorn-jsx',
					'acorn-walk',
					'acorn',
					'color-convert',
					'doctrine',
					'escodegen',
					'estraverse',
					'fast-deep-equal',
					'html-tags',
					'isobject',
					'jest-mock',
					'loader-utils',
					'lodash/camelCase.js',
					'lodash/camelCase',
					'lodash/cloneDeep.js',
					'lodash/cloneDeep',
					'lodash/countBy.js',
					'lodash/countBy',
					'lodash/debounce.js',
					'lodash/debounce',
					'lodash/isEqual.js',
					'lodash/isEqual',
					'lodash/isFunction.js',
					'lodash/isFunction',
					'lodash/isPlainObject.js',
					'lodash/isPlainObject',
					'lodash/isString.js',
					'lodash/isString',
					'lodash/kebabCase.js',
					'lodash/kebabCase',
					'lodash/mapKeys.js',
					'lodash/mapKeys',
					'lodash/mapValues.js',
					'lodash/mapValues',
					'lodash/merge.js',
					'lodash/merge',
					'lodash/mergeWith.js',
					'lodash/mergeWith',
					'lodash/pick.js',
					'lodash/pick',
					'lodash/pickBy.js',
					'lodash/pickBy',
					'lodash/startCase.js',
					'lodash/startCase',
					'lodash/throttle.js',
					'lodash/throttle',
					'lodash/uniq.js',
					'lodash/uniq',
					'lodash/upperFirst.js',
					'lodash/upperFirst',
					'memoizerific',
					'polished',
					'prettier/parser-babel',
					'prettier/parser-flow',
					'prettier/parser-typescript',
					'prop-types',
					'qs',
					'react-dom',
					'react-dom/client',
					'react-is',
					'react',
					'react/jsx-runtime',
					'regenerator-runtime/runtime.js',
					'slash',
					'store2',
					'synchronous-promise',
					'telejson',
					'ts-dedent',
					'util-deprecate',
					'vue',
					'warning',
					'@mdx-js/react',
					'@storybook/addon-docs',
					'@storybook/addon-essentials/docs/mdx-react-shim',
					'markdown-to-jsx'
				]
			}
		})
		// console.log('Vite Config', newConfig)
		return newConfig
	},

	features: {
		storyStoreV7: false // required for storiesOf API
	}
}
export default config
