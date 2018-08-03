import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DonutRoutingModule } from "./donut-routing.module";
import { DonutComponent } from "./donut/donut.component";
import { IconModule, ModalModule, NFormsModule } from "@peretz/neutrino";

import { ChartsModule } from "../../../../src/charts.module";

@NgModule({
	imports: [
		CommonModule,
		DonutRoutingModule,
		IconModule,
		ModalModule,
		NFormsModule,
		ChartsModule
	],
	declarations: [DonutComponent],
})
export class DonutModule { }
