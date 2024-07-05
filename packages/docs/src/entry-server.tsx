import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './main' // Ensure this path points to your main.tsx

export function render(url: string) {
	return renderToString(
		<StaticRouter location={url}>
			<App />
		</StaticRouter>
	)
}
