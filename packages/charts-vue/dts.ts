// In case we run into blockers with 'vite-plugin-dts'...
import { type Plugin } from 'vite'
import { exec } from 'child_process'

const dts: Plugin = {
	name: 'dts-generator',
	buildEnd: (error?) => {
		exec('tsc --emitDeclarationOnly -p tsconfig.json', (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`)
				return
			}
			console.log(`stdout: ${stdout}`)
			console.error(`stderr: ${stderr}`)
		})
	}
}

export default dts
