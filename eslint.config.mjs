import jsdoc from 'eslint-plugin-jsdoc'

export default [
	{
		files: ['**/*.js', '**/*.ts'],
		plugins: {
			jsdoc
		},
		rules: {
			'jsdoc/require-description': 'warn',
			'jsdoc/check-values': 'warn'
		}
	}
]
