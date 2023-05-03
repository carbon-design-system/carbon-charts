import { Component, Input, HostBinding } from '@angular/core'
import { carbonPrefix } from '../../config'

@Component({
	selector: 'ibm-diagram-card-node-column',
	template: `
		<xhtml:div>
			<ng-content></ng-content>
		</xhtml:div>
	`
})
export class CardNodeColumn {
	@Input() farsideColumn = false

	@HostBinding('class') get class() {
		const farsideClassName = this.farsideColumn
			? `${carbonPrefix}--cc--card-node__column--farside`
			: ''

		return `${carbonPrefix}--cc--card-node__column ${farsideClassName}`
	}
}
