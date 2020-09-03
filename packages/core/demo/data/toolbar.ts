import * as areaChart from "./area";
import * as barChart from "./bar";
import * as lineChart from "./line";
import * as pieChart from "./pie";

// utility function to update title and enable toolbar option
const addToolbarOptions = (
	options,
	configs: any = { enableZoomBar: false, enableResetZoom: false }
) => {
	options.experimental = true;

	let titlePostfix = " - enable Toolbar";
	options.toolbar = {
		enabled: true
	};
	if (configs.enableZoomBar) {
		titlePostfix += ", Zoom bar";
		options.zoomBar = {
			top: {
				enabled: true
			}
		};
	}
	if (configs.enableResetZoom) {
		titlePostfix += ", Reset Zoom";
		options.toolbar.overflowMenuItems = {
			resetZoom: {
				enabled: true
			}
		};
	}
	options.title += titlePostfix;
	return options;
};

export const toolbarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const toolbarStackedBarTimeSeriesOptions = addToolbarOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions),
	{ enableZoomBar: true }
);

export const toolbarLineTimeSeriesData = lineChart.lineTimeSeriesData;
export const toolbarLineTimeSeriesOptions = addToolbarOptions(
	Object.assign({}, lineChart.lineTimeSeriesOptions),
	{ enableZoomBar: true, enableResetZoom: true }
);
