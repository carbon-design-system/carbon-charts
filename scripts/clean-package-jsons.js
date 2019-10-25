const fs = require("fs");
const path = require("path");

// Define paths to package.json files
const CORE_PKG_JSON = path.resolve(__dirname, "../packages/core/dist/package.json");
const pkgData = require(CORE_PKG_JSON);

// Remove the postinstall script
delete pkgData.scripts.postinstall;

// Overwrite original `package.json` with new data
fs.writeFile(CORE_PKG_JSON, JSON.stringify(pkgData, null, 2), function (err) {
	if (err) throw err;
});
