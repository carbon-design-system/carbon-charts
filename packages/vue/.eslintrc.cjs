/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'plugin:storybook/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	}
}
