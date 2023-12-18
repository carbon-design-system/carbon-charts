/* eslint-env node */
module.exports = {
	root: true,
	extends: [
		'plugin:vue/recommended',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'plugin:storybook/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	}
}
