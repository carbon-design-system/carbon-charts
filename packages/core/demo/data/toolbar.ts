import * as barChart from './bar';
import * as lineChart from './line';

// utility function to enable toolbar option
const addToolbarOptions = (options, configs?) => {
	options.toolbar = {
		enabled: true,
	};
	options.zoomBar = {
		top: {
			enabled: true,
		},
	};
	options.toolbar.controls = [
		{
			type: 'Zoom in',
		},
		{
			type: 'Zoom out',
		},
		{
			type: 'Reset zoom',
		},
	];

	if (configs) {
		if (configs.titleSuffix) {
			options.title += configs.titleSuffix;
		}
		if (configs.numberOfIcons) {
			options.toolbar.numberOfIcons = configs.numberOfIcons;
		}
		if (configs.controls) {
			options.toolbar.controls = configs.controls;
		}
	}

	return options;
};

export const toolbarStackedBarTimeSeriesData =
	barChart.stackedBarTimeSeriesData;
export const toolbarStackedBarTimeSeriesOptions = addToolbarOptions(
	Object.assign({}, barChart.stackedBarTimeSeriesOptions)
);

export const toolbarLineTimeSeriesData = lineChart.lineTimeSeriesData;
export const toolbarLineTimeSeriesOptions = addToolbarOptions(
	Object.assign({}, lineChart.lineTimeSeriesOptions),
	{
		titleSuffix: ' - two icons',
		numberOfIcons: 2,
		controls: [
			{
				type: 'Reset zoom',
			},
			{
				type: 'Zoom in',
			},
			{
				type: 'Zoom out',
			},
		],
	}
);
