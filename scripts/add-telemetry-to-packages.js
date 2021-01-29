const fs = require('fs');
const path = require('path');

// Define paths to package.json files
const TELEMETRY_ENABLED_PACKAGES = [
	'core',
	'angular',
	'vue',
	'react',
	'svelte',
];

TELEMETRY_ENABLED_PACKAGES.forEach((packageName) => {
	const packageJSONPath = path.resolve(
		__dirname,
		`../packages/${packageName}/dist/package.json`
	);
	const packageJSON = require(packageJSONPath);

	if (!packageJSON.scripts) {
		packageJSON.scripts = {};
	}

	packageJSON.scripts.postinstall = 'carbon-telemetry collect --install';

	// Overwrite original `package.json` with new data
	fs.writeFile(
		packageJSONPath,
		JSON.stringify(packageJSON, null, 2),
		function (err) {
			if (err) throw err;
		}
	);
});
