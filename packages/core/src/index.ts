/*
  Public API
	Named exports for auditing purposes and elevating
  commonly-used interfaces and enums so developers don't have to know
  directory structure. Separated into regular and type exports.
*/

// Exports for historic reasons to prevent breaking change - remove in 2.0 (not documented anywhere anyway)
export * as configurations from './configuration'
export * as interfaces from './interfaces'

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
	Coordinates,
	LegendItem,
	LayoutComponentChild,
	Services,
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
export {
	alluvial,
	area,
	axis,
	baseTooltip,
	boxplot,
	canvasZoomSettings,
	carbonPrefix,
	circlePack,
	color,
	defaultLegendAdditionalItems,
	grid,
	histogram,
	legend,
	lines,
	meter,
	options,
	pie,
	radar,
	ruler,
	spacers,
	timeScale,
	tooltips,
	transitions,
	toolbar,
	zoomBar
} from './configuration'

export {
	// Axes
	Axis,
	BinnedRuler,
	ChartClip,
	ChartBrush,
	type GenericSvgSelection,
	Grid,
	HoverAxis,
	Ruler,
	StackedRuler,
	Toolbar,
	TwoDimensionalAxes,
	ZeroLine,
	ZoomBar,
	// Diagrams
	arrowLeft,
	arrowRight,
	buildBezierPathString,
	buildElbowPathString,
	buildStraightPathString,
	circle,
	diamond,
	square,
	tee,
	// Essentials
	AxisChartsTooltip,
	CanvasChartClip,
	ColorScaleLegend,
	Highlight,
	Legend,
	MeterTitle,
	Modal,
	Threshold,
	Title,
	Tooltip,
	// Graphs
	Alluvial,
	Area,
	Bar,
	Boxplot,
	Bubble,
	Bullet,
	CirclePack,
	Donut,
	Gauge,
	GroupedBar,
	Heatmap,
	Histogram,
	Line,
	Lollipop,
	Meter,
	Pie,
	Radar,
	Scatter,
	SimpleBar,
	Skeleton,
	SkeletonLines,
	StackedArea,
	StackedBar,
	StackedScatter,
	Tree,
	Treemap,
	WordCloud,
	LayoutComponent,
	Spacer,
	// Base Component
	Component
} from './components'

export {
	AlluvialChartModel,
	BoxplotChartModel,
	BulletChartModel,
	ChartModel,
	ChartModelBinned,
	ChartModelCartesian,
	CirclePackChartModel,
	GaugeChartModel,
	HeatmapModel,
	MeterChartModel,
	PieChartModel,
	RadarChartModel,
	TreeChartModel,
	TreemapChartModel,
	WordCloudModel
} from './model'

export {
	type Angle,
	CanvasZoom,
	CartesianScales,
	computeTimeIntervalName,
	Curves,
	degToRad,
	distanceBetweenPointOnCircAndVerticalDiameter,
	DOMUtils,
	Events,
	formatDateTillMilliSeconds,
	formatTick,
	getTimeformats,
	isTickPrimary,
	type getSVGElementSizeOptions,
	GradientUtils,
	type LabelAlignment,
	type Point,
	polarToCartesianCoords,
	radialLabelPlacement,
	radToDeg,
	Service,
	type setupTransitionConfigs,
	TIME_INTERVALS,
	Transitions,
	Zoom
} from './services'
