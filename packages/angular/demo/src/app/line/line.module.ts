import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LineRoutingModule } from "./line-routing.module";
import { LineComponent } from "./line/line.component";
import { IconModule, ModalModule, NFormsModule } from "@peretz/neutrino";

import { ChartsModule } from "../../../../src/charts.module";

@NgModule({
	imports: [
		CommonModule,
		LineRoutingModule,
		IconModule,
		ModalModule,
		NFormsModule,
		ChartsModule
	],
	declarations: [LineComponent],
})
export class LineModule { }
