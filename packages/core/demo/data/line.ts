import { timeFormat } from 'd3-time-format';

export const lineData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 },
];

export const lineOptions = {
	title: 'Line (discrete)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
};

export const sparklineLoadingOptions = {
	title: 'Sparkline (loading)',
	axes: {
		bottom: {
			visible: false,
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
		},
		left: {
			visible: false,
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	grid: {
		x: {
			enabled: false,
		},
		y: {
			enabled: false,
		},
	},
	legend: {
		enabled: false,
	},
	tooltip: {
		enabled: false,
	},
	points: {
		enabled: false,
	},
	data: {
		loading: true,
	},
};

export const lineLongLabelData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{
		group: 'Dataset 1',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 42300,
	},
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{
		group: 'Dataset 2',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 21400,
	},
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{
		group: 'Dataset 3',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 1400,
	},
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Qty', value: 22000 },
	{ group: 'LongLabelShouldBeTruncated', key: 'More', value: 1200 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Sold', value: 9000 },
	{
		group: 'LongLabelShouldBeTruncated',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 24000,
		audienceSize: 10,
	},
	{
		group: 'LongLabelShouldBeTruncated',
		key: 'Misc',
		value: 3000,
		audienceSize: 10,
	},
];

export const lineLongLabelOptions = {
	title: 'Truncated labels (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
};

export const lineCustomDomainOptions = {
	title: 'Custom domain (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
			domain: ['Qty', 'More', 'Misc'],
		},
		left: {
			domain: [10000, 50000],
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
};

export const lineSelectedGroupsData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 56000 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 },
];

export const lineSelectedGroupsOptions = {
	title: 'Pre-selected groups (line)',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3'],
	},
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
};

export const lineCustomColorOptions = {
	title: 'Custom colors (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	color: {
		scale: {
			'Dataset 1': '#925699',
			'Dataset 2': '#525669',
			'Dataset 3': '#725699',
			'Dataset 4': '#ccc',
		},
	},
};

export const lineTimeSeriesData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: null },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 27432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 21300 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1), value: 40000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 5), value: null },
	{ group: 'Dataset 3', date: new Date(2019, 0, 8), value: 18000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 13), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 17), value: 61213 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 2), value: 20000 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 6), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 8), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 15), value: 25332 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 19), value: null },
];

export const lineTimeSeriesOptions = {
	title: 'Line (time series)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	curve: 'curveMonotoneX',
};

export const lineTimeSeriesWithThresholdsOptions = {
	title: 'Thresholds (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
			thresholds: [
				{
					value: new Date(2019, 0, 11),
					label: 'Custom formatter',
					valueFormatter: timeFormat('%b %d'),
				},
			],
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
			thresholds: [
				{ value: 55000, label: 'Custom label', fillColor: 'orange' },
				{ value: 10000, fillColor: '#03a9f4' },
			],
		},
	},
	curve: 'curveMonotoneX',
};

export const lineTimeSeriesDenseData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: -10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 5), value: -12000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 10), value: -14000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: -25000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2, 2), value: -26000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: -10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3, 5), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3, 10), value: 12000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 45000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 49000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7, 15), value: 45000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9, 5), value: 52000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9, 15), value: 55000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 10), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 12), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 80000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 14, 10), value: 85000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15, 7), value: 90000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15, 18), value: 70000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 3), value: 22000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 16), value: 24000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 35000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2, 7), value: 36000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3, 6), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3, 18), value: 22000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 5), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7, 15), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9), value: 60000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9, 5), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9, 10), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 12), value: 65000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 14), value: 40000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 5), value: 45000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 10), value: 35000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 18), value: 30000 },
];

export const lineTimeSeriesDenseOptions = {
	title: 'Line (dense time series)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	curve: 'curveMonotoneX',
};

export const lineTimeSeriesDataRotatedTicks = [
	{ group: 'Dataset 1', date: new Date(2019, 11, 30), value: 32100 },
	{ group: 'Dataset 1', date: new Date(2019, 11, 31), value: 23500 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 1), value: 53100 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 2), value: 42300 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 3), value: 12300 },
];

export const lineTimeSeriesRotatedTicksOptions = {
	title: 'Rotated ticks (line)',
	width: '400px',
	axes: {
		bottom: {
			scaleType: 'time',
			mapsTo: 'date',
			ticks: {
				rotation: 'always',
			},
		},
		left: {
			mapsTo: 'value',
		},
	},
	legend: {
		clickable: false,
	},
};

export const lineLogAxisData = [
	{ group: 'Dataset 1', date: new Date(2019, 11, 30), value: 300100 },
	{ group: 'Dataset 1', date: new Date(2019, 11, 31), value: 235000 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 1), value: 153100 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 2), value: 142300 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 3), value: 82300 },
];

export const lineLogAxisOptions = {
	title: 'Log Axis',
	width: '400px',
	axes: {
		bottom: {
			scaleType: 'time',
			mapsTo: 'date',
		},
		left: {
			mapsTo: 'value',
			scaleType: 'log',
			includeZero: false,
		},
	},
};

// line - empty state
export const lineEmptyStateData = [];
export const lineEmptyStateOptions = {
	title: 'Line (empty state)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	curve: 'curveMonotoneX',
};

// line - skeleton
export const lineSkeletonData = [];
export const lineSkeletonOptions = {
	title: 'Line (skeleton)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	curve: 'curveMonotoneX',
	data: {
		loading: true,
	},
};

export const lineTimeSeriesDualAxesData = [
	{ group: 'Temperature', date: new Date(2019, 0, 1), temp: 23 },
	{ group: 'Temperature', date: new Date(2019, 1, 1), temp: 15 },
	{ group: 'Temperature', date: new Date(2019, 2, 1), temp: 24 },
	{ group: 'Temperature', date: new Date(2019, 3, 1), temp: 33 },
	{ group: 'Temperature', date: new Date(2019, 4, 1), temp: 23 },
	{ group: 'Temperature', date: new Date(2019, 5, 1), temp: 32 },
	{ group: 'Temperature', date: new Date(2019, 6, 1), temp: 23 },
	{ group: 'Rainfall', date: new Date(2019, 0, 1), rainfall: 50 },
	{ group: 'Rainfall', date: new Date(2019, 1, 1), rainfall: 65 },
	{ group: 'Rainfall', date: new Date(2019, 2, 1), rainfall: 35 },
	{ group: 'Rainfall', date: new Date(2019, 3, 1), rainfall: 43 },
	{ group: 'Rainfall', date: new Date(2019, 4, 1), rainfall: 53 },
	{ group: 'Rainfall', date: new Date(2019, 5, 1), rainfall: 19 },
	{ group: 'Rainfall', date: new Date(2019, 6, 1), rainfall: 13 },
];

export const dualLine = {
	title: 'Line + Line (dual axes)',
	axes: {
		left: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
		},
		bottom: {
			scaleType: 'time',
			mapsTo: 'date',
			title: 'Date',
		},
		right: {
			title: 'Rainfall (mm)',
			mapsTo: 'rainfall',
			correspondingDatasets: ['Rainfall'],
		},
	},
	curve: 'curveMonotoneX',
};

export const lineOptionsLegendOrientation = {
	title: 'Left aligned vertical legend (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: 'labels',
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: 'linear',
		},
	},
	legend: {
		position: 'left',
		orientation: 'vertical',
	},
};
