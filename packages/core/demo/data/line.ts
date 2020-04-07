export const lineData = [
	{ group: "Dataset 1", key: "Qty", value: 32100 },
	{ group: "Dataset 1", key: "More", value: 23500 },
	{ group: "Dataset 1", key: "Sold", value: 53100 },
	{ group: "Dataset 1", key: "Restocking", value: 42300 },
	{ group: "Dataset 1", key: "Misc", value: 12300 },
	{ group: "Dataset 2", key: "Qty", value: 34200 },
	{ group: "Dataset 2", key: "More", value: 53200 },
	{ group: "Dataset 2", key: "Sold", value: 42300 },
	{ group: "Dataset 2", key: "Restocking", value: 21400 },
	{ group: "Dataset 2", key: "Misc", value: 0 },
	{ group: "Dataset 3", key: "Qty", value: 41200 },
	{ group: "Dataset 3", key: "More", value: 18400 },
	{ group: "Dataset 3", key: "Sold", value: 34210 },
	{ group: "Dataset 3", key: "Restocking", value: 1400 },
	{ group: "Dataset 3", key: "Misc", value: 42100 },
	{ group: "Dataset 4", key: "Qty", value: 22000 },
	{ group: "Dataset 4", key: "More", value: 1200 },
	{ group: "Dataset 4", key: "Sold", value: 9000 },
	{ group: "Dataset 4", key: "Restocking", value: 24000, audienceSize: 10 },
	{ group: "Dataset 4", key: "Misc", value: 3000, audienceSize: 10 }
];

export const lineOptions = {
	title: "Line (discrete) - long long long long long long long long long long long long long long  time format ('MMM d, hh a and 'hh a')",
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			mapsTo: "key",
			scaleType: "labels"
		},
		left: {
			mapsTo: "value",
			title: "Conversion rate",
			scaleType: "linear"
		}
	}
};

export const lineTimeSeriesData = [
	{ group: "Dataset 1", date: new Date(2019, 0, 1), value: 10000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 5), value: 65000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 8), value: null },
	{ group: "Dataset 1", date: new Date(2019, 0, 13), value: 49213 },
	{ group: "Dataset 1", date: new Date(2019, 0, 17), value: 51213 },
	{ group: "Dataset 2", date: new Date(2019, 0, 2), value: 0 },
	{ group: "Dataset 2", date: new Date(2019, 0, 6), value: 57312 },
	{ group: "Dataset 2", date: new Date(2019, 0, 8), value: 27432 },
	{ group: "Dataset 2", date: new Date(2019, 0, 15), value: 70323 },
	{ group: "Dataset 2", date: new Date(2019, 0, 19), value: 21300 },
	{ group: "Dataset 3", date: new Date(2019, 0, 1), value: 50000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 5), value: null },
	{ group: "Dataset 3", date: new Date(2019, 0, 8), value: 18000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 13), value: 39213 },
	{ group: "Dataset 3", date: new Date(2019, 0, 17), value: 61213 },
	{ group: "Dataset 4", date: new Date(2019, 0, 2), value: 20000 },
	{ group: "Dataset 4", date: new Date(2019, 0, 6), value: 37312 },
	{ group: "Dataset 4", date: new Date(2019, 0, 8), value: 51432 },
	{ group: "Dataset 4", date: new Date(2019, 0, 15), value: 25332 },
	{ group: "Dataset 4", date: new Date(2019, 0, 19), value: null }
];

export const lineTimeSeriesOptions = {
	title: "Line (time series)",
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			mapsTo: "date",
			scaleType: "time"
		},
		left: {
			mapsTo: "value",
			title: "Conversion rate",
			scaleType: "linear"
		}
	},
	curve: "curveMonotoneX"
};

export const lineTimeSeriesDataRotatedTicks = [
	{ group: "Dataset 1", date: new Date(2019, 11, 30), value: 32100 },
	{ group: "Dataset 1", date: new Date(2019, 11, 31), value: 23500 },
	{ group: "Dataset 1", date: new Date(2020, 0, 1), value: 53100 },
	{ group: "Dataset 1", date: new Date(2020, 0, 2), value: 42300 },
	{ group: "Dataset 1", date: new Date(2020, 0, 3), value: 12300 }
];

export const lineTimeSeriesRotatedTicksOptions = {
	title: "Line (time series) - Rotated ticks labels",
	width: "400px",
	axes: {
		bottom: {
			scaleType: "time",
			mapsTo: "date"
		},
		left: {
			mapsTo: "value"
		}
	}
};
