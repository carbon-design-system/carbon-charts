import * as areaChart from "./area";
import * as barChart from "./bar";
import * as bubbleChart from "./bubble";
import * as lineChart from "./line";
import * as scatterChart from "./scatter";
import * as stepChart from "./step";
import * as timeSeriesAxisChart from "./time-series-axis";

const initialZoomDomain = [
	new Date(2020, 11, 10, 23, 59, 25),
	new Date(2020, 11, 11, 0, 0, 25)
];

const definedZoomBarData = [
	{ date: new Date(2019, 0, 1), value: 10000 },
	{ date: new Date(2019, 0, 2), value: 10 },
	{ date: new Date(2019, 0, 3), value: 75000 },
	{ date: new Date(2019, 0, 5), value: 65000 },
	{ date: new Date(2019, 0, 6), value: 57312 },
	{ date: new Date(2019, 0, 8), value: 10000 },
	{ date: new Date(2019, 0, 13), value: 49213 },
	{ date: new Date(2019, 0, 15), value: 70323 },
	{ date: new Date(2019, 0, 17), value: 51213 },
	{ date: new Date(2019, 0, 19), value: 21300 }
];

const defaultToolBarOptions = {
	enabled: true,
	overflowMenuItems: {
		resetZoom: {
			enabled: true
		}
	}
};

// utility function to update title and enable zoomBar option
const addZoomBarToOptions = (
	options,
	configs: any = { includeDefinedZoomBarData: false }
) => {
	options["experimental"] = true;
	if (configs.includeDefinedZoomBarData) {
		options["title"] = options["title"] + " - Defined zoom bar enabled";
		options["zoomBar"] = {
			top: {
				enabled: true,
				data: definedZoomBarData,
				...(configs.sliderView
					? {
							type: "slider_view"
					  }
					: null)
			}
		};
	} else {
		options["title"] = options["title"] + " - Zoom bar enabled";
		options["zoomBar"] = {
			top: {
				enabled: true,
				...(configs.sliderView
					? {
							type: "slider_view"
					  }
					: null)
			}
		};
	}
	options["toolbar"] = defaultToolBarOptions;
	return options;
};

export const zoomBarStackedAreaTimeSeriesData =
	areaChart.stackedAreaTimeSeriesData;
export const zoomBarStackedAreaTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, areaChart.stackedAreaTimeSeriesOptions)
);

export const zoomBarSimpleBarTimeSeriesData = barChart.simpleBarTimeSeriesData;
export const zoomBarSimpleBarTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, barChart.simpleBarTimeSeriesOptions),
	{ sliderView: true }
);

export const zoomBarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const zoomBarStackedBarTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions)
);

export const definedZoomBarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const definedZoomBarStackedBarTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions),
	{ includeDefinedZoomBarData: true }
);

export const zoomBarBubbleTimeSeriesData = bubbleChart.bubbleTimeSeriesData;
export const zoomBarBubbleTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({}, bubbleChart.bubbleTimeSeriesOptions),
	{ sliderView: true }
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
	Object.assign({}, stepChart.stepTimeSeriesOptions),
	{ sliderView: true }
);

export const zoomBarLineTimeSeries15secondsData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeries15secondsOptions = addZoomBarToOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions)
);

export const zoomBarLineTimeSeriesInitDomainData =
	timeSeriesAxisChart.lineTimeSeriesData15seconds;
export const zoomBarLineTimeSeriesInitDomainOptions = addZoomBarToOptions(
	Object.assign({}, timeSeriesAxisChart.lineTimeSeries15secondsOptions),
	{ sliderView: true }
);
zoomBarLineTimeSeriesInitDomainOptions["title"] += " (initial zoomed domain)";
zoomBarLineTimeSeriesInitDomainOptions.zoomBar.top.initialZoomDomain = initialZoomDomain;

export const zoomBarEmptyStateData = barChart.stackedBarEmptyStateData;
export const zoomBarEmptyStateOptions = addZoomBarToOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions)
);
zoomBarEmptyStateOptions["title"] = "Zoom bar (empty state)";

// assume no data set while loading is true
export const zoomBarSkeletonData = [];
export const zoomBarSkeletonOptions = addZoomBarToOptions(
	Object.assign(
		{
			data: {
				loading: true
			}
		},
		barChart.stackedBarTimeSeriesOptions
	)
);
zoomBarSkeletonOptions["title"] = "Zoom bar (skeleton)";
