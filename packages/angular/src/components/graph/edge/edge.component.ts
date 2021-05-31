import { Component, Input } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { straight } from "./buildPath";

const { prefix } = settings;

@Component({
	selector: "[ibm-graph-edge]",
	template: `
	<svg:g [ngClass]="[namespace, variant ? namespace + '--' + variant : '']">
		<svg:path
			[ngClass]="namespace + '__container'"
			[attr.d]="path ? path : straight(source, target)"
		/>
		<svg:path
			[ngClass]="namespace + '__outer'"
			[attr.d]="path ? path : straight(source, target)"
		/>
		<svg:path
			[ngClass]="namespace + '__inner'"
			[attr.d]="path ? path : straight(source, target)"
		/>
	</svg:g>

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
