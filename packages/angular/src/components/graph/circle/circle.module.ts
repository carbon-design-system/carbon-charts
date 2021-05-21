import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CircleComponent } from "./circle.component";
export { CircleComponent } from "./circle.component";

@NgModule({
	declarations: [CircleComponent],
	exports: [CircleComponent],
	imports: [CommonModule]
})
export class CircleModule { }
