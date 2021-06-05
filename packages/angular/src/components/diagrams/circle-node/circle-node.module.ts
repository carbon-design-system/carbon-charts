import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShapeNodeComponent } from "./circle-node.component";
export { ShapeNodeComponent } from "./circle-node.component";

@NgModule({
	declarations: [ShapeNodeComponent],
	exports: [ShapeNodeComponent],
	imports: [CommonModule]
})
export class ShapeNodeModule { }
