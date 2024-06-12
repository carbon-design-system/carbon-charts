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
	WordCloudChartOptions,
	/**
	 * @deprecated Use `WordCloudChartOptions` instead.
	 */
	WordCloudChartOptions as WorldCloudChartOptions
} from '@carbon/charts'

// All enums
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
	Projection,
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
} from '@carbon/charts'
