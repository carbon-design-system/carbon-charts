import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PieComponent } from "./pie/pie/pie.component";

import { ChartsModule } from "@peretz/charts-angular";

@NgModule({
	imports: [
		ChartsModule
	],
	declarations: [PieComponent],
})
export class ChartsCommonModule { }
