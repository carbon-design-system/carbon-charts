import prettierConfig from 'prettier-config-carbon'

export default {
  $schema: 'https://json.schemastore.org/prettierrc',
  ...prettierConfig, // Carbon prettier plus overrides...
  ignorePath: '.eslintignore', // so we don't need .eslintignore and .prettierignore
  semi: false,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'none',
  pluginSearchDirs: ['.'] // Find plugins in node_modules
}
