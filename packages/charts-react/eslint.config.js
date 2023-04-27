// require('@rushstack/eslint-patch/modern-module-resolution')

export default {
	root: true,
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
		'plugin:storybook/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	}
}
