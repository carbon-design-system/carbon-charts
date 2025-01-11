import { Component } from '@angular/core'
import { carbonPrefix } from '../../config'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'ibm-diagram-card-node-label',
	imports: [CommonModule],
	template: `
		<xhtml:label [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:label>
	`,
	standalone: true
})
export class CardNodeLabelComponent {
	namespace = `${carbonPrefix}--cc--card-node__label`
}
