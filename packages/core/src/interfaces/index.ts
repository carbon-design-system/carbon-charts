export { Roles } from './a11y'

export type {
	AxesOptions,
	AxisOptions,
	BasedAxisOptions,
	BinnedAxisOptions,
	ComboChartAxisOptions,
	TickFormats,
	TimeIntervalFormats,
	TimeIntervalNames,
	TimeScaleOptions
} from './axis-scales'

export type {
	AlluvialChartOptions,
	AreaChartOptions,
	AxisChartOptions,
	BarChartOptions,
	BaseChartOptions,
	BinnedAxisChartOptions,
	BoxplotChartOptions,
	BubbleChartOptions,
	BulletChartOptions,
	ChartOptions,
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
	ProportionalMeterChartOptions,
	RadarChartOptions,
	ScatterChartOptions,
	StackedAreaChartOptions,
	StackedBarChartOptions,
	ThematicChartOptions,
	TreemapChartOptions,
	TreeChartOptions,
	WorldCloudChartOptions,
	WordCloudChartTooltipOptions
} from './charts'

export type {
	BarOptions,
	GridOptions,
	LayoutComponentChild,
	LegendItem,
	LegendOptions,
	Locale,
	LocaleTimeScaleOptions,
	RulerOptions,
	StackedBarOptions,
	ThresholdOptions,
	TooltipOptions,
	ToolbarControl,
	ToolbarOptions,
	ZoomBarOptions,
	ZoomBarsOptions,
	TabularRepCustomizationOptions
} from './components'

export type { Coordinates, LayoutConfigs } from './layout'

export type { ChartConfig, ChartData, ChartTabularData, DataSet } from './model'

export type { Services } from './services'

export type { TruncationOptions } from './truncation'

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
	Projection,
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
} from './enums'

// For backward-compatibility
export * as Events from './events'

/*
  Events should be named like this so they can be
  individually imported without name conflicts with components/graphs.
  TODO: Events should be internally renamed to match export so they do not conflict with existing classes
*/
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
} from './events'
