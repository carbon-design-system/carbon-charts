import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DonutChartComponent } from "./donut-chart.component";
// import { DonutCenter } from "./donut-center.component";
import { PieChartComponent } from "./pie-chart.component";
// import { BarChart } from "./bar-chart.component";
// import { StackedBarChart } from "./stacked-bar-chart.component";
// import { LineChart } from "./line-chart.component";
// import { DoubleAxisLineChart } from "./double-axis-line-chart.component";
// import { ComboChart } from "./combo-chart.component";
// import { BaseChart } from "./base-chart.component";
// import { BaseAxisChart } from "./base-axis-chart.component";

@NgModule({
	imports: [CommonModule],
	declarations: [
		// BaseChart,
		// BaseAxisChart,
		DonutChartComponent,
		PieChartComponent,
		// BarChart,
		// StackedBarChart,
		// LineChart,
		// DoubleAxisLineChart,
		// ComboChart
	],
	exports: [
		// BaseChart,
		// BaseAxisChart,
		DonutChartComponent,
		PieChartComponent,
		// BarChart,
		// StackedBarChart,
		// LineChart,
		// DoubleAxisLineChart,
		// ComboChart
	]
})

export class ChartsModule {}
