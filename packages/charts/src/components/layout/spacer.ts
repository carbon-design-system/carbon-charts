// Internal Imports
import { Component } from '../component'
import { spacers } from '../../configuration'

export class Spacer extends Component {
	type = 'spacer'

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		this.getComponentContainer()
			.style('width', `${this.configs.size || spacers.default.size}px`)
			.style('height', `${this.configs.size || spacers.default.size}px`)
			.attr('opacity', 0)
	}
}
