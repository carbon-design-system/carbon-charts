// Internal Imports
import { Component } from '../component';
import * as Configuration from '../../configuration';

export class Spacer extends Component {
	type = 'spacer';

	render() {
		this.getComponentContainer()
			.style(
				'width',
				`${this.configs.size || Configuration.spacers.default.size}px`
			)
			.style(
				'height',
				`${this.configs.size || Configuration.spacers.default.size}px`
			)
			.attr('opacity', 0);
	}
}
