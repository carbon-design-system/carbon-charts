
export const comboSimpleData = [
	{ group: "School A", date: "Monday", value: 10000 },
	{ group: "School A", date: "Tuesday", value: 65000 },
	{ group: "School A", date: "Wednesday", value: 30000 },
	{ group: "School A", date: "Thursday", value: 49213 },
	{ group: "School A", date: "Friday", value: 49213 },
	{ group: "Temperature", date: "Monday", temp: 70 },
	{ group: "Temperature", date: "Tuesday", temp: 75 },
	{ group: "Temperature", date: "Wednesday", temp: 31 },
	{ group: "Temperature", date: "Thursday", temp: 31 },
	{ group: "Temperature", date: "Friday", temp: 43 }
];

export const comboSimpleOptions = {
	title: "Combo (Line + Simple bar)",
	axes: {
		left: {
			mapsTo: "value",
			scaleType: "linear",
			title: "USA Summer School Attendance"
		},
		right: {
			mapsTo: "temp",
			scaleType: "linear",
			title: "Temperature (°F)",
			datasets: ["Temperature"]
		},
		bottom: {
			title: "Day of the Week",
			mapsTo: "date",
			scaleType: "labels"
		}
	},
	chartTypes: {
		"simple-bar": [
			"School A"
		],
		"line":  [
			"Temperature"
		]
	}
};

export const comboHorizontalData = comboSimpleData;

export const comboHorizontalOptions = {
	title: "Horizontal Combo (Line + Simple bar)",
	axes: {
		top: {
			mapsTo: "value",
			scaleType: "linear",
			title: "USA Summer School Attendance"
		},
		bottom: {
			mapsTo: "temp",
			scaleType: "linear",
			title: "Temperature (°F)",
			datasets: ["Temperature"]
		},
		left: {
			title: "Day of the Week",
			mapsTo: "date",
			scaleType: "labels"
		}
	},
	chartTypes: {
		"simple-bar": [
			"School A"
		],
		"line":  [
			"Temperature"
		]
	}
};

export const comboStackedData = [
	{ group: "Florida", key: "Monday", value: 65000 },
	{ group: "Florida", key: "Tuesday", value: 29123 },
	{ group: "Florida", key: "Wednesday", value: 35213 },
	{ group: "Florida", key: "Thursday", value: 51213 },
	{ group: "Florida", key: "Friday", value: 16932 },
	{ group: "California", key: "Monday", value: 32432 },
	{ group: "California", key: "Tuesday", value: 21312 },
	{ group: "California", key: "Wednesday", value: 56456 },
	{ group: "California", key: "Thursday", value: 21312 },
	{ group: "California", key: "Friday", value: 34234 },
	{ group: "Tokyo", key: "Monday", value: 12312 },
	{ group: "Tokyo", key: "Tuesday", value: 23232 },
	{ group: "Tokyo", key: "Wednesday", value: 34232 },
	{ group: "Tokyo", key: "Thursday", value: 12312 },
	{ group: "Tokyo", key: "Friday", value: 34234 },
	{ group: "Temperature", key: "Monday", temp: 23 },
	{ group: "Temperature", key: "Tuesday", temp: 21 },
	{ group: "Temperature", key: "Wednesday", temp: 32 },
	{ group: "Temperature", key: "Thursday", temp: 34 },
	{ group: "Temperature", key: "Friday", temp: 23 }
];

export const comboStackedOptions = {
	title: "Combo Line + Stacked bar (discrete)",
	axes: {
		left: {
			title: "Disney Park Attendance",
			mapsTo: "value"
		},
		bottom: {
			title: "2018 Annual Sales Figures",
			mapsTo: "key",
			scaleType: "labels"
		},
		right: {
			title: "Temperature (°C)",
			mapsTo: "temp",
			datasets: ["Temperature"]
		}
	},
	chartTypes: {
		"stacked-bar": [
			"Florida",
			"California",
			"Tokyo"
		],
		"line": [
			"Temperature"
		]
	}
};

export const comboGroupedData = [
	{ group: "Location 1", key: "Monday", value: 65000 },
	{ group: "Location 1", key: "Tuesday", value: -39123 },
	{ group: "Location 1", key: "Wednesday", value: -35213 },
	{ group: "Location 1", key: "Thursday", value: 51213 },
	{ group: "Location 1", key: "Friday", value: 16932 },
	{ group: "Location 2", key: "Monday", value: 32432 },
	{ group: "Location 2", key: "Tuesday", value: -21312 },
	{ group: "Location 2", key: "Wednesday", value: -56456 },
	{ group: "Location 2", key: "Thursday", value: -21312 },
	{ group: "Location 2", key: "Friday", value: 34234 },
	{ group: "Location 3", key: "Monday", value: -12312 },
	{ group: "Location 3", key: "Tuesday", value: 23232 },
	{ group: "Location 3", key: "Wednesday", value: 34232 },
	{ group: "Location 3", key: "Thursday", value: -12312 },
	{ group: "Location 3", key: "Friday", value: -34234 },
	{ group: "Temperature", key: "Monday", temp: 20 },
	{ group: "Temperature", key: "Tuesday", temp: 23 },
	{ group: "Temperature", key: "Wednesday", temp: 33 },
	{ group: "Temperature", key: "Thursday", temp: 34 },
	{ group: "Temperature", key: "Friday", temp: 34 }
];

export const comboGroupedOptions = {
	title: "Combo Line + Grouped bar (discrete)",
	axes: {
		left: {
			title: "Sales",
			mapsTo: "value"
		},
		bottom: {
			scaleType: "labels",
			mapsTo: "key"
		},
		right: {
			title: "Temperature (°C)",
			mapsTo: "temp",
			datasets: [
				"Temperature"
			]
		}
	},
	chartTypes: {
		"grouped-bar": [
			"Location 1",
			"Location 2",
			"Location 3"
		],
		"line": [
			"Temperature"
		]
	}
};
