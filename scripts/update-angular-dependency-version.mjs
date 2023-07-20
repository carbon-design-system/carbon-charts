import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const packageJSONPath = resolve(__dirname, `../packages/angular/dist/package.json`)
const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf-8'))

if (packageJSON.dependencies && packageJSON.dependencies['@carbon/charts'] === 'workspace:*') {
	packageJSON.dependencies['@carbon/charts'] = packageJSON.version
}

// Overwrite original `package.json` with new data
writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2))
