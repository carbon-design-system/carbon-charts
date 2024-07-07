import { Context } from '@netlify/functions'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { render } from '../../../../pages/server/entry-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async (req: Request, context: Context) => {
	const url = new URL(req.url).pathname

	const appHtml = render(url)

	const html = fs
		.readFileSync(path.resolve(__dirname, '../../../../pages/index.html'), 'utf-8')
		.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

	return new Response(html, {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		}
	})
}
