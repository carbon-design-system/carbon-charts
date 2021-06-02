import { Component, Input, OnInit } from "@angular/core";
import settings from "carbon-components/src/globals/js/settings";
import { arrowLeft, arrowRight, circle, diamond, square, tee } from "./markerDefinitions";

const { prefix } = settings;

@Component({
	selector: "[ibm-graph-marker]",
	templateUrl: "./marker.component.html"
})
export class MarkerComponent {
	@Input() d;
	@Input() color;
	@Input() id;
	@Input() orient;
	@Input() height;
	@Input() width;
	@Input() refX;
	@Input() refY;

	namespace = `${prefix}--cc--marker`;
}


