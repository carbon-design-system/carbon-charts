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

const initZoomDomain = [
	new Date(2020, 11, 10, 23, 59, 25),
	new Date(2020, 11, 11, 0, 0, 25)
];

const defaultZoomBarOptions = {
	enabled: true,
	initZoomDomain: undefined,
	selectionStart: selectionStartFun,
	selectionInProgress: selectionInProgressFun,
	selectionEnd: selectionEndFun
};

// utility function to update title and enable zoomBar option
const updateOptions = (options) => {
	options["title"] = options["title"] + " - Zoom bar enabled";
	options["zoomBar"] = Object.assign({}, defaultZoomBarOptions);
	return options;
};

export const zoomBarStackedAreaTimeSeriesData =
	areaChart.stackedAreaTimeSeriesData;
export const zoomBarStackedAreaTimeSeriesOptions = updateOptions(
	Object.assign({}, areaChart.stackedAreaTimeSeriesOptions)
);

export const zoomBarSimpleBarTimeSeriesData = barChart.simpleBarTimeSeriesData;
export const zoomBarSimpleBarTimeSeriesOptions = updateOptions(
	Object.assign({}, barChart.simpleBarTimeSeriesOptions)
);

export const zoomBarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const zoomBarStackedBarTimeSeriesOptions = updateOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions)
);

export const zoomBarBubbleTimeSeriesData = bubbleChart.bubbleTimeSeriesData;
export const zoomBarBubbleTimeSeriesOptions = updateOptions(
	Object.assign({}, bubbleChart.bubbleTimeSeriesOptions)
);

export const zoomBarLineTimeSeriesData = lineChart.lineTimeSeriesData;
export const zoomBarLineTimeSeriesOptions = updateOptions(
	Object.assign({}, lineChart.lineTimeSeriesOptions)
);

export const zoomBarScatterTimeSeriesData = scatterChart.scatterTimeSeriesData;
export const zoomBarScatterTimeSeriesOptions = updateOptions(
	Object.assign({}, scatterChart.scatterTimeSeriesOptions)
);

export const zoomBarStepTimeSeriesData = stepChart.stepTimeSeriesData;
export const zoomBarStepTimeSeriesOptions = updateOptions(
	Object.assign({}, stepChart.stepTimeSeriesOptions)
);

export const zoomBarLineTimeSeries15secondsData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeries15secondsOptions = updateOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions)
);

export const zoomBarLineTimeSeriesInitDomainData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeriesInitDomainOptions = updateOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions)
);
zoomBarLineTimeSeriesInitDomainOptions["title"] += " with initial zoom domain";
zoomBarLineTimeSeriesInitDomainOptions.zoomBar.initZoomDomain = initZoomDomain;
