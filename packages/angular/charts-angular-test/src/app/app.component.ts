import { Component, Type } from '@angular/core'
import {
	AlluvialChartComponent,
	AreaChartComponent,
	BoxplotChartComponent,
	BubbleChartComponent,
	BulletChartComponent,
	CirclePackChartComponent,
	ComboChartComponent,
	DonutChartComponent,
	ChoroplethChartComponent,
	GaugeChartComponent,
	GroupedBarChartComponent,
	HeatmapChartComponent,
	HistogramChartComponent,
	LineChartComponent,
	LollipopChartComponent,
	MeterChartComponent,
	PieChartComponent,
	RadarChartComponent,
	ScatterChartComponent,
	SimpleBarChartComponent,
	StackedAreaChartComponent,
	StackedBarChartComponent,
	TreeChartComponent,
	TreemapChartComponent,
	WordCloudChartComponent
} from '../../../src/lib/charts'
import charts from '../../../../docs/src/charts'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [CommonModule],
	standalone: true
})
export class AppComponent {
	charts = charts
	selectorMap: Record<string, Type<unknown>> = {
		'ibm-alluvial-chart': AlluvialChartComponent,
		'ibm-area-chart': AreaChartComponent,
		'ibm-boxplot-chart': BoxplotChartComponent,
		'ibm-bubble-chart': BubbleChartComponent,
		'ibm-bullet-chart': BulletChartComponent,
		'ibm-circle-pack-chart': CirclePackChartComponent,
		'ibm-combo-chart': ComboChartComponent,
		'ibm-donut-chart': DonutChartComponent,
		'ibm-experimental-choropleth-chart': ChoroplethChartComponent,
		'ibm-gauge-chart': GaugeChartComponent,
		'ibm-grouped-bar-chart': GroupedBarChartComponent,
		'ibm-heatmap-chart': HeatmapChartComponent,
		'ibm-histogram-chart': HistogramChartComponent,
		'ibm-line-chart': LineChartComponent,
		'ibm-lollipop-chart': LollipopChartComponent,
		'ibm-meter-chart': MeterChartComponent,
		'ibm-pie-chart': PieChartComponent,
		'ibm-radar-chart': RadarChartComponent,
		'ibm-scatter-chart': ScatterChartComponent,
		'ibm-simple-bar-chart': SimpleBarChartComponent,
		'ibm-stacked-area-chart': StackedAreaChartComponent,
		'ibm-stacked-bar-chart': StackedBarChartComponent,
		'ibm-tree-chart': TreeChartComponent,
		'ibm-treemap-chart': TreemapChartComponent,
		'ibm-wordcloud-chart': WordCloudChartComponent
	}
}
