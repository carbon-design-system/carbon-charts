import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { render } from '../../../../pages/server/entry-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function handler(event) {
	const url = event.path

	const appHtml = render(url)

	const html = fs
		.readFileSync(path.resolve(__dirname, '../../../../pages/index.html'), 'utf-8')
		.replace('<!--app-html-->', appHtml)

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/html' },
		body: html
	}
}
