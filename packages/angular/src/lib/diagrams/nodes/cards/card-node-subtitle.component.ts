import { Component } from '@angular/core'
import { carbonPrefix } from '../../config'
import { NgClass } from '@angular/common'

@Component({
	selector: 'ibm-diagram-card-node-subtitle',
	template: `
		<xhtml:div [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:div>
	`,
	standalone: true,
	imports: [NgClass]
})
export class CardNodeSubtitle {
	namespace = `${carbonPrefix}--cc--card-node__subtitle`
}
