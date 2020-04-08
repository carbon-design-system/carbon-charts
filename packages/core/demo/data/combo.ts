
export const comboSimpleData = [
	{ group: "Qty", date: new Date(2019, 0, 1), value: 10000 },
	{ group: "More", date: new Date(2019, 0, 2), value: 65000 },
	{ group: "Sold", date: new Date(2019, 0, 3), value: 30000 },
	{ group: "Restocking", date: new Date(2019, 0, 5), value: 49213 },
	{ group: "Line", date: new Date(2019, 0, 1), value: 14000 },
	{ group: "Line", date: new Date(2019, 0, 2), value: 75000 },
	{ group: "Line", date: new Date(2019, 0, 3), value: 31000 },
	{ group: "Line", date: new Date(2019, 0, 5), value: 45213 }
];

export const comboSimpleOptions = {
	title: "Combo Line + Simple bar (time series)",
	axes: {
		left: {
			mapsTo: "value",
			scaleType: "linear"
		},
		bottom: {
			mapsTo: "date",
			scaleType: "time"
		}
	},
	chartTypes: {
		"simple-bar": [
			"Qty",
			"More",
			"Sold",
			"Restocking"
		],
		"line": [
			"Line"
		]
	}
};

export const comboStackedData = [
	{ group: "Dataset 1", key: "Qty", value: 65000 },
	{ group: "Dataset 1", key: "More", value: 29123 },
	{ group: "Dataset 1", key: "Sold", value: 35213 },
	{ group: "Dataset 1", key: "Restocking", value: 51213 },
	{ group: "Dataset 1", key: "Misc", value: 16932 },
	{ group: "Dataset 2", key: "Qty", value: 32432 },
	{ group: "Dataset 2", key: "More", value: 21312 },
	{ group: "Dataset 2", key: "Sold", value: 56456 },
	{ group: "Dataset 2", key: "Restocking", value: 21312 },
	{ group: "Dataset 2", key: "Misc", value: 34234 },
	{ group: "Dataset 3", key: "Qty", value: 12312 },
	{ group: "Dataset 3", key: "More", value: 23232 },
	{ group: "Dataset 3", key: "Sold", value: 34232 },
	{ group: "Dataset 3", key: "Restocking", value: 12312 },
	{ group: "Dataset 3", key: "Misc", value: 34234 },
	{ group: "Dataset 4", key: "Qty", value: 32423 },
	{ group: "Dataset 4", key: "More", value: 21313 },
	{ group: "Dataset 4", key: "Sold", value: 64353 },
	{ group: "Dataset 4", key: "Restocking", value: 24134 },
	{ group: "Dataset 4", key: "Misc", value: 32423 }
];

export const comboStackedOptions = {
	title: "Combo Line + Stacked bar (discrete)",
	axes: {
		left: {
			title: "Conversion rate",
			mapsTo: "value",
			stacked: true
		},
		bottom: {
			title: "2018 Annual Sales Figures",
			mapsTo: "key",
			scaleType: "labels"
		}
	},
	chartTypes: {
		"stacked-bar": [
			"Dataset 1",
			"Dataset 3",
			"Dataset 4"
		],
		"line": [
			"Dataset 2"
		]
	}
};

export const comboGroupedData = [
	{ group: "Dataset 1", key: "Qty", value: 65000 },
	{ group: "Dataset 1", key: "More", value: -39123 },
	{ group: "Dataset 1", key: "Sold", value: -35213 },
	{ group: "Dataset 1", key: "Restocking", value: 51213 },
	{ group: "Dataset 1", key: "Misc", value: 16932 },
	{ group: "Dataset 2", key: "Qty", value: 32432 },
	{ group: "Dataset 2", key: "More", value: -21312 },
	{ group: "Dataset 2", key: "Sold", value: -56456 },
	{ group: "Dataset 2", key: "Restocking", value: -21312 },
	{ group: "Dataset 2", key: "Misc", value: 34234 },
	{ group: "Dataset 3", key: "Qty", value: -12312 },
	{ group: "Dataset 3", key: "More", value: 23232 },
	{ group: "Dataset 3", key: "Sold", value: 34232 },
	{ group: "Dataset 3", key: "Restocking", value: -12312 },
	{ group: "Dataset 3", key: "Misc", value: -34234 },
	{ group: "Dataset 4", key: "Qty", value: -32423 },
	{ group: "Dataset 4", key: "More", value: 21313 },
	{ group: "Dataset 4", key: "Sold", value: 64353 },
	{ group: "Dataset 4", key: "Restocking", value: 24134 },
	{ group: "Dataset 4", key: "Misc", value: 24134 }
];

export const comboGroupedOptions = {
	title: "Combo Line + Grouped bar (discrete)",
	axes: {
		left: {
			mapsTo: "value"
		},
		bottom: {
			scaleType: "labels",
			mapsTo: "key"
		}
	},
	chartTypes: {
		"grouped-bar": [
			"Dataset 2",
			"Dataset 3",
			"Dataset 4"
		],
		"line": [
			"Dataset 1"
		]
	}
};
