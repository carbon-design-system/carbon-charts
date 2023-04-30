require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
		'prettier',
		'plugin:storybook/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	}
}
