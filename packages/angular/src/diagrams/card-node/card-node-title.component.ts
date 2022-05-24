import { Component } from "@angular/core";
import { carbonPrefix } from '../configs';

@Component({
	selector: "ibm-diagram-card-node-title",
	template: `
	<xhtml:div [ngClass]="namespace">
		<ng-content></ng-content>
	</xhtml:div>
	`
})

export class CardNodeTitleComponent {
	namespace = `${carbonPrefix}--cc--card-node__title`;
}
