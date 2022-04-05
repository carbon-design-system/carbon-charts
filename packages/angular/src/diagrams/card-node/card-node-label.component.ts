import { Component } from "@angular/core";
import { carbonPrefix } from '@carbon/charts/src/configuration-non-customizable';

@Component({
	selector: "ibm-diagram-card-node-label",
	template: `
	<xhtml:label [ngClass]="namespace">
		<ng-content></ng-content>
	</xhtml:label>
	`
})

export class CardNodeLabelComponent {
	namespace = `${carbonPrefix}--cc--card-node__label`;
}
