import { Component } from '@angular/core'
import { carbonPrefix } from '../../config'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'ibm-diagram-card-node-title',
	imports: [CommonModule],
	template: `
		<xhtml:div [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:div>
	`,
	standalone: true
})
export class CardNodeTitleComponent {
	namespace = `${carbonPrefix}--cc--card-node__title`
}
