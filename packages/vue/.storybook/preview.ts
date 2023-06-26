import type { Preview } from '@storybook/vue3'
import { themes } from '@storybook/theming'
import '@carbon/charts/demo/styles.css'

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
		},
		backgrounds: { // --cds-background
			default: 'g100',
			values: [
				{
					name: 'g100',
					value: '#161616'
				},
				{
					name: 'g90',
					value: '#262626'
				},
				{
					name: 'g10',
					value: '#f4f4f4'
				},
				{
					name: 'white',
					value: '#fff'
				}
			]
		}
	}
}

export default preview
