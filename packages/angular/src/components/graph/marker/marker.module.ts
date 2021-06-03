import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MarkerComponent,
	MarkerArrowLeftComponent,
	MarkerArrowRightComponent,
	MarkerCircleComponent,
	MarkerDiamondComponent,
	MarkerSquareComponent,
	MarkerTeeComponent
} from "./marker.component";

@NgModule({
	declarations: [
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerCircleComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	],
	exports: [
		MarkerComponent,
		MarkerArrowLeftComponent,
		MarkerArrowRightComponent,
		MarkerCircleComponent,
		MarkerDiamondComponent,
		MarkerSquareComponent,
		MarkerTeeComponent
	],
	imports: [CommonModule]
})
export class MarkerModule { }
