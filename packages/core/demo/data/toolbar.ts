import * as barChart from './bar';
import * as lineChart from './line';

// utility function to enable toolbar option
const addToolbarOptions = (options, configs?) => {
	options.toolbar = {
		enabled: true,
		numberOfIcons: 3,
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
		{
			type: 'Custom',
			text: 'Custom button',
			shouldBeDisabled: () => false,
			clickFunction: () => {
				console.log(
					'Custom click function executed. Event `toolbar-button-click` has also been dispatched.'
				);
			},
			iconSVG: {
				content: `<path d="M23,13H18v2h5v2H19a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2h6V15A2,2,0,0,0,23,13Zm0,8H19V19h4Z"/>
				<path d="M13,9H9a2,2,0,0,0-2,2V23H9V18h4v5h2V11A2,2,0,0,0,13,9ZM9,16V11h4v5Z"/><rect data-name="&lt;Transparent Rectangle&gt;" width="32" height="32" style="fill: none"/>`,
			},
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

export const toolbarBarSimpleData = barChart.simpleBarData;
export const toolbarBarSimpleOptions = addToolbarOptions(
	Object.assign({}, barChart.simpleBarOptions),
	{
		titleSuffix: ' - overriding export titles',
		numberOfIcons: 1,
		controls: [
			{
				type: 'Export as CSV',
				text: 'Export data as CSV',
			},
			{
				type: 'Export as JPG',
				text: 'Export chart in JPG',
			},
			{
				type: 'Export as PNG',
				text: 'Export chart in PNG',
			},
		],
	}
);
