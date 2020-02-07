import { LegendOptions, TooltipOptions, GridOptions, AxesOptions } from "./index";
import { AxisTooltipOptions, BarTooltipOptions, BarOptions, StackedBarOptions } from "./components";

/**
 * Base chart options common to any chart
 */
export interface BaseChartOptions {
	/**
	 * boolean to disable animations (enabled by default)
	 */
	animations?: boolean;
	/**
	 * boolean to prevent the container from resizing
	 */
	resizable?: boolean;
	/**
	 * Optionally specify a width for the chart
	 */
	width?: string;
	/**
	 * Optionally specify a height for the chart
	 */
	height?: string;
	/**
	 * tooltip configuration
	 */
	tooltip?: TooltipOptions;
	/**
	 * legend configuration
	 */
	legend?: LegendOptions;
	/**
	 * Optional function to determine whether is filled based on datasetLabel, label, and/or data
	 */
	getIsFilled?: (datasetLabel: any, label?: any, data?: any, defaultFilled?: boolean) => boolean;
	/**
	 * Optional function to generate the fill color based on datasetLabel, label, and/or data
	 */
	getFillColor?: (datasetLabel: any, label?: any, data?: any, defaultFillColor?: string) => string;
	/**
	 * Optional function to generate the stroke color based on datasetLabel, label, and/or data
	 */
	getStrokeColor?: (datasetLabel: any, label?: any, data?: any, defaultStrokeColor?: string) => string;
	/**
	 * stylesheet options
	 */
	style?: {
		/**
		 * optional prefixing string for css classes (defaults to 'cc')
		 */
		prefix?: String;
	};
}

/**
 * Options common to any chart with an axis
 */
export interface AxisChartOptions extends BaseChartOptions {
	axes?: AxesOptions;
	grid?: GridOptions;
	tooltip?: AxisTooltipOptions;
}

/**
 * options specific to bar charts
 */
export interface BarChartOptions extends AxisChartOptions {
	bars?: BarOptions;
	tooltip?: BarTooltipOptions;
}

/**
 * options specific to stacked bar charts
 */
export interface StackedBarChartOptions extends BarChartOptions {
	bars?: StackedBarOptions;
}

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
		fillOpacity?: number;
	};
}

/**
 * options specific to line charts
 */
export interface LineChartOptions extends ScatterChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | {
		name: string;
	};
}

/**
 * options specific to pie charts
 */
export interface PieChartOptions extends BaseChartOptions {
	pie?: {
		radiusOffset?: number;
		innerRadius?: number;
		padAngle?: number;
		hoverArc?: {
			outerRadiusOffset?: number;
		};
		xOffset?: number;
		yOffset?: number;
		yOffsetCallout?: number;
		callout?: {
			minSliceDegree?: number;
			offsetX?: number,
			offsetY?: number;
			horizontalLineLength?: number;
			textMargin?: number;
		},
		labels?: {
			formatter?: Function;
		}
	};
}



/**
 * options specific to donut charts
 */
export interface DonutChartOptions extends PieChartOptions {
	donut?: {
		center?: {
			numberFontSize?: Function;
			titleFontSize?: Function;
			titleYPosition?: Function;
			numberFormatter?: Function;
		};
	};
}
