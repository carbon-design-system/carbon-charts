import type { Preview } from '@storybook/html'
import { themes } from '@storybook/theming'

import '../demo/styles.scss' // lots of warnings about ~@ibm/plex

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		docs: {
			theme: themes.dark
		}
	}
}

export default preview
