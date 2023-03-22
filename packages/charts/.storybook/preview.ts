import type { Preview } from '@storybook/html'
import '../demo/styles.scss' // lots of warnings about ~@ibm/plex

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
}

export default preview
