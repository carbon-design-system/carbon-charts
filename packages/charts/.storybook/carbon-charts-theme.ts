import { create } from '@storybook/theming'

export default create({
	base: 'light',
	brandTitle: 'Carbon Charts - Vanilla JavaScript',
	brandTarget: '_self',
	// fontBase: '"IBM Plex Sans", Arial, sans-serif' // throws off Storybook's icon alignment (only applies to left navigation)
})
