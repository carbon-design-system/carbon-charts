const fs = require('fs')
const path = require('path')

// Define paths to package.json files
const TELEMETRY_ENABLED_PACKAGES = ['core', 'angular', 'vue', 'react', 'svelte']

/*
	Note: Previously, lerna published only the dist folder for each package. This was
	not a best practice. The correct approach is to specify exports in the package.json
	and a `files` array. When publishing, only those items specified in the files array
	plus README.md and package.json will be published. Following this approach
	allows the dependency `"@carbon/charts": "workspace:*"` to work correctly (obviating
	the need for symbolic link hacks).

	But because the actual package.json files are being will be modified rather than a copy,
	some care must be taken not to lose information.
*/

TELEMETRY_ENABLED_PACKAGES.forEach((packageName) => {
	const packageJSONPath = path.resolve(__dirname, `../packages/${packageName}/package.json`)
	const packageJSON = require(packageJSONPath)

	packageJSON.scripts.postinstall = 'carbon-telemetry collect --install'

	// Overwrite original `package.json` with new data
	fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), function (err) {
		if (err) throw err
	})
})
