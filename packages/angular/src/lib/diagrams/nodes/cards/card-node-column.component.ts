import { Component, Input, HostBinding } from '@angular/core'
import { carbonPrefix } from '../../config'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'ibm-diagram-card-node-column',
	imports: [CommonModule],
	template: `
		<xhtml:div>
			<ng-content></ng-content>
		</xhtml:div>
	`,
	standalone: true
})
export class CardNodeColumnComponent {
	@Input() farsideColumn = false

	@HostBinding('class') get class() {
		const farsideClassName = this.farsideColumn
			? `${carbonPrefix}--cc--card-node__column--farside`
			: ''

		return `${carbonPrefix}--cc--card-node__column ${farsideClassName}`
	}
}
