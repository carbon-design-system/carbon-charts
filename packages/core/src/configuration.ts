import { Tools } from "./tools";
import {
	BaseChartOptions,
	AxisChartOptions,
	ScatterChartOptions,
	LineChartOptions,
	BarChartOptions,
	StackedBarChartOptions,
	AreaChartOptions,
	PieChartOptions,
	GaugeChartOptions,
	DonutChartOptions,
	BubbleChartOptions,
	RadarChartOptions,
	// Components
	GridOptions,
	AxesOptions,
	TimeScaleOptions,
	TooltipOptions,
	LegendOptions,
	LegendPositions,
	TruncationTypes,
	StackedBarOptions,
	MeterChartOptions,
	GaugeTypes,
	Alignments,
	ZoomBarsOptions
} from "./interfaces";
import enUSLocaleObject from "date-fns/locale/en-US/index";

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Default truncation configuration
 */
const standardTruncationOptions = {
	type: TruncationTypes.END_LINE,
	threshold: 16,
	numCharacter: 14
};

/**
 * Legend options
 */
export const legend: LegendOptions = {
	enabled: true,
	position: LegendPositions.BOTTOM,
	clickable: true,
	items: {
		status: {
			ACTIVE: 1,
			DISABLED: 0
		},
		horizontalSpace: 12,
		verticalSpace: 24,
		textYOffset: 8
	},
	checkbox: {
		radius: 6.5,
		spaceAfter: 4
	},
	truncation: standardTruncationOptions,
	alignment: Alignments.LEFT
};

/**
 * Grid options
 */
export const grid: GridOptions = {
	x: {
		numberOfTicks: 5
	},
	y: {
		numberOfTicks: 5
	}
};

/**
 * Tooltip options
 */
export const baseTooltip: TooltipOptions = {
	horizontalOffset: 10,
	showTotal: true,
	valueFormatter: (d) => d.toLocaleString(),
	truncation: standardTruncationOptions
};

// These options will be managed by Tools.mergeDefaultChartOptions
// by removing the ones the user is not providing,
// and by TwoDimensionalAxes.
const axes: AxesOptions = {
	top: {
		includeZero: true,
		truncation: standardTruncationOptions
	},
	bottom: {
		includeZero: true,
		truncation: standardTruncationOptions
	},
	left: {
		includeZero: true,
		truncation: standardTruncationOptions
	},
	right: {
		includeZero: true,
		truncation: standardTruncationOptions
	}
};

export const timeScale: TimeScaleOptions = {
	addSpaceOnEdges: 1,
	showDayName: false,
	localeObject: enUSLocaleObject,
	timeIntervalFormats: {
		"15seconds": { primary: "MMM d, pp", secondary: "pp" },
		minute: { primary: "MMM d, p", secondary: "p" },
		"30minutes": { primary: "MMM d, p", secondary: "p" },
		hourly: { primary: "MMM d, hh a", secondary: "hh a" },
		daily: { primary: "MMM d", secondary: "d" },
		weekly: { primary: "eee, MMM d", secondary: "eee" },
		monthly: { primary: "MMM yyyy", secondary: "MMM" },
		quarterly: { primary: "QQQ ''yy", secondary: "QQQ" },
		yearly: { primary: "yyyy", secondary: "yyyy" }
	}
};

/**
 * Base chart options common to any chart
 */
const chart: BaseChartOptions = {
	width: null,
	height: null,
	resizable: true,
	tooltip: baseTooltip,
	legend,
	style: {
		prefix: "cc"
	},
	data: {
		groupMapsTo: "group",
		loading: false,
		selectedGroups: []
	},
	color: {
		scale: null
	}
};

/**
 * Options common to any chart with an axis
 */
const axisChart: AxisChartOptions = Tools.merge({}, chart, {
	axes,
	timeScale,
	grid,
	zoomBar: {
		top: {
			enabled: false
		}
	} as ZoomBarsOptions
} as AxisChartOptions);

/**
 * options specific to simple bar charts
 */
const baseBarChart: BarChartOptions = Tools.merge({}, axisChart, {
	bars: {
		maxWidth: 16
	},
	timeScale: Tools.merge(timeScale, {
		addSpaceOnEdges: 1
	} as TimeScaleOptions)
} as BarChartOptions);

/**
 * options specific to simple bar charts
 */
const simpleBarChart: BarChartOptions = Tools.merge(
	{},
	baseBarChart,
	{} as BarChartOptions
);

/**
 * options specific to simple bar charts
 */
const groupedBarChart: BarChartOptions = Tools.merge(
	{},
	baseBarChart,
	{} as BarChartOptions
);

/**
 * options specific to stacked bar charts
 */
const stackedBarChart: StackedBarChartOptions = Tools.merge({}, baseBarChart, {
	bars: Tools.merge({}, baseBarChart.bars, {
		dividerSize: 1.5
	} as StackedBarOptions)
} as BarChartOptions);

/**
 * options specific to line charts
 */
const lineChart: LineChartOptions = Tools.merge({}, axisChart, {
	points: {
		// default point radius to 3
		radius: 3,
		filled: false
	}
} as LineChartOptions);

/**
 * options specific to area charts
 */
const areaChart: AreaChartOptions = Tools.merge({}, lineChart, {
	timeScale: Tools.merge(timeScale, {
		addSpaceOnEdges: 0
	} as TimeScaleOptions)
} as LineChartOptions);

