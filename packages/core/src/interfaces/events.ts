/**
 * enum of all axis-related events
 */
export enum Axis {
	LABEL_MOUSEOVER = "axis-label-mouseover",
	LABEL_MOUSEMOVE = "axis-label-mousemove",
	LABEL_CLICK = "axis-label-click",
	LABEL_MOUSEOUT = "axis-label-mouseout"
}

/**
 * enum of all pie graph events
 */
export enum Pie {
	SLICE_MOUSEOVER = "pie-slice-mouseover",
	SLICE_MOUSEMOVE = "pie-slice-mousemove",
	SLICE_CLICK = "pie-slice-click",
	SLICE_MOUSEOUT = "pie-slice-mouseout"
}

/**
 * enum of all bar graph events
 */
export enum Bar {
	BAR_MOUSEOVER = "bar-mouseover",
	BAR_MOUSEMOVE = "bar-mousemove",
	BAR_CLICK = "bar-click",
	BAR_MOUSEOUT = "bar-mouseout"
}

/**
 * enum of all scatter graph events
 */
export enum Scatter {
	SCATTER_MOUSEOVER = "scatter-mouseover",
	SCATTER_MOUSEMOVE = "scatter-mousemove",
	SCATTER_CLICK = "scatter-click",
	SCATTER_MOUSEOUT = "scatter-mouseout"
}

/**
 * enum of all line graph events
 */
export enum Line {
	POINT_MOUSEOVER = "scatter-mouseover",
	POINT_MOUSEMOVE = "scatter-mousemove",
	POINT_CLICK = "scatter-click",
	POINT_MOUSEOUT = "scatter-mouseout"
}

/**
 * enum of all tooltip events
 */
export enum Tooltip {
	SHOW = "show-tooltip",
	HIDE = "hide-tooltip"
}
