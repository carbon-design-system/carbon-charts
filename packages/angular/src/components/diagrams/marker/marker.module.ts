import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MarkerComponent,
	MarkerArrowLeftComponent,
	MarkerArrowRightComponent,
	MarkerCircleNodeComponent,
	MarkerDiamondComponent,
	MarkerSquareComponent,
	MarkerTeeComponent
} from "./marker.component";

@NgModule({
	declarations: [
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerCircleNodeComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	],
	exports: [
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerCircleNodeComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	],
	imports: [CommonModule]
})
export class MarkerModule { }
