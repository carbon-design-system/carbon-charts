import { Component, OnInit } from "@angular/core";
import { arrowLeft } from "./markerDefinitions";
import { MarkerComponent } from "./marker.component";

@Component({
	selector: "[ibm-graph-marker-arrow-left]",
	templateUrl: "./marker.component.html"
})
export class MarkerArrowLeftComponent extends MarkerComponent implements OnInit {
	ngOnInit() {
		const {d, id, height, width, refX, refY} = arrowLeft;

		this.d = this.d || d;
		this.id = this.id || id;
		this.height = this.height || height;
		this.width = this.width || width;
		this.refX = this.refX || refX;
		this.refY = this.refY || refY;
	}
}
