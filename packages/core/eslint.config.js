/* eslint-env node */
export default {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:storybook/recommended'
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-shadow': 'error'
	},
	parserOptions: {
		ecmaVersion: 'latest'
	}
}
