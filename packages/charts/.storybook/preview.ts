import type { Preview } from '@storybook/html'
import { themes } from '@storybook/theming'

import '../src/demo/styles.scss'

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

/*
Notes:

div.container {
  color: var(--cds-text-primary, #161616);
  background-color: var(--cds-background, #ffffff);
  font-family: "IBM Plex Sans", Arial, sans-serif;
  padding: 30px;
}

Classes that do not seem to be defined/used:
	theme--white on div
	intro
	welcome__container
	welcome__content
	welcome__heading
	welcome__heading--subtitle
	welcome__heading--other
	netlify
*/