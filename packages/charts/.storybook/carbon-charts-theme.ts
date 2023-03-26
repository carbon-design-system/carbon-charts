import { create } from '@storybook/theming'

export default create({
	base: 'dark',
	brandTitle: 'Carbon Charts - Vanilla JavaScript',
	brandTarget: '_self'
	// fontBase: '"IBM Plex Sans", Arial, sans-serif' // throws off Storybook's icon alignment in left navigation frame
})
