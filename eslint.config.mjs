import globals from 'globals'
import jsPlugin from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import jsdoc from 'eslint-plugin-jsdoc'
import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import reactHooksPlugin from 'eslint-plugin-react-hooks' // must use 'next' version for compatibility
import reactRecommended from 'eslint-plugin-react/configs/recommended.js' // requires @eslint/compat
import { fixupConfigRules } from '@eslint/compat' // for eslint-plugin-react which has issues

export default tseslint.config(
	// Global ignores
	{
		ignores: [
			// default already excludes node_modules and .git
			'.husky/',
			'.nx/',
			'.yarn/',
			'assets/',
			'pages/',
			'yarn.lock',
			'**/.angular/',
			'**/scss/',
			'**/public/images',
			'**/.svelte-kit/',
			'**/svelte/static',
			'**/dist/',
			'packages/angular/'
		]
	},

	// Global - window and document objects
	{
		languageOptions: { globals: globals.browser }
	},

	// For very small number of JavaScript files
	{
		files: ['scripts/*.mjs', './*.mjs', 'packages/svelte/svelte.config.js'],
		rules: jsPlugin.configs.recommended.rules
	},

	// Global - TypeScript
	...tseslint.configs.recommended,

	{
		files: ['packages/**/*.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-this-alias': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-var-requires': 'warn',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error'
		}
	},

	// @carbon/charts-docs and @carbon/charts-react
	{
		files: ['packages/docs/src/**/*.{ts,tsx}', 'packages/react/src/**/*.{ts,tsx}'],
		plugins: {
			react: reactRecommended.plugins
		},
		rules: {
			...fixupConfigRules(reactRecommended).rules
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	},

	// @carbon/charts-docs (@charts/react doesn't use hooks)
	{
		files: ['packages/docs/src/**/*.tsx'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: true
			}
		},
		plugins: {
			'react-hooks': reactHooksPlugin
		},
		rules: {
			...reactHooksPlugin.configs.recommended.rules,
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn'
		}
	},

	// @carbon/charts - for typedoc generation by docs website
	{
		name: 'jsdoc',
		files: ['packages/core/src/**/*.ts'],
		plugins: {
			jsdoc
		},
		rules: {
			'jsdoc/require-description': 'warn',
			'jsdoc/check-values': 'warn'
		}
	},

	// @carbon/charts-svelte - only checks .svelte files. TypeScript is checked globally.
	{
		files: ['packages/svelte/src/**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser
			}
		},
		plugins: {
			sveltePlugin
		},
		rules: {
			...sveltePlugin.configs['flat/prettier'].rules
		}
	},

	// @carbon/charts-vue - Checks .vue and .ts files.
	{
		files: ['packages/vue/**/*.{ts,vue}'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.vue'],
				project: true
			}
		},
		plugins: {
			vuePlugin
		},
		rules: {
			...vuePlugin.configs['flat/recommended'].rules
		}
	},

	// Loads last to remove any conflicting rules with prettier
	prettierPluginRecommended
)
