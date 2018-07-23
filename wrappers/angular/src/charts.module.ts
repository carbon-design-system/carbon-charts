import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DonutChartComponent } from "./donut-chart.component";
import { PieChartComponent } from "./pie-chart.component";
import { BarChartComponent } from "./bar-chart.component";
// import { LineChart } from "./line-chart.component";
// import { ComboChart } from "./combo-chart.component";

@NgModule({
	imports: [CommonModule],
	declarations: [
		// BaseChart,
		// BaseAxisChart,
		DonutChartComponent,
		PieChartComponent,
		BarChartComponent,
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
		BarChartComponent,
		// StackedBarChart,
		// LineChart,
		// DoubleAxisLineChart,
		// ComboChart
	]
})

export class ChartsModule {}
