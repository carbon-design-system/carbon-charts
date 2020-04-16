export const stackedAreaTimeSeriesData = [
	{ group: "Dataset 1", date: new Date(2019, 0, 1), value: 10000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 5), value: 65000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 8), value: 10000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 13), value: 49213 },
	{ group: "Dataset 1", date: new Date(2019, 0, 17), value: 51213 },
	{ group: "Dataset 2", date: new Date(2019, 0, 1), value: 20000 },
	{ group: "Dataset 2", date: new Date(2019, 0, 5), value: 25000 },
	{ group: "Dataset 2", date: new Date(2019, 0, 8), value: 60000 },
	{ group: "Dataset 2", date: new Date(2019, 0, 13), value: 30213 },
	{ group: "Dataset 2", date: new Date(2019, 0, 17), value: 55213 },
	{ group: "Dataset 3", date: new Date(2019, 0, 1), value: 30000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 5), value: 20000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 8), value: 40000 },
	{ group: "Dataset 3", date: new Date(2019, 0, 13), value: 60213 },
	{ group: "Dataset 3", date: new Date(2019, 0, 17), value: 25213 }
];

export const stackedAreaTimeSeriesOptions = {
	title: "Area Stacked (time series)",
	axes: {
		left: {
			secondary: true,
			stacked: true
		},
		bottom: {
			scaleType: "time",
			primary: true
		}
	},
	curve: "curveMonotoneX"
};
