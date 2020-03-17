// export const bubbleData = [
// 	{ group: "Dataset 1", key: "Qty", value: 32100 },
// 	{ group: "Dataset 1", key: "More", value: 23500 },
// 	{ group: "Dataset 1", key: "Sold", value: 53100 },
// 	{ group: "Dataset 1", key: "Restocking", value: 42300 },
// 	{ group: "Dataset 1", key: "Misc", value: 12300 },
// 	{ group: "Dataset 2", key: "Qty", value: 34200 },
// 	{ group: "Dataset 2", key: "More", value: 53200 },
// 	{ group: "Dataset 2", key: "Sold", value: 42300 },
// 	{ group: "Dataset 2", key: "Restocking", value: 21400 },
// 	{ group: "Dataset 2", key: "Misc", value: 0 },
// 	{ group: "Dataset 3", key: "Qty", value: 41200 },
// 	{ group: "Dataset 3", key: "More", value: 18400 },
// 	{ group: "Dataset 3", key: "Sold", value: 34210 },
// 	{ group: "Dataset 3", key: "Restocking", value: 1400 },
// 	{ group: "Dataset 3", key: "Misc", value: 42100 },
// 	{ group: "Dataset 4", key: "Qty", value: 22000 },
// 	{ group: "Dataset 4", key: "More", value: 1200 },
// 	{ group: "Dataset 4", key: "Sold", value: 9000 },
// 	{ group: "Dataset 4", key: "Restocking", value: 24000, audienceSize: 10 },
// 	{ group: "Dataset 4", key: "Misc", value: 3000, audienceSize: 10 }
// ];

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
					value: 45000,
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
					value: 12000,
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
					date: new Date(2019, 0, 1),
					value: 15000,
					radius: 3
				},
				{
					date: new Date(2019, 0, 2),
					value: 20000,
					radius: 8
				},
				{
					date: new Date(2019, 0, 2),
					value: 39213,
					radius: 4
				},
				{
					date: new Date(2019, 0, 3),
					value: 61213,
					radius: 3
				},
				{
					date: new Date(2019, 0, 3),
					value: 50000,
					radius: 5
				},
				{
					date: new Date(2019, 0, 4),
					value: 15000,
					radius: 3
				},
				{
					date: new Date(2019, 0, 4),
					value: 20000,
					radius: 2
				},
				{
					date: new Date(2019, 0, 5),
					value: 39213,
					radius: 4
				},
				{
					date: new Date(2019, 0, 6),
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
					value: 5000,
					radius: 2
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
					value: 5000,
					radius: 7
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300,
					radius: 2
				},
				{
					date: new Date(2019, 0, 4),
					value: 34242,
					radius: 5
				},
				{
					date: new Date(2019, 0, 5),
					value: 62324,
					radius: 12
				},
				{
					date: new Date(2019, 0, 9),
					value: 21321,
					radius: 9
				},
				{
					date: new Date(2019, 0, 12),
					value: 13421,
					radius: 2
				},
				{
					date: new Date(2019, 0, 14),
					value: 32523,
					radius: 15
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
