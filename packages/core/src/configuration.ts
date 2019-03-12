import { ScaleBand, ScaleLinear } from "d3-scale";
import { Tools } from "./tools";

/*
 **********************
 * chart config enums *
 **********************
 */

/**
 * enum of all supported charts
 */
export enum ChartType {
	BAR = "bar",
	LINE = "line",
	SCATTER = "scatter",
	PIE = "pie",
	DONUT = "donut",
	COMBO = "combo"
}

/**
 * enum of all possible tooltip sizes
 */
export enum TooltipSize {
	COMPACT = "compact",
	FULL = ""
}

/**
 * enum of all possible threshold themes
 */
export enum ThresholdTheme {
	SUCCESS = "success",
	ERROR = "error",
	WARNING = "warning"
}

/*
 *****************************
 * User configurable options *
 *****************************
 */

/**
 * Base chart options common to any chart
 */
export interface BaseChartOptions {
	/**
	 * Internal property to track what type of chart should be instantiated
	 */
	type?: ChartType;
	/**
	 * boolean to enable accessibility mode
	 */
	accessibility?: boolean;
	/**
	 * boolean to disable animations (enabled by default)
	 */
	animations?: boolean;
	/**
	 * boolean to enable/disable legend interactivity
	 */
	legendClickable?: boolean;
	/**
	 * boolean to prevent the container from resizing
	 */
	containerResizable?: boolean;
	/**
	 * array of hex colors for the chart to render from
	 */
	colors: Array<string>;
	/**
	 * tooltip configuration
	 */
	tooltip?: {
		/**
		 * specify the size of the tooltip
		 */
		size: TooltipSize;
		/**
		 * a function to format the tooltip contents
		 */
		formatter: Function;
	};
	/**
	 * customize the loading overlay contents
	 */
	loadingOverlay?: {
		/**
		 * raw html to be injected into the loading container
		 */
		innerHTML: string;
	};
	/**
	 * Optional function to generate the fill color based on datasetLabel, label, and/or value
	 */
	getFillColor?: (datasetLabel: any, label?: any, value?: any) => string;
	/**
	 * Optional function to generate the stroke color based on datasetLabel, label, and/or value
	 */
	getStrokeColor?: (datasetLabel: any, label?: any, value?: any) => string;
	/**
	 * Optionally specify a width for the chart
	 */
	width?: number;
	/**
	 * Optionally specify a height for the chart
	 */
	height?: number;
	/**
	 * Internal property to track keys in the legend
	 */
	keys?: Object;
}
/**
 * Base chart options common to any chart
 */
const baseOptions: BaseChartOptions = {
	legendClickable: true,
	containerResizable: true,
	colors: [
		"#00a68f",
		"#3b1a40",
		"#473793",
		"#3c6df0",
		"#56D2BB"
	],
	tooltip: {
		size: TooltipSize.FULL,
		formatter: null
	},
	loadingOverlay: {
		innerHTML: `
		<div class="loading-overlay-content">
		  <div data-loading class="bx--loading bx--loading--small">
			<svg class="bx--loading__svg" viewBox="-75 -75 150 150">
				<title>Loading</title>
				<circle cx="0" cy="0" r="37.5" />
			</svg>
		  </div>

		  <p>Loading</p>
		</div>
		`
	}
};

/**
 * Options specific to pie charts
 */
export type PieChartOptions = BaseChartOptions;
/**
 * Options specific to pie charts
 */
const pieOptions: PieChartOptions = Tools.merge({}, baseOptions);

/**
 * Options specific to donut charts
 */
export interface DonutChartOptions extends PieChartOptions {
	center?: {
		label: string;
		number: string;
	};
	centerLabel?: string;
	centerNumber?: string;
}

const donutOptions: DonutChartOptions = Tools.merge({}, baseOptions);

/**
 * represents a threshold visually bringing attention to specific values/issues
 */
export interface Threshold {
	/**
	 * range of values the threshold should apply to
	 */
	range: Array<number>;
	/**
	 * theme of the threshold
	 */
	theme: ThresholdTheme;
}

/**
 * options to configure a scale. not all options are used by all scales
 */
export interface ScaleOptions {
	/**
	 * optional title for the scales
	 */
	title?: string;
	/**
	 * function to adjust the min value
	 */
	maxValueAdjuster?: Function;
	/**
	 * function to adjust the max value
	 */
	minValueAdjuster?: Function;
	/**
	 * function to format the ticks
	 */
	formatter?: Function;
	/**
	 * tick configuration
	 */
	ticks?: {
		/**
		 * maximum ... number of ticks?
		 */
		max: number;
		/**
		 * minumum ... number of ticks?
		 */
		min: number;
	};
	/**
	 * configuration for the thresholds
	 */
	thresholds?: Array<Threshold>;
}

