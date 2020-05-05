import marked from "marked";

export const axisChartOptions = marked(`
# Options - Axis charts

These options extend the base chart options to provide configurations specific to axis charts.

The options available with axis charts are:
\`\`\`js
export interface AxisChartOptions extends BaseChartOptions {
	axes?: AxesOptions;
	grid?: GridOptions;
	tooltip?: AxisTooltipOptions;
}
\`\`\`


#### AxesOptions
Each property corresponds to one of the 4 axes of a chart and defines options for that axis using the \`AxisOptions\` interface.

\`\`\`js
export interface AxesOptions {
	left?: AxisOptions;
	bottom?: AxisOptions;
	right?: AxisOptions;
	top?: AxisOptions;
}
\`\`\`


#### AxisOptions
Options for an axis of the chart. It includes defining a title and configuring the scale for the axis.

\`\`\`js
/**
 * options to configure a scale. not all options are used by all scales
 */
export interface AxisOptions {
	/**
	 * type of the scale used on axis
	 */
	scaleType?: ScaleTypes;
	/**
	 * Whether the Axis should use the specified domain
	 * instead of it being dynamically generated based on data extents.
	 * The type of values should depend on the scale type.
	 * Example for continuous axis scale: [-100, 100]
	 * Example for discrete axis scale: ['Qty', 'More', 'Sold']
	 */
	domain?: AxisDomain[];
	/**
	* Whether the Axis should be forced to include 0 as a starting point
	* (or ending point, in case of all negative axis).
	* Default: true
	*/
	includeZero?: boolean;
	/**
	 * identifies what key within the data the axis values would map to
	 */
	mapsTo?: string;
	/**
	 * optional title for the scales
	 */
	title?: string;
	/**
	 * tick configuration
	 */
	ticks?: {
		/**
		 * number of ticks to show
		 */
		number?: number;
		/**
		 * minimum tick value
		 */
		min?: number;
		/**
		 * maximum tick value
		 */
		max?: number;
		/**
		 * minimum width of a tick
		 * before getting rotated (in pixels)
		 */
		rotateIfSmallerThan?: number;
		/**
		 * function to format the ticks
		 */
		formatter?: Function;
	};
}
\`\`\`

GridOptions


TooltiOptions
For more information on tooltip configurations within carbon charts please see the complete tooltips guidance.
`);
