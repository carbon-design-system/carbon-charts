import { Component } from '@angular/core'
import { carbonPrefix } from '../../config'
import { NgClass } from '@angular/common'

@Component({
	selector: 'ibm-diagram-card-node-label',
	template: `
		<xhtml:label [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:label>
	`,
	standalone: true,
	imports: [NgClass]
})
export class CardNodeLabel {
	namespace = `${carbonPrefix}--cc--card-node__label`
}
