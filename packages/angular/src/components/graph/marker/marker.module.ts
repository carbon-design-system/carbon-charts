import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerComponent } from "./marker.component";
import { MarkerArrowLeftComponent } from "./marker-arrow-left.component";

@NgModule({
	declarations: [MarkerComponent, MarkerArrowLeftComponent],
	exports: [MarkerComponent, MarkerArrowLeftComponent],
	imports: [CommonModule]
})
export class MarkerModule { }
