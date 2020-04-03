export const stackedAreaTimeSeriesData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 10000
				},
				{
					date: new Date(2019, 0, 5),
					value: 65000
				},
				{
					date: new Date(2019, 0, 8),
					value: 10000
				},
				{
					date: new Date(2019, 0, 13),
					value: 49213
				},
				{
					date: new Date(2019, 0, 17),
					value: 51213
				}
			]
		},
		{
			label: "Dataset 2",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 20000
				},
				{
					date: new Date(2019, 0, 5),
					value: 25000
				},
				{
					date: new Date(2019, 0, 8),
					value: 60000
				},
				{
					date: new Date(2019, 0, 13),
					value: 30213
				},
				{
					date: new Date(2019, 0, 17),
					value: 55213
				}
			]
		},
		{
			label: "Dataset 3",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 30000
				},
				{
					date: new Date(2019, 0, 5),
					value: 20000
				},
				{
					date: new Date(2019, 0, 8),
					value: 40000
				},
				{
					date: new Date(2019, 0, 13),
					value: 60213
				},
				{
					date: new Date(2019, 0, 17),
					value: 25213
				}
			]
		}
	]
};

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
