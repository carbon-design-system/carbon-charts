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

export default [
	{
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
			'**/carbon.yml' // something wrong with carbon.yml files
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
		files: ['**/*.vue'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				extraFileExtensions: ['.vue'],
				project: './tsconfig.json'
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
		files: ['**/*.svelte', '*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		}
	},
	{
		plugins: {
			jsdoc,
			prettier: eslintPluginPrettier
		},
		rules: {
			'jsdoc/require-description': 'warn',
			'jsdoc/check-values': 'warn',
			'prettier/prettier': 'error'
		}
	},
	eslintConfigPrettier
]
