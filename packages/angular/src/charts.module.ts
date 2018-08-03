import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DonutChartComponent } from "./donut-chart.component";
import { PieChartComponent } from "./pie-chart.component";
import { BarChartComponent } from "./bar-chart.component";
import { LineChartComponent } from "./line-chart.component";

@NgModule({
	imports: [CommonModule],
	declarations: [
		DonutChartComponent,
		PieChartComponent,
		BarChartComponent,
		LineChartComponent
	],
	exports: [
		DonutChartComponent,
		PieChartComponent,
		BarChartComponent,
		LineChartComponent
	]
})

export class ChartsModule {}
