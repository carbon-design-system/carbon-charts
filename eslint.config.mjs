import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import jsdoc from 'eslint-plugin-jsdoc'
import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
	{
		// global when it's the only property
		ignores: [
			// default already excludes node_modules and .git
			'.yarn/',
			'pages/',
			'yarn.lock',
			'**/.angular/',
			'**/.svelte-kit/',
			'**/build/',
			'**/dist/',
			'**/LICENSE.md',
			'**/carbon.yml'
		]
	},
	{
		languageOptions: { globals: globals.browser }
	},
	jsPlugin.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-shadow': 'error'
		}
	},
	...vuePlugin.configs['flat/recommended'],
	{
		files: ['packages/vue/src/components/**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.vue'],
				project: 'packages/vue/tsconfig.vite.json'
			}
		},
		plugins: {
			vue: vuePlugin
		},
		rules: {
			...vuePlugin.configs['vue3-recommended'].rules
		}
	},
	...sveltePlugin.configs['flat/prettier'],
	{
		files: ['packages/svelte/src/**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		}
	},
	{
		// Improve typedoc output for docs website
		files: ['packages/core/src/**/*.ts'],
		plugins: {
			jsdoc
		},
		rules: {
			'jsdoc/require-description': 'warn',
			'jsdoc/check-values': 'warn'
		}
	},
	{
		plugins: {
			prettier: eslintPluginPrettier
		},
		rules: {
			'prettier/prettier': 'warn'
		}
	},
	eslintConfigPrettier
]
