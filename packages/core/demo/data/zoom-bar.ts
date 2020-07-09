import * as areaChart from "./area";
import * as barChart from "./bar";
import * as bubbleChart from "./bubble";
import * as lineChart from "./line";
import * as scatterChart from "./scatter";
import * as stepChart from "./step";
import * as timeSeriesAxisChart from "./time-series-axis";

// default function for selection callback
const selectionStartFun = (selection, domain) => {
	console.log("ZoomBar SelectionStart callback!");
	console.log(selection);
	console.log(domain);
};
const selectionInProgressFun = (selection, domain) => {
	console.log("ZoomBar SelectionInProgress callback!");
	console.log(selection);
	console.log(domain);
};
const selectionEndFun = (selection, domain) => {
	console.log("ZoomBar SelectionEnd callback!");
	console.log(selection);
	console.log(domain);
};

const initialZoomDomain = [
	new Date(2020, 11, 10, 23, 59, 25),
	new Date(2020, 11, 11, 0, 0, 25)
];

const defaultZoomBarOptions = {
	enabled: true,
	selectionStart: selectionStartFun,
	selectionInProgress: selectionInProgressFun,
	selectionEnd: selectionEndFun
};

// utility function to update title and enable zoomBar option
const addZoomBarToOptions = (options) => {
	options["title"] = options["title"] + " - Zoom bar enabled";
	options["zoomBar"] = Object.assign({}, defaultZoomBarOptions);
	return options;
};

export const zoomBarStackedAreaTimeSeriesData =
	areaChart.stackedAreaTimeSeriesData;
export const zoomBarStackedAreaTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, areaChart.stackedAreaTimeSeriesOptions)
);

export const zoomBarSimpleBarTimeSeriesData = barChart.simpleBarTimeSeriesData;
export const zoomBarSimpleBarTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, barChart.simpleBarTimeSeriesOptions)
);

export const zoomBarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const zoomBarStackedBarTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions)
);

export const zoomBarBubbleTimeSeriesData = bubbleChart.bubbleTimeSeriesData;
export const zoomBarBubbleTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, bubbleChart.bubbleTimeSeriesOptions)
);

export const zoomBarLineTimeSeriesData = lineChart.lineTimeSeriesData;
export const zoomBarLineTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, lineChart.lineTimeSeriesOptions)
);

export const zoomBarScatterTimeSeriesData = scatterChart.scatterTimeSeriesData;
export const zoomBarScatterTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, scatterChart.scatterTimeSeriesOptions)
);

export const zoomBarStepTimeSeriesData = stepChart.stepTimeSeriesData;
export const zoomBarStepTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, stepChart.stepTimeSeriesOptions)
);

export const zoomBarLineTimeSeries15secondsData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeries15secondsOptions = addZoomBarToOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions)
);

export const zoomBarLineTimeSeriesInitDomainData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeriesInitDomainOptions = addZoomBarToOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions)
);
zoomBarLineTimeSeriesInitDomainOptions["title"] += " zoomed domain";
zoomBarLineTimeSeriesInitDomainOptions.zoomBar.initialZoomDomain = initialZoomDomain;
