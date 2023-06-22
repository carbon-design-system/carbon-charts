const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const packageJSONPath = path.resolve(__dirname, `../packages/angular/dist/package.json`)
const packageJSON = require(packageJSONPath)

if (_.get(packageJSON, 'dependencies.@carbon/charts') === 'workspace:*') {
	_.set(packageJSON, 'dependencies.@carbon/charts', packageJSON.version)
}

// Overwrite original `package.json` with new data
fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), function (err) {
	if (err) throw err
})
