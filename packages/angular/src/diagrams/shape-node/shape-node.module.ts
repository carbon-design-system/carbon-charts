import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShapeNodeComponent } from "./shape-node.component";
export { ShapeNodeComponent } from "./shape-node.component";

@NgModule({
	declarations: [ShapeNodeComponent],
	exports: [ShapeNodeComponent],
	imports: [CommonModule]
})
export class ShapeNodeModule { }
