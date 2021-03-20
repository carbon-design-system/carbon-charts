export const timeSeriesGanttData = [
	{ group: 'Qty', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'More', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Sold', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Restocking', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Misc', date: new Date(2019, 0, 7), value: 51213 },
];

export const timeSeriesGanttOptions = {
	title: 'Gantt (time series)',
	axes: {
		left: {
			mapsTo: 'value',
		},
		top: {
			mapsTo: 'date',
			scaleType: 'time',
		},
	},
};
