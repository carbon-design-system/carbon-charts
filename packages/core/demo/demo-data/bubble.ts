export const bubbleData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 10000,
					radius: 6
				},
				{
					date: new Date(2019, 0, 5),
					value: 65000,
					radius: 5
				},
				{
					date: new Date(2019, 0, 8),
					value: 10000,
					radius: 8
				},
				{
					date: new Date(2019, 0, 13),
					value: 49213,
					radius: 11
				},
				{
					date: new Date(2019, 0, 17),
					value: 51213,
					radius: 3
				}
			]
		},
		{
			label: "Dataset 2",
			data: [
				{
					date: new Date(2019, 0, 2),
					value: 5000,
					radius: 4
				},
				{
					date: new Date(2019, 0, 6),
					value: 57312,
					radius: 6
				},
				{
					date: new Date(2019, 0, 8),
					value: 21432,
					radius: 8
				},
				{
					date: new Date(2019, 0, 15),
					value: 70323,
					radius: 3
				},
				{
					date: new Date(2019, 0, 19),
					value: 21300,
					radius: 5
				}
			]
		},
		{
			label: "Dataset 3",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 50000,
					radius: 5
				},
				{
					date: new Date(2019, 0, 5),
					value: 15000,
					radius: 3
				},
				{
					date: new Date(2019, 0, 8),
					value: 20000,
					radius: 8
				},
				{
					date: new Date(2019, 0, 13),
					value: 39213,
					radius: 4
				},
				{
					date: new Date(2019, 0, 17),
					value: 61213,
					radius: 3
				}
			]
		},
		{
			label: "Dataset 4",
			data: [
				{
					date: new Date(2019, 0, 2),
					value: 10,
					radius: 8
				},
				{
					date: new Date(2019, 0, 6),
					value: 37312,
					radius: 3
				},
				{
					date: new Date(2019, 0, 8),
					value: 51432,
					radius: 5
				},
				{
					date: new Date(2019, 0, 15),
					value: 40323,
					radius: 7
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300,
					radius: 3
				}
			]
		}
	]
};

export const bubbleOptions = {
	title: "Bubble (time series)",
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			scaleType: "time",
			secondary: true
		},
		left: {
			primary: true
		}
	}
};
