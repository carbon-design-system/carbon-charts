module.exports = {
	$schema: 'https://json.schemastore.org/prettierrc',
	...require('prettier-config-carbon'), // Carbon prettier plus overrides...
	semi: false,
	tabWidth: 2,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'none',
	pluginSearchDirs: ['.'] // Find plugins in node_modules
}