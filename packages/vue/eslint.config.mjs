export default [
	{
		root: true,
		extends: [
			'plugin:vue/recommended',
			'eslint:recommended',
			'@vue/eslint-config-typescript',
			'@vue/eslint-config-prettier/skip-formatting'
		],
		parserOptions: {
			ecmaVersion: 'latest'
		}
	}
]
