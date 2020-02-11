export const lineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				32100,
				23500,
				53100,
				42300,
				12300
			]
		},
		{
			label: "Dataset 2",
			data: [
				34200,
				53200,
				42300,
				21400,
				0
			]
		},
		{
			label: "Dataset 3 long name",
			data: [
				41200,
				23400,
				34210,
				1400,
				42100
			]
		},
		{
			label: "Dataset 4 long name",
			data: [
				22000,
				1200,
				9000,
				24000,
				3000
			]
		},
		{
			label: "Dataset 5 long name",
			data: [
				2412,
				30000,
				10000,
				5000,
				31000
			]
		},
		{
			label: "Dataset 6 long name",
			data: [
				0,
				20000,
				40000,
				60000,
				80000
			]
		}
	]
};

export const lineOptions = {
	title: "Line (discrete)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			scaleType: "labels",
			secondary: true
		},
		left: {
			primary: true
		}
	}
};

export const lineTimeSeriesData = {
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
					value: null
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
					date: new Date(2019, 0, 2),
					value: 0
				},
				{
					date: new Date(2019, 0, 6),
					value: 57312
				},
				{
					date: new Date(2019, 0, 8),
					value: 21432
				},
				{
					date: new Date(2019, 0, 15),
					value: 70323
				},
				{
					date: new Date(2019, 0, 19),
					value: 21300
				}
			]
		},
		{
			label: "Dataset 3",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 50000
				},
				{
					date: new Date(2019, 0, 5),
					value: null
				},
				{
					date: new Date(2019, 0, 8),
					value: 18000
				},
				{
					date: new Date(2019, 0, 13),
					value: 39213
				},
				{
					date: new Date(2019, 0, 17),
					value: 61213
				}
			]
		},
		{
			label: "Dataset 4",
			data: [
				{
					date: new Date(2019, 0, 2),
					value: 10
				},
				{
					date: new Date(2019, 0, 6),
					value: 37312
				},
				{
					date: new Date(2019, 0, 8),
					value: 51432
				},
				{
					date: new Date(2019, 0, 15),
					value: null
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300
				}
			]
		}
	]
};

export const lineTimeSeriesOptions = {
	title: "Line (time series)",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true
		}
	},
	curve: "curveMonotoneX"
};
