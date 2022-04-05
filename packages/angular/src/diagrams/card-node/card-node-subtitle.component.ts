import { Component } from "@angular/core";
import { carbonPrefix } from '@carbon/charts/src/configuration-non-customizable';

@Component({
	selector: "ibm-diagram-card-node-subtitle",
	template: `
	<xhtml:div [ngClass]="namespace">
		<ng-content></ng-content>
	</xhtml:div>
	`
})

export class CardNodeSubtitleComponent {
	namespace = `${carbonPrefix}--cc--card-node__subtitle`;
}
