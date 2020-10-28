import { ZoomBarTypes } from "./interfaces";

export const area = {
	opacity: {
		unselected: 0,
		selected: 0.4
	}
};

export const axis = {
	ticks: {
		number: 7,
		rotateIfSmallerThan: 30,
		verticalSpaceRatio: 2.5,
		horizontalSpaceRatio: 3.5
	},
	paddingRatio: 0.1
};

export const legend = {
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

export const lines = {
	opacity: {
		unselected: 0.3,
		selected: 1
	}
};

export const meter = {
	statusBar: {
		paddingRight: 5
	},
	status: {
		indicatorSize: 16,
		paddingLeft: 15
	}
};

export const pie = {
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
};

export const radar = {
	opacity: {
		unselected: 0.1,
		selected: 0.3
	},
	xLabelPadding: 10,
	yLabelPadding: 8,
	yTicksNumber: 4,
	minRange: 10,
	xAxisRectHeight: 50,
	dotsRadius: 5
};

export const spacers = {
	default: {
		size: 24
	}
};

export const tooltips = {
	horizontalOffset: 10
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

export const toolbar = {
	buttonSize: 32,
	iconSize: 20,
	height: 32,
	spacerHeight: 10,
	iconPadding: 6
};

export const zoomBar = {
	height: {
		[ZoomBarTypes.GRAPH_VIEW]: 32,
		[ZoomBarTypes.SLIDER_VIEW]: 10
	},
	spacerHeight: 8,
	handleWidth: 5,
	handleBarWidth: 1,
	handleBarHeight: 12
};
