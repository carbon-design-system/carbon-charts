import { create } from '@storybook/theming'

export default create({
	base: 'dark',
	brandTitle: 'Carbon Charts - React',
	brandTarget: '_self'
	// fontBase: '"IBM Plex Sans", Arial, sans-serif' // throws off Storybook's icon alignment (only applies to left navigation)
})
