import { Tools } from "./tools";
import {
	BaseChartOptions,
	AxisChartOptions,
	ScatterChartOptions,
	LineChartOptions,
	GridOptions,
	AxesOptions,
	BarChartOptions,
} from "./interfaces/index";

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Base chart options common to any chart
 */
const baseOptions: BaseChartOptions = {
	legend: {
		clickable: true
	},
	resizable: true,
	tooltip: {
		formatter: null
	}
};

// /**
//  * Options specific to pie charts
//  */
// export type PieChartOptions = BaseChartOptions;
// /**
//  * Options specific to pie charts
//  */
// const pieOptions: PieChartOptions = Tools.merge({}, baseOptions);

// const donutOptions: DonutChartOptions = Tools.merge({}, baseOptions);

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
const axisChart: AxisChartOptions = Tools.merge({}, baseOptions, {
	axes,
	grid
});

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
});

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
});

// /**
//  * options specific to bar charts
//  */
// const barOptions: BarChartOptions = Tools.merge({}, axisOptions);

// /**
//  * options specific to bar charts
//  */
// export type StackedBarChartOptions = BarChartOptions;
// /**
//  * options specific to bar charts
//  */
// const stackedBarOptions: StackedBarChartOptions = Tools.merge({}, barOptions);

// /**
//  * Options specific to combo charts.
//  *
//  */
// const comboOptions: ComboChartOptions = Tools.merge({}, axisOptions, barOptions, lineOptions, scatterOptions);

export const options = {
	baseOptions,
	axisChart,
	stackedBarChart,
	lineChart,
	scatterChart
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

// /**
//  * Options for pie behaviour
//  */
// export const pie = {
// 	maxWidth: 516.6,
// 	mouseover: {
// 		strokeWidth: 6,
// 		strokeOpacity: 0.5
// 	},
// 	mouseout: {
// 		strokeWidth: 0,
// 		strokeOpacity: 1
// 	},
// 	sliceLimit: 6,
// 	label: {
// 		dy: ".32em",
// 		margin: 8,
// 		other: "Other",
// 		fontSize: 12
// 	},
// 	callout : {
// 		sliceDegreeThreshold: 5,
// 		calloutOffsetX: 15,
// 		calloutOffsetY: 12,
// 		calloutTextMargin: 2,
// 		horizontalLineLength: 8,
// 		direction: {
// 			LEFT: "left",
// 			RIGHT: "right"
// 		}
// 	},
// 	default: {
// 		strokeWidth: 2
// 	},
// 	paddingLeft: 20
// };

// /**
//  * Options for donut behaviour
//  */
// export const donut = {
// 	centerText: {
// 		title: {
// 			y: 22
// 		},
// 		breakpoint: 175,
// 		magicScaleRatio: 2.5,
// 		numberFontSize: 24,
// 		titleFontSize: 15
// 	}
// };

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
	size: {
		COMPACT: "compact"
	}
};

/**
 * Base transition configuration
 */
export const transitions = {
	default: {
		duration: 300
	},
	pie_slice_hover: {
		duration: 100
	},
	pie_chart_titles: {
		duration: 375
	}
};
