import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BarRoutingModule } from "./bar-routing.module";
import { BarComponent } from "./bar/bar.component";
import { IconModule, ModalModule, NFormsModule } from "@peretz/neutrino";

import { ChartsModule } from "../../../../src/charts.module";

@NgModule({
	imports: [
		CommonModule,
		BarRoutingModule,
		IconModule,
		ModalModule,
		NFormsModule,
		ChartsModule
	],
	declarations: [BarComponent],
})
export class BarModule { }
