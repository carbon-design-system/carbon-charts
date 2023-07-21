import carbonPrettierConfig from 'prettier-config-carbon'

export default {
	$schema: 'https://json.schemastore.org/prettierrc',
	...carbonPrettierConfig,
	semi: false,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'none',
	pluginSearchDirs: ['.'] // Find plugins in node_modules
}