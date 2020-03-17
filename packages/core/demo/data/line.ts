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

// export const doubleLinearScatterData = [
// 	{ group: "Dataset 1", employees: 5000, sales: 32100 },
// 	{ group: "Dataset 1", employees: 3000, sales: 32100 },
// 	{ group: "Dataset 1", employees: 8000, sales: 32100 },
// 	{ group: "Dataset 1", employees: 4000, sales: 32100 },
// 	{ group: "Dataset 2", employees: 2000, sales: 32100 },
// 	{ group: "Dataset 2", employees: 4000, sales: 32100 },
// 	{ group: "Dataset 2", employees: 7000, sales: 32100 },
// 	{ group: "Dataset 2", employees: 6000, sales: 32100 }
// ];

// export const doubleLinearScatterOptions = {
// 	title: "Line (discrete)",
// 	axes: {
// 		bottom: {
// 			title: "2018 Annual Sales Figures",
// 			identifier: "employees",
// 			secondary: true,
// 			scaleType: "linear"
// 		},
// 		left: {
// 			primary: true,
// 			identifier: "sales",
// 			scaleType: "linear"
// 		}
// 	},
// 	chartTypes: { // TODO
// 		"line": [
// 			"Dataset 4",
// 			"Dataset 1"
// 		]
// 	},
// 	data: {
// 		groupIdentifier: "group"
// 	}
// };

export const lineOptions = {
	title: "Line (discrete)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			identifier: "key",
			secondary: true,
			scaleType: "labels"
		},
		left: {
			primary: true,
			identifier: "value",
			title: "Conversion rate",
			scaleType: "linear"
		}
	},
	// scatter: {
	// 	"xyz": {
	// 		identifier: "audienceSize",
	// 		tooltipTitle: "Audience size"
	// 	}
	// },
	chartTypes: { // TODO
		"line": [
			"Dataset 4",
			"Dataset 1"
		]
	}
};

// export const lineOptions = {
// 	title: "Line (discrete)",
// 	axes: {
// 		bottom: {
// 			title: "2018 Annual Sales Figures",
// 			scaleType: "labels",
// 			secondary: true
// 		},
// 		left: {
// 			primary: true
// 		}
// 	}
// };

export const lineTimeSeriesData = [
	{ group: "Dataset 1", date: new Date(2019, 0, 1), value: 10000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 5), value: 65000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 8), value: null },
	{ group: "Dataset 1", date: new Date(2019, 0, 13), value: 49213 },
	{ group: "Dataset 1", date: new Date(2019, 0, 17), value: 51213 },
	{ group: "Dataset 2", date: new Date(2019, 0, 2), value: 0 },
	{ group: "Dataset 2", date: new Date(2019, 0, 6), value: 57312 },
	{ group: "Dataset 2", date: new Date(2019, 0, 8), value: 21432 },
	{ group: "Dataset 2", date: new Date(2019, 0, 15), value: 70323 },
	{ group: "Dataset 2", date: new Date(2019, 0, 19), value: 21300 },
	{ group: "Dataset 3", date: new Date(2019, 0, 1), value: 50000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 5), value: null },
	{ group: "Dataset 3", date: new Date(2019, 0, 8), value: 18000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 13), value: 39213 },
	{ group: "Dataset 3", date: new Date(2019, 0, 17), value: 61213 },
	{ group: "Dataset 4", date: new Date(2019, 0, 2), value: 10 },
	{ group: "Dataset 4", date: new Date(2019, 0, 6), value: 37312 },
	{ group: "Dataset 4", date: new Date(2019, 0, 8), value: 51432 },
	{ group: "Dataset 4", date: new Date(2019, 0, 15), value: 25332 },
	{ group: "Dataset 4", date: new Date(2019, 0, 19), value: null }
];

export const lineTimeSeriesOptions = {
	title: "Line (time series)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			identifier: "date",
			secondary: true,
			scaleType: "time"
		},
		left: {
			primary: true,
			identifier: "value",
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
			secondary: true,
			scaleType: "time",
			identifier: "date"
		},
		left: {
			primary: true,
			identifier: "value"
		}
	}
};
