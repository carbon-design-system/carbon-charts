import { Component, Input } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { straight } from "./buildPath";

const { prefix } = settings;

@Component({
	selector: "[ibm-graph-edge]",
	template: `
	<svg:path
		[attr.d]="path ? path : straight(source, target)"
		[ngClass]="[namespace, variant && namespace + '--' + variant]"
	/>
	`
})

export class EdgeComponent {
	@Input() source;
	@Input() target;
	@Input() variant;
	@Input() path;

	pathClasses;
	namespace = `${prefix}--cc--edge`;
	straight = straight;
}
