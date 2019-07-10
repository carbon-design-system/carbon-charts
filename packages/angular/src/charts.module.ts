import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// BaseChart needs to be imported for ng-packagr to recognize it
import { BaseChart } from "./base-chart.component";

import { DonutChartComponent } from "./donut-chart.component";
import { PieChartComponent } from "./pie-chart.component";
import { BarChartComponent } from "./bar-chart.component";
import { LineChartComponent } from "./line-chart.component";
import { ScatterChartComponent } from "./scatter-chart.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		// BaseChart needs to be imported for ng-packagr to recognize it
		BaseChart,
		DonutChartComponent,
		PieChartComponent,
		BarChartComponent,
		LineChartComponent,
		ScatterChartComponent
	],
	exports: [
		BaseChart,
		DonutChartComponent,
		PieChartComponent,
		BarChartComponent,
		LineChartComponent,
		ScatterChartComponent
	]
})

export class ChartsModule {}
