/*
 * Public API Surface of charts-angular
 */

export {
	// charts
	AlluvialChartComponent,
	AreaChartComponent,
	BaseChartComponent,
	BoxplotChartComponent,
	BubbleChartComponent,
	BulletChartComponent,
	ChartsModule, // <-- Module
	ChoroplethChartComponent,
	CirclePackChartComponent,
	ComboChartComponent,
	DonutChartComponent,
	/**
	 * @deprecated Use `ChoroplethChartComponent` instead.
	 */
	ExperimentalChoroplethChartComponent,
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
	WordCloudChartComponent,
	// diagrams
	CardNodeColumnComponent,
	CardNodeComponent,
	CardNodeLabelComponent,
	CardNodeSubtitleComponent,
	CardNodeTitleComponent,
	CardNodeModule, // <-- Module
	EdgeComponent,
	EdgeModule, // <-- Module
	MarkerArrowLeftComponent,
	MarkerArrowRightComponent,
	MarkerComponent,
	MarkerDiamondComponent,
	MarkerModule, // <-- Module
	MarkerShapeNodeComponent,
	MarkerSquareComponent,
	MarkerTeeComponent,
	ShapeNodeComponent,
	ShapeNodeModule // <-- Module
} from './lib'

// Republish essential types from core so it's not a required dependency
export type {
	ChartTabularData,
	ChartOptions,
	AlluvialChartOptions,
	AreaChartOptions,
	BarChartOptions,
	BoxplotChartOptions,
	BubbleChartOptions,
	BulletChartOptions,
	ChoroplethChartOptions,
	CirclePackChartOptions,
	ComboChartOptions,
	DonutChartOptions,
	GaugeChartOptions,
	HeatmapChartOptions,
	HistogramChartOptions,
	LineChartOptions,
	LollipopChartOptions,
	MeterChartOptions,
	PieChartOptions,
	RadarChartOptions,
	ScatterChartOptions,
	StackedAreaChartOptions,
	TreeChartOptions,
	TreemapChartOptions,
	WordCloudChartOptions
} from '@carbon/charts'

// Commonly-used enums
export { Alignments, ChartTheme, ScaleTypes } from '@carbon/charts'
