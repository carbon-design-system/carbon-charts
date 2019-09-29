import { Tools } from "./tools";
import {
	BaseChartOptions,
	AxisChartOptions,
	ScatterChartOptions,
	LineChartOptions,
	GridOptions,
	AxesOptions,
	BarChartOptions,
	PieChartOptions,
	DonutChartOptions,
} from "./interfaces/index";

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Base chart options common to any chart
 */
const chart: BaseChartOptions = {
	legend: {
		clickable: true
	},
	resizable: true
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
	},
	strokeColor: "#ECEEEF"
};

// We setup no axes by default, the TwoDimensionalAxes component
// Will setup axes options based on what user provides
export const axes: AxesOptions = {};

/**
 * Options common to any chart with an axis
 */
const axisChart: AxisChartOptions = Tools.merge({}, chart, {
	axes,
	grid
} as AxisChartOptions);

/**
 * options specific to line charts
 */
const simpleBarChart: BarChartOptions = Tools.merge({}, axisChart, {
	bars: {
		maxWidth: 16
	}
} as BarChartOptions);

/**
 * options specific to line charts
 */
const stackedBarChart: BarChartOptions = Tools.merge({}, axisChart, {
	bars: {
		maxWidth: 16
	}
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
 * options specific to line charts
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
 * options specific to line charts
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
 * options specific to line charts
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
 * Legend configuration
 */
export const legend = {
	items: {
		status: {
			ACTIVE: 1,
			DISABLED: 0
		},
		horizontalSpace: 12,
		verticalSpace: 24
	},
	checkbox: {
		radius: 6.5,
		spaceAfter: 4
	}
};

/**
 * Tooltip options
 */
export const tooltip = {
	width: 200,
	arrowWidth: 10,
	magicXPoint2: 20,
	magicTop1: 21,
	magicTop2: 22,
	magicLeft1: 11,
	magicLeft2: 10,
	fadeIn: {
		duration: 250
	},
	fadeOut: {
		duration: 250
	},
	axisTooltip: {
		axisThreshold: 0.25
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
