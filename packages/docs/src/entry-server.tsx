import { JSDOM } from 'jsdom'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './main' // Ensure this path points to your main.tsx

const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
global.window = window
global.document = window.document
global.navigator = {
	userAgent: 'node.js'
}

export function render(url: string) {
	return renderToString(
		<StaticRouter location={url}>
			<App />
		</StaticRouter>
	)
}