/**
 * options specific to stacked area charts
 */
const stackedAreaChart = areaChart;

/**
 * options specific to scatter charts
 */
const scatterChart: ScatterChartOptions = Tools.merge({}, axisChart, {
	points: {
		// default point radius to 4
		radius: 4,
		fillOpacity: 0.3,
		filled: true
	}
} as ScatterChartOptions);

/**
 * options specific to bubble charts
 */
const bubbleChart: BubbleChartOptions = Tools.merge({}, axisChart, {
	bubble: {
		radiusMapsTo: "radius",
		radiusRange: (chartSize, data) => {
			const smallerChartDimension = Math.min(
				chartSize.width,
				chartSize.height
			);
			return [
				(smallerChartDimension * 3) / 400,
				(smallerChartDimension * 25) / 400
			];
		},
		fillOpacity: 0.2
	}
} as BubbleChartOptions);

/**
 * options specific to pie charts
 */
const pieChart: PieChartOptions = Tools.merge({}, chart, {
	pie: {
		radiusOffset: -15,
		innerRadius: 2,
		padAngle: 0.007,
		hoverArc: {
			outerRadiusOffset: 3
		},
		xOffset: 30,
		yOffset: 20,
		yOffsetCallout: 10,
		callout: {
			minSliceDegree: 5,
			offsetX: 15,
			offsetY: 12,
			horizontalLineLength: 8,
			textMargin: 2
		},
		labels: {
			formatter: null
		},
		alignment: Alignments.LEFT
	}
} as PieChartOptions);

/**
 * options specific to gauge charts
 */
const gaugeChart: GaugeChartOptions = Tools.merge({}, chart, {
	legend: {
		enabled: false
	},
	gauge: {
		type: GaugeTypes.SEMI,
		arcWidth: 16,
		deltaArrow: {
			size: (radius) => radius / 8,
			enabled: true
		},
		status: null,
		numberSpacing: 10,
		deltaFontSize: (radius) => radius / 8,
		valueFontSize: (radius) => radius / 2.5,
		numberFormatter: (number) =>
			number.toFixed(2) % 1 !== 0
				? number.toFixed(2).toLocaleString()
				: number.toFixed().toLocaleString()
	}
} as GaugeChartOptions);

/**
 * options specific to donut charts
 */
const donutChart: DonutChartOptions = Tools.merge({}, pieChart, {
	donut: {
		center: {
			numberFontSize: (radius) =>
				Math.min((radius / 100) * 24, 24) + "px",
			titleFontSize: (radius) => Math.min((radius / 100) * 15, 15) + "px",
			titleYPosition: (radius) => Math.min((radius / 80) * 20, 20),
			numberFormatter: (number) => Math.floor(number).toLocaleString()
		},
		alignment: Alignments.LEFT
	}
} as DonutChartOptions);

const meterChart: MeterChartOptions = Tools.merge({}, chart, {
	legend: {
		enabled: false
	},
	meter: {
		height: 8,
		statusBar: {
			paddingRight: 5,
			percentageIndicator: {
				enabled: true
			}
		},
		status: {
			indicatorSize: 16,
			paddingLeft: 15
		}
	}
});

/**
 * options specific to radar charts
 */
const radarChart: RadarChartOptions = Tools.merge({}, chart, {
	radar: {
		axes: {
			angle: "key",
			value: "value"
		},
		opacity: {
			unselected: 0.1,
			selected: 0.3
		},
		xLabelPadding: 10,
		yLabelPadding: 8,
		yTicksNumber: 4,
		minRange: 10,
		xAxisRectHeight: 50,
		dotsRadius: 5,
		alignment: Alignments.LEFT
	},
	tooltip: {
		gridline: {
			enabled: true
		},
		valueFormatter: (value) =>
			value !== null && value !== undefined ? value : "N/A"
	}
} as RadarChartOptions);

export const options = {
	chart,
	axisChart,
	simpleBarChart,
	groupedBarChart,
	stackedBarChart,
	bubbleChart,
	lineChart,
	areaChart,
	stackedAreaChart,
	scatterChart,
	pieChart,
	donutChart,
	meterChart,
	radarChart,
	gaugeChart
};

/**
 * Options for line behaviour
 */
export const lines = {
	opacity: {
		unselected: 0.3,
		selected: 1
	}
};

/**
 * Options for area behaviour
 */
export const area = {
	opacity: {
		unselected: 0,
		selected: 0.4
	}
};

/**
 * Options for area behaviour
 */
export const areas = {
	opacity: {
		unselected: 0.3,
		selected: 1
	}
};

/**
 * Base transition configuration
 */
export const transitions = {
	default: {
		duration: 300
	},
	pie_slice_mouseover: {
		duration: 100
	},
	pie_chart_titles: {
		duration: 375
	},
	graph_element_mouseover_fill_update: {
		duration: 100
	},
	graph_element_mouseout_fill_update: {
		duration: 100
	}
};

export const axis = {
	ticks: {
		number: 7,
		rotateIfSmallerThan: 30
	},
	paddingRatio: 0.1
};

export const spacers = {
	default: {
		size: 24
	}
};

export const zoomBar = {
	height: 32,
	spacerHeight: 20
};

export const tickSpaceRatioVertical = 2.5;
export const tickSpaceRatioHorizontal = 3.5;
