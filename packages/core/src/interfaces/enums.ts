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
 * enum of all possible axis positions
 */
export enum AxisPositions {
	LEFT = "axisLeft",
	RIGHT = "axisRight",
	TOP = "axisTop",
	BOTTOM = "axisBottom"
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

/**
 * enum of all possible layout directions
 */
export enum LayoutDirection {
	ROW = "row",
	COLUMN = "column",
	ROW_REVERSE = "row-reverse",
	COLUMN_REVERSE = "column-reverse"
}

/**
 * enum of all possible layout growth values
 */
export enum LayoutGrowth {
	FIXED = "fixed",
	PREFERRED = "preferred",
	STRETCH = "stretch",
}


/**
 * enum of all possible layout growth values
 */
export enum ModelStateKeys {
	AXIS_PRIMARY = "axis-primary",
	AXIS_SECONDARY = "axis-secondary",
	AXIS_THIRD = "axis-third",
	AXIS_FOURTH = "axis-fourth"
}
