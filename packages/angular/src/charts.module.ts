import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseChart } from "./base-chart.component";
<<<<<<< HEAD

import { AreaChartComponent } from "./area-chart.component";
import { DonutChartComponent } from "./donut-chart.component";
import { PieChartComponent } from "./pie-chart.component";
=======
>>>>>>> 57f4f1d3fb0cb4d0fe905ca98319b263d4a13379
import { SimpleBarChartComponent } from "./bar-chart-simple.component";
import { GroupedBarChartComponent } from "./bar-chart-grouped.component";
import { StackedBarChartComponent } from "./bar-chart-stacked.component";
import { BubbleChartComponent } from "./bubble-chart.component";
import { DonutChartComponent } from "./donut-chart.component";
import { LineChartComponent } from "./line-chart.component";
import { PieChartComponent } from "./pie-chart.component";
import { ScatterChartComponent } from "./scatter-chart.component";
import { RadarChartComponent } from "./radar-chart.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		BaseChart,
<<<<<<< HEAD
		AreaChartComponent,
		DonutChartComponent,
		PieChartComponent,
=======
>>>>>>> 57f4f1d3fb0cb4d0fe905ca98319b263d4a13379
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BubbleChartComponent,
		DonutChartComponent,
		LineChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		RadarChartComponent
	],
	exports: [
		BaseChart,
<<<<<<< HEAD
		AreaChartComponent,
		DonutChartComponent,
		PieChartComponent,
=======
>>>>>>> 57f4f1d3fb0cb4d0fe905ca98319b263d4a13379
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BubbleChartComponent,
		DonutChartComponent,
		LineChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		RadarChartComponent
	]
})

export class ChartsModule {}
