import type { Preview } from '@storybook/angular'
import { themes } from '@storybook/theming'

import { setCompodocJson } from '@storybook/addon-docs/angular'
import docJson from '../../../demo/documentation.json'
import '@carbon/charts/demo/styles.css'

setCompodocJson(docJson)

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
