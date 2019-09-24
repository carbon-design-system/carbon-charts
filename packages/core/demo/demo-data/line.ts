import { colors } from "./colors";
import { getTheme } from "./themes";

export const curvedLineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
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
			backgroundColors: [colors[1]],
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
			backgroundColors: [colors[2]],
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 50000
				},
				{
					date: new Date(2019, 0, 5),
					value: 15000
				},
				{
					date: new Date(2019, 0, 8),
					value: 20000
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
			backgroundColors: [colors[3]],
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
					value: 40323
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300
				}
			]
		}
	]
};

export const curvedLineOptions = {
	title: "Line Chart (Time Series)",
	axes: {
		right: {
			secondary: true
		},
		top: {
			type: "time",
			primary: true
		}
	},
	curve: "curveNatural",
	tooltip: {
		gridline: true
	}
};

export const lineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
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
			backgroundColors: [colors[1]],
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
			backgroundColors: [colors[2]],
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 50000
				},
				{
					date: new Date(2019, 0, 5),
					value: 15000
				},
				{
					date: new Date(2019, 0, 8),
					value: 20000
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
			backgroundColors: [colors[3]],
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
					value: 40323
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300
				}
			]
		}
	]
};

export const lineOptions = {
	title: "Line Chart (Linear Curve)",
	axes: {
		top: {
			title: "2018 Annual Sales Figures",
			type: "time",
			secondary: true
		},
		right: {
			primary: true
		}
	}
};

export const scatterData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
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
			backgroundColors: [colors[1]],
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
			backgroundColors: [colors[2]],
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
			backgroundColors: [colors[3]],
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
			backgroundColors: [colors[4]],
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
			backgroundColors: [colors[5]],
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

export const scatterOptions = {
	title: "Scatter Chart",
	axes: {
		top: {
			title: "2018 Annual Sales Figures",
			type: "labels",
			secondary: true
		},
		right: {
			primary: true
		}
	}
};
