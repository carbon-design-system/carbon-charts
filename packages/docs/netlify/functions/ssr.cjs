const fs = require('fs')
const path = require('path')
const { render } = require('../../../../pages/server/entry-server')

exports.handler = async function (event) {
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
