import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CircleNodeComponent } from "./circle-node.component";
export { CircleNodeComponent } from "./circle-node.component";

@NgModule({
	declarations: [CircleNodeComponent],
	exports: [CircleNodeComponent],
	imports: [CommonModule]
})
export class CircleNodeModule { }