/**
 * options to configure a Y (vertical) scale
 */
export interface YScaleOptions extends ScaleOptions {
	/**
	 * boolean to indicate whether data should be stacked
	 */
	stacked?: boolean;
}

/**
 * options for the x, y, and y2 scales/axis
 */
export interface Scales {
	x: ScaleOptions;
	y: YScaleOptions;
	y2?: YScaleOptions;
}

export interface Axis {
	x: ScaleBand<any>;
	y: ScaleLinear<any, any>;
	y2: ScaleLinear<any, any>;
}

/**
 * Options common to any chart with an axis
 */
export interface AxisChartOptions extends BaseChartOptions {
	/**
	 * scale configuration
	 */
	scales?: Scales;
	axis?: Axis;
}
/**
 * Options common to any chart with an axis
 */
const axisOptions: AxisChartOptions = Tools.merge({}, baseOptions, {
	scales: {
		x: {
			domain: null,
			ticks: 5
		},
		y: {
			domain: null,
			ticks: 5
		},
		ySecondary: {
			domain: null,
			ticks: 10
		}
	}
});

/**
 * options specific to line charts
 */
export interface LineChartOptions extends AxisChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | {
		name: string;
	};
	/**
	 * options for the line points
	 */
	points?: {
		/**
		 * sets the radius of the point
		 */
		radius: number;
	};
}
/**
 * options specific to line charts
 */
const lineOptions: LineChartOptions = Tools.merge({}, axisOptions, {
	points: {
		// default point radius to 4
		radius: 4
	}
});

/**
 * options specific to scatter charts
 */
export interface ScatterChartOptions extends AxisChartOptions {
	/**
	 * options for the points
	 */
	points?: {
		/**
		 * sets the radius of the point
		 */
		radius: number;
	};
}
/**
 * options specific to line charts
 */
const scatterOptions: ScatterChartOptions = Tools.merge({}, axisOptions, {
	points: {
		// default point radius to 4
		radius: 4
	}
});

/**
 * options specific to bar charts
 */
export interface BarChartOptions extends AxisChartOptions {
	/**
	 * options for all bars
	 */
	bars?: {
		/**
		 * constrains the bars to a maximum width
		 */
		maxWidth: number;
	};
}
/**
 * options specific to bar charts
 */
const barOptions: BarChartOptions = Tools.merge({}, axisOptions);

/**
 * options specific to bar charts
 */
export type StackedBarChartOptions = BarChartOptions;
/**
 * options specific to bar charts
 */
const stackedBarOptions: StackedBarChartOptions = Tools.merge({}, barOptions);

/**
 * Options specific to combo charts.
 *
 * This interface also extends all other AxisChartOption interfaces as the single config is shared across all charts in a combo
 */
export interface ComboChartOptions extends AxisChartOptions, BarChartOptions, LineChartOptions, ScatterChartOptions { }
/**
 * Options specific to combo charts.
 *
 */
const comboOptions: ComboChartOptions = Tools.merge({}, axisOptions, barOptions, lineOptions, scatterOptions);

/**
 * Configuration passed to the chart.
 *
 * Includes options and data
 */
export interface ChartConfig<T extends BaseChartOptions> {
	options: T;
	data: ChartData | Promise<ChartData>;
}

export const options = {
	BASE: baseOptions,
	AXIS: axisOptions,
	LINE: lineOptions,
	SCATTER: scatterOptions,
	BAR: barOptions,
	STACKED_BAR: stackedBarOptions,
	COMBO: comboOptions,
	PIE: pieOptions,
	DONUT: donutOptions
};

export interface DataSet {
	/**
	 * Label for the dataset
	 */
	label: string;
	/**
	 * Array of hex background colors
	 */
	backgroundColors: Array<string>;
	/**
	 * Array of data values
	 */
	data: Array<any>;
	/**
	 * chartType - only used with combo charts
	 */
	chartType?: ChartType;
}

export interface ChartData {
	/**
	 * Labels for the x (horizontal) axis. Should match the number of items in each dataset data array
	 */
	labels: Array<string>;
	/**
	 * Array of datasets to display in the chart
	 */
	datasets: Array<DataSet>;
}

/*
 ********************************************
 * Internal (non-user configurable) options *
 ********************************************
 */

/**
 * General chart options. margins, min/max widths, etc
 */
