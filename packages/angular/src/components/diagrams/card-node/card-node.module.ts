import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardNodeComponent } from "./card-node.component";
export { CardNodeComponent } from "./card-node.component";

@NgModule({
	declarations: [CardNodeComponent],
	exports: [CardNodeComponent],
	imports: [CommonModule]
})
export class CardNodeModule { }
