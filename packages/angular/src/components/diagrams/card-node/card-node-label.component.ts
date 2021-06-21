import { Component } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

@Component({
	selector: "ibm-diagram-card-node-label",
	template: `
	<xhtml:label [ngClass]="namespace">
		<ng-content></ng-content>
	</xhtml:label>
	`
})

export class CardNodeLabelComponent {
	namespace = `${prefix}--cc--card-node__label`;
}
