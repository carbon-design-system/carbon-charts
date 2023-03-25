import { create } from '@storybook/theming'

export default create({
	base: 'dark',
	brandTitle: 'Carbon Charts - Angular',
	brandTarget: '_self',
	// fontBase: '"IBM Plex Sans", Arial, sans-serif' // throws off Storybook's icon alignment (only applies to left navigation)
})
