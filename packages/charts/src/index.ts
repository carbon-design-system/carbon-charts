/*
  Public API
	Named exports for auditing purposes and elevating
  commonly-used interfaces and enums so developers don't have to know
  directory structure. Separated into regular and type exports.
*/

// Exports for historic reasons to prevent breaking change - remove in 2.0 (not documented anywhere anyway)
export * as configurations from './configuration';
export * as interfaces from './interfaces';

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
	AreaEvent,
	ArrowDirections,
	AxisEvent,
	AxisFlavor,
	AxisPositions,
	AxisTitleOrientations,
	BarEvent,
	BoxplotEvent,
	CalloutDirections,
	CanvasZoomEvent,
	CartesianOrientations,
	ChartEvent,
	ChartTheme,
	ChartTypes,
	ColorClassNameTypes,
	ColorLegendType,
	DividerStatus,
	DominantBaseline,
	GaugeEvent,
	GaugeTypes,
	LayoutAlignItems,
	LayoutDirection,
	LayoutGrowth,
	LegendItemType,
	LegendOrientations,
	LegendPositions,
	LineEvent,
	ModalEvent,
	ModelEvent,
	PieEvent,
	RadarEvent,
	RenderTypes,
	ScaleTypes,
	ScatterEvent,
	Skeletons,
	Statuses,
	TextAnchor,
	ThresholdEvent,
	TickRotations,
	ToolbarControlTypes,
	TooltipEvent,
	TruncationTypes,
	TreeEvent,
	TreemapEvent,
	TreeTypes,
	WordCloudEvent,
	ZoombarEvent,
	ZoomDomainEvent,
	ZoomBarTypes
} from './interfaces'

// Less likely to be used externally
export * as Configuration from './configuration'
export * as Component from './components'
export * as Model from './model'
export * as Service from './services'
