/*
  Public API
	Named exports for auditing purposes and elevating
  commonly-used interfaces and enums so developers don't have to know
  directory structure. Separated into regular and type exports.
*/

// Base chart classes
export { AxisChart } from './axis-chart'
export { Chart } from './chart'

// Chart classes
export {
	AlluvialChart,
	AreaChart,
	BoxplotChart,
	BubbleChart,
	BulletChart,
	CirclePackChart,
	ComboChart,
	DonutChart,
	GaugeChart,
	GroupedBarChart,
	HeatmapChart,
	HistogramChart,
	LineChart,
	LollipopChart,
	MeterChart,
	PieChart,
	RadarChart,
	ScatterChart,
	SimpleBarChart,
	StackedAreaChart,
	StackedBarChart,
	TreeChart,
	TreemapChart,
	WordCloudChart
} from './charts'

// Union of chart types
export type { Charts } from './charts'

// Types and interfaces
export type { ChartData, ChartConfig, ChartTabularData, DataSet } from './interfaces/model'
export type { LayoutConfigs } from './interfaces/layout'
export type {
	// Union of Chart Options
	ChartOptions,
	// Chart Options
	AlluvialChartOptions,
	AreaChartOptions,
	AxisChartOptions,
	BarChartOptions,
	BaseChartOptions,
	BinnedAxisChartOptions,
	BoxplotChartOptions,
	BubbleChartOptions,
	BulletChartOptions,
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
	ProportionalMeterChartOptions,
	RadarChartOptions,
	ScatterChartOptions,
	StackedAreaChartOptions,
	StackedBarChartOptions,
	TreeChartOptions,
	TreemapChartOptions,
	WorldCloudChartOptions,
	// Component Options
	AxesOptions,
	AxisOptions,
	BarOptions,
	BasedAxisOptions,
	BinnedAxisOptions,
	ComboChartAxisOptions,
	GridOptions,
	LegendOptions,
	RulerOptions,
	StackedBarOptions,
	TimeScaleOptions,
	ThresholdOptions,
	ToolbarOptions,
	TooltipOptions,
	TruncationOptions,
	WordCloudChartTooltipOptions,
	ZoomBarOptions,
	ZoomBarsOptions,
	// Formats
	TickFormats,
	TimeIntervalFormats,
	// Other
	LegendItem,
	LayoutComponentChild,
	ToolbarControl
} from './interfaces'

// Enums
export {
	Alignments,
	ArrowDirections,
	AxisFlavor,
	AxisPositions,
	AxisTitleOrientations,
	CalloutDirections,
	CartesianOrientations,
	ChartTheme,
	ChartTypes,
	ColorClassNameTypes,
	ColorLegendType,
	DividerStatus,
	DominantBaseline,
	GaugeTypes,
	LayoutAlignItems,
	LayoutDirection,
	LayoutGrowth,
	LegendItemType,
	LegendOrientations,
	LegendPositions,
	RenderTypes,
	ScaleTypes,
	Skeletons,
	Statuses,
	TextAnchor,
	TickRotations,
	ToolbarControlTypes,
	TruncationTypes,
	TreeTypes,
	ZoomBarTypes
} from './interfaces/enums'

// Events
// TODO: Refactor to make internal naming match public
export {
	Area as AreaEvent,
	Axis as AxisEvent,
	Bar as BarEvent,
	Boxplot as BoxplotEvent,
	CanvasZoom as CanvasZoomEvent,
	Chart as ChartEvent,
	Gauge as GaugeEvent,
	Line as LineEvent,
	Modal as ModalEvent,
	Model as ModelEvent,
	Pie as PieEvent,
	Radar as RadarEvent,
	Scatter as ScatterEvent,
	Threshold as ThresholdEvent,
	Tooltip as TooltipEvent,
	Tree as TreeEvent,
	Treemap as TreemapEvent,
	WordCloud as WordCloudEvent,
	ZoomBar as ZoombarEvent,
	ZoomDomain as ZoomDomainEvent
} from './interfaces/events'

// Less likely to be used externally
export * as Configuration from './configuration'
export * as Component from './components'
export * as Model from './model'
export * as Service from './services'
