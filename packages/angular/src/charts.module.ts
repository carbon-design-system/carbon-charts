import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// BaseChart needs to be imported for ng-packagr to recognize it
import { BaseChart } from "./base-chart.component";

import { AreaChartComponent } from "./area-chart.component";
import { DonutChartComponent } from "./donut-chart.component";
import { PieChartComponent } from "./pie-chart.component";
import { SimpleBarChartComponent } from "./bar-chart-simple.component";
import { GroupedBarChartComponent } from "./bar-chart-grouped.component";
import { StackedBarChartComponent } from "./bar-chart-stacked.component";
import { LineChartComponent } from "./line-chart.component";
import { ScatterChartComponent } from "./scatter-chart.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		// BaseChart needs to be imported for ng-packagr to recognize it
		BaseChart,
		AreaChartComponent,
		DonutChartComponent,
		PieChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		LineChartComponent,
		ScatterChartComponent
	],
	exports: [
		BaseChart,
		AreaChartComponent,
		DonutChartComponent,
		PieChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		LineChartComponent,
		ScatterChartComponent
	]
})

export class ChartsModule {}
