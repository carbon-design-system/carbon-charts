import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChart } from './base-chart.component';
import { AreaChartComponent } from './area-chart.component';
import { StackedAreaChartComponent } from './area-chart-stacked.component';
import { SimpleBarChartComponent } from './bar-chart-simple.component';
import { GroupedBarChartComponent } from './bar-chart-grouped.component';
import { StackedBarChartComponent } from './bar-chart-stacked.component';
import { BoxplotChartComponent } from './boxplot-chart.component';
import { BubbleChartComponent } from './bubble-chart.component';
import { BulletChartComponent } from './bullet-chart.component';
import { DonutChartComponent } from './donut-chart.component';
import { GaugeChartComponent } from './gauge-chart.component';
import { LineChartComponent } from './line-chart.component';
import { LollipopChartComponent } from './lollipop-chart.component';
import { PieChartComponent } from './pie-chart.component';
import { ScatterChartComponent } from './scatter-chart.component';
import { MeterChartComponent } from './meter-chart.component';
import { RadarChartComponent } from './radar-chart.component';
import { ComboChartComponent } from './combo-chart.component';
import { TreemapChartComponent } from './treemap-chart.component';
import { CirclePackChartComponent } from './circle-pack-chart.component';
import { WordCloudChartComponent } from './wordcloud-chart.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		BaseChart,
		AreaChartComponent,
		StackedAreaChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BoxplotChartComponent,
		BubbleChartComponent,
		BulletChartComponent,
		DonutChartComponent,
		GaugeChartComponent,
		LineChartComponent,
		LollipopChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		MeterChartComponent,
		RadarChartComponent,
		ComboChartComponent,
		TreemapChartComponent,
		CirclePackChartComponent,
		WordCloudChartComponent,
	],
	exports: [
		BaseChart,
		AreaChartComponent,
		StackedAreaChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BoxplotChartComponent,
		BubbleChartComponent,
		BulletChartComponent,
		DonutChartComponent,
		GaugeChartComponent,
		LineChartComponent,
		LollipopChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		MeterChartComponent,
		RadarChartComponent,
		ComboChartComponent,
		TreemapChartComponent,
		CirclePackChartComponent,
		WordCloudChartComponent
	],
})
export class ChartsModule {}
