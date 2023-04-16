import { Component } from '@angular/core'
import { carbonPrefix } from '../../config'
import { NgClass } from '@angular/common';

@Component({
    selector: 'ibm-diagram-card-node-title',
    template: `
		<xhtml:div [ngClass]="namespace">
			<ng-content></ng-content>
		</xhtml:div>
	`,
    standalone: true,
    imports: [NgClass]
})
export class CardNodeTitle {
	namespace = `${carbonPrefix}--cc--card-node__title`
}
