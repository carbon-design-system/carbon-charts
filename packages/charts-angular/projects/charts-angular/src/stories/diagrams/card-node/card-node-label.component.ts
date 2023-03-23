import { Component } from '@angular/core'
import { carbonPrefix } from '../configs'

@Component({
	selector: 'ibm-diagram-card-node-label',
	template: `
		<xhtml:label [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:label>
	`
})
export class CardNodeLabelComponent {
	namespace = `${carbonPrefix}--cc--card-node__label`
}
