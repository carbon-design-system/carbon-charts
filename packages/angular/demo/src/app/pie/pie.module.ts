import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PieRoutingModule } from "./pie-routing.module";
import { PieComponent } from "./pie/pie.component";
import { IconModule, ModalModule, NFormsModule } from "@peretz/neutrino";

import { ChartsModule } from "./../../../../src/charts.module";

@NgModule({
	imports: [
		CommonModule,
		PieRoutingModule,
		IconModule,
		ModalModule,
		NFormsModule,
		ChartsModule
	],
	declarations: [PieComponent],
})
export class PieModule { }
