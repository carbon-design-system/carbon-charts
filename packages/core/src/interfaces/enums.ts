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