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
	LEFT = "left",
	RIGHT = "right",
	TOP = "top",
	BOTTOM = "bottom"
}

export enum AxisTypes {
	PRIMARY = "primary",
	SECONDARY = "secondary"
}

/**
 * enum of all possible scale types
 */
export enum ScaleTypes {
	TIME = "time",
	LINEAR = "linear",
	LOG = "log",
	LABELS = "labels"
}


/**
 * enum of all possible scale identifiers
 */
export enum ScaleIdentifiers {
	LABEL = "label",
	VALUE = "value"
}

/**
 * enum of all possible legend positions
 */
export enum LegendPositions {
	RIGHT = "right",
	LEFT = "left",
	TOP = "top",
	BOTTOM = "bottom"
}

/**
 * enum of all possible legend orientations
 */
export enum LegendOrientations {
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical"
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
	/*
	 * AXIS RELATED KEYS
	 */
	AXIS_PRIMARY = "axis-primary",
	AXIS_SECONDARY = "axis-secondary",
	AXIS_THIRD = "axis-third",
	AXIS_FOURTH = "axis-fourth",
	/*
	 * DOM Elements
	 */
	HOLDER = "holder"
}
