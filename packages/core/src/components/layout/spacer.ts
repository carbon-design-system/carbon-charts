import { spacers as spacerConfigs } from '@/configuration'
import { Component } from '@/components/component'

export class Spacer extends Component {
	type = 'spacer'

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		this.getComponentContainer()
			.style('width', `${this.configs.size || spacerConfigs.default.size}px`)
			.style('height', `${this.configs.size || spacerConfigs.default.size}px`)
			.attr('opacity', 0)
	}
}
