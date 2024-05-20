import globals from 'globals'
import jsPlugin from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import jsdoc from 'eslint-plugin-jsdoc'
import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default tseslint.config(
	// Global
	{
		ignores: [
			// default already excludes node_modules and .git
			'.github/',
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
			'**/carbon.yml'
		]
	},
	{
		languageOptions: { globals: globals.browser }
	},

	// For very small number of JavaScript files
	{
		files: ['scripts/*.mjs', './*.mjs', 'packages/svelte/svelte.config.js'],
		rules: jsPlugin.configs.recommended.rules
	},

	// TypeScript
	...tseslint.configs.recommended,

	// {
	// 	files: ['packages/**/*.ts', 'packages/**/*.tsx'],
	// 	languageOptions: {
	// 		parser: tseslint.parser,
	// 		parserOptions: {
	// 			project: true
	// 		}
	// 	},
	// 	// plugins: {
	// 	// 	'@typescript-eslint': tseslint
	// 	// },
	// 	rules: {
	// 		...tseslint.configs.recommendedTypeChecked.rules,
	// 		'@typescript-eslint/no-explicit-any': 'off',
	// 		'@typescript-eslint/no-var-requires': 'off',
	// 		'@typescript-eslint/no-this-alias': 'off',
	// 		'@typescript-eslint/no-shadow': 'error'
	// 	},
	// },
	// {
	// 	files: ['packages/react/src/**/*.tsx'],
	// 	languageOptions: {
	// 		parser: tsParser,
	// 		parserOptions: {
	// 			project: 'packages/react/tsconfig.json'
	// 		}
	// 	},
	// 	plugins: {
	// 		react: reactPlugin,
	// 		'react-hooks': reactHooksPlugin
	// 	},
	// 	rules: {
	// 		...reactPlugin.configs.recommended.rules,
	// 		'react-hooks/rules-of-hooks': 'error',
	// 		'react-hooks/exhaustive-deps': 'warn'
	// 	}
	// },
	// {
	// 	files: ['packages/docs/src/**/*.tsx'],
	// 	languageOptions: {
	// 		parser: tsParser,
	// 		parserOptions: {
	// 			project: true
	// 		}
	// 	},
	// 	plugins: {
	// 		react: reactPlugin,
	// 		'react-hooks': reactHooksPlugin
	// 	},
	// 	rules: {
	// 		...reactPlugin.configs.recommended.rules,
	// 		'react-hooks/rules-of-hooks': 'error',
	// 		'react-hooks/exhaustive-deps': 'warn'
	// 	}
	// },
	// ...vuePlugin.configs['flat/recommended'],
	// {
	// 	files: ['packages/vue/src/components/**/*.vue'],
	// 	languageOptions: {
	// 		parser: vueParser,
	// 		parserOptions: {
	// 			parser: tsParser,
	// 			extraFileExtensions: ['.vue'],
	// 			project: 'packages/vue/tsconfig.vite.json'
	// 		}
	// 	},
	// 	plugins: {
	// 		vue: vuePlugin
	// 	},
	// 	rules: {
	// 		...vuePlugin.configs['vue3-recommended'].rules
	// 	}
	// },
	// ...sveltePlugin.configs['flat/prettier'],
	// {
	// 	files: ['packages/svelte/src/**/*.svelte'],
	// 	languageOptions: {
	// 		parser: svelteParser,
	// 		parserOptions: {
	// 			parser: tsParser
	// 		}
	// 	}
	// },

	// Improve typedoc output for docs website
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
	prettierPluginRecommended
)
