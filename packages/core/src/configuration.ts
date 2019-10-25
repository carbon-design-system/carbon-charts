import { Tools } from "./tools";
import {
	BaseChartOptions,
	AxisChartOptions,
	ScatterChartOptions,
	LineChartOptions,
	BarChartOptions,
	StackedBarChartOptions,
	PieChartOptions,
	DonutChartOptions,
	// Components
	GridOptions,
	AxesOptions,
	TimeScaleOptions,
	TooltipOptions,
	AxisTooltipOptions,
	BarTooltipOptions,
	LegendOptions,
	ChartTheme,
	LegendPositions,
	StackedBarOptions,
} from "./interfaces/index";

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Legend options
 */
export const legend: LegendOptions = {
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
	}
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
	datapoint: {
		horizontalOffset: 10,
		enabled: true,
	},
};

export const axisChartTooltip: AxisTooltipOptions = Tools.merge({}, baseTooltip, {
	gridline: {
		enabled: true,
		threshold: 0.25
	}
} as AxisTooltipOptions);

export const barChartTooltip: BarTooltipOptions = Tools.merge({}, axisChartTooltip , {
	datapoint: {
		verticalOffset: 4
	},
	gridline: {
		enabled: false
	}
} as BarTooltipOptions);

// We setup no axes by default, the TwoDimensionalAxes component
// Will setup axes options based on what user provides
export const axes: AxesOptions = { };

export const timeScale: TimeScaleOptions = {
	addSpaceOnEdges: true
};

/**
 * Base chart options common to any chart
 */
const chart: BaseChartOptions = {
	width: "100%",
	height: "100%",
	resizable: true,
	theme: ChartTheme.DEFAULT,
	tooltip: baseTooltip,
	legend,
	style: {
		prefix: "cc"
	}
};

/**
 * Options common to any chart with an axis
 */
const axisChart: AxisChartOptions = Tools.merge({}, chart, {
	axes,
	timeScale,
	grid,
	tooltip: axisChartTooltip
} as AxisChartOptions);

/**
 * options specific to simple bar charts
 */
const baseBarChart: BarChartOptions = Tools.merge({}, axisChart, {
	bars: {
		maxWidth: 16
	},
	timeScale: Tools.merge(timeScale, {
		addSpaceOnEdges: true
	} as TimeScaleOptions),
	tooltip: barChartTooltip
} as BarChartOptions);

/**
 * options specific to simple bar charts
 */
const simpleBarChart: BarChartOptions = Tools.merge({}, baseBarChart, {

} as BarChartOptions);

/**
 * options specific to simple bar charts
 */
const groupedBarChart: BarChartOptions = Tools.merge({}, baseBarChart, {

} as BarChartOptions);

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
		}
	}
} as PieChartOptions);

/**
 * options specific to donut charts
 */
const donutChart: DonutChartOptions = Tools.merge({}, pieChart, {
	donut: {
		center: {
			numberFontSize: radius => Math.min((radius / 100) * 24, 24) + "px",
			titleFontSize: radius => Math.min((radius / 100) * 15, 15) + "px",
			titleYPosition: radius => Math.min((radius / 80) * 20, 20)
		}
	}
} as DonutChartOptions);

export const options = {
	chart,
	axisChart,
	simpleBarChart,
	groupedBarChart,
	stackedBarChart,
	lineChart,
	scatterChart,
	pieChart,
	donutChart
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