export const charts = {
	margin: {
		top: 20,
		bottom: 60,
		left: 60,
		right: 20,
		bar: {
			top: 0,
			right: -40,
			bottom: 50,
			left: 40
		},
		line: {
			top: 0,
			right: -40,
			bottom: 50,
			left: 40
		}
	},
	resetOpacity: {
		opacity: 1,
		circle: {
			fill: "white"
		},
		outline: "grey"
	},
	reduceOpacity: {
		opacity: 0.25,
		outline: "grey"
	},
	points: {
		radius: 4
	},
	patternFills: {
		width: 20,
		height: 20
	},
	minWidth: 150,
	widthBreak: 600,
	marginForLegendTop: 40,
	magicRatio: 0.7,
	magicMoreForY2Axis: 70,
	axisCharts: {
		minWidth: 100,
		minHeight: 200
	}
};

/**
 * Options to render scales to spec
 */
export const scales = {
	maxWidthOfAxisLabel: 175,
	maxNumOfAxisLabelLetters: 60,
	yAxisAngle: -90,
	xAxisAngle: -45,
	domain: {
		color: "#959595",
		strokeWidth: 2
	},
	dx: "-1em",
	label: {
		dy: "1em"
	},
	tick: {
		dy: "0.5em",
		widthAdditionY: 25,
		widthAdditionY2: 15,
		heightAddition: 16,
		lineHeight: 1.1
	},
	magicDy1: "0.71em",
	magicY1: 9,
	magicX1: -4,
	y: {
		numberOfTicks: 5,
		thresholds: {
			colors: {
				"danger": "rgba(255, 39, 41, 0.1)",
				"success": "rgba(0, 212, 117, 0.1)",
				"warning": "rgba(255, 214, 0, 0.1)"

			}
		}
	},
	x: {
		numberOfTicks: 5,
		padding: 0.2
	},
	y2: {
		numberOfTicks: 5
	}
};

/**
 * Grid options
 */
export const grid = {
	strokeColor: "#ECEEEF"
};

/**
 * Options for bar behaviour
 */
export const bars = {
	mouseover: {
		strokeWidth: 4,
		strokeOpacity: 0.5
	},
	mouseout: {
		strokeWidth: 0,
		strokeWidthAccessible: 2,
		strokeOpacity: 1
	},
	default: {
		strokeWidth: 2
	},
	spacing: {
		bars: 0.2,
		datasets: 0.25
	},
	bars: {
		maxWidth: null
	}
};

/**
 * Options for line behaviour
 */
export const lines = {
	points: {
		strokeWidth: 4,
		minNonFilledRadius: 4,
		mouseover: {
			strokeWidth: 4,
			strokeOpacity: 0.5
		},
		mouseout: {
			strokeWidth: 0,
			strokeWidthAccessible: 2,
			strokeOpacity: 1
		}
	}
};

/**
 * Options for pie behaviour
 */
export const pie = {
	maxWidth: 516.6,
	mouseover: {
		strokeWidth: 6,
		strokeOpacity: 0.5
	},
	mouseout: {
		strokeWidth: 0,
		strokeOpacity: 1
	},
	sliceLimit: 6,
	label: {
		dy: ".32em",
		margin: 8,
		other: "Other"
	},
	default: {
		strokeWidth: 2
	}
};

/**
 * Options for donut behaviour
 */
export const donut = {
	centerText: {
		title: {
			y: 22
		},
		breakpoint: 175,
		magicScaleRatio: 2.5,
		numberFontSize: 24,
		titleFontSize: 15
	}
};

/**
 * Legend configuration
 */
export const legend = {
	countBreak: 4,
	fontSize: 12,
	wrapperHeight: "40px",
	widthTolerance: 15,
	hoverShadowSize: "3px",
	hoverShadowTransparency: 0.2,
	margin: {
		top: 19
	},
	active: {
		borderColor: false,
		borderStyle: false,
		borderWidth: false
	},
	inactive: {
		backgroundColor: "white",
		borderStyle: "solid",
		borderWidth: "2px"
	},
	items: {
		status: {
			ACTIVE: 1,
			DISABLED: 0
		},
	},
	basedOn: {
		SERIES: "series",
		LABELS: "labels"
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
	magicLeft2: 12,
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
		duration: 750
	}
};

/**
 * Selectors to standardize querying parts of the chart
 */
export const selectors = {
	OUTERSVG: "svg.chart-svg",
	INNERWRAP: "g.inner-wrap",
	CHARTWRAPPER: "div.chart-wrapper",
	TOOLTIP: "div.chart-tooltip",
	LEGEND_BTN: "li.legend-btn",
	pie: {
		SLICE: "path"
	}
};
