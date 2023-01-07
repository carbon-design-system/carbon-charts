import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChart } from './base-chart.component';
import { AlluvialChartComponent } from './alluvial-chart.component';
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
import { HistogramChartComponent } from './histogram-chart.component';
import { LineChartComponent } from './line-chart.component';
import { LollipopChartComponent } from './lollipop-chart.component';
import { PieChartComponent } from './pie-chart.component';
import { ScatterChartComponent } from './scatter-chart.component';
import { MeterChartComponent } from './meter-chart.component';
import { RadarChartComponent } from './radar-chart.component';
import { ComboChartComponent } from './combo-chart.component';
import { TreeChartComponent } from './tree-chart.component';
import { TreemapChartComponent } from './treemap-chart.component';
import { CirclePackChartComponent } from './circle-pack-chart.component';
import { WordCloudChartComponent } from './wordcloud-chart.component';
import { HeatmapChartComponent } from './heatmap-chart.component';
import { EXPERIMENTAL_ChoroplethChartComponent } from './choropleth.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		BaseChart,
		AlluvialChartComponent,
		AreaChartComponent,
		EXPERIMENTAL_ChoroplethChartComponent,
		StackedAreaChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BoxplotChartComponent,
		BubbleChartComponent,
		BulletChartComponent,
		DonutChartComponent,
		GaugeChartComponent,
		HeatmapChartComponent,
		HistogramChartComponent,
		LineChartComponent,
		LollipopChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		MeterChartComponent,
		RadarChartComponent,
		ComboChartComponent,
		TreeChartComponent,
		TreemapChartComponent,
		CirclePackChartComponent,
		WordCloudChartComponent,
	],
	exports: [
		BaseChart,
		AlluvialChartComponent,
		AreaChartComponent,
		EXPERIMENTAL_ChoroplethChartComponent,
		StackedAreaChartComponent,
		SimpleBarChartComponent,
		GroupedBarChartComponent,
		StackedBarChartComponent,
		BoxplotChartComponent,
		BubbleChartComponent,
		BulletChartComponent,
		DonutChartComponent,
		GaugeChartComponent,
		HeatmapChartComponent,
		HistogramChartComponent,
		LineChartComponent,
		LollipopChartComponent,
		PieChartComponent,
		ScatterChartComponent,
		MeterChartComponent,
		RadarChartComponent,
		ComboChartComponent,
		TreeChartComponent,
		TreemapChartComponent,
		CirclePackChartComponent,
		WordCloudChartComponent
	],
})
export class ChartsModule {}
