import { Component, Input } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { buildStraightPathString } from "@carbon/charts/components/diagrams/buildPaths";

const { prefix } = settings;
interface Coordinates {
	x: number;
	y: number;
}
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
			[ngStyle]="{'stroke': color}"
			[attr.marker-start]="markerStart ? 'url(#' + markerStart + ')' : ''"
			[attr.marker-end]="markerEnd ? 'url(#' + markerEnd + ')' : ''"
		/>
	</svg:g>
	`
})

export class EdgeComponent {
	@Input() color: string;
	@Input() markerEnd: string;
	@Input() markerStart: string;
	@Input() source: Coordinates;
	@Input() target: Coordinates;
	@Input() variant: "dash-sm" | "dash-md" |  "dash-lg" |  "dash-xl" |  "double" |  "tunnel";
	@Input() path: string;

	pathClasses;
	namespace = `${prefix}--cc--edge`;
	straight = buildStraightPathString;
}
