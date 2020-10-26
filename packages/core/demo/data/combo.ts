
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


export const comboAreaLineData = [
	{ group: "Health", key: "January", value: 312 },
	{ group: "Health", key: "February", value: 232 },
	{ group: "Health", key: "March", value: 432 },
	{ group: "Health", key: "April", value: 712 },
	{ group: "Health", key: "May", value: 834 },
	{ group: "Health", key: "June", value: 800 },
	{ group: "Health", key: "July", value: 612 },
	{ group: "Health", key: "August", value: 442 },
	{ group: "Temperature", key: "January", temp: -20 },
	{ group: "Temperature", key: "February", temp: -12 },
	{ group: "Temperature", key: "March", temp: 3 },
	{ group: "Temperature", key: "April", temp: 18 },
	{ group: "Temperature", key: "May", temp: 24 },
	{ group: "Temperature", key: "June", temp: 34 },
	{ group: "Temperature", key: "July", temp: 37 },
	{ group: "Temperature", key: "August", temp: 30 }

];

export const comboAreaLineOptions = {
	title: "Combo Line + Area",
	axes: {
		left: {
			title: "Score",
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
		"area": [
			"Health"
		],
		"line": [
			"Temperature"
		]
	},
	curve: "curveNatural"
};



export const comboLineScatterData = [
	{ group: "High", key: "Monday", temp: 20 },
	{ group: "High", key: "Tuesday", temp: 33 },
	{ group: "High", key: "Wednesday", temp: 23 },
	{ group: "High", key: "Thursday", temp: 23 },
	{ group: "High", key: "Friday", temp: 32 },
	{ group: "Low", key: "Monday", temp: 12 },
	{ group: "Low", key: "Tuesday", temp: 22 },
	{ group: "Low", key: "Wednesday", temp: 20 },
	{ group: "Low", key: "Thursday", temp: 22 },
	{ group: "Low", key: "Friday", temp: 25 },
	{ group: "Temperature", key: "Monday", temp: 24 },
	{ group: "Temperature", key: "Tuesday", temp: 28 },
	{ group: "Temperature", key: "Wednesday", temp: 30 },
	{ group: "Temperature", key: "Thursday", temp: 29 },
	{ group: "Temperature", key: "Friday", temp: 24 },
	{ group: "Attendance", key: "Monday", value: 2650 },
	{ group: "Attendance", key: "Tuesday", value: 2553 },
	{ group: "Attendance", key: "Wednesday", value: 3433 },
	{ group: "Attendance", key: "Thursday", value: 3754 },
	{ group: "Attendance", key: "Friday", value: 3744 }
];

export const comboLineScatterOptions = {
	title: "Combo Line + Scatter + Bar",
	axes: {
		left: {
			mapsTo: "value",
			title: "Attendance"
		},
		bottom: {
			scaleType: "labels",
			mapsTo: "key"
		},
		right: {
			title: "Temperature (°C)",
			mapsTo: "temp",
			scaleType: "linear",
			datasets: [
				"Temperature",
				"High",
				"Low"
			]
		}
	},
	chartTypes: {
		"simple-bar": [
			"Attendance"
		],
		"line": [
			"Temperature"
		],
		"scatter": [
			"High",
			"Low"
		]
	}
};






export const comboEmptyData = [];

export const comboEmptyOptions = {
	title: "Combo Chart (empty)",
	axes: {
		left: {
			mapsTo: "value",
			title: "Attendance"
		},
		bottom: {
			scaleType: "labels",
			mapsTo: "key"
		},
		right: {
			title: "Temperature (°C)",
			mapsTo: "temp",
			scaleType: "linear",
			datasets: [
				"Temperature"
			]
		}
	},
	chartTypes: {
		"simple-bar": [
			"Attendance"
		],
		"line": [
			"Temperature"
		]
	}
};




export const comboErrorData = [
	{ group: "High", key: "Monday", temp: 20 },
	{ group: "High", key: "Tuesday", temp: 33 },
	{ group: "High", key: "Wednesday", temp: 23 },
	{ group: "High", key: "Thursday", temp: 23 },
	{ group: "High", key: "Friday", temp: 32 },
	{ group: "Low", key: "Monday", temp: 12 },
	{ group: "Low", key: "Tuesday", temp: 22 },
	{ group: "Low", key: "Wednesday", temp: 20 },
	{ group: "Low", key: "Thursday", temp: 22 },
	{ group: "Low", key: "Friday", temp: 25 },
	{ group: "Temperature", key: "Monday", temp: 24 },
	{ group: "Temperature", key: "Tuesday", temp: 28 },
	{ group: "Temperature", key: "Wednesday", temp: 30 },
	{ group: "Temperature", key: "Thursday", temp: 29 },
	{ group: "Temperature", key: "Friday", temp: 24 },
	{ group: "Attendance", key: "Monday", value: 2650 },
	{ group: "Attendance", key: "Tuesday", value: 2553 },
	{ group: "Attendance", key: "Wednesday", value: 3433 },
	{ group: "Attendance", key: "Thursday", value: 3754 },
	{ group: "Attendance", key: "Friday", value: 3744 }
];

export const comboErrorOptions = {
	title: "Combo Chart (no chartTypes)",
	axes: {
		left: {
			mapsTo: "value",
			title: "Attendance"
		},
		bottom: {
			scaleType: "labels",
			mapsTo: "key"
		},
		right: {
			title: "Temperature (°C)",
			mapsTo: "temp",
			scaleType: "linear",
			datasets: [
				"Temperature"
			]
		}
	}
};


