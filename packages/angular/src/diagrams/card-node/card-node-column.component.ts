import { Component, Input, HostBinding } from '@angular/core';
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;

@Component({
	selector: 'ibm-diagram-card-node-column',
	template: `
		<xhtml:div>
			<ng-content></ng-content>
		</xhtml:div>
	`,
})
export class CardNodeColumnComponent {
	@Input() farsideColumn = false;

	@HostBinding('class') get class() {
		const farsideClassName = this.farsideColumn
			? `${prefix}--cc--card-node__column--farside`
			: '';

		return `${prefix}--cc--card-node__column ${farsideClassName}`;
	}
}
