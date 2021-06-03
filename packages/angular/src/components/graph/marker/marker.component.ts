import { Component, Input, OnInit } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { arrowLeft, arrowRight, circle, diamond, square, tee } from "./markerDefinitions";

const { prefix } = settings;

const template = `
<svg:marker
	[ngClass]="namespace"
	[attr.markerHeight]="height"
	[attr.markerWidth]="width"
	[attr.orient]="orient"
	[attr.id]="id"
	[attr.refX]="refX"
	[attr.refY]="refY"
	markerUnits="userSpaceOnUse">
	<svg:path [attr.d]="d" [ngStyle]="{'fill': color}" ></svg:path>
</svg:marker>
`;

@Component({
	selector: "[ibm-graph-marker]",
	template
})
export class MarkerComponent {
	@Input() d;
	@Input() color;
	@Input() id;
	@Input() orient = "auto";
	@Input() height;
	@Input() width;
	@Input() refX;
	@Input() refY;
	@Input() position = "end";

	namespace = `${prefix}--cc--marker`;

	setAttributes = ({d, id, height, width}) => {
		const xPos = (this.position === "end") ? (width / 2) + 0.5 : 0.5;
		const yPos = height / 2;

		this.d = this.d || d;
		this.id = this.id || id;
		this.height = this.height || height;
		this.width = this.width || width;
		this.refX = this.refX || xPos;
		this.refY = this.refY || yPos;
	}
}

@Component({ selector: "[ibm-graph-marker-arrow-left]", template})
export class MarkerArrowLeftComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...arrowLeft}); } }
@Component({ selector: "[ibm-graph-marker-arrow-right]", template})
export class MarkerArrowRightComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...arrowRight}); } }
@Component({ selector: "[ibm-graph-marker-circle]", template})
export class MarkerCircleComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...circle}); } }
@Component({ selector: "[ibm-graph-marker-diamond]", template})
export class MarkerDiamondComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...diamond}); } }
@Component({ selector: "[ibm-graph-marker-square]", template})
export class MarkerSquareComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...square}); } }
@Component({ selector: "[ibm-graph-marker-tee]", template})
export class MarkerTeeComponent extends MarkerComponent implements OnInit { ngOnInit() {this.setAttributes({...tee}); } }
